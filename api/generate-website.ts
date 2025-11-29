import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
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
            bookingForm
        } = req.body;

        // Validate required fields
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

        console.log('Starting website generation for:', companyName);

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
            fullAddress: `${address}, ${city}`
        };

        // Step 1: Generate game plan
        const gamePlan = await generateGamePlan(genAI, sitewide, pages);
        console.log('Game plan generated');

        // Step 2: Generate website files
        const websiteFiles = await generateWebsiteFiles(genAI, sitewide, pages, gamePlan);
        console.log('Website files generated');

        // Step 3: Create GitHub repository
        const repoName = `${companyName.toLowerCase().replace(/\s+/g, '-')}-website-${Date.now()}`;
        const repoData = await createGitHubRepo(repoName, websiteFiles, sitewide);
        console.log('GitHub repository created:', repoData.repoUrl);

        // Step 4: Deploy to Vercel (if token available)
        // Wait a moment for GitHub to fully process the repository
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        let vercelData = null;
        if (VERCEL_TOKEN) {
            console.log('VERCEL_TOKEN found, attempting automatic deployment...');
            try {
                vercelData = await deployToVercel(repoName, repoData.repoFullName, sitewide);
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

        return res.json({
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
        });

    } catch (error: any) {
        // Log full error details server-side only
        console.error('Error generating website:', error);
        console.error('Error stack:', error.stack);
        
        // Return user-friendly error without exposing backend details
        const isConfigError = error?.message?.includes('API credentials') || 
                             error?.message?.includes('GITHUB_TOKEN') ||
                             error?.message?.includes('GEMINI_API_KEY');
        
        if (isConfigError) {
            return res.status(500).json({
                error: 'Website generation service is temporarily unavailable. Please contact support.',
                code: 'SERVICE_UNAVAILABLE'
            });
        }
        
        // For other errors, return generic message
        return res.status(500).json({
            error: 'Failed to generate website. Please try again or contact support if the issue persists.',
            code: 'GENERATION_FAILED'
        });
    }
}

