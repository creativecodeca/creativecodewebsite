import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

// Helper function to send progress update via SSE
function sendProgress(res: VercelResponse, step: number, message: string, percentage: number) {
    try {
        res.write(`data: ${JSON.stringify({ step, message, percentage })}\n\n`);
    } catch (e) {
        // Ignore errors if client disconnected
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Validate before setting SSE headers
    const {
        companyName,
        industry,
        address,
        city,
        phoneNumber,
        email,
        companyType,
        colors,
        brandThemes,
        extraDetailedInfo,
        pages,
        contactForm,
        bookingForm,
        qualityTier = 'mockup' // Default to mockup if not provided
    } = req.body;

    // Validate required fields (before SSE)
    if (!companyName || !industry || !address || !city || !phoneNumber || !email || !companyType || !colors || !brandThemes) {
        return res.status(400).json({ error: 'Missing required fields in General Information' });
    }

    if (!pages || !Array.isArray(pages) || pages.length === 0) {
        return res.status(400).json({ error: 'At least one page is required' });
    }

    // Validate pages have required fields
    for (const page of pages) {
        if (!page.title || !page.information) {
            return res.status(400).json({ error: `Page "${page.title || 'Untitled'}" is missing required information` });
        }
    }

    if (!GEMINI_API_KEY || !GITHUB_TOKEN) {
        console.error('Missing API credentials - GEMINI_API_KEY:', !!GEMINI_API_KEY, 'GITHUB_TOKEN:', !!GITHUB_TOKEN);
        return res.status(500).json({ 
            error: 'Website generation service is temporarily unavailable. Please contact support.',
            code: 'SERVICE_UNAVAILABLE'
        });
    }

    // Set up Server-Sent Events for progress updates (after validation)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    try {

        console.log('Starting website generation for:', companyName);
        sendProgress(res, 1, 'Generating design plan...', 10);

        // Initialize AI client
        const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        // Prepare sitewide data
        const sitewide = {
            companyName,
            industry,
            address,
            city,
            phoneNumber,
            email,
            companyType,
            colors,
            brandThemes,
            extraDetailedInfo: extraDetailedInfo || '',
            contactForm: contactForm || false,
            bookingForm: bookingForm || false,
            qualityTier: qualityTier || 'mockup',
            fullAddress: `${address}, ${city}`
        };

        // Step 1: Generate game plan
        const gamePlan = await generateGamePlan(genAI, sitewide, pages);
        console.log('Game plan generated');
        sendProgress(res, 2, 'Creating website files...', 30);

        // Step 2: Generate website files
        const websiteResult = await generateWebsiteFiles(genAI, sitewide, pages, gamePlan, res);
        console.log('Website files generated');
        
        let finalFiles = websiteResult.files;
        let finalComponents = websiteResult.components;
        const pageRoutes = pages.map((p, idx) => {
            if (idx === 0) return { title: p.title, route: '/', file: 'index.html', component: 'Home' };
            const route = '/' + p.title.toLowerCase().replace(/\s+/g, '-');
            const fileName = p.title.toLowerCase().replace(/\s+/g, '-') + '/index.html';
            const component = p.title.replace(/\s+/g, '');
            return { title: p.title, route, file: fileName, component };
        });

        // Step 2.5: Refine for production if needed
        if (qualityTier === 'production' || qualityTier === 'production-seo') {
            console.log('Starting production refinement...');
            sendProgress(res, 2, 'Refining for production quality...', 50);
            
            // Add overall timeout protection (max 180 seconds for refinement)
            try {
                finalComponents = await Promise.race([
                    refineForProduction(genAI, finalComponents, sitewide, pages, pageRoutes, res),
                    new Promise<Array<{ name: string; content: string; route: string; pageInfo: any }>>((_, reject) =>
                        setTimeout(() => reject(new Error('Refinement timed out after 3 minutes')), 180000)
                    )
                ]);
                console.log('Production refinement complete');
            } catch (refineError: any) {
                console.error('Refinement timed out or failed:', refineError);
                // Continue with original components if refinement fails
                console.log('Continuing with original components due to timeout');
            }
            
            // Update files with refined components
            finalFiles = finalFiles.map(file => {
                const refinedComponent = finalComponents.find(c => `components/${c.name}` === file.name);
                if (refinedComponent) {
                    return { ...file, content: refinedComponent.content };
                }
                return file;
            });
        }

        // Step 2.6: Optimize for SEO if needed
        if (qualityTier === 'production-seo') {
            console.log('Starting SEO optimization...');
            sendProgress(res, 2, 'Optimizing for SEO...', 60);
            
            // Add overall timeout protection (max 120 seconds for SEO)
            try {
                finalComponents = await Promise.race([
                    optimizeForSEO(genAI, finalComponents, sitewide, pages, pageRoutes, res),
                    new Promise<Array<{ name: string; content: string; route: string; pageInfo: any }>>((_, reject) =>
                        setTimeout(() => reject(new Error('SEO optimization timed out after 2 minutes')), 120000)
                    )
                ]);
                console.log('SEO optimization complete');
            } catch (seoError: any) {
                console.error('SEO optimization timed out or failed:', seoError);
                // Continue with current components if SEO fails
                console.log('Continuing without SEO optimization due to timeout');
            }
            
            // Update files with SEO-optimized components
            finalFiles = finalFiles.map(file => {
                const seoComponent = finalComponents.find(c => `components/${c.name}` === file.name);
                if (seoComponent) {
                    return { ...file, content: seoComponent.content };
                }
                return file;
            });
        }

        sendProgress(res, 3, 'Pushing to GitHub...', 70);

        // Step 3: Create GitHub repository
        const repoName = `${companyName.toLowerCase().replace(/\s+/g, '-')}-website-${Date.now()}`;
        const repoData = await createGitHubRepo(repoName, finalFiles, sitewide);
        console.log('GitHub repository created:', repoData.repoUrl);
        sendProgress(res, 4, 'Deploying to Vercel...', 85);

        // Step 4: Deploy to Vercel (if token available)
        // Wait a moment for GitHub to fully process the repository
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        let vercelData = null;
        if (VERCEL_TOKEN) {
            console.log('VERCEL_TOKEN found, attempting automatic deployment...');
            try {
                vercelData = await deployToVercel(repoName, repoData.repoFullName, repoData.repoId, repoData.latestCommitSha, sitewide);
                if (vercelData?.url) {
                console.log('Vercel project created and deployed:', vercelData.url);
                } else {
                    console.warn('Vercel deployment returned but no URL provided:', vercelData);
                }
            } catch (vercelError: any) {
                console.error('Vercel deployment error:', vercelError);
                console.error('Error details:', vercelError?.message, vercelError?.stack);
                // Continue even if Vercel fails - GitHub repo is still created
                vercelData = {
                    url: null,
                    projectUrl: 'https://vercel.com/dashboard',
                    error: vercelError?.message || 'Deployment failed'
                };
            }
        } else {
            console.log('VERCEL_TOKEN not set - checking environment...');
            console.log('VERCEL_TOKEN exists:', !!process.env.VERCEL_TOKEN);
            console.log('All env vars:', Object.keys(process.env).filter(k => k.includes('VERCEL')));
        }

        sendProgress(res, 4, 'Complete!', 100);
        
        // Send final result via SSE
        res.write(`data: ${JSON.stringify({
            success: true,
            repoUrl: repoData.repoUrl,
            vercelUrl: vercelData?.url || null,
            projectUrl: vercelData?.projectUrl || 'https://vercel.com/dashboard',
            message: vercelData?.url 
                ? 'Website generated, pushed to GitHub, and automatically deployed to Vercel'
                : VERCEL_TOKEN
                ? 'Website generated and pushed to GitHub. Vercel deployment attempted but may need manual setup.'
                : 'Website generated and pushed to GitHub. Import the repo in Vercel dashboard to deploy.',
            autoDeployed: !!vercelData?.url,
            needsManualImport: !vercelData?.url
        })}\n\n`);
        
        res.end();

    } catch (error: any) {
        // Log full error details server-side only
        console.error('Error generating website:', error);
        console.error('Error stack:', error.stack);
        
        // Send error via SSE (headers already set)
        try {
            const isConfigError = error?.message?.includes('API credentials') || 
                                 error?.message?.includes('GITHUB_TOKEN') ||
                                 error?.message?.includes('GEMINI_API_KEY');
            
            const errorMessage = isConfigError
                ? 'Website generation service is temporarily unavailable. Please contact support.'
                : error.message || 'Failed to generate website. Please try again or contact support if the issue persists.';
            
            res.write(`data: ${JSON.stringify({
                success: false,
                error: errorMessage,
                code: isConfigError ? 'SERVICE_UNAVAILABLE' : 'GENERATION_ERROR'
            })}\n\n`);
            res.end();
        } catch (e) {
            // If SSE fails, try to send JSON (but this might fail if headers already sent)
            try {
                const isConfigError = error?.message?.includes('API credentials') || 
                                     error?.message?.includes('GITHUB_TOKEN') ||
                                     error?.message?.includes('GEMINI_API_KEY');
                
                if (isConfigError) {
                    return res.status(500).json({
                        error: 'Website generation service is temporarily unavailable. Please contact support.',
                        code: 'SERVICE_UNAVAILABLE'
                    });
                }
                
                return res.status(500).json({
                    error: error.message || 'Failed to generate website. Please try again or contact support if the issue persists.',
                    code: 'GENERATION_ERROR'
                });
            } catch (jsonError) {
                // Headers already sent, can't send response
                console.error('Cannot send error response - headers already sent');
            }
        }
    }
}

