import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nodeLabel, mode } = req.body; // mode: 'explain' or 'solve'

    if (!nodeLabel || !mode) {
      return res.status(400).json({ error: 'Node label and mode are required' });
    }

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found');
      return res.status(500).json({ 
        error: 'AI service is temporarily unavailable',
        code: 'SERVICE_UNAVAILABLE'
      });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    let prompt = '';

    if (mode === 'explain') {
      prompt = `You are a business consultant analyzing a specific business problem.

Problem: "${nodeLabel}"

Provide a clear, concise explanation of this business problem:
- What does this problem actually mean in practical terms?
- Why does this problem occur?
- What are the common symptoms?
- What is the typical impact on the business?

Keep it practical and actionable. Write 2-3 paragraphs maximum.`;
    } else if (mode === 'solve') {
      prompt = `You are an innovative business consultant specializing in automation, AI, and modern solutions.

Problem: "${nodeLabel}"

Provide 3-5 specific, actionable solutions to solve this problem:
- Focus on automation, AI tools, and modern technology where applicable
- Include specific tool recommendations when relevant
- Be creative and forward-thinking
- Each solution should be practical and implementable
- Format as a numbered list with brief explanations

Think like a modern, tech-savvy consultant who leverages AI and automation first.`;
    }

    const result = await model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return res.status(200).json({
      content: text,
      nodeLabel,
      mode,
    });

  } catch (error: any) {
    console.error('Error in AI diagnosis:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}

