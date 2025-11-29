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
            return res.status(500).json({ error: 'Server configuration error: Missing API credentials' });
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
        console.error('Error generating website:', error);
        console.error('Error stack:', error.stack);
        
        // Ensure we always return valid JSON
        const errorMessage = error?.message || error?.toString() || 'Unknown error occurred';
        const errorDetails = error?.stack || error?.toString() || 'No additional details';
        
        return res.status(500).json({
            error: errorMessage,
            details: errorDetails,
            type: error?.name || 'Error'
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
        throw new Error(`Failed to generate game plan: ${error.message || error.toString()}`);
    }
}

async function generateWebsiteFiles(genAI: GoogleGenAI, sitewide: any, pages: any[], gamePlan: any) {
    try {
        const model = 'gemini-2.5-flash';
        const files = [];

        // Generate index.html
    const firstPage = pages[0];
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

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

Requirements:
- Clean, semantic HTML5
- Include proper meta tags for SEO
- Link to styles.css and script.js
- Mobile-responsive structure
- Professional, modern design
- Include navigation to all pages: ${pages.map(p => p.title).join(', ')}
- Display contact information: ${sitewide.fullAddress}, ${sitewide.phoneNumber}, ${sitewide.email}
${sitewide.contactForm ? '- Include a contact form on this page or link to contact page' : ''}
${sitewide.bookingForm ? '- Include a booking/appointment form or link to booking page' : ''}

Return ONLY the HTML code, no explanations.`;

    const htmlChat = genAI.chats.create({
        model: model,
        config: {
            systemInstruction: 'You are a professional web developer. Generate clean, semantic HTML5 code.'
        }
    });

    const htmlResult = await htmlChat.sendMessage({ message: htmlPrompt });
    let htmlContent = htmlResult.text.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();

    files.push({
        name: 'index.html',
        content: htmlContent
    });

    // Generate other pages
    for (let i = 1; i < pages.length; i++) {
        const page = pages[i];
        const pageFileName = page.title.toLowerCase().replace(/\s+/g, '-') + '.html';

        const pageHtmlPrompt = `Create a professional HTML file for the "${page.title}" page.

Company: ${sitewide.companyName}
Industry: ${sitewide.industry}
Page Information: ${page.information}

Contact Information:
- Address: ${sitewide.fullAddress}
- Phone: ${sitewide.phoneNumber}
- Email: ${sitewide.email}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

Requirements:
- Match the style of the main page
- Include navigation to: ${pages.map(p => p.title).join(', ')}
- Link to styles.css and script.js
- Mobile-responsive
- Display contact information: ${sitewide.fullAddress}, ${sitewide.phoneNumber}, ${sitewide.email}
${page.title.toLowerCase().includes('contact') && sitewide.contactForm ? '- Include a functional contact form' : ''}
${page.title.toLowerCase().includes('book') && sitewide.bookingForm ? '- Include a functional booking/appointment form' : ''}

Return ONLY the HTML code.`;

        const pageChat = genAI.chats.create({
            model: model,
            config: {
                systemInstruction: 'You are a professional web developer. Generate clean, semantic HTML5 code.'
            }
        });

        const pageResult = await pageChat.sendMessage({ message: pageHtmlPrompt });
        let pageContent = pageResult.text.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();

        files.push({
            name: pageFileName,
            content: pageContent
        });
    }

    // Generate CSS
    const cssPrompt = `Create a professional, modern CSS file for this website.

Company: ${sitewide.companyName}
Industry: ${sitewide.industry}
Company Type: ${sitewide.companyType}
Colors: ${sitewide.colors}
Brand Themes: ${sitewide.brandThemes}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

Requirements:
- Modern, clean design
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional typography
- Use the specified colors: ${sitewide.colors}
- Reflect brand themes: ${sitewide.brandThemes}
- Include hover effects
- Accessible design
- Cross-browser compatible
- Style contact forms and booking forms if present

Return ONLY the CSS code, no explanations.`;

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
    const jsPrompt = `Create JavaScript for this website if needed for interactivity.

Pages: ${pages.map(p => p.title).join(', ')}
Company Type: ${sitewide.companyType}
Design Guidelines: ${JSON.stringify(gamePlan, null, 2)}

Include:
- Mobile menu toggle
- Smooth scrolling
${sitewide.contactForm ? '- Contact form validation and submission handling' : ''}
${sitewide.bookingForm ? '- Booking form validation and date/time picker functionality' : ''}
- Any interactive elements from the game plan
- Modern, vanilla JavaScript (no frameworks)
- Form handling for contact and booking forms

Return ONLY the JavaScript code.`;

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

        return files;
    } catch (error: any) {
        console.error('Error in generateWebsiteFiles:', error);
        throw new Error(`Failed to generate website files: ${error.message || error.toString()}`);
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
        if (error.status === 422) {
            throw new Error(`Repository "${repoName}" already exists. Please try again.`);
        }
        throw error;
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
        // Create Vercel project
        const createProjectResponse = await fetch('https://api.vercel.com/v9/projects', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${VERCEL_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: projectName,
                gitRepository: {
                    type: 'github',
                    repo: repoFullName
                },
                framework: null,
                buildCommand: null,
                outputDirectory: null,
                installCommand: null,
                devCommand: null,
                environmentVariables: []
            })
        });

        if (!createProjectResponse.ok) {
            const errorData = await createProjectResponse.json();
            throw new Error(`Vercel project creation failed: ${errorData.error?.message || 'Unknown error'}`);
        }

        const projectData = await createProjectResponse.json();

        return {
            url: `https://${projectName}.vercel.app`,
            projectUrl: `https://vercel.com/${projectData.accountId}/${projectName}`,
            projectId: projectData.id
        };

    } catch (error: any) {
        console.error('Vercel deployment error:', error);
        return {
            url: 'Vercel deployment pending - check Vercel dashboard',
            projectUrl: 'https://vercel.com/dashboard',
            error: error.message
        };
    }
}

