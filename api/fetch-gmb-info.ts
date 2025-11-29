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

        // Use the provided GMB URL
        const actualGmbUrl = gmbUrl.trim();

        // Step 1: Actually fetch the webpage content first
        console.log('Fetching webpage content from:', actualGmbUrl);
        let webpageContent = '';
        let finalUrl = actualGmbUrl;
        
        try {
            // Follow redirects to get the final URL
            const response = await fetch(actualGmbUrl, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1'
                },
                redirect: 'follow'
            });

            finalUrl = response.url; // Get the final URL after redirects
            webpageContent = await response.text();
            console.log('Fetched webpage, length:', webpageContent.length, 'Final URL:', finalUrl);
            
            // Debug: Check if page has business-related content
            const hasBusinessName = /business|company|name|title/i.test(webpageContent.substring(0, 50000));
            const hasAddress = /address|location|street|city|state/i.test(webpageContent.substring(0, 50000));
            const hasPhone = /phone|tel:|call|contact/i.test(webpageContent.substring(0, 50000));
            console.log('Content check - hasBusinessName:', hasBusinessName, 'hasAddress:', hasAddress, 'hasPhone:', hasPhone);
        } catch (fetchError: any) {
            console.error('Error fetching webpage:', fetchError);
            throw new Error(`Failed to fetch webpage: ${fetchError.message}`);
        }

        if (!webpageContent || webpageContent.length < 100) {
            throw new Error('Webpage content is too short or empty. The URL may be inaccessible.');
        }

        // Try to extract structured data from Google Maps page
        // Google Maps often has JSON-LD structured data
        let structuredData: any = {};
        try {
            // Look for JSON-LD structured data
            const jsonLdMatches = webpageContent.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
            if (jsonLdMatches) {
                for (const match of jsonLdMatches) {
                    try {
                        const jsonContent = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
                        const parsed = JSON.parse(jsonContent);
                        if (parsed['@type'] === 'LocalBusiness' || parsed['@type'] === 'Organization') {
                            structuredData = { ...structuredData, ...parsed };
                        }
                    } catch (e) {
                        // Continue if JSON parse fails
                    }
                }
            }

            // Look for data attributes in the HTML
            const nameMatch = webpageContent.match(/<h1[^>]*>([^<]+)<\/h1>/i) || 
                             webpageContent.match(/data-name=["']([^"']+)["']/i) ||
                             webpageContent.match(/aria-label=["']([^"']+)["']/i);
            if (nameMatch && !structuredData.name) {
                structuredData.name = nameMatch[1].trim();
            }

            // Look for phone
            const phoneMatch = webpageContent.match(/data-phone-number=["']([^"']+)["']/i) ||
                              webpageContent.match(/tel:([+\d\s\-()]+)/i);
            if (phoneMatch && !structuredData.telephone) {
                structuredData.telephone = phoneMatch[1].trim();
            }

            // Look for address
            const addressMatch = webpageContent.match(/data-address=["']([^"']+)["']/i) ||
                                webpageContent.match(/itemprop=["']address["'][^>]*>([^<]+)</i);
            if (addressMatch && !structuredData.address) {
                structuredData.address = addressMatch[1].trim();
            }

            console.log('Extracted structured data:', Object.keys(structuredData));
        } catch (parseError) {
            console.warn('Error parsing structured data:', parseError);
        }

        // Initialize Gemini
        const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        const model = 'gemini-2.5-flash';

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

        // Extract relevant content from HTML (reduce size for Gemini)
        // Keep important data attributes and text content
        let textContent = webpageContent
            .replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '') // Remove JSON-LD (already extracted)
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ') // Remove other scripts but keep space
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ') // Remove styles
            .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, ' '); // Remove noscript

        // Extract visible text while preserving some structure
        const visibleText = textContent
            .replace(/<[^>]+>/g, ' ') // Remove HTML tags
            .replace(/\s+/g, ' ') // Normalize whitespace
            .substring(0, 30000); // Limit to 30k chars for Gemini

        // Create a prompt to extract GMB information from the actual webpage content
        const prompt = `Extract business information from this Google My Business webpage. The URL is: ${finalUrl}

${Object.keys(structuredData).length > 0 ? `STRUCTURED DATA FOUND:
${JSON.stringify(structuredData, null, 2)}

` : ''}WEBPAGE TEXT CONTENT:
${visibleText}

INSTRUCTIONS:
1. Use the structured data above if available, otherwise parse the text content
2. Extract ONLY information that is actually present
3. Look for business name, phone, address, and other details in the content
4. For Google Maps pages, business info is usually near the top

Extract these fields:
- companyName: Business name (often in h1, title, or data-name attribute)
- phoneNumber: Phone number (look for tel: links or phone patterns)
- address: Complete address (street, city, state/province, postal code)
- city: Extract city from address
- email: Email if visible
- industry: Business category/type visible on page (e.g., "Landscaping", "Tree Service")
- companyType: Best match: Service Location Business, Service Area Business, Online Store, E-commerce, Professional Services, Restaurant/Food Service, Healthcare/Medical, Real Estate, Fitness/Gym, Beauty/Salon, Education/Training, Non-Profit, or Other
- colors: Brand colors if mentioned
- brandThemes: Brand themes if mentioned  
- extraDetailedInfo: Business description/about text if present

CRITICAL: 
- Extract ONLY what's in the content above
- If a field is not found, use empty string
- Be thorough - Google Maps pages usually have this information visible

Return this JSON:
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
                systemInstruction: `You are a web scraping assistant. Your ONLY job is to:
1. Access the EXACT URL provided by the user
2. Extract the business information that is VISIBLE on that specific page
3. Return ONLY what you see on that page - nothing else

CRITICAL RULES:
- Do NOT use web search
- Do NOT guess or infer information
- Do NOT return information from other businesses
- If you cannot access the URL, return all empty strings
- If the page shows a different business than expected, return all empty strings
- Extract ONLY the text/content that is actually displayed on the page
- Return data in the exact JSON format requested`
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

        // If we have structured data but Gemini didn't extract it, use structured data as fallback
        if ((!cleanedData.companyName || !cleanedData.address) && Object.keys(structuredData).length > 0) {
            console.log('Using structured data as fallback');
            if (structuredData.name && !cleanedData.companyName) {
                cleanedData.companyName = structuredData.name;
            }
            if (structuredData.telephone && !cleanedData.phoneNumber) {
                cleanedData.phoneNumber = structuredData.telephone;
            }
            if (structuredData.address && !cleanedData.address) {
                const addr = typeof structuredData.address === 'string' 
                    ? structuredData.address 
                    : structuredData.address.streetAddress + ', ' + structuredData.address.addressLocality + ', ' + structuredData.address.addressRegion;
                cleanedData.address = addr;
                if (!cleanedData.city && structuredData.address.addressLocality) {
                    cleanedData.city = structuredData.address.addressLocality;
                }
            }
        }

        // Log what was extracted for debugging
        console.log('Extracted GMB data:', {
            companyName: cleanedData.companyName,
            url: gmbUrl,
            hasData: !!cleanedData.companyName || !!cleanedData.address || !!cleanedData.phoneNumber,
            structuredDataKeys: Object.keys(structuredData)
        });

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

