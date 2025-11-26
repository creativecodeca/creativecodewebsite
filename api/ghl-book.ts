import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const GHL_API_KEY = process.env.GHL_API_KEY;
const CALENDAR_ID = process.env.CALENDAR_ID;
const LOCATION_ID = process.env.LOCATION_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, startTime, title } = req.body;

    if (!GHL_API_KEY || !CALENDAR_ID || !LOCATION_ID) {
        return res.status(500).json({ error: 'Server configuration error: Missing API credentials' });
    }

    if (!email && !phone) {
        return res.status(400).json({ error: 'Email or Phone is required' });
    }

    try {
        // Format phone number - remove all non-digit characters except +
        const formattedPhone = phone ? phone.replace(/[^\d+]/g, '') : undefined;

        // Prepare contact data - GHL API format
        const contactPayload: any = {};

        // Name fields
        const nameParts = name.trim().split(/\s+/);
        contactPayload.firstName = nameParts[0] || name;
        contactPayload.lastName = nameParts.slice(1).join(' ') || '';
        contactPayload.name = name;

        // Contact info - at least one is required
        if (email) contactPayload.email = email.trim();
        if (formattedPhone) contactPayload.phone = formattedPhone;

        // Tags
        contactPayload.tags = ['website-booking'];

        // Ensure we have at least email or phone
        if (!contactPayload.email && !contactPayload.phone) {
            return res.status(400).json({ error: 'Email or Phone is required' });
        }

        console.log('Using Location ID:', LOCATION_ID);

        // 1. Search for existing contact first
        let contactId: string | null = null;

        // Try to find existing contact by email or phone using the location-specific endpoint
        const searchParams = new URLSearchParams();
        if (email) searchParams.append('email', email);
        if (formattedPhone) searchParams.append('phone', formattedPhone);

        const searchUrl = `https://services.leadconnectorhq.com/contacts/?locationId=${LOCATION_ID}&${searchParams.toString()}`;

        console.log('Searching for existing contact');

        const searchResponse = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-04-15',
                'Accept': 'application/json'
            }
        });

        if (searchResponse.ok) {
            const searchData = await searchResponse.json() as any;
            console.log('Search Response:', searchData);

            // Check if we found an existing contact
            if (searchData.contacts && searchData.contacts.length > 0) {
                contactId = searchData.contacts[0].id;
                console.log('Found existing contact:', contactId);
            }
        }

        // 2. Create or update contact with locationId
        const contactPayloadWithLocation = {
            ...contactPayload,
            locationId: LOCATION_ID
        };

        console.log('Contact Payload:', JSON.stringify(contactPayloadWithLocation, null, 2));

        let upsertResponse;
        if (contactId) {
            // Update existing contact
            const updateUrl = `https://services.leadconnectorhq.com/contacts/${contactId}`;
            upsertResponse = await fetch(updateUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${GHL_API_KEY}`,
                    'Version': '2021-04-15',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(contactPayloadWithLocation)
            });
        } else {
            // Create new contact
            const createUrl = 'https://services.leadconnectorhq.com/contacts/';
            upsertResponse = await fetch(createUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GHL_API_KEY}`,
                    'Version': '2021-04-15',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(contactPayloadWithLocation)
            });
        }

        const responseText = await upsertResponse.text();
        console.log('Contact Upsert Response Status:', upsertResponse.status);
        console.log('Contact Upsert Response Body:', responseText);

        if (!upsertResponse.ok) {
            let errData;
            try {
                errData = JSON.parse(responseText);
            } catch {
                errData = { message: responseText };
            }
            console.error('Contact Upsert Error Details:', {
                status: upsertResponse.status,
                statusText: upsertResponse.statusText,
                error: errData
            });
            return res.status(upsertResponse.status).json({
                error: 'Failed to create/update contact',
                details: errData.message || errData.error || errData.msg || responseText,
                status: upsertResponse.status
            });
        }

        const contactData = JSON.parse(responseText) as any;
        console.log('Contact Upsert Response:', contactData);

        // GHL API can return contact in different formats - update contactId if we created a new one
        if (!contactId) {
            contactId = contactData.contact?.id ||
                contactData.id ||
                contactData.contactId ||
                (contactData.contact && contactData.contact.id);
        }

        if (!contactId) {
            console.error('Contact response structure:', JSON.stringify(contactData, null, 2));
            return res.status(500).json({
                error: 'Could not retrieve contact ID',
                details: 'Unexpected response format from GHL API'
            });
        }

        // 3. Create appointment
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
