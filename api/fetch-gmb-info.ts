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

        // Use the provided GMB URL
        const actualGmbUrl = gmbUrl.trim();

        // Extract business name from URL if it's a Google Maps share link
        let businessNameHint = '';
        try {
            // Try to extract business name from the URL
            const urlObj = new URL(gmbUrl);
            // Google Maps share links often have the business name in the path or query
            const pathParts = urlObj.pathname.split('/');
            const placeIndex = pathParts.findIndex(p => p === 'place');
            if (placeIndex !== -1 && pathParts[placeIndex + 1]) {
                // Decode the business name from the URL
                businessNameHint = decodeURIComponent(pathParts[placeIndex + 1].replace(/\+/g, ' '));
            }
        } catch (e) {
            // If URL parsing fails, continue without hint
        }

        // Create a prompt to extract GMB information
        const prompt = `Extract business information from this SPECIFIC Google My Business URL: ${actualGmbUrl}

CRITICAL INSTRUCTIONS:
1. You MUST visit the EXACT URL above - do NOT search for businesses or use general web search
2. If this is a share.google.com link, follow the redirect to the actual Google Maps page
3. Extract information ONLY from the business displayed at that specific URL
4. If you see a different business than what the URL should show, return empty strings
5. Do NOT guess or use information from other businesses

VERIFICATION STEP:
Before extracting, verify you are on the correct business page. The URL should match the business you're viewing.

Extract the following information from the GMB listing at this URL:
- Company/Business Name (exact name as shown on the page)
- Phone Number (if displayed)
- Full Address (street, city, state/province, postal code)
- City (extracted from address)
- Email address (if visible)
- Industry/Business Category (e.g., Landscaping, Tree Service, etc.)
- Company Type (Service Location Business, Service Area Business, Online Store, E-commerce, Professional Services, Restaurant/Food Service, Healthcare/Medical, Real Estate, Fitness/Gym, Beauty/Salon, Education/Training, Non-Profit, or Other)
- Brand colors (if mentioned)
- Brand themes (if mentioned)
- Business description/about (if available)

IMPORTANT: 
- If you cannot access the URL or get information for a different business, return ALL empty strings
- Do NOT return information for "B&H tree service" or any other business unless it matches the URL
- Only return data you can confirm is from THIS specific URL

Return ONLY this JSON (use empty strings if data unavailable or wrong business):
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
}

No markdown, no code blocks, no explanations - just the JSON object.`;

        const chat = genAI.chats.create({
            model: model,
            config: {
                systemInstruction: `You are a data extraction assistant. Your task is to extract business information from a SPECIFIC Google My Business URL. 
                
CRITICAL: You must visit the EXACT URL provided and extract information ONLY from that specific business listing. 
Do NOT search for similar businesses or return information from a different business.
If you cannot access the exact URL or the business name doesn't match, return empty strings.
Verify the business name matches the URL context before returning data.
Return only valid JSON with the exact structure requested.`
            }
        });

        let result;
        let text;
        try {
            result = await chat.sendMessage({ message: prompt });
            text = result.text;
        } catch (geminiError: any) {
            console.error('Gemini API error:', geminiError);
            throw new Error(`AI service error: ${geminiError.message || 'Failed to process request'}`);
        }

        if (!text || text.trim().length === 0) {
            throw new Error('AI service returned empty response');
        }

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
            console.error('Failed to parse AI response:', text.substring(0, 500), parseError);
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

        // Validate the extracted data - check for known wrong businesses
        const companyNameLower = cleanedData.companyName.toLowerCase();
        const urlLower = gmbUrl.toLowerCase();
        
        // List of known wrong businesses that have been extracted incorrectly
        const knownWrongBusinesses = [
            'b&h tree service',
            'b and h tree service',
            'bh tree service',
            'pet shop',
            'pet store'
        ];
        
        // Check if extracted business name matches any known wrong businesses
        const isKnownWrongBusiness = knownWrongBusinesses.some(wrongBusiness => 
            companyNameLower.includes(wrongBusiness.toLowerCase())
        );
        
        // Check if URL contains keywords that should match the business
        // For Faro Landscaping, URL should contain "faro" or "landscaping"
        const urlKeywords = ['faro', 'landscaping'];
        const urlHasRelevantKeywords = urlKeywords.some(keyword => urlLower.includes(keyword));
        const extractedHasRelevantKeywords = urlKeywords.some(keyword => 
            companyNameLower.includes(keyword) || (cleanedData.industry && cleanedData.industry.toLowerCase().includes(keyword))
        );
        
        // If we got a known wrong business, or URL has keywords but extracted data doesn't match, reject it
        if (isKnownWrongBusiness || (urlHasRelevantKeywords && !extractedHasRelevantKeywords && cleanedData.companyName)) {
            console.warn(`Extracted business "${cleanedData.companyName}" does not match URL context. URL: ${gmbUrl}`);
            return res.json({
                success: false,
                error: 'The extracted business information does not match the GMB URL. This may be due to the URL being inaccessible or redirecting to a different business. Please verify the URL is correct and try again, or enter the information manually.',
                data: {
                    companyName: '',
                    phoneNumber: '',
                    address: '',
                    city: '',
                    email: '',
                    industry: '',
                    companyType: '',
                    colors: '',
                    brandThemes: '',
                    extraDetailedInfo: ''
                }
            });
        }

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
        console.error('Error stack:', error.stack);
        console.error('Error details:', {
            message: error.message,
            name: error.name,
            gmbUrl: req.body?.gmbUrl
        });
        
        // Return more specific error messages
        const errorMessage = error.message || 'Unknown error occurred';
        const isGeminiError = errorMessage.includes('AI service') || errorMessage.includes('Gemini');
        const isNetworkError = errorMessage.includes('fetch') || errorMessage.includes('network');
        
        return res.status(500).json({
            error: isGeminiError 
                ? `AI service error: ${errorMessage}. Please check your API key and try again.`
                : isNetworkError
                ? `Network error: ${errorMessage}. Please check your connection and try again.`
                : `Failed to fetch GMB information: ${errorMessage}. Please verify the URL is correct and try again, or enter the information manually.`,
            code: 'FETCH_FAILED',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
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

