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
      // Step 3: Use Imagen 4 Ultra via the proper SDK method
      console.log('Step 2: Generating image with Imagen 4 Ultra (2K)...');
      
      // Use the genAI client we already created for concepts
      const imagenResponse = await genAI.models.generateImages({
        model: 'imagen-4.0-ultra-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          aspectRatio: aspectRatio,
          imageSize: '2K',
        },
      });

      // Extract image from response
      if (!imagenResponse.generatedImages || imagenResponse.generatedImages.length === 0) {
        throw new Error('No images generated by Imagen API');
      }

      const generatedImage = imagenResponse.generatedImages[0];
      if (!generatedImage.image?.imageBytes) {
        throw new Error('Image data not found in Imagen response');
      }

      const imageBytes = generatedImage.image.imageBytes;
      const imageDataUrl = `data:image/png;base64,${imageBytes}`;

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
    } catch (imagenError: any) {
      console.error('Imagen generation error:', imagenError);
      throw new Error(`Image generation failed: ${imagenError.message || 'Unknown error'}`);
    }

  } catch (error: any) {
    console.error('Error in ad generation process:', error);
    
    return res.status(500).json({
      error: error.message || 'Failed to generate ad image',
      code: 'GENERATION_FAILED',
    });
  }
}
