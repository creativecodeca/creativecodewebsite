import type { SiteContent } from './ai-content-generator.js';
import type { ColorPalette } from './ai-color-parser.js';

// Helper to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export interface GeneratedFile {
  name: string;
  content: string;
}

export async function generateStaticSiteFiles(
  templateId: string,
  content: SiteContent,
  colors: ColorPalette,
  input: any,
  images: any[] = []
): Promise<GeneratedFile[]> {
  const files: GeneratedFile[] = [];

  try {
    // Load template files
    const templatePath = join(process.cwd(), 'templates', templateId);
    
    // For Vercel serverless, we'll embed templates in code
    // In production, you might want to store templates in a database or CDN
    const template = getTemplate(templateId);
    
    // Generate CSS with colors
    const css = template.css
      .replace(/\{\{PRIMARY_COLOR\}\}/g, colors.primary)
      .replace(/\{\{SECONDARY_COLOR\}\}/g, colors.secondary)
      .replace(/\{\{ACCENT_COLOR\}\}/g, colors.accent);
    
    files.push({ name: 'styles.css', content: css });
    
    // Generate JS
    files.push({ name: 'script.js', content: template.js });
    
    // Generate each page
    for (const page of content.pages) {
      const html = generatePageHTML(template.html, page, content, colors, input, images);
      // Handle route paths correctly
      let fileName: string;
      if (page.route === '/') {
        fileName = 'index.html';
      } else {
        // Remove leading slash and add index.html
        const routePath = page.route.startsWith('/') ? page.route.slice(1) : page.route;
        fileName = `${routePath}/index.html`;
      }
      files.push({ name: fileName, content: html });
    }
    
    // Generate vercel.json for proper routing
    const vercelConfig = {
      routes: [
        {
          src: '/(.*)',
          dest: '/$1'
        }
      ],
      headers: [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY'
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block'
            }
          ]
        }
      ]
    };
    files.push({ name: 'vercel.json', content: JSON.stringify(vercelConfig, null, 2) });
    
    // Generate metadata.json for future reference
    const metadata = {
      companyName: input.companyName,
      industry: input.industry,
      colors,
      templateId,
      generatedAt: new Date().toISOString(),
      formData: input,
      images: images.map((img: any) => ({
        url: img.url,
        alt: img.alt,
        photographer: img.photographer,
        source: img.source
      }))
    };
    files.push({ name: 'metadata.json', content: JSON.stringify(metadata, null, 2) });
    
    // Generate attributions page if images were used
    if (images.length > 0) {
      const attributionsHTML = generateAttributionsPage(images, input);
      files.push({ name: 'attributions.html', content: attributionsHTML });
      
      // Add link to attributions in footer
      // This will be handled in the template replacement
    }
    
    return files;
  } catch (error: any) {
    console.error('Error generating static site:', error);
    throw new Error(`Failed to generate static site: ${error.message}`);
  }
}