async function generateGamePlan(genAI: GoogleGenAI, sitewide: any, pages: any[]) {
    try {
        // Using Gemini 3 Flash - latest and most advanced model
        const model = 'gemini-3-flash';

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

    const result = await chat.sendMessage({ message: prompt });
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

async function generateWebsiteFiles(genAI: GoogleGenAI, sitewide: any, pages: any[], gamePlan: any) {
    try {
        // Using Gemini 3 Flash - latest and most advanced model
        const model = 'gemini-3-flash';
        const files = [];
    const pageLinks = pages.map((p, idx) => {
        if (idx === 0) return { title: p.title, file: 'index.html' };
        const fileName = p.title.toLowerCase().replace(/\s+/g, '-') + '.html';
        return { title: p.title, file: fileName };
    });

        // PHASE 1: Generate each page individually with focused prompts
        console.log('Phase 1: Generating individual pages...');
        const generatedPages: { name: string; content: string; pageInfo: any }[] = [];
        const allImageAttributions: Array<{url: string, attribution: string, photographer?: string, photographerUrl?: string}> = [];
        
        for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
            const pageFileName = i === 0 ? 'index.html' : page.title.toLowerCase().replace(/\s+/g, '-') + '.html';
            
            console.log(`Generating ${pageFileName}...`);
            
            // Get relevant images for this page
            const pageImages = await getRelevantImages(sitewide, page, i);
            
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
            
            const pagePrompt = i === 0 
                ? generateMainPagePrompt(page, sitewide, pages, pageLinks, gamePlan, pageImages)
                : generateSubPagePrompt(page, sitewide, pages, pageLinks, gamePlan, pageImages);

        const pageChat = genAI.chats.create({
            model: model,
            config: {
                    systemInstruction: 'You are a senior web developer with 10+ years of experience creating award-winning websites. Generate production-ready, semantic HTML5 code. The website must look stunning, modern, and professional - not basic or amateur. Use buttons (not links) for CTAs, proper header structure, and ensure visual hierarchy. Quality is critical - this must look like a $10,000+ website, not a template.'
            }
        });

            const pageResult = await pageChat.sendMessage({ message: pagePrompt });
        let pageContent = pageResult.text.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();
            
            // Clean up common AI generation issues
            pageContent = cleanHtmlContent(pageContent, sitewide);
        
        // Ensure CSS and JS links are present
        if (!pageContent.includes('styles.css')) {
            pageContent = pageContent.replace(/<head[^>]*>/i, (match) => match + '\n    <link rel="stylesheet" href="styles.css">');
        }
        if (!pageContent.includes('script.js')) {
            pageContent = pageContent.replace(/<\/body>/i, '    <script src="script.js"></script>\n</body>');
        }

            generatedPages.push({
            name: pageFileName,
                content: pageContent,
                pageInfo: page
            });
        }

        // PHASE 2: Quick consistency fixes (skip full AI refinement to avoid timeouts)
        console.log('Phase 2: Applying quick consistency fixes...');
        let refinedPages = generatedPages.map(page => {
            let content = page.content;
            
            // Ensure attribution link in footer if we have attributions (add after pages are generated)
            // This will be done after we know if attributions exist
            
            return {
                name: page.name,
                content: content
            };
        });
        
        // Skip full AI refinement to avoid timeouts - pages are already good from Phase 1
        // If you want full refinement, uncomment below (but it may timeout on large sites)
        /*
        try {
            const refinementPromise = refineAllPages(genAI, model, refinedPages, sitewide, pages, pageLinks, gamePlan);
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Refinement timeout')), 30000) // 30 second timeout
            );
            refinedPages = await Promise.race([refinementPromise, timeoutPromise]) as any[];
        } catch (error) {
            console.warn('Refinement phase skipped, using original pages:', error);
        }
        */
        
        // Add refined pages to files
        for (const page of refinedPages) {
            files.push({
                name: page.name,
                content: page.content
            });
        }
        
        // Generate attribution page if we have images with attributions
        if (allImageAttributions.length > 0) {
            console.log('Generating attribution page...');
            // Add attributions page to pageLinks for navigation
            const pageLinksWithAttributions = [...pageLinks, { title: 'Attributions', file: 'attributions.html' }];
            const attributionPage = generateAttributionPage(sitewide, allImageAttributions, pageLinksWithAttributions);
            files.push({
                name: 'attributions.html',
                content: attributionPage
            });
            
            // Add attribution link to all pages' footers automatically
            console.log('Adding attribution links to all pages...');
            refinedPages = refinedPages.map(page => {
                let content = page.content;
                // Check if footer exists and doesn't already have attribution link
                if (content.includes('</footer>') && !content.includes('attributions.html')) {
                    // Add attribution link before closing footer tag
                    content = content.replace(/<\/footer>/i, (match) => {
                        return `        <div style="text-align: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
            <a href="attributions.html" style="color: inherit; text-decoration: none; font-size: 0.85rem; opacity: 0.7;">Photo Credits</a>
        </div>\n    ${match}`;
                    });
                }
                return {
                    name: page.name,
                    content: content
                };
            });
        }

        // PHASE 3: Generate CSS
        console.log('Phase 3: Generating CSS...');
        const cssPrompt = `Create a comprehensive, professional, modern, high-quality CSS file for this website.

Company: ${sitewide.companyName}
Industry: ${sitewide.industry}
Company Type: ${sitewide.companyType}
Colors: ${sitewide.colors}
Brand Themes: ${sitewide.brandThemes}
Extra Details: ${sitewide.extraDetailedInfo || ''}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

CRITICAL REQUIREMENTS:
1. MUST include CSS Reset/Normalize at the top (* { box-sizing: border-box; } and reset margins/padding)
2. MUST include comprehensive styling for ALL HTML elements used in the HTML
3. MUST be fully responsive with mobile-first approach (use media queries: @media (min-width: 768px), @media (min-width: 1024px))
4. MUST include professional typography (import Google Fonts - use fonts like Inter, Poppins, or Roboto)
5. MUST use the specified colors: ${sitewide.colors} - parse hex codes and use them throughout
6. MUST reflect brand themes: ${sitewide.brandThemes}
7. MUST include smooth animations and transitions (transition: all 0.3s ease)
8. MUST include hover effects for interactive elements (buttons, links, cards)
9. MUST style navigation menu (horizontal on desktop, hamburger menu on mobile with smooth transitions)
10. MUST style forms (contact and booking) if present - modern, clean input fields with focus states
11. MUST include proper spacing system (consistent padding, margins using rem/em units)
12. MUST include modern design elements:
    - Subtle box shadows (box-shadow: 0 2px 8px rgba(0,0,0,0.1))
    - Gradients where appropriate
    - Rounded corners (border-radius: 8px or 12px)
    - Smooth transitions
13. MUST be accessible:
    - Proper color contrast (WCAG AA minimum)
    - Focus states for keyboard navigation (outline, border, or background change)
    - Minimum touch target sizes (44x44px for mobile)
14. MUST be cross-browser compatible (use vendor prefixes if needed)
15. MUST style all components:
    - Header with logo and navigation
    - Hero section with compelling visual design
    - Content sections with proper typography
    - Cards/service items with hover effects
    - Footer with organized layout
    - Buttons with multiple states (default, hover, active, disabled)
    - Links with proper styling
16. Use CSS Grid and Flexbox for layouts (modern, flexible layouts)
17. Include smooth scroll behavior (html { scroll-behavior: smooth; })
18. Style images to be responsive (max-width: 100%, height: auto)
19. Create a cohesive color scheme using the provided colors
20. Add visual hierarchy with typography scale (h1 larger than h2, etc.)

Pages to style: ${pages.map(p => p.title).join(', ')}${allImageAttributions.length > 0 ? ', Attributions' : ''}

DESIGN QUALITY REQUIREMENTS (CRITICAL):

HEADER STYLING:
- Header MUST be fixed/sticky at top (position: fixed or sticky)
- Header background: solid color or semi-transparent with backdrop-filter
- Logo/company name: left-aligned, prominent, proper font size
- Navigation menu: horizontal on desktop, hamburger on mobile
- Nav links: proper spacing, hover effects, active state styling
- Header height: 60-80px, proper padding
- Header should have shadow or border for separation

BUTTON STYLING (CRITICAL - MUST LOOK LIKE BUTTONS, NOT LINKS):
- .btn class: Base button styles
  * padding: 1rem 2rem (or similar substantial padding)
  * border-radius: 8px (rounded corners)
  * font-weight: 600 (bold)
  * font-size: 1rem
  * cursor: pointer
  * border: none (or subtle border)
  * transition: all 0.3s ease
  * display: inline-block
  * text-align: center
  * text-decoration: none

- .btn-primary: Primary action buttons
  * background-color: primary brand color (from ${sitewide.colors})
  * color: white or contrasting text
  * hover: darker background (background-color: rgba(0,0,0,0.1) darker or use filter: brightness(0.9))
  * hover: transform: translateY(-2px) (slight lift)
  * hover: box-shadow: 0 4px 12px rgba(0,0,0,0.15) (stronger shadow)
  * active: transform: translateY(0) (press down effect)

- .btn-secondary: Secondary buttons
  * background-color: transparent
  * border: 2px solid primary color
  * color: primary color
  * hover: background-color: primary color, color: white (fill effect)

- Buttons MUST be visually distinct from links - use background colors, padding, borders
- Links should be subtle, buttons should be prominent

HERO SECTION:
- Full-width section with compelling background (image or gradient)
- Large, bold headline (h1): font-size: 3rem+ on desktop, 2rem+ on mobile
- Subheadline: readable, proper contrast
- CTA button: prominently placed, large, eye-catching
- Proper spacing and visual hierarchy
- Overlay on background image if needed for text readability

CARDS & SECTIONS:
- Service/feature cards: modern card design
  * background: white or light color
  * border-radius: 12px
  * box-shadow: 0 2px 8px rgba(0,0,0,0.1)
  * padding: 2rem
  * hover: transform: translateY(-4px), box-shadow: 0 8px 16px rgba(0,0,0,0.15)
  * transition: all 0.3s ease

FOOTER:
- Multi-column layout (3-4 columns on desktop)
- Organized sections: company info, links, contact
- Proper spacing and typography
- Background color distinct from main content
- Border-top for separation

GENERAL:
- Ensure proper spacing and breathing room between elements (use margin/padding consistently)
- Use consistent border-radius values throughout (8px, 12px)
- Apply consistent color scheme from the provided colors
- Make typography readable and hierarchical (h1 > h2 > h3)
- All interactive elements must have clear hover states

The website MUST look professional, modern, polished, and production-ready. Use CSS extensively with modern best practices.

Return ONLY the complete CSS code, no explanations or markdown formatting.`;

        const cssChat = genAI.chats.create({
            model: model,
            config: {
                systemInstruction: 'You are a senior web developer with 10+ years of experience. Generate production-ready, modern, responsive CSS code that creates a stunning, professional, polished website. Focus on visual quality, proper spacing, modern design trends, and ensuring buttons look like buttons (not links). This must look like a premium, high-end website - not basic or template-like.'
            }
        });

        const cssResult = await cssChat.sendMessage({ message: cssPrompt });
        let cssContent = cssResult.text.replace(/```css\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Clean up CSS content
        cssContent = cleanCssContent(cssContent, sitewide);
        
        // Refine CSS based on all pages (with timeout)
        console.log('Refining CSS for consistency...');
        try {
            const cssRefinementPromise = refineCss(genAI, model, cssContent, refinedPages, sitewide, gamePlan);
            const cssTimeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('CSS refinement timeout')), 45000) // 45 second timeout
            );
            cssContent = await Promise.race([cssRefinementPromise, cssTimeoutPromise]) as string;
        } catch (error) {
            console.warn('CSS refinement skipped due to timeout or error, using original CSS:', error);
            // Use original CSS if refinement fails
        }

        files.push({
            name: 'styles.css',
            content: cssContent
        });

        // PHASE 4: Generate JavaScript
        console.log('Phase 4: Generating JavaScript...');
        const pageFiles = pages.map((p, idx) => {
            if (idx === 0) return 'index.html';
            return p.title.toLowerCase().replace(/\s+/g, '-') + '.html';
        });

    const jsPrompt = `Create comprehensive JavaScript for this website.

Pages: ${pages.map(p => p.title).join(', ')}
Page Files: ${pageFiles.join(', ')}
Company Type: ${sitewide.companyType}
Design Guidelines: ${JSON.stringify(gamePlan, null, 2)}

CRITICAL REQUIREMENTS:
1. MUST include mobile menu toggle functionality (hamburger menu)
2. MUST include smooth scrolling for anchor links
3. MUST ensure navigation links work correctly on all pages
4. MUST handle form submissions properly
${sitewide.contactForm ? '5. MUST include contact form validation and submission handling with proper error messages' : ''}
${sitewide.bookingForm ? '6. MUST include booking form validation and date/time picker functionality' : ''}
7. MUST include any interactive elements from the design
8. Use modern, vanilla JavaScript (no frameworks)
9. Ensure all pages can access the same script.js file
10. Handle navigation menu active states
11. Add smooth animations and transitions
12. Make sure mobile menu works on all pages

The JavaScript should work across all pages: ${pageFiles.join(', ')}.

Return ONLY the complete JavaScript code, no explanations.`;

    const jsChat = genAI.chats.create({
        model: model,
        config: {
            systemInstruction: 'You are a professional web developer. Generate clean, modern vanilla JavaScript code.'
        }
    });

        const jsResult = await jsChat.sendMessage({ message: jsPrompt });
        let jsContent = jsResult.text.replace(/```javascript\n?/g, '').replace(/```js\n?/g, '').replace(/```\n?/g, '').trim();

        files.push({
            name: 'script.js',
            content: jsContent
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

        // Generate vercel.json for proper routing
        const vercelJson = {
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

        return files;
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

        return {
            repoUrl: repo.html_url,
            repoFullName: repo.full_name,
            repoOwner: user.login
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

async function deployToVercel(projectName: string, repoFullName: string, sitewide: any) {
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
        const createProjectResponse = await fetch('https://api.vercel.com/v9/projects', {
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
                framework: null, // Static site, no build needed
                publicSource: false,
                ...(accountId && { teamId: accountId })
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

        // Step 3: Wait a moment for project to be ready, then trigger deployment
        // Wait longer for GitHub to fully process the repository
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Step 4: Try to create deployment from GitHub
        // Note: Vercel will also auto-deploy via webhook, but we try to trigger it manually
        console.log('Triggering Vercel deployment...');
        let deploymentUrl = `https://${projectNameSlug}.vercel.app`;
        let deploymentSuccess = false;
        
        try {
            const deploymentResponse = await fetch('https://api.vercel.com/v13/deployments', {
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
                        repo: repoFullName,
                        ref: 'main', // Default branch
                        sha: 'HEAD'
                    },
                    target: 'production',
                    ...(accountId && { teamId: accountId })
                })
            });
            
            if (deploymentResponse.ok) {
                const deploymentData: any = await deploymentResponse.json();
                console.log('Vercel deployment created:', deploymentData.url || deploymentData.alias?.[0]);
                if (deploymentData.url) {
                    deploymentUrl = deploymentData.url;
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
                // This is okay - Vercel will auto-deploy when GitHub webhook triggers
                console.log('Note: Vercel will auto-deploy automatically via GitHub webhook');
            }
        } catch (deployError: any) {
            console.warn('Deployment trigger error (non-fatal):', deployError.message);
            // Vercel will still auto-deploy via webhook
        }
        
        // If manual deployment didn't work, Vercel will auto-deploy via GitHub webhook
        // The project is created and linked, so deployment will happen automatically
        if (!deploymentSuccess) {
            console.log('Project created and linked to GitHub. Vercel will auto-deploy via webhook.');
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
// Returns images with attribution info for proper credit
async function getRelevantImages(sitewide: any, page: any, pageIndex: number): Promise<Array<{url: string, attribution?: string, photographer?: string, photographerUrl?: string}>> {
    const images: Array<{url: string, attribution?: string, photographer?: string, photographerUrl?: string}> = [];
    const pexelsApiKey = process.env.PEXELS_API_KEY; // Recommended: Free, simpler attribution
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY; // Alternative: Requires more complex attribution
    
    // Generate more specific and relevant search terms
    // Combine company name, industry, and context for better image matching
    const companyWords = sitewide.companyName.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const industryWords = sitewide.industry.toLowerCase().split(/\s+/);
    const pageContext = page.title.toLowerCase();
    const brandWords = sitewide.brandThemes ? sitewide.brandThemes.toLowerCase().split(',').map((t: string) => t.trim().split(/\s+/)).flat() : [];
    
    // Create more specific search terms by combining context
    const searchTerms: string[] = [];
    
    // Primary: Industry + company type (most relevant)
    if (sitewide.industry && sitewide.companyType) {
        searchTerms.push(`${sitewide.industry} ${sitewide.companyType}`.toLowerCase().replace(/\//g, ' '));
    }
    
    // Secondary: Industry alone
    if (sitewide.industry) {
        searchTerms.push(sitewide.industry.toLowerCase());
    }
    
    // Tertiary: Page-specific context
    if (pageContext) {
        // Map common page titles to better search terms
        const pageTermMap: { [key: string]: string } = {
            'about': 'professional team business',
            'services': `${sitewide.industry} services`,
            'contact': 'business office professional',
            'home': `${sitewide.industry} business`,
            'portfolio': `${sitewide.industry} work examples`,
            'gallery': `${sitewide.industry} showcase`
        };
        
        const pageTerm = pageTermMap[pageContext] || `${sitewide.industry} ${pageContext}`;
        searchTerms.push(pageTerm);
    }
    
    // Add brand themes if they're descriptive
    brandWords.forEach(word => {
        if (word.length > 4 && !searchTerms.includes(word)) {
            searchTerms.push(word);
        }
    });
    
    // Add company-specific terms if they're meaningful
    companyWords.forEach(word => {
        if (word.length > 4 && !['landscaping', 'services', 'company', 'inc', 'llc'].includes(word)) {
            searchTerms.push(`${word} ${sitewide.industry}`);
        }
    });
    
    // Remove duplicates and filter
    const uniqueTerms = [...new Set(searchTerms)].filter(Boolean).slice(0, 5);
    
    console.log(`Image search terms for ${page.title}:`, uniqueTerms);
    
    // Try Pexels first (simpler attribution, free API)
    if (pexelsApiKey) {
        try {
            // Try each search term, but get multiple results per term and pick the best
            for (let i = 0; i < Math.min(3, uniqueTerms.length); i++) {
                const term = uniqueTerms[i];
                try {
                    // Get more results per search to have better selection
                    const response = await fetch(
                        `https://api.pexels.com/v1/search?query=${encodeURIComponent(term)}&per_page=5&orientation=landscape`,
                        {
                            headers: {
                                'Authorization': pexelsApiKey
                            }
                        }
                    );
                    if (response.ok) {
                        const data: any = await response.json();
                        if (data.photos && data.photos.length > 0) {
                            // Pick the first result (most relevant) for this term
                            const photo = data.photos[0];
                            // Only add if we don't already have this image
                            if (!images.find(img => img.url === photo.src.large)) {
                                images.push({
                                    url: photo.src.large,
                                    attribution: `Photo by ${photo.photographer} on Pexels`,
                                    photographer: photo.photographer,
                                    photographerUrl: photo.photographer_url
                                });
                            }
                        }
                    }
                } catch (e) {
                    console.warn(`Failed to fetch Pexels image for ${term}:`, e);
                }
            }
        } catch (error) {
            console.warn('Pexels API failed:', error);
        }
    }
    
    // Fallback to Unsplash if Pexels didn't work or no key
    if (images.length === 0) {
        try {
            if (unsplashAccessKey) {
                // Use Unsplash API for better results
                for (let i = 0; i < Math.min(3, searchTerms.length); i++) {
                    const term = searchTerms[i];
                    try {
                        const response = await fetch(
                            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(term)}&per_page=1&orientation=landscape`,
                            {
                                headers: {
                                    'Authorization': `Client-ID ${unsplashAccessKey}`
                                }
                            }
                        );
                        if (response.ok) {
                            const data: any = await response.json();
                            if (data.results && data.results.length > 0) {
                                const photo = data.results[0];
                                images.push({
                                    url: photo.urls.regular,
                                    attribution: `Photo by ${photo.user.name} on Unsplash`,
                                    photographer: photo.user.name,
                                    photographerUrl: photo.user.links.html
                                });
                            }
                        }
                    } catch (e) {
                        console.warn(`Failed to fetch Unsplash image for ${term}:`, e);
                    }
                }
            }
            
            // Final fallback: Use Unsplash Source (no API key needed, but less control)
            if (images.length === 0) {
                const fallbackTerms = searchTerms.slice(0, 3);
                for (const term of fallbackTerms) {
                    // Unsplash Source URLs - random images based on search
                    images.push({
                        url: `https://source.unsplash.com/1600x900/?${encodeURIComponent(term)}`,
                        attribution: 'Photo from Unsplash'
                    });
                }
            }
        } catch (error) {
            console.warn('Image fetching failed, will use CSS placeholders:', error);
        }
    }
    
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
