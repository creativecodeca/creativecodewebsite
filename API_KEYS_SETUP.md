# 🔑 API Keys Setup Guide

## Required API Keys

You need **3 API keys** to use the website generator:

### 1. ✅ GEMINI_API_KEY (You already have this)
- Used for AI website generation
- Already configured in your project

### 2. 🔧 GITHUB_TOKEN (Personal Access Token)

**How to get it:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: `Creative Code Website Generator`
4. Expiration: Choose "No expiration" or "90 days"
5. **Select ONLY this scope:**
   - ☑ **repo** (Full control of private repositories)
6. Click "Generate token"
7. **Copy the token** (starts with `ghp_`)
8. Add to `.env`:
   ```
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 3. 🚀 VERCEL_TOKEN (API Token)

**How to get it:**
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it: `Creative Code Website Generator`
4. Scope: Select your account/team
5. Expiration: Choose "No Expiration" or custom
6. Click "Create"
7. **Copy the token**
8. Add to `.env`:
   ```
   VERCEL_TOKEN=your_vercel_token_here
   ```

**Important:** You also need to connect your GitHub account to Vercel:
1. Go to https://vercel.com/dashboard
2. Click on your profile → Settings → Git
3. Connect your GitHub account
4. This allows Vercel to access your GitHub repos for deployment

---

## Complete .env File

Your `.env` file should look like this:

```env
# AI Generation
GEMINI_API_KEY=your_existing_gemini_key

# GitHub Integration  
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Vercel Deployment
VERCEL_TOKEN=your_vercel_token_here

# Existing Keys
GHL_API_KEY=your_ghl_key
GHL_LOCATION_ID=your_ghl_location

# Server
PORT=4000
FRONTEND_ORIGIN=https://creativecodeca.com
```

---

## For Vercel Deployment (Production)

Add these environment variables in your Vercel project settings:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:
   - `GEMINI_API_KEY`
   - `GITHUB_TOKEN`
   - `VERCEL_TOKEN`
   - `GHL_API_KEY`
   - `GHL_LOCATION_ID`

---

## Testing Locally

1. Make sure all 3 keys are in your `.env` file
2. Start the server:
   ```bash
   node server/server.js
   ```
3. Navigate to: `http://localhost:4000/system/`
4. Fill in the form and test!

---

## Security Notes

- ⚠️ **Never commit `.env` to GitHub**
- ⚠️ **Keep these tokens secret**
- ⚠️ If a token is exposed, delete it immediately and create a new one
- ✅ Tokens are only used server-side (never exposed to clients)

---

## What Each Token Does

| Token | Purpose | Used For |
|-------|---------|----------|
| `GEMINI_API_KEY` | AI Generation | Creating website code (HTML, CSS, JS) |
| `GITHUB_TOKEN` | GitHub API | Creating private repos and pushing files |
| `VERCEL_TOKEN` | Vercel API | Auto-deploying websites to Vercel |

---

## Troubleshooting

### "GITHUB_TOKEN not found"
- Make sure the token is in your `.env` file
- Restart the server after adding it

### "VERCEL_TOKEN not found"
- Add the token to `.env`
- Restart the server

### "Failed to create Vercel project"
- Make sure your GitHub is connected to Vercel
- Check that the Vercel token has the right permissions
- Verify the repo was created on GitHub first

### "Repository already exists"
- Delete the existing repo on GitHub, or
- Use a different company name

---

## Ready to Go!

Once you have all 3 tokens configured:
1. ✅ Websites will be generated with AI
2. ✅ Pushed to private GitHub repos
3. ✅ Automatically deployed to Vercel
4. ✅ Live URL provided instantly!

🎉 **You're all set!**
