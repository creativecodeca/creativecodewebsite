import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;

// Simplified tree structure for AI context (just labels and IDs)
const treeContext = `
You are analyzing a business diagnostic tree to help identify the root cause of problems.

The tree structure:

DON'T HAVE ENOUGH MONEY (root)
├─ MONEY COMES IN TOO SLOWLY (money-slow)
│  ├─ PAYMENT TERMS TOO LONG (payment-terms-long)
│  ├─ CLIENTS PAY LATE (clients-pay-late)
│  ├─ LONG SALES CYCLE (long-sales-cycle)
│  ├─ LONG DELIVERY CYCLE BEFORE PAYMENT (long-delivery-cycle)
│  └─ CASH FLOW GAPS (cash-flow-gaps)
├─ MONEY GOES OUT TOO FAST (money-out-fast)
│  ├─ EXPENSES TOO HIGH (expenses-high)
│  │  ├─ OVERHEAD TOO HIGH (overhead-high)
│  │  ├─ DELIVERY COSTS TOO HIGH (delivery-costs-high)
│  │  ├─ ACQUISITION COSTS TOO HIGH (acquisition-costs-high)
│  │  └─ WASTE AND INEFFICIENCY (waste-inefficiency)
│  └─ PROFIT MARGINS TOO LOW (margins-low)
│     ├─ PRICES TOO LOW (prices-low)
│     ├─ SCOPE CREEP NOT BILLED (scope-creep-unbilled)
│     └─ INEFFICIENT DELIVERY (inefficient-delivery)
├─ NOT ENOUGH REVENUE COMING IN (not-enough-revenue)
│  ├─ NOT ENOUGH CLIENTS TOTAL (not-enough-clients)
│  │  ├─ EXISTING CLIENTS CHURNED/LEFT (clients-churned)
│  │  │  ├─ WHY THEY LEFT (why-left)
│  │  │  └─ NO RETENTION SYSTEM (no-retention-system)
│  │  ├─ EXISTING CLIENTS NOT BUYING MORE (clients-not-buying-more)
│  │  │  ├─ LACK OF AWARENESS (lack-awareness)
│  │  │  ├─ LACK OF NEED (lack-need-perceived)
│  │  │  ├─ BARRIERS TO EXPANSION (barriers-expansion)
│  │  │  └─ NO UPSELL PROCESS (no-upsell-process)
│  │  └─ NOT GETTING NEW CLIENTS (not-getting-new)
│  │     ├─ CAN'T FIND ENOUGH PROSPECTS (cant-find-prospects)
│  │     │  ├─ DON'T KNOW WHERE TARGET MARKET IS (dont-know-where-market)
│  │     │  ├─ TARGET MARKET TOO SMALL (market-too-small)
│  │     │  ├─ TARGET MARKET TOO COMPETITIVE (market-competitive)
│  │     │  └─ LEAD GENERATION INSUFFICIENT (lead-gen-insufficient)
│  │     ├─ PROSPECTS DON'T KNOW WE EXIST (prospects-dont-know)
│  │     │  ├─ NO VISIBILITY (no-visibility)
│  │     │  ├─ NO REFERRALS COMING IN (no-referrals)
│  │     │  ├─ NO WORD OF MOUTH (no-word-mouth)
│  │     │  ├─ WRONG CHANNELS (wrong-channels)
│  │     │  └─ OUTREACH ISSUES (outreach-issues)
│  │     ├─ PROSPECTS AWARE BUT DON'T ENGAGE (prospects-aware-dont-engage)
│  │     │  ├─ MESSAGE DOESN'T RESONATE (message-no-resonate)
│  │     │  ├─ OFFER NOT COMPELLING (offer-not-compelling)
│  │     │  ├─ WRONG TIMING (wrong-timing)
│  │     │  ├─ NO CLEAR NEXT STEP (no-clear-next-step)
│  │     │  ├─ CONTENT/CREATIVE WEAK (content-weak)
│  │     │  └─ TRUST SIGNALS MISSING (trust-signals-missing)
│  │     └─ PROSPECTS ENGAGE BUT DON'T BUY (prospects-engage-dont-buy)
│  │        ├─ DON'T TRUST US (dont-trust)
│  │        ├─ DON'T UNDERSTAND OFFER (dont-understand-offer)
│  │        ├─ DON'T BELIEVE IT SOLVES THEIR PROBLEM (dont-believe-solves)
│  │        ├─ PRICE OBJECTION (price-objection)
│  │        ├─ TIMING NOT RIGHT (timing-not-right-sales)
│  │        ├─ SALES PROCESS WEAK (sales-process-weak)
│  │        ├─ COMPETITION BEATS US (competition-beats)
│  │        └─ RISK FEELS TOO HIGH (risk-too-high)
│  └─ CLIENTS BOUGHT BUT CAN'T DELIVER (bought-cant-deliver)
│     ├─ NOT ENOUGH CAPACITY TO FULFILL (not-enough-capacity)
│     │  ├─ FOUNDER DOING EVERYTHING (founder-everything)
│     │  ├─ CAN'T HIRE FAST ENOUGH (cant-hire-fast)
│     │  ├─ CAN'T AFFORD TO HIRE (cant-afford-hire)
│     │  ├─ TRAINING TAKES TOO LONG (training-long)
│     │  ├─ TEAM UNRELIABLE OR UNDERPERFORMING (team-unreliable)
│     │  └─ SCALING CONSTRAINTS (scaling-constraints)
│     ├─ PROCESS BOTTLENECKS (process-bottlenecks)
│     │  ├─ MANUAL PROCESSES TOO SLOW (manual-processes)
│     │  ├─ NO SYSTEMS OR DOCUMENTATION (no-systems)
│     │  ├─ DEPENDENCIES ON KEY PEOPLE (dependencies-key-people)
│     │  ├─ TOOLS AND TECH INADEQUATE (tools-inadequate)
│     │  └─ COORDINATION AND HANDOFF ISSUES (coordination-issues)
│     ├─ QUALITY PROBLEMS (quality-problems)
│     │  ├─ INCONSISTENT DELIVERY (inconsistent-delivery-quality)
│     │  ├─ MISTAKES REQUIRING REWORK (mistakes-rework)
│     │  ├─ SKILLS GAP IN TEAM (skills-gap)
│     │  └─ CLIENT DISSATISFACTION (client-dissatisfaction)
│     ├─ PROJECT MANAGEMENT ISSUES (project-management-issues)
│     │  ├─ SCOPE CREEP EATS PROFIT (scope-creep-profit)
│     │  ├─ TIMELINES SLIP (timelines-slip)
│     │  ├─ COMMUNICATION BREAKDOWNS (communication-breakdowns-pm)
│     │  ├─ RESOURCE ALLOCATION WRONG (resource-allocation-wrong)
│     │  └─ NO PROJECT TRACKING (no-project-tracking)
│     └─ CLIENT MANAGEMENT ISSUES (client-management-issues)
│        ├─ DIFFICULT CLIENTS (difficult-clients)
│        ├─ WRONG CLIENTS (wrong-clients)
│        └─ NO CLIENT BOUNDARIES (no-client-boundaries)
└─ PERSONAL/FOUNDER BOTTLENECKS (personal-bottlenecks)
   └─ TIME TRAPPED (time-trapped)
      ├─ DOING LOW-VALUE WORK (low-value-work)
      ├─ CAN'T DELEGATE (cant-delegate-founder)
      └─ NO DOCUMENTED PROCESSES (no-processes-documented)

Your task: Given a user's description of their business problem, identify the most relevant node ID from the tree above.

Return ONLY a JSON object with this exact format:
{
  "nodeId": "the-node-id",
  "label": "THE NODE LABEL",
  "confidence": 0.95,
  "reasoning": "Brief explanation of why this node matches"
}

Be precise. Match to the most specific relevant node, not just high-level categories.
`;

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
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required' });
    }

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found');
      return res.status(500).json({ 
        error: 'AI service is temporarily unavailable',
        code: 'SERVICE_UNAVAILABLE'
      });
    }

    const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    const prompt = `${treeContext}

User's problem description: "${query}"

Analyze this and return the JSON response.`;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 500,
      }
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse JSON from response
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // Try to extract JSON if wrapped in markdown
      jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonMatch = [jsonMatch[1]];
      }
    }

    if (!jsonMatch) {
      console.error('Failed to parse AI response:', text);
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        details: text
      });
    }

    const aiResponse = JSON.parse(jsonMatch[0]);

    if (!aiResponse.nodeId || !aiResponse.label) {
      return res.status(500).json({ 
        error: 'Invalid AI response format',
        details: aiResponse
      });
    }

    return res.status(200).json({
      nodeId: aiResponse.nodeId,
      label: aiResponse.label,
      confidence: aiResponse.confidence || 0.8,
      reasoning: aiResponse.reasoning || '',
    });

  } catch (error: any) {
    console.error('Error in diagnosis search:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}

