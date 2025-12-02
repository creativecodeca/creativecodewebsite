import { GoogleGenAI } from '@google/genai';
import { Octokit } from '@octokit/rest';
import fetch from 'node-fetch';
import { jobStorage } from './job-storage.js';
import { parseColorsWithAI } from './ai-color-parser.js';
import { selectTemplateWithAI } from './ai-template-selector.js';
import { generateSiteContentWithAI } from './ai-content-generator.js';
import { generateStaticSiteFiles } from './static-site-generator.js';
import { createGitHubRepo, deployToVercel } from './deployment.js';
import { getRelevantImage } from './image-fetcher.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

export async function processWebsiteJob(jobId: string): Promise<void> {
  const job = await jobStorage.getJob(jobId);
  if (!job) {
    throw new Error(`Job ${jobId} not found`);
  }

  try {
    // Update status to processing
    await jobStorage.updateJob(jobId, {
      status: 'processing',
      progress: 5,
      message: 'Initializing...'
    });

    // Initialize AI client
    const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY! });

    // Step 1: Parse colors (5-10s)
    await jobStorage.updateJob(jobId, {
      progress: 10,
      message: 'Parsing color scheme...'
    });

    const colors = await parseColorsWithAI(genAI, job.input.colors);
    console.log(`[Job ${jobId}] Colors parsed:`, colors);

    // Step 2: Select template (5-10s)
    await jobStorage.updateJob(jobId, {
      progress: 20,
      message: 'Selecting best template...'
    });

    const templateId = await selectTemplateWithAI(genAI, job.input, colors);
    console.log(`[Job ${jobId}] Template selected:`, templateId);

    // Step 3: Generate content (30-60s)
    await jobStorage.updateJob(jobId, {
      progress: 30,
      message: 'Generating website content...'
    });

    const content = await generateSiteContentWithAI(genAI, job.input, colors, templateId);
    console.log(`[Job ${jobId}] Content generated`);

    // Step 3.5: Fetch relevant images (non-blocking, fast)
    await jobStorage.updateJob(jobId, {
      progress: 45,
      message: 'Fetching relevant images...'
    });

    // Fetch images for hero and key sections (non-blocking, with timeout)
    const searchTerms = [
      `${job.input.companyName} ${job.input.industry}`,
      `${job.input.industry} business`
    ];
    
    const imagePromises = searchTerms.slice(0, 2).map(term =>
      getRelevantImage(term, 3000).catch(() => null)
    );
    
    const images = (await Promise.all(imagePromises)).filter((img: any) => img !== null);
    console.log(`[Job ${jobId}] Fetched ${images.length} images`);

    // Step 4: Generate static files (5-10s)
    await jobStorage.updateJob(jobId, {
      progress: 60,
      message: 'Building website files...'
    });

    const files = await generateStaticSiteFiles(templateId, content, colors, job.input, images);
    console.log(`[Job ${jobId}] Files generated:`, files.length);

    // Step 5: Push to GitHub (10-20s)
    await jobStorage.updateJob(jobId, {
      progress: 80,
      message: 'Pushing to GitHub...'
    });

    const repoName = `${job.input.companyName.toLowerCase().replace(/\s+/g, '-')}-website-${Date.now()}`;
    const repoData = await createGitHubRepo(repoName, files, job.input);
    console.log(`[Job ${jobId}] GitHub repo created:`, repoData.repoUrl);

    // Step 6: Deploy to Vercel (10-20s)
    await jobStorage.updateJob(jobId, {
      progress: 90,
      message: 'Deploying to Vercel...'
    });

    let vercelData = null;
    if (VERCEL_TOKEN) {
      vercelData = await deployToVercel(repoData.repoId, repoData.latestCommitSha, repoName);
      console.log(`[Job ${jobId}] Vercel deployment:`, vercelData.url);
    }

    // Complete!
    await jobStorage.updateJob(jobId, {
      status: 'completed',
      progress: 100,
      message: 'Website generation complete!',
      result: {
        repoUrl: repoData.repoUrl,
        vercelUrl: vercelData?.url || null,
        projectUrl: vercelData?.projectUrl || null
      }
    });

    console.log(`[Job ${jobId}] Job completed successfully`);

  } catch (error: any) {
    console.error(`[Job ${jobId}] Error:`, error);
    await jobStorage.updateJob(jobId, {
      status: 'failed',
      error: error.message || 'Unknown error occurred',
      progress: 0,
      message: `Error: ${error.message || 'Unknown error'}`
    });
    throw error;
  }
}

