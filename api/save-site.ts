import type { VercelRequest, VercelResponse } from '@vercel/node';
import { savedSites } from './get-sites';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === 'POST') {
        try {
            const { companyName, repoUrl, vercelUrl, projectUrl, industry } = req.body;

            if (!companyName || !repoUrl) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const newSite: SavedSite = {
                id: Date.now().toString(),
                companyName,
                repoUrl,
                vercelUrl,
                projectUrl,
                createdAt: new Date().toISOString(),
                industry,
            };

            savedSites.unshift(newSite); // Add to beginning
            // Keep only last 100 sites
            if (savedSites.length > 100) {
                savedSites = savedSites.slice(0, 100);
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

