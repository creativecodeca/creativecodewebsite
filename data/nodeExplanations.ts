// Static explanations and analysis for each diagnostic node

export interface NodeExplanation {
  explanation: string;
  relatedProblems: string[];
  impactAnalysis: {
    financialImpact: string;
    severity: string;
    affectedAreas: string[];
  };
  timeToSolve: {
    estimate: string;
    difficulty: string;
    prerequisites: string[];
  };
  rootCauseAnalysis: {
    likelyCauses: string[];
    commonTriggers: string[];
    pathToRoot: string;
  };
}

export const nodeExplanations: Record<string, NodeExplanation> = {
  // Root node
  'root': {
    explanation: "The fundamental problem: your business doesn't have enough money to operate comfortably, grow, or weather challenges. This manifests as constant financial stress, inability to invest in growth, and risk of business failure. It's the top-level symptom that branches into three main areas: money coming in too slowly, money going out too fast, or not enough revenue overall.",
    relatedProblems: ['money-slow', 'money-out-fast', 'not-enough-revenue'],
    impactAnalysis: {
      financialImpact: "Business-threatening - can lead to closure",
      severity: "Critical",
      affectedAreas: ['Operations', 'Growth', 'Team morale', 'Client delivery', 'Personal finances']
    },
    timeToSolve: {
      estimate: "3-12 months depending on root causes",
      difficulty: "High - requires systematic diagnosis",
      prerequisites: ['Accurate financial tracking', 'Clear understanding of business model', 'Willingness to make changes']
    },
    rootCauseAnalysis: {
      likelyCauses: ['Broken business model', 'Poor pricing strategy', 'Inefficient operations', 'Weak sales/marketing'],
      commonTriggers: ['Market changes', 'Scaling too fast', 'Lack of financial planning', 'Founder inexperience'],
      pathToRoot: 'This IS the root problem - all other nodes are causes or symptoms'
    }
  },

  // Level 2: Money flow issues
  'money-slow': {
    explanation: "Cash is coming into your business, but at a pace that doesn't match your needs or expenses. This creates constant cash flow stress even when you're technically profitable on paper. The gap between earning money and receiving it strains operations.",
    relatedProblems: ['payment-terms-long', 'clients-pay-late', 'long-sales-cycle', 'cash-flow-gaps'],
    impactAnalysis: {
      financialImpact: "High - creates operational bottlenecks and stress",
      severity: "Major",
      affectedAreas: ['Cash reserves', 'Vendor payments', 'Payroll', 'Growth investments']
    },
    timeToSolve: {
      estimate: "2-6 months",
      difficulty: "Medium - requires process changes",
      prerequisites: ['Understanding cash cycle', 'Client communication', 'Payment system updates']
    },
    rootCauseAnalysis: {
      likelyCauses: ['Industry-standard slow payment terms', 'Weak contract negotiation', 'No payment enforcement', 'Long delivery cycles'],
      commonTriggers: ['Accepting poor terms to win deals', 'Lack of payment follow-up systems', 'Client-side budget approval processes'],
      pathToRoot: 'Slow money in → Not enough money → Business struggles'
    }
  },

  // Add more as needed - this is a template
  'payment-terms-long': {
    explanation: "Your payment terms are structured in a way that creates significant delays between delivering value and receiving payment. Common examples include NET-30, NET-60, or NET-90 terms, or milestone-based payments that are too spread out. This forces you to finance your clients' operations with your own cash.",
    relatedProblems: ['clients-pay-late', 'cash-flow-gaps', 'cant-afford-hire'],
    impactAnalysis: {
      financialImpact: "Medium-High - can require significant working capital",
      severity: "Moderate",
      affectedAreas: ['Working capital needs', 'Credit line usage', 'Growth capacity']
    },
    timeToSolve: {
      estimate: "3-6 months (for new contracts)",
      difficulty: "Medium - requires negotiation skills",
      prerequisites: ['Strong value proposition', 'Confidence in pricing', 'Alternative payment systems']
    },
    rootCauseAnalysis: {
      likelyCauses: ['Industry norms', 'Weak negotiating position', 'Desperate for business', 'No alternative payment options offered'],
      commonTriggers: ['Working with large corporations', 'Government contracts', 'Fear of losing deals'],
      pathToRoot: 'Long payment terms → Money comes in slowly → Not enough cash → Business stress'
    }
  },

  // Placeholder for remaining nodes - you'll fill these in
  'clients-pay-late': {
    explanation: "Even with agreed payment terms, clients consistently pay late, extending your cash cycle even further. This compounds the problem of already-slow cash flow and adds unpredictability.",
    relatedProblems: ['payment-terms-long', 'no-invoice-followup', 'invoices-unclear'],
    impactAnalysis: {
      financialImpact: "Medium - creates cash flow unpredictability",
      severity: "Moderate",
      affectedAreas: ['Cash forecasting', 'Vendor relationships', 'Team confidence']
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Low-Medium - mostly process implementation",
      prerequisites: ['Invoicing system', 'Follow-up process', 'Late payment policies']
    },
    rootCauseAnalysis: {
      likelyCauses: ['No follow-up system', 'Unclear invoices', 'No consequences for late payment', 'Client cash flow issues'],
      commonTriggers: ['Manual invoicing', 'Passive approach to collections', 'Poor client vetting'],
      pathToRoot: 'Late payments → Extended cash cycle → Money comes in slowly → Cash problems'
    }
  }

  // TODO: Add remaining ~150+ nodes with their explanations
  // For now, we'll use a default/fallback system
};

// Default explanation when specific node not found
export const getNodeExplanation = (nodeId: string): NodeExplanation => {
  return nodeExplanations[nodeId] || {
    explanation: "This is a specific business problem that impacts your operations. Understanding this issue and its sub-components will help you identify the root cause and implement effective solutions.",
    relatedProblems: [],
    impactAnalysis: {
      financialImpact: "Varies by business context",
      severity: "To be assessed",
      affectedAreas: ['Operations', 'Revenue', 'Efficiency']
    },
    timeToSolve: {
      estimate: "1-6 months depending on complexity",
      difficulty: "Medium",
      prerequisites: ['Clear diagnosis', 'Resource allocation', 'Implementation plan']
    },
    rootCauseAnalysis: {
      likelyCauses: ['Multiple possible causes - requires deeper analysis'],
      commonTriggers: ['System inefficiencies', 'Resource constraints', 'Process gaps'],
      pathToRoot: 'Part of larger systemic issues affecting business health'
    }
  };
};

