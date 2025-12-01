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

// In-memory storage (in production, use Vercel KV or a database)
// This will reset on cold starts, so we need persistent storage
let savedSites: Array<{
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
}> = [];

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
        // In production, fetch from persistent storage (Vercel KV, database, etc.)
        // For now, we'll use the in-memory array which gets populated by save-site.ts
        // TODO: Replace with persistent storage
        
        // Check status for each site
        const sitesWithStatus: SiteStatus[] = await Promise.all(
            savedSites.map(async (site) => {
                const githubExists = await checkGitHubRepo(site.repoUrl);
                const vercelCheck = await checkVercelDeployment(site.vercelUrl, site.projectUrl);
                
                return {
                    ...site,
                    githubExists,
                    vercelDeployed: vercelCheck.deployed,
                    vercelStatus: vercelCheck.status as any
                };
            })
        );

        // Filter out sites where GitHub repo doesn't exist
        const validSites = sitesWithStatus.filter(site => site.githubExists);

        // Sort by most recent first
        validSites.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return res.json({ sites: validSites });
    } catch (error: any) {
        console.error('Error fetching sites:', error);
        return res.status(500).json({ error: 'Failed to fetch sites' });
    }
}

// Export the savedSites array so save-site.ts can access it
// In production, this should be a shared database/KV store
export { savedSites };