async function generateGamePlan(genAI: GoogleGenAI, sitewide: any, pages: any[]) {
    try {
        // Using Gemini 3 Pro Preview - latest and most advanced model
        const model = 'gemini-3-pro-preview';

        const prompt = `You are a professional web developer creating a game plan for a website.

Company Information:
- Name: ${sitewide.companyName}
- Industry: ${sitewide.industry}
- Company Type: ${sitewide.companyType}
- Address: ${sitewide.fullAddress}
- Phone: ${sitewide.phoneNumber}
- Email: ${sitewide.email}
- Colors: ${sitewide.colors}
- Brand Themes: ${sitewide.brandThemes}
${sitewide.extraDetailedInfo ? `- Additional Info: ${sitewide.extraDetailedInfo}` : ''}

Pages to create:
${pages.map((p, i) => `${i + 1}. ${p.title}: ${p.information}`).join('\n')}

Addons:
- Contact Form: ${sitewide.contactForm ? 'Yes' : 'No'}
- Booking Form: ${sitewide.bookingForm ? 'Yes' : 'No'}

Create a detailed game plan for building this website. Include:
1. Overall design approach and layout strategy
2. Color palette (specific hex codes based on the provided colors: ${sitewide.colors})
3. Typography choices
4. Key features for each page
5. Navigation structure
6. Responsive design considerations
7. Any special interactive elements needed
8. How to integrate contact form and booking form if requested

Keep it concise but comprehensive. Format as JSON with these keys: designApproach, colorPalette, typography, pageFeatures, navigation, responsiveStrategy, interactiveElements`;

    const chat = genAI.chats.create({
        model: model,
        config: {
            systemInstruction: 'You are a professional web developer creating detailed game plans for websites.'
        }
    });

    // Retry logic for Gemini API calls
    let result;
    let retries = 3;
    let lastError: any;
    
    while (retries > 0) {
        try {
            result = await chat.sendMessage({ message: prompt });
            break; // Success, exit retry loop
        } catch (error: any) {
            lastError = error;
            retries--;
            if (retries > 0) {
                console.warn(`Gemini API call failed, retrying... (${retries} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
            }
        }
    }
    
    if (!result) {
        throw new Error(`Failed to generate game plan after retries: ${lastError?.message || 'Unknown error'}`);
    }
    
    const text = result.text;

        try {
            return JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
        } catch {
            return { rawPlan: text };
        }
    } catch (error: any) {
        console.error('Error in generateGamePlan:', error);
        // Don't expose internal error details
        throw new Error('Failed to generate website design plan');
    }
}

// Helper function to add timeout to Gemini API calls
async function callGeminiWithTimeout(
    chat: any,
    message: string,
    timeoutMs: number = 45000 // 45 second timeout per call
): Promise<any> {
    return Promise.race([
        chat.sendMessage({ message }),
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Gemini API call timed out')), timeoutMs)
        )
    ]);
}

// Refine all components for production quality with strict consistency checks
async function refineForProduction(
    genAI: GoogleGenAI, 
    components: Array<{ name: string; content: string; route: string; pageInfo: any }>,
    sitewide: any,
    pages: any[],
    pageRoutes: any[],
    res?: VercelResponse
): Promise<Array<{ name: string; content: string; route: string; pageInfo: any }>> {
    // Use the same model as generation for consistency
    const model = 'gemini-3-pro-preview';
    const refinedComponents = [];
    
    // First, get the Navbar component to ensure consistency
    const navbarComponent = components.find(c => c.name === 'Navbar.tsx');
    const navbarContent = navbarComponent?.content || '';
    
    // Process components in parallel batches for speed
    const componentsToRefine = components.filter(c => 
        c.name !== 'Navbar.tsx' && 
        c.name !== 'Footer.tsx' && 
        c.name !== 'Attributions.tsx'
    );
    
    const sharedComponents = components.filter(c => 
        c.name === 'Navbar.tsx' || 
        c.name === 'Footer.tsx' || 
        c.name === 'Attributions.tsx'
    );
    
    // Add shared components first
    refinedComponents.push(...sharedComponents);
    
    console.log(`Refining ${componentsToRefine.length} components for production...`);
    
    // Process in parallel batches of 4 to speed up (increased from 3)
    const batchSize = 4;
    for (let batchStart = 0; batchStart < componentsToRefine.length; batchStart += batchSize) {
        const batch = componentsToRefine.slice(batchStart, batchStart + batchSize);
        const batchIndex = Math.floor(batchStart / batchSize);
        const totalBatches = Math.ceil(componentsToRefine.length / batchSize);
        
        if (res) {
            sendProgress(res, 2, `Refining components (${batchStart + 1}-${Math.min(batchStart + batchSize, componentsToRefine.length)}/${componentsToRefine.length})...`, 
                50 + (batchIndex * 30 / totalBatches));
        }
        
        // Process batch in parallel
        const batchResults = await Promise.all(
            batch.map(async (component) => {
                console.log(`Refining component: ${component.name}`);

                const refinementPrompt = `You are a senior web developer and design expert. Review and refine this React component to ensure ABSOLUTELY PERFECT production-ready quality.

CRITICAL REFINEMENT CHECKLIST - EVERY ITEM MUST BE PERFECT:

1. **CONSISTENT HEADER/NAVBAR**: 
   - Header structure MUST match exactly across all pages
   - Use the shared Navbar component - DO NOT create custom headers
   - Navigation links must be consistent
   - Logo/company name positioning must be identical
   - Header styling (colors, padding, height) must be EXACTLY the same

2. **Beautiful Design**: 
   - Modern, professional, visually stunning design
   - Proper spacing, typography, and visual hierarchy
   - No wonky layouts or misaligned elements
   - Smooth transitions and hover effects

3. **Appropriate Imagery**: 
   - All images must be contextually relevant
   - Images should enhance, not distract
   - Proper image sizing and aspect ratios
   - All images must have descriptive alt text

4. **Excellent Copywriting**: 
   - All text must be clear, professional, and engaging
   - Fix any awkward phrasing, typos, or grammatical errors
   - Content should be compelling and well-written
   - Headings should be descriptive and hierarchy-appropriate

5. **Perfect Consistency**: 
   - Design elements (colors, fonts, spacing) must be consistent
   - Button styles must match across pages
   - Section layouts must follow the same patterns
   - Footer must be identical on all pages (use shared Footer component)
   - No design inconsistencies whatsoever

6. **Professionalism**: 
   - Remove ALL placeholder text
   - Ensure all content is polished and professional
   - No lorem ipsum or placeholder content
   - All links and buttons must work correctly

7. **Working Links**: 
   - All navigation links must work correctly
   - Internal links must use proper routes
   - External links must have proper attributes
   - Buttons must have proper onClick handlers

8. **Component Structure**: 
   - Proper React/TypeScript structure
   - Clean, maintainable code
   - Proper imports and exports
   - No unused code or variables

9. **Tailwind Classes**: 
   - Optimize Tailwind utility classes
   - Use consistent spacing scale
   - Proper responsive breakpoints
   - No conflicting or redundant classes

10. **Accessibility**: 
    - Proper semantic HTML
    - Accessibility attributes (aria-labels, roles)
    - Keyboard navigation support
    - Screen reader friendly

11. **Mobile Responsiveness**: 
    - Verify responsive design works on all screen sizes
    - Test mobile, tablet, and desktop layouts
    - Proper breakpoint usage

12. **NO ERRORS**: 
    - Fix any TypeScript errors
    - Fix any React warnings
    - Ensure all imports are correct
    - No console errors or warnings

SHARED NAVBAR COMPONENT (for reference - use this, don't recreate):
\`\`\`tsx
${navbarContent.substring(0, 1000)}
\`\`\`

Original Component:
\`\`\`tsx
${component.content}
\`\`\`

Site Information:
- Company: ${sitewide.companyName}
- Industry: ${sitewide.industry}
- Colors: ${sitewide.colors}
- Brand Themes: ${sitewide.brandThemes}

Page Information: ${component.pageInfo.information}

All Pages: ${pages.map(p => p.title).join(', ')}

CRITICAL: The header/navbar MUST use the shared Navbar component. DO NOT create a custom header. Import and use <Navbar /> component.

Return ONLY the refined React component code. Do not include explanations or markdown formatting. Start directly with the component code. Ensure it's absolutely perfect with zero inconsistencies.`;

                const chat = genAI.chats.create({
                    model: model,
                    config: {
                        systemInstruction: 'You are a senior React developer and design expert specializing in production-ready websites. You ensure ABSOLUTE PERFECTION with zero design inconsistencies, perfect headers, and flawless code quality. You are extremely detail-oriented and catch every single error or inconsistency. CRITICAL: Remove ALL backdrop-blur, brightness() filters, and opacity changes that create visual artifacts. Use solid backgrounds or simple gradients only. Ensure every button works, every link works, and every form is functional.'
                    }
                });

                // Retry logic for Gemini API calls with extended timeout
                let result;
                let retries = 3; // More retries for refinement
                let lastError: any;
                let refinementAttempt = 0;
                
                while (retries >= 0) {
                    refinementAttempt++;
                    try {
                        // Extended timeout for refinement - needs time to analyze and improve
                        const timeoutMs = 90000 + (refinementAttempt * 10000); // 90s, 100s, 110s, 120s
                        console.log(`Refinement attempt ${refinementAttempt} for ${component.name} with ${timeoutMs/1000}s timeout...`);
                        result = await callGeminiWithTimeout(chat, refinementPrompt, timeoutMs);
                        
                        // Verify we got a valid response
                        if (result && result.text && result.text.trim().length > 0) {
                            console.log(`✓ Successfully refined ${component.name} on attempt ${refinementAttempt}`);
                            break;
                        } else {
                            throw new Error('Empty or invalid response from Gemini API');
                        }
                    } catch (error: any) {
                        lastError = error;
                        retries--;
                        if (retries >= 0) {
                            console.warn(`Refinement failed for ${component.name}, retrying... (${retries} attempts left)`, error?.message || error);
                            // Exponential backoff
                            const backoffMs = Math.min(1000 * Math.pow(2, refinementAttempt - 1), 5000);
                            await new Promise(resolve => setTimeout(resolve, backoffMs));
                        }
                    }
                }
                
                if (!result) {
                    console.error(`Failed to refine ${component.name} after retries, using original`);
                    return component; // Return original if refinement fails
                }
                
                let refinedContent = result.text.replace(/```tsx\n?/g, '').replace(/```ts\n?/g, '').replace(/```jsx\n?/g, '').replace(/```javascript\n?/g, '').replace(/```\n?/g, '').trim();
                refinedContent = cleanReactContent(refinedContent, sitewide);
                
                return {
                    ...component,
                    content: refinedContent
                };
            })
        );
        
        refinedComponents.push(...batchResults);
        console.log(`Completed batch ${batchIndex + 1}/${totalBatches}`);
    }
    
    return refinedComponents;
}

// Optimize for SEO
async function optimizeForSEO(
    genAI: GoogleGenAI,
    components: Array<{ name: string; content: string; route: string; pageInfo: any }>,
    sitewide: any,
    pages: any[],
    pageRoutes: any[],
    res?: VercelResponse
): Promise<Array<{ name: string; content: string; route: string; pageInfo: any }>> {
    const model = 'gemini-3-pro-preview';
    const seoOptimizedComponents = [];
    
    // Process components in parallel batches for speed
    const componentsToOptimize = components.filter(c => 
        c.name !== 'Navbar.tsx' && 
        c.name !== 'Footer.tsx' && 
        c.name !== 'Attributions.tsx'
    );
    
    const sharedComponents = components.filter(c => 
        c.name === 'Navbar.tsx' || 
        c.name === 'Footer.tsx' || 
        c.name === 'Attributions.tsx'
    );
    
    // Add shared components first
    seoOptimizedComponents.push(...sharedComponents);
    
    console.log(`Optimizing ${componentsToOptimize.length} components for SEO...`);
    
    // Process in parallel batches of 4 to speed up (increased from 3)
    const batchSize = 4;
    for (let batchStart = 0; batchStart < componentsToOptimize.length; batchStart += batchSize) {
        const batch = componentsToOptimize.slice(batchStart, batchStart + batchSize);
        const batchIndex = Math.floor(batchStart / batchSize);
        const totalBatches = Math.ceil(componentsToOptimize.length / batchSize);
        
        if (res) {
            sendProgress(res, 2, `Optimizing for SEO (${batchStart + 1}-${Math.min(batchStart + batchSize, componentsToOptimize.length)}/${componentsToOptimize.length})...`, 
                60 + (batchIndex * 20 / totalBatches));
        }
        
        // Process batch in parallel
        const batchResults = await Promise.all(
            batch.map(async (component) => {
                console.log(`SEO optimizing component: ${component.name}`);

                const seoPrompt = `You are an SEO expert. Optimize this React component for maximum search engine visibility while maintaining perfect design quality.

CRITICAL SEO OPTIMIZATION CHECKLIST:

1. **Meta Tags**: 
   - Helmet must include comprehensive meta tags
   - Title tag: 50-60 characters, keyword-rich, unique per page
   - Meta description: 150-160 characters, compelling, keyword-rich
   - Keywords meta tag (if appropriate)
   - Open Graph tags (og:title, og:description, og:image, og:url)
   - Twitter Card tags
   - Canonical URL

2. **Semantic HTML**: 
   - Proper heading hierarchy (h1, h2, h3)
   - Only ONE h1 per page
   - Headings must include relevant keywords naturally
   - Proper use of semantic elements (article, section, aside, etc.)

3. **Alt Text**: 
   - All images must have descriptive, keyword-rich alt text
   - Alt text should be natural and descriptive (not keyword-stuffed)
   - Include relevant keywords when appropriate

4. **Content Optimization**: 
   - Include relevant keywords naturally in headings and content
   - Keyword density should be natural (1-2%)
   - Use related keywords and synonyms
   - Content should be comprehensive and valuable
   - Minimum 300 words of quality content per page

5. **Structured Data**: 
   - Add appropriate schema.org structured data
   - LocalBusiness schema if applicable
   - Organization schema
   - BreadcrumbList schema
   - Use JSON-LD format in Helmet

6. **URL Structure**: 
   - Ensure routes are SEO-friendly
   - Use descriptive, keyword-rich URLs
   - Avoid deep nesting

7. **Internal Linking**: 
   - Add relevant internal links with descriptive anchor text
   - Link to related pages naturally
   - Use proper Link components from react-router-dom

8. **Content Quality**: 
   - Content must be valuable, comprehensive, and keyword-optimized
   - No thin content
   - Include FAQs if relevant
   - Use bullet points and lists for readability

9. **Mobile-First**: 
   - Ensure mobile optimization (already handled by Tailwind)
   - Fast loading times
   - No render-blocking resources

10. **Performance**: 
    - Minimize unnecessary code
    - Optimize images (use proper sizing)
    - Lazy load images below the fold

Original Component:
\`\`\`tsx
${component.content}
\`\`\`

Site Information:
- Company: ${sitewide.companyName}
- Industry: ${sitewide.industry}
- Page: ${component.pageInfo.title}
- Page Content: ${component.pageInfo.information}
- Route: ${component.route}

Return ONLY the SEO-optimized React component code. Do not include explanations or markdown formatting. Start directly with the component code. Maintain perfect design quality while optimizing for SEO.`;

                const chat = genAI.chats.create({
                    model: model,
                    config: {
                        systemInstruction: 'You are an SEO expert specializing in React/Next.js optimization. You optimize components for maximum search engine visibility while maintaining perfect design quality and zero inconsistencies.'
                    }
                });

                // Retry logic for Gemini API calls with extended timeout
                let result;
                let retries = 3; // More retries for SEO optimization
                let lastError: any;
                let seoAttempt = 0;
                
                while (retries >= 0) {
                    seoAttempt++;
                    try {
                        // Extended timeout for SEO optimization
                        const timeoutMs = 90000 + (seoAttempt * 10000); // 90s, 100s, 110s, 120s
                        console.log(`SEO optimization attempt ${seoAttempt} for ${component.name} with ${timeoutMs/1000}s timeout...`);
                        result = await callGeminiWithTimeout(chat, seoPrompt, timeoutMs);
                        
                        // Verify we got a valid response
                        if (result && result.text && result.text.trim().length > 0) {
                            console.log(`✓ Successfully optimized ${component.name} for SEO on attempt ${seoAttempt}`);
                            break;
                        } else {
                            throw new Error('Empty or invalid response from Gemini API');
                        }
                    } catch (error: any) {
                        lastError = error;
                        retries--;
                        if (retries >= 0) {
                            console.warn(`SEO optimization failed for ${component.name}, retrying... (${retries} attempts left)`, error?.message || error);
                            // Exponential backoff
                            const backoffMs = Math.min(1000 * Math.pow(2, seoAttempt - 1), 5000);
                            await new Promise(resolve => setTimeout(resolve, backoffMs));
                        }
                    }
                }
                
                if (!result) {
                    console.error(`Failed to optimize ${component.name} for SEO after retries, using original`);
                    return component; // Return original if optimization fails
                }
                
                let seoContent = result.text.replace(/```tsx\n?/g, '').replace(/```ts\n?/g, '').replace(/```jsx\n?/g, '').replace(/```javascript\n?/g, '').replace(/```\n?/g, '').trim();
                seoContent = cleanReactContent(seoContent, sitewide);
                
                return {
                    ...component,
                    content: seoContent
                };
            })
        );
        
        seoOptimizedComponents.push(...batchResults);
        console.log(`Completed SEO batch ${batchIndex + 1}/${totalBatches}`);
    }
    
    return seoOptimizedComponents;
}

async function generateWebsiteFiles(genAI: GoogleGenAI, sitewide: any, pages: any[], gamePlan: any, res?: VercelResponse) {
    try {
        // Use the valid high-quality model for component generation
        const model = 'gemini-3-pro-preview';
        const files = [];

        // Map pages to routes (for separate HTML files, not SPA)
        const pageRoutes = pages.map((p, idx) => {
            if (idx === 0) return { title: p.title, route: '/', file: 'index.html', component: 'Home' };
            const route = '/' + p.title.toLowerCase().replace(/\s+/g, '-');
            const fileName = p.title.toLowerCase().replace(/\s+/g, '-') + '/index.html';
            const component = p.title.replace(/\s+/g, '');
            return { title: p.title, route, file: fileName, component };
        });
        
        const pageLinks = pageRoutes.map(p => ({ title: p.title, file: p.file, route: p.route }));

        // PHASE 1: Generate React components for each page
        console.log('Phase 1: Generating React components...');
        const generatedComponents: { name: string; content: string; route: string; pageInfo: any }[] = [];
        const allImageAttributions: Array<{url: string, attribution: string, photographer?: string, photographerUrl?: string}> = [];
        
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            const pageRoute = pageRoutes[i];
            
            console.log(`Generating React component: ${pageRoute.component}...`);
            if (res) {
                sendProgress(res, 2, `Creating ${page.title} page...`, 30 + (i * 30 / pages.length));
            }
            
            // OPTIMIZATION: Fetch images with 2-second timeout - don't block component generation
            // Start image fetch but don't wait more than 2 seconds
            const imagePromise = getRelevantImages(sitewide, page, i).catch(() => []); // Never fail, just return empty
            const imageTimeout = new Promise<Array<{url: string, attribution?: string, photographer?: string, photographerUrl?: string}>>((resolve) => {
                setTimeout(() => resolve([]), 2000); // 2 second max wait
            });
            
            // Race: get images if they come in time, otherwise use empty array
            const pageImages = await Promise.race([imagePromise, imageTimeout]);
            
            // Collect attributions for the attribution page
            pageImages.forEach(img => {
                if (img.attribution && !allImageAttributions.find(a => a.url === img.url)) {
                    allImageAttributions.push({
                        url: img.url,
                        attribution: img.attribution,
                        photographer: img.photographer,
                        photographerUrl: img.photographerUrl
                    });
                }
            });
            
            const componentPrompt = i === 0 
                ? generateMainPageReactPrompt(page, sitewide, pages, pageRoutes, gamePlan, pageImages, pageRoute)
                : generateSubPageReactPrompt(page, sitewide, pages, pageRoutes, gamePlan, pageImages, pageRoute);

            // Gemini call with extended timeout + aggressive retries to ensure success
            let componentResult;
            let componentRetries = 5; // 6 attempts total - be very persistent
            let componentLastError: any;
            let attemptNumber = 0;
            
            while (componentRetries >= 0) {
                attemptNumber++;
                try {
                    // Create fresh chat instance for each retry to avoid state issues
                    const freshChat = genAI.chats.create({
                        model: model,
                        config: {
                            systemInstruction: 'You are a senior React developer with 10+ years of experience creating award-winning websites. Generate production-ready React/TypeScript components using Tailwind CSS. The website must look stunning, modern, and professional - matching the quality of premium $10,000+ websites. Use Tailwind utility classes extensively, proper component structure, and ensure visual hierarchy. CRITICAL: NEVER use backdrop-blur, brightness() filters, or opacity changes that create visual artifacts. Use solid backgrounds or simple gradients only. Every button must work. Every link must work. Every form must be functional. The code must be perfect with zero errors. All content must make logical sense and be specific to the business. No generic placeholder text. Every element must have a purpose and work correctly.'
                        }
                    });
                    
                    // Extended timeout: 120 seconds - gemini-3-pro-preview needs time for complex prompts
                    // Increase timeout on later attempts in case of slow responses
                    const timeoutMs = 120000 + (attemptNumber * 10000); // 120s, 130s, 140s, etc.
                    console.log(`Attempt ${attemptNumber} for ${pageRoute.route} with ${timeoutMs/1000}s timeout...`);
                    componentResult = await callGeminiWithTimeout(freshChat, componentPrompt, timeoutMs);
                    
                    // Verify we got a valid response
                    if (componentResult && componentResult.text && componentResult.text.trim().length > 0) {
                        console.log(`✓ Successfully generated component for ${pageRoute.route} on attempt ${attemptNumber}`);
                        break; // Success!
                    } else {
                        throw new Error('Empty or invalid response from Gemini API');
                    }
                } catch (err: any) {
                    componentLastError = err;
                    componentRetries--;
                    console.warn(`Component generation failed for route ${pageRoute.route}, attempt ${attemptNumber}, retries left: ${componentRetries}`, err?.message || err);
                    
                    if (componentRetries >= 0) {
                        // Exponential backoff: wait longer between retries
                        const backoffMs = Math.min(2000 * Math.pow(2, attemptNumber - 1), 10000); // 2s, 4s, 8s, max 10s
                        console.log(`Waiting ${backoffMs}ms before retry...`);
                        await new Promise(resolve => setTimeout(resolve, backoffMs));
                    }
                }
            }

            if (!componentResult) {
                // Last resort: try one more time with maximum timeout
                console.error(`All retries exhausted for ${pageRoute.route}, attempting final generation with 180s timeout...`);
                try {
                    const finalChat = genAI.chats.create({
                        model: model,
                        config: {
                            systemInstruction: 'You are a senior React developer. Generate a React/TypeScript component using Tailwind CSS. Be concise but complete.'
                        }
                    });
                    componentResult = await callGeminiWithTimeout(finalChat, componentPrompt, 180000); // 3 minute final attempt
                    
                    // Verify final attempt got valid response
                    if (!componentResult || !componentResult.text || componentResult.text.trim().length === 0) {
                        throw new Error('Final attempt returned empty or invalid response');
                    }
                    
                    console.log(`✓ Final attempt succeeded for ${pageRoute.route}`);
                } catch (finalErr: any) {
                    console.error(`Final attempt also failed for ${pageRoute.route}`, finalErr);
                    throw new Error(`Failed to generate React component for page ${pageRoute.route} after ${attemptNumber} attempts. Last error: ${componentLastError?.message || finalErr?.message || 'Unknown error'}`);
                }
            }
            
            // Final safety check
            if (!componentResult || !componentResult.text || componentResult.text.trim().length === 0) {
                throw new Error(`Failed to generate React component for page ${pageRoute.route} after all attempts. No valid response received.`);
            }
            
            let componentContent = componentResult.text
                .replace(/```tsx\n?/g, '')
                .replace(/```ts\n?/g, '')
                .replace(/```jsx\n?/g, '')
                .replace(/```javascript\n?/g, '')
                .replace(/```\n?/g, '')
                .trim();
            
            // Clean up component content
            componentContent = cleanReactContent(componentContent, sitewide);

            generatedComponents.push({
                name: `${pageRoute.component}.tsx`,
                content: componentContent,
                route: pageRoute.route,
                pageInfo: page
            });
        }

        // PHASE 2: Generate React Attribution component if needed
        if (allImageAttributions.length > 0) {
            console.log('Generating Attribution React component...');
            const attributionsRoute = { title: 'Attributions', route: '/attributions', file: 'attributions/index.html', component: 'Attributions' };
            pageRoutes.push(attributionsRoute);
            
            const attributionsComponent = generateAttributionsReactComponent(sitewide, allImageAttributions, pageRoutes);
            generatedComponents.push({
                name: 'Attributions.tsx',
                content: attributionsComponent,
                route: '/attributions',
                pageInfo: { title: 'Attributions', information: 'Photo credits and attributions' }
            });
        }
        
        // PHASE 3: Generate React App.tsx with routes
        console.log('Phase 3: Generating App.tsx with routes...');
        const appContent = generateAppTsx(generatedComponents, pageRoutes);
    files.push({
            name: 'App.tsx',
            content: appContent
        });
        
        // Add React components to files
        for (const component of generatedComponents) {
            files.push({
                name: `components/${component.name}`,
                content: component.content
            });
        }
        
        // PHASE 4: Generate config files
        console.log('Phase 4: Generating config files...');
        
        // Generate package.json
        const packageJson = generatePackageJson(sitewide);
        files.push({
            name: 'package.json',
            content: JSON.stringify(packageJson, null, 2)
        });
        
        // Generate vite.config.ts
        const viteConfig = generateViteConfig();
        files.push({
            name: 'vite.config.ts',
            content: viteConfig
        });
        
        // Generate entry-server.tsx
        const entryServer = generateEntryServer();
        files.push({
            name: 'entry-server.tsx',
            content: entryServer
        });
        
        // Generate prerender.js
        const prerenderScript = generatePrerenderScript(pageRoutes);
        files.push({
            name: 'prerender.js',
            content: prerenderScript
        });
        
        // Generate index.tsx
        const indexTsx = generateIndexTsx();
        files.push({
            name: 'index.tsx',
            content: indexTsx
        });
        
        // Generate index.html template
        const indexHtml = generateIndexHtml(sitewide);
    files.push({
            name: 'index.html',
            content: indexHtml
        });
        
        // Generate tsconfig.json
        const tsconfig = generateTsConfig();
    files.push({
            name: 'tsconfig.json',
            content: JSON.stringify(tsconfig, null, 2)
        });
        
        // Generate tsconfig.node.json (for Vite config files)
        const tsconfigNode = generateTsConfigNode();
        files.push({
            name: 'tsconfig.node.json',
            content: JSON.stringify(tsconfigNode, null, 2)
        });
        
        // Generate Navbar component
        const navbarComponent = generateNavbarComponent(pageRoutes, sitewide);
        files.push({
            name: 'components/Navbar.tsx',
            content: navbarComponent
        });
        
        // Generate Footer component
        const footerComponent = generateFooterComponent(pageRoutes, sitewide, allImageAttributions.length > 0);
    files.push({
            name: 'components/Footer.tsx',
            content: footerComponent
    });

        // Note: CSS and JS are not needed - Tailwind CSS is used via CDN
        // All styling is done with Tailwind utility classes in React components
        // JavaScript functionality is built into React components

    // Generate metadata.json with formData for regeneration
    const metadataContent = JSON.stringify({
        formData: {
            companyName: sitewide.companyName,
            industry: sitewide.industry,
            address: sitewide.address,
            city: sitewide.city,
            phoneNumber: sitewide.phoneNumber,
            email: sitewide.email,
            companyType: sitewide.companyType,
            colors: sitewide.colors,
            brandThemes: sitewide.brandThemes,
            extraDetailedInfo: sitewide.extraDetailedInfo,
            pages: pages,
            contactForm: sitewide.contactForm,
            bookingForm: sitewide.bookingForm,
            qualityTier: sitewide.qualityTier || 'mockup'
        },
        generatedAt: new Date().toISOString(),
        version: '1.0'
    }, null, 2);
    
    files.push({
        name: 'metadata.json',
        content: metadataContent
    });

    // Generate README
    const readmeContent = `# ${sitewide.companyName}

${sitewide.industry} - ${sitewide.companyType}

## Contact Information
- Address: ${sitewide.fullAddress}
- Phone: ${sitewide.phoneNumber}
- Email: ${sitewide.email}

## Pages
${pages.map(p => `- ${p.title}`).join('\n')}

## Features
${sitewide.contactForm ? '- Contact Form' : ''}
${sitewide.bookingForm ? '- Booking Form' : ''}

## Brand
- Colors: ${sitewide.colors}
- Brand Themes: ${sitewide.brandThemes}

## Generated
This website was automatically generated by Creative Code's AI Website Generator.
`;

        files.push({
            name: 'README.md',
            content: readmeContent
        });

        // Generate vercel.json for React build
        const vercelJson = {
            "buildCommand": "npm run build",
            "outputDirectory": "dist",
            "framework": null,
            "rewrites": [
                {
                    "source": "/(.*)",
                    "destination": "/index.html"
                }
            ],
            "headers": [
                {
                    "source": "/(.*)",
                    "headers": [
                        {
                            "key": "Cache-Control",
                            "value": "public, max-age=3600"
                        }
                    ]
                }
            ]
        };

        files.push({
            name: 'vercel.json',
            content: JSON.stringify(vercelJson, null, 2)
        });

        return {
            files,
            components: generatedComponents
        };
    } catch (error: any) {
        console.error('Error in generateWebsiteFiles:', error);
        // Don't expose internal error details
        throw new Error('Failed to generate website files');
    }
}

async function createGitHubRepo(repoName: string, files: any[], sitewide: any) {
    if (!GITHUB_TOKEN) {
        throw new Error('GITHUB_TOKEN not found');
    }

    const octokit = new Octokit({
        auth: GITHUB_TOKEN
    });

    try {
        // Get authenticated user
        const { data: user } = await octokit.users.getAuthenticated();

        // Create repository
        const { data: repo } = await octokit.repos.createForAuthenticatedUser({
            name: repoName,
            description: `Website for ${sitewide.companyName} - ${sitewide.industry}`,
            private: false,
            auto_init: false
        });

        // Create files in the repository
        for (const file of files) {
            await octokit.repos.createOrUpdateFileContents({
                owner: user.login,
                repo: repoName,
                path: file.name,
                message: `Add ${file.name}`,
                content: Buffer.from(file.content).toString('base64')
            });
        }

        // Get the latest commit SHA from the main branch
        let latestCommitSha = 'main';
        try {
            const { data: branchData } = await octokit.repos.getBranch({
                owner: user.login,
                repo: repoName,
                branch: 'main'
            });
            if (branchData && branchData.commit) {
                latestCommitSha = branchData.commit.sha;
            }
        } catch (error) {
            console.warn('Could not get latest commit SHA, using "main" branch');
        }

        return {
            repoUrl: repo.html_url,
            repoFullName: repo.full_name,
            repoOwner: user.login,
            repoId: repo.id, // GitHub repo ID (numeric)
            latestCommitSha: latestCommitSha
        };
    } catch (error: any) {
        console.error('GitHub repo creation error:', error);
        if (error.status === 422) {
            throw new Error('Repository name conflict. Please try again with a different company name.');
        }
        if (error.status === 401 || error.status === 403) {
            throw new Error('GitHub authentication failed');
        }
        // Don't expose internal error details
        throw new Error('Failed to create GitHub repository');
    }
}

async function deployToVercel(projectName: string, repoFullName: string, repoId: number | undefined, latestCommitSha: string | undefined, sitewide: any) {
    const token = process.env.VERCEL_TOKEN || VERCEL_TOKEN;
    if (!token) {
        console.error('VERCEL_TOKEN not found in deployToVercel function');
        return {
            url: null,
            projectUrl: 'https://vercel.com/dashboard',
            error: 'VERCEL_TOKEN not configured'
        };
    }
    
    console.log('Starting Vercel deployment for:', projectName, 'Repo:', repoFullName);

    try {
        // Step 1: Get Vercel team/user info
        const accountResponse = await fetch('https://api.vercel.com/v2/teams', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        let accountId: string | null = null;
        if (accountResponse.ok) {
            const teams: any = await accountResponse.json();
            if (teams.teams && teams.teams.length > 0) {
                accountId = teams.teams[0].id;
            }
        }
        
        // Get user info as fallback
        if (!accountId) {
            const userResponse = await fetch('https://api.vercel.com/v2/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (userResponse.ok) {
                const user: any = await userResponse.json();
                accountId = user.user?.id || null;
            }
        }

        const projectNameSlug = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-').substring(0, 52); // Vercel has 52 char limit
        
        // Step 2: Create Vercel project with GitHub integration
        console.log('Creating Vercel project:', projectNameSlug);
        const createProjectApiUrl = `https://api.vercel.com/v9/projects${accountId ? `?teamId=${accountId}` : ''}`;
        const createProjectResponse = await fetch(createProjectApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: projectNameSlug,
                gitRepository: {
                    type: 'github',
                    repo: repoFullName
                },
                framework: null, // Auto-detect framework
                publicSource: false
            })
        });

        let projectData: any;
        if (createProjectResponse.ok) {
            projectData = await createProjectResponse.json();
            console.log('Vercel project created:', projectData.id);
        } else {
            const errorData: any = await createProjectResponse.json().catch(() => ({}));
            console.error('Vercel project creation response:', createProjectResponse.status, errorData);
            
            if (errorData.error?.code === 'project_already_exists' || errorData.error?.message?.includes('already exists')) {
                // Get existing project
                const getProjectResponse = await fetch(`https://api.vercel.com/v9/projects/${projectNameSlug}${accountId ? `?teamId=${accountId}` : ''}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (getProjectResponse.ok) {
                    projectData = await getProjectResponse.json();
                    console.log('Using existing Vercel project:', projectData.id);
                } else {
                    throw new Error('Failed to get existing project');
                }
            } else {
                throw new Error(`Failed to create Vercel project: ${errorData.error?.message || 'Unknown error'}`);
            }
        }

        // Step 3: Trigger deployment manually using the project's git connection
        // The webhook might not trigger if the push happened before project creation
        console.log('Triggering Vercel deployment...');
        let deploymentUrl = `https://${projectNameSlug}.vercel.app`;
        let deploymentSuccess = false;
        
        // Wait a moment for Vercel to process the project creation and link to GitHub
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Try to trigger deployment using the project's git connection
        if (repoId && latestCommitSha) {
            try {
                const deploymentApiUrl = `https://api.vercel.com/v13/deployments${accountId ? `?teamId=${accountId}` : ''}`;
                const deploymentResponse = await fetch(deploymentApiUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: projectNameSlug,
                        project: projectData.id,
                        gitSource: {
                            type: 'github',
                            repoId: repoId,
                            ref: latestCommitSha,
                            sha: latestCommitSha
                        },
                        target: 'production'
                    })
                });

                if (deploymentResponse.ok) {
                    const deploymentData: any = await deploymentResponse.json();
                    console.log('Vercel deployment triggered:', deploymentData.url || deploymentData.alias?.[0]);
                    if (deploymentData.url) {
                        deploymentUrl = `https://${deploymentData.url}`;
                        deploymentSuccess = true;
                    } else if (deploymentData.alias && deploymentData.alias.length > 0) {
                        deploymentUrl = `https://${deploymentData.alias[0]}`;
                        deploymentSuccess = true;
                    } else if (deploymentData.readyState) {
                        // Deployment is in progress
                        console.log('Deployment in progress, will be available shortly');
                        deploymentSuccess = true;
                    }
                } else {
                    const deployError: any = await deploymentResponse.json().catch(() => ({}));
                    console.warn('Manual deployment trigger failed:', deployError);
                    // Fall back to checking for existing deployments
                }
            } catch (deployError: any) {
                console.warn('Deployment trigger error:', deployError.message);
            }
        }
        
        // If manual trigger didn't work, try to get existing deployments
        if (!deploymentSuccess) {
            try {
                const deploymentsUrl = `https://api.vercel.com/v6/deployments?projectId=${projectData.id}&limit=1${accountId ? `&teamId=${accountId}` : ''}`;
                const deploymentsResponse = await fetch(deploymentsUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (deploymentsResponse.ok) {
                    const deploymentsData: any = await deploymentsResponse.json();
                    if (deploymentsData.deployments && deploymentsData.deployments.length > 0) {
                        const latestDeployment = deploymentsData.deployments[0];
                        if (latestDeployment.url) {
                            deploymentUrl = `https://${latestDeployment.url}`;
                            deploymentSuccess = true;
                            console.log('Found existing deployment:', deploymentUrl);
                        }
                    }
                }
            } catch (error) {
                console.log('Could not fetch existing deployments');
            }
        }
        
        if (!deploymentSuccess) {
            console.log('Deployment will be triggered automatically via webhook or can be triggered manually from Vercel dashboard');
        }

        // Return the project URL
        const projectUrl = accountId 
            ? `https://vercel.com/${accountId}/${projectNameSlug}`
            : `https://vercel.com/dashboard`;

        return {
            url: deploymentUrl,
            projectUrl: projectUrl,
            projectId: projectData.id
        };

    } catch (error: any) {
        console.error('Vercel deployment error:', error);
        console.error('Error details:', error.message, error.stack);
        // Return error but don't fail the whole process
        return {
            url: null, // Will indicate deployment needs manual setup
            projectUrl: 'https://vercel.com/dashboard',
            error: error.message || 'Deployment failed'
        };
    }
}

// Helper function to get relevant images from stock photo APIs
// OPTIMIZED: Fast, timeout-protected, minimal API calls
async function getRelevantImages(sitewide: any, page: any, pageIndex: number): Promise<Array<{url: string, attribution?: string, photographer?: string, photographerUrl?: string}>> {
    const images: Array<{url: string, attribution?: string, photographer?: string, photographerUrl?: string}> = [];
    const pexelsApiKey = process.env.PEXELS_API_KEY;
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
    
    // IMPROVED: Build contextually relevant search terms based on page content
    const searchTerms: string[] = [];
    
    // Priority 1: Page-specific content (most relevant to what the page is about)
    if (page.title && page.information) {
        // Extract key nouns/phrases from page title and information
        const pageText = `${page.title} ${page.information}`.toLowerCase();
        
        // Remove common stop words and extract meaningful terms
        const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once'];
        
        // Extract meaningful words (3+ characters, not stop words)
        const words = pageText.split(/\s+/).filter(w => w.length >= 3 && !stopWords.includes(w));
        
        // Create search terms from page content
        if (words.length > 0) {
            // Use page title as primary search term
            const titleWords = page.title.toLowerCase().split(/\s+/).filter(w => w.length >= 3 && !stopWords.includes(w));
            if (titleWords.length > 0) {
                searchTerms.push(titleWords.slice(0, 3).join(' ')); // First 3 meaningful words from title
            }
            
            // Add industry context if relevant
            if (sitewide.industry && !pageText.includes(sitewide.industry.toLowerCase())) {
                searchTerms.push(`${titleWords[0] || words[0]} ${sitewide.industry}`.toLowerCase());
            }
        }
    }
    
    // Priority 2: Industry + company type (fallback if page content doesn't yield good terms)
    if (searchTerms.length === 0) {
        if (sitewide.industry && sitewide.companyType) {
            searchTerms.push(`${sitewide.industry} ${sitewide.companyType}`.toLowerCase().replace(/\//g, ' '));
        } else if (sitewide.industry) {
            searchTerms.push(sitewide.industry.toLowerCase());
        }
    }
    
    // Priority 3: Company name if it's descriptive (e.g., "Faro Landscaping" -> "landscaping")
    if (searchTerms.length < 2 && sitewide.companyName) {
        const companyWords = sitewide.companyName.toLowerCase().split(/\s+/).filter(w => w.length >= 4);
        if (companyWords.length > 1) {
            // Use descriptive words from company name (skip common business words)
            const businessWords = ['inc', 'llc', 'corp', 'ltd', 'company', 'co', 'group', 'services', 'solutions'];
            const descriptiveWords = companyWords.filter(w => !businessWords.includes(w));
            if (descriptiveWords.length > 0) {
                searchTerms.push(descriptiveWords[0]);
            }
        }
    }
    
    // Limit to 2 most relevant search terms
    const uniqueTerms = [...new Set(searchTerms)].slice(0, 2);
    
    // OPTIMIZATION: Fetch with timeout and parallel requests
    const fetchWithTimeout = async (url: string, options: any, timeoutMs: number = 3000): Promise<Response | null> => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            return null;
        }
    };
    
    // Try Pexels first (simpler attribution, free API) - OPTIMIZED: Only 1 search term, 3 second timeout
    if (pexelsApiKey && uniqueTerms.length > 0) {
        try {
            const term = uniqueTerms[0]; // Only use the best search term
            const response = await fetchWithTimeout(
                `https://api.pexels.com/v1/search?query=${encodeURIComponent(term)}&per_page=3&orientation=landscape`,
                {
                    headers: {
                        'Authorization': pexelsApiKey
                    }
                },
                2000 // 2 second timeout - fast fail
            );
            
            if (response && response.ok) {
                const data: any = await response.json();
                if (data.photos && data.photos.length > 0) {
                    // Only take the first (most relevant) image
                    const photo = data.photos[0];
                    images.push({
                        url: photo.src.large,
                        attribution: `Photo by ${photo.photographer} on Pexels`,
                        photographer: photo.photographer,
                        photographerUrl: photo.photographer_url
                    });
                    // Return early - we got an image, no need to try more
                    return images;
                }
            }
        } catch (error) {
            // Silently fail - images are optional
        }
    }
    
    // OPTIMIZATION: Skip Unsplash fallback entirely - saves 3-6 seconds per page
    // Images are optional - components can use CSS gradients/patterns if no images
    // If Pexels didn't work, just return empty array
    
    return images;
}

// Helper function to generate main page prompt
function generateMainPagePrompt(page: any, sitewide: any, pages: any[], pageLinks: any[], gamePlan: any, images: Array<{url: string, attribution?: string, photographer?: string, photographerUrl?: string}>): string {
    return `Create a professional, modern, high-quality HTML file for the MAIN/HOME page of a website.

Company: ${sitewide.companyName}
Industry: ${sitewide.industry}
Company Type: ${sitewide.companyType}
Page: ${page.title}
Page Information: ${page.information}

Contact Information:
- Address: ${sitewide.fullAddress}
- Phone: ${sitewide.phoneNumber}
- Email: ${sitewide.email}

Colors: ${sitewide.colors}
Brand Themes: ${sitewide.brandThemes}
Extra Details: ${sitewide.extraDetailedInfo || ''}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

CRITICAL REQUIREMENTS - FOLLOW EXACTLY:

STRUCTURE & SEMANTICS:
1. MUST include <link rel="stylesheet" href="styles.css"> in the <head> section
2. MUST include <script src="script.js"></script> before closing </body> tag
3. Navigation links MUST use correct file paths: ${JSON.stringify(pageLinks)}
4. Use semantic HTML5 with proper structure: <header>, <nav>, <main>, <section>, <article>, <footer>
5. Include comprehensive meta tags for SEO (title, description, keywords, author, Open Graph)
6. Mobile-responsive structure with viewport meta tag
7. Use CSS classes for ALL styling - NO inline styles except for critical CSS

HEADER REQUIREMENTS (CRITICAL):
8. Header MUST have a clear, professional structure:
   - Company name/logo on the left (use <h1> or logo image)
   - Navigation menu on the right (horizontal list of links)
   - Contact info (phone/email) visible in header if space allows
   - Sticky/fixed header is preferred for modern look
   - Header should be visually distinct with background color or border

BUTTONS vs LINKS (CRITICAL - THIS IS IMPORTANT):
9. USE <button> ELEMENTS for ALL call-to-action buttons, NOT <a> tags:
   - "Contact Us" buttons → <button class="btn btn-primary">Contact Us</button>
   - "Get Started" buttons → <button class="btn btn-primary">Get Started</button>
   - "Book Now" buttons → <button class="btn btn-primary">Book Now</button>
   - "Learn More" buttons → <button class="btn btn-secondary">Learn More</button>
   - ONLY use <a> tags for navigation links in the menu and footer
   - Buttons MUST have proper CSS classes (btn, btn-primary, btn-secondary, etc.)
   - Buttons should be visually prominent with padding, background colors, and hover effects

NAVIGATION:
10. Navigation menu MUST be properly structured:
    - Use <nav> element with <ul> and <li> for menu items
    - All pages should be linked: ${pages.map(p => p.title).join(', ')}
    - Active page should be indicated (current-page class)
    - Mobile hamburger menu structure should be included

IMAGES (BE SELECTIVE - QUALITY OVER QUANTITY):
11. Available images (use ONLY if contextually relevant):
${images.length > 0 ? images.map((img, idx) => `   Image ${idx + 1}: ${img.url}`).join('\n') : '   No images available'}

CRITICAL IMAGE RULES:
- Only use images that make sense for the content and context
- If an image doesn't fit, use CSS gradients, solid colors, or geometric patterns instead
- Better to have no image than an irrelevant/out-of-place image
- Images should enhance the design, not distract
- Hero section can use background images if relevant, otherwise use gradients
- Service/feature sections can use icons or patterns instead of photos if images don't fit

12. NO ATTRIBUTION ON PAGE: Do NOT include photo attribution on this page
13. FOOTER ATTRIBUTION LINK: Include a small footer link: <a href="attributions.html">Photo Credits</a>

CONTENT STRUCTURE:
14. Hero section MUST be visually stunning:
    - Large, compelling headline (h1)
    - Subheadline or description
    - Primary call-to-action BUTTON (not link)
    - Background image or gradient
    - Proper spacing and visual hierarchy

15. Service/Features section:
    - Use cards or grid layout
    - Each service/feature in its own card
    - Icons or images for each item
    - Clear headings and descriptions

16. Footer MUST include:
    - Company name and tagline
    - Contact information (address, phone, email)
    - Navigation links
    - Copyright notice
    - Attribution link if images are used

FORMS:
${sitewide.contactForm ? '17. Contact form MUST be properly structured with <form>, <input>, <textarea>, <button type="submit"> elements' : ''}
${sitewide.bookingForm ? '18. Booking form MUST include date/time pickers and proper form structure' : ''}

QUALITY STANDARDS:
19. All text MUST be grammatically correct and professional
20. Use proper semantic HTML elements (h1-h6, p, ul, li, img with alt attributes)
21. Include proper ARIA labels where appropriate
22. Ensure proper heading hierarchy (one h1 per page, then h2, h3, etc.)
23. All interactive elements must be properly styled and accessible

Return ONLY the complete, valid HTML5 code with proper CSS and JS links, no explanations or markdown formatting.`;
}

// Helper function to generate sub-page prompt
function generateSubPagePrompt(page: any, sitewide: any, pages: any[], pageLinks: any[], gamePlan: any, images: Array<{url: string, attribution?: string, photographer?: string, photographerUrl?: string}>): string {
    return `Create a professional, modern, high-quality HTML file for the "${page.title}" page.

Company: ${sitewide.companyName}
Industry: ${sitewide.industry}
Page Information: ${page.information}

Contact Information:
- Address: ${sitewide.fullAddress}
- Phone: ${sitewide.phoneNumber}
- Email: ${sitewide.email}

Colors: ${sitewide.colors}
Brand Themes: ${sitewide.brandThemes}
Extra Details: ${sitewide.extraDetailedInfo || ''}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

Navigation links MUST use correct file paths: ${JSON.stringify(pageLinks)}

CRITICAL REQUIREMENTS - FOLLOW EXACTLY:

STRUCTURE:
1. MUST include <link rel="stylesheet" href="styles.css"> in the <head> section
2. MUST include <script src="script.js"></script> before closing </body> tag
3. Match the EXACT style and structure of the main page (index.html)
4. Use the SAME navigation menu structure as the main page
5. Link to styles.css and script.js (same files as main page)
6. Mobile-responsive with same breakpoints
7. Use CSS classes for ALL styling - NO inline styles
8. Use the SAME CSS class names as the main page for consistency

HEADER (MUST MATCH MAIN PAGE):
9. Header structure MUST be identical to index.html:
   - Same logo/company name placement
   - Same navigation menu structure
   - Same styling classes
   - Same contact info placement

BUTTONS vs LINKS (CRITICAL):
10. USE <button> ELEMENTS for ALL call-to-action buttons, NOT <a> tags:
    - "Contact Us" → <button class="btn btn-primary">Contact Us</button>
    - "Submit" → <button type="submit" class="btn btn-primary">Submit</button>
    - "Book Appointment" → <button class="btn btn-primary">Book Appointment</button>
    - ONLY use <a> tags for navigation links in menu and footer
    - Buttons MUST use the same CSS classes as main page (btn, btn-primary, etc.)

CONTENT:
11. USE REAL IMAGES: Here are relevant stock photos you can use:
${images.length > 0 ? images.map((img, idx) => `   Image ${idx + 1}: ${img.url}`).join('\n') : '   Use CSS gradients or modern design elements if images are not available'}
12. NO ATTRIBUTION ON PAGE: Do NOT include photo attribution on this page
13. FOOTER ATTRIBUTION LINK: Include footer link: <a href="attributions.html">Photo Credits</a>

FORMS (if applicable):
${page.title.toLowerCase().includes('contact') && sitewide.contactForm ? '14. Contact form MUST use proper form structure:\n   - <form> element with action and method\n   - <input> elements with proper types (text, email, tel)\n   - <textarea> for messages\n   - <button type="submit"> for submit button (NOT <a> tag)\n   - Proper labels and placeholders' : ''}
${page.title.toLowerCase().includes('book') && sitewide.bookingForm ? '14. Booking form MUST include:\n   - <form> element\n   - Date picker input (type="date")\n   - Time picker input (type="time")\n   - <button type="submit"> for submit (NOT <a> tag)\n   - Proper form validation attributes' : ''}

QUALITY:
15. All text MUST be grammatically correct and professional
16. Maintain visual consistency with the main page design
17. Use proper semantic HTML elements
18. Ensure proper heading hierarchy

IMPORTANT: This page must look identical in style to the main page. Use the same CSS classes and structure.
Navigation must work correctly. Home link should be: <a href="index.html">Home</a>

Return ONLY the complete HTML code with proper CSS and JS links, no explanations or markdown formatting.`;
}

// Helper function to refine all pages for consistency
// Optimized to be faster and more reliable
async function refineAllPages(genAI: GoogleGenAI, model: string, generatedPages: any[], sitewide: any, pages: any[], pageLinks: any[], gamePlan: any): Promise<any[]> {
    // For speed, only send page summaries instead of full content
    const pageSummaries = generatedPages.map((p, i) => {
        // Extract key elements for consistency checking
        const navMatch = p.content.match(/<nav[^>]*>[\s\S]*?<\/nav>/i);
        const footerMatch = p.content.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
        return {
            name: p.name,
            navStructure: navMatch ? navMatch[0].substring(0, 500) : 'No nav found',
            footerStructure: footerMatch ? footerMatch[0].substring(0, 500) : 'No footer found',
            hasAttributionLink: p.content.includes('attributions.html'),
            contentLength: p.content.length
        };
    });
    
    const refinementPrompt = `You are a senior web developer doing a quick consistency check. Review these page summaries and provide specific improvements:

Page Summaries:
${JSON.stringify(pageSummaries, null, 2)}

Company: ${sitewide.companyName}
Design Guidelines: ${JSON.stringify(gamePlan, null, 2)}
Page Links: ${JSON.stringify(pageLinks)}

Provide a brief JSON response with specific improvements needed:
{
  "improvements": [
    {"page": "index.html", "issues": ["missing attribution link in footer", "nav structure inconsistent"]},
    {"page": "page2.html", "issues": ["footer missing contact info"]}
  ],
  "globalIssues": ["All pages should have attribution link in footer"]
}

Return ONLY the JSON, no explanations.`;

    const refinementChat = genAI.chats.create({
        model: model,
        config: {
            systemInstruction: 'You are a senior web developer specializing in code review and refinement. Your job is to improve code quality, consistency, and ensure production-ready output.'
        }
    });

    try {
        const refinementResult = await refinementChat.sendMessage({ message: refinementPrompt });
        const refinementText = refinementResult.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        try {
            const improvements: any = JSON.parse(refinementText);
            
            // Apply improvements to pages (quick fixes only)
            return generatedPages.map(page => {
                let content = page.content;
                
                // Ensure attribution link in footer if we have attributions
                if (!content.includes('attributions.html') && improvements.globalIssues?.some((issue: string) => issue.includes('attribution'))) {
                    // Add attribution link to footer
                    content = content.replace(/<\/footer>/i, (match) => {
                        return `        <p style="text-align: center; font-size: 0.85rem; opacity: 0.7; margin-top: 1rem;">
            <a href="attributions.html" style="color: inherit; text-decoration: none;">Photo Credits</a>
        </p>\n    ${match}`;
                    });
                }
                
                return {
                    name: page.name,
                    content: content
                };
            });
        } catch (parseError) {
            console.warn('Failed to parse refinement JSON, using original pages');
        }
    } catch (error) {
        console.warn('Refinement failed, using original pages:', error);
    }
    
    // Fallback to original pages if refinement fails
    return generatedPages;
}

// Helper function to refine CSS
async function refineCss(genAI: GoogleGenAI, model: string, cssContent: string, pages: any[], sitewide: any, gamePlan: any): Promise<string> {
    const cssRefinementPrompt = `You are a senior CSS developer. Review and refine this CSS to ensure:

1. All CSS classes used in the HTML pages are properly styled
2. Consistent design system (colors, spacing, typography)
3. Modern, professional appearance
4. Full responsiveness (mobile, tablet, desktop)
5. Smooth animations and transitions
6. Proper hover states and interactive elements
7. Accessibility (contrast, focus states)

CSS to refine:
${cssContent.substring(0, 5000)}...

Design Guidelines: ${JSON.stringify(gamePlan, null, 2)}
Colors: ${sitewide.colors}
Brand Themes: ${sitewide.brandThemes}

Return the complete, refined CSS code. Return ONLY the CSS code, no explanations or markdown formatting.`;

    const cssRefinementChat = genAI.chats.create({
        model: model,
        config: {
            systemInstruction: 'You are a senior CSS developer. Generate production-ready, modern CSS code.'
        }
    });

    try {
        const cssRefinementResult = await cssRefinementChat.sendMessage({ message: cssRefinementPrompt });
        const refinedCss = cssRefinementResult.text.replace(/```css\n?/g, '').replace(/```\n?/g, '').trim();
        return refinedCss || cssContent;
    } catch (error) {
        console.warn('CSS refinement failed, using original CSS:', error);
        return cssContent;
    }
}

// Helper function to clean and improve HTML content
function cleanHtmlContent(html: string, sitewide: any): string {
    let cleaned = html;
    
    // Remove placeholder images and replace with CSS-based alternatives
    cleaned = cleaned.replace(/<img[^>]*src=["']https?:\/\/via\.placeholder\.com[^"']*["'][^>]*>/gi, (match) => {
        // Extract alt text if present
        const altMatch = match.match(/alt=["']([^"']*)["']/i);
        const altText = altMatch ? altMatch[1] : 'Image';
        // Replace with a div that can be styled with CSS
        return `<div class="placeholder-image" aria-label="${altText}"></div>`;
    });
    
    // Fix common text errors
    cleaned = cleaned.replace(/notbrin/g, 'not only');
    
    // Ensure proper HTML structure
    if (!cleaned.includes('<!DOCTYPE html>')) {
        cleaned = '<!DOCTYPE html>\n' + cleaned;
    }
    
    // Fix relative paths for assets
    cleaned = cleaned.replace(/href=["']https?:\/\/[^"']*\/styles\.css["']/gi, 'href="styles.css"');
    cleaned = cleaned.replace(/src=["']https?:\/\/[^"']*\/script\.js["']/gi, 'src="script.js"');
    
    // Ensure proper meta tags
    if (!cleaned.includes('<meta name="viewport"')) {
        cleaned = cleaned.replace(/<head[^>]*>/i, (match) => 
            match + '\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">'
        );
    }
    
    // Fix contact information if it's a placeholder
    cleaned = cleaned.replace(/YourLocationLink/g, '#');
    cleaned = cleaned.replace(/maps\.app\.goo\.gl\/YourLocationLink/g, '#');
    
    return cleaned;
}

// Helper function to clean and improve CSS content
function cleanCssContent(css: string, sitewide: any): string {
    let cleaned = css;
    
    // Ensure CSS reset is present
    if (!cleaned.includes('box-sizing') && !cleaned.includes('* {')) {
        cleaned = `/* CSS Reset */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

\n` + cleaned;
    }
    
    // Add placeholder image styling if not present
    if (!cleaned.includes('.placeholder-image')) {
        cleaned += `

/* Placeholder images - styled divs */
.placeholder-image {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 200px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    position: relative;
    overflow: hidden;
}

.placeholder-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" opacity="0.3"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>') center/50px no-repeat;
}
`;
    }
    
    // Ensure responsive design
    if (!cleaned.includes('@media')) {
        cleaned += `

/* Responsive Design */
@media (max-width: 768px) {
    /* Mobile styles */
}

@media (min-width: 769px) and (max-width: 1024px) {
    /* Tablet styles */
}

@media (min-width: 1025px) {
    /* Desktop styles */
}
`;
    }
    
    return cleaned;
}

// Helper function to generate attribution page
function generateAttributionPage(sitewide: any, attributions: Array<{url: string, attribution: string, photographer?: string, photographerUrl?: string}>, pageLinks: any[]): string {
    const attributionLinks = pageLinks.map(link => 
        link.file === 'index.html' 
            ? `<li><a href="index.html">${link.title}</a></li>`
            : `<li><a href="${link.file}">${link.title}</a></li>`
    ).join('\n                ');
    
    const attributionList = attributions.map((attr) => {
        if (attr.photographer && attr.photographerUrl) {
            return `            <li>
                <a href="${attr.photographerUrl}" target="_blank" rel="noopener noreferrer">${attr.attribution}</a>
            </li>`;
        } else {
            return `            <li>${attr.attribution}</li>`;
        }
    }).join('\n');
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Photo attributions and credits for ${sitewide.companyName}">
    <title>Photo Attributions - ${sitewide.companyName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="site-header">
        <div class="header-container">
            <a href="index.html" class="site-logo">
                <h1>${sitewide.companyName}</h1>
            </a>
            <nav class="main-nav">
                <ul class="nav-list">
                    ${attributionLinks}
                    <li class="nav-item"><a href="attributions.html" class="nav-link current-page">Attributions</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="main-content">
        <section class="section-padding">
            <div class="container">
                <h1 class="section-title">Photo Attributions</h1>
                <p class="section-description">
                    We would like to thank the talented photographers who have contributed images to this website. 
                    All photos are used in accordance with their respective licenses.
                </p>
                
                <div class="attributions-list">
                    <ul>
${attributionList}
                    </ul>
                </div>
                
                <div class="attribution-note">
                    <p><small>
                        All images are used under their respective licenses. 
                        Please visit the photographer's profile for more information about usage rights.
                    </small></p>
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="footer-container">
            <div class="footer-brand">
                <p class="footer-tagline">${sitewide.companyName}</p>
            </div>
            <nav class="footer-nav">
                <h3 class="footer-heading">Quick Links</h3>
                <ul class="footer-nav-list">
                    ${attributionLinks}
                    <li><a href="attributions.html" class="footer-nav-link">Attributions</a></li>
                </ul>
            </nav>
            <div class="footer-contact-info">
                <h3 class="footer-heading">Contact Us</h3>
                <address class="contact-details">
                    <p>${sitewide.fullAddress}</p>
                    <p>Phone: <a href="tel:${sitewide.phoneNumber}" class="contact-link">${sitewide.phoneNumber}</a></p>
                    <p>Email: <a href="mailto:${sitewide.email}" class="contact-link">${sitewide.email}</a></p>
                </address>
            </div>
        </div>
        <div class="footer-bottom">
            <p class="copyright">© ${new Date().getFullYear()} ${sitewide.companyName}. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`;
}

// ============================================================================
// REACT + TAILWIND GENERATION FUNCTIONS
// ============================================================================

// Helper function to generate React component prompt for main page
function generateMainPageReactPrompt(page: any, sitewide: any, pages: any[], pageRoutes: any[], gamePlan: any, images: Array<{url: string, attribution?: string, photographer?: string, photographerUrl?: string}>, pageRoute: any): string {
    const colors = parseColors(sitewide.colors || '');
    const primaryColor = colors.primary || '#D32F2F';
    const secondaryColor = colors.secondary || '#FFC107';
    
    return `Create a professional, modern, high-quality React/TypeScript component for the MAIN/HOME page using Tailwind CSS.

Company: ${sitewide.companyName}
Industry: ${sitewide.industry}
Company Type: ${sitewide.companyType}
Page: ${page.title}
Page Information: ${page.information}

Contact Information:
- Address: ${sitewide.fullAddress}
- Phone: ${sitewide.phoneNumber}
- Email: ${sitewide.email}

COLORS (USE THESE EXACT VALUES):
- Primary Color: ${primaryColor}
- Secondary Color: ${secondaryColor}
- IMPORTANT: Replace ALL instances of [primary-color] with ${primaryColor} and [secondary-color] with ${secondaryColor} in your Tailwind classes
- Example: Use "bg-[${primaryColor}]" or style={{ backgroundColor: '${primaryColor}' }} instead of "bg-[primary-color]"

Brand Themes: ${sitewide.brandThemes}
Extra Details: ${sitewide.extraDetailedInfo || ''}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

CONTENT QUALITY REQUIREMENTS (CRITICAL):
- ALL content must be SPECIFIC to ${sitewide.companyName} - NO generic placeholder text
- Use the provided "Page Information: ${page.information}" to create relevant, business-specific content
- DO NOT generate fake statistics, metrics, or numbers (e.g., "10+ years", "100+ clients", "500+ projects") unless explicitly provided in the company information
- DO NOT use placeholder text like "Lorem ipsum" or generic descriptions
- Every section should reflect the ACTUAL business: ${sitewide.companyName} in ${sitewide.industry}
- Make content compelling and specific to this company's unique value proposition
- If you need to mention experience or achievements, base them ONLY on information provided, or use qualitative descriptions like "experienced team" rather than fake numbers

CRITICAL REQUIREMENTS:

1. Use React with TypeScript (React.FC)
2. Use Tailwind CSS utility classes extensively (NO custom CSS files)
3. Import and use React Helmet Async (import { Helmet } from 'react-helmet-async') for SEO meta tags
4. Component name: ${pageRoute.component}
5. Use proper TypeScript types
6. IMPORTANT: Import from 'react-helmet-async', NOT 'react-helmet'

HEADER (CRITICAL - MUST USE SHARED COMPONENT):
- DO NOT create a custom header/navbar
- MUST import and use the shared Navbar component: import Navbar from '../components/Navbar';
- Use <Navbar /> at the top of your component
- The Navbar component handles all navigation, styling, and responsive behavior
- Navigation links: ${pageRoutes.map(p => `${p.title} -> ${p.route}`).join(', ')}

BUTTONS (CRITICAL):
- Use <button> elements for CTAs, NOT <a> tags
${(() => {
    const colors = parseColors(sitewide.colors || '');
    const primary = colors.primary || '#D32F2F';
    return `- Primary buttons: "px-6 py-3 text-white rounded-lg font-semibold transition-all hover:scale-105" with style={{ backgroundColor: '${primary}' }} or className="bg-[${primary}]"
- Secondary buttons: "px-6 py-3 border-2 rounded-lg font-semibold transition-all" with style={{ borderColor: '${primary}', color: '${primary}' }} or className="border-[${primary}] text-[${primary}]"`;
})()}
- Buttons MUST look like buttons with padding, background, rounded corners
- ALL buttons MUST have proper functionality:
  * "Learn More" buttons MUST link to relevant sections using onClick handlers: onClick={() => document.getElementById('section-id')?.scrollIntoView({ behavior: 'smooth' })}
  * "Contact Us" buttons MUST scroll to contact section or link to /contact: onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} or href="/contact"
  * CTA buttons MUST have proper onClick handlers or href attributes
  * NO placeholder buttons that don't do anything - every button must have a purpose and WORK

HERO SECTION:
- Full-width section with compelling design
- Large headline: "text-5xl md:text-7xl font-bold text-white"
- Subheadline: "text-xl md:text-2xl text-slate-300"
- CTA button prominently placed
- Background: Use solid color, simple gradient, or image with SOLID rgba() overlay (NOT backdrop-blur or brightness filters)
- IMPORTANT: The navbar is fixed with height 80px. Your hero section MUST start with padding-top: "pt-20" or "pt-24" on the first element to prevent content from being hidden behind the fixed navbar
- NEVER use backdrop-blur or brightness() filters - they create visual artifacts

IMAGES:
${images.length > 0 ? `Available images (use ONLY if contextually relevant):
${images.map((img, idx) => `   Image ${idx + 1}: ${img.url}`).join('\n')}
If images don't fit, use Tailwind gradients instead.` : 'Use Tailwind gradients or patterns instead of images.'}

CONTENT SECTIONS:
- Service/feature cards: "bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
- Proper spacing: "py-20 px-6"
- Max width container: "max-w-7xl mx-auto"
- Each section must have a clear purpose and make logical sense
- Sections should flow naturally from one to the next
- Content in each section must be relevant and specific to ${sitewide.companyName}
- No sections that don't add value or make sense in context

VISUAL CONSISTENCY (CRITICAL - NO BRIGHTNESS CHANGES):
- NEVER use backdrop-blur, brightness(), or filter: brightness() - these create visual artifacts and weird lines
- NEVER change opacity between sections in ways that create visual artifacts
- Use solid backgrounds or simple gradients only
- Maintain consistent visual styling throughout - no sudden brightness/opacity changes
- If you need overlays, use solid rgba() backgrounds, NOT backdrop-blur or brightness filters
- All sections should have consistent visual weight - no jarring transitions

FOOTER (CRITICAL - MUST USE SHARED COMPONENT):
- DO NOT create a custom footer - the shared Footer component is already included in App.tsx
- DO NOT import or use Footer component in your page component
- DO NOT create any <footer> elements or footer content
- The Footer component is automatically rendered by App.tsx and wraps all pages
- Your component should end with your content sections, NOT a footer
${images.length > 0 ? '- Footer includes attribution link automatically' : ''}

FORMS:
${sitewide.contactForm ? '- Contact form with proper Tailwind styling\n- Input fields: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-400"\n- Submit button: use button element with primary button classes\n- Form must have proper validation (required fields, email format, etc.)\n- Form must have proper labels for accessibility\n- Form must have a working submit handler (can use onSubmit with preventDefault)\n- Show success/error messages appropriately' : ''}
${sitewide.bookingForm ? '- Booking form with date/time inputs\n- Same input styling as contact form\n- Date picker and time selection must work\n- Form validation for all required fields\n- Proper labels and accessibility' : ''}

SEO:
- Use React Helmet Async (import { Helmet } from 'react-helmet-async') to set:
  * Title: "${sitewide.companyName} - ${page.title}"
  * Description: Compelling description based on page information
  * Open Graph tags
  * Canonical URL
- IMPORTANT: Import from 'react-helmet-async', NOT 'react-helmet'

RESPONSIVE:
- Mobile-first approach
- Use Tailwind breakpoints: md:, lg:, xl:
- Hamburger menu for mobile navigation

Return ONLY the complete React/TypeScript component code, no explanations or markdown formatting.`;
}

// Helper function to generate React component prompt for sub-pages
function generateSubPageReactPrompt(page: any, sitewide: any, pages: any[], pageRoutes: any[], gamePlan: any, images: Array<{url: string, attribution?: string, photographer?: string, photographerUrl?: string}>, pageRoute: any): string {
    const colors = parseColors(sitewide.colors || '');
    const primaryColor = colors.primary || '#D32F2F';
    const secondaryColor = colors.secondary || '#FFC107';
    
    return `Create a professional, modern, high-quality React/TypeScript component for the "${page.title}" page using Tailwind CSS.

Company: ${sitewide.companyName}
Industry: ${sitewide.industry}
Page Information: ${page.information}

Contact Information:
- Address: ${sitewide.fullAddress}
- Phone: ${sitewide.phoneNumber}
- Email: ${sitewide.email}

COLORS (USE THESE EXACT VALUES):
- Primary Color: ${primaryColor}
- Secondary Color: ${secondaryColor}
- IMPORTANT: Replace ALL instances of [primary-color] with ${primaryColor} and [secondary-color] with ${secondaryColor} in your Tailwind classes
- Example: Use "bg-[${primaryColor}]" or style={{ backgroundColor: '${primaryColor}' }} instead of "bg-[primary-color]"

Brand Themes: ${sitewide.brandThemes}
Extra Details: ${sitewide.extraDetailedInfo || ''}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

CONTENT QUALITY REQUIREMENTS (CRITICAL):
- ALL content must be SPECIFIC to ${sitewide.companyName} - NO generic placeholder text
- Use the provided "Page Information: ${page.information}" to create relevant, business-specific content
- DO NOT generate fake statistics, metrics, or numbers (e.g., "10+ years", "100+ clients", "500+ projects") unless explicitly provided in the company information
- DO NOT use placeholder text like "Lorem ipsum" or generic descriptions
- Every section should reflect the ACTUAL business: ${sitewide.companyName} in ${sitewide.industry}
- Make content compelling and specific to this company's unique value proposition
- If you need to mention experience or achievements, base them ONLY on information provided, or use qualitative descriptions like "experienced team" rather than fake numbers

CRITICAL REQUIREMENTS:

1. Use React with TypeScript (React.FC)
2. Use Tailwind CSS utility classes extensively
3. Import and use React Helmet Async (import { Helmet } from 'react-helmet-async') for SEO meta tags
4. Component name: ${pageRoute.component}
5. IMPORTANT: Import from 'react-helmet-async', NOT 'react-helmet'
5. Match the style and structure of the Home component
6. Use the SAME header and footer structure as Home

HEADER (CRITICAL - MUST USE SHARED COMPONENT):
- DO NOT create a custom header/navbar - the shared Navbar component is already included in App.tsx
- DO NOT import or use Navbar component in your page component
- DO NOT create any <header> or <nav> elements
- The Navbar component is automatically rendered by App.tsx and wraps all pages
- Your component should start with your content (hero section, etc.), NOT a header/navbar
- IMPORTANT: The navbar is fixed with height 80px. Your first element MUST have padding-top: "pt-20" or "pt-24" to prevent content from being hidden behind the fixed navbar

BUTTONS:
- Use <button> elements for CTAs
- Primary buttons: Use "px-6 py-3 text-white rounded-lg font-semibold transition-all hover:scale-105" with style={{ backgroundColor: '${primaryColor}' }} or className="bg-[${primaryColor}]"
- Secondary buttons: Use "px-6 py-3 border-2 rounded-lg font-semibold transition-all" with style={{ borderColor: '${primaryColor}', color: '${primaryColor}' }} or className="border-[${primaryColor}] text-[${primaryColor}]"
- ALL buttons MUST have proper functionality:
  * "Learn More" buttons MUST scroll to relevant sections: onClick={() => document.getElementById('section-id')?.scrollIntoView({ behavior: 'smooth' })}
  * "Contact Us" buttons MUST scroll to contact section: onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} or link to /contact
  * CTA buttons MUST have proper onClick handlers
  * NO placeholder buttons - every button must work

IMAGES:
${images.length > 0 ? `Available images (use ONLY if relevant):
${images.map((img, idx) => `   Image ${idx + 1}: ${img.url}`).join('\n')}` : 'Use Tailwind gradients or patterns.'}

CONTENT:
- Match Home component's spacing and layout patterns
- Use same card styles, typography scale, and color scheme
- IMPORTANT: The navbar is fixed with height 80px. Your first element MUST have padding-top: "pt-20" or "pt-24" to prevent content from being hidden behind the fixed navbar

SEO:
- Use React Helmet Async (import { Helmet } from 'react-helmet-async') with page-specific title and description
- IMPORTANT: Import from 'react-helmet-async', NOT 'react-helmet'

Return ONLY the complete React/TypeScript component code, no explanations or markdown formatting.`;
}

// Helper function to clean React component content
function cleanReactContent(content: string, sitewide: any): string {
    let cleaned = content;
    
    // Ensure proper imports
    if (!cleaned.includes("import React")) {
        cleaned = "import React from 'react';\n" + cleaned;
    }
    
    // Fix incorrect react-helmet imports to react-helmet-async
    cleaned = cleaned.replace(/from ['"]react-helmet['"]/g, "from 'react-helmet-async'");
    cleaned = cleaned.replace(/from ['"]react-helmet\/async['"]/g, "from 'react-helmet-async'");
    
    if (!cleaned.includes("import { Helmet }") && cleaned.includes("<Helmet")) {
        cleaned = cleaned.replace(/import React[^;]+;/, (match) => match + "\nimport { Helmet } from 'react-helmet-async';");
    }
    if (!cleaned.includes("from 'react-router-dom'") && (cleaned.includes("<Link") || cleaned.includes("useLocation"))) {
        cleaned = cleaned.replace(/import[^;]+Helmet[^;]+;/, (match) => match + "\nimport { Link, useLocation } from 'react-router-dom';");
    }
    
    // NOTE: Navbar and Footer are NOT added to page components
    // They are already included in App.tsx which wraps all routes
    // Page components should only return their content, not Navbar/Footer
    // Remove any Navbar/Footer imports or usage that might have been incorrectly added
    cleaned = cleaned.replace(/import\s+Navbar\s+from[^;]+;\s*/g, '');
    cleaned = cleaned.replace(/import\s+Footer\s+from[^;]+;\s*/g, '');
    cleaned = cleaned.replace(/<Navbar\s*\/?>\s*/g, '');
    cleaned = cleaned.replace(/<Footer\s*\/?>\s*/g, '');
    
    // Remove backdrop-blur and brightness filters that cause visual artifacts
    cleaned = cleaned.replace(/backdrop-blur-\[?[^\s"'`)]+\]?/g, '');
    cleaned = cleaned.replace(/backdrop-blur/g, '');
    cleaned = cleaned.replace(/filter:\s*brightness\([^)]+\)/g, '');
    cleaned = cleaned.replace(/brightness\([^)]+\)/g, '');
    cleaned = cleaned.replace(/style=\{\{[^}]*brightness[^}]*\}\}/g, (match) => {
        return match.replace(/brightness\([^)]+\)/g, '').replace(/,\s*,/g, ',').replace(/,\s*\}/g, '}');
    });
    
    // Fix common issues
    cleaned = cleaned.replace(/className=/g, 'className=');
    cleaned = cleaned.replace(/class=/g, 'className=');
    
    return cleaned;
}

