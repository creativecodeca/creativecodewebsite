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
      aspectRatio,
      colorScheme,
    } = req.body;

    // Validation - 6 required fields
    if (!businessName || !adMessage || !targetAudience || !style || !aspectRatio || !colorScheme) {
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

    // Map color schemes to descriptive terms
    const colorSchemeDescriptions: Record<string, string> = {
      vibrant: 'vibrant, saturated colors with high contrast and energetic palette',
      dark: 'dark, moody atmosphere with deep shadows and dramatic lighting',
      light: 'light, airy aesthetic with soft pastels and bright, clean backgrounds',
      monochrome: 'black and white with strong contrast and classic elegance',
    };

    const styleDesc = styleDescriptions[style] || 'professional';
    const colorDesc = colorSchemeDescriptions[colorScheme] || 'balanced color palette';

    // Construct detailed prompt for Nano Banana Pro
    const prompt = `Create a professional ${styleDesc} advertisement image with ${colorDesc}.

Business: ${businessName}
Ad Message: ${adMessage}
Target Audience: ${targetAudience}

Visual Style: ${styleDesc}
Color Scheme: ${colorDesc}

Requirements:
- Ultra high-resolution, print-quality 4K image
- Professional composition suitable for digital advertising
- Eye-catching and modern design
- Clear, readable typography with the ad message prominently displayed
- Ensure text is prominent and legible
- Include visual elements that represent the business
- Ad should appeal to: ${targetAudience}
- Perfect for social media advertising`;

    console.log('Generating ad image with Nano Banana Pro (4K)...');
    console.log('Aspect Ratio:', aspectRatio);
    console.log('Prompt:', prompt.substring(0, 200) + '...');

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // Use Nano Banana Pro for image generation with 4K quality
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-3-pro-image-preview',
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio: aspectRatio, // Use the user's selected ratio
          imageSize: '4K', // Maximum quality
        },
      },
    });

    // Generate 1 image
    const images = [];
    
    try {
      // Generate image using Nano Banana Pro with 4K config
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      // Extract image data from response
      let imageDataUrl: string | null = null;
      
      if (response.candidates && response.candidates[0]) {
        const candidate = response.candidates[0];
        // Look through all parts for image data
        if (candidate.content?.parts) {
          for (const part of candidate.content.parts) {
            if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
              const imageData = part.inlineData;
              imageDataUrl = `data:${imageData.mimeType};base64,${imageData.data}`;
              break;
            }
          }
        }
      }
      
      // If no AI image generated, use fallback
      if (!imageDataUrl) {
        console.warn('No image data in Gemini response, using placeholder');
        imageDataUrl = createPlaceholderImage(adMessage, businessName, style);
      }

      images.push({
        id: `ad-${Date.now()}`,
        dataUrl: imageDataUrl,
        prompt: prompt.substring(0, 500),
      });
    } catch (error: any) {
      console.error('Error generating image with Nano Banana Pro:', error);
      // Fallback to placeholder on error
      images.push({
        id: `ad-${Date.now()}`,
        dataUrl: createPlaceholderImage(adMessage, businessName, style),
        prompt: prompt.substring(0, 500),
      });
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
