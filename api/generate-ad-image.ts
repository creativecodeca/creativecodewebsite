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

    // Generate 1 image using Canvas-based template rendering
    console.log('Step 3: Generating ad image with custom template...');
    
    try {
      // Create a professional ad image based on the concept and user inputs
      const adImage = await generateTemplateAd({
        businessName,
        adMessage,
        targetAudience,
        style,
        aspectRatio,
        colorScheme,
        customColors: colorsList,
        concept: adConcept,
      });

      const images = [{
        id: `ad-${Date.now()}`,
        dataUrl: adImage,
        prompt: prompt.substring(0, 500),
      }];

      return res.status(200).json({
        images,
        metadata: {
          model: 'Custom Template Generator (Creative Code AI)',
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

// Template-based ad generator function
interface AdTemplateData {
  businessName: string;
  adMessage: string;
  targetAudience: string;
  style: string;
  aspectRatio: string;
  colorScheme: string;
  customColors: string[];
  concept: string;
}

async function generateTemplateAd(data: AdTemplateData): Promise<string> {
  const { businessName, adMessage, style, aspectRatio, customColors } = data;
  
  // Determine dimensions based on aspect ratio
  const dimensions: Record<string, { width: number; height: number }> = {
    '1:1': { width: 1200, height: 1200 },
    '4:5': { width: 1080, height: 1350 },
    '16:9': { width: 1920, height: 1080 },
  };
  
  const { width, height } = dimensions[aspectRatio] || dimensions['1:1'];
  
  // Use custom colors or defaults
  const primaryColor = customColors[0] || '#3B82F6';
  const secondaryColor = customColors[1] || '#8B5CF6';
  const accentColor = customColors[2] || '#EC4899';
  const textColor = customColors[3] || '#FFFFFF';
  
  // Style-specific design parameters
  const styleConfigs: Record<string, { fontWeight: string; pattern: string; overlay: string }> = {
    modern: { fontWeight: '300', pattern: 'minimal', overlay: 'linear' },
    bold: { fontWeight: '900', pattern: 'geometric', overlay: 'vibrant' },
    professional: { fontWeight: '600', pattern: 'clean', overlay: 'subtle' },
    warm: { fontWeight: '500', pattern: 'organic', overlay: 'soft' },
  };
  
  const config = styleConfigs[style] || styleConfigs.modern;
  
  // Create SVG with professional design
  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradient backgrounds -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${secondaryColor};stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:${accentColor};stop-opacity:0.8" />
    </linearGradient>
    
    <!-- Radial gradient for depth -->
    <radialGradient id="depthGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:white;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:black;stop-opacity:0.3" />
    </radialGradient>
    
    <!-- Text shadow filter -->
    <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
      <feOffset dx="0" dy="4" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.5"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Glow effect -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
  
  <!-- Depth overlay -->
  <rect width="${width}" height="${height}" fill="url(#depthGradient)"/>
  
  <!-- Decorative elements based on style -->
  ${config.pattern === 'geometric' ? `
    <circle cx="${width * 0.2}" cy="${height * 0.3}" r="${width * 0.15}" fill="${accentColor}" opacity="0.2"/>
    <circle cx="${width * 0.8}" cy="${height * 0.7}" r="${width * 0.2}" fill="${secondaryColor}" opacity="0.15"/>
  ` : config.pattern === 'organic' ? `
    <ellipse cx="${width * 0.15}" cy="${height * 0.2}" rx="${width * 0.12}" ry="${width * 0.18}" fill="${accentColor}" opacity="0.15" transform="rotate(30 ${width * 0.15} ${height * 0.2})"/>
    <ellipse cx="${width * 0.85}" cy="${height * 0.8}" rx="${width * 0.15}" ry="${width * 0.1}" fill="${secondaryColor}" opacity="0.2" transform="rotate(-20 ${width * 0.85} ${height * 0.8})"/>
  ` : ''}
  
  <!-- Content container -->
  <g transform="translate(${width * 0.1}, ${height * 0.4})">
    <!-- Business Name -->
    <text 
      x="0" 
      y="0" 
      font-family="Arial, Helvetica, sans-serif" 
      font-size="${Math.min(width * 0.05, 60)}" 
      font-weight="${config.fontWeight}" 
      fill="${textColor}"
      filter="url(#textShadow)"
      opacity="0.9"
    >
      ${businessName.substring(0, 30)}
    </text>
    
    <!-- Ad Message -->
    <text 
      x="0" 
      y="${Math.min(height * 0.15, 120)}" 
      font-family="Arial, Helvetica, sans-serif" 
      font-size="${Math.min(width * 0.08, 96)}" 
      font-weight="${parseInt(config.fontWeight) + 200}" 
      fill="${textColor}"
      filter="url(#textShadow)"
    >
      ${wrapText(adMessage, Math.floor(width * 0.8 / (width * 0.04)))[0]?.substring(0, 40) || ''}
    </text>
    ${wrapText(adMessage, Math.floor(width * 0.8 / (width * 0.04)))[1] ? `
    <text 
      x="0" 
      y="${Math.min(height * 0.15, 120) + Math.min(width * 0.085, 100)}" 
      font-family="Arial, Helvetica, sans-serif" 
      font-size="${Math.min(width * 0.08, 96)}" 
      font-weight="${parseInt(config.fontWeight) + 200}" 
      fill="${textColor}"
      filter="url(#textShadow)"
    >
      ${wrapText(adMessage, Math.floor(width * 0.8 / (width * 0.04)))[1]?.substring(0, 40) || ''}
    </text>
    ` : ''}
  </g>
  
  <!-- Call-to-Action Button -->
  <g transform="translate(${width * 0.1}, ${height * 0.75})">
    <rect 
      x="0" 
      y="0" 
      width="${Math.min(width * 0.4, 400)}" 
      height="${Math.min(height * 0.08, 80)}" 
      rx="40" 
      fill="${textColor}"
      filter="url(#glow)"
    />
    <text 
      x="${Math.min(width * 0.2, 200)}" 
      y="${Math.min(height * 0.055, 52)}" 
      font-family="Arial, Helvetica, sans-serif" 
      font-size="${Math.min(width * 0.035, 36)}" 
      font-weight="700" 
      fill="${primaryColor}"
      text-anchor="middle"
    >
      Learn More
    </text>
  </g>
  
  <!-- Branding -->
  <text 
    x="${width * 0.5}" 
    y="${height * 0.95}" 
    font-family="Arial, Helvetica, sans-serif" 
    font-size="${Math.min(width * 0.02, 20)}" 
    fill="${textColor}"
    text-anchor="middle"
    opacity="0.6"
  >
    Powered by Creative Code AI
  </text>
</svg>`;

  // Convert SVG to base64 data URL
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

// Helper function to wrap text
function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    if ((currentLine + word).length <= maxCharsPerLine) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  
  if (currentLine) lines.push(currentLine);
  return lines;
}
