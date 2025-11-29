import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

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
        
        // Log API key status
        console.log('GOOGLE_PLACES_API_KEY available:', !!GOOGLE_PLACES_API_KEY);

        // Try to extract Place ID from URL for Google Places API
        let placeId = '';
        let resolvedMapsUrl = '';
        let finalUrlForPlaceId = actualGmbUrl; // Initialize outside try block for scope
        
        try {
            // First, resolve share links to get the actual Google Maps URL
            finalUrlForPlaceId = actualGmbUrl;
            
            // Check if it's a share link
            const isShareLink = actualGmbUrl.includes('share.google') ||  // Includes share.google.com and share.google
                               actualGmbUrl.includes('goo.gl') || 
                               actualGmbUrl.includes('maps.app.goo.gl') ||
                               actualGmbUrl.includes('shorturl.at') ||
                               (actualGmbUrl.includes('maps.google.com') && actualGmbUrl.includes('/url?'));
            
            if (isShareLink) {
                console.log('Detected share link, resolving to final URL...');
                try {
                    // Helper function to recursively follow redirects
                    const followRedirects = async (url: string, maxRedirects = 10, visited = new Set<string>()): Promise<string> => {
                        if (visited.has(url) || maxRedirects <= 0) {
                            return url;
                        }
                        visited.add(url);
                        
                        try {
                            const response = await fetch(url, {
                                method: 'GET',
                                redirect: 'manual',
                                headers: {
                                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                                    'Accept-Language': 'en-US,en;q=0.9'
                                }
                            });
                            
                            // If redirect, follow it
                            if (response.status >= 300 && response.status < 400) {
                                const location = response.headers.get('location');
                                if (location) {
                                    const nextUrl = location.startsWith('http') ? location : `https://${location}`;
                                    console.log(`Following redirect: ${url} -> ${nextUrl}`);
                                    return followRedirects(nextUrl, maxRedirects - 1, visited);
                                }
                            }
                            
                            // If we got a page, check if it's a redirect page and extract URL from body
                            const isRedirectPage = url.includes('share.google') ||  // Includes share.google.com and share.google
                                                  url.includes('accounts.google.com') || 
                                                  url.includes('google.com/url') ||
                                                  url.includes('google.com/search') ||
                                                  !url.includes('google.com/maps/place');
                            
                            if (isRedirectPage) {
                                try {
                                    const body = await response.text();
                                    // Look for Maps URL in the page
                                    const mapsUrlPatterns = [
                                        /https?:\/\/[^"'\s<>]*google\.com\/maps\/place\/[^"'\s<>]+/,
                                        /https?:\/\/[^"'\s<>]*maps\.google\.com\/maps\/[^"'\s<>]+/,
                                        /window\.location\.href\s*=\s*["']([^"']*google\.com\/maps[^"']+)["']/,
                                        /href\s*=\s*["']([^"']*google\.com\/maps[^"']+)["']/,
                                        /url\s*=\s*["']([^"']*google\.com\/maps[^"']+)["']/,
                                        /"url":\s*"([^"]*google\.com\/maps[^"]+)"/,
                                        /location\.href\s*=\s*["']([^"']*google\.com\/maps[^"']+)["']/
                                    ];
                                    
                                    for (const pattern of mapsUrlPatterns) {
                                        const match = body.match(pattern);
                                        if (match) {
                                            const foundUrl = (match[1] || match[0]).replace(/\\u002F/g, '/').replace(/\\\//g, '/');
                                            if (foundUrl.includes('google.com/maps')) {
                                                console.log('Found Maps URL in redirect page:', foundUrl);
                                                return followRedirects(foundUrl, maxRedirects - 1, visited);
                                            }
                                        }
                                    }
                                } catch (bodyError) {
                                    console.warn('Error reading redirect page body:', bodyError);
                                }
                            }
                            
                            // If we reached a Maps URL, return it
                            if (url.includes('google.com/maps/place')) {
                                return url;
                            }
                            
                            return url;
                        } catch (fetchError) {
                            console.warn('Error following redirect:', fetchError);
                            return url;
                        }
                    };
                    
                    // Use automatic redirect following as primary method
                    try {
                        const autoResponse = await fetch(actualGmbUrl, {
                            method: 'GET',
                            redirect: 'follow',
                            headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                                'Accept-Language': 'en-US,en;q=0.9'
                            }
                        });
                        
                        finalUrlForPlaceId = autoResponse.url;
                        resolvedMapsUrl = finalUrlForPlaceId;
                        console.log('Auto-followed redirects to:', finalUrlForPlaceId);
                        
                        // If still not a Maps URL, try manual following
                        if (!finalUrlForPlaceId.includes('google.com/maps/place')) {
                            console.log('Not a Maps URL yet, trying manual redirect following...');
                            finalUrlForPlaceId = await followRedirects(actualGmbUrl);
                            resolvedMapsUrl = finalUrlForPlaceId;
                            console.log('Manual redirect following resulted in:', finalUrlForPlaceId);
                        }
                    } catch (autoError) {
                        // Fallback to manual redirect following
                        console.log('Auto-follow failed, using manual redirect following...');
                        finalUrlForPlaceId = await followRedirects(actualGmbUrl);
                        resolvedMapsUrl = finalUrlForPlaceId;
                        console.log('Manual redirect following resulted in:', finalUrlForPlaceId);
                    }
                } catch (e) {
                    console.warn('Failed to resolve share link:', e);
                    // Continue with original URL - HTML scraping will still work
                }
            }

            // Extract Place ID from URL - multiple possible formats:
            // Format 1: data=!4m2!3m1!1sPLACE_ID (most common)
            // Format 2: /place/PLACE_NAME/@lat,lng,zoom/data=!4m2!3m1!1sPLACE_ID
            // Format 3: /maps/place/PLACE_NAME/@lat,lng/data=!4m2!3m1!1sPLACE_ID
            // Format 4: Place ID in query parameter
            // Format 5: /place/PLACE_NAME/@lat,lng,zoom/!1sPLACE_ID
            // Format 6: /maps/place/PLACE_NAME/@lat,lng/!1sPLACE_ID
            
            // Try the most common format first: !1sPLACE_ID (Place IDs are typically 27+ characters)
            const placeIdPatterns = [
                /[!&]1s([A-Za-z0-9_-]{27,})/,  // Format 1: !1sPLACE_ID
                /\/place\/[^/]+\/@[^/]+\/data=!4m[^!]*!3m[^!]*!1s([A-Za-z0-9_-]{27,})/,  // Format 2: Full path with data
                /\/maps\/place\/[^/]+\/@[^/]+\/data=!4m[^!]*!3m[^!]*!1s([A-Za-z0-9_-]{27,})/,  // Format 3: Maps path
                /[?&]place_id=([A-Za-z0-9_-]+)/,  // Format 4: Query parameter
                /\/place\/[^/]+\/@[^/]+\/!1s([A-Za-z0-9_-]{27,})/,  // Format 5: Path with !1s
                /\/maps\/place\/[^/]+\/@[^/]+\/!1s([A-Za-z0-9_-]{27,})/,  // Format 6: Maps path with !1s
                /\/place\/[^/]+\/@[^/]+\/([A-Za-z0-9_-]{27,})/,  // Format 7: Direct after coordinates
                /data=!4m[^!]*!3m[^!]*!1s([A-Za-z0-9_-]{27,})/,  // Format 8: Just data parameter
            ];
            
            for (let i = 0; i < placeIdPatterns.length; i++) {
                const match = finalUrlForPlaceId.match(placeIdPatterns[i]);
                if (match && match[1]) {
                    placeId = match[1];
                    console.log(`Extracted Place ID (format ${i + 1}):`, placeId);
                    break;
                }
            }
            
            // If still no Place ID and we have a resolved Maps URL, try fetching the page to find it
            if (!placeId && resolvedMapsUrl && resolvedMapsUrl.includes('google.com/maps')) {
                console.log('Place ID not in URL, trying to extract from page content...');
                try {
                    const pageResponse = await fetch(resolvedMapsUrl, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                        }
                    });
                    const pageContent = await pageResponse.text();
                    
                    // Look for Place ID in the page content (often in JavaScript variables or data attributes)
                    const contentPlaceIdPatterns = [
                        /["']place_id["']\s*:\s*["']([A-Za-z0-9_-]{27,})["']/,
                        /place_id=([A-Za-z0-9_-]{27,})/,
                        /!1s([A-Za-z0-9_-]{27,})/,
                        /data-place-id=["']([A-Za-z0-9_-]{27,})["']/,
                        /placeId["']?\s*[:=]\s*["']([A-Za-z0-9_-]{27,})["']/,
                        /"cid":\s*"([A-Za-z0-9_-]{27,})"/,  // Sometimes called cid
                    ];
                    
                    for (const pattern of contentPlaceIdPatterns) {
                        const match = pageContent.match(pattern);
                        if (match && match[1]) {
                            placeId = match[1];
                            console.log('Extracted Place ID from page content:', placeId);
                            break;
                        }
                    }
                } catch (e) {
                    console.warn('Failed to extract Place ID from page content:', e);
                }
            }
        } catch (e) {
            console.warn('Place ID extraction failed:', e);
            // Continue with HTML scraping if Place ID extraction fails
        }

        // Log Place ID extraction result
        console.log('=== PLACES API DIAGNOSTICS ===');
        console.log('Place ID extracted:', placeId || 'NOT FOUND');
        console.log('GOOGLE_PLACES_API_KEY set:', !!GOOGLE_PLACES_API_KEY);
        console.log('Resolved Maps URL:', resolvedMapsUrl || 'N/A');
        console.log('=============================');
        
        // If we have Place ID and Google Places API key, use that first
        if (placeId && GOOGLE_PLACES_API_KEY) {
            console.log('Using Google Places API (New) with Place ID:', placeId);
            try {
                // Use the new Places API (New) endpoint
                const placesResponse = await fetch(
                    `https://places.googleapis.com/v1/places/${placeId}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
                            'X-Goog-FieldMask': 'id,displayName,formattedAddress,nationalPhoneNumber,websiteUri,types,addressComponents,editorialSummary'
                        }
                    }
                );
                
                if (placesResponse.ok) {
                    const placesData = await placesResponse.json();
                    
                    if (placesData) {
                        // Extract city from addressComponents
                        let city = '';
                        if (placesData.addressComponents) {
                            const cityComponent = placesData.addressComponents.find((comp: any) => 
                                comp.types && (comp.types.includes('locality') || comp.types.includes('administrative_area_level_2'))
                            );
                            if (cityComponent) {
                                city = cityComponent.longText || cityComponent.shortText || '';
                            }
                        }

                        // Determine industry from types
                        let industry = '';
                        if (placesData.types && placesData.types.length > 0) {
                            // Filter out generic types and get the most specific one
                            const businessTypes = placesData.types.filter((t: string) => 
                                !t.startsWith('establishment') && 
                                !t.startsWith('point_of_interest') &&
                                t !== 'geocode' &&
                                t !== 'premise'
                            );
                            if (businessTypes.length > 0) {
                                // Use the first specific type and format it nicely
                                industry = businessTypes[0]
                                    .replace(/_/g, ' ')
                                    .split(' ')
                                    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ');
                            }
                        }

                        // Map business types to company types
                        let companyType = '';
                        if (placesData.types) {
                            const types = placesData.types.map((t: string) => t.toLowerCase());
                            if (types.some(t => t.includes('restaurant') || t.includes('food'))) {
                                companyType = 'Restaurant/Food Service';
                            } else if (types.some(t => t.includes('store') || t.includes('shop'))) {
                                companyType = 'Online Store';
                            } else if (types.some(t => t.includes('health') || t.includes('medical'))) {
                                companyType = 'Healthcare/Medical';
                            } else if (types.some(t => t.includes('real_estate') || t.includes('real estate'))) {
                                companyType = 'Real Estate';
                            } else if (types.some(t => t.includes('gym') || t.includes('fitness'))) {
                                companyType = 'Fitness/Gym';
                            } else if (types.some(t => t.includes('beauty') || t.includes('salon'))) {
                                companyType = 'Beauty/Salon';
                            } else if (types.some(t => t.includes('school') || t.includes('education'))) {
                                companyType = 'Education/Training';
                            } else {
                                companyType = 'Service Location Business';
                            }
                        }

                        return res.json({
                            success: true,
                            data: {
                                companyName: placesData.displayName?.text || '',
                                phoneNumber: placesData.nationalPhoneNumber || '',
                                address: placesData.formattedAddress || '',
                                city: city,
                                email: '', // Places API doesn't provide email
                                industry: industry,
                                companyType: companyType,
                                colors: '',
                                brandThemes: '',
                                extraDetailedInfo: placesData.editorialSummary?.text || (placesData.websiteUri ? `Website: ${placesData.websiteUri}` : '')
                            }
                        });
                    }
                } else {
                    const errorText = await placesResponse.text();
                    console.error('Google Places API (New) error response:', placesResponse.status, errorText);
                    // Return error instead of falling through
                    return res.json({
                        success: false,
                        error: `Google Places API error: ${placesResponse.status}. ${errorText.substring(0, 200)}`,
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
            } catch (placesError: any) {
                console.error('Google Places API (New) error:', placesError);
                // Return error instead of falling through
                return res.json({
                    success: false,
                    error: `Google Places API request failed: ${placesError.message || 'Unknown error'}. Please check your API key and Place ID extraction.`,
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
        } else if (GOOGLE_PLACES_API_KEY && !placeId) {
            // If we have API key but no Place ID, try Text Search as fallback
            console.log('Place ID not found, attempting Places API Text Search');
            
            // Try to extract business name from URL for text search
            let searchText = '';
            let kgmid = '';
            
            try {
                // First, check if we resolved to a search page and extract from query params
                if (resolvedMapsUrl && resolvedMapsUrl.includes('google.com/search')) {
                    const searchUrl = new URL(resolvedMapsUrl);
                    // Extract from q parameter (search query)
                    const qParam = searchUrl.searchParams.get('q');
                    if (qParam) {
                        searchText = decodeURIComponent(qParam);
                        console.log('Extracted business name from search query:', searchText);
                    }
                    // Also try to get kgmid (Knowledge Graph ID)
                    const kgmidParam = searchUrl.searchParams.get('kgmid');
                    if (kgmidParam) {
                        kgmid = kgmidParam;
                        console.log('Found Knowledge Graph ID:', kgmid);
                    }
                } else {
                    // Try to get business name from path (for Maps URLs)
                    const urlObj = new URL(actualGmbUrl);
                    const pathParts = urlObj.pathname.split('/');
                    const placeIndex = pathParts.findIndex(p => p === 'place');
                    if (placeIndex !== -1 && pathParts[placeIndex + 1]) {
                        searchText = decodeURIComponent(pathParts[placeIndex + 1].replace(/\+/g, ' '));
                    }
                }
            } catch (e) {
                console.warn('Error extracting search text:', e);
            }
            
            if (searchText) {
                try {
                    // Use Places API Text Search
                    console.log('Calling Places API Text Search with:', searchText);
                    const textSearchResponse = await fetch(
                        `https://places.googleapis.com/v1/places:searchText`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
                                'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.types,places.addressComponents,places.editorialSummary'
                            },
                            body: JSON.stringify({
                                textQuery: searchText,
                                maxResultCount: 5 // Get top 5 results to find the best match
                            })
                        }
                    );
                    
                    console.log('Text Search API response status:', textSearchResponse.status);
                    
                    if (textSearchResponse.ok) {
                        const searchData = await textSearchResponse.json();
                        console.log('Text Search returned', searchData.places?.length || 0, 'results');
                        
                        if (searchData.places && searchData.places.length > 0) {
                            // Use the first result (most relevant)
                            const place = searchData.places[0];
                            console.log('Using place:', place.displayName?.text);
                            
                            // Extract city
                            let city = '';
                            if (place.addressComponents) {
                                const cityComponent = place.addressComponents.find((comp: any) => 
                                    comp.types && (comp.types.includes('locality') || comp.types.includes('administrative_area_level_2'))
                                );
                                if (cityComponent) {
                                    city = cityComponent.longText || cityComponent.shortText || '';
                                }
                            }
                            
                            // Determine industry and company type
                            let industry = '';
                            let companyType = '';
                            if (place.types && place.types.length > 0) {
                                const businessTypes = place.types.filter((t: string) => 
                                    !t.startsWith('establishment') && 
                                    !t.startsWith('point_of_interest') &&
                                    t !== 'geocode' &&
                                    t !== 'premise'
                                );
                                if (businessTypes.length > 0) {
                                    industry = businessTypes[0]
                                        .replace(/_/g, ' ')
                                        .split(' ')
                                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ');
                                    
                                    const types = place.types.map((t: string) => t.toLowerCase());
                                    if (types.some(t => t.includes('restaurant') || t.includes('food'))) {
                                        companyType = 'Restaurant/Food Service';
                                    } else if (types.some(t => t.includes('store') || t.includes('shop'))) {
                                        companyType = 'Online Store';
                                    } else if (types.some(t => t.includes('health') || t.includes('medical'))) {
                                        companyType = 'Healthcare/Medical';
                                    } else if (types.some(t => t.includes('real_estate') || t.includes('real estate'))) {
                                        companyType = 'Real Estate';
                                    } else if (types.some(t => t.includes('gym') || t.includes('fitness'))) {
                                        companyType = 'Fitness/Gym';
                                    } else if (types.some(t => t.includes('beauty') || t.includes('salon'))) {
                                        companyType = 'Beauty/Salon';
                                    } else if (types.some(t => t.includes('school') || t.includes('education'))) {
                                        companyType = 'Education/Training';
                                    } else {
                                        companyType = 'Service Location Business';
                                    }
                                }
                            }
                            
                            return res.json({
                                success: true,
                                data: {
                                    companyName: place.displayName?.text || '',
                                    phoneNumber: place.nationalPhoneNumber || '',
                                    address: place.formattedAddress || '',
                                    city: city,
                                    email: '',
                                    industry: industry,
                                    companyType: companyType,
                                    colors: '',
                                    brandThemes: '',
                                    extraDetailedInfo: place.editorialSummary?.text || (place.websiteUri ? `Website: ${place.websiteUri}` : '')
                                }
                            });
                        } else {
                            console.log('Text Search returned no results');
                        }
                    } else {
                        const errorText = await textSearchResponse.text();
                        console.error('Text Search API error:', textSearchResponse.status, errorText);
                    }
                } catch (textSearchError: any) {
                    console.error('Places API Text Search error:', textSearchError);
                    // Fall through to HTML scraping
                }
            } else {
                console.log('No search text extracted for Text Search API');
            }
        } else {
            // Log why API isn't being used
            if (!placeId) {
                console.log('Places API not used: Place ID not found in URL');
            }
            if (!GOOGLE_PLACES_API_KEY) {
                console.log('Places API not used: GOOGLE_PLACES_API_KEY not set in environment variables');
            }
        }

        // Step 1: Actually fetch the webpage content first
        // Use the resolved URL if we have one (from share link resolution), otherwise use original
        const urlToFetch = resolvedMapsUrl || finalUrlForPlaceId || actualGmbUrl;
        console.log('Fetching webpage content from:', urlToFetch);
        let webpageContent = '';
        let finalUrl = urlToFetch;
        
        try {
            // Follow redirects to get the final URL (in case we still need to resolve)
            const response = await fetch(urlToFetch, {
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
        // Google Maps embeds data in various ways
        let structuredData: any = {};
        let extractedInfo: any = {};
        
        try {
            // Method 1: Look for JSON-LD structured data
            const jsonLdMatches = webpageContent.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
            if (jsonLdMatches) {
                for (const match of jsonLdMatches) {
                    try {
                        const jsonContent = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '').trim();
                        const parsed = JSON.parse(jsonContent);
                        if (parsed['@type'] === 'LocalBusiness' || parsed['@type'] === 'Organization' || parsed['@type'] === 'Place') {
                            structuredData = { ...structuredData, ...parsed };
                        }
                    } catch (e) {
                        // Continue if JSON parse fails
                    }
                }
            }

            // Method 2: Look for Google Maps embedded JSON data (often in window.APP_INITIALIZATION_STATE or similar)
            const appInitMatch = webpageContent.match(/window\.APP_INITIALIZATION_STATE\s*=\s*(\[.*?\]);/);
            if (appInitMatch) {
                try {
                    const appData = JSON.parse(appInitMatch[1]);
                    // This is a complex nested structure, but business info is often in there
                    console.log('Found APP_INITIALIZATION_STATE data');
                } catch (e) {
                    // Continue
                }
            }

            // Method 3: Look for data attributes and meta tags (but filter out generic Google elements)
            const nameMatch = webpageContent.match(/<h1[^>]*data-value=["']([^"']+)["']/i) ||
                             webpageContent.match(/data-name=["']([^"']+)["']/i) ||
                             webpageContent.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
            
            // Also try to find business name in specific Google Maps patterns
            const businessNamePatterns = [
                /"name":\s*"([^"]+)"/i,
                /data-value=["']([^"']+)["'][^>]*data-field="name"/i,
                /<span[^>]*data-value=["']([^"']+)["'][^>]*itemprop=["']name["']/i
            ];
            
            let foundName = '';
            if (nameMatch) {
                foundName = nameMatch[1].trim();
            } else {
                for (const pattern of businessNamePatterns) {
                    const match = webpageContent.match(pattern);
                    if (match && match[1]) {
                        foundName = match[1].trim();
                        break;
                    }
                }
            }
            
            // Filter out generic Google page titles
            if (foundName && 
                !foundName.toLowerCase().includes('google') && 
                !foundName.toLowerCase().includes('search') &&
                foundName.length > 2 &&
                foundName !== 'Maps') {
                extractedInfo.name = foundName.replace(/ - Google Maps$/, '').replace(/ \| Google Maps$/, '').trim();
            }

            // Method 4: Look for phone in various formats
            const phoneMatch = webpageContent.match(/data-phone-number=["']([^"']+)["']/i) ||
                              webpageContent.match(/tel:([+\d\s\-().]+)/i) ||
                              webpageContent.match(/"telephone":\s*"([^"]+)"/i) ||
                              webpageContent.match(/phone["']?\s*[:=]\s*["']?([+\d\s\-().]+)/i);
            if (phoneMatch) {
                extractedInfo.telephone = phoneMatch[1].trim();
            }

            // Method 5: Look for address
            const addressMatch = webpageContent.match(/data-address=["']([^"']+)["']/i) ||
                                webpageContent.match(/"address":\s*"([^"]+)"/i) ||
                                webpageContent.match(/itemprop=["']address["'][^>]*>([^<]+)</i) ||
                                webpageContent.match(/<meta[^>]*property=["']og:street-address["'][^>]*content=["']([^"']+)["']/i);
            if (addressMatch) {
                extractedInfo.address = addressMatch[1].trim();
            }

            // Method 6: Extract from meta description or other meta tags
            const descMatch = webpageContent.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
            if (descMatch) {
                extractedInfo.description = descMatch[1].trim();
            }

            // Combine structured data and extracted info
            if (structuredData.name) extractedInfo.name = structuredData.name;
            if (structuredData.telephone) extractedInfo.telephone = structuredData.telephone;
            if (structuredData.address) {
                extractedInfo.address = typeof structuredData.address === 'string' 
                    ? structuredData.address 
                    : `${structuredData.address.streetAddress || ''}, ${structuredData.address.addressLocality || ''}, ${structuredData.address.addressRegion || ''}`.trim().replace(/^,\s*|,\s*$/g, '');
            }

            console.log('Extracted info:', {
                hasName: !!extractedInfo.name,
                hasPhone: !!extractedInfo.telephone,
                hasAddress: !!extractedInfo.address,
                structuredDataKeys: Object.keys(structuredData)
            });
        } catch (parseError) {
            console.warn('Error parsing structured data:', parseError);
        }

        // Initialize Gemini
        const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
        const model = 'gemini-2.5-flash';

        // Extract business name from URL if it's a Google Maps share link
        let businessNameHint = '';
        try {
            // Try to extract business name from the resolved URL (or original if not resolved)
            // Use finalUrl if available (from HTML fetch), otherwise use resolved URLs
            const urlToParse = finalUrl || resolvedMapsUrl || finalUrlForPlaceId || actualGmbUrl;
            const urlObj = new URL(urlToParse);
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

${Object.keys(extractedInfo).length > 0 ? `PRELIMINARY EXTRACTION FOUND:
${JSON.stringify(extractedInfo, null, 2)}

` : ''}${Object.keys(structuredData).length > 0 ? `STRUCTURED DATA FOUND:
${JSON.stringify(structuredData, null, 2)}

` : ''}WEBPAGE TEXT CONTENT:
${visibleText.substring(0, 20000)}

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

        // Filter out invalid company names before using fallback
        const invalidNames = ['google', 'google search', 'google maps', 'maps', 'search', 'directions'];
        const isInvalidName = (name: string) => {
            const lower = name.toLowerCase().trim();
            return invalidNames.some(invalid => lower === invalid || lower.includes(invalid + ' '));
        };

        // Use extracted info as fallback if Gemini didn't extract it
        if ((!cleanedData.companyName || !cleanedData.address || !cleanedData.phoneNumber) && Object.keys(extractedInfo).length > 0) {
            console.log('Using extracted info as fallback');
            
            // Only use name if it's valid and not a generic Google page element
            if (extractedInfo.name && !cleanedData.companyName && !isInvalidName(extractedInfo.name)) {
                cleanedData.companyName = extractedInfo.name;
            }
            
            if (extractedInfo.telephone && !cleanedData.phoneNumber) {
                cleanedData.phoneNumber = extractedInfo.telephone;
            }
            if (extractedInfo.address && !cleanedData.address) {
                cleanedData.address = extractedInfo.address;
                // Extract city from address
                const addressParts = extractedInfo.address.split(',');
                if (addressParts.length > 1 && !cleanedData.city) {
                    cleanedData.city = addressParts[addressParts.length - 2]?.trim() || '';
                }
            }
            if (extractedInfo.description && !cleanedData.extraDetailedInfo) {
                cleanedData.extraDetailedInfo = extractedInfo.description;
            }
        }

        // Also filter the Gemini-extracted name
        if (cleanedData.companyName && isInvalidName(cleanedData.companyName)) {
            console.log('Filtered out invalid company name:', cleanedData.companyName);
            cleanedData.companyName = '';
        }

        // Also try structured data if still missing
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
                    : `${structuredData.address.streetAddress || ''}, ${structuredData.address.addressLocality || ''}, ${structuredData.address.addressRegion || ''}`.trim().replace(/^,\s*|,\s*$/g, '');
                cleanedData.address = addr;
                if (!cleanedData.city && structuredData.address.addressLocality) {
                    cleanedData.city = structuredData.address.addressLocality;
                }
            }
        }

        // Extract city from address if city is empty but address exists
        if (!cleanedData.city && cleanedData.address) {
            const addressParts = cleanedData.address.split(',');
            if (addressParts.length > 1) {
                cleanedData.city = addressParts[addressParts.length - 2]?.trim() || '';
            }
        }

        // Log what was extracted for debugging
        const hasAnyData = !!cleanedData.companyName || !!cleanedData.address || !!cleanedData.phoneNumber;
        console.log('Final extracted GMB data:', {
            companyName: cleanedData.companyName,
            phoneNumber: cleanedData.phoneNumber ? '***' : '',
            address: cleanedData.address ? '***' : '',
            url: gmbUrl,
            hasData: hasAnyData,
            extractedInfoKeys: Object.keys(extractedInfo),
            structuredDataKeys: Object.keys(structuredData)
        });

        // If we only have an invalid name or no real data, return error
        // But be more lenient - if we have at least address or phone, consider it valid
        const hasValidName = cleanedData.companyName && !isInvalidName(cleanedData.companyName);
        const hasValidData = hasAnyData && (hasValidName || cleanedData.address || cleanedData.phoneNumber);
        
        if (!hasValidData) {
            // Provide more specific error message based on what happened
            let errorMessage = 'Unable to extract valid business information from the provided URL.';
            
            // Check if we have partial data
            const hasPartialData = cleanedData.companyName || cleanedData.address || cleanedData.phoneNumber;
            
            if (hasPartialData && !hasValidName) {
                errorMessage += ' The extracted business name appears to be invalid.';
            } else if (!hasPartialData) {
                if (!GOOGLE_PLACES_API_KEY) {
                    errorMessage += ' GOOGLE_PLACES_API_KEY is not set in environment variables.';
                } else if (!placeId) {
                    errorMessage += ' Could not extract Place ID from the URL. The share link may need to be resolved manually.';
                } else {
                    errorMessage += ' The Places API was attempted but may have failed.';
                }
            }
            
            errorMessage += ' Please try:';
            errorMessage += '\n1. Use the direct Google Maps URL (not a share link)';
            errorMessage += '\n2. Make sure the URL is publicly accessible';
            errorMessage += '\n3. Enter the information manually';
            
            return res.json({
                success: false,
                error: errorMessage,
                data: cleanedData, // Return what we have even if incomplete
                debug: {
                    placeIdExtracted: !!placeId,
                    apiKeySet: !!GOOGLE_PLACES_API_KEY,
                    resolvedUrl: resolvedMapsUrl || 'N/A',
                    hasPartialData: hasPartialData
                }
            });
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

