import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const GHL_API_KEY = 'pit-c2cd0560-41a1-4bc9-83c9-3e0b46ab0e62';
const CALENDAR_ID = 'lZdUtuT0ufJlVxYH6Sjn';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, startTime, title } = req.body;

    if (!email && !phone) {
        return res.status(400).json({ error: 'Email or Phone is required' });
    }

    try {
        // 1. Upsert Contact
        const upsertResponse = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-07-28', // Use newer version for contacts if possible, or stick to 2021-04-15
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                phone,
                firstName: name.split(' ')[0],
                lastName: name.split(' ').slice(1).join(' '),
                name: name,
                tags: ['website-booking']
            })
        });

        if (!upsertResponse.ok) {
            const err = await upsertResponse.text();
            console.error('Contact Upsert Error:', err);
            return res.status(400).json({ error: 'Failed to create/update contact', details: err });
        }

        const contactData = await upsertResponse.json() as any;
        const contactId = contactData.contact?.id || contactData.id;

        if (!contactId) {
            return res.status(500).json({ error: 'Could not retrieve contact ID' });
        }

        const appointmentResponse = await fetch('https://services.leadconnectorhq.com/calendars/events/appointments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-04-15',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                calendarId: CALENDAR_ID,
                contactId: contactId,
                startTime: startTime, // ISO string
                title: title || 'New Appointment',
                appointmentStatus: 'confirmed',
                ignoreDateRange: false,
                toNotify: true
            })
        });

        if (!appointmentResponse.ok) {
            const err = await appointmentResponse.text();
            console.error('Booking Error:', err);
            return res.status(400).json({ error: 'Failed to book appointment', details: err });
        }

        const appointmentData = await appointmentResponse.json();
        return res.json({ success: true, appointment: appointmentData });

    } catch (error: any) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