function generatePageHTML(
  templateHTML: string,
  page: SiteContent['pages'][0],
  content: SiteContent,
  colors: ColorPalette,
  input: any,
  images: any[] = []
): string {
  let html = templateHTML;
  
  // Replace meta tags
  html = html.replace(/\{\{META_TITLE\}\}/g, page.route === '/' ? content.meta.title : `${page.title} - ${content.meta.title}`);
  html = html.replace(/\{\{META_DESCRIPTION\}\}/g, content.meta.description);
  html = html.replace(/\{\{META_KEYWORDS\}\}/g, content.meta.keywords);
  
  // Replace navbar
  html = html.replace(/\{\{NAVBAR_LOGO\}\}/g, content.navbar.logoText);
  html = html.replace(/\{\{NAVBAR_LINKS\}\}/g, generateNavbarLinks(content.navbar.links));
  
  // Replace hero section
  if (page.route === '/') {
    html = html.replace(/\{\{HERO_TITLE\}\}/g, escapeHtml(content.hero.title));
    html = html.replace(/\{\{HERO_SUBTITLE\}\}/g, escapeHtml(content.hero.subtitle));
    html = html.replace(/\{\{HERO_CTA_TEXT\}\}/g, escapeHtml(content.hero.ctaText));
    html = html.replace(/\{\{HERO_CTA_LINK\}\}/g, content.hero.ctaLink);
    
    // Add hero image if available
    if (images.length > 0) {
      const heroImage = images[0];
      html = html.replace(
        /<section class="hero">/g,
        `<section class="hero" style="background-image: url('${heroImage.url}'); background-size: cover; background-position: center; position: relative;">
          <div style="background: rgba(0,0,0,0.4); position: absolute; inset: 0; z-index: 1;"></div>`
      );
      // Add z-index to container
      html = html.replace(
        /<div class="container">/g,
        '<div class="container" style="position: relative; z-index: 2;">'
      );
    }
  } else {
    // For non-home pages, use page title as hero
    html = html.replace(/\{\{HERO_TITLE\}\}/g, escapeHtml(page.title));
    html = html.replace(/\{\{HERO_SUBTITLE\}\}/g, escapeHtml(`Welcome to ${page.title}`));
    html = html.replace(/\{\{HERO_CTA_TEXT\}\}/g, 'Get Started');
    html = html.replace(/\{\{HERO_CTA_LINK\}\}/g, '/contact');
  }
  
  // Replace sections based on page content
  html = replaceSections(html, page.sections);
  
  // Replace contact info
  html = html.replace(/\{\{PHONE\}\}/g, input.phoneNumber);
  html = html.replace(/\{\{EMAIL\}\}/g, input.email);
  html = html.replace(/\{\{ADDRESS\}\}/g, `${input.address}, ${input.city}`);
  
  // Replace footer
  html = html.replace(/\{\{FOOTER_COMPANY_NAME\}\}/g, escapeHtml(content.footer.companyName));
  html = html.replace(/\{\{FOOTER_DESCRIPTION\}\}/g, escapeHtml(content.footer.description));
  html = html.replace(/\{\{FOOTER_PHONE\}\}/g, escapeHtml(content.footer.contact.phone));
  html = html.replace(/\{\{FOOTER_EMAIL\}\}/g, escapeHtml(content.footer.contact.email));
  html = html.replace(/\{\{FOOTER_ADDRESS\}\}/g, escapeHtml(content.footer.contact.address));
  
  // Generate footer links and add attributions if images exist
  let footerLinks = generateFooterLinks(content.footer.links);
  if (images.length > 0) {
    footerLinks += '\n                        <li><a href="/attributions.html">Image Attributions</a></li>';
  }
  html = html.replace(/\{\{FOOTER_LINKS\}\}/g, footerLinks);
  html = html.replace(/\{\{YEAR\}\}/g, new Date().getFullYear().toString());
  
  // Generate contact form if needed
  if (input.contactForm) {
    html = html.replace(/\{\{CONTACT_FORM\}\}/g, generateContactForm());
  } else {
    html = html.replace(/\{\{CONTACT_FORM\}\}/g, '');
  }
  
  return html;
}

