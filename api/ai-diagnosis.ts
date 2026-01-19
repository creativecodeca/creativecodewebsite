import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getNodeById, TreeNode } from '../data/diagnosticTree';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

// Helper to build hierarchical context of a node and its children
function buildNodeContext(node: TreeNode, depth = 0): string {
  const indent = '  '.repeat(depth);
  let context = `${indent}- ${node.label}\n`;
  
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      context += buildNodeContext(child, depth + 1);
    });
  }
  
  return context;
}

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
    const { nodeId, nodeLabel, mode } = req.body; // mode: 'explain' or 'solve'

    if ((!nodeId && !nodeLabel) || !mode) {
      return res.status(400).json({ error: 'Node ID/label and mode are required' });
    }

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found');
      return res.status(500).json({ 
        error: 'AI service is temporarily unavailable',
        code: 'SERVICE_UNAVAILABLE'
      });
    }

    // Get full node context if nodeId is provided
    let fullContext = nodeLabel || '';
    if (nodeId) {
      const node = getNodeById(nodeId);
      if (node) {
        fullContext = buildNodeContext(node);
      }
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    let prompt = '';

    if (mode === 'explain') {
      prompt = `You are a business consultant analyzing a specific business problem.

Problem: "${nodeLabel || 'Unknown Problem'}"

${nodeId ? `Full problem breakdown (including sub-issues):\n${fullContext}\n` : ''}

Provide a clear, concise explanation of this business problem:
- What does this problem actually mean in practical terms?
- Why does this problem occur?
- What are the common symptoms?
- What is the typical impact on the business?
${nodeId && fullContext.includes('-') ? '- Consider the sub-problems listed above in your explanation' : ''}

Keep it practical and actionable. Write 2-3 paragraphs maximum.`;
    } else if (mode === 'solve') {
      prompt = `You are an innovative business consultant specializing in automation, AI, and modern solutions.

Problem: "${nodeLabel || 'Unknown Problem'}"

${nodeId ? `Full problem breakdown (including sub-issues):\n${fullContext}\n` : ''}

Provide 3-5 specific, actionable solutions to solve this problem:
- Focus on automation, AI tools, and modern technology where applicable
- Include specific tool recommendations when relevant (e.g., Zapier, Make.com, ChatGPT, Claude, specific SaaS tools)
- Be creative and forward-thinking
- Each solution should be practical and implementable
- Format as a numbered list with brief explanations
${nodeId && fullContext.includes('-') ? '- Address the sub-problems listed above where relevant' : ''}

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

