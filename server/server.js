require('dotenv').config();
require('ts-node').register({ transpileOnly: true }); // enable on‑the‑fly TS compilation

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { sendSecurityAlert } = require('./api/security-utils');

const app = express();
const PORT = process.env.PORT || 4000;

// Security alert handler for rate limiting
const onLimitReached = (req, res, options) => {
    sendSecurityAlert('Rate Limit Exceeded', {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
        userAgent: req.get('User-Agent'),
        headers: req.headers
    });
};

// Global middleware (same as in the router file)
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'https://your-domain.com' }));

// Global rate limiter
const globalLimiter = rateLimit({ 
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again after 15 minutes',
    handler: (req, res, next, options) => {
        onLimitReached(req, res, options);
        res.status(options.statusCode).send(options.message);
    }
});

app.use(globalLimiter);
app.use(express.json());

// Import the contact router (TS file) – ts-node will compile it on the fly
const contactRouter = require('./src/api/contact').default;
app.use('/api/contact', contactRouter);

// Import API routers
const ghlSlotsRouter = require('./api/ghl-slots');
const ghlBookRouter = require('./api/ghl-book');
const generateWebsiteRouter = require('./api/generate-website').default;

app.use('/api', ghlSlotsRouter);
app.use('/api', ghlBookRouter);
app.use('/api', generateWebsiteRouter);

app.listen(PORT, () => {
    console.log(`🚀 Backend server listening on http://localhost:${PORT}`);
});