function replaceSections(html: string, sections: SiteContent['pages'][0]['sections']): string {
  // Replace features section
  const featuresSection = sections.find(s => s.type === 'features');
  if (featuresSection && featuresSection.content) {
    const featuresHTML = generateFeaturesHTML(featuresSection.content);
    const title = (featuresSection.content as any).title || 'Features';
    html = html.replace(/\{\{FEATURES_TITLE\}\}/g, title);
    html = html.replace(/\{\{FEATURES_ITEMS\}\}/g, featuresHTML);
  } else {
    // Remove features section if not present
    html = html.replace(/<section class="features">[\s\S]*?<\/section>/g, '');
  }
  
  // Replace services section
  const servicesSection = sections.find(s => s.type === 'services');
  if (servicesSection && servicesSection.content) {
    const servicesHTML = generateServicesHTML(servicesSection.content);
    const title = (servicesSection.content as any).title || 'Services';
    html = html.replace(/\{\{SERVICES_TITLE\}\}/g, title);
    html = html.replace(/\{\{SERVICES_ITEMS\}\}/g, servicesHTML);
  } else {
    // Remove services section if not present
    html = html.replace(/<section class="services">[\s\S]*?<\/section>/g, '');
  }
  
  // Replace about section
  const aboutSection = sections.find(s => s.type === 'about');
  if (aboutSection && aboutSection.content) {
    const title = (aboutSection.content as any).title || 'About Us';
    const description = (aboutSection.content as any).description || '';
    html = html.replace(/\{\{ABOUT_TITLE\}\}/g, title);
    html = html.replace(/\{\{ABOUT_CONTENT\}\}/g, description);
  } else {
    // Remove about section if not present
    html = html.replace(/<section class="about">[\s\S]*?<\/section>/g, '');
  }
  
  // Replace contact section
  html = html.replace(/\{\{CONTACT_TITLE\}\}/g, 'Contact Us');
  
  return html;
}

function generateNavbarLinks(links: Array<{ label: string; route: string }>): string {
  return links.map(link => 
    `<li><a href="${link.route}">${link.label}</a></li>`
  ).join('\n                ');
}

function generateFooterLinks(links: Array<{ label: string; route: string }>): string {
  return links.map(link => 
    `<li><a href="${link.route}">${link.label}</a></li>`
  ).join('\n                        ');
}

function generateFeaturesHTML(content: any): string {
  if (!content || !content.items || !Array.isArray(content.items) || content.items.length === 0) {
    return '<div class="feature-card"><h3>Quality Service</h3><p>We deliver exceptional results.</p></div>';
  }
  
  return content.items.map((item: any) => `
                <div class="feature-card">
                    <h3>${escapeHtml(item.title || 'Feature')}</h3>
                    <p>${escapeHtml(item.description || '')}</p>
                </div>
            `).join('');
}

function generateServicesHTML(content: any): string {
  if (!content || !content.items || !Array.isArray(content.items)) {
    return '<div class="service-card"><h3>Our Services</h3><p>Professional services tailored to your needs.</p></div>';
  }
  
  return content.items.map((item: any) => `
                <div class="service-card">
                    <h3>${escapeHtml(item.title || 'Service')}</h3>
                    <p>${escapeHtml(item.description || '')}</p>
                </div>
            `).join('');
}

function generateContactForm(): string {
  return `
                <form class="contact-form" action="/api/contact" method="POST">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            `;
}

// Template loader - in production, load from filesystem or database
function getTemplate(templateId: string): { html: string; css: string; js: string } {
  // For now, return the service-business template
  // In production, you'd load from filesystem or database
  const serviceBusinessHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{META_TITLE}}</title>
    <meta name="description" content="{{META_DESCRIPTION}}">
    <meta name="keywords" content="{{META_KEYWORDS}}">
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <a href="/" class="logo">{{NAVBAR_LOGO}}</a>
            <button class="mobile-menu-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-links">
                {{NAVBAR_LINKS}}
            </ul>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <h1>{{HERO_TITLE}}</h1>
            <p class="hero-subtitle">{{HERO_SUBTITLE}}</p>
            <a href="{{HERO_CTA_LINK}}" class="btn btn-primary">{{HERO_CTA_TEXT}}</a>
        </div>
    </section>

    <section class="features">
        <div class="container">
            <h2>{{FEATURES_TITLE}}</h2>
            <div class="features-grid">
                {{FEATURES_ITEMS}}
            </div>
        </div>
    </section>

    <section class="services">
        <div class="container">
            <h2>{{SERVICES_TITLE}}</h2>
            <div class="services-grid">
                {{SERVICES_ITEMS}}
            </div>
        </div>
    </section>

    <section class="about">
        <div class="container">
            <h2>{{ABOUT_TITLE}}</h2>
            <div class="about-content">
                {{ABOUT_CONTENT}}
            </div>
        </div>
    </section>

    <section class="contact" id="contact">
        <div class="container">
            <h2>{{CONTACT_TITLE}}</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <p><strong>Phone:</strong> <a href="tel:{{PHONE}}">{{PHONE}}</a></p>
                    <p><strong>Email:</strong> <a href="mailto:{{EMAIL}}">{{EMAIL}}</a></p>
                    <p><strong>Address:</strong> {{ADDRESS}}</p>
                </div>
                {{CONTACT_FORM}}
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>{{FOOTER_COMPANY_NAME}}</h3>
                    <p>{{FOOTER_DESCRIPTION}}</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        {{FOOTER_LINKS}}
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p>{{FOOTER_PHONE}}</p>
                    <p>{{FOOTER_EMAIL}}</p>
                    <p>{{FOOTER_ADDRESS}}</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; {{YEAR}} {{FOOTER_COMPANY_NAME}}. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="/script.js"></script>