// ============================================================================
// REACT CONFIG FILE GENERATORS
// ============================================================================

function generatePackageJson(sitewide: any): any {
    return {
        name: `${sitewide.companyName.toLowerCase().replace(/\s+/g, '-')}-website`,
        private: true,
        version: "1.0.0",
        type: "module",
        scripts: {
            dev: "vite",
            build: "npm run build:client && npm run build:server && npm run prerender",
            "build:client": "vite build --outDir dist",
            "build:server": "vite build --ssr entry-server.tsx --outDir dist-server",
            prerender: "node prerender.js",
            preview: "vite preview"
        },
        dependencies: {
            "react": "^18.3.1",
            "react-dom": "^18.3.1",
            "react-router-dom": "^6.22.3",
            "react-helmet-async": "^2.0.5",
            "framer-motion": "^12.23.24",
            "lucide-react": "^0.554.0"
        },
        devDependencies: {
            "@types/node": "^22.14.0",
            "@types/react": "^18.3.0",
            "@types/react-dom": "^18.3.0",
            "@vitejs/plugin-react": "^5.0.0",
            "typescript": "~5.8.2",
            "vite": "^6.2.0"
        }
    };
}

function generateViteConfig(): string {
    return `import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
    cssMinify: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        manualChunks(id) {
          // Only create chunks for client-side code, not SSR
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('framer-motion')) {
              return 'vendor';
            }
            if (id.includes('lucide-react')) {
              return 'ui';
            }
            return 'vendor'; // Other node_modules
          }
        }
      }
    }
  },
  ssr: {
    noExternal: ['react-helmet-async']
  }
});`;
}

