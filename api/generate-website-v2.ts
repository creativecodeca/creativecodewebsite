import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jobStorage, type Job } from './job-storage.js';
import { processWebsiteJob } from './website-processor.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate required fields
  const {
    companyName,
    industry,
    address,
    city,
    phoneNumber,
    email,
    companyType,
    colors,
    brandThemes,
    extraDetailedInfo,
    pages,
    contactForm,
    bookingForm,
    qualityTier = 'mockup'
  } = req.body;

  // Validate required fields
  if (!companyName || !industry || !address || !city || !phoneNumber || !email || !companyType || !colors || !brandThemes) {
    return res.status(400).json({ error: 'Missing required fields in General Information' });
  }

  if (!pages || !Array.isArray(pages) || pages.length === 0) {
    return res.status(400).json({ error: 'At least one page is required' });
  }

  for (const page of pages) {
    if (!page.title || !page.information) {
      return res.status(400).json({ error: `Page "${page.title || 'Untitled'}" is missing required information` });
    }
  }

  if (!GEMINI_API_KEY || !GITHUB_TOKEN) {
    return res.status(500).json({ 
      error: 'Website generation service is temporarily unavailable. Please contact support.',
      code: 'SERVICE_UNAVAILABLE'
    });
  }

  try {
    // Create job
    const job = await jobStorage.createJob({
      companyName,
      industry,
      address,
      city,
      phoneNumber,
      email,
      companyType,
      colors,
      brandThemes,
      extraDetailedInfo: extraDetailedInfo || '',
      pages,
      contactForm: contactForm || false,
      bookingForm: bookingForm || false,
      qualityTier: qualityTier || 'mockup'
    });

    // Start processing asynchronously (don't await)
    processWebsiteJob(job.id).catch(err => {
      console.error(`Job ${job.id} processing error:`, err);
      jobStorage.updateJob(job.id, {
        status: 'failed',
        error: err.message || 'Unknown error occurred',
        progress: 0
      });
    });

    // Return immediately with job ID
    return res.json({
      success: true,
      jobId: job.id,
      statusUrl: `/api/generate-website-v2-status?jobId=${job.id}`,
      message: 'Website generation started'
    });

  } catch (error: any) {
    console.error('Error creating job:', error);
    return res.status(500).json({ 
      error: 'Failed to create generation job',
      details: error.message 
    });
  }
}

