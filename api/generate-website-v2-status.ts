import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jobStorage } from './job-storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[generate-website-v2-status] Request received:', req.method, req.url);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { jobId } = req.query;
  console.log('[generate-website-v2-status] jobId:', jobId);

  if (!jobId || typeof jobId !== 'string') {
    return res.status(400).json({ error: 'jobId query parameter is required' });
  }

  const job = await jobStorage.getJob(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  // Check if client wants SSE (Server-Sent Events)
  const wantsSSE = req.headers.accept?.includes('text/event-stream') || 
                   req.query.stream === 'true';

  if (wantsSSE) {
    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering

    // Send initial status
    res.write(`data: ${JSON.stringify(job)}\n\n`);

    // If job is still processing, set up polling
    if (job.status === 'processing' || job.status === 'queued') {
      const pollInterval = setInterval(async () => {
        try {
          const updatedJob = await jobStorage.getJob(jobId);
          
          if (updatedJob) {
            res.write(`data: ${JSON.stringify(updatedJob)}\n\n`);
            
            // Close connection if job is complete or failed
            if (updatedJob.status === 'completed' || updatedJob.status === 'failed') {
              clearInterval(pollInterval);
              res.end();
            }
          } else {
            // Job not found
            clearInterval(pollInterval);
            res.write(`data: ${JSON.stringify({ error: 'Job not found' })}\n\n`);
            res.end();
          }
        } catch (error) {
          clearInterval(pollInterval);
          res.write(`data: ${JSON.stringify({ error: 'Error polling job status' })}\n\n`);
          res.end();
        }
      }, 2000); // Poll every 2 seconds

      // Cleanup on client disconnect
      req.on('close', () => {
        clearInterval(pollInterval);
        res.end();
      });

      // Timeout after 15 minutes
      setTimeout(() => {
        clearInterval(pollInterval);
        res.end();
      }, 900000);
    } else {
      // Job already complete, just send and close
      res.end();
    }
  } else {
    // Regular JSON response
    return res.json(job);
  }
}