</body>
</html>`;

  const serviceBusinessCSS = `:root {
    --primary: {{PRIMARY_COLOR}};
    --secondary: {{SECONDARY_COLOR}};
    --accent: {{ACCENT_COLOR}};
    --text: #ffffff;
    --text-muted: #a0a0a0;
    --bg: #020202;
    --bg-light: #0a0a0a;
    --border: rgba(255, 255, 255, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: var(--bg);
    color: var(--text);
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--primary);
    border-bottom: 1px solid var(--border);
    z-index: 1000;
    padding: 1rem 0;
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text);
    text-decoration: none;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: var(--text);
    text-decoration: none;
    transition: opacity 0.3s;
}

.nav-links a:hover {
    opacity: 0.8;
}

.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
}

.mobile-menu-toggle span {
    width: 25px;
    height: 2px;
    background: var(--text);
}

.hero {
    padding: 150px 0 100px;
    text-align: center;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
}

.hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.btn {
    display: inline-block;
    padding: 12px 32px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary {
    background-color: var(--accent);
    color: var(--text);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

section {
    padding: 80px 0;
}

section h2 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    text-align: center;
}

.features {
    background-color: var(--bg-light);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.feature-card {
    background-color: var(--bg);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border);
    transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.feature-card h3 {
    color: var(--primary);
    margin-bottom: 1rem;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.service-card {
    background-color: var(--bg-light);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border);
}

.service-card h3 {
    color: var(--secondary);
    margin-bottom: 1rem;
}

.about {
    background-color: var(--bg-light);
}

.about-content {
    max-width: 800px;
    margin: 0 auto;
    font-size: 1.1rem;
}

.contact-info {
    margin-bottom: 2rem;
}

.contact-info p {
    margin-bottom: 1rem;
}

.contact-info a {
    color: var(--primary);
    text-decoration: none;
}

.contact-form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 12px;
    background-color: var(--bg-light);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--text);
    font-size: 1rem;
}

.form-group textarea {
    min-height: 150px;
    resize: vertical;
}

.footer {
    background-color: var(--bg-light);
    padding: 60px 0 20px;
    border-top: 1px solid var(--border);
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
    margin-bottom: 1rem;
    color: var(--primary);
}

.footer-section ul {
    list-style: none;
}

.footer-section ul li {
    margin-bottom: 0.5rem;
}

.footer-section a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.3s;
}

.footer-section a:hover {
    color: var(--primary);
}

.footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    color: var(--text-muted);
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
    
    .mobile-menu-toggle {
        display: flex;
    }
    
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .features-grid,
    .services-grid {
        grid-template-columns: 1fr;
    }
}`;

  const serviceBusinessJS = `document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--primary)';
            navLinks.style.padding = '1rem';
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});`;

  // Return template based on ID (for now, all use service-business)
  return {
    html: serviceBusinessHTML,
    css: serviceBusinessCSS,
    js: serviceBusinessJS
  };
}

