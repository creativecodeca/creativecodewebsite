import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const GHL_API_KEY = process.env.GHL_API_KEY;
const CALENDAR_ID = process.env.CALENDAR_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, startTime, title } = req.body;

    if (!GHL_API_KEY || !CALENDAR_ID) {
        return res.status(500).json({ error: 'Server configuration error: Missing API credentials' });
    }

    if (!email && !phone) {
        return res.status(400).json({ error: 'Email or Phone is required' });
    }

    try {
        // Format phone number - remove all non-digit characters except +
        const formattedPhone = phone ? phone.replace(/[^\d+]/g, '') : undefined;
        
        // Prepare contact data
        const contactPayload: any = {
            firstName: name.split(' ')[0] || name,
            lastName: name.split(' ').slice(1).join(' ') || '',
            name: name,
            tags: ['website-booking']
        };
        
        // Only include email/phone if they exist
        if (email) contactPayload.email = email;
        if (formattedPhone) contactPayload.phone = formattedPhone;

        // 1. Upsert Contact
        const upsertResponse = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-04-15',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(contactPayload)
        });

        if (!upsertResponse.ok) {
            const errText = await upsertResponse.text();
            let errData;
            try {
                errData = JSON.parse(errText);
            } catch {
                errData = { message: errText };
            }
            console.error('Contact Upsert Error:', upsertResponse.status, errData);
            return res.status(upsertResponse.status).json({ 
                error: 'Failed to create/update contact', 
                details: errData.message || errData.error || errText 
            });
        }

        const contactData = await upsertResponse.json() as any;
        console.log('Contact Upsert Response:', contactData);
        
        // GHL API can return contact in different formats
        const contactId = contactData.contact?.id || 
                         contactData.id || 
                         contactData.contactId ||
                         (contactData.contact && contactData.contact.id);

        if (!contactId) {
            console.error('Contact response structure:', JSON.stringify(contactData, null, 2));
            return res.status(500).json({ 
                error: 'Could not retrieve contact ID',
                details: 'Unexpected response format from GHL API'
            });
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
