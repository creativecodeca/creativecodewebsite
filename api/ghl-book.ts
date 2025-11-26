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
        console.error('Missing env vars:', {
            hasKey: !!GHL_API_KEY,
            hasCalendar: !!CALENDAR_ID,
            hasLocation: !!LOCATION_ID
        });
        return res.status(500).json({ error: 'Server configuration error: Missing API credentials' });
    }

    if (!email && !phone) {
        return res.status(400).json({ error: 'Email or Phone is required' });
    }

    try {
        // Format phone number - remove all non-digit characters except +
        const formattedPhone = phone ? phone.replace(/[^\d+]/g, '') : undefined;

        console.log('=== Booking Request ===');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', formattedPhone);
        console.log('Start Time:', startTime);

        // 1. Search for existing contact by email
        let contactId: string | null = null;

        if (email) {
            console.log('=== Searching for existing contact by email ===');
            const searchUrl = `https://services.leadconnectorhq.com/contacts/?locationId=${LOCATION_ID}&query=${encodeURIComponent(email)}`;

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
                console.log('Search response:', JSON.stringify(searchData, null, 2));

                if (searchData.contacts && searchData.contacts.length > 0) {
                    // Find exact email match
                    const exactMatch = searchData.contacts.find((c: any) =>
                        c.email && c.email.toLowerCase() === email.toLowerCase()
                    );

                    if (exactMatch) {
                        contactId = exactMatch.id;
                        console.log('Found existing contact:', contactId);
                    }
                }
            } else {
                console.log('Search failed:', searchResponse.status, await searchResponse.text());
            }
        }

        // 2. If no contact found, create new one
        if (!contactId) {
            console.log('=== Creating new contact ===');

            const contactPayload: any = {
                locationId: LOCATION_ID
            };

            // Name fields
            const nameParts = name.trim().split(/\s+/);
            contactPayload.firstName = nameParts[0] || name;
            contactPayload.lastName = nameParts.slice(1).join(' ') || '';

            // Contact info
            if (email) contactPayload.email = email.trim();
            if (formattedPhone) contactPayload.phone = formattedPhone;

            // Tags and source
            contactPayload.tags = ['website-booking'];
            contactPayload.source = 'website';

            console.log('Contact Payload:', JSON.stringify(contactPayload, null, 2));

            const createUrl = 'https://services.leadconnectorhq.com/contacts/';
            const createResponse = await fetch(createUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GHL_API_KEY}`,
                    'Version': '2021-04-15',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(contactPayload)
            });

            const responseText = await createResponse.text();
            console.log('Contact Create Response Status:', createResponse.status);
            console.log('Contact Create Response Body:', responseText);

            if (!createResponse.ok) {
                let errData;
                try {
                    errData = JSON.parse(responseText);
                } catch {
                    errData = { message: responseText };
                }
                console.error('Contact Create Error:', errData);

                return res.status(createResponse.status).json({
                    error: 'Failed to create/update contact',
                    details: errData.message || errData.error || errData.msg || responseText,
                    status: createResponse.status
                });
            }

            const contactData = JSON.parse(responseText) as any;
            console.log('Contact Created:', contactData);

            contactId = contactData.contact?.id || contactData.id || contactData.contactId;

            if (!contactId) {
                console.error('Could not extract contact ID from response');
                return res.status(500).json({
                    error: 'Could not retrieve contact ID',
                    details: 'Unexpected response format from GHL API'
                });
            }
        }

        console.log('Using Contact ID:', contactId);

        // 3. Create appointment
        console.log('=== Creating Appointment ===');
        const appointmentPayload = {
            calendarId: CALENDAR_ID,
            contactId: contactId,
            startTime: startTime,
            title: title || `Meeting with ${name}`,
            appointmentStatus: 'confirmed',
            ignoreDateRange: false,
            toNotify: true
        };

        console.log('Appointment Payload:', JSON.stringify(appointmentPayload, null, 2));

        const appointmentResponse = await fetch('https://services.leadconnectorhq.com/calendars/events/appointments', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GHL_API_KEY}`,
                'Version': '2021-04-15',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(appointmentPayload)
        });

        const appointmentResponseText = await appointmentResponse.text();
        console.log('Appointment Response Status:', appointmentResponse.status);
        console.log('Appointment Response Body:', appointmentResponseText);

        if (!appointmentResponse.ok) {
            let errData;
            try {
                errData = JSON.parse(appointmentResponseText);
            } catch {
                errData = { message: appointmentResponseText };
            }
            console.error('Appointment Error:', errData);
            return res.status(appointmentResponse.status).json({
                error: 'Failed to book appointment',
                details: errData.message || errData.error || appointmentResponseText
            });
        }

        const appointmentData = JSON.parse(appointmentResponseText);
        console.log('=== Booking Success ===');
        console.log('Appointment:', appointmentData);

        return res.json({
            success: true,
            appointment: appointmentData
        });

    } catch (error: any) {
        console.error('Server Error:', error);
        console.error('Error Stack:', error.stack);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
}
