import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Octokit } from '@octokit/rest';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

interface SiteStatus {
    id: string;
    companyName: string;
    repoUrl: string;
    vercelUrl?: string;
    projectUrl?: string;
    createdAt: string;
    industry?: string;
    formData?: any;
    status: 'success' | 'failed';
    error?: string;
    // Real-time status
    githubExists: boolean;
    vercelDeployed: boolean;
    vercelStatus?: 'ready' | 'building' | 'error' | 'canceled' | 'unknown';
}

interface SavedSite {
    id: string;
    companyName: string;
    repoUrl: string;
    vercelUrl?: string;
    projectUrl?: string;
    createdAt: string;
    industry?: string;
    formData?: any;
    status: 'success' | 'failed';
    error?: string;
}

// In-memory storage (in production, use Vercel KV or a database)
// Note: This will reset on serverless function cold starts
// Each API route has its own instance, so we can't share state between routes
// TODO: Implement persistent storage (Vercel KV, database, etc.)
let savedSites: SavedSite[] = [];

// Helper to check if GitHub repo exists
async function checkGitHubRepo(repoUrl: string): Promise<boolean> {
    if (!GITHUB_TOKEN) return true; // Assume exists if no token
    
    try {
        const repoMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!repoMatch) return false;
        
        const [, owner, repo] = repoMatch;
        const octokit = new Octokit({ auth: GITHUB_TOKEN });
        
        await octokit.repos.get({ owner, repo });
        return true;
    } catch (error: any) {
        if (error.status === 404) {
            return false; // Repo doesn't exist
        }
        console.warn('Error checking GitHub repo:', error);
        return true; // Assume exists if check fails
    }
}

