import fetch from 'node-fetch';

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export interface ImageData {
  url: string;
  alt: string;
  photographer?: string;
  photographerUrl?: string;
  source: 'pexels' | 'unsplash';
}

export async function getRelevantImage(searchTerm: string, timeoutMs: number = 5000): Promise<ImageData | null> {
  // Try Pexels first (faster, better API)
  if (PEXELS_API_KEY) {
    try {
      const image = await Promise.race([
        fetchPexelsImage(searchTerm),
        new Promise<null>((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), timeoutMs)
        )
      ]) as ImageData | null;
      
      if (image) return image;
    } catch (error) {
      console.warn('Pexels image fetch failed:', error);
    }
  }
  
  // Fallback to Unsplash
  if (UNSPLASH_ACCESS_KEY) {
    try {
      const image = await Promise.race([
        fetchUnsplashImage(searchTerm),
        new Promise<null>((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), timeoutMs)
        )
      ]) as ImageData | null;
      
      if (image) return image;
    } catch (error) {
      console.warn('Unsplash image fetch failed:', error);
    }
  }
  
  return null;
}

async function fetchPexelsImage(searchTerm: string): Promise<ImageData | null> {
  if (!PEXELS_API_KEY) return null;
  
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&per_page=1&orientation=landscape`,
    {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    }
  );
  
  if (!response.ok) return null;
  
  const data: any = await response.json();
  if (data.photos && data.photos.length > 0) {
    const photo = data.photos[0];
    return {
      url: photo.src.large || photo.src.medium,
      alt: `${searchTerm} - ${photo.photographer}`,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      source: 'pexels'
    };
  }
  
  return null;
}

async function fetchUnsplashImage(searchTerm: string): Promise<ImageData | null> {
  if (!UNSPLASH_ACCESS_KEY) return null;
  
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=1&orientation=landscape`,
    {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    }
  );
  
  if (!response.ok) return null;
  
  const data: any = await response.json();
  if (data.results && data.results.length > 0) {
    const photo = data.results[0];
    return {
      url: photo.urls.regular || photo.urls.small,
      alt: `${searchTerm} - ${photo.user.name}`,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      source: 'unsplash'
    };
  }
  
  return null;
}

export function generateImageAttribution(images: ImageData[]): string {
  if (images.length === 0) return '';
  
  const attributions = images.map(img => {
    if (img.source === 'pexels') {
      return `Photo by <a href="${img.photographerUrl}" target="_blank" rel="noopener">${img.photographer}</a> on <a href="https://www.pexels.com" target="_blank" rel="noopener">Pexels</a>`;
    } else {
      return `Photo by <a href="${img.photographerUrl}" target="_blank" rel="noopener">${img.photographer}</a> on <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a>`;
    }
  });
  
  return attributions.join('<br>');
}

