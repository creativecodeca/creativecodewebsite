import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

function validate(body: any): string | null {
  const required = ['name', 'email', 'phone', 'topic'];
  for (const field of required) {
    if (!body[field] || typeof body[field] !== 'string') {
      return `Missing or invalid field: ${field}`;
    }
  }
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const error = validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, error });
  }

  const {
    name,
    email,
    phone,
    topic,
    additionalInfo,
    consentNonMarketing,
    consentMarketing,
  } = req.body as {
    name: string;
    email: string;
    phone: string;
    topic: string;
    additionalInfo?: string;
    consentNonMarketing?: boolean;
    consentMarketing?: boolean;
  };

  const payload = {
    name,
    email,
    phone,
    topic,
    additionalInfo: additionalInfo ?? '',
    consentNonMarketing: !!consentNonMarketing,
    consentMarketing: !!consentMarketing,
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('GHL_WEBHOOK_URL is not configured');
    return res
      .status(500)
      .json({ success: false, error: 'Server configuration error' });
  }

  try {
    const ghResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!ghResponse.ok) {
      const txt = await ghResponse.text();
      console.error('GHL error', ghResponse.status, txt);
      return res
        .status(502)
        .json({ success: false, error: 'Webhook failure' });
    }

    return res.json({ success: true });
  } catch (e: any) {
    console.error('Webhook exception', e);
    return res
      .status(502)
      .json({ success: false, error: e?.message ?? 'Webhook failure' });
  }
}


