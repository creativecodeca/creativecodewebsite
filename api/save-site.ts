import type { VercelRequest, VercelResponse } from '@vercel/node';

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
let savedSites: SavedSite[] = [];

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        try {
            const { companyName, repoUrl, vercelUrl, projectUrl, industry } = req.body;

            if (!companyName || !repoUrl) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const { status, error, formData } = req.body;
            
            const newSite: SavedSite = {
                id: Date.now().toString(),
                companyName,
                repoUrl,
                vercelUrl,
                projectUrl,
                createdAt: new Date().toISOString(),
                industry,
                status: status || (error ? 'failed' : 'success'),
                error,
                formData,
            };

            // Check if site already exists (by repoUrl) and update it, otherwise add new
            const existingIndex = savedSites.findIndex(s => s.repoUrl === repoUrl);
            if (existingIndex >= 0) {
                savedSites[existingIndex] = newSite; // Update existing
            } else {
                savedSites.unshift(newSite); // Add to beginning
            }
            
            // Keep only last 100 sites
            if (savedSites.length > 100) {
                savedSites.splice(100);
            }

            return res.json({ success: true, site: newSite });
        } catch (error: any) {
            console.error('Error saving site:', error);
            return res.status(500).json({ error: 'Failed to save site' });
        }
    }

    if (req.method === 'GET') {
        // Return all saved sites, sorted by most recent first
        return res.json({ sites: savedSites });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

