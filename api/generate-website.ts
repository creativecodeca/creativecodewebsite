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
        // Note: To automatically create a new Vercel project for each website,
        // you need a VERCEL_TOKEN. Without it, you'll need to manually import
        // the GitHub repo in the Vercel dashboard each time.
        let vercelData = null;
        if (VERCEL_TOKEN) {
            try {
                vercelData = await deployToVercel(repoName, repoData.repoFullName, sitewide);
                console.log('Vercel project created and deployed:', vercelData.url);
            } catch (vercelError: any) {
                console.error('Vercel deployment error:', vercelError);
                // Continue even if Vercel fails - GitHub repo is still created
            }
        } else {
            console.log('VERCEL_TOKEN not set - user will need to manually import repo in Vercel dashboard');
        }

        return res.json({
            success: true,
            repoUrl: repoData.repoUrl,
            vercelUrl: vercelData?.url || null,
            projectUrl: vercelData?.projectUrl || 'https://vercel.com/dashboard',
            message: VERCEL_TOKEN 
                ? 'Website generated, pushed to GitHub, and automatically deployed to Vercel'
                : 'Website generated and pushed to GitHub. Import the repo in Vercel dashboard to deploy.',
            autoDeployed: !!VERCEL_TOKEN,
            needsManualImport: !VERCEL_TOKEN
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
        const model = 'gemini-2.5-flash';

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
        const model = 'gemini-2.5-flash';
        const files = [];

        // Generate index.html
    const firstPage = pages[0];
    const pageLinks = pages.map((p, idx) => {
        if (idx === 0) return { title: p.title, file: 'index.html' };
        const fileName = p.title.toLowerCase().replace(/\s+/g, '-') + '.html';
        return { title: p.title, file: fileName };
    });

    const htmlPrompt = `Create a professional, modern HTML file for the main page of a website.

Company: ${sitewide.companyName}
Industry: ${sitewide.industry}
Company Type: ${sitewide.companyType}
Page: ${firstPage.title}
Page Information: ${firstPage.information}

Contact Information:
- Address: ${sitewide.fullAddress}
- Phone: ${sitewide.phoneNumber}
- Email: ${sitewide.email}

Colors: ${sitewide.colors}
Brand Themes: ${sitewide.brandThemes}
Extra Details: ${sitewide.extraDetailedInfo || ''}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

CRITICAL REQUIREMENTS:
1. MUST include <link rel="stylesheet" href="styles.css"> in the <head> section
2. MUST include <script src="script.js"></script> before closing </body> tag
3. Navigation links MUST use correct file paths: ${JSON.stringify(pageLinks)}
4. Use semantic HTML5 with proper structure
5. Include proper meta tags for SEO
6. Mobile-responsive structure with viewport meta tag
7. Professional, modern design with proper CSS classes
8. Include navigation menu linking to all pages: ${pages.map(p => p.title).join(', ')}
9. Display contact information prominently: ${sitewide.fullAddress}, ${sitewide.phoneNumber}, ${sitewide.email}
10. Use CSS classes for ALL styling - NO inline styles except for critical CSS
${sitewide.contactForm ? '11. Include a contact form on this page or link to contact page' : ''}
${sitewide.bookingForm ? '12. Include a booking/appointment form or link to booking page' : ''}

IMPORTANT: The website MUST look professional and modern. Use CSS extensively for styling.
Navigation links must work correctly. Example: <a href="about.html">About</a> for pages other than index.

Return ONLY the complete HTML code with proper CSS and JS links, no explanations.`;

    const htmlChat = genAI.chats.create({
        model: model,
        config: {
            systemInstruction: 'You are a professional web developer. Generate clean, semantic HTML5 code. ALWAYS include <link rel="stylesheet" href="styles.css"> in the <head> and <script src="script.js"></script> before </body>. Use CSS classes for ALL styling - never use inline styles. Make the website look professional and modern.'
        }
    });

    const htmlResult = await htmlChat.sendMessage({ message: htmlPrompt });
    let htmlContent = htmlResult.text.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Ensure CSS and JS links are present
    if (!htmlContent.includes('styles.css')) {
        htmlContent = htmlContent.replace(/<head[^>]*>/i, (match) => match + '\n    <link rel="stylesheet" href="styles.css">');
    }
    if (!htmlContent.includes('script.js')) {
        htmlContent = htmlContent.replace(/<\/body>/i, '    <script src="script.js"></script>\n</body>');
    }

    files.push({
        name: 'index.html',
        content: htmlContent
    });

    // Generate other pages
    for (let i = 1; i < pages.length; i++) {
        const page = pages[i];
        const pageFileName = page.title.toLowerCase().replace(/\s+/g, '-') + '.html';
        const pageLinks = pages.map((p, idx) => {
            if (idx === 0) return { title: p.title, file: 'index.html' };
            const fileName = p.title.toLowerCase().replace(/\s+/g, '-') + '.html';
            return { title: p.title, file: fileName };
        });

        const pageHtmlPrompt = `Create a professional HTML file for the "${page.title}" page.

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

CRITICAL REQUIREMENTS:
1. MUST include <link rel="stylesheet" href="styles.css"> in the <head> section
2. MUST include <script src="script.js"></script> before closing </body> tag
3. Navigation links MUST use correct file paths: ${JSON.stringify(pageLinks)}
4. Match the exact style and structure of the main page (index.html)
5. Use the SAME navigation menu structure as the main page
6. Link to styles.css and script.js (same files as main page)
7. Mobile-responsive with same breakpoints
8. Display contact information: ${sitewide.fullAddress}, ${sitewide.phoneNumber}, ${sitewide.email}
9. Use CSS classes for ALL styling - NO inline styles
${page.title.toLowerCase().includes('contact') && sitewide.contactForm ? '10. Include a functional contact form with proper styling' : ''}
${page.title.toLowerCase().includes('book') && sitewide.bookingForm ? '10. Include a functional booking/appointment form with proper styling' : ''}

IMPORTANT: This page must look identical in style to the main page. Use the same CSS classes and structure.
Navigation must work correctly. Home link should be: <a href="index.html">Home</a>

Return ONLY the complete HTML code with proper CSS and JS links, no explanations.`;

        const pageChat = genAI.chats.create({
            model: model,
            config: {
                systemInstruction: 'You are a professional web developer. Generate clean, semantic HTML5 code. ALWAYS include <link rel="stylesheet" href="styles.css"> in the <head> and <script src="script.js"></script> before </body>. Use CSS classes for ALL styling - never use inline styles. Match the main page style exactly.'
            }
        });

        const pageResult = await pageChat.sendMessage({ message: pageHtmlPrompt });
        let pageContent = pageResult.text.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Ensure CSS and JS links are present
        if (!pageContent.includes('styles.css')) {
            pageContent = pageContent.replace(/<head[^>]*>/i, (match) => match + '\n    <link rel="stylesheet" href="styles.css">');
        }
        if (!pageContent.includes('script.js')) {
            pageContent = pageContent.replace(/<\/body>/i, '    <script src="script.js"></script>\n</body>');
        }

        files.push({
            name: pageFileName,
            content: pageContent
        });
    }

    // Generate CSS
    const cssPrompt = `Create a comprehensive, professional, modern CSS file for this website.

Company: ${sitewide.companyName}
Industry: ${sitewide.industry}
Company Type: ${sitewide.companyType}
Colors: ${sitewide.colors}
Brand Themes: ${sitewide.brandThemes}
Extra Details: ${sitewide.extraDetailedInfo || ''}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

CRITICAL REQUIREMENTS:
1. MUST include CSS Reset/Normalize at the top
2. MUST include comprehensive styling for ALL HTML elements used
3. MUST be fully responsive with mobile-first approach (use media queries)
4. MUST include professional typography (import Google Fonts if needed)
5. MUST use the specified colors: ${sitewide.colors}
6. MUST reflect brand themes: ${sitewide.brandThemes}
7. MUST include smooth animations and transitions
8. MUST include hover effects for interactive elements
9. MUST style navigation menu (horizontal on desktop, hamburger on mobile)
10. MUST style forms (contact and booking) if present
11. MUST include proper spacing, padding, margins
12. MUST include modern design elements (shadows, gradients, rounded corners where appropriate)
13. MUST be accessible (proper contrast, focus states)
14. MUST be cross-browser compatible
15. MUST style footer, header, sections, buttons, links, etc.

Pages to style: ${pages.map(p => p.title).join(', ')}

The website MUST look professional, modern, and polished. Use CSS extensively.
Include styles for: navigation, hero sections, content areas, buttons, forms, footer, cards, etc.

Return ONLY the complete CSS code, no explanations.`;

    const cssChat = genAI.chats.create({
        model: model,
        config: {
            systemInstruction: 'You are a professional web developer. Generate modern, responsive CSS code.'
        }
    });

    const cssResult = await cssChat.sendMessage({ message: cssPrompt });
    let cssContent = cssResult.text.replace(/```css\n?/g, '').replace(/```\n?/g, '').trim();

    files.push({
        name: 'styles.css',
        content: cssContent
    });

    // Generate JavaScript
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
    if (!VERCEL_TOKEN) {
        return {
            url: 'Vercel deployment pending - VERCEL_TOKEN not configured',
            projectUrl: 'https://vercel.com/dashboard'
        };
    }

    try {
        // Step 1: Create or get Vercel project
        let projectData: any;
        const projectNameSlug = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
        
        // Try to create project
        const createProjectResponse = await fetch('https://api.vercel.com/v9/projects', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${VERCEL_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: projectNameSlug,
                gitRepository: {
                    type: 'github',
                    repo: repoFullName
                },
                framework: null,
                buildCommand: null,
                outputDirectory: null,
                installCommand: null,
                devCommand: null
            })
        });

        if (createProjectResponse.ok) {
            projectData = await createProjectResponse.json();
            console.log('Vercel project created:', projectData.id);
        } else {
            // Project might already exist, try to get it
            const errorData = await createProjectResponse.json().catch(() => ({}));
            if (errorData.error?.code === 'project_already_exists') {
                // Get existing project
                const getProjectResponse = await fetch(`https://api.vercel.com/v9/projects/${projectNameSlug}`, {
                    headers: {
                        'Authorization': `Bearer ${VERCEL_TOKEN}`
                    }
                });
                if (getProjectResponse.ok) {
                    projectData = await getProjectResponse.json();
                    console.log('Using existing Vercel project:', projectData.id);
                } else {
                    throw new Error('Failed to get existing project');
                }
            } else {
                console.error('Vercel project creation failed:', errorData);
                throw new Error('Failed to create Vercel project');
            }
        }

        // Step 2: Trigger a new deployment
        const deploymentResponse = await fetch('https://api.vercel.com/v13/deployments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${VERCEL_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: projectNameSlug,
                gitSource: {
                    type: 'github',
                    repo: repoFullName,
                    ref: 'main' // or 'master' depending on default branch
                },
                projectSettings: {
                    framework: null,
                    buildCommand: null,
                    outputDirectory: null,
                    installCommand: null,
                    devCommand: null
                }
            })
        });

        if (!deploymentResponse.ok) {
            const deployError = await deploymentResponse.json().catch(() => ({}));
            console.error('Vercel deployment trigger failed:', deployError);
            // Still return project URL even if deployment fails - Vercel will auto-deploy on push
        } else {
            const deploymentData = await deploymentResponse.json();
            console.log('Vercel deployment triggered:', deploymentData.url);
        }

        // Return the project URL (Vercel will auto-deploy from GitHub)
        const projectUrl = projectData.accountId 
            ? `https://vercel.com/${projectData.accountId}/${projectNameSlug}`
            : `https://vercel.com/dashboard`;

        return {
            url: `https://${projectNameSlug}.vercel.app`,
            projectUrl: projectUrl,
            projectId: projectData.id
        };

    } catch (error: any) {
        console.error('Vercel deployment error:', error);
        // Don't expose internal error details
        return {
            url: 'Vercel deployment pending - check Vercel dashboard',
            projectUrl: 'https://vercel.com/dashboard',
            error: 'Deployment failed'
        };
    }
}

