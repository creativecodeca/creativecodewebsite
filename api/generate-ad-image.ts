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

    console.log('Step 1: Using Gemini to craft unique ad concept...');
    
    // Step 1: Use Gemini to create a unique ad concept
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const conceptModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const conceptPrompt = `You are a creative advertising expert. Based on the following information, create a unique, compelling ad concept:

Business: ${businessName}
Ad Message: ${adMessage}
Target Audience: ${targetAudience}
Visual Style: ${styleDesc}
Color Scheme: ${colorDesc}
Aspect Ratio: ${aspectRatio}

Your task:
1. Create a creative visual concept that will make this ad stand out
2. Suggest specific visual elements, composition, and design details
3. Think about what would catch the target audience's attention
4. Be specific about imagery, layout, and visual storytelling

Respond with a detailed, creative ad concept in 2-3 sentences that an image AI can use to generate the perfect ad. Focus on visual details, not marketing copy.`;

    const conceptResult = await conceptModel.generateContent(conceptPrompt);
    const conceptResponse = await conceptResult.response;
    const adConcept = conceptResponse.text();
    
    console.log('Generated Ad Concept:', adConcept.substring(0, 200) + '...');

    // Step 2: Construct the final Imagen prompt using the AI-generated concept
    const prompt = `Create a professional ${styleDesc} advertisement image with ${colorDesc}.

Business: ${businessName}
Ad Message: "${adMessage}"
Target Audience: ${targetAudience}

Creative Concept: ${adConcept}

Visual Style: ${styleDesc}
Color Scheme: ${colorDesc}

Technical Requirements:
- Ultra high-resolution, print-quality 2K image
- Professional composition suitable for digital advertising
- Eye-catching and modern design
- Clear, readable typography with the ad message prominently displayed
- Ensure text is prominent and legible
- Ad should appeal to: ${targetAudience}
- Perfect for social media advertising
- Aspect ratio: ${aspectRatio}`;

    console.log('Step 2: Generating image with Imagen 4 Ultra (2K)...');
    console.log('Aspect Ratio:', aspectRatio);
    console.log('Final Prompt:', prompt.substring(0, 250) + '...');

    // Generate 1 image
    const images = [];
    
    try {
      // Use Imagen 4 Ultra - Google's best text-to-image model

    // Use Imagen 4 Ultra - Google's best text-to-image model
    // Available aspect ratios: 1:1, 3:4, 4:3, 9:16, 16:9
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-ultra-generate-001:predict',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify({
          instances: [{
            prompt: prompt,
          }],
          parameters: {
            sampleCount: 1,
            aspectRatio: aspectRatio,
            imageSize: '2K', // Imagen 4 supports up to 2K
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Imagen API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract image from Imagen response
    let imageDataUrl: string | null = null;
    
    if (data.predictions && data.predictions[0]) {
      const prediction = data.predictions[0];
      if (prediction.bytesBase64Encoded) {
        imageDataUrl = `data:image/png;base64,${prediction.bytesBase64Encoded}`;
      } else if (prediction.mimeType && prediction.bytesBase64Encoded) {
        imageDataUrl = `data:${prediction.mimeType};base64,${prediction.bytesBase64Encoded}`;
      }
    }
    
    // Fallback to placeholder if no image generated
    if (!imageDataUrl) {
      console.warn('No image data from Imagen 4, using placeholder');
      imageDataUrl = createPlaceholderImage(adMessage, businessName, style);
    }

    images.push({
      id: `ad-${Date.now()}`,
      dataUrl: imageDataUrl,
      prompt: prompt.substring(0, 500),
    });

    return res.status(200).json({
      images,
      metadata: {
        model: 'imagen-4.0-ultra (Google AI)',
        concept: adConcept,
        generatedAt: new Date().toISOString(),
        remaining: rateCheck.remaining,
      },
    });

  } catch (error: any) {
    console.error('Error generating ad image:', error);
    
    // Fallback to placeholder on error
    const fallbackImage = {
      id: `ad-${Date.now()}`,
      dataUrl: createPlaceholderImage(req.body.adMessage || '', req.body.businessName || '', req.body.style || 'modern'),
      prompt: 'Fallback placeholder',
    };
    
    return res.status(200).json({
      images: [fallbackImage],
      metadata: {
        model: 'fallback-svg',
        generatedAt: new Date().toISOString(),
        remaining: rateCheck.remaining,
        error: 'AI generation failed, using fallback',
      },
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