// Fallback React component generator used when Gemini times out
function generateFallbackReactComponent(page: any, sitewide: any, isHome: boolean): string {
    const title = page?.title || (isHome ? sitewide.companyName || 'Home' : 'Page');
    const description = page?.description || sitewide.description || `${sitewide.companyName || ''} website`;
    const heroHeading = isHome ? `${sitewide.companyName || title}` : title;
    const componentName = isHome ? 'Home' : title.replace(/\s+/g, '');

    return `import React from 'react';
import { Helmet } from 'react-helmet-async';

const ${componentName}: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>${title} - ${sitewide.companyName || ''}</title>
        <meta name="description" content="${description}" />
      </Helmet>
      <div className="pt-24 pb-16 min-h-screen bg-[#020202] text-slate-200">
        <section className="max-w-6xl mx-auto px-6">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-emerald-400 uppercase mb-4">
                ${sitewide.industry || 'Premium Services'}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                ${heroHeading}
              </h1>
              <p className="text-base md:text-lg text-slate-400 mb-8 max-w-xl">
                ${description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-500 text-slate-950 font-semibold text-sm tracking-wide hover:bg-emerald-400 transition-colors"
                >
                  Get a Free Quote
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-600 text-slate-100 font-semibold text-sm tracking-wide hover:border-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  View Services
                </a>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6 text-sm text-slate-400">
                <div>
                  <p className="text-2xl font-semibold text-white mb-1">10+</p>
                  <p>Years of experience</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white mb-1">100+</p>
                  <p>Projects completed</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white mb-1">5.0</p>
                  <p>Average rating</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
              <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-slate-800 to-emerald-400/10 border border-slate-700/80 flex items-center justify-center">
                  <p className="text-slate-300 text-center max-w-xs text-sm md:text-base">
                    This page was generated using a fast fallback template because the AI model took too long to respond.
                    You can refine it later using the AI Edit feature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="max-w-6xl mx-auto px-6 mt-20">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                Our core services
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-xl">
                High-quality, professional services tailored to your needs. This section is a starting point and can be fully customized.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Consultation</h3>
              <p className="text-sm text-slate-400 mb-4">
                We discuss your goals, preferences, and requirements to craft the perfect solution.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Design & Planning</h3>
              <p className="text-sm text-slate-400 mb-4">
                A clear, professional plan that aligns with your brand and delivers real results.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Implementation</h3>
              <p className="text-sm text-slate-400 mb-4">
                Meticulous execution with attention to detail, quality, and long-term performance.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="max-w-3xl mx-auto px-6 mt-20">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-6">
              Share a few details about your project and we&apos;ll get back to you with tailored next steps.
            </p>
            <form className="grid gap-4 md:grid-cols-2 text-sm">
              <div className="md:col-span-1">
                <label className="block text-slate-300 mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  placeholder="John Doe"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-slate-300 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  placeholder="you@example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-slate-300 mb-1" htmlFor="message">
                  Project details
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none"
                  placeholder="Tell us what you&apos;re looking to achieve..."
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-semibold text-sm tracking-wide hover:bg-emerald-400 transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ${componentName};
`;
}

