import { GoogleGenAI } from '@google/genai';
import type { ColorPalette } from './ai-color-parser';

const AVAILABLE_TEMPLATES = [
  'service-business',      // General service businesses
  'ecommerce',             // Online stores
  'restaurant',            // Food service
  'healthcare',            // Medical/health
  'real-estate',           // Property/real estate
  'professional-services', // Law, consulting, etc.
  'fitness',               // Gym/fitness
  'beauty-salon',          // Beauty/spa
  'education',             // Schools/training
  'non-profit',            // Charities/NGOs
  'modern-minimal',         // Clean, minimal design
  'bold-vibrant',          // Bold, colorful
  'elegant-luxury'         // Sophisticated, premium
];

export async function selectTemplateWithAI(
  genAI: GoogleGenAI,
  input: any,
  colors: ColorPalette
): Promise<string> {
  const prompt = `Select the best website template for this business.

Company: ${input.companyName}
Industry: ${input.industry}
Business Type: ${input.companyType}
Brand Themes: ${input.brandThemes}
Colors: Primary ${colors.primary}, Secondary ${colors.secondary}

Available Templates:
${AVAILABLE_TEMPLATES.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Consider:
- Industry match (restaurant → restaurant template)
- Business type (e-commerce → ecommerce template)
- Brand themes (modern → modern-minimal, bold → bold-vibrant)
- Overall fit for the business

Return ONLY valid JSON:
{
  "template": "template-name",
  "reason": "brief explanation"
}

Do not include markdown or explanations. Only JSON.`;

  try {
    const chat = genAI.chats.create({
      model: 'gemini-1.5-flash',
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are a web design expert. Select the best template for each business.'
      }
    });

    const result = await chat.sendMessage({ message: prompt });
    const text = result.text.trim();
    const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const response = JSON.parse(jsonText);
    
    // Validate template exists
    if (AVAILABLE_TEMPLATES.includes(response.template)) {
      return response.template;
    }
    
    // Fallback based on industry
    return getFallbackTemplate(input.industry, input.companyType);
  } catch (error: any) {
    console.error('Template selection error:', error);
    return getFallbackTemplate(input.industry, input.companyType);
  }
}

function getFallbackTemplate(industry: string, companyType: string): string {
  const industryLower = industry.toLowerCase();
  const typeLower = companyType.toLowerCase();
  
  if (typeLower.includes('ecommerce') || typeLower.includes('online store')) {
    return 'ecommerce';
  }
  if (industryLower.includes('restaurant') || industryLower.includes('food')) {
    return 'restaurant';
  }
  if (industryLower.includes('health') || industryLower.includes('medical')) {
    return 'healthcare';
  }
  if (industryLower.includes('real estate') || industryLower.includes('property')) {
    return 'real-estate';
  }
  if (industryLower.includes('fitness') || industryLower.includes('gym')) {
    return 'fitness';
  }
  if (industryLower.includes('beauty') || industryLower.includes('salon')) {
    return 'beauty-salon';
  }
  if (industryLower.includes('education') || industryLower.includes('school')) {
    return 'education';
  }
  if (industryLower.includes('non-profit') || industryLower.includes('charity')) {
    return 'non-profit';
  }
  
  return 'service-business'; // Default
}

