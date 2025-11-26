import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const GHL_API_KEY = process.env.GHL_API_KEY;
const CALENDAR_ID = process.env.CALENDAR_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { startDate, endDate, timezone } = req.query;

    if (!GHL_API_KEY || !CALENDAR_ID) {
        return res.status(500).json({ error: 'Server configuration error: Missing API credentials' });
    }

    if (!startDate || !endDate || !timezone) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const url = `https://services.leadconnectorhq.com/calendars/${CALENDAR_ID}/free-slots?startDate=${startDate}&endDate=${endDate}&timezone=${timezone}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-04-15',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('GHL API Error:', response.status, errorText);
            return res.status(response.status).json({ error: 'Failed to fetch slots from GHL', details: errorText });
        }

        const data = await response.json();
        return res.json(data);
    } catch (error: any) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
