import { GoogleGenAI } from '@google/genai';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
}

export async function parseColorsWithAI(genAI: GoogleGenAI, colorString: string): Promise<ColorPalette> {
  const prompt = `You are a color expert. Convert this color description to valid CSS hex color codes.

Input: "${colorString}"

Rules:
- Extract or infer 3 colors: primary, secondary, accent
- Primary should be the main brand color
- Secondary should complement the primary
- Accent should be a highlight color
- All colors must be valid hex codes (e.g., #FF5733)
- If the input contains hex codes, use them
- If the input is descriptive (e.g., "vibrant red"), convert to appropriate hex
- Ensure colors work well together

Return ONLY valid JSON in this exact format:
{
  "primary": "#hexcode",
  "secondary": "#hexcode",
  "accent": "#hexcode"
}

Do not include any explanations, markdown, or other text. Only the JSON object.`;

  try {
    const chat = genAI.chats.create({
      model: 'gemini-1.5-flash',
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are a color expert. Always return valid JSON with hex color codes.'
      }
    });

    const result = await chat.sendMessage({ message: prompt });
    const text = result.text.trim();
    
    // Clean up any markdown code blocks
    const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const colors = JSON.parse(jsonText) as ColorPalette;
    
    // Validate hex codes
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    if (!hexRegex.test(colors.primary) || !hexRegex.test(colors.secondary) || !hexRegex.test(colors.accent)) {
      throw new Error('Invalid hex color codes returned');
    }
    
    return colors;
  } catch (error: any) {
    console.error('Color parsing error:', error);
    // Fallback to default colors
    return {
      primary: '#D32F2F',
      secondary: '#FFC107',
      accent: '#263238'
    };
  }
}

