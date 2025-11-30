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

    // Set up Server-Sent Events for progress updates
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

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
            fullAddress: `${address}, ${city}`
        };

        // Step 1: Generate game plan
        const gamePlan = await generateGamePlan(genAI, sitewide, pages);
        console.log('Game plan generated');
        sendProgress(res, 2, 'Creating website files...', 30);

        // Step 2: Generate website files
        const websiteFiles = await generateWebsiteFiles(genAI, sitewide, pages, gamePlan, res);
        console.log('Website files generated');
        sendProgress(res, 3, 'Pushing to GitHub...', 70);

        // Step 3: Create GitHub repository
        const repoName = `${companyName.toLowerCase().replace(/\s+/g, '-')}-website-${Date.now()}`;
        const repoData = await createGitHubRepo(repoName, websiteFiles, sitewide);
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

async function generateWebsiteFiles(genAI: GoogleGenAI, sitewide: any, pages: any[], gamePlan: any, res?: VercelResponse) {
    try {
        // Using Gemini 3 Pro Preview - latest and most advanced model
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

            const componentChat = genAI.chats.create({
        model: model,
        config: {
                    systemInstruction: 'You are a senior React developer with 10+ years of experience creating award-winning websites. Generate production-ready React/TypeScript components using Tailwind CSS. The website must look stunning, modern, and professional - matching the quality of premium $10,000+ websites. Use Tailwind utility classes extensively, proper component structure, and ensure visual hierarchy.'
                }
            });

            const componentResult = await componentChat.sendMessage({ message: componentPrompt });
            let componentContent = componentResult.text.replace(/```tsx\n?/g, '').replace(/```ts\n?/g, '').replace(/```jsx\n?/g, '').replace(/```javascript\n?/g, '').replace(/```\n?/g, '').trim();
            
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
    
    // OPTIMIZATION: Use only 1-2 most relevant search terms, not 5
    const searchTerms: string[] = [];
    
    // Primary: Industry + company type (most relevant)
    if (sitewide.industry && sitewide.companyType) {
        searchTerms.push(`${sitewide.industry} ${sitewide.companyType}`.toLowerCase().replace(/\//g, ' '));
    }
    
    // Secondary: Industry alone (only if we don't have primary)
    if (sitewide.industry && searchTerms.length === 0) {
        searchTerms.push(sitewide.industry.toLowerCase());
    }
    
    // Limit to 2 search terms max
    const uniqueTerms = searchTerms.slice(0, 2);
    
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

Colors: ${sitewide.colors}
Brand Themes: ${sitewide.brandThemes}
Extra Details: ${sitewide.extraDetailedInfo || ''}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

CRITICAL REQUIREMENTS:

1. Use React with TypeScript (React.FC)
2. Use Tailwind CSS utility classes extensively (NO custom CSS files)
3. Import and use React Helmet Async (import { Helmet } from 'react-helmet-async') for SEO meta tags
4. Component name: ${pageRoute.component}
5. Use proper TypeScript types
6. IMPORTANT: Import from 'react-helmet-async', NOT 'react-helmet'

HEADER (CRITICAL):
- Fixed/sticky header with backdrop blur: "fixed z-50 w-full top-0 bg-[#020202]/60 backdrop-blur-[20px] border-b border-white/10"
- Company name/logo on left
- Navigation menu on right (horizontal, hidden on mobile, hamburger menu)
- Use Link from react-router-dom for navigation
- Navigation links: ${pageRoutes.map(p => `${p.title} -> ${p.route}`).join(', ')}

BUTTONS (CRITICAL):
- Use <button> elements for CTAs, NOT <a> tags
- Primary buttons: "px-6 py-3 bg-[primary-color] text-white rounded-lg font-semibold hover:bg-[darker-color] transition-all hover:scale-105"
- Secondary buttons: "px-6 py-3 border-2 border-[primary-color] text-[primary-color] rounded-lg font-semibold hover:bg-[primary-color] hover:text-white transition-all"
- Buttons MUST look like buttons with padding, background, rounded corners

HERO SECTION:
- Full-width section with compelling design
- Large headline: "text-5xl md:text-7xl font-bold text-white"
- Subheadline: "text-xl md:text-2xl text-slate-300"
- CTA button prominently placed
- Background: gradient or image with overlay

IMAGES:
${images.length > 0 ? `Available images (use ONLY if contextually relevant):
${images.map((img, idx) => `   Image ${idx + 1}: ${img.url}`).join('\n')}
If images don't fit, use Tailwind gradients instead.` : 'Use Tailwind gradients or patterns instead of images.'}

CONTENT SECTIONS:
- Service/feature cards: "bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
- Proper spacing: "py-20 px-6"
- Max width container: "max-w-7xl mx-auto"

FOOTER:
- Multi-column layout
- Contact information
- Navigation links
- Copyright notice
${images.length > 0 ? '- Attribution link: <Link to="/attributions">Photo Credits</Link>' : ''}

FORMS:
${sitewide.contactForm ? '- Contact form with proper Tailwind styling\n- Input fields: "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-400"\n- Submit button: use button element with primary button classes' : ''}
${sitewide.bookingForm ? '- Booking form with date/time inputs\n- Same input styling as contact form' : ''}

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
    return `Create a professional, modern, high-quality React/TypeScript component for the "${page.title}" page using Tailwind CSS.

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

1. Use React with TypeScript (React.FC)
2. Use Tailwind CSS utility classes extensively
3. Import and use React Helmet Async (import { Helmet } from 'react-helmet-async') for SEO meta tags
4. Component name: ${pageRoute.component}
5. IMPORTANT: Import from 'react-helmet-async', NOT 'react-helmet'
5. Match the style and structure of the Home component
6. Use the SAME header and footer structure as Home

HEADER:
- Must match Home component exactly
- Same navigation structure
- Same styling classes

BUTTONS:
- Use <button> elements for CTAs
- Same button classes as Home component

IMAGES:
${images.length > 0 ? `Available images (use ONLY if relevant):
${images.map((img, idx) => `   Image ${idx + 1}: ${img.url}`).join('\n')}` : 'Use Tailwind gradients or patterns.'}

CONTENT:
- Match Home component's spacing and layout patterns
- Use same card styles, typography scale, and color scheme

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

export default defineConfig(({ isSsrBuild }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    build: {
      minify: 'esbuild',
      sourcemap: false,
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: isSsrBuild ? undefined : {
            vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
            ui: ['lucide-react']
          }
        }
      }
    },
    ssr: {
      noExternal: ['react-helmet-async']
    }
  };
});`;
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
    const imports = components.map(c => {
        const componentName = c.name.replace('.tsx', '');
        return `import ${componentName} from './components/${c.name}';`;
    }).join('\n');
    
    const routes = pageRoutes.map((route, idx) => {
        const componentName = route.component;
        return `          <Route path="${route.route}" element={<${componentName} />} />`;
    }).join('\n');
    
    return `import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
${imports}

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#020202] text-slate-200">
        <Navbar />
        <main>
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

function generateNavbarComponent(pageRoutes: any[], sitewide: any): string {
    const navLinks = pageRoutes.map(route => {
        const isHome = route.route === '/';
        return `          <Link
            to="${route.route}"
            className={\`hover:text-white transition-all \${location.pathname === '${route.route}' ? 'text-white' : 'text-slate-400'}\`}
          >
            ${isHome ? 'Home' : route.title}
          </Link>`;
    }).join('\n');
    
    return `import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed z-50 w-full top-0 bg-[#020202]/60 backdrop-blur-[20px] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="text-white font-semibold tracking-tighter text-lg flex items-center gap-3"
        >
          <span>${sitewide.companyName}</span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm font-semibold uppercase tracking-wider">
${navLinks}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020202]/95 backdrop-blur-[20px] border-t border-white/10">
          <div className="flex flex-col p-6 gap-4">
${pageRoutes.map(route => `            <Link
              to="${route.route}"
              className={\`hover:text-white transition-all \${location.pathname === '${route.route}' ? 'text-white' : 'text-slate-400'}\`}
              onClick={() => setMobileMenuOpen(false)}
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
    const footerLinks = pageRoutes.map(route => {
        return `            <Link to="${route.route}" className="text-slate-400 hover:text-white transition-colors">
              ${route.route === '/' ? 'Home' : route.title}
            </Link>`;
    }).join('\n');
    
    const attributionLink = hasAttributions ? `
            <Link to="/attributions" className="text-slate-400 hover:text-white transition-colors">
              Photo Credits
            </Link>` : '';
    
    return `import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">${sitewide.companyName}</h3>
            <p className="text-slate-400 text-sm">${sitewide.industry}</p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
${footerLinks}${attributionLink}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <div className="flex flex-col gap-2 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>${sitewide.fullAddress}</span>
              </div>
              <a href="tel:${sitewide.phoneNumber}" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>${sitewide.phoneNumber}</span>
              </a>
              <a href="mailto:${sitewide.email}" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
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