function generateEntryServer(): string {
    return `import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export function render(url: string, context: any) {
    const helmetContext = {};

    const html = ReactDOMServer.renderToString(
        <React.StrictMode>
            <HelmetProvider context={helmetContext}>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </HelmetProvider>
        </React.StrictMode>
    );

    return { html, helmet: helmetContext };
}`;
}

function generatePrerenderScript(pageRoutes: any[]): string {
    const routes = pageRoutes.map(p => p.route === '/' ? "'/'" : `'${p.route}'`).join(',\n    ');
    
    return `import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
let render;
try {
    const module = await import(pathToFileURL(toAbsolute('dist-server/entry-server.js')).href);
    render = module.render;
} catch (e) {
    console.error('Error importing server bundle:', e);
    process.exit(1);
}

const routesToPrerender = [
    ${routes}
];

(async () => {
    for (const url of routesToPrerender) {
        const context = {};
        const appHtml = render(url, context);
        const { html, helmet } = appHtml;

        const helmetHead = \`
      \${helmet.helmet.title.toString()}
      \${helmet.helmet.priority.toString()}
      \${helmet.helmet.meta.toString()}
      \${helmet.helmet.link.toString()}
      \${helmet.helmet.script.toString()}
    \`;

        const htmlContent = template
            .replace(\`<!--app-head-->\`, helmetHead)
            .replace(\`<!--app-html-->\`, html);

        const filePath = \`dist\${url === '/' ? '/index.html' : \`\${url}/index.html\`}\`;
        const dirPath = path.dirname(filePath);

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        fs.writeFileSync(toAbsolute(filePath), htmlContent);
        console.log('pre-rendered:', filePath);
    }
})();`;
}

