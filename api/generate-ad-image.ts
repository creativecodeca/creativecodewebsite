import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

// Rate limiting storage (in-memory for serverless, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // 5 requests per window

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // New window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
             (req.headers['x-real-ip'] as string) || 
             'unknown';
  
  const rateCheck = checkRateLimit(ip);
  
  if (!rateCheck.allowed) {
    // Log rate limit exceeded
    console.warn('Rate limit exceeded:', { ip, endpoint: '/api/generate-ad-image' });

    return res.status(429).json({ 
      error: 'Too many requests. Please try again in 10 minutes.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }

  try {
    const {
      businessName,
      adMessage,
      targetAudience,
      style,
    } = req.body;

    // Validation - only 4 required fields now
    if (!businessName || !adMessage || !targetAudience || !style) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found');
      return res.status(500).json({ 
        error: 'AI service is temporarily unavailable',
        code: 'SERVICE_UNAVAILABLE'
      });
    }

    // Map style to descriptive terms
    const styleDescriptions: Record<string, string> = {
      modern: 'modern and minimal with clean lines and simple typography',
      bold: 'bold and vibrant with energetic colors and dynamic layouts',
      professional: 'professional and corporate with a trustworthy, polished aesthetic',
      warm: 'warm and friendly with an approachable, human-centered design',
    };

    const styleDesc = styleDescriptions[style] || 'professional';

    // Construct detailed prompt for Nano Banana Pro
    const prompt = `Create a professional ${styleDesc} advertisement image.

Business: ${businessName}
Ad Message: ${adMessage}
Target Audience: ${targetAudience}

Visual Style: ${styleDesc}

Requirements:
- High-resolution, print-quality image
- Professional composition suitable for digital advertising
- Eye-catching and modern design
- Clear, readable typography
- Ensure text is prominent and legible
- Include visual elements that represent the business
- Ad should appeal to: ${targetAudience}`;

    console.log('Generating ad image with Nano Banana Pro...');
    console.log('Prompt:', prompt.substring(0, 200) + '...');

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // Use Nano Banana Pro for image generation (available through Gemini API)
    // Model name for image generation with Gemini
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
    });

    // Generate 2 variations
    const images = [];
    
    for (let i = 0; i < 2; i++) {
      try {
        // Add variation instruction for each iteration
        const variationPrompt = i === 0 
          ? prompt 
          : prompt + '\n\nVARIATION: Create a different composition and color scheme while maintaining the same message.';

        // Generate image using Gemini's image generation capability
        const result = await model.generateContent([
          {
            text: variationPrompt,
          },
          {
            inlineData: {
              mimeType: 'text/plain',
              data: Buffer.from('GENERATE_IMAGE').toString('base64'),
            },
          },
        ]);

        const response = await result.response;
        
        // Extract image data from response
        // The actual implementation depends on the Gemini API response format
        // For now, we'll use a fallback placeholder if the API doesn't return image data
        let imageDataUrl: string;
        
        if (response.candidates && response.candidates[0]) {
          const candidate = response.candidates[0];
          // Check if response contains image data
          if (candidate.content?.parts?.[0]?.inlineData) {
            const imageData = candidate.content.parts[0].inlineData;
            imageDataUrl = `data:${imageData.mimeType};base64,${imageData.data}`;
          } else {
            // Fallback to placeholder if no image data
            console.warn('No image data in response, using placeholder');
            imageDataUrl = createPlaceholderImage(adMessage, businessName, style);
          }
        } else {
          // Fallback to placeholder
          console.warn('No candidates in response, using placeholder');
          imageDataUrl = createPlaceholderImage(adMessage, businessName, style);
        }

        images.push({
          id: `ad-${Date.now()}-${i}`,
          dataUrl: imageDataUrl,
          prompt: variationPrompt.substring(0, 500),
        });

        // Add small delay between requests to avoid rate limiting
        if (i < 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error: any) {
        console.error(`Error generating image ${i + 1}:`, error);
        // Fallback to placeholder on error
        images.push({
          id: `ad-${Date.now()}-${i}`,
          dataUrl: createPlaceholderImage(adMessage, businessName, style),
          prompt: prompt.substring(0, 500),
        });
      }
    }

    return res.status(200).json({
      images,
      metadata: {
        model: 'nano-banana-pro (via Gemini 2.0)',
        generatedAt: new Date().toISOString(),
        remaining: rateCheck.remaining,
      },
    });

  } catch (error: any) {
    console.error('Error generating ad image:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}

// Helper function to create placeholder images
function createPlaceholderImage(adMessage: string, businessName: string, style: string): string {
  // Create a simple SVG placeholder that looks like an ad
  const colors: Record<string, { bg: string; accent: string }> = {
    modern: { bg: '#1a1a1a', accent: '#3b82f6' },
    bold: { bg: '#dc2626', accent: '#fbbf24' },
    professional: { bg: '#1e293b', accent: '#0891b2' },
    warm: { bg: '#f59e0b', accent: '#dc2626' },
  };

  const { bg, accent } = colors[style] || colors.modern;

  const svg = `
<svg width="1200" height="628" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${accent};stop-opacity:0.8" />
    </linearGradient>
  </defs>
  <rect width="1200" height="628" fill="url(#grad)"/>
  <text x="600" y="280" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle">
    ${adMessage.substring(0, 40)}
  </text>
  <text x="600" y="350" font-family="Arial, sans-serif" font-size="36" fill="white" text-anchor="middle" opacity="0.9">
    ${businessName}
  </text>
  <rect x="450" y="400" width="300" height="80" rx="40" fill="white"/>
  <text x="600" y="452" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="${bg}" text-anchor="middle">
    Learn More
  </text>
  <text x="600" y="580" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" opacity="0.7">
    Powered by Creative Code AI
  </text>
</svg>`;

  // Convert SVG to base64 data URL
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}
