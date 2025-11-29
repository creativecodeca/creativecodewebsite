import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { gmbUrl } = req.body;

        if (!gmbUrl || typeof gmbUrl !== 'string') {
            return res.status(400).json({ error: 'GMB URL is required' });
        }

        if (!GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY not found');
            return res.status(500).json({ 
                error: 'AI service is temporarily unavailable. Please contact support.',
                code: 'SERVICE_UNAVAILABLE'
            });
        }

        // Initialize Gemini
        const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        const model = 'gemini-2.5-flash';

        // Create a prompt to extract GMB information
        const prompt = `Extract business information from this Google My Business listing URL: ${gmbUrl}

Use web search to find and extract the following information from the GMB page:
- Company/Business Name
- Phone Number  
- Full Address (street address, city, state/province, postal code)
- City (extracted from address)
- Email address (if available)
- Industry/Business Category
- Company Type (choose from: Service Location Business, Service Area Business, Online Store, E-commerce, Professional Services, Restaurant/Food Service, Healthcare/Medical, Real Estate, Fitness/Gym, Beauty/Salon, Education/Training, Non-Profit, or Other)
- Brand colors (if mentioned, format as hex codes or color names)
- Brand themes/descriptors (e.g., Modern, Professional, Trustworthy, Innovative, etc.)
- Business description/about information

IMPORTANT: 
- Search the web for this GMB URL to get the actual business information
- Extract real, accurate data from the Google My Business listing
- If information is not available, use an empty string
- For companyType, match it to one of the predefined types listed above
- Return ONLY valid JSON, no markdown, no explanations

Return the information in this exact JSON format:
{
  "companyName": "",
  "phoneNumber": "",
  "address": "",
  "city": "",
  "email": "",
  "industry": "",
  "companyType": "",
  "colors": "",
  "brandThemes": "",
  "extraDetailedInfo": ""
}`;

        const chat = genAI.chats.create({
            model: model,
            config: {
                systemInstruction: 'You are a data extraction assistant. Use web search to find and extract business information from Google My Business listings. Return only valid JSON with the exact structure requested. Be accurate and extract real data from the GMB listing.'
            }
        });

        const result = await chat.sendMessage({ message: prompt });
        const text = result.text;

        // Parse the JSON response
        let extractedData;
        try {
            // Try to extract JSON from the response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                extractedData = JSON.parse(jsonMatch[0]);
            } else {
                extractedData = JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
            }
        } catch (parseError) {
            console.error('Failed to parse AI response:', text, parseError);
            // Try to extract information manually from the text
            extractedData = {
                companyName: extractField(text, 'companyName', 'company name', 'business name'),
                phoneNumber: extractField(text, 'phoneNumber', 'phone', 'phone number'),
                address: extractField(text, 'address', 'address'),
                city: extractField(text, 'city', 'city'),
                email: extractField(text, 'email', 'email'),
                industry: extractField(text, 'industry', 'industry', 'category'),
                companyType: '',
                colors: '',
                brandThemes: '',
                extraDetailedInfo: extractField(text, 'extraDetailedInfo', 'description', 'about')
            };
        }

        // Clean and validate the extracted data
        const cleanedData = {
            companyName: (extractedData.companyName || '').trim(),
            phoneNumber: (extractedData.phoneNumber || '').trim(),
            address: (extractedData.address || '').trim(),
            city: (extractedData.city || '').trim(),
            email: (extractedData.email || '').trim(),
            industry: (extractedData.industry || '').trim(),
            companyType: (extractedData.companyType || '').trim(),
            colors: (extractedData.colors || '').trim(),
            brandThemes: (extractedData.brandThemes || '').trim(),
            extraDetailedInfo: (extractedData.extraDetailedInfo || '').trim()
        };

        // Extract city from address if city is empty but address exists
        if (!cleanedData.city && cleanedData.address) {
            const addressParts = cleanedData.address.split(',');
            if (addressParts.length > 1) {
                cleanedData.city = addressParts[addressParts.length - 2]?.trim() || '';
            }
        }

        return res.json({
            success: true,
            data: cleanedData
        });

    } catch (error: any) {
        console.error('Error fetching GMB info:', error);
        return res.status(500).json({
            error: 'Failed to fetch GMB information. Please try again or enter the information manually.',
            code: 'FETCH_FAILED'
        });
    }
}

// Helper function to extract field values from text if JSON parsing fails
function extractField(text: string, jsonKey: string, ...searchTerms: string[]): string {
    // First try to find it in JSON format
    const jsonRegex = new RegExp(`"${jsonKey}"\\s*:\\s*"([^"]+)"`, 'i');
    const jsonMatch = text.match(jsonRegex);
    if (jsonMatch) {
        return jsonMatch[1];
    }

    // Then try to find it by search terms
    for (const term of searchTerms) {
        const regex = new RegExp(`${term}[\\s:]+([^\\n,]+)`, 'i');
        const match = text.match(regex);
        if (match) {
            return match[1].trim();
        }
    }

    return '';
}