function generateIndexTsx(): string {
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);`;
}

function generateIndexHtml(sitewide: any): string {
    const primaryColor = sitewide.colors.split(',')[0]?.trim() || '#020202';
    
    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth bg-black">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="${primaryColor}">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #020202;
    }
    html { scroll-behavior: smooth; }
  </style>
  
  <!--app-head-->
</head>
<body class="text-slate-200 antialiased overflow-x-hidden">
  <div id="root"><!--app-html--></div>
  <script type="module" src="/index.tsx"></script>
</body>
</html>`;
}

function generateTsConfig(): any {
    return {
        compilerOptions: {
            target: "ES2020",
            useDefineForClassFields: true,
            lib: ["ES2020", "DOM", "DOM.Iterable"],
            module: "ESNext",
            skipLibCheck: true,
            moduleResolution: "bundler",
            allowImportingTsExtensions: true,
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            jsx: "react-jsx",
            strict: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            noFallthroughCasesInSwitch: true
        },
        include: ["**/*.ts", "**/*.tsx"]
    };
}

function generateTsConfigNode(): any {
    return {
        compilerOptions: {
            composite: true,
            skipLibCheck: true,
            module: "ESNext",
            moduleResolution: "bundler",
            allowSyntheticDefaultImports: true,
            resolveJsonModule: true
        },
        include: ["vite.config.ts"]
    };
}

