import express from 'express';
import { GoogleGenerativeAI } from '@google/genai';
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize AI clients
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize GitHub client
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

router.post('/generate-website', async (req, res) => {
    try {
        const { sitewide, pages } = req.body;

        // Validate input
        if (!sitewide || !pages || pages.length === 0) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        console.log('Starting website generation for:', sitewide.companyName);

        // Step 1: Generate game plan using Gemini
        const gamePlan = await generateGamePlan(sitewide, pages);
        console.log('Game plan generated');

        // Step 2: Generate website files using Gemini
        const websiteFiles = await generateWebsiteFiles(sitewide, pages, gamePlan);
        console.log('Website files generated');

        // Step 3: Create GitHub repository
        const repoName = `${sitewide.companyName.toLowerCase().replace(/\s+/g, '-')}-website`;
        const repoData = await createGitHubRepo(repoName, websiteFiles, sitewide);
        console.log('GitHub repository created:', repoData.repoUrl);

        // Step 4: Deploy to Vercel
        const vercelData = await deployToVercel(repoName, repoData.repoFullName, sitewide);
        console.log('Vercel deployment created:', vercelData.url);

        res.json({
            success: true,
            repoUrl: repoData.repoUrl,
            vercelUrl: vercelData.url,
            vercelProjectUrl: vercelData.projectUrl,
            message: 'Website generated, pushed to GitHub, and deployed to Vercel successfully'
        });

    } catch (error) {
        console.error('Error generating website:', error);
        res.status(500).json({
            error: error.message || 'Failed to generate website'
        });
    }
});

// Generate game plan using Gemini
async function generateGamePlan(sitewide, pages) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are a professional web developer creating a game plan for a website.

Company Information:
- Name: ${sitewide.companyName}
- Industry: ${sitewide.industry}
- Contact: ${sitewide.contactInfo}
- Location: ${sitewide.location}
- Color Scheme: ${sitewide.colorScheme}
- Brand Values: ${sitewide.brandValues}

Pages to create:
${pages.map((p, i) => `${i + 1}. ${p.title}: ${p.description}`).join('\n')}

Create a detailed game plan for building this website. Include:
1. Overall design approach and layout strategy
2. Color palette (specific hex codes based on the color scheme)
3. Typography choices
4. Key features for each page
5. Navigation structure
6. Responsive design considerations
7. Any special interactive elements needed

Keep it concise but comprehensive. Format as JSON with these keys: designApproach, colorPalette, typography, pageFeatures, navigation, responsiveStrategy, interactiveElements`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON, fallback to text if it fails
    try {
        return JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
    } catch {
        return { rawPlan: text };
    }
}

// Generate website files using Gemini
async function generateWebsiteFiles(sitewide, pages, gamePlan) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const files = [];

    // Generate index.html (main landing page or first page)
    const firstPage = pages[0];
    const htmlPrompt = `Create a professional, modern HTML file for the main page of a website.

Company: ${sitewide.companyName}
Industry: ${sitewide.industry}
Page: ${firstPage.title}
Description: ${firstPage.description}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

Requirements:
- Clean, semantic HTML5
- Include proper meta tags for SEO
- Link to styles.css and script.js
- Mobile-responsive structure
- Professional, modern design
- Include navigation to all pages: ${pages.map(p => p.title).join(', ')}
- Contact info: ${sitewide.contactInfo}
- Location: ${sitewide.location}

