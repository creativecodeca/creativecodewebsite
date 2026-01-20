import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

// Simplified TreeNode interface for API use
interface TreeNode {
  id: string;
  label: string;
  level: number;
  children: TreeNode[];
  parent?: string;
}

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
    const { nodeId, nodeLabel, mode, nodeContext } = req.body; // mode: 'explain' or 'solve', nodeContext: optional pre-built context

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

    // Use provided context or just the label
    const fullContext = nodeContext || nodeLabel || '';

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    let prompt = '';

    if (mode === 'explain') {
      prompt = `You are a business consultant analyzing a specific business problem.

Problem: "${nodeLabel || 'Unknown Problem'}"

${nodeContext ? `Full problem breakdown (including sub-issues):\n${nodeContext}\n` : ''}

Provide a clear, concise explanation of this business problem:
- What does this problem actually mean in practical terms?
- Why does this problem occur?
- What are the common symptoms?
- What is the typical impact on the business?
${nodeContext ? '- Consider the sub-problems listed above in your explanation' : ''}

Keep it very concise. Maximum 2 paragraphs. If the user provides sub-issues, incorporate them into a single coherent explanation.`;
    } else if (mode === 'solve') {
      prompt = `You are an innovative business consultant specializing in automation, AI, and modern solutions.

Problem: "${nodeLabel || 'Unknown Problem'}"

${nodeContext ? `Full problem breakdown (including sub-issues):\n${nodeContext}\n` : ''}

Provide exactly 3 creative "ideas" (not rigid plans) to solve this problem, categorized by difficulty:

1. **Easy Idea** (Low resource, quick implementation, often using basic automation/tools)
2. **Medium Idea** (Moderate effort, higher impact, potentially involving AI integrations)
3. **Hard Idea** (High effort/complexity, long-term strategic shift, significant system build)

After the 3 ideas, provide a final section:
**The "Most Worth It" Choice**: Analyze which of these is most valuable considering all resources are available but you want to prevent overengineering. Why is this the most efficient path forward?

Think like a modern, tech-savvy consultant who leverages AI and automation first. Keep descriptions brief and focused on the concept.`;
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

