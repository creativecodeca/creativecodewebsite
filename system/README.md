# Creative Code Internal System

This is the internal system for Creative Code, accessible at `system.creativecodeca.com`.

## Features

### Website Generator
Automatically generate complete websites using AI and deploy them to GitHub.

**How it works:**
1. Fill in company information (name, industry, contact, location, colors, brand values)
2. Add pages with descriptions
3. Click "Generate Website"
4. The system will:
   - Create a game plan using Gemini AI
   - Generate HTML, CSS, and JavaScript files
   - Create a private GitHub repository
   - Push all files to the repository

## Setup

### 1. Install Dependencies
```bash
npm install @octokit/rest
```

### 2. Environment Variables
Add these to your `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
GITHUB_TOKEN=your_github_personal_access_token
```

#### Getting a GitHub Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "Creative Code Website Generator"
4. Select scopes: **repo** (full control of private repositories)
5. Click "Generate token"
6. Copy the token and add it to your `.env` file

### 3. Run the Server
```bash
npm run dev  # For development
# or
node server/server.js  # For production
```

### 4. Access the System
Navigate to: `http://localhost:4000/system/`

## Deployment

### Vercel Configuration
Add these environment variables in your Vercel project settings:
- `GEMINI_API_KEY`
- `GITHUB_TOKEN`

### Subdomain Setup
Configure your DNS to point `system.creativecodeca.com` to your Vercel deployment.

In Vercel, add the custom domain `system.creativecodeca.com`.

## Security

- The system is designed to be password-protected (add authentication as needed)
- GitHub repositories are created as **private** by default
- API keys are stored securely in environment variables
- Never commit `.env` files to version control

## API Endpoint

**POST** `/api/generate-website`

Request body:
```json
{
  "sitewide": {
    "companyName": "Example Corp",
    "industry": "Technology",
    "contactInfo": "info@example.com",
    "location": "New York, NY",
    "colorScheme": "Blue and White",
    "brandValues": "Innovation, Trust"
  },
  "pages": [
    {
      "title": "Home",
      "description": "Landing page with hero section and services overview"
    },
    {
      "title": "About",
      "description": "Company history and team information"
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "repoUrl": "https://github.com/username/example-corp-website",
  "message": "Website generated and pushed to GitHub successfully"
}
```

## Troubleshooting

### "Repository already exists" error
- Delete the existing repository on GitHub, or
- Use a different company name

### "Invalid GitHub token" error
- Verify your token has the `repo` scope
- Generate a new token if needed
- Ensure the token is correctly set in `.env`

### AI generation taking too long
- This is normal - generating multiple files can take 2-5 minutes
- The loading overlay will show progress

## Future Enhancements

- [ ] Add authentication/login
- [ ] Preview generated websites before pushing
- [ ] Edit generated code before deployment
- [ ] Support for additional frameworks (React, Vue, etc.)
- [ ] Template library
- [ ] Version control for generated sites
- [ ] Analytics dashboard
