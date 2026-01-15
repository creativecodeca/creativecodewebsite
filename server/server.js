require('dotenv').config();
require('ts-node').register({ transpileOnly: true }); // enable on‑the‑fly TS compilation

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 4000;

// Global middleware (same as in the router file)
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'https://your-domain.com' }));
app.use(rateLimit({ windowMs: 60_000, max: 20, message: 'Too many requests' }));
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
