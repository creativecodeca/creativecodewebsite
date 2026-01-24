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
      customColors,
    } = req.body;

    // Validation - 7 required fields
    if (!businessName || !adMessage || !targetAudience || !style || !aspectRatio || !colorScheme || !customColors) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found');
      return res.status(500).json({ 
        error: 'AI concept generation service is unavailable. Please add GEMINI_API_KEY to environment variables.',
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

    // Parse custom colors (can be array or comma-separated string)
    const colorsArray = Array.isArray(customColors) ? customColors : customColors.split(',');
    const colorsList = colorsArray.map((c: string) => c.trim()).filter(Boolean);
    const colorsText = colorsList.length > 0 
      ? `Use these specific brand colors: ${colorsList.join(', ')}.` 
      : '';

    console.log('Step 1: Using Gemini to craft unique ad concept...');
    console.log('Custom Colors:', colorsList);
    
    // Step 1: Use Gemini to create a unique ad concept
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const conceptModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const conceptPrompt = `You are a creative advertising expert. Based on the following information, create a unique, compelling ad concept:

Business: ${businessName}
Ad Message: ${adMessage}
Target Audience: ${targetAudience}
Visual Style: ${styleDesc}
Color Scheme: ${colorDesc}
Brand Colors: ${colorsList.join(', ')}
Aspect Ratio: ${aspectRatio}

Your task:
1. Create a creative visual concept that will make this ad stand out
2. Suggest specific visual elements, composition, and design details
3. Think about what would catch the target audience's attention
4. Be specific about imagery, layout, and visual storytelling
5. IMPORTANT: Incorporate the brand colors (${colorsList.join(', ')}) prominently in your concept

Respond with a detailed, creative ad concept in 2-3 sentences that an image AI can use to generate the perfect ad. Focus on visual details, not marketing copy.`;

    const conceptResult = await conceptModel.generateContent(conceptPrompt);
    const conceptResponse = await conceptResult.response;
    const adConcept = conceptResponse.text();
    
    // Don't log the full concept to avoid showing in Vercel logs
    console.log('Ad concept generated successfully');

    // Step 2: Construct the final Imagen prompt using the AI-generated concept
    const prompt = `Create a professional ${styleDesc} advertisement image with ${colorDesc}.

Business: ${businessName}
Ad Message: "${adMessage}"
Target Audience: ${targetAudience}

Creative Concept: ${adConcept}

Visual Style: ${styleDesc}
Color Scheme: ${colorDesc}
${colorsText}

Technical Requirements:
- Ultra high-resolution, print-quality 2K image
- Professional composition suitable for digital advertising
- Eye-catching and modern design
- Clear, readable typography with the ad message prominently displayed
- Ensure text is prominent and legible
- IMPORTANT: Use these exact brand colors prominently: ${colorsList.join(', ')}
- Ad should appeal to: ${targetAudience}
- Perfect for social media advertising
- Aspect ratio: ${aspectRatio}`;

    console.log('Step 2: Design specifications prepared');
    console.log('Aspect Ratio:', aspectRatio);

    // Generate 1 image using Gemini 3 Pro Image (Nano Banana Pro)
    console.log('Step 3: Generating image with Gemini Nano Banana Pro...');
    
    try {
      const imageModel = genAI.getGenerativeModel({ 
        model: 'gemini-3-pro-image-preview'
      });
      
      const result = await imageModel.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: {
            aspectRatio: aspectRatio,
            imageSize: '2K',
          },
        },
      });

      const response = await result.response;
      
      // Extract image from response
      if (!response.candidates || response.candidates.length === 0) {
        throw new Error('No candidates in Nano Banana Pro response');
      }

      const candidate = response.candidates[0];
      if (!candidate.content || !candidate.content.parts) {
        throw new Error('No content parts in response');
      }

      let imageDataUrl: string | null = null;
      
      for (const part of candidate.content.parts) {
        if (part.inlineData && part.inlineData.mimeType?.startsWith('image/')) {
          imageDataUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }

      if (!imageDataUrl) {
        throw new Error('No image data found in Nano Banana Pro response');
      }

      const images = [{
        id: `ad-${Date.now()}`,
        dataUrl: imageDataUrl,
        prompt: prompt.substring(0, 500),
      }];

      return res.status(200).json({
        images,
        metadata: {
          model: 'Nano Banana Pro (Gemini 3 Pro Image)',
          concept: adConcept,
          generatedAt: new Date().toISOString(),
          remaining: rateCheck.remaining,
        },
      });
    } catch (imageError: any) {
      console.error('Image generation failed:', imageError);
      throw new Error(`Failed to generate image: ${imageError.message || 'Unknown error'}`);
    }

  } catch (error: any) {
    console.error('Error in ad generation process:', error);
    
    return res.status(500).json({
      error: error.message || 'Failed to generate ad image',
      code: 'GENERATION_FAILED',
    });
  }
}
