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
        console.error('Missing env vars');
        return res.status(500).json({ error: 'Server configuration error: Missing API credentials' });
    }

    if (!email && !phone) {
        return res.status(400).json({ error: 'Email or Phone is required' });
    }

    try {
        const formattedPhone = phone ? phone.replace(/[^\d+]/g, '') : undefined;

        console.log('=== Booking Request ===');
        console.log('Email:', email);
        console.log('Phone:', formattedPhone);

        // 1. Search for existing contact using lookup endpoint
        let contactId: string | null = null;

        if (email) {
            console.log('=== Searching by email using lookup ===');
            const lookupUrl = `https://services.leadconnectorhq.com/contacts/lookup?email=${encodeURIComponent(email)}&locationId=${LOCATION_ID}`;

            const lookupResponse = await fetch(lookupUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${GHL_API_KEY}`,
                    'Version': '2021-04-15',
                    'Accept': 'application/json'
                }
            });

            console.log('Lookup status:', lookupResponse.status);

            if (lookupResponse.ok) {
                const lookupData = await lookupResponse.json() as any;
                console.log('Lookup response:', JSON.stringify(lookupData, null, 2));

                // Extract contact ID from lookup response
                contactId = lookupData.contact?.id || lookupData.contacts?.[0]?.id || lookupData.id;

                if (contactId) {
                    console.log('Found existing contact via lookup:', contactId);
                }
            } else {
                const errorText = await lookupResponse.text();
                console.log('Lookup failed:', errorText);
            }
        }

        // 2. If lookup didn't work, try search endpoint
        if (!contactId && email) {
            console.log('=== Trying search endpoint ===');
            const searchUrl = `https://services.leadconnectorhq.com/contacts/search?locationId=${LOCATION_ID}&email=${encodeURIComponent(email)}`;

            const searchResponse = await fetch(searchUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${GHL_API_KEY}`,
                    'Version': '2021-04-15',
                    'Accept': 'application/json'
                }
            });

            console.log('Search status:', searchResponse.status);

            if (searchResponse.ok) {
                const searchData = await searchResponse.json() as any;
                console.log('Search response:', JSON.stringify(searchData, null, 2));

                if (searchData.contacts && searchData.contacts.length > 0) {
                    contactId = searchData.contacts[0].id;
                    console.log('Found existing contact via search:', contactId);
                }
            } else {
                const errorText = await searchResponse.text();
                console.log('Search failed:', errorText);
            }
        }

        // 3. If still no contact found, create new one
        if (!contactId) {
            console.log('=== Creating new contact ===');

            const contactPayload: any = {
                locationId: LOCATION_ID
            };

            const nameParts = name.trim().split(/\s+/);
            contactPayload.firstName = nameParts[0] || name;
            contactPayload.lastName = nameParts.slice(1).join(' ') || '';

            if (email) contactPayload.email = email.trim();
            if (formattedPhone) contactPayload.phone = formattedPhone;

            contactPayload.tags = ['website-booking'];
            contactPayload.source = 'website';

            console.log('Contact Payload:', JSON.stringify(contactPayload, null, 2));

            const createResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
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
            console.log('Create status:', createResponse.status);
            console.log('Create response:', responseText);

            if (!createResponse.ok) {
                let errData;
                try {
                    errData = JSON.parse(responseText);
                } catch {
                    errData = { message: responseText };
                }

                // If it's a duplicate error, the contact exists but we couldn't find it
                // Return a more helpful error
                if (responseText.includes('duplicate')) {
                    return res.status(400).json({
                        error: 'Contact already exists',
                        details: 'A contact with this email already exists. Please contact support or try a different email.',
                        status: createResponse.status
                    });
                }

                return res.status(createResponse.status).json({
                    error: 'Failed to create contact',
                    details: errData.message || errData.error || responseText,
                    status: createResponse.status
                });
            }

            const contactData = JSON.parse(responseText) as any;
            contactId = contactData.contact?.id || contactData.id || contactData.contactId;

            if (!contactId) {
                return res.status(500).json({
                    error: 'Could not retrieve contact ID'
                });
            }

            console.log('Created contact:', contactId);
        }

        console.log('Using Contact ID:', contactId);

        // 4. Create appointment
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
        console.log('Appointment status:', appointmentResponse.status);
        console.log('Appointment response:', appointmentResponseText);

        if (!appointmentResponse.ok) {
            let errData;
            try {
                errData = JSON.parse(appointmentResponseText);
            } catch {
                errData = { message: appointmentResponseText };
            }
            return res.status(appointmentResponse.status).json({
                error: 'Failed to book appointment',
                details: errData.message || errData.error || appointmentResponseText
            });
        }

        const appointmentData = JSON.parse(appointmentResponseText);
        console.log('=== Success ===');

        return res.json({
            success: true,
            appointment: appointmentData
        });

    } catch (error: any) {
        console.error('Server Error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
}