function generateAppTsx(components: any[], pageRoutes: any[]): string {
    // Filter out Navbar, Footer, and Attributions since they're imported separately
    const pageComponents = components.filter(c => 
        c.name !== 'Navbar.tsx' && 
        c.name !== 'Footer.tsx' && 
        c.name !== 'Attributions.tsx'
    );
    
    // Check if Attributions component exists
    const hasAttributions = components.some(c => c.name === 'Attributions.tsx');
    
    // Generate imports without .tsx extension (TypeScript convention)
    const imports = pageComponents.map(c => {
        const componentName = c.name.replace('.tsx', '');
        const importPath = c.name.replace('.tsx', ''); // Remove .tsx from path
        return `import ${componentName} from './components/${importPath}';`;
    }).join('\n');
    
    const routes = pageRoutes.map((route, idx) => {
        const componentName = route.component;
        return `          <Route path="${route.route}" element={<${componentName} />} />`;
    }).join('\n');
    
    // Add Attributions import if it exists
    const attributionsImport = hasAttributions ? 'import Attributions from \'./components/Attributions\';\n' : '';
    
    return `import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
${attributionsImport}${imports}

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#020202] text-slate-200">
        <Navbar />
        <main className="pt-20">
          <Routes>
            ${routes}
          </Routes>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;`;
}

