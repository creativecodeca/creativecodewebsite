// Static explanations and analysis for each diagnostic node

export interface NodeExplanation {
  explanation: string;
  relatedProblems: string[];
  impactAnalysis: {
    financialImpact: string;
    severity: string;
    affectedAreas: string[];
    strategicPriority: 'High' | 'Medium' | 'Low';
  };
  timeToSolve: {
    estimate: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    quickWins: string[];
  };
  rootCauseAnalysis: {
    likelyCauses: string[];
    automationPotential: {
      rating: 'High' | 'Medium' | 'Low';
      example?: string;
    };
    pathToRoot: string;
  };
}

export const nodeExplanations: Record<string, NodeExplanation> = {
  // ROOT & MAIN BRANCHES
  'root': {
    explanation: "Your business is in a state of financial scarcity. This isn't just about 'making more sales'—it's a systemic failure where the cash produced by the business is insufficient to cover operations, pay the founder, and reinvest in growth. This creates a high-stress 'survival mode' that prevents strategic thinking.",
    relatedProblems: ['money-slow', 'money-out-fast', 'not-enough-revenue'],
    impactAnalysis: {
      financialImpact: "Complete business failure risk if not addressed.",
      severity: "Critical",
      affectedAreas: ['Everything'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-12 months",
      difficulty: 'Hard',
      quickWins: ["Immediate audit of all expenses", "Pause all non-essential hiring", "Contact late-paying clients today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Broken pricing model", "High churn", "Inefficient fulfillment", "Poor lead quality"],
      automationPotential: {
        rating: 'High',
        example: "End-to-end automated financial dashboard for real-time visibility."
      },
      pathToRoot: "This is the root node."
    }
  },
  'money-slow': {
    explanation: "The 'Cash Gap' problem. You are earning money (accrual) but not receiving it (cash). This often happens when a business scales; you have to pay for the work before the client pays you, draining your reserves even while you grow.",
    relatedProblems: ['payment-terms-long', 'clients-pay-late', 'cash-flow-gaps'],
    impactAnalysis: {
      financialImpact: "Operational paralysis; unable to pay vendors/team on time.",
      severity: "Major",
      affectedAreas: ['Operations', 'Team Trust', 'Vendor Relations'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Implement upfront deposits", "Shorten invoice terms for new contracts", "Automate invoice reminders"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak contract terms", "Manual invoicing", "No late payment penalties"],
      automationPotential: {
        rating: 'High',
        example: "Automated dunning (follow-up) sequences for unpaid invoices."
      },
      pathToRoot: "Slow Money → Not Enough Money (Root)"
    }
  },
  'money-out-fast': {
    explanation: "The 'Leaky Bucket' problem. No matter how much revenue you bring in, the costs of running the business scale at the same or higher rate. This usually points to inefficient operations, high overhead, or low margins.",
    relatedProblems: ['expenses-high', 'margins-low'],
    impactAnalysis: {
      financialImpact: "Profitability death spiral; working harder for less money.",
      severity: "Major",
      affectedAreas: ['Profit Margins', 'Reinvestment Capacity'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-4 months",
      difficulty: 'Medium',
      quickWins: ["Cancel unused SaaS subscriptions", "Review subcontractor rates", "Analyze time spent on rework"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Operational inefficiency", "Lack of budget controls", "Scope creep"],
      automationPotential: {
        rating: 'High',
        example: "Automating repetitive delivery tasks to lower cost-per-fulfillment."
      },
      pathToRoot: "Money Out Fast → Not Enough Money (Root)"
    }
  },
  'not-enough-revenue': {
    explanation: "The 'Growth' problem. The top-line numbers aren't high enough to support the infrastructure you've built. This is typically a Sales, Marketing, or Product-Market Fit issue.",
    relatedProblems: ['not-enough-clients', 'bought-cant-deliver'],
    impactAnalysis: {
      financialImpact: "Stagnation; inability to cover fixed overhead costs.",
      severity: "Major",
      affectedAreas: ['Sales', 'Marketing', 'Founder Morale'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-9 months",
      difficulty: 'Hard',
      quickWins: ["Re-engage past clients with a new offer", "Ask for referrals from happy clients", "Run a limited-time promotion"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor lead generation", "Weak conversion rates", "Market saturation", "High churn"],
      automationPotential: {
        rating: 'High',
        example: "Automated outbound prospecting or lead nurturing system."
      },
      pathToRoot: "Not Enough Revenue → Not Enough Money (Root)"
    }
  },

