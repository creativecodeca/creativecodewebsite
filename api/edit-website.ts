import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { Octokit } from '@octokit/rest';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

// Helper function to send progress update via SSE
function sendProgress(res: VercelResponse, message: string, percentage: number) {
    try {
        res.write(`data: ${JSON.stringify({ message, percentage })}\n\n`);
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
        const { repoUrl, editPrompt, companyName } = req.body;

        if (!repoUrl || !editPrompt) {
            return res.status(400).json({ error: 'Missing repoUrl or editPrompt' });
        }

        if (!GEMINI_API_KEY || !GITHUB_TOKEN) {
            return res.status(500).json({ 
                error: 'Website editing service is temporarily unavailable. Please contact support.',
                code: 'SERVICE_UNAVAILABLE'
            });
        }

        console.log('Starting website edit for:', repoUrl);
        sendProgress(res, 'Analyzing changes...', 10);

        // Extract repo owner and name from URL
        // Format: https://github.com/owner/repo
        const repoMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!repoMatch) {
            throw new Error('Invalid GitHub repository URL');
        }

        const [, owner, repo] = repoMatch;
        const octokit = new Octokit({ auth: GITHUB_TOKEN });
        const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        // Step 1: Fetch current files from GitHub
        sendProgress(res, 'Fetching current website files...', 20);
        const { data: repoData } = await octokit.repos.get({ owner, repo });
        
        // Get the default branch SHA
        const { data: branchData } = await octokit.repos.getBranch({
            owner,
            repo,
            branch: repoData.default_branch
        });
        
        // Get all files from the repository
        const { data: treeData } = await octokit.git.getTree({
            owner,
            repo,
            tree_sha: branchData.commit.sha,
            recursive: '1'
        });

        // Filter for relevant files (components, config files, etc.)
        const relevantFiles = treeData.tree.filter((item: any) => 
            item.type === 'blob' && (
                item.path.endsWith('.tsx') ||
                item.path.endsWith('.ts') ||
                item.path.endsWith('.json') ||
                item.path.endsWith('.jsx') ||
                item.path === 'package.json' ||
                item.path === 'vite.config.ts'
            )
        );

        // Fetch file contents
        const files: Array<{ path: string; content: string }> = [];
        for (const file of relevantFiles.slice(0, 50)) { // Limit to 50 files
            try {
                const { data: fileData } = await octokit.repos.getContent({
                    owner,
                    repo,
                    path: file.path
                });
                
                if ('content' in fileData && fileData.encoding === 'base64') {
                    files.push({
                        path: file.path,
                        content: Buffer.from(fileData.content, 'base64').toString('utf-8')
                    });
                }
            } catch (e) {
                console.warn(`Failed to fetch ${file.path}:`, e);
            }
        }

        sendProgress(res, 'Analyzing files with AI...', 40);

        // Step 2: Use AI to determine which files need changes and how
        const model = 'gemini-3-pro-preview';
        const analysisPrompt = `You are analyzing a website that needs to be edited based on user instructions.

User's Edit Request: "${editPrompt}"

Current Website Files:
${files.map(f => `- ${f.path}`).join('\n')}

Analyze the request and determine:
1. Which files need to be modified
2. What specific changes need to be made to each file
3. Whether any new files need to be created

Return a JSON object with this structure:
{
  "filesToModify": [
    {
      "path": "components/Home.tsx",
      "reason": "Need to update hero section styling",
      "changes": "Change hero section background gradient, update button styles, modify heading text"
    }
  ],
  "filesToCreate": [
    {
      "path": "components/Testimonials.tsx",
      "reason": "User requested testimonials section",
      "content": "Full component code here"
    }
  ]
}

Be specific about what needs to change. Only include files that actually need modification.`;

        const analysisChat = genAI.chats.create({
            model: model,
            config: {
                systemInstruction: 'You are a senior web developer analyzing website modification requests. Provide clear, specific instructions for what needs to change.'
            }
        });

        const analysisResult = await analysisChat.sendMessage({ message: analysisPrompt });
        let analysisText = analysisResult.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        let analysis: any;
        try {
            analysis = JSON.parse(analysisText);
        } catch (e) {
            // If JSON parsing fails, create a simple analysis
            analysis = {
                filesToModify: files.filter(f => f.path.includes('components')).slice(0, 5).map((f: any) => ({
                    path: f.path,
                    reason: editPrompt,
                    changes: editPrompt
                })),
                filesToCreate: []
            };
        }

        sendProgress(res, 'Applying changes to files...', 60);

        // Step 3: Modify files using AI
        const modifiedFiles: Array<{ path: string; content: string }> = [];
        
        for (const fileMod of analysis.filesToModify || []) {
            const originalFile = files.find(f => f.path === fileMod.path);
            if (!originalFile) continue;

            sendProgress(res, `Editing ${fileMod.path}...`, 60 + (modifiedFiles.length * 20 / (analysis.filesToModify?.length || 1)));

            const editPromptForFile = `You are editing a React/TypeScript component file. Make the following changes:

User's Request: "${editPrompt}"
Specific Changes Needed: ${fileMod.changes || fileMod.reason}

Original File Content:
\`\`\`tsx
${originalFile.content}
\`\`\`

CRITICAL REQUIREMENTS:
1. Maintain the existing component structure and imports
2. Keep the shared Navbar and Footer components (import Navbar from '../components/Navbar' and import Footer from '../components/Footer')
3. Only modify what's necessary based on the user's request
4. Ensure the code is still valid TypeScript/React
5. Maintain consistency with the rest of the codebase
6. Do not break existing functionality

Return ONLY the complete modified file content. Do not include explanations or markdown formatting. Start directly with the code.`;

            const editChat = genAI.chats.create({
                model: model,
                config: {
                    systemInstruction: 'You are a senior React developer editing website components. Make precise changes while maintaining code quality and consistency.'
                }
            });

            const editResult = await editChat.sendMessage({ message: editPromptForFile });
            let editedContent = editResult.text.replace(/```tsx\n?/g, '').replace(/```ts\n?/g, '').replace(/```jsx\n?/g, '').replace(/```javascript\n?/g, '').replace(/```\n?/g, '').trim();
            
            modifiedFiles.push({
                path: originalFile.path,
                content: editedContent
            });
        }

        // Step 4: Create new files if needed
        for (const newFile of analysis.filesToCreate || []) {
            sendProgress(res, `Creating ${newFile.path}...`, 80);
            modifiedFiles.push({
                path: newFile.path,
                content: newFile.content || ''
            });
        }

        sendProgress(res, 'Committing changes to GitHub...', 90);

        // Step 5: Commit and push changes
        const commitMessage = `AI Edit: ${editPrompt.substring(0, 72)}`;
        
        // Get latest commit SHA from default branch
        const { data: latestCommit } = await octokit.repos.getCommit({
            owner,
            repo,
            ref: repoData.default_branch
        });

        // Create new tree with modified files
        const treeItems = await Promise.all(
            modifiedFiles.map(async (file) => {
                const { data: blob } = await octokit.git.createBlob({
                    owner,
                    repo,
                    content: file.content,
                    encoding: 'utf-8'
                });
                return {
                    path: file.path,
                    mode: '100644' as const,
                    type: 'blob' as const,
                    sha: blob.sha
                };
            })
        );

        // Create tree
        const { data: newTree } = await octokit.git.createTree({
            owner,
            repo,
            base_tree: latestCommit.commit.tree.sha,
            tree: treeItems
        });

        // Create commit
        const { data: newCommit } = await octokit.git.createCommit({
            owner,
            repo,
            message: commitMessage,
            tree: newTree.sha,
            parents: [latestCommit.sha]
        });

        // Update branch reference
        await octokit.git.updateRef({
            owner,
            repo,
            ref: `heads/${repoData.default_branch}`,
            sha: newCommit.sha
        });

        sendProgress(res, 'Triggering Vercel redeployment...', 95);

        // Step 6: Trigger Vercel redeployment if token is available
        if (VERCEL_TOKEN) {
            try {
                // Extract project name from repo
                const projectName = repo.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                
                // Get Vercel team/user info
                const accountResponse = await fetch('https://api.vercel.com/v2/teams', {
                    headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` }
                });

                let accountId: string | null = null;
                if (accountResponse.ok) {
                    const teams: any = await accountResponse.json();
                    if (teams.teams && teams.teams.length > 0) {
                        accountId = teams.teams[0].id;
                    }
                }

                if (!accountId) {
                    const userResponse = await fetch('https://api.vercel.com/v2/user', {
                        headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` }
                    });
                    if (userResponse.ok) {
                        const user: any = await userResponse.json();
                        accountId = user.user?.id || null;
                    }
                }

                // Trigger deployment
                const deploymentApiUrl = `https://api.vercel.com/v13/deployments${accountId ? `?teamId=${accountId}` : ''}`;
                await fetch(deploymentApiUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${VERCEL_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: projectName,
                        gitSource: {
                            type: 'github',
                            repoId: repoData.id,
                            ref: repoData.default_branch,
                            sha: newCommit.sha
                        },
                        target: 'production'
                    })
                });
            } catch (vercelError) {
                console.warn('Vercel redeployment trigger failed:', vercelError);
                // Continue - GitHub webhook will trigger deployment
            }
        }

        sendProgress(res, 'Edit complete!', 100);
        
        // Send final result
        res.write(`data: ${JSON.stringify({
            success: true,
            message: 'Website edited and redeployed successfully',
            commitSha: newCommit.sha
        })}\n\n`);
        
        res.end();

    } catch (error: any) {
        console.error('Error editing website:', error);
        console.error('Error stack:', error.stack);
        
        try {
            res.write(`data: ${JSON.stringify({
                success: false,
                error: error.message || 'An unexpected error occurred while editing the website. Please try again.',
                code: 'EDIT_ERROR'
            })}\n\n`);
            res.end();
        } catch (e) {
            return res.status(500).json({
                error: error.message || 'An unexpected error occurred while editing the website. Please try again.',
                code: 'EDIT_ERROR'
            });
        }
    }
}

