import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phoneNumber, name, clinicName } = req.body;

    // Validate required fields
    if (!phoneNumber || !name || !clinicName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get webhook URL from environment variable
    const webhookUrl = process.env.GHL_GIFT_WEBHOOK;

    if (!webhookUrl) {
      console.error('GHL_GIFT_WEBHOOK environment variable is not set');
      return res.status(500).json({ error: 'Webhook configuration error' });
    }

    // Prepare payload for GHL webhook
    const payload = {
      phoneNumber,
      name,
      clinicName,
      timestamp: new Date().toISOString(),
    };

    // Send to GHL webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error('GHL webhook error:', errorText);
      return res.status(500).json({ error: 'Failed to send to webhook' });
    }

    return res.status(200).json({ success: true, message: 'Data sent successfully' });
  } catch (error: any) {
    console.error('Funnel webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