// Helper function to parse colors from sitewide.colors string
function parseColors(colorsString: string): { primary: string; secondary: string; accent: string } {
    const colors = colorsString.split(',').map(c => c.trim()).filter(c => c);
    const primary = colors[0] || '#D32F2F'; // Default vibrant red
    const secondary = colors[1] || '#FFC107'; // Default yellow/gold
    const accent = colors[2] || '#263238'; // Default dark gray
    
    // Extract hex codes if they exist
    const hexMatch = (color: string) => {
        const hex = color.match(/#[0-9A-Fa-f]{6}/)?.[0];
        return hex || color;
    };
    
    return {
        primary: hexMatch(primary),
        secondary: hexMatch(secondary),
        accent: hexMatch(accent)
    };
}

function generateNavbarComponent(pageRoutes: any[], sitewide: any): string {
    // Filter out Attributions from navbar - it should only be in footer
    const navLinks = pageRoutes
        .filter(route => route.route !== '/attributions' && route.title !== 'Attributions')
        .map(route => {
            const isHome = route.route === '/';
            return `          <Link
            to="${route.route}"
            className={\`hover:text-white transition-all duration-200 \${location.pathname === '${route.route}' ? 'text-white' : 'text-slate-400'}\`}
          >
            ${isHome ? 'Home' : route.title}
          </Link>`;
        }).join('\n');
    
    const colors = parseColors(sitewide.colors || '');
    const primaryColor = colors.primary || '#D32F2F';
    const secondaryColor = colors.secondary || '#FFC107';
    // Use primary color for navbar background, but make it darker/more subtle
    const bgColor = sitewide.colors ? primaryColor : '#020202';
    // Create a darker version of primary color for navbar (if it's too bright)
    const isLightColor = (color: string) => {
        if (!color || !color.startsWith('#')) return false;
        try {
            const hex = color.replace('#', '');
            if (hex.length !== 6) return false;
            const r = parseInt(hex.substr(0, 2), 16);
            const g = parseInt(hex.substr(2, 2), 16);
            const b = parseInt(hex.substr(4, 2), 16);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness > 128;
        } catch {
            return false;
        }
    };
    const navbarBgColor = sitewide.colors && primaryColor && isLightColor(primaryColor) 
        ? `rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(primaryColor.slice(5, 7), 16)}, 0.95)`
        : (sitewide.colors ? primaryColor : '#020202');
    const logoUrl = sitewide.logoUrl || sitewide.companyLogo || '';
    const companyName = sitewide.companyName || 'Company';
    const brandThemes = sitewide.brandThemes || '';
    
    // Customize navbar style based on brand themes
    const isModern = brandThemes.toLowerCase().includes('modern') || brandThemes.toLowerCase().includes('minimal');
    const isBold = brandThemes.toLowerCase().includes('bold') || brandThemes.toLowerCase().includes('vibrant');
    const isElegant = brandThemes.toLowerCase().includes('elegant') || brandThemes.toLowerCase().includes('luxury');
    
    // Adjust navbar styling based on brand
    const navStyle = isModern 
        ? 'minimal, clean lines, subtle shadow'
        : isBold 
        ? 'vibrant, strong presence, prominent shadow'
        : isElegant
        ? 'refined, sophisticated, elegant shadow'
        : 'professional, balanced';
    
    // Calculate border color from primary color
    let borderColor = 'rgba(255, 255, 255, 0.1)';
    if (sitewide.colors && primaryColor && primaryColor.startsWith('#')) {
        try {
            const r = parseInt(primaryColor.slice(1, 3), 16);
            const g = parseInt(primaryColor.slice(3, 5), 16);
            const b = parseInt(primaryColor.slice(5, 7), 16);
            borderColor = `rgba(${r}, ${g}, ${b}, 0.2)`;
        } catch {
            borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    }
    
    // Escape strings for use in template literal
    const escapedLogoUrl = logoUrl.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
    const escapedCompanyName = companyName.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
    const escapedBgColor = navbarBgColor.replace(/'/g, "\\'");
    const escapedPrimaryColor = primaryColor.replace(/'/g, "\\'");
    const escapedBorderColor = borderColor.replace(/'/g, "\\'");
    
    return `import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const bgColor = '${escapedBgColor}';
  const logoUrl = '${escapedLogoUrl}';
  const primaryColor = '${escapedPrimaryColor}';
  const borderColor = '${escapedBorderColor}';
  const companyName = '${escapedCompanyName}';

  return (
    <nav 
      className="fixed z-50 w-full top-0 shadow-lg" 
      style={{ 
        willChange: 'transform', 
        backgroundColor: bgColor,
        borderBottom: \`1px solid \${borderColor}\`
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="text-white font-semibold tracking-tighter text-lg flex items-center gap-3 hover:opacity-80 transition-opacity"
          style={{ color: 'white' }}
        >
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={companyName} 
              className="h-10 w-auto object-contain" 
            />
          ) : (
            <span style={{ color: 'white' }}>{companyName}</span>
          )}
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm font-semibold uppercase tracking-wider transition-opacity duration-200">
${navLinks}
        </div>

        <button
          className="md:hidden text-white hover:opacity-80 transition-opacity"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{ color: 'white' }}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div 
          className="md:hidden border-t" 
          style={{ 
            backgroundColor: bgColor,
            borderTopColor: borderColor
          }}
        >
          <div className="flex flex-col p-6 gap-4">
${pageRoutes
        .filter(route => route.route !== '/attributions' && route.title !== 'Attributions')
        .map(route => `            <Link
              to="${route.route}"
              className={\`hover:text-white transition-all duration-200 \${location.pathname === '${route.route}' ? 'text-white' : 'text-slate-400'}\`}
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: location.pathname === '${route.route}' ? 'white' : 'rgb(148, 163, 184)' }}
            >
              ${route.route === '/' ? 'Home' : route.title}
            </Link>`).join('\n')}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;`;
}

function generateFooterComponent(pageRoutes: any[], sitewide: any, hasAttributions: boolean): string {
    const colors = parseColors(sitewide.colors || '');
    const footerLinks = pageRoutes.map(route => {
        return `            <Link to="${route.route}" className="text-slate-400 hover:text-white transition-colors duration-200">
              ${route.route === '/' ? 'Home' : route.title}
            </Link>`;
    }).join('\n');
    
    const attributionLink = hasAttributions ? `
            <Link to="/attributions" className="text-slate-400 hover:text-white transition-colors duration-200">
              Photo Credits
            </Link>` : '';
    
    // Use brand colors for accents
    const borderColor = colors.primary || '#D32F2F';
    const accentColor = colors.secondary || '#FFC107';
    
    return `import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t" style={{ borderColor: '${borderColor}40' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              ${sitewide.companyName}
              ${colors.primary ? `<span style={{ color: '${colors.primary}' }}> </span>` : ''}
            </h3>
            <p className="text-slate-400 text-sm">${sitewide.industry}</p>
            ${sitewide.brandThemes ? `<p className="text-slate-500 text-xs mt-2">${sitewide.brandThemes}</p>` : ''}
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4" style={{ color: '${accentColor}' }}>Quick Links</h3>
            <div className="flex flex-col gap-2">
${footerLinks}${attributionLink}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4" style={{ color: '${accentColor}' }}>Contact Us</h3>
            <div className="flex flex-col gap-2 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: '${colors.primary}' }} />
                <span>${sitewide.fullAddress}</span>
              </div>
              <a href="tel:${sitewide.phoneNumber.replace(/\s+/g, '')}" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <Phone className="w-4 h-4" style={{ color: '${colors.primary}' }} />
                <span>${sitewide.phoneNumber}</span>
              </a>
              <a href="mailto:${sitewide.email}" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <Mail className="w-4 h-4" style={{ color: '${colors.primary}' }} />
                <span>${sitewide.email}</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
          <p>© ${new Date().getFullYear()} ${sitewide.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;`;
}

function generateAttributionsReactComponent(sitewide: any, attributions: Array<{url: string, attribution: string, photographer?: string, photographerUrl?: string}>, pageRoutes: any[]): string {
    const attributionList = attributions.map((attr, idx) => {
        if (attr.photographer && attr.photographerUrl) {
            return `            <li key={${idx}} className="mb-2">
              <a 
                href="${attr.photographerUrl}" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                ${attr.attribution}
              </a>
            </li>`;
        } else {
            return `            <li key={${idx}} className="mb-2 text-slate-300">
              ${attr.attribution}
            </li>`;
        }
    }).join('\n');
    
    return `import React from 'react';
import { Helmet } from 'react-helmet-async';

const Attributions: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Photo Attributions - ${sitewide.companyName}</title>
        <meta name="description" content="Photo attributions and credits for ${sitewide.companyName}" />
      </Helmet>
      
      <div className="pt-20 min-h-screen bg-[#020202]">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Photo Attributions</h1>
          <p className="text-slate-400 mb-8 text-lg">
            We would like to thank the talented photographers who have contributed images to this website. 
            All photos are used in accordance with their respective licenses.
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <ul className="space-y-2">
${attributionList}
            </ul>
          </div>
          
          <div className="mt-8 text-slate-500 text-sm">
            <p>
              All images are used under their respective licenses. 
              Please visit the photographer's profile for more information about usage rights.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attributions;`;
}
