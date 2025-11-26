import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// ---------- Security middleware ----------
router.use(helmet());
router.use(
    cors({
        origin: process.env.FRONTEND_ORIGIN || 'https://your-domain.com',
    })
);
router.use(
    rateLimit({
        windowMs: 60_000, // 1 minute
        max: 10, // max 10 submissions per minute per IP
        message: 'Too many requests, please try again later.',
    })
);

// ---------- Simple validation ----------
function validate(body: any): string | null {
    const required = ['name', 'email', 'phone', 'topic'];
    for (const f of required) {
        if (!body[f] || typeof body[f] !== 'string') {
            return `Missing or invalid field: ${f}`;
        }
    }
    return null;
}

// ---------- POST /api/contact ----------
router.post('/', async (req: Request, res: Response) => {
    const err = validate(req.body);
    if (err) return res.status(400).json({ success: false, error: err });

    // Build the payload that GHL will receive
    const payload = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        topic: req.body.topic,
        additionalInfo: req.body.additionalInfo ?? '',
        consentNonMarketing: req.body.consentNonMarketing,
        consentMarketing: req.body.consentMarketing,
        submittedAt: new Date().toISOString(),
    };

    // ----- Optional HMAC signature (adds tamper‑proof integrity) -----
    const secret = process.env.GHL_WEBHOOK_SECRET;
    let signatureHeader: string | undefined;
    if (secret) {
        const crypto = await import('crypto');
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(JSON.stringify(payload));
        signatureHeader = `sha256=${hmac.digest('hex')}`;
    }

    // ----- Send the webhook to GoHighLevel -----
    const webhookUrl =
        process.env.GHL_WEBHOOK_URL ||
        'https://services.leadconnectorhq.com/hooks/rpTHZGMl1DRkn0TYGHwe/webhook-trigger/fd16b1b9-ff4f-42d9-b947-d184242d4336';

    try {
        const ghResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(signatureHeader && { 'X-Hub-Signature-256': signatureHeader }),
            },
            body: JSON.stringify(payload),
        });

        console.log('🔔 Sent webhook to GHL', {
            url: webhookUrl,
            status: ghResponse.status,
        });

        if (!ghResponse.ok) {
            const txt = await ghResponse.text();
            console.error('❌ GHL responded with error', {
                status: ghResponse.status,
                body: txt,
            });
            throw new Error(`GHL responded ${ghResponse.status}: ${txt}`);
        }

        console.log('✅ GHL webhook succeeded');
        return res.json({ success: true });
    } catch (e: any) {
        console.error('❌ GHL webhook error →', e);
        return res
            .status(502)
            .json({ success: false, error: e.message ?? 'Webhook failure' });
    }
});

export default router;
