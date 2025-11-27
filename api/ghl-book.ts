import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

const GHL_API_KEY = process.env.GHL_API_KEY;
const CALENDAR_ID = process.env.CALENDAR_ID;
const LOCATION_ID = process.env.LOCATION_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, startTime, title, calendarId } = req.body;

    const targetCalendarId = calendarId || CALENDAR_ID;

    if (!GHL_API_KEY || !targetCalendarId || !LOCATION_ID) {
        console.error('Missing env vars');
        return res.status(500).json({ error: 'Server configuration error: Missing API credentials' });
    }

    if (!email && !phone) {
        return res.status(400).json({ error: 'Email or Phone is required' });
    }

    try {
        const formattedPhone = phone ? phone.replace(/[^\d+]/g, '') : undefined;

        console.log('=== Booking Request ===');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', formattedPhone);
        console.log('Calendar ID:', targetCalendarId);

        // 1. Use upsert endpoint to create or update contact
        console.log('=== Upserting Contact ===');

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

        // Use the upsert endpoint
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

        const responseText = await upsertResponse.text();
        console.log('Upsert status:', upsertResponse.status);
        console.log('Upsert response:', responseText);

        if (!upsertResponse.ok) {
            let errData;
            try {
                errData = JSON.parse(responseText);
            } catch {
                errData = { message: responseText };
            }

            console.error('Upsert error:', errData);

            return res.status(upsertResponse.status).json({
                error: 'Failed to create/update contact',
                details: errData.message || errData.error || responseText,
                status: upsertResponse.status
            });
        }

        const contactData = JSON.parse(responseText) as any;
        console.log('Upsert success:', contactData);

        const contactId = contactData.contact?.id || contactData.id || contactData.contactId;

        if (!contactId) {
            console.error('Could not extract contact ID from:', contactData);
            return res.status(500).json({
                error: 'Could not retrieve contact ID',
                details: 'Unexpected response format'
            });
        }

        console.log('Contact ID:', contactId);

        // 2. Create appointment
        console.log('=== Creating Appointment ===');
        const appointmentPayload = {
            calendarId: targetCalendarId,
            locationId: LOCATION_ID,
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
            console.error('Appointment error:', errData);
            return res.status(appointmentResponse.status).json({
                error: 'Failed to book appointment',
                details: errData.message || errData.error || appointmentResponseText
            });
        }

        const appointmentData = JSON.parse(appointmentResponseText);
        console.log('=== Booking Success ===');

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
