import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const WEBHOOK_URL = process.env.ONBOARDING_WEBHOOK_URL;

if (!WEBHOOK_URL) {
    throw new Error('Missing ONBOARDING_WEBHOOK_URL environment variable');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            throw new Error(`Webhook failed with status ${response.status}`);
        }

        // Return success to the frontend
        return res.status(200).json({ success: true });

    } catch (error: any) {
        console.error('Onboarding submission error:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