// Helper to check Vercel deployment status
async function checkVercelDeployment(vercelUrl?: string, projectUrl?: string): Promise<{ deployed: boolean; status?: string }> {
    if (!VERCEL_TOKEN || !vercelUrl) {
        return { deployed: false, status: 'unknown' };
    }
    
    try {
        // Extract project name from Vercel URL or project URL
        let projectName: string | null = null;
        
        if (vercelUrl) {
            // Extract from URL like https://project-name.vercel.app
            const urlMatch = vercelUrl.match(/https?:\/\/([^\.]+)\.vercel\.app/);
            if (urlMatch) {
                projectName = urlMatch[1];
            }
        }
        
        if (!projectName && projectUrl) {
            // Try to extract from project dashboard URL
            const projectMatch = projectUrl.match(/vercel\.com\/[^\/]+\/([^\/]+)/);
            if (projectMatch) {
                projectName = projectMatch[1];
            }
        }
        
        if (!projectName) {
            return { deployed: false, status: 'unknown' };
        }
        
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

        // Get project deployments
        const deploymentsUrl = `https://api.vercel.com/v6/deployments${accountId ? `?teamId=${accountId}` : ''}&project=${projectName}&limit=1`;
        const deploymentsResponse = await fetch(deploymentsUrl, {
            headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` }
        });

        if (deploymentsResponse.ok) {
            const deployments: any = await deploymentsResponse.json();
            if (deployments.deployments && deployments.deployments.length > 0) {
                const latestDeployment = deployments.deployments[0];
                const state = latestDeployment.state || 'unknown';
                
                return {
                    deployed: state === 'READY',
                    status: state.toLowerCase()
                };
            }
        }
        
        return { deployed: false, status: 'unknown' };
    } catch (error: any) {
        console.warn('Error checking Vercel deployment:', error);
        return { deployed: false, status: 'unknown' };
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        if (!GITHUB_TOKEN) {
            return res.json({ sites: [] });
        }

        const octokit = new Octokit({ auth: GITHUB_TOKEN });
        
        // Get authenticated user
        const { data: user } = await octokit.users.getAuthenticated();
        const username = user.login;

        // Fetch all repos for the user
        // Repos created by this system follow pattern: {company-name}-website-{timestamp}
        const { data: repos } = await octokit.repos.listForAuthenticatedUser({
            per_page: 100,
            sort: 'updated',
            direction: 'desc'
        });

        // Filter repos that match the generated website pattern
        const websiteRepos = repos.filter(repo => 
            repo.name.includes('-website-') && 
            repo.owner.login === username
        );

        // Build sites from GitHub repos
        const sites: SiteStatus[] = await Promise.all(
            websiteRepos.map(async (repo) => {
                const repoUrl = repo.html_url;
                const createdAt = repo.created_at;
                
                // Try to extract company name from repo name
                // Pattern: {company-name}-website-{timestamp}
                const nameMatch = repo.name.match(/^(.+)-website-\d+$/);
                const companyName = nameMatch ? nameMatch[1].replace(/-/g, ' ') : repo.name;
                
                // Try to fetch formData from metadata.json
                let formData: any = null;
                try {
                    const metadataResponse = await octokit.repos.getContent({
                        owner: username,
                        repo: repo.name,
                        path: 'metadata.json'
                    });
                    
                    if (metadataResponse.data && 'content' in metadataResponse.data) {
                        const content = Buffer.from(metadataResponse.data.content, 'base64').toString('utf-8');
                        const metadata = JSON.parse(content);
                        formData = metadata.formData || null;
                    }
                } catch (error) {
                    // metadata.json might not exist for older repos - that's okay
                    console.log(`No metadata.json found for ${repo.name}`);
                }
                
                // Try to find Vercel project for this repo
                let vercelUrl: string | undefined;
                let projectUrl: string | undefined;
                let vercelDeployed = false;
                let vercelStatus = 'unknown';
                
                if (VERCEL_TOKEN) {
                    try {
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

                        // Search for Vercel project linked to this repo
                        const projectsUrl = `https://api.vercel.com/v9/projects${accountId ? `?teamId=${accountId}` : ''}`;
                        const projectsResponse = await fetch(projectsUrl, {
                            headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` }
                        });

                        if (projectsResponse.ok) {
                            const projects: any = await projectsResponse.json();
                            const matchingProject = projects.projects?.find((p: any) => 
                                p.link?.repo === repo.full_name || 
                                p.link?.repoId === repo.id ||
                                p.name === repo.name
                            );
                            
                            if (matchingProject) {
                                projectUrl = `https://vercel.com/${accountId ? `team/${accountId}/` : ''}${matchingProject.name}`;
                                
                                // Get latest deployment
                                const deploymentsUrl = `https://api.vercel.com/v6/deployments${accountId ? `?teamId=${accountId}` : ''}&projectId=${matchingProject.id}&limit=1`;
                                const deploymentsResponse = await fetch(deploymentsUrl, {
                                    headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` }
                                });

                                if (deploymentsResponse.ok) {
                                    const deployments: any = await deploymentsResponse.json();
                                    if (deployments.deployments && deployments.deployments.length > 0) {
                                        const latestDeployment = deployments.deployments[0];
                                        vercelUrl = `https://${latestDeployment.url}`;
                                        vercelStatus = (latestDeployment.state || 'unknown').toLowerCase();
                                        vercelDeployed = latestDeployment.state === 'READY';
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.warn('Error checking Vercel for repo:', repo.name, e);
                    }
                }
                
                return {
                    id: repo.id.toString(),
                    companyName: companyName,
                    repoUrl: repoUrl,
                    vercelUrl: vercelUrl,
                    projectUrl: projectUrl,
                    createdAt: createdAt,
                    industry: undefined,
                    formData: null,
                    status: 'success' as const,
                    githubExists: true,
                    vercelDeployed: vercelDeployed,
                    vercelStatus: vercelStatus as any
                };
            })
        );

        // Sort by most recent first
        sites.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return res.json({ sites });
    } catch (error: any) {
        console.error('Error fetching sites from GitHub:', error);
        return res.status(500).json({ error: 'Failed to fetch sites from GitHub' });
    }
}