Return ONLY the HTML code, no explanations.`;

    const htmlResult = await model.generateContent(htmlPrompt);
    const htmlResponse = await htmlResult.response;
    let htmlContent = htmlResponse.text().replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();

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
Page Description: ${page.description}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

Requirements:
- Match the style of the main page
- Include navigation to: ${pages.map(p => p.title).join(', ')}
- Link to styles.css and script.js
- Mobile-responsive
- Contact info: ${sitewide.contactInfo}

Return ONLY the HTML code.`;

        const pageResult = await model.generateContent(pageHtmlPrompt);
        const pageResponse = await pageResult.response;
        let pageContent = pageResponse.text().replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();

        files.push({
            name: pageFileName,
            content: pageContent
        });
    }

    // Generate CSS
    const cssPrompt = `Create a professional, modern CSS file for this website.

Company: ${sitewide.companyName}
Industry: ${sitewide.industry}
Color Scheme: ${sitewide.colorScheme}
Brand Values: ${sitewide.brandValues}

Design Guidelines:
${JSON.stringify(gamePlan, null, 2)}

Requirements:
- Modern, clean design
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional typography
- Use the specified color scheme
- Include hover effects
- Accessible design
- Cross-browser compatible

Return ONLY the CSS code, no explanations.`;

    const cssResult = await model.generateContent(cssPrompt);
    const cssResponse = await cssResult.response;
    let cssContent = cssResponse.text().replace(/```css\n?/g, '').replace(/```\n?/g, '').trim();

    files.push({
        name: 'styles.css',
        content: cssContent
    });

    // Generate JavaScript (if needed)
    const jsPrompt = `Create JavaScript for this website if needed for interactivity.

Pages: ${pages.map(p => p.title).join(', ')}
Design Guidelines: ${JSON.stringify(gamePlan, null, 2)}

Include:
- Mobile menu toggle
- Smooth scrolling
- Form validation (if contact forms exist)
- Any interactive elements from the game plan
- Modern, vanilla JavaScript (no frameworks)

If no JavaScript is needed, return just: // No JavaScript needed

Return ONLY the JavaScript code.`;

    const jsResult = await model.generateContent(jsPrompt);
    const jsResponse = await jsResult.response;
    let jsContent = jsResponse.text().replace(/```javascript\n?/g, '').replace(/```js\n?/g, '').replace(/```\n?/g, '').trim();

    files.push({
        name: 'script.js',
        content: jsContent
    });

    // Generate README
    const readmeContent = `# ${sitewide.companyName}

${sitewide.industry} company website

## Pages
${pages.map(p => `- ${p.title}`).join('\n')}

## Contact
${sitewide.contactInfo}

## Location
${sitewide.location}

## Generated
This website was automatically generated by Creative Code's AI Website Generator.
`;

    files.push({
        name: 'README.md',
        content: readmeContent
    });

    return files;
}

// Create GitHub repository and push files
async function createGitHubRepo(repoName, files, sitewide) {
    try {
        // Get authenticated user
        const { data: user } = await octokit.users.getAuthenticated();

        // Create repository
        const { data: repo } = await octokit.repos.createForAuthenticatedUser({
            name: repoName,
            description: `Website for ${sitewide.companyName} - ${sitewide.industry}`,
            private: true,
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
            repoFullName: repo.full_name, // e.g., "username/repo-name"
            repoOwner: user.login
        };
    } catch (error) {
        if (error.status === 422) {
            throw new Error(`Repository "${repoName}" already exists. Please use a different company name or delete the existing repository.`);
        }
        throw error;
    }
}

// Deploy to Vercel
async function deployToVercel(projectName, repoFullName, sitewide) {
    try {
        const vercelToken = process.env.VERCEL_TOKEN;

        if (!vercelToken) {
            throw new Error('VERCEL_TOKEN not found in environment variables');
        }

        // Create Vercel project
        const createProjectResponse = await fetch('https://api.vercel.com/v9/projects', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${vercelToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: projectName,
                gitRepository: {
                    type: 'github',
                    repo: repoFullName
                },
                framework: null, // Static HTML site
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

        // Trigger initial deployment
        const deployResponse = await fetch('https://api.vercel.com/v13/deployments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${vercelToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: projectName,
                gitSource: {
                    type: 'github',
                    repo: repoFullName,
                    ref: 'main'
                },
                target: 'production'
            })
        });

        if (!deployResponse.ok) {
            const errorData = await deployResponse.json();
            console.error('Vercel deployment error:', errorData);
            // Don't fail if deployment doesn't trigger - Vercel will auto-deploy from GitHub
        }

        const deployData = await deployResponse.json();

        return {
            url: deployData.url || `https://${projectName}.vercel.app`,
            projectUrl: `https://vercel.com/${projectData.accountId}/${projectName}`,
            projectId: projectData.id
        };

    } catch (error) {
        console.error('Vercel deployment error:', error);
        // Return partial success - repo is created even if Vercel fails
        return {
            url: 'Vercel deployment pending - check Vercel dashboard',
            projectUrl: 'https://vercel.com/dashboard',
            error: error.message
        };
    }
}

export default router;
