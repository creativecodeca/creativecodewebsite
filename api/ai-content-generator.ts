import { GoogleGenAI } from '@google/genai';
import type { ColorPalette } from './ai-color-parser.js';

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  navbar: {
    logoText: string;
    links: Array<{ label: string; route: string }>;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  pages: Array<{
    route: string;
    title: string;
    sections: Array<{
      type: string;
      content: any;
    }>;
  }>;
  footer: {
    companyName: string;
    description: string;
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    links: Array<{ label: string; route: string }>;
  };
}

export async function generateSiteContentWithAI(
  genAI: GoogleGenAI,
  input: any,
  colors: ColorPalette,
  templateId: string
): Promise<SiteContent> {
  // Build pages structure from input
  const inputPages = input.pages.map((p: any, idx: number) => {
    const route = idx === 0 ? '/' : `/${p.title.toLowerCase().replace(/\s+/g, '-')}`;
    return {
      title: p.title,
      route: route,
      information: p.information
    };
  });
  
  const pagesInfo = inputPages.map(p => 
    `- ${p.title} (${p.route}): ${p.information}`
  ).join('\n');

  const prompt = `Generate complete website content as JSON for a professional business website.

Company Information:
- Name: ${input.companyName}
- Industry: ${input.industry}
- Type: ${input.companyType}
- Address: ${input.address}, ${input.city}
- Phone: ${input.phoneNumber}
- Email: ${input.email}
- Brand Themes: ${input.brandThemes}
- Additional Info: ${input.extraDetailedInfo || 'None'}

Pages to Create (MUST create one page per entry below):
${pagesInfo}

IMPORTANT: You MUST create exactly ${inputPages.length} pages in your response, one for each page listed above. Each page should have:
- route: The route specified above (e.g., "/", "/services", "/about")
- title: The page title
- sections: Relevant sections based on the page information provided

Color Scheme:
- Primary: ${colors.primary}
- Secondary: ${colors.secondary}
- Accent: ${colors.accent}

Template: ${templateId}

Requirements:
1. Generate compelling, business-specific content (NO generic placeholder text)
2. All content must be specific to ${input.companyName}
3. Use the provided page information to create detailed sections
4. Create engaging hero section with clear call-to-action
5. Include relevant sections: features, services, testimonials, about, contact
6. Ensure all content is professional and industry-appropriate
7. Meta tags should be SEO-optimized
8. Footer should include contact information and navigation links

Return ONLY valid JSON in this exact structure:
{
  "meta": {
    "title": "Page Title - Company Name",
    "description": "SEO meta description (150-160 chars)",
    "keywords": "relevant, keywords, for, SEO"
  },
  "navbar": {
    "logoText": "Company Name",
    "links": [
      {"label": "Home", "route": "/"},
      {"label": "Services", "route": "/services"},
      ...
    ]
  },
  "hero": {
    "title": "Compelling headline",
    "subtitle": "Supporting text",
    "ctaText": "Call to Action",
    "ctaLink": "/contact"
  },
  "pages": [
    {
      "route": "/",
      "title": "Home",
      "sections": [
        {
          "type": "hero",
          "content": {...}
        },
        {
          "type": "features",
          "content": {
            "title": "Why Choose Us",
            "items": [
              {"title": "...", "description": "..."},
              ...
            ]
          }
        },
        {
          "type": "services",
          "content": {
            "title": "Our Services",
            "items": [...]
          }
        },
        {
          "type": "testimonials",
          "content": {
            "title": "What Our Clients Say",
            "items": [...]
          }
        }
      ]
    },
    {
      "route": "/services",
      "title": "Services",
      "sections": [...]
    },
    ...
  ],
  "footer": {
    "companyName": "${input.companyName}",
    "description": "Brief company description",
    "contact": {
      "phone": "${input.phoneNumber}",
      "email": "${input.email}",
      "address": "${input.address}, ${input.city}"
    },
    "links": [
      {"label": "Home", "route": "/"},
      {"label": "Services", "route": "/services"},
      ...
    ]
  }
}

CRITICAL: Return ONLY the JSON object. No markdown, no explanations, no code blocks. Just the raw JSON.`;

  try {
    const chat = genAI.chats.create({
      model: 'gemini-1.5-flash',
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are an expert copywriter and web content strategist. Generate compelling, business-specific website content. Always return valid JSON.'
      }
    });

    const result = await chat.sendMessage({ message: prompt });
    const text = result.text.trim();
    const jsonText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const content = JSON.parse(jsonText) as SiteContent;
    
    // Validate structure
    if (!content.meta || !content.navbar || !content.hero || !content.pages || !content.footer) {
      throw new Error('Invalid content structure returned');
    }
    
    // Ensure all input pages are represented
    const inputRoutes = inputPages.map(p => p.route);
    const generatedRoutes = content.pages.map(p => p.route);
    
    // Add missing pages (if AI didn't generate all of them)
    for (const inputPage of inputPages) {
      if (!generatedRoutes.includes(inputPage.route)) {
        // Create a basic page for missing routes
        content.pages.push({
          route: inputPage.route,
          title: inputPage.title,
          sections: [
            {
              type: 'hero',
              content: {
                title: inputPage.title,
                subtitle: `Welcome to ${inputPage.title}`
              }
            },
            {
              type: 'about',
              content: {
                title: inputPage.title,
                description: inputPage.information
              }
            }
          ]
        });
      }
    }
    
    // Ensure navbar and footer links match the pages
    content.navbar.links = inputPages.map(p => ({
      label: p.title === 'Home' || p.route === '/' ? 'Home' : p.title,
      route: p.route
    }));
    
    content.footer.links = inputPages.map(p => ({
      label: p.title === 'Home' || p.route === '/' ? 'Home' : p.title,
      route: p.route
    }));
    
    return content;
  } catch (error: any) {
    console.error('Content generation error:', error);
    throw new Error(`Failed to generate content: ${error.message}`);
  }
}

