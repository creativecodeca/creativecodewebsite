import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');
let render;
try {
    const module = await import(pathToFileURL(toAbsolute('dist-server/entry-server.js')).href);
    render = module.render;
} catch (e) {
    console.error('Error importing server bundle:', e);
    process.exit(1);
}

const routesToPrerender = [
    '/',
    '/products',
    '/about',
    '/contact',
    '/mobilecontact',
    '/clientcall',
    '/onboarding/websiteform',
    '/services/website',
    '/services/website/buy-popup',
    '/services/website/buy-standard',
    '/privacy',
    '/terms'
];

(async () => {
    // pre-render each route...
    for (const url of routesToPrerender) {
        const context = {};
        const appHtml = render(url, context);
        const { html, helmet } = appHtml;

        const helmetHead = `
      ${helmet.helmet.title.toString()}
      ${helmet.helmet.priority.toString()}
      ${helmet.helmet.meta.toString()}
      ${helmet.helmet.link.toString()}
      ${helmet.helmet.script.toString()}
    `;

        const htmlContent = template
            .replace(`<!--app-head-->`, helmetHead)
            .replace(`<!--app-html-->`, html);

        const filePath = `dist${url === '/' ? '/index.html' : `${url}/index.html`}`;
        const dirPath = path.dirname(filePath);

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        fs.writeFileSync(toAbsolute(filePath), htmlContent);
        console.log('pre-rendered:', filePath);
    }
})();
