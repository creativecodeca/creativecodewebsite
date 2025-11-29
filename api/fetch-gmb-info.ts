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
        const prompt = `You need to extract business information from a Google My Business listing.

STEP 1: Visit this EXACT URL: ${actualGmbUrl}
${actualGmbUrl.includes('share.google.com') ? '\nNOTE: This is a Google share link. Follow the redirect to get to the actual Google Maps business page, then extract information from that page.' : ''}

STEP 2: Once you are on the correct business page, extract the following information:
- Company/Business Name (the exact name shown on the GMB listing)
- Phone Number (the phone number displayed on the listing)
- Full Address (complete street address, city, state/province, postal code)
- City (extract from the address)
- Email address (if visible on the listing)
- Industry/Business Category (what type of business it is, e.g., "Landscaping", "Pet Shop", "Restaurant")
- Company Type (choose the best match: Service Location Business, Service Area Business, Online Store, E-commerce, Professional Services, Restaurant/Food Service, Healthcare/Medical, Real Estate, Fitness/Gym, Beauty/Salon, Education/Training, Non-Profit, or Other)
- Brand colors (if mentioned, as hex codes or color names)
- Brand themes (descriptors like Modern, Professional, Trustworthy, etc.)
- Business description (any "About" or description text from the listing)

CRITICAL: 
- You MUST visit the EXACT URL provided above
- Extract information ONLY from the business shown at that URL
- Do NOT search for similar businesses or return information from a different business
- If the URL redirects, follow the redirect and extract from the final destination
- If you cannot access the URL or get the wrong business, return empty strings

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
}

Return ONLY the JSON object, no markdown, no code blocks, no explanations.`;

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

        // Validate the extracted data - check for common issues
        const companyNameLower = cleanedData.companyName.toLowerCase();
        
        // List of known wrong business types that shouldn't appear unless in URL
        const suspiciousBusinesses = [
            { keywords: ['pet shop', 'pet store', 'pets', 'animal'], name: 'pet shop' },
            { keywords: ['restaurant', 'cafe', 'food'], name: 'restaurant' },
            { keywords: ['gym', 'fitness'], name: 'gym' }
        ];

        // Check if extracted business seems wrong (appears to be a different business type)
        const urlLower = gmbUrl.toLowerCase();
        let isLikelyWrong = false;
        
        for (const suspicious of suspiciousBusinesses) {
            const hasSuspiciousKeywords = suspicious.keywords.some(kw => companyNameLower.includes(kw));
            const urlHasSuspiciousKeywords = suspicious.keywords.some(kw => urlLower.includes(kw));
            
            // If we found suspicious keywords in the result but not in the URL, it's likely wrong
            if (hasSuspiciousKeywords && !urlHasSuspiciousKeywords) {
                isLikelyWrong = true;
                console.warn(`Extracted business "${cleanedData.companyName}" appears to be a ${suspicious.name}, but URL doesn't match.`);
                break;
            }
        }

        // If we got minimal data and it seems wrong, return an error
        if (isLikelyWrong && (!cleanedData.address || !cleanedData.phoneNumber)) {
            console.warn('Extracted business information appears incorrect. Returning error.');
            return res.json({
                success: false,
                error: 'The extracted information does not appear to match the GMB URL. Please verify the URL is correct and accessible, or enter the information manually.',
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

