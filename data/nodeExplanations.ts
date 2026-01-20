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

  // MONEY COMES IN SLOWLY - SUB-BRANCHES
  'payment-terms-long': {
    explanation: "You are essentially acting as a bank for your clients, providing them interest-free loans. This is common in enterprise sales but deadly for small businesses without deep pockets.",
    relatedProblems: ['net-terms', 'no-deposits', 'deferred-payment'],
    impactAnalysis: {
      financialImpact: "High cost of capital; cash flow unpredictability.",
      severity: "Moderate",
      affectedAreas: ['Cash Flow', 'Negotiation Power'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate (for new deals)",
      difficulty: 'Medium',
      quickWins: ["Require 50% upfront", "Offer a 2% discount for payment within 7 days", "Switch to weekly billing"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of losing the deal", "Following 'industry standards' blindly", "Weak sales positioning"],
      automationPotential: {
        rating: 'Medium',
        example: "Setting up a payment portal that requires credit card on file before work starts."
      },
      pathToRoot: "Long Terms → Money Slow → Not Enough Money (Root)"
    }
  },
  'clients-pay-late': {
    explanation: "A breakdown in account receivables management. Clients are ignoring your terms because there are no consequences, or your invoicing process is confusing and easy to ignore.",
    relatedProblems: ['no-followup-late', 'invoices-unclear', 'no-penalties'],
    impactAnalysis: {
      financialImpact: "Variable cash flow; high administrative time spent 'chasing' money.",
      severity: "Moderate",
      affectedAreas: ['Accounts Receivable', 'Founder Stress'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Send automated reminders 3 days before due date", "Pick up the phone and call the AP department", "Charge a 5% late fee"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["No clear follow-up process", "Lack of automated dunning", "Client cash flow issues"],
      automationPotential: {
        rating: 'High',
        example: "Automated SMS and email reminders for overdue invoices (Dunning)."
      },
      pathToRoot: "Late Payments → Money Slow → Not Enough Money (Root)"
    }
  },
  'net-terms': {
    explanation: "Your business is trapped in 'Net-30', 'Net-60', or even 'Net-90' terms. You are effectively providing interest-free financing to your clients while you carry the costs of delivery.",
    relatedProblems: ['payment-terms-long', 'cash-flow-gaps'],
    impactAnalysis: {
      financialImpact: "Severe cash drag; business growth is capped by available cash reserves.",
      severity: "Major",
      affectedAreas: ['Working Capital', 'Liquidity'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (New deals)",
      difficulty: 'Medium',
      quickWins: ["Offer 2/10 Net 30 (2% discount for payment in 10 days)", "Switch new clients to Net-15 or Due on Receipt"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Standard industry inertia", "Low negotiation leverage", "Fear of losing clients"],
      automationPotential: {
        rating: 'Medium',
        example: "Invoice factoring or supply chain finance integrations."
      },
      pathToRoot: "Net Terms → Long Terms → Money Slow → Not Enough Money"
    }
  },
  'no-deposits': {
    explanation: "Starting work with zero cash in hand is a major risk. You are assuming 100% of the financial risk while the client assumes zero until delivery.",
    relatedProblems: ['payment-terms-long', 'deferred-payment'],
    impactAnalysis: {
      financialImpact: "Negative cash flow at project start; high risk of non-payment for work already done.",
      severity: "Major",
      affectedAreas: ['Cash Flow', 'Risk Management'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Mandate a 50% non-refundable deposit for all new projects", "Require a small 'Discovery Fee' before scoping"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of sales confidence", "Undefined onboarding process"],
      automationPotential: {
        rating: 'High',
        example: "Automated payment link sent as part of the contract signing process."
      },
      pathToRoot: "No Deposits → Long Terms → Money Slow → Not Enough Money"
    }
  },
  'milestones-spread': {
    explanation: "Payment milestones are too far apart, causing you to go weeks or months without a cash injection while work continues.",
    relatedProblems: ['deferred-payment', 'long-delivery-cycle'],
    impactAnalysis: {
      financialImpact: "Cash flow 'dry spells' during the middle of projects.",
      severity: "Moderate",
      affectedAreas: ['Operational Stability'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Break projects into smaller, weekly or bi-weekly milestones", "Invoiced based on time elapsed rather than just output"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor project scoping", "Inflexible billing software"],
      automationPotential: {
        rating: 'Medium',
        example: "Project management tools that auto-trigger invoices when a task status changes."
      },
      pathToRoot: "Spread Milestones → Long Terms → Money Slow → Not Enough Money"
    }
  },
  'deferred-payment': {
    explanation: "Waiting until the very end of a project to get paid is a recipe for disaster. It incentivizes the client to drag out the 'final 5%' to delay payment.",
    relatedProblems: ['no-deposits', 'long-delivery-cycle'],
    impactAnalysis: {
      financialImpact: "Extremely high risk; zero cash flow during project lifecycle.",
      severity: "Critical",
      affectedAreas: ['Business Survival', 'Risk Management'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Medium',
      quickWins: ["Shift to 'Progress Billing'", "Retain ownership of deliverables until final payment is cleared"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Outdated contract templates", "Fear of client pushback"],
      automationPotential: {
        rating: 'Low',
        example: "This is a contractual change, but can be managed via escrow-style payment tools."
      },
      pathToRoot: "Deferred Payment → Long Terms → Money Slow → Not Enough Money"
    }
  },
  'no-followup-late': {
    explanation: "If you don't ask for the money, people often won't send it. Silence is interpreted as 'it's not urgent.'",
    relatedProblems: ['clients-pay-late', 'no-penalties'],
    impactAnalysis: {
      financialImpact: "Increased Days Sales Outstanding (DSO); higher chance of bad debt.",
      severity: "Moderate",
      affectedAreas: ['Cash Flow', 'Accounts Receivable'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: 'Easy',
      quickWins: ["Setup automated email reminders", "Calendar 'AR Day' once a week for personal follow-up"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder discomfort with 'confrontation'", "No admin support"],
      automationPotential: {
        rating: 'High',
        example: "Automated dunning sequences via tools like Chaser or QuickBooks Online."
      },
      pathToRoot: "No Follow-up → Late Payments → Money Slow → Not Enough Money"
    }
  },
  'invoices-unclear': {
    explanation: "Confusion is the #1 reason for payment delays. If the client doesn't know what they're paying for or how to pay it, the invoice goes to the bottom of the pile.",
    relatedProblems: ['payment-friction', 'wrong-person'],
    impactAnalysis: {
      financialImpact: "Needless delays; high admin time spent answering 'what is this?' emails.",
      severity: "Low",
      affectedAreas: ['Admin Efficiency', 'Client Experience'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: 'Easy',
      quickWins: ["Include clear itemized lists", "Add a 'Pay Now' button directly on the PDF", "Standardize invoice titles"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor billing software", "Rushed data entry"],
      automationPotential: {
        rating: 'High',
        example: "Using standardized invoice templates that pull directly from project management data."
      },
      pathToRoot: "Unclear Invoices → Late Payments → Money Slow → Not Enough Money"
    }
  },
  'no-penalties': {
    explanation: "Without late fees, there is no downside for the client to prioritize other vendors over you. You are the cheapest 'loan' they have.",
    relatedProblems: ['clients-pay-late', 'no-followup-late'],
    impactAnalysis: {
      financialImpact: "Devaluation of your time; incentivizes bad client behavior.",
      severity: "Moderate",
      affectedAreas: ['Client Management', 'Cash Flow'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Update contract to include 1.5% monthly interest on late payments", "Apply a 'grace period' but show the fee on the invoice"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of sounding 'mean'", "Missing from legal templates"],
      automationPotential: {
        rating: 'High',
        example: "Accounting software that auto-applies late fees after X days."
      },
      pathToRoot: "No Penalties → Late Payments → Money Slow → Not Enough Money"
    }
  },
  'payment-friction': {
    explanation: "If you only accept checks or wire transfers, you are making it hard for people to give you money. Every step you add to the process increases the chance of delay.",
    relatedProblems: ['invoices-unclear', 'approval-delays'],
    impactAnalysis: {
      financialImpact: "Slower payment velocity; increased drop-off in small-ticket transactions.",
      severity: "Moderate",
      affectedAreas: ['Sales Conversion', 'Cash Flow'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 hour",
      difficulty: 'Easy',
      quickWins: ["Accept Credit Cards (Stripe/PayPal)", "Enable 'Pay by Bank' (ACH) for lower fees but high convenience"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Avoiding processing fees", "Old-school business mindset"],
      automationPotential: {
        rating: 'High',
        example: "One-click payment portals integrated with your invoicing system."
      },
      pathToRoot: "Payment Friction → Late Payments → Money Slow → Not Enough Money"
    }
  },
  'wrong-person': {
    explanation: "Your invoice is sitting in the inbox of the project manager, not the accounts payable (AP) person who actually cuts the checks.",
    relatedProblems: ['invoices-unclear', 'approval-delays'],
    impactAnalysis: {
      financialImpact: "Hidden delays (invoices 'lost' in internal mail); high friction.",
      severity: "Low",
      affectedAreas: ['Admin Efficiency', 'Client Relations'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Ask for the 'Billing Contact' during onboarding", "CC the project manager but address the invoice to AP"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor onboarding data collection"],
      automationPotential: {
        rating: 'Medium',
        example: "CRM fields specifically for billing contacts that sync to your accounting software."
      },
      pathToRoot: "Wrong Person → Late Payments → Money Slow → Not Enough Money"
    }
  },
  'approval-delays': {
    explanation: "The work is done, but the invoice is stuck in a 'Review' loop inside the client's company. This is especially common with larger corporations.",
    relatedProblems: ['procurement-bottleneck', 'wrong-person'],
    impactAnalysis: {
      financialImpact: "Unpredictable payment dates; project team frustration.",
      severity: "Moderate",
      affectedAreas: ['Operations', 'Cash Flow'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Medium',
      quickWins: ["Get pre-approval on project milestones", "Define 'Auto-Approval' if no feedback is received within 3 days"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear 'Success Criteria'", "Complex client hierarchy"],
      automationPotential: {
        rating: 'Low',
        example: "Client portals where they can sign off on work instantly."
      },
      pathToRoot: "Approval Delays → Late Payments → Money Slow → Not Enough Money"
    }
  },
  'long-sales-cycle': {
    explanation: "Your sales process takes months to close, meaning you have to fund the 'customer acquisition' period for a long time before seeing a return.",
    relatedProblems: ['many-decision-makers', 'proposal-drags', 'budget-approval'],
    impactAnalysis: {
      financialImpact: "High cost of acquisition; unpredictable revenue forecasting.",
      severity: "Major",
      affectedAreas: ['Sales Efficiency', 'Cash Flow'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Qualify leads faster (BANT)", "Implement 'Mutual Action Plans' with prospects", "Offer a 'Starter' product with a 1-week close"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Targeting large enterprise without the resources", "Complex product offering", "Passive sales follow-up"],
      automationPotential: {
        rating: 'High',
        example: "Automated nurture sequences and CRM workflow triggers to keep deals moving."
      },
      pathToRoot: "Long Sales Cycle → Money Slow → Not Enough Money"
    }
  },
  'many-decision-makers': {
    explanation: "The 'Consensus' trap. Too many people have a veto, and no one has a clear 'yes.' Every additional person in the room slows down the deal.",
    relatedProblems: ['procurement-bottleneck', 'approval-delays'],
    impactAnalysis: {
      financialImpact: "Increased sales labor costs; higher chance of deal 'fading' away.",
      severity: "Moderate",
      affectedAreas: ['Sales Cycle', 'Conversion Rate'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: 'Medium',
      quickWins: ["Identify the 'Economic Buyer' early", "Create a 'Business Case' deck they can use internally", "Host a single 'Consensus Meeting' rather than 10 separate ones"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling to committees", "Lack of internal champion"],
      automationPotential: {
        rating: 'Low',
        example: "This is a relationship skill, though digital sales rooms can help keep everyone on the same page."
      },
      pathToRoot: "Many Decision Makers → Long Sales Cycle → Money Slow → Not Enough Money"
    }
  },
  'proposal-drags': {
    explanation: "You are spending days or weeks writing custom proposals. This delay allows the prospect's 'buying heat' to cool down.",
    relatedProblems: ['contract-negotiation', 'manual-processes'],
    impactAnalysis: {
      financialImpact: "Low sales velocity; high unbilled labor costs.",
      severity: "Low",
      affectedAreas: ['Sales Efficiency'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: 'Easy',
      quickWins: ["Use proposal templates", "Create 'Productized' packages with set pricing", "Aim for 'Draft to Delivery' in < 24 hours"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-customizing every deal", "No standardized pricing sheet"],
      automationPotential: {
        rating: 'High',
        example: "Using tools like PandaDoc or Better Proposals to auto-generate docs from CRM data."
      },
      pathToRoot: "Proposal Drags → Long Sales Cycle → Money Slow → Not Enough Money"
    }
  },
  'contract-negotiation': {
    explanation: "Legal 'redlining' is stalling your cash flow. You've won the deal, but you can't start work or get paid because of a clause in the contract.",
    relatedProblems: ['procurement-bottleneck', 'many-decision-makers'],
    impactAnalysis: {
      financialImpact: "Revenue 'stuck' in legal; high legal fees if using outside counsel.",
      severity: "Moderate",
      affectedAreas: ['Sales Velocity', 'Legal Costs'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: 'Medium',
      quickWins: ["Create a 'Standard Terms' sheet with non-negotiable items", "Use a 'Short Form' agreement for smaller deals", "Push for your own paper whenever possible"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-complex contracts", "Dealing with over-zealous legal departments"],
      automationPotential: {
        rating: 'Medium',
        example: "Contract Lifecycle Management (CLM) tools with pre-approved clause libraries."
      },
      pathToRoot: "Contract Negotiating → Long Sales Cycle → Money Slow → Not Enough Money"
    }
  },
  'procurement-bottleneck': {
    explanation: "The 'Black Hole' of corporate buying. Even after the business owner says yes, the 'Procurement' department adds weeks of paperwork, vendor setup, and security reviews.",
    relatedProblems: ['many-decision-makers', 'wrong-person'],
    impactAnalysis: {
      financialImpact: "Delayed project start; high admin burden.",
      severity: "Moderate",
      affectedAreas: ['Admin Efficiency', 'Cash Flow'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Medium',
      quickWins: ["Ask for the 'Procurement Checklist' on day one", "Pre-fill common vendor security questionnaires", "Ask your champion to 'expedite' the setup"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling to large organizations without being a 'preferred vendor'"],
      automationPotential: {
        rating: 'Medium',
        example: "Using AI to auto-fill security and procurement forms based on previous answers."
      },
      pathToRoot: "Procurement Bottleneck → Long Sales Cycle → Money Slow → Not Enough Money"
    }
  },
  'rfp-timeline': {
    explanation: "Request for Proposals (RFPs) are designed for the buyer, not the seller. They are long, competitive, and often have fixed timelines that ignore your cash needs.",
    relatedProblems: ['long-sales-cycle', 'low-margins'],
    impactAnalysis: {
      financialImpact: "Extremely high cost of sale; low win percentage; zero control over timing.",
      severity: "Major",
      affectedAreas: ['Sales Strategy', 'Profitability'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Strategic shift",
      difficulty: 'Hard',
      quickWins: ["Avoid 'Blind' RFPs where you don't know the buyer", "Focus on 'Sole Source' deals through relationship building"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Dependency on government or large institutional contracts"],
      automationPotential: {
        rating: 'High',
        example: "AI-driven RFP response software to cut down the writing time from days to hours."
      },
      pathToRoot: "RFP Timeline → Long Sales Cycle → Money Slow → Not Enough Money"
    }
  },
  'budget-approval': {
    explanation: "The 'Fiscal Year' problem. The client wants to buy, but they are waiting for next quarter's budget to be released. Your cash flow is at the mercy of their CFO's calendar.",
    relatedProblems: ['wrong-timing', 'many-decision-makers'],
    impactAnalysis: {
      financialImpact: "Lumpy revenue; high stress during 'budget season.'",
      severity: "Moderate",
      affectedAreas: ['Revenue Predictability', 'Cash Flow'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Offer a 'Discovery' phase that fits in their current budget", "Sign the contract now for a future start date", "Offer deferred billing terms to lock in the deal"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling high-ticket items without a 'stair-step' entry"],
      automationPotential: {
        rating: 'Low',
        example: "Tracking client fiscal cycles in your CRM to time your outreach perfectly."
      },
      pathToRoot: "Budget Approval → Long Sales Cycle → Money Slow → Not Enough Money"
    }
  },
  'long-delivery-cycle': {
    explanation: "Your fulfillment process takes too long. If you spend 3 months doing work before you can send the final invoice, you are funding 90 days of payroll and overhead on a hope.",
    relatedProblems: ['invoice-after-complete', 'work-takes-long', 'waiting-feedback'],
    impactAnalysis: {
      financialImpact: "Strained working capital; high risk of project 'stalling.'",
      severity: "Major",
      affectedAreas: ['Operations', 'Cash Flow'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Switch to 'Agile' or phase-based delivery", "Implement weekly progress billing", "Standardize your delivery 'stack'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inefficient fulfillment", "Scope creep", "Manual delivery steps"],
      automationPotential: {
        rating: 'High',
        example: "Automating the delivery of work products (e.g., reports, code, setup) to speed up completion."
      },
      pathToRoot: "Long Delivery → Money Slow → Not Enough Money"
    }
  },
  'invoice-after-complete': {
    explanation: "The 'All or Nothing' billing model. You only get paid once everything is 100% done. This gives the client all the leverage to withhold payment for minor tweaks.",
    relatedProblems: ['deferred-payment', 'revisions-delay'],
    impactAnalysis: {
      financialImpact: "Extremely high risk; 'Zero-cash' delivery period.",
      severity: "Critical",
      affectedAreas: ['Business Stability', 'Risk'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Invoiced 50% at start, 25% mid-way, 25% at completion", "Bill for 'Milestones' rather than 'Completion'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak contract terms", "Standardized by client, not you"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated billing triggered by 'Task Completion' in your project management tool."
      },
      pathToRoot: "Invoice After Completion → Long Delivery → Money Slow → Not Enough Money"
    }
  },
  'work-takes-long': {
    explanation: "Your internal efficiency is low. Tasks that should take 2 days are taking 10. This increases your 'cost-per-fulfillment' and slows down cash.",
    relatedProblems: ['inefficient-processes', 'manual-processes', 'rework-mistakes'],
    impactAnalysis: {
      financialImpact: "Decreased net profit; lower throughput (capacity).",
      severity: "Major",
      affectedAreas: ['Efficiency', 'Profitability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Time-track specific tasks to find the leak", "Create SOPs for the most common tasks", "Remove distractions for delivery team"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical debt", "Poorly trained team", "No standardized tools"],
      automationPotential: {
        rating: 'High',
        example: "Using AI and automation to handle repetitive parts of the work delivery."
      },
      pathToRoot: "Work Takes Long → Long Delivery → Money Slow → Not Enough Money"
    }
  },
  'waiting-feedback': {
    explanation: "Your project is ready to move, but it's sitting on the client's desk. This delay is costing you money in overhead every single day.",
    relatedProblems: ['approval-delays', 'long-delivery-cycle'],
    impactAnalysis: {
      financialImpact: "Project 'Stagnation' costs; team context-switching costs.",
      severity: "Moderate",
      affectedAreas: ['Project Timeline', 'Profitability'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: 'Easy',
      quickWins: ["Implement a '3-Day Feedback' clause", "Charge 'Restart Fees' for projects that stall > 14 days", "Schedule the feedback meeting *before* you send the work"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive project management", "Undefined client responsibilities"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated 'Gentle Nudge' sequences if a feedback link hasn't been clicked."
      },
      pathToRoot: "Waiting on Feedback → Long Delivery → Money Slow → Not Enough Money"
    }
  },
  'revisions-delay': {
    explanation: "Unlimited revisions are a profit-killer. Each extra 'tweak' delays the final invoice and increases your cost of delivery.",
    relatedProblems: ['scope-creep-unbilled', 'results-mediocre'],
    impactAnalysis: {
      financialImpact: "Profit margin erosion; delayed final payment.",
      severity: "Moderate",
      affectedAreas: ['Profitability', 'Delivery Timeline'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Limit to 2 revision rounds in the contract", "Charge for revisions beyond the original scope", "Define exactly what a 'revision' is"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Vague 'Success Metrics'", "People-pleasing founder"],
      automationPotential: {
        rating: 'Low',
        example: "Standardized 'Revision Request' forms to ensure feedback is clear and consolidated."
      },
      pathToRoot: "Revisions Delay → Long Delivery → Money Slow → Not Enough Money"
    }
  },
  'third-party-dependencies': {
    explanation: "You are waiting on a vendor, partner, or software provider to do their part before you can finish yours. You are at the mercy of their timeline.",
    relatedProblems: ['long-delivery-cycle', 'manual-processes'],
    impactAnalysis: {
      financialImpact: "Unpredictable project completion; risk of 'Vendor Lock' delays.",
      severity: "Low",
      affectedAreas: ['Operations'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Strategic shift",
      difficulty: 'Medium',
      quickWins: ["Build 'Buffer Time' into schedules", "Have backup vendors for critical path items", "Bring critical dependencies in-house"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of vertical integration", "Poor vendor management"],
      automationPotential: {
        rating: 'Medium',
        example: "Using APIs to monitor third-party status and auto-alert your team of delays."
      },
      pathToRoot: "Third Party Dependencies → Long Delivery → Money Slow → Not Enough Money"
    }
  },
  'seasonal-constraints': {
    explanation: "Your business is only 'active' during certain times of the year. During the 'off-season,' your cash flow drops but your fixed costs remain.",
    relatedProblems: ['lumpy-revenue', 'cash-flow-gaps'],
    impactAnalysis: {
      financialImpact: "Survival risk during 'Down-months'; difficulty maintaining team year-round.",
      severity: "Major",
      affectedAreas: ['Financial Stability', 'Staffing'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: 'Hard',
      quickWins: ["Launch an 'Off-season' product or service", "Switch to annual contracts paid monthly", "Build a 6-month cash reserve"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Niche-specific timing (e.g., Tax, Holidays, Weather)"],
      automationPotential: {
        rating: 'Low',
        example: "Using automation to scale up/down marketing spend based on seasonality."
      },
      pathToRoot: "Seasonal Constraints → Long Delivery → Money Slow → Not Enough Money"
    }
  },
  'cash-flow-gaps': {
    explanation: "The timing of your 'money in' doesn't match the timing of your 'money out.' You are profitable on paper, but your bank account is empty on the 1st of the month.",
    relatedProblems: ['irregular-timing', 'big-expenses-before-payment', 'no-buffer'],
    impactAnalysis: {
      financialImpact: "Inability to pay payroll/taxes on time; high stress.",
      severity: "Critical",
      affectedAreas: ['Business Survival', 'Operations'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Move all outgoing bill dates to the 15th", "Implement a 'Cash Flow Forecast' (13-week model)", "Get a Line of Credit *before* you need it"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Mismatch between AR and AP terms", "No cash reserves"],
      automationPotential: {
        rating: 'High',
        example: "Cash flow forecasting software that syncs with your bank and accounting tools."
      },
      pathToRoot: "Cash Flow Gaps → Money Slow → Not Enough Money"
    }
  },
  'irregular-timing': {
    explanation: "Projects start and end randomly. You can't predict when the next big 'payout' will happen, making it impossible to plan hiring or investment.",
    relatedProblems: ['lumpy-revenue', 'long-sales-cycle'],
    impactAnalysis: {
      financialImpact: "Financial 'Whiplash'; inability to make long-term commitments.",
      severity: "Moderate",
      affectedAreas: ['Strategic Planning', 'Cash Flow'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Medium',
      quickWins: ["Standardize project start dates (e.g., 1st and 15th)", "Focus on 'Retainer' models for predictable timing"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Reactive sales process", "No project pipeline management"],
      automationPotential: {
        rating: 'Medium',
        example: "Project queuing systems and automated onboarding workflows."
      },
      pathToRoot: "Irregular Timing → Cash Flow Gaps → Money Slow → Not Enough Money"
    }
  },
  'big-expenses-before-payment': {
    explanation: "You have to pay for subcontractors, materials, or ads before the client pays you. You are 'financing' the client's project with your own cash.",
    relatedProblems: ['no-deposits', 'delivery-costs-high'],
    impactAnalysis: {
      financialImpact: "Direct drain on liquidity; risk of 'Growing yourself out of business.'",
      severity: "Major",
      affectedAreas: ['Liquidity', 'Profitability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Invoiced for 'Project Startup Costs' immediately", "Align subcontractor payment terms with client payment dates", "Use a business credit card for float (carefully)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poorly negotiated vendor vs client terms"],
      automationPotential: {
        rating: 'Low',
        example: "Automated expense vs revenue tracking to see 'Project Margin' in real-time."
      },
      pathToRoot: "Expenses Before Payment → Cash Flow Gaps → Money Slow → Not Enough Money"
    }
  },
  'no-buffer': {
    explanation: "You are living 'paycheck to paycheck' in the business. One late payment from a client or one unexpected expense could bankrupt you.",
    relatedProblems: ['cash-flow-gaps', 'expenses-high'],
    impactAnalysis: {
      financialImpact: "Zero 'Sleep-at-night' factor; high risk of business failure.",
      severity: "Critical",
      affectedAreas: ['Overall Stability', 'Founder Health'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: 'Hard',
      quickWins: ["Setup a separate 'Tax/Reserve' savings account", "Transfer 1-5% of every invoice to reserves immediately (Profit First)", "Cut one luxury expense today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-spending on growth", "Low margins", "Personal and business finances mixed"],
      automationPotential: {
        rating: 'High',
        example: "Automated 'Bank Rules' that sweep a percentage of income into a savings account."
      },
      pathToRoot: "No Buffer → Cash Flow Gaps → Money Slow → Not Enough Money"
    }
  },
  'lumpy-revenue': {
    explanation: "The 'Feast or Famine' cycle. You have $50k months followed by $5k months. This makes it impossible to build a team or invest in systems.",
    relatedProblems: ['seasonal-constraints', 'irregular-timing', 'no-upsell-process'],
    impactAnalysis: {
      financialImpact: "Extreme stress; high turnover of staff during 'famine' periods.",
      severity: "Major",
      affectedAreas: ['Sustainability', 'Revenue Growth'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "4-8 months",
      difficulty: 'Hard',
      quickWins: ["Introduce 'Maintenance' or 'Support' packages", "Standardize your offer into a recurring model", "Incentivize annual payments"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling 'One-off' projects only", "Lack of recurring value proposition"],
      automationPotential: {
        rating: 'High',
        example: "Automated recurring billing and subscription management tools."
      },
      pathToRoot: "Lumpy Revenue → Cash Flow Gaps → Money Slow → Not Enough Money"
    }
  },

  // EXPENSES TOO HIGH - SUB-BRANCHES
  'overhead-high': {
    explanation: "Fixed costs that exist regardless of how many sales you make. This 'high floor' creates immense pressure to sell constantly just to break even.",
    relatedProblems: ['expensive-office', 'many-subscriptions', 'admin-staff'],
    impactAnalysis: {
      financialImpact: "Reduced margin for error; slow recovery in downturns.",
      severity: "Moderate",
      affectedAreas: ['Fixed Costs', 'Profitability'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Audit all SaaS spending", "Negotiate rent or move to remote", "Outsource admin tasks to lower-cost regions"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Ego-driven spending (office)", "Subscription bloat", "Over-hiring administrative roles"],
      automationPotential: {
        rating: 'High',
        example: "Using AI agents/automation to replace manual administrative roles."
      },
      pathToRoot: "High Overhead → Expenses High → Money Out Fast → Not Enough Money (Root)"
    }
  },

  // MARGINS LOW - SUB-BRANCHES
  'prices-low': {
    explanation: "Pricing is the biggest lever in business. If you are 'too busy' but 'don't have enough money', your prices are almost certainly too low. You are undercutting your own future for the sake of winning low-value work.",
    relatedProblems: ['afraid-raise-prices', 'competing-price', 'undervaluing-expertise'],
    impactAnalysis: {
      financialImpact: "Direct hit to bottom line; inability to afford high-quality help.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Service Quality', 'Founder Burnout'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (next quote)",
      difficulty: 'Medium',
      quickWins: ["Increase next quote by 20%", "Stop offering discounts", "Bundle services to hide individual unit costs"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Imposter syndrome", "Lack of differentiation", "Targeting the 'cheap' segment of the market"],
      automationPotential: {
        rating: 'Low',
        example: "Pricing is a strategic/mindset shift, though you can use tools to analyze competitor pricing."
      },
      pathToRoot: "Low Prices → Low Margins → Money Out Fast → Not Enough Money (Root)"
    }
  },

  // PERSONAL/FOUNDER BOTTLENECKS
  'personal-bottlenecks': {
    explanation: "The business is entirely dependent on the founder. If you stop working, the money stops coming. You haven't built a business; you've built a high-stress job that you can't quit.",
    relatedProblems: ['time-trapped', 'disorganized-chaotic', 'burnout-energy'],
    impactAnalysis: {
      financialImpact: "Capped revenue (limited by founder's hours); zero enterprise value (unsellable).",
      severity: "Major",
      affectedAreas: ['Scalability', 'Founder Health', 'Exit Potential'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-18 months",
      difficulty: 'Hard',
      quickWins: ["Identify top 3 recurring tasks and record a Loom of how to do them", "Hire a part-time VA for 5 hours/week", "Schedule 4 hours of 'CEO time' per week"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of SOPs", "Hero complex", "Poor delegation skills", "Hiring late"],
      automationPotential: {
        rating: 'High',
        example: "Automating the 'founder's touch'—using AI to draft replies or triage emails."
      },
      pathToRoot: "Founder Bottleneck → Capacity Issues → Not Enough Revenue (Root)"
    }
  },
  'burnout-energy': {
    explanation: "The founder's energy is the business's most valuable asset. When you are burned out, your decision-making quality drops, you miss opportunities, and you eventually resent the business.",
    relatedProblems: ['working-too-much', 'poor-boundaries', 'health-neglected', 'emotionally-exhausted'],
    impactAnalysis: {
      financialImpact: "Hidden costs of poor decisions and missed sales; eventual complete operational collapse.",
      severity: "Critical",
      affectedAreas: ['Leadership', 'Strategic Vision', 'Team Culture'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Medium',
      quickWins: ["Book a 3-day weekend with zero work", "Delete Slack/Email from phone after 6 PM", "Outsource one high-friction task immediately"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["No boundaries", "Inability to say 'no'", "Lack of operational systems", "Isolation"],
      automationPotential: {
        rating: 'Medium',
        example: "Automating client communication so the business 'talks' while you sleep/rest."
      },
      pathToRoot: "Burnout → Personal Bottleneck → Capacity Issues → Not Enough Money (Root)"
    }
  },

  // NOT GETTING NEW CLIENTS
  'not-getting-new': {
    explanation: "The top-of-funnel problem. Your message isn't reaching enough of the right people, or the market is unaware of your existence. This is a volume and visibility issue.",
    relatedProblems: ['cant-find-prospects', 'prospects-dont-know'],
    impactAnalysis: {
      financialImpact: "Zero growth; reliance on declining referral base.",
      severity: "Major",
      affectedAreas: ['Sales pipeline', 'Market Share'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Medium',
      quickWins: ["Launch an outbound experiment", "Partner with a non-competing brand", "Run a targeted ad campaign"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak marketing activity", "No outbound strategy", "Invisible online presence"],
      automationPotential: {
        rating: 'High',
        example: "Automated LinkedIn outreach or lead scraper bots."
      },
      pathToRoot: "Marketing Problem → Not Enough Revenue (Root)"
    }
  },
  'seo-nonexistent': {
    explanation: "You are invisible to people actively searching for solutions. You are losing 'intent-based' traffic to competitors who show up on page 1.",
    relatedProblems: ['not-showing-search', 'no-website'],
    impactAnalysis: {
      financialImpact: "High opportunity cost; paying for ads that could be free traffic.",
      severity: "Moderate",
      affectedAreas: ['Acquisition Cost', 'Organic Reach'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: 'Hard',
      quickWins: ["Claim Google My Business profile", "Optimize page titles for keywords", "Fix broken links"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical SEO errors", "Zero content strategy", "No backlink profile"],
      automationPotential: {
        rating: 'Medium',
        example: "AI-driven keyword research and automated SEO audit tools."
      },
      pathToRoot: "SEO → Visibility → New Clients → Revenue (Root)"
    }
  },

  // SALES PROCESS WEAK
  'sales-process-weak': {
    explanation: "You are getting leads, but you are failing to convert them into paying clients. There are gaps in your discovery, follow-up, or closing techniques.",
    relatedProblems: ['not-qualifying', 'not-closing', 'following-up-inconsistently'],
    impactAnalysis: {
      financialImpact: "Massive waste of marketing spend; low ROI on lead generation.",
      severity: "Major",
      affectedAreas: ['Conversion Rate', 'Profitability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Script your discovery calls", "Set a 24-hour follow-up rule", "Record and review calls"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of sales training", "No CRM usage", "Fear of rejection"],
      automationPotential: {
        rating: 'High',
        example: "Automated CRM follow-up reminders and appointment booking bots."
      },
      pathToRoot: "Sales Gap → Not Enough Revenue (Root)"
    }
  },

  // PROCESS BOTTLENECKS
  'manual-processes': {
    explanation: "Human hands are doing work that software should be doing. This is slow, expensive, and error-prone. It limits your capacity to scale beyond your current headcount.",
    relatedProblems: ['everything-by-hand', 'no-automation', 'data-entry-overwhelming'],
    impactAnalysis: {
      financialImpact: "High labor costs; unable to take on more work without hiring.",
      severity: "Major",
      affectedAreas: ['Efficiency', 'Scalability', 'Gross Margin'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Map out the workflow", "Identify the 'dumbest' repetitive task", "Solve it with Zapier/Make"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of technical awareness", "Rushing to deliver instead of building systems", "Technical debt"],
      automationPotential: {
        rating: 'High',
        example: "Connecting your sales, fulfillment, and accounting apps via an integration platform."
      },
      pathToRoot: "Manual Work → Bottlenecks → Capacity Issues → Revenue (Root)"
    }
  },
  'no-systems': {
    explanation: "The business relies on 'Tribal Knowledge.' Every project is a bespoke creation, making quality inconsistent and delegating impossible. You are re-inventing the wheel every Monday morning.",
    relatedProblems: ['no-sops', 'tribal-knowledge', 'cant-scale-without-founder'],
    impactAnalysis: {
      financialImpact: "High cost of rework; slow training of new team members.",
      severity: "Critical",
      affectedAreas: ['Operations', 'Quality Control', 'Asset Value'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: 'Hard',
      quickWins: ["Record Loom videos of every task today", "Create a 'how-to' index in Notion", "Start a simple checklist for quality"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder hero syndrome", "Lack of operational discipline", "Scale exceeding infrastructure"],
      automationPotential: {
        rating: 'Medium',
        example: "Using AI to generate draft SOPs based on your recorded Loom videos."
      },
      pathToRoot: "No Systems → Quality/Capacity Issues → Revenue (Root)"
    }
  },

  // ORGANIZATION / CHAOS
  'disorganized-chaotic': {
    explanation: "The 'Mental Load' problem. Information is scattered, tasks are forgotten, and everything feels urgent. You are reacting to the business rather than leading it.",
    relatedProblems: ['no-systems-organization', 'poor-prioritization', 'time-management-broken'],
    impactAnalysis: {
      financialImpact: "Missed deadlines; dropped leads; constant firefighting costs.",
      severity: "Major",
      affectedAreas: ['Efficiency', 'Mental Clarity', 'Team Trust'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Choose ONE project management tool", "Spend 30 mins planning tomorrow every evening", "Clean your physical/digital workspace"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of focus", "Technical debt in tools", "Personal habits of founder"],
      automationPotential: {
        rating: 'High',
        example: "Centralizing all incoming communications into a single unified inbox/dashboard."
      },
      pathToRoot: "Chaos → Founder Bottleneck → Capacity → Not Enough Money (Root)"
    }
  },
  'waste-inefficiency': {
    explanation: "Invisible profit eaters. Money is leaking through redundant systems, unused subscriptions, and a lack of resource discipline. It's the 'death by a thousand cuts' scenario.",
    relatedProblems: ['unused-subscriptions', 'duplicate-systems', 'team-idle'],
    impactAnalysis: {
      financialImpact: "Erosion of gross margin; working harder for less net profit.",
      severity: "Moderate",
      affectedAreas: ['Profitability', 'Operational Discipline'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Audit bank statements for 12 months", "Downgrade underused software tiers", "Consolidate toolstack"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of financial tracking", "Decision-making without ROI analysis", "Rapid growth without cleanup"],
      automationPotential: {
        rating: 'High',
        example: "Automated subscription tracking and usage alerts."
      },
      pathToRoot: "Waste → High Expenses → Money Out Fast → Not Enough Money (Root)"
    }
  },
  'clients-churned': {
    explanation: "The 'Hole in the Bucket' problem. You are acquiring clients, but they aren't staying. This forces you to constantly find new business just to stay at zero growth.",
    relatedProblems: ['why-left', 'no-retention-system'],
    impactAnalysis: {
      financialImpact: "Unsustainable acquisition costs; low Customer Lifetime Value (LTV).",
      severity: "Major",
      affectedAreas: ['Growth Rate', 'Brand Reputation', 'LTV'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Survey churned clients for 'Exit Interviews'", "Fix the single biggest quality complaint", "Implement a 30-day success check-in"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Product quality issues", "Weak onboarding", "Poor customer support", "Competitor superiority"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated churn-risk alerts based on low product usage or late payments."
      },
      pathToRoot: "Churn → Not Enough Total Clients → Not Enough Revenue (Root)"
    }
  },
  'not-enough-capacity': {
    explanation: "You have sold the work, but you don't have the people, time, or infrastructure to fulfill it. You are a victim of your own success.",
    relatedProblems: ['founder-everything', 'cant-hire-fast', 'cant-afford-hire'],
    impactAnalysis: {
      financialImpact: "Missed revenue (capped); poor service quality due to rushing.",
      severity: "Major",
      affectedAreas: ['Fulfillment', 'Team Burnout', 'Customer Satisfaction'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-9 months",
      difficulty: 'Hard',
      quickWins: ["Increase prices to slow demand while increasing revenue", "Hire a temporary contractor for backlog", "Audit delivery for time-wasters"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Under-hiring", "Low operational efficiency", "Scaling too fast"],
      automationPotential: {
        rating: 'High',
        example: "Using AI/automation to handle 20-40% of the fulfillment tasks without human intervention."
      },
      pathToRoot: "Capacity Gap → Delivery Failure → Revenue Risk (Root)"
    }
  },
  'quality-problems': {
    explanation: "Inconsistent delivery is killing your reputation and causing rework costs. Every client gets a different version of your service, most of which are below standard.",
    relatedProblems: ['inconsistent-delivery-quality', 'mistakes-rework', 'client-dissatisfaction'],
    impactAnalysis: {
      financialImpact: "High rework costs; zero referrals; eventual brand damage.",
      severity: "Major",
      affectedAreas: ['Operations', 'Brand Value', 'Profitability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Create a 'Definition of Done' checklist", "Implement a mandatory second-eye review", "Standardize the delivery tools"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["No SOPs", "Rushing due to capacity issues", "Lack of team training"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated QA checks or validation scripts for technical work."
      },
      pathToRoot: "Quality Issues → Churn/Rework → Profit/Revenue Risk (Root)"
    }
  },
  'low-value-work': {
    explanation: "The founder is doing tasks that could be done for $20/hour. This is an expensive mistake. You are 'busy' but not 'productive'.",
    relatedProblems: ['admin-busywork', 'work-others-cheaper', 'email-meeting-overload'],
    impactAnalysis: {
      financialImpact: "Opportunity cost of thousands per hour; strategic stagnation.",
      severity: "Major",
      affectedAreas: ['Founder Productivity', 'Strategic Growth'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: 'Medium',
      quickWins: ["Calculate your hourly rate (Revenue / Hours)", "Hire a VA for inbox management", "Set 'Off-Limit' hours for admin tasks"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Control issues", "Lack of delegation skills", "Hiring late"],
      automationPotential: {
        rating: 'High',
        example: "AI-based email triage and automated appointment scheduling."
      },
      pathToRoot: "Low-Value Work → Founder Bottleneck → Capacity Issues → Revenue Risk (Root)"
    }
  },
  'expenses-high': {
    explanation: "Your business is spending too much relative to its revenue. This can be due to high overhead, inefficient delivery, or excessive acquisition costs.",
    relatedProblems: ['overhead-high', 'delivery-costs-high', 'acquisition-costs-high', 'waste-inefficiency'],
    impactAnalysis: {
      financialImpact: "Direct erosion of net profit; lower runway.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Net Margin'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Audit all expenses", "Identify high-cost vendors", "Review team efficiency"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of budget controls", "Inefficient processes", "Scaling too fast"],
      automationPotential: {
        rating: 'High',
        example: "Automated expense tracking and approval workflows."
      },
      pathToRoot: "Expenses High → Money Out Fast → Not Enough Money (Root)"
    }
  },
  'acquisition-costs-high': {
    explanation: "You are paying too much to get a new customer. If your CAC (Customer Acquisition Cost) is close to your LTV (Lifetime Value), you are effectively losing money on every sale once overhead is factored in.",
    relatedProblems: ['ads-expensive', 'sales-process-long', 'high-churn'],
    impactAnalysis: {
      financialImpact: "Negative ROI on marketing; business cannot grow profitably.",
      severity: "Major",
      affectedAreas: ['Marketing Efficiency', 'Profitability', 'Scalability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Hard',
      quickWins: ["Stop all non-performing ad channels", "Focus on referrals and organic content", "Improve the conversion rate of your landing page"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor targeting", "Weak offer", "Low conversion rate in sales funnel"],
      automationPotential: {
        rating: 'High',
        example: "Automated lead scoring and attribution tracking to identify 'cheap' vs 'expensive' channels."
      },
      pathToRoot: "High Acquisition Cost → Expenses High → Money Out Fast"
    }
  },
  'ads-expensive': {
    explanation: "Your cost-per-click or cost-per-lead is too high. You are competing in a saturated market without a unique 'Hook' to drive down costs.",
    relatedProblems: ['acquisition-costs-high', 'not-getting-new'],
    impactAnalysis: {
      financialImpact: "Marketing budget 'burn'; unable to scale ad spend profitably.",
      severity: "Moderate",
      affectedAreas: ['Marketing ROI', 'Cash Flow'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Medium',
      quickWins: ["Test 5 new creative hooks", "Narrow your audience targeting", "Retarget existing website visitors instead of only cold traffic"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Bad creative", "Broad targeting", "Inefficient ad platform settings"],
      automationPotential: {
        rating: 'High',
        example: "Using AI to generate and test hundreds of ad variations (e.g., AdCreative.ai)."
      },
      pathToRoot: "Expensive Ads → Acquisition Cost → Money Out Fast"
    }
  },
  'sales-process-long': {
    explanation: "Time is money. Every hour spent on a prospect who doesn't buy is a direct expense. If your sales cycle is too long, you are 'carrying' the labor cost of sales for too long.",
    relatedProblems: ['long-sales-cycle', 'acquisition-costs-high'],
    impactAnalysis: {
      financialImpact: "Increased cost of sale; lower sales velocity.",
      severity: "Moderate",
      affectedAreas: ['Sales Efficiency', 'Profitability'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2-3 months",
      difficulty: 'Medium',
      quickWins: ["Set a 48-hour deadline for proposal sign-off", "Automate follow-ups after discovery calls", "Kill 'Unqualified' deals early"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of sales training", "No sense of urgency in the offer"],
      automationPotential: {
        rating: 'High',
        example: "Automated CRM reminders and nurturing to keep leads moving without manual effort."
      },
      pathToRoot: "Long Sales Process → Acquisition Cost → Money Out Fast"
    }
  },
  'high-churn': {
    explanation: "Getting a customer is expensive; keeping them is cheap. If you lose clients as fast as you get them, you are on a treadmill that never ends.",
    relatedProblems: ['clients-churned', 'acquisition-costs-high', 'quality-problems'],
    impactAnalysis: {
      financialImpact: "Low LTV; massive pressure on marketing to replace lost revenue.",
      severity: "Critical",
      affectedAreas: ['LTV', 'Brand Reputation', 'Growth'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Implement a 30-day 'Success' check-in", "Automate onboarding to ensure early wins", "Survey every churning client to find the root cause"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Bad onboarding", "Product/service doesn't meet expectations", "Weak relationship management"],
      automationPotential: {
        rating: 'Medium',
        example: "Using 'Customer Health' scores to trigger manual intervention before a client cancels."
      },
      pathToRoot: "High Churn → Acquisition Cost → Money Out Fast"
    }
  },
  'agency-fees': {
    explanation: "You are paying a marketing agency a flat fee, but they aren't delivering a measurable ROI. They are an expense, not an investment.",
    relatedProblems: ['acquisition-costs-high', 'waste-inefficiency'],
    impactAnalysis: {
      financialImpact: "Direct hit to profit; high opportunity cost of misspent capital.",
      severity: "Moderate",
      affectedAreas: ['Profitability', 'Marketing Strategy'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Audit agency performance against 'Sales' (not just 'Leads')", "Switch to a performance-based fee structure", "Bring marketing in-house if volume justifies it"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive management of vendors", "Lack of clear KPIs"],
      automationPotential: {
        rating: 'Low',
        example: "Setting up a real-time dashboard to monitor agency performance daily."
      },
      pathToRoot: "Agency Fees → Acquisition Cost → Money Out Fast"
    }
  },
  'sales-compensation': {
    explanation: "Your sales team's base salary is too high, or your commission structure doesn't align with profit. You are paying them for 'Revenue' even if it's 'Unprofitable Revenue.'",
    relatedProblems: ['acquisition-costs-high', 'margins-low'],
    impactAnalysis: {
      financialImpact: "Incentivizes the 'wrong' kind of sales; high overhead risk during slow months.",
      severity: "Moderate",
      affectedAreas: ['Sales Culture', 'Profitability'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3 months (Legal/Team timing)",
      difficulty: 'Hard',
      quickWins: ["Switch to 'Commission on Gross Profit' rather than Revenue", "Implement a 'Clawback' clause for churned clients", "Reduce base, increase upside for top performers"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Outdated compensation model", "Fear of losing sales talent"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated commission calculators that sync with your CRM and accounting software."
      },
      pathToRoot: "Sales Compensation → Acquisition Cost → Money Out Fast"
    }
  },
  'events-no-roi': {
    explanation: "Trade shows, conferences, and sponsorships. They are expensive and often provide 'Brand Awareness' but zero 'Direct Sales.'",
    relatedProblems: ['acquisition-costs-high', 'waste-inefficiency'],
    impactAnalysis: {
      financialImpact: "High unmeasured marketing spend; travel and booth costs eat profit.",
      severity: "Low",
      affectedAreas: ['Marketing ROI'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Calculate the 'Cost Per Lead' for the last event", "Stop attending 'Networking' events and focus on 'Selling' events", "Use a 'Digital-First' approach to networking"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Following the competition", "Founder desire for 'Visibility' over Profit"],
      automationPotential: {
        rating: 'Medium',
        example: "Using automated lead capture and follow-up tools at events to ensure zero leakage."
      },
      pathToRoot: "Events No ROI → Acquisition Cost → Money Out Fast"
    }
  },
  'content-costs': {
    explanation: "You are spending too much on high-production content (video, design) that doesn't actually convert. High quality doesn't always mean high ROI.",
    relatedProblems: ['acquisition-costs-high', 'waste-inefficiency'],
    impactAnalysis: {
      financialImpact: "Wasted creative budget; over-engineering your marketing.",
      severity: "Low",
      affectedAreas: ['Marketing Strategy'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: 'Easy',
      quickWins: ["Switch to 'User-Generated' style content (it often converts better)", "Use AI for initial content drafts and design", "Repurpose one 'Big' piece of content into 20 'Small' ones"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Perfectionism", "Misunderstanding of what 'engages' the modern audience"],
      automationPotential: {
        rating: 'High',
        example: "Using AI tools (Midjourney, ChatGPT, Canva Magic) to produce high-quality assets at 1/10th the cost."
      },
      pathToRoot: "Content Costs → Acquisition Cost → Money Out Fast"
    }
  },
  'commission-unsustainable': {
    explanation: "You are paying out so much in commission or affiliate fees that there is nothing left for the business. You've incentivized growth at the cost of survival.",
    relatedProblems: ['acquisition-costs-high', 'margins-low'],
    impactAnalysis: {
      financialImpact: "Negative net margin on sales; risk of 'Growing to Bankruptcy.'",
      severity: "Major",
      affectedAreas: ['Profitability', 'Cash Flow'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Medium',
      quickWins: ["Cap commissions based on profit margins", "Implement longer payout windows to ensure client stays", "Review affiliate tiers and cut the bottom performers"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Aggressive early-stage growth strategy that was never adjusted"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated affiliate tracking that only pays out on 'Cleared' funds."
      },
      pathToRoot: "Unsustainable Commission → Acquisition Cost → Money Out Fast"
    }
  },
  'unused-subscriptions': {
    explanation: "Software that you are paying for but haven't logged into in 30 days. It's an absolute waste of cash.",
    relatedProblems: ['many-subscriptions', 'waste-inefficiency'],
    impactAnalysis: {
      financialImpact: "Pure profit leakage; zero ROI.",
      severity: "Low",
      affectedAreas: ['Fixed Costs'],
      strategicPriority: 'Easy'
    },
    timeToSolve: {
      estimate: "1 hour",
      difficulty: 'Easy',
      quickWins: ["Cancel all unused tools today", "Downgrade seats for tools you only use occasionally", "Use 'Free' versions until the need is proven"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of financial oversight", "Forgotten trials"],
      automationPotential: {
        rating: 'High',
        example: "Software like 'Subly' or simple bank statement analysis tools."
      },
      pathToRoot: "Unused Subs → Waste → Money Out Fast"
    }
  },
  'duplicate-systems': {
    explanation: "You are paying for two tools that do the same thing (e.g., two CRMs, two project management tools, or Slack + Teams).",
    relatedProblems: ['many-subscriptions', 'waste-inefficiency'],
    impactAnalysis: {
      financialImpact: "Redundant spending; data silo confusion; team frustration.",
      severity: "Low",
      affectedAreas: ['Efficiency', 'Fixed Costs'],
      strategicPriority: 'Easy'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: 'Easy',
      quickWins: ["Pick the 'Winner' and migrate everyone to it today", "Standardize the 'Official' toolstack for the team", "Cancel the redundant service"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Organic, unmanaged growth", "Lack of central technical leadership"],
      automationPotential: {
        rating: 'Medium',
        example: "Using integration tools to centralize data rather than paying for two systems."
      },
      pathToRoot: "Duplicate Systems → Waste → Money Out Fast"
    }
  },
  'team-idle': {
    explanation: "Your team is waiting for work. You are paying for their hours, but you aren't providing the pipeline to fill them. This is the most expensive type of waste.",
    relatedProblems: ['waste-inefficiency', 'not-enough-revenue'],
    impactAnalysis: {
      financialImpact: "Wasted labor budget; decreased morale; low efficiency.",
      severity: "Major",
      affectedAreas: ['Labor Costs', 'Team Morale', 'Profitability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Medium',
      quickWins: ["Increase marketing spend immediately to fill the gap", "Assign 'Deep Work' projects or SOP documentation during downtime", "Switch to part-time/variable staffing models"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor capacity planning", "Famine period in sales"],
      automationPotential: {
        rating: 'Medium',
        example: "Resource management software that shows team utilization in real-time."
      },
      pathToRoot: "Team Idle → Waste → Money Out Fast"
    }
  },
  'overbuying-inventory': {
    explanation: "Cash is sitting on a shelf. You've bought supplies, products, or materials that you won't use for months. This is cash that could be used for growth.",
    relatedProblems: ['waste-inefficiency', 'materials-supplies'],
    impactAnalysis: {
      financialImpact: "Liquidity trap; risk of obsolescence/spoilage.",
      severity: "Moderate",
      affectedAreas: ['Cash Flow', 'Working Capital'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: 'Easy',
      quickWins: ["Halt all new ordering", "Run a 'Clearance' sale on old stock", "Shift to 'Just-in-Time' fulfillment"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of 'Out of stock'", "Buying in bulk for discounts that aren't worth the cash drag"],
      automationPotential: {
        rating: 'High',
        example: "Inventory forecasting software that syncs with sales data."
      },
      pathToRoot: "Overbuying → Waste → Money Out Fast"
    }
  },
  'poor-resource-allocation': {
    explanation: "You are putting your best people on your smallest clients, or spending your budget on the wrong priorities. You are 'polishing the brass on the Titanic.'",
    relatedProblems: ['waste-inefficiency', 'low-value-work'],
    impactAnalysis: {
      financialImpact: "Opportunity cost of missed growth; inefficient use of capital.",
      severity: "Major",
      affectedAreas: ['Strategic Focus', 'ROI'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Medium',
      quickWins: ["Apply the 80/20 rule: focus 80% of resources on top 20% of clients", "Stop all 'Minor' projects and focus on the 'Big' lever", "Review the last 5 decisions—did they lead to revenue?"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear strategic goals", "Reactive management style"],
      automationPotential: {
        rating: 'Low',
        example: "This is a leadership decision, but data-driven reporting can guide the choice."
      },
      pathToRoot: "Poor Allocation → Waste → Money Out Fast"
    }
  },
  'afraid-raise-prices': {
    explanation: "The 'Fear of No.' You think that if you raise prices, you'll lose everyone. In reality, you'll lose the clients you probably didn't want anyway.",
    relatedProblems: ['prices-low', 'undervalue-expertise'],
    impactAnalysis: {
      financialImpact: "Self-imposed revenue ceiling; under-resourced delivery.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Confidence'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Hard (Mindset)',
      quickWins: ["Raise prices by 10% for the next lead and see what happens", "Blame the increase on 'rising costs' or 'new features'", "Test a 'Premium' version of your current offer"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Imposter syndrome", "Lack of clear differentiation"],
      automationPotential: {
        rating: 'Low',
        example: "N/A - this is a psychological and strategic hurdle."
      },
      pathToRoot: "Fear of Price Increase → Low Prices → Low Margins → Money Out Fast"
    }
  },
  'competing-price': {
    explanation: "The 'Race to the Bottom.' If your only differentiator is 'I'm cheaper,' you will eventually be beaten by someone even more desperate or automated than you.",
    relatedProblems: ['prices-low', 'commoditized-service'],
    impactAnalysis: {
      financialImpact: "Profit margins compressed to zero; unable to hire quality staff.",
      severity: "Critical",
      affectedAreas: ['Sustainability', 'Brand Positioning'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Find ONE thing you do better than everyone else and lead with it", "Stop advertising your price; advertise your results", "Niche down to a more expensive market"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of unique value proposition", "Selling in a commoditized market"],
      automationPotential: {
        rating: 'Low',
        example: "Automation can lower your costs to *win* a price war, but it's better to exit the war entirely."
      },
      pathToRoot: "Competing on Price → Low Prices → Low Margins → Money Out Fast"
    }
  },
  'dont-know-costs': {
    explanation: "You are guessing your pricing. You don't know your Cost of Goods Sold (COGS), labor cost per project, or client acquisition cost.",
    relatedProblems: ['prices-low', 'margins-low'],
    impactAnalysis: {
      financialImpact: "Inadvertently losing money on some projects while 'thinking' they are profitable.",
      severity: "Major",
      affectedAreas: ['Financial Oversight', 'Profitability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: 'Medium',
      quickWins: ["Audit the last 3 projects for actual 'Hours Spent' vs 'Fee'", "Calculate your 'Breakeven' hourly rate", "Factor in software and overhead into every quote"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of bookkeeping discipline", "Simple 'Top-line' revenue focus"],
      automationPotential: {
        rating: 'High',
        example: "Using project-based accounting tools like Harvest or QuickBooks Projects."
      },
      pathToRoot: "Unknown Costs → Low Prices → Low Margins → Money Out Fast"
    }
  },
  'underestimate-time': {
    explanation: "The 'Optimism Bias.' You think it will take 10 hours; it takes 30. You are effectively paying the client to work for them.",
    relatedProblems: ['prices-low', 'taking-too-long'],
    impactAnalysis: {
      financialImpact: "Massive unbilled labor cost; project timelines slipping.",
      severity: "Moderate",
      affectedAreas: ['Profitability', 'Scheduling'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Track every minute for a week", "Add a '20% Buffer' to every time estimate automatically", "Use historic data to quote, not your 'gut'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of time-tracking data", "Over-eagerness to win the deal"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated time-tracking tools (like Toggl or RescueTime) that provide data-driven estimates."
      },
      pathToRoot: "Underestimating Time → Low Prices → Low Margins → Money Out Fast"
    }
  },
  'too-many-discounts': {
    explanation: "Every discount comes directly out of your profit. A 10% discount on a project with 30% margin is a 33% hit to your net profit.",
    relatedProblems: ['prices-low', 'competing-price'],
    impactAnalysis: {
      financialImpact: "Pure profit erosion; devalues your service in the client's eyes.",
      severity: "Moderate",
      affectedAreas: ['Profitability', 'Brand Value'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Stop offering discounts to 'Get the Deal'", "Offer 'Added Value' instead of 'Lower Price'", "Only discount in exchange for something else (e.g., faster payment, longer term)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of sales negotiation skills", "Low confidence in value"],
      automationPotential: {
        rating: 'Low',
        example: "Removing 'Discount' fields from your automated checkout or proposal tools."
      },
      pathToRoot: "Too Many Discounts → Low Prices → Low Margins → Money Out Fast"
    }
  },
  'grandfather-clauses': {
    explanation: "Old clients are still paying your 2019 rates while your costs (and expertise) have doubled. You are subsidizing your oldest clients with your newest ones.",
    relatedProblems: ['prices-low', 'margins-low'],
    impactAnalysis: {
      financialImpact: "Capped profit on your most stable work; increasing unprofitability over time.",
      severity: "Moderate",
      affectedAreas: ['Profitability', 'Cash Flow'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Send a 'Price Adjustment' notice to all old clients", "Transition old clients to your current service packages", "Fire clients who refuse to pay a fair current rate"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of losing 'Loyal' clients", "Lack of annual price review process"],
      automationPotential: {
        rating: 'Low',
        example: "N/A - this is a communication and contractual shift."
      },
      pathToRoot: "Grandfathered Rates → Low Prices → Low Margins → Money Out Fast"
    }
  },
  'race-to-bottom': {
    explanation: "You are in a market where the only way to win is to be the cheapest. This is a losing game unless you have massive scale or automation that others don't.",
    relatedProblems: ['competing-price', 'commoditized-service'],
    impactAnalysis: {
      financialImpact: "Eventual business failure as costs rise but prices cannot.",
      severity: "Critical",
      affectedAreas: ['Survival', 'Strategic Positioning'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: 'Hard',
      quickWins: ["Pivot your offer to a 'Premium' niche", "Add a service layer that competitors can't replicate", "Build a 'Moat' through specialized expertise or tech"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling a generic product/service", "No brand differentiation"],
      automationPotential: {
        rating: 'Medium',
        example: "Using automation to be the *most efficient* in the race, or using it to create a unique high-value service."
      },
      pathToRoot: "Race to Bottom → Low Prices → Low Margins → Money Out Fast"
    }
  },
  'undervalue-expertise': {
    explanation: "You are charging for 'Labor' when you should be charging for 'Certainty' and 'Results.' You don't realize how much value you actually create for the client.",
    relatedProblems: ['prices-low', 'afraid-raise-prices'],
    impactAnalysis: {
      financialImpact: "Leaving 50-200% of potential revenue on the table.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Market Positioning'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Mindset shift)",
      difficulty: 'Medium',
      quickWins: ["Quote based on the 'Value' of the problem solved, not your hours", "Stop itemizing hours on invoices", "Position yourself as an 'Advisor' rather than a 'Vendor'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Imposter syndrome", "Lack of case studies showing ROI"],
      automationPotential: {
        rating: 'Low',
        example: "N/A - this is a strategic shift in how you sell."
      },
      pathToRoot: "Undervaluing Expertise → Low Prices → Low Margins → Money Out Fast"
    }
  },
  'extras-free': {
    explanation: "The 'Scope Creep' trap. You do a little bit of extra work to keep the client happy, but you never bill for it. Those 'little bits' are your entire profit margin.",
    relatedProblems: ['scope-creep-unbilled', 'no-change-order'],
    impactAnalysis: {
      financialImpact: "Unbilled labor hours; profit leakage on every project.",
      severity: "Moderate",
      affectedAreas: ['Profitability', 'Labor Utilization'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Say: 'Yes, we can do that. It will be an extra $X.'", "Use a 'Change Order' for anything not in the original brief", "Show 'Included' vs 'Excluded' clearly in proposals"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["People-pleasing", "Vague project scope"],
      automationPotential: {
        rating: 'Medium',
        example: "Digital proposal tools where adding 'Extras' auto-updates the price and requires a signature."
      },
      pathToRoot: "Free Extras → Unbilled Scope Creep → Low Margins → Money Out Fast"
    }
  },
  'no-change-order': {
    explanation: "You have no formal process for when a project changes. You just 'absorb' the extra work and hope for the best.",
    relatedProblems: ['scope-creep-unbilled', 'afraid-charge-changes'],
    impactAnalysis: {
      financialImpact: "Uncontrolled project cost growth; revenue stays static while costs rise.",
      severity: "Moderate",
      affectedAreas: ['Operations', 'Profitability'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: 'Easy',
      quickWins: ["Create a 1-page 'Change Order' template today", "Train your team to pause work when scope changes", "Inform clients of the change order process at kickoff"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of operational discipline", "Fear of 'confrontation'"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated 'Add-on' billing in your project management system."
      },
      pathToRoot: "No Change Order → Unbilled Scope Creep → Low Margins → Money Out Fast"
    }
  },
  'afraid-charge-changes': {
    explanation: "You know you should charge more, but you're afraid the client will get angry. You value their 'happiness' more than your business's survival.",
    relatedProblems: ['scope-creep-unbilled', 'afraid-raise-prices'],
    impactAnalysis: {
      financialImpact: "Self-inflicted margin hit; creates entitled clients who expect free work.",
      severity: "Moderate",
      affectedAreas: ['Profitability', 'Confidence'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Hard (Mindset)',
      quickWins: ["Blame the 'System' or 'Accounting': 'The system won't let us add this without a change order'", "Practice saying 'No' to small things first", "Remind yourself that your time has value"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Imposter syndrome", "Boundary issues"],
      automationPotential: {
        rating: 'Low',
        example: "N/A - this is a mindset shift."
      },
      pathToRoot: "Fear of Charging for Changes → Unbilled Scope Creep → Low Margins → Money Out Fast"
    }
  },
  'scope-poorly-defined': {
    explanation: "If you don't know where the project ends, it never will. Vague contracts lead to endless 'But I thought this was included' conversations.",
    relatedProblems: ['scope-creep-unbilled', 'one-thing-adds-up'],
    impactAnalysis: {
      financialImpact: "Project 'Stalling' costs; high risk of client dispute.",
      severity: "Major",
      affectedAreas: ['Operations', 'Legal Risk', 'Profitability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: 'Medium',
      quickWins: ["Include a 'What is NOT included' section in every proposal", "Define exact 'Deliverables' rather than 'Activities'", "Get a signed 'Scope of Work' before any work starts"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Rushing the sales process", "Lack of technical scoping expertise"],
      automationPotential: {
        rating: 'Medium',
        example: "Using standardized scoping templates and AI to double-check for 'Vague' language."
      },
      pathToRoot: "Poor Scope Definition → Unbilled Scope Creep → Low Margins → Money Out Fast"
    }
  },
  'one-thing-adds-up': {
    explanation: "The 'Death by a thousand Papercuts.' Each individual request is small, but combined they turn a profitable project into a loss.",
    relatedProblems: ['scope-creep-unbilled', 'extras-free'],
    impactAnalysis: {
      financialImpact: "Hidden profit erosion; team frustration.",
      severity: "Low",
      affectedAreas: ['Profitability', 'Team Morale'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Track even 'Small' extra requests", "Show the client a 'Credit' on the invoice for the free small stuff (so they see the value)", "Implement a 'Mini-Change Order' for small tasks"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of project tracking", "Micro-scope-creep"],
      automationPotential: {
        rating: 'Medium',
        example: "Ticketing systems where 'Extra' requests are automatically flagged for review."
      },
      pathToRoot: "One Thing Adds Up → Unbilled Scope Creep → Low Margins → Money Out Fast"
    }
  },
  'taking-too-long': {
    explanation: "Your internal efficiency is low. Tasks that should take 2 days are taking 10. This increases your 'cost-per-fulfillment' and slows down cash.",
    relatedProblems: ['inefficient-delivery', 'work-takes-long'],
    impactAnalysis: {
      financialImpact: "Decreased net profit; lower throughput (capacity).",
      severity: "Major",
      affectedAreas: ['Efficiency', 'Profitability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Time-track specific tasks to find the leak", "Create SOPs for the most common tasks", "Remove distractions for delivery team"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical debt", "Poorly trained team", "No standardized tools"],
      automationPotential: {
        rating: 'High',
        example: "Using AI and automation to handle repetitive parts of the work delivery."
      },
      pathToRoot: "Taking Too Long → Inefficient Delivery → Low Margins → Money Out Fast"
    }
  },
  'not-standardized': {
    explanation: "You are doing too much 'Custom' work. Every client gets a bespoke solution, which means you can't reuse work, templates, or systems.",
    relatedProblems: ['inefficient-delivery', 'no-systems'],
    impactAnalysis: {
      financialImpact: "Impossible to scale without 1:1 hiring; high margin risk on every project.",
      severity: "Major",
      affectedAreas: ['Scalability', 'Profitability', 'Asset Value'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: 'Hard',
      quickWins: ["Productize your service: offer 3 'Standard' packages", "Create 'Master Templates' for everything", "Say 'No' to custom requests that don't fit your core"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of being 'Rigid'", "Lack of a 'Core' product vision"],
      automationPotential: {
        rating: 'High',
        example: "Automated fulfillment workflows that only work with standardized 'Productized' services."
      },
      pathToRoot: "Not Standardized → Inefficient Delivery → Low Margins → Money Out Fast"
    }
  },
  'over-delivering': {
    explanation: "The 'Golden Handcuffs.' You are doing more work than the client paid for to ensure they are 'happy.' This makes you a great freelancer but a terrible business owner.",
    relatedProblems: ['inefficient-delivery', 'extras-free', 'scope-creep-unbilled'],
    impactAnalysis: {
      financialImpact: "Intentionally reducing your own profit; sets unsustainable expectations.",
      severity: "Moderate",
      affectedAreas: ['Profitability', 'Capacity'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Medium',
      quickWins: ["Stick to the 'Definition of Done' in the contract", "Upsell the 'Extra' value instead of giving it away", "Recognize that 'Good Enough' is often what the client wants"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Insecurity about value", "Perfectionism"],
      automationPotential: {
        rating: 'Low',
        example: "N/A - this is a discipline and strategic choice."
      },
      pathToRoot: "Over-Delivering → Inefficient Delivery → Low Margins → Money Out Fast"
    }
  },
  'rework-eating-profit': {
    explanation: "Mistakes are being made, and you are fixing them on your own dime. If a project requires 20% rework, you've just lost your entire profit margin.",
    relatedProblems: ['inefficient-delivery', 'quality-problems', 'rework-mistakes'],
    impactAnalysis: {
      financialImpact: "Direct hit to bottom line; destroys project scheduling.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Team Capacity'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Standardize the most error-prone step", "Require client 'Sign-off' at each phase", "Analyze the last 3 rework cases for a common cause"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear SOPs", "Communication breakdown", "Unqualified staff"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated QA tools and validation scripts."
      },
      pathToRoot: "Rework Eating Profit → Inefficient Delivery → Low Margins → Money Out Fast"
    }
  },
  'expensive-office': {
    explanation: "You are paying for more space than you need, or for a 'status' location that doesn't provide a direct return on investment (ROI). In a post-remote world, physical office space is often a massive unforced error.",
    relatedProblems: ['overhead-high', 'utilities-facilities'],
    impactAnalysis: {
      financialImpact: "Direct hit to net profit every single month; long-term lease liabilities.",
      severity: "Moderate",
      affectedAreas: ['Fixed Costs', 'Cash Flow'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-6 months",
      difficulty: 'Hard',
      quickWins: ["Sublease unused desks/rooms", "Negotiate a rent reduction", "Switch to a smaller coworking space"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Old-school business mindset", "Long-term lease trap", "Over-estimating the need for physical presence"],
      automationPotential: {
        rating: 'Low',
        example: "Switching to a fully remote model managed by digital communication tools."
      },
      pathToRoot: "Expensive Office → Overhead High → Money Out Fast"
    }
  },
  'many-subscriptions': {
    explanation: "The 'SaaS Creep.' Small $20-$100/month tools add up to thousands of dollars in 'ghost' expenses that you've forgotten to cancel.",
    relatedProblems: ['unused-subscriptions', 'duplicate-systems'],
    impactAnalysis: {
      financialImpact: "Hidden profit erosion; death by a thousand cuts.",
      severity: "Low",
      affectedAreas: ['Fixed Costs', 'Admin Efficiency'],
      strategicPriority: 'Easy'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: 'Easy',
      quickWins: ["Run a 'Subscription Audit' using your bank statement", "Cancel any tool not used in the last 30 days", "Consolidate into 'All-in-one' platforms"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of centralized software management", "Impulse buying tools"],
      automationPotential: {
        rating: 'High',
        example: "Using tools like RocketMoney (personal) or Glean (business) to track and cancel SaaS."
      },
      pathToRoot: "Too Many Subs → Overhead High → Money Out Fast"
    }
  },
  'equipment-costs': {
    explanation: "You are buying high-end gear, hardware, or machinery that isn't being fully utilized. If the equipment isn't paying for itself in 6-12 months, it's a liability.",
    relatedProblems: ['overhead-high', 'tools-equipment-break'],
    impactAnalysis: {
      financialImpact: "Capital tied up in depreciating assets; high maintenance costs.",
      severity: "Low",
      affectedAreas: ['Cash Flow', 'Asset Utilization'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Medium',
      quickWins: ["Sell underused equipment", "Lease instead of buy for future needs", "Charge clients an 'Equipment Fee' for specialized work"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-specifying needs", "Buying instead of renting/leasing"],
      automationPotential: {
        rating: 'Low',
        example: "Using inventory management tools to track equipment ROI."
      },
      pathToRoot: "Equipment Costs → Overhead High → Money Out Fast"
    }
  },
  'insurance-legal': {
    explanation: "While necessary, these costs can bloat if you aren't shopping around or if you are over-insured for risks that are low-probability.",
    relatedProblems: ['overhead-high', 'licensing-compliance'],
    impactAnalysis: {
      financialImpact: "Fixed expense drag; potential for over-spending on 'defensive' measures.",
      severity: "Low",
      affectedAreas: ['Fixed Costs'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: 'Easy',
      quickWins: ["Get 3 quotes for business insurance", "Use 'Standard' legal templates instead of custom-drafting every time", "Negotiate a flat-fee retainer with your lawyer"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of price comparison", "Over-conservative risk management"],
      automationPotential: {
        rating: 'Medium',
        example: "Using AI-driven legal tools for contract review instead of an expensive lawyer."
      },
      pathToRoot: "Insurance/Legal → Overhead High → Money Out Fast"
    }
  },
  'utilities-facilities': {
    explanation: "Heating, cooling, cleaning, and maintaining a physical space. These are invisible costs that scale with the size of your office, not your revenue.",
    relatedProblems: ['expensive-office', 'overhead-high'],
    impactAnalysis: {
      financialImpact: "Variable expense drag; inefficient use of resources.",
      severity: "Low",
      affectedAreas: ['Fixed Costs'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: 'Easy',
      quickWins: ["Reduce cleaning frequency", "Install smart thermostats", "Go paperless to save on supplies/storage"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inefficient physical space management"],
      automationPotential: {
        rating: 'Medium',
        example: "Smart building automation to reduce energy and facility costs."
      },
      pathToRoot: "Utilities → Overhead High → Money Out Fast"
    }
  },
  'admin-staff': {
    explanation: "You have hired full-time people for roles that could be handled by software, contractors, or AI. Administrative payroll is the 'heaviest' form of overhead.",
    relatedProblems: ['overhead-high', 'low-value-work'],
    impactAnalysis: {
      financialImpact: "Massive hit to gross margin; high 'management debt' for the founder.",
      severity: "Major",
      affectedAreas: ['Payroll', 'Profitability', 'Scalability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Hard',
      quickWins: ["Automate the tasks they are doing", "Switch to part-time or virtual assistants", "Cross-train admin staff into revenue-generating roles"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Hiring to solve a 'process' problem with a 'person'", "Traditional staffing mindset"],
      automationPotential: {
        rating: 'High',
        example: "Replacing manual data entry, scheduling, and bookkeeping with AI agents."
      },
      pathToRoot: "Admin Staff → Overhead High → Money Out Fast"
    }
  },
  'banking-fees': {
    explanation: "Wire fees, monthly service charges, and credit card processing fees. These are small percentages that, on high volume, can equal a full salary every year.",
    relatedProblems: ['overhead-high', 'payment-friction'],
    impactAnalysis: {
      financialImpact: "Direct erosion of revenue; 'Tax' on every transaction.",
      severity: "Low",
      affectedAreas: ['Net Profit'],
      strategicPriority: 'Easy'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: 'Easy',
      quickWins: ["Switch to a fee-free business bank (e.g., Mercury, Relay)", "Negotiate CC processing rates", "Pass CC fees to clients where legal"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Using 'Big Bank' services with high fee structures"],
      automationPotential: {
        rating: 'Low',
        example: "Switching to digital banks with automated fee-waiver systems."
      },
      pathToRoot: "Banking Fees → Overhead High → Money Out Fast"
    }
  },
  'delivery-costs-high': {
    explanation: "The direct costs of fulfilling your service are too high. You are spending too much on labor, materials, or software to deliver what you've sold.",
    relatedProblems: ['subcontractors-expensive', 'inefficient-processes', 'rework-mistakes'],
    impactAnalysis: {
      financialImpact: "Thin gross margins; working harder for less profit.",
      severity: "Major",
      affectedAreas: ['Gross Margin', 'Scalability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Audit subcontractor rates", "Map out the delivery workflow", "Identify the 'most expensive' step and solve it"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of standardized fulfillment", "Poor vendor management", "Over-delivering"],
      automationPotential: {
        rating: 'High',
        example: "Automating 20-50% of the fulfillment tasks to reduce labor hours per client."
      },
      pathToRoot: "High Delivery Costs → Expenses High → Money Out Fast"
    }
  },
  'subcontractors-expensive': {
    explanation: "You are relying on expensive freelancers or agencies to deliver your service. If you are paying them > 30-40% of the project fee, your margins are too thin.",
    relatedProblems: ['delivery-costs-high', 'cant-afford-hire'],
    impactAnalysis: {
      financialImpact: "Direct margin squeeze; lack of control over quality/timing.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Service Quality'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-3 months",
      difficulty: 'Medium',
      quickWins: ["Negotiate bulk rates for guaranteed work", "Bring the 'core' delivery in-house", "Use lower-cost international talent for non-client-facing work"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Avoiding the commitment of hiring full-time staff", "Lack of internal training systems"],
      automationPotential: {
        rating: 'Medium',
        example: "Using AI to replace high-cost specialized subcontractors for specific tasks (e.g., copywriting, basic dev)."
      },
      pathToRoot: "Expensive Subcontractors → Delivery Costs → Money Out Fast"
    }
  },
  'inefficient-processes': {
    explanation: "Work is being done the hard way. Duplicate data entry, manual follow-ups, and a lack of standardized templates are wasting hundreds of hours.",
    relatedProblems: ['manual-processes', 'delivery-costs-high', 'rework-mistakes'],
    impactAnalysis: {
      financialImpact: "High 'Labor-to-Revenue' ratio; low capacity.",
      severity: "Major",
      affectedAreas: ['Efficiency', 'Capacity', 'Gross Margin'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Create SOPs for the 3 most common tasks", "Connect tools using Zapier/Make", "Standardize your client onboarding"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Rushing to deliver instead of building infrastructure", "Technical debt"],
      automationPotential: {
        rating: 'High',
        example: "Connecting your sales, fulfillment, and accounting apps to eliminate manual data transfer."
      },
      pathToRoot: "Inefficient Processes → Delivery Costs → Money Out Fast"
    }
  },
  'rework-mistakes': {
    explanation: "Errors are costing you double: once to fix them, and once in the opportunity cost of the time lost. It also kills your reputation and future referrals.",
    relatedProblems: ['quality-problems', 'mistakes-rework', 'delivery-costs-high'],
    impactAnalysis: {
      financialImpact: "Profit margins destroyed by unbilled hours; high churn risk.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Customer Satisfaction', 'Quality'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Implement a mandatory QA checklist", "Require a 'second-eye' review before delivery", "Analyze the root cause of the last 3 mistakes"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of standardized SOPs", "Rushing due to capacity issues", "Poorly defined scope"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated validation scripts or QA check-tools for technical work."
      },
      pathToRoot: "Rework → Delivery Costs → Money Out Fast"
    }
  },
  'travel-meetings': {
    explanation: "Too much time and money spent on 'face-to-face' that could be handled via video or asynchronous communication. Travel is an expensive 'hidden' cost.",
    relatedProblems: ['delivery-costs-high', 'low-value-work'],
    impactAnalysis: {
      financialImpact: "Wasted labor hours; travel expenses (flights, hotels) eating profit.",
      severity: "Low",
      affectedAreas: ['Profitability', 'Founder Time'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: 'Easy',
      quickWins: ["Shift to 'Zoom-First' for discovery calls", "Batch in-person meetings into a single day", "Charge clients for travel time and expenses"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Old-school relationship mindset", "Inability to lead digital meetings effectively"],
      automationPotential: {
        rating: 'Low',
        example: "Using async video tools like Loom to replace 50% of status meetings."
      },
      pathToRoot: "Travel/Meetings → Delivery Costs → Money Out Fast"
    }
  },
  'materials-supplies': {
    explanation: "You are paying retail prices for materials or over-buying supplies that sit in inventory. Every $1 saved here is $1 of pure profit.",
    relatedProblems: ['delivery-costs-high', 'overbuying-inventory'],
    impactAnalysis: {
      financialImpact: "Direct hit to gross margin; cash tied up in physical stock.",
      severity: "Low",
      affectedAreas: ['Gross Margin', 'Cash Flow'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Negotiate wholesale rates", "Implement 'Just-in-time' ordering", "Audit current inventory for waste"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor inventory management", "Lack of vendor negotiation"],
      automationPotential: {
        rating: 'Medium',
        example: "Inventory tracking software that auto-reorders at the best price."
      },
      pathToRoot: "Materials/Supplies → Delivery Costs → Money Out Fast"
    }
  },
  'tools-equipment-break': {
    explanation: "Maintenance and replacement costs for the tools you use. If your gear is unreliable, you are losing time and money constantly.",
    relatedProblems: ['delivery-costs-high', 'equipment-costs'],
    impactAnalysis: {
      financialImpact: "Unexpected expenses; project delays due to downtime.",
      severity: "Low",
      affectedAreas: ['Operational Stability', 'Cash Flow'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: 'Medium',
      quickWins: ["Implement a 'Preventative Maintenance' schedule", "Buy high-quality gear once rather than cheap gear twice", "Have redundancy for critical tools"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Buying cheap equipment", "Neglecting maintenance"],
      automationPotential: {
        rating: 'Low',
        example: "Automated maintenance alerts based on usage/time."
      },
      pathToRoot: "Broken Tools → Delivery Costs → Money Out Fast"
    }
  },
  'licensing-compliance': {
    explanation: "Software licenses, professional certifications, and regulatory compliance. These are often mandatory but can be optimized.",
    relatedProblems: ['delivery-costs-high', 'insurance-legal'],
    impactAnalysis: {
      financialImpact: "Fixed cost drag; risk of high fines if neglected.",
      severity: "Low",
      affectedAreas: ['Fixed Costs', 'Risk'],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Audit software licenses for 'Unused Seats'", "Switch to annual licensing for discounts", "Automate compliance tracking"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of license management", "Regulatory complexity"],
      automationPotential: {
        rating: 'Medium',
        example: "Compliance management software to automate renewals and audits."
      },
      pathToRoot: "Licensing/Compliance → Delivery Costs → Money Out Fast"
    }
  },
  'support-costs': {
    explanation: "Post-delivery support is eating your profit. If your product/service is confusing or buggy, your support team (or you) is spending all their time 'fixing' rather than 'selling.'",
    relatedProblems: ['delivery-costs-high', 'results-mediocre', 'quality-problems'],
    impactAnalysis: {
      financialImpact: "Massive hit to Net Profit; high churn risk; team frustration.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Customer Satisfaction', 'Labor Costs'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Create a robust Help Center/FAQ", "Record 'How-to' videos for common issues", "Fix the 3 most common 'Bug/Complaint' root causes"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor onboarding", "Complex/unintuitive product", "Quality issues"],
      automationPotential: {
        rating: 'High',
        example: "Using AI chatbots to handle 70% of common support inquiries."
      },
      pathToRoot: "Support Costs → Delivery Costs → Money Out Fast"
    }
  },
  'margins-low': {
    explanation: "You are working for very little profit. This makes the business fragile and prevents reinvestment. It's often a sign of poor pricing or inefficient delivery.",
    relatedProblems: ['prices-low', 'scope-creep-unbilled', 'inefficient-delivery'],
    impactAnalysis: {
      financialImpact: "Low ROI on efforts; inability to scale profitably.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Scalability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Hard',
      quickWins: ["Raise prices", "Standardize delivery", "Improve project tracking"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Under-pricing", "Inefficient fulfillment", "Unbilled scope creep"],
      automationPotential: {
        rating: 'Medium',
        example: "Using project tracking automation to identify margin leakage in real-time."
      },
      pathToRoot: "Low Margins → Money Out Fast → Not Enough Money (Root)"
    }
  },
  'pricing-value-issues': {
    explanation: "Even if you have clients, the revenue generated per client is too low to sustain a healthy business. This is often a combination of 'pricing too low' and 'not being perceived as high-value.' You are working hard but the financial output doesn't match the effort.",
    relatedProblems: ['prices-low', 'value-conveyance', 'pricing-model-revenue'],
    impactAnalysis: {
      financialImpact: "Low Average Order Value (AOV); thin margins; high pressure to acquire volume.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Team Quality', 'Sustainability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Raise prices for next 3 leads", "Stop offering the 'basic' package", "Introduce a high-ticket 'VIP' tier"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Commoditization", "Fear of rejection", "Lack of clear ROI"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated value-tracking dashboards to show clients the results you're getting them."
      },
      pathToRoot: "Low Revenue Per Client → Not Enough Revenue → Not Enough Money (Root)"
    }
  },
  'look-too-small': {
    explanation: "Perception is reality in business. If you look like a 'one-person shop' or an amateur operation, high-value clients will be afraid to trust you with large budgets. Your branding, website, and communication lack the authority needed to command premium prices.",
    relatedProblems: ['trust-signals-missing', 'design-amateur', 'anonymous-brand'],
    impactAnalysis: {
      financialImpact: "Loss of high-ticket deals; relegated to 'budget' clients.",
      severity: "Moderate",
      affectedAreas: ['Sales', 'Brand Authority', 'Market Positioning'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: 'Easy',
      quickWins: ["Professionalize your email signature and LinkedIn", "Clean up website design", "Use 'we' instead of 'I' in communication"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of brand investment", "Founder-centric identity", "Inconsistent messaging"],
      automationPotential: {
        rating: 'Medium',
        example: "AI-powered content engines to maintain a consistent, high-authority brand presence."
      },
      pathToRoot: "Poor Perception → Value Not Conveyed → Clients Don't Pay Enough → Not Enough Revenue (Root)"
    }
  },
  'weak-messaging': {
    explanation: "Your marketing copy talks about 'what you do' instead of 'the result the client gets.' You are speaking to the logical brain (features) rather than the emotional brain (pain relief).",
    relatedProblems: ['value-conveyance', 'benefits-unclear'],
    impactAnalysis: {
      financialImpact: "Leads don't convert; prospects don't 'get' why you're better than the cheap option.",
      severity: "Major",
      affectedAreas: ['Marketing ROI', 'Sales Conversion'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: 'Medium',
      quickWins: ["Rewrite your website headline to focus on a single result", "Use the 'So what?' test on every bullet point in your proposal", "Interview a client and use their exact words in your copy"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Too close to the work (Expert Curse)", "Lack of copywriting skills"],
      automationPotential: {
        rating: 'High',
        example: "Using AI to rewrite technical jargon into benefit-driven marketing copy."
      },
      pathToRoot: "Weak Messaging → Value Not Conveyed → Clients Don't Pay Enough → Not Enough Revenue"
    }
  },
  'no-roi-proof': {
    explanation: "You can't point to a number and say 'I made my client $X.' Without proof of financial return, your service is seen as a 'cost' to be cut rather than an 'investment' to be grown.",
    relatedProblems: ['value-conveyance', 'cant-articulate-roi'],
    impactAnalysis: {
      financialImpact: "Impossible to command premium prices; high churn during budget cuts.",
      severity: "Major",
      affectedAreas: ['Pricing Power', 'Client Retention'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Create a simple 'ROI Calculator' for your sales calls", "Survey past clients for specific financial outcomes", "Include one 'Hard Number' case study in every pitch"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Not tracking data", "Fear of making specific promises"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated reporting dashboards that show the client exactly how much money/time you've saved them."
      },
      pathToRoot: "No ROI Proof → Value Not Conveyed → Clients Don't Pay Enough → Not Enough Revenue"
    }
  },
  'value-creation': {
    explanation: "Your core service might be 'too thin.' You aren't solving a deep enough problem to justify a high price. You are doing the work, but the work itself isn't worth that much to the market.",
    relatedProblems: ['commoditized-service', 'product-market-mismatch'],
    impactAnalysis: {
      financialImpact: "Low ceiling on revenue; intense competition.",
      severity: "Major",
      affectedAreas: ['Product Strategy', 'Profitability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Bundle your service with a digital asset or tool", "Offer a 'Guarantee' that no one else in your industry dares to offer", "Ask: 'What's the $10,000 version of what I do?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of specialized expertise", "Targeting the wrong market segment"],
      automationPotential: {
        rating: 'Low',
        example: "N/A - this is a product/strategy shift."
      },
      pathToRoot: "Low Value Creation → Not Providing Enough Value → Clients Don't Pay Enough → Not Enough Revenue"
    }
  },
  'commoditized-service': {
    explanation: "You look exactly like your competitors. When the client can't see a difference, they choose based on price. You are a 'replaceable cog' in their business.",
    relatedProblems: ['competing-price', 'no-differentiation'],
    impactAnalysis: {
      financialImpact: "Constant price wars; zero brand loyalty.",
      severity: "Critical",
      affectedAreas: ['Brand Positioning', 'Margins'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Pick a hyper-niche (e.g., 'Email for HVAC companies' instead of just 'Marketing')", "Develop a 'Proprietary Method' with a unique name", "Add a 'Service Guarantee' that competitors can't match"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Following the pack", "Fear of exclusion from the broader market"],
      automationPotential: {
        rating: 'Low',
        example: "Using automation to provide a 'High-Touch' experience that commodities can't afford."
      },
      pathToRoot: "Commoditization → Not Providing Enough Value → Clients Don't Pay Enough → Not Enough Revenue"
    }
  },
  'product-market-mismatch': {
    explanation: "You are selling something the market doesn't 'need' enough to pay for. It's a 'nice to have' in a world that only buys 'must-haves.'",
    relatedProblems: ['value-creation', 'not-buying-mode'],
    impactAnalysis: {
      financialImpact: "High cost of sales; low conversion; constant rejection.",
      severity: "Critical",
      affectedAreas: ['Survival', 'Sales', 'Product Strategy'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6 months (Pivot)",
      difficulty: 'Hard',
      quickWins: ["Talk to 10 non-buyers and ask what they *would* pay for", "Pivot your existing tech/skills to solve a 'Burning' problem", "Kill the current offer if it's not gaining traction"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Building in a vacuum", "Solving a problem that doesn't exist"],
      automationPotential: {
        rating: 'Low',
        example: "N/A - this requires human intuition and market listening."
      },
      pathToRoot: "Mismatch → Not Providing Enough Value → Clients Don't Pay Enough → Not Enough Revenue"
    }
  },
  'results-mediocre': {
    explanation: "Your service works, but it's not 'remarkable.' Remarkable results create referrals and high retention. 'Okay' results create churn and price-sensitivity.",
    relatedProblems: ['quality-problems', 'client-dissatisfaction'],
    impactAnalysis: {
      financialImpact: "Zero referrals; high acquisition costs; low client LTV.",
      severity: "Major",
      affectedAreas: ['Growth Rate', 'Client LTV', 'Brand Reputation'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Set higher 'Internal' standards for delivery", "Hire a specialist to improve the core product", "Implement a feedback loop to find where the quality drops"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Under-resourced team", "Lack of clear quality standards", "Rushing to fulfillment"],
      automationPotential: {
        rating: 'Medium',
        example: "Using AI to double-check work or improve the quality of deliverables (e.g., better design, better code)."
      },
      pathToRoot: "Mediocre Results → Not Providing Enough Value → Clients Don't Pay Enough → Not Enough Revenue"
    }
  },
  'flat-fees-low': {
    explanation: "You are charging a single price that hasn't changed in years. As your costs and complexity grow, your 'Flat Fee' project is becoming less profitable by the day.",
    relatedProblems: ['prices-low', 'dont-know-costs'],
    impactAnalysis: {
      financialImpact: "Profit margin 'Invisible' erosion; working for a lower effective hourly rate over time.",
      severity: "Moderate",
      affectedAreas: ['Profitability', 'Cash Flow'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Easy',
      quickWins: ["Raise your flat fee by 15% today", "Introduce 'Tiered' flat fees based on project complexity", "Add a 'Rush Fee' for fast turnarounds"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of losing the deal", "No annual price reviews"],
      automationPotential: {
        rating: 'Low',
        example: "N/A - this is a pricing strategy change."
      },
      pathToRoot: "Low Flat Fees → Pricing Structure Wrong → Clients Don't Pay Enough → Not Enough Revenue"
    }
  },
  'no-performance-upside': {
    explanation: "You are making your clients millions of dollars, but you only get paid a fixed fee. You have no 'skin in the game' and no way to benefit from the massive value you create.",
    relatedProblems: ['value-conveyance', 'pricing-model-revenue'],
    impactAnalysis: {
      financialImpact: "Capped revenue; misaligned incentives with the client.",
      severity: "Moderate",
      affectedAreas: ['Revenue Growth', 'Client Alignment'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Propose a 'Performance Bonus' based on specific KPIs", "Test a 'Percentage of Spend' or 'Percentage of Revenue' model", "Bundle a 'Rev-Share' into a lower base fee"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of data tracking to prove results", "Fear of variable income"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated KPI tracking dashboards that trigger performance-based invoices."
      },
      pathToRoot: "No Upside → Pricing Structure Wrong → Clients Don't Pay Enough → Not Enough Revenue"
    }
  },
  'no-recurring-revenue': {
    explanation: "You have to sell every single month just to survive. Without subscriptions or retainers, your business has zero 'Momentum' and zero 'Exit Value.'",
    relatedProblems: ['lumpy-revenue', 'pricing-model-revenue'],
    impactAnalysis: {
      financialImpact: "High sales pressure; unpredictable cash flow; low business valuation.",
      severity: "Major",
      affectedAreas: ['Business Valuation', 'Cash Flow Stability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "4-8 months",
      difficulty: 'Hard',
      quickWins: ["Create a 'Maintenance' or 'Strategy' retainer", "Switch a one-off product to a subscription", "Incentivize long-term contracts with a small discount"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling 'One-off' projects only", "Lack of an ongoing value proposition"],
      automationPotential: {
        rating: 'High',
        example: "Automated recurring billing and subscription management tools (Stripe Billing, etc.)."
      },
      pathToRoot: "No Recurring → Pricing Structure Wrong → Clients Don't Pay Enough → Not Enough Revenue"
    }
  },
  'why-left': {
    explanation: "You are losing clients, but you don't know *exactly* why. Without understanding the 'Why,' you can't fix the 'How.' Every churned client is a treasure trove of data on how to improve your business.",
    relatedProblems: ['bad-service', 'competitor-stole', 'no-retention-system'],
    impactAnalysis: {
      financialImpact: "Continuous leak in revenue; high cost to replace lost income.",
      severity: "Major",
      affectedAreas: ['LTV', 'Brand Reputation', 'Product/Service Quality'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Call the last 3 clients who left and ask for honest feedback", "Implement an 'Exit Survey' in your cancellation flow", "Analyze churn by 'Service Type' to find patterns"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of feedback loops", "Ignoring 'Silent' dissatisfaction"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated exit surveys triggered by subscription cancellation."
      },
      pathToRoot: "Why They Left → Clients Churned → Not Enough Clients → Not Enough Revenue"
    }
  },
  'bad-service': {
    explanation: "The most painful reason for churn. You didn't meet the expectations you set. Whether it was quality, timing, or communication, the client felt they didn't get what they paid for.",
    relatedProblems: ['quality-problems', 'results-mediocre', 'client-dissatisfaction'],
    impactAnalysis: {
      financialImpact: "Zero referrals; negative word-of-mouth; immediate revenue loss.",
      severity: "Critical",
      affectedAreas: ['Brand Reputation', 'Client LTV', 'Team Morale'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Fix the #1 most complained about issue today", "Offer a refund or credit to unhappy clients to save the relationship", "Implement a 30-day 'Health Check' for all new clients"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of SOPs", "Over-selling/Under-delivering", "Untrained team"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated QA checklists that must be completed before work is sent to the client."
      },
      pathToRoot: "Bad Service → Why They Left → Clients Churned → Not Enough Revenue"
    }
  },
  'no-retention-system': {
    explanation: "You have no proactive strategy to keep clients. You assume that if they are happy, they will stay. In reality, clients need to be 're-sold' on the value you provide regularly.",
    relatedProblems: ['not-staying-touch', 'no-renewal-process', 'assuming-stay'],
    impactAnalysis: {
      financialImpact: "Passive revenue loss; high acquisition pressure.",
      severity: "Major",
      affectedAreas: ['LTV', 'Client Success'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: 'Medium',
      quickWins: ["Setup a monthly 'Value Report' for every client", "Schedule quarterly 'Strategic Reviews'", "Create a simple 'Renewal' sequence 60 days before contract end"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Transactional mindset", "Founder focus on sales over success"],
      automationPotential: {
        rating: 'High',
        example: "Automated 'Success' emails and value-tracking dashboards."
      },
      pathToRoot: "No Retention System → Clients Churned → Not Enough Clients → Not Enough Revenue"
    }
  },
  'clients-not-buying-more': {
    explanation: "Your existing clients have more problems that you could solve, but they aren't paying you to solve them. You are leaving the 'easiest' money on the table because you aren't upselling or cross-selling.",
    relatedProblems: ['lack-awareness', 'no-upsell-process', 'lack-need-perceived'],
    impactAnalysis: {
      financialImpact: "Low Revenue per Client; high reliance on new leads.",
      severity: "Moderate",
      affectedAreas: ['LTV', 'Sales Efficiency', 'Profitability'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Easy',
      quickWins: ["Send a 'We also do X' email to all current clients", "Add 'Expansion' as a line item in your quarterly reviews", "Create a 'Discounted Bundle' for existing clients only"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive account management", "Client views you as a 'single-tool' provider"],
      automationPotential: {
        rating: 'High',
        example: "Automated 'Did you know?' email sequences triggered based on client milestones."
      },
      pathToRoot: "Not Buying More → Not Enough Clients → Not Enough Revenue"
    }
  },
  'no-upsell-process': {
    explanation: "You have no formal system for identifying and closing expansion opportunities. Upselling is happening randomly, if at all.",
    relatedProblems: ['not-proactively-offering', 'waiting-ask', 'not-identifying-opportunities'],
    impactAnalysis: {
      financialImpact: "Stagnant LTV; missed high-margin revenue.",
      severity: "Moderate",
      affectedAreas: ['Sales pipeline', 'LTV'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Define 3 'Logical Next Steps' for your core offer", "Train your delivery team to flag upsell opportunities", "Add an upsell link to your project completion emails"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of being 'Salesy' after the deal", "Lack of expansion strategy"],
      automationPotential: {
        rating: 'High',
        example: "CRM automation that flags clients for an upsell after 90 days of success."
      },
      pathToRoot: "No Upsell Process → Not Buying More → Not Enough Clients → Not Enough Revenue"
    }
  },
  'cant-find-prospects': {
    explanation: "The 'Invisibility' problem. You don't know where your ideal clients hang out, or your target market is so broad that you are shouting into a void.",
    relatedProblems: ['dont-know-where-market', 'market-too-small', 'lead-gen-insufficient'],
    impactAnalysis: {
      financialImpact: "Zero pipeline; wasted marketing dollars on the wrong audience.",
      severity: "Major",
      affectedAreas: ['Sales pipeline', 'Marketing Strategy'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Define your 'Ideal Customer Profile' (ICP) in detail", "Use LinkedIn/Apollo to find 100 people who fit that profile exactly", "Ask existing clients where they get their news/info"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of market research", "No niche focus"],
      automationPotential: {
        rating: 'High',
        example: "Automated lead scraping and enrichment based on specific ICP criteria."
      },
      pathToRoot: "Cant Find Prospects → Not Getting New Clients → Not Enough Revenue"
    }
  },
  'prospects-dont-know': {
    explanation: "You have a great product, but you're the 'best kept secret' in the industry. Your brand visibility is zero outside of your immediate circle.",
    relatedProblems: ['no-visibility', 'no-referrals', 'no-word-mouth'],
    impactAnalysis: {
      financialImpact: "No organic inbound; 100% reliance on outbound/manual efforts.",
      severity: "Major",
      affectedAreas: ['Brand Awareness', 'Sales Pipeline'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-9 months",
      difficulty: 'Medium',
      quickWins: ["Post 3x a week on the platform where your audience is", "Partner with an 'Authority' in your space for a webinar/post", "Run a small 'Awareness' ad campaign"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of content strategy", "No outbound marketing activity"],
      automationPotential: {
        rating: 'High',
        example: "Automated content distribution and social media scheduling."
      },
      pathToRoot: "Prospects Dont Know → Not Getting New Clients → Not Enough Revenue"
    }
  },
  'no-referrals': {
    explanation: "You are doing good work, but you aren't 'systematizing' the praise. Referrals are the highest-converting, lowest-cost leads, yet you're leaving them to chance.",
    relatedProblems: ['not-asking-referrals', 'no-incentive-referrals', 'dont-know-how-refer'],
    impactAnalysis: {
      financialImpact: "High cost of acquisition; slow growth speed.",
      severity: "Moderate",
      affectedAreas: ['Sales pipeline', 'Marketing ROI'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: 'Easy',
      quickWins: ["Ask your 3 happiest clients for a referral today", "Add a 'Referral' link to your email signature", "Create a simple incentive (e.g., $500 credit) for successful referrals"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of 'Bothering' clients", "No referral 'ask' in the process"],
      automationPotential: {
        rating: 'High',
        example: "Automated referral requests sent 24 hours after a positive NPS score or milestone."
      },
      pathToRoot: "No Referrals → Prospects Dont Know → Not Getting New Clients → Not Enough Revenue"
    }
  },
  'prospects-aware-dont-engage': {
    explanation: "People see your brand, but they don't click, call, or email. Your 'Hook' isn't sharp enough to stop the scroll or justify the time of an initial conversation.",
    relatedProblems: ['message-no-resonate', 'offer-not-compelling', 'no-clear-next-step'],
    impactAnalysis: {
      financialImpact: "Wasted visibility/impressions; high marketing 'noise' without 'signal.'",
      severity: "Major",
      affectedAreas: ['Marketing Conversion', 'Sales pipeline'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: 'Medium',
      quickWins: ["Change your 'Call to Action' to something low-friction (e.g., 'Get a 5-min audit' vs 'Book a 1-hour call')", "Rewrite your main headline to be more provocative", "Test a 'Lead Magnet' (free value) to capture email"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak offer', 'Boring messaging', 'Too much friction"],
      automationPotential: {
        rating: 'High',
        example: "A/B testing software to automatically find the highest-engaging messages."
      },
      pathToRoot: "Dont Engage → Not Getting New Clients → Not Enough Revenue"
    }
  },
  'prospects-engage-dont-buy': {
    explanation: "You are getting the meetings, but you're not getting the signatures. The 'Trust Gap' or the 'Value Gap' is too large at the point of sale.",
    relatedProblems: ['dont-trust', 'dont-understand-offer', 'price-objection'],
    impactAnalysis: {
      financialImpact: "Massive waste of founder/sales time; high acquisition costs.",
      severity: "Critical",
      affectedAreas: ['Conversion Rate', 'Profitability', 'Founder Morale'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Send a 'Pre-meeting' video showing your expertise", "Create a 'Case Study' deck to show during the call", "Simplify your pricing options to avoid 'Analysis Paralysis'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor sales skills', 'Weak social proof', 'Complex offer"],
      automationPotential: {
        rating: 'High',
        example: "Automated 'Pre-sale' nurture sequences that build trust before the first call."
      },
      pathToRoot: "Engage Dont Buy → Not Getting New Clients → Not Enough Revenue"
    }
  },
  'no-project-tracking': {
    explanation: "You have no real-time visibility into your projects. You don't know who is doing what, where the bottlenecks are, or if a project is going over budget until it's too late.",
    relatedProblems: ['dont-know-status', 'cant-see-bottlenecks', 'surprises-end'],
    impactAnalysis: {
      financialImpact: "Budget overruns; missed deadlines; unbilled labor.",
      severity: "Major",
      affectedAreas: ['Operations', 'Profitability', 'Team Management'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Move all tasks into ONE project management tool (Asana, ClickUp, Notion)", "Hold a 10-min daily 'Standup' to check status", "Use a 'Stoplight' (Red/Yellow/Green) system for project health"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Relying on Slack/Email for management", "Lack of operational discipline"],
      automationPotential: {
        rating: 'High',
        example: "Automated project dashboards that flag 'Delayed' tasks or 'Over-budget' hours instantly."
      },
      pathToRoot: "No Project Tracking → Project Management Issues → Bought Cant Deliver"
    }
  },
  'time-trapped': {
    explanation: "The founder is doing everything. You are the bottleneck for every decision, every email, and every deliverable. You have a job, not a business.",
    relatedProblems: ['low-value-work', 'cant-delegate-founder', 'no-processes-documented'],
    impactAnalysis: {
      financialImpact: "Growth is capped by your personal hours; zero business valuation.",
      severity: "Critical",
      affectedAreas: ['Scalability', 'Founder Health', 'Business Value'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: 'Hard',
      quickWins: ["Audit your time for 3 days and find the 'Bottom 20%' of tasks", "Hire a VA for just 5 hours/week to handle inbox/scheduling", "Record a Loom video for every recurring task you do today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Hero complex', 'Lack of delegation skills', 'No SOPs"],
      automationPotential: {
        rating: 'High',
        example: "Using AI to triage your email and draft replies, saving 10+ hours a week."
      },
      pathToRoot: "Time Trapped → Personal Bottlenecks → Not Enough Money"
    }
  },
  'disorganized-chaotic': {
    explanation: "Information is everywhere and nowhere. You are losing hours a week looking for files, re-answering the same questions, and fixing things that fell through the cracks.",
    relatedProblems: ['no-systems-organization', 'poor-prioritization', 'communication-mess'],
    impactAnalysis: {
      financialImpact: "Hidden labor waste; high stress; poor client experience.",
      severity: "Major",
      affectedAreas: ['Efficiency', 'Mental Clarity', 'Team Trust'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Spend one full day organizing your digital files (GDrive/Dropbox)", "Choose ONE source of truth for tasks", "Clean your physical workspace"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Rapid growth without cleanup', 'Personal habit of founder'],
      automationPotential: {
        rating: 'High',
        example: "Automated file naming and organization tools."
      },
      pathToRoot: "Disorganized → Personal Bottlenecks → Not Enough Money"
    }
  },
  'value-conveyance': {
    explanation: "You might be doing great work, but the client doesn't perceive it as valuable. This is a messaging and translation gap. You are talking about 'features' while the client cares about 'outcomes' and 'ROI.'",
    relatedProblems: ['weak-messaging', 'no-roi-proof', 'look-too-small'],
    impactAnalysis: {
      financialImpact: "High price sensitivity; constant negotiation/haggling.",
      severity: "Major",
      affectedAreas: ['Sales Conversion', 'Client Satisfaction', 'Pricing Power'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Rewrite your proposal to focus on client ROI", "Create 3 'Success Stories' or Case Studies", "Ask clients: 'What would happen if you didn't solve this?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical jargon", "Lack of sales training", "Inability to quantify results"],
      automationPotential: {
        rating: 'High',
        example: "Automated ROI calculators or 'Savings' reports delivered monthly to clients."
      },
      pathToRoot: "Value Gap → Clients Don't Pay Enough → Not Enough Revenue (Root)"
    }
  },
  'pricing-model-revenue': {
    explanation: "The way you charge is fundamentally limiting your revenue. Relying solely on flat fees or hourly rates caps your upside and keeps you on a treadmill. You lack recurring revenue or value-based tiers that capture the true worth of your work.",
    relatedProblems: ['no-recurring-revenue', 'flat-fees-low', 'no-performance-upside'],
    impactAnalysis: {
      financialImpact: "Unpredictable revenue; inability to scale without more labor.",
      severity: "Major",
      affectedAreas: ['Business Valuation', 'Cash Flow', 'Scalability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Switch one project to a monthly retainer", "Add a 'Setup Fee' + 'Maintenance' model", "Bundle software/tools with your service"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Trading time for money", "Lack of scalable productized services", "Fear of long-term commitment"],
      automationPotential: {
        rating: 'High',
        example: "Automated subscription billing and usage-based invoicing."
      },
      pathToRoot: "Broken Model → Clients Don't Pay Enough → Not Enough Revenue (Root)"
    }
  },
  'not-enough-clients': {
    explanation: "Your total client base is too small to sustain the business. This can be due to high churn, existing clients not buying more, or failing to acquire new clients.",
    relatedProblems: ['clients-churned', 'clients-not-buying-more', 'not-getting-new'],
    impactAnalysis: {
      financialImpact: "Low top-line revenue; inability to cover fixed costs.",
      severity: "Major",
      affectedAreas: ['Revenue', 'Growth'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Audit lead generation", "Review client retention", "Upsell existing clients"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor marketing", "Weak sales process", "Product-market fit issues"],
      automationPotential: {
        rating: 'High',
        example: "Automated lead nurturing and client engagement systems."
      },
      pathToRoot: "Not Enough Clients → Not Enough Revenue → Not Enough Money (Root)"
    }
  },
  'bought-cant-deliver': {
    explanation: "You have sold more than you can handle. This leads to delivery delays, quality issues, and eventual reputation damage.",
    relatedProblems: ['not-enough-capacity', 'process-bottlenecks', 'quality-problems'],
    impactAnalysis: {
      financialImpact: "Churn risk; high rework costs; missed future sales.",
      severity: "Major",
      affectedAreas: ['Delivery', 'Customer Satisfaction', 'Reputation'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Slow down sales", "Hire temporary help", "Optimize current processes"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-selling", "Under-hiring", "Inefficient fulfillment"],
      automationPotential: {
        rating: 'High',
        example: "Automated project management and fulfillment workflows."
      },
      pathToRoot: "Bought Cant Deliver → Not Enough Revenue → Not Enough Money (Root)"
    }
  },
  'founder-everything': {
    explanation: "The founder is the single point of failure. You are doing delivery, sales, admin, and strategy. This is not a business; it's a high-stress job.",
    relatedProblems: ['cant-delegate', 'no-one-knows-how', 'afraid-let-go'],
    impactAnalysis: {
      financialImpact: "Capped revenue; high burnout risk; zero exit value.",
      severity: "Major",
      affectedAreas: ['Scalability', 'Founder Health'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: 'Hard',
      quickWins: ["Document top 3 tasks", "Hire a VA", "Start delegating one low-risk task"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of SOPs", "Hero complex", "Control issues"],
      automationPotential: {
        rating: 'High',
        example: "Automated triage systems to offload the founder's initial touchpoints."
      },
      pathToRoot: "Founder Everything → Capacity Issues → Not Enough Revenue (Root)"
    }
  },
  'project-management-issues': {
    explanation: "Projects are slipping, scope is creeping, and communication is failing. This leads to inefficient delivery and low profit margins.",
    relatedProblems: ['scope-creep-profit', 'timelines-slip', 'communication-breakdowns-pm'],
    impactAnalysis: {
      financialImpact: "Erosion of profit margins; high rework costs.",
      severity: "Moderate",
      affectedAreas: ['Operations', 'Team Efficiency', 'Profitability'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Choose a PM tool", "Standardize project kickoff", "Implement weekly status updates"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of standardized PM process", "Poor communication", "Undefined roles"],
      automationPotential: {
        rating: 'High',
        example: "Automated project templates and task reminders."
      },
      pathToRoot: "PM Issues → Inefficient Delivery → Money Out Fast → Not Enough Money (Root)"
    }
  },
  'client-management-issues': {
    explanation: "You are dealing with difficult or wrong clients, leading to constant changes, unreasonable expectations, and low profit.",
    relatedProblems: ['difficult-clients', 'wrong-clients', 'no-client-boundaries'],
    impactAnalysis: {
      financialImpact: "High stress; low profit; team burnout.",
      severity: "Moderate",
      affectedAreas: ['Team Morale', 'Profitability', 'Service Quality'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Medium',
      quickWins: ["Define client boundaries", "Fire the worst 10% of clients", "Improve client vetting"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Desperate for business", "Weak sales qualifying", "Lack of clear boundaries"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated client onboarding and expectation-setting sequences."
      },
      pathToRoot: "Client Issues → Inefficient Delivery → Money Out Fast → Not Enough Money (Root)"
    }
  },
  'cant-delegate-founder': {
    explanation: "You struggle to let go of control, either because you don't trust others or you don't know how to delegate effectively.",
    relatedProblems: ['dont-trust-others', 'easier-do-myself', 'no-one-delegate'],
    impactAnalysis: {
      financialImpact: "Capped growth; high opportunity cost.",
      severity: "Major",
      affectedAreas: ['Scalability', 'Founder Productivity'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Document a task", "Delegate a small project", "Set clear expectations"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Control issues", "Lack of training systems", "Hero complex"],
      automationPotential: {
        rating: 'High',
        example: "Using delegation tracking tools to monitor task progress without constant check-ins."
      },
      pathToRoot: "Cant Delegate → Founder Bottleneck → Capacity Issues → Revenue Risk (Root)"
    }
  },
  'no-processes-documented': {
    explanation: "Everything is in the founder's head. This makes delegating impossible and training new team members slow and painful.",
    relatedProblems: ['everything-founders-head', 'cant-hand-off', 'explain-every-time'],
    impactAnalysis: {
      financialImpact: "High cost of training; inconsistent quality; low asset value.",
      severity: "Major",
      affectedAreas: ['Operations', 'Asset Value', 'Scalability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: 'Hard',
      quickWins: ["Record tasks today", "Create a simple SOP index", "Start with most recurring tasks"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder hero syndrome", "Lack of time to document", "Scale exceeding infrastructure"],
      automationPotential: {
        rating: 'Medium',
        example: "Using AI to generate SOP drafts from screen recordings."
      },
      pathToRoot: "No Docs → Founder Bottleneck → Capacity Issues → Revenue Risk (Root)"
    }
  },
  'skills-knowledge-gap': {
    explanation: "The founder or team lacks critical business, marketing, or technical skills needed to scale.",
    relatedProblems: ['no-business-skills', 'no-marketing-skills', 'learning-too-slow'],
    impactAnalysis: {
      financialImpact: "Missed opportunities; poor strategic decisions.",
      severity: "Major",
      affectedAreas: ['Leadership', 'Strategic Growth', 'Competitiveness'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-18 months",
      difficulty: 'Hard',
      quickWins: ["Identify top 1 skill to learn", "Find a mentor", "Join a peer group"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inexperience", "Lack of training resources", "No time to learn"],
      automationPotential: {
        rating: 'Low',
        example: "Skill gaps are solved through education/hiring, not directly through automation."
      },
      pathToRoot: "Skill Gap → Founder Bottleneck → Strategic Failure → Not Enough Money (Root)"
    }
  },
  // CHURN BRANCH
  'competitor-stole': {
    explanation: "A competitor offered a better price, better features, or a better relationship. You lost the client because you stopped being the 'Best' choice for them.",
    relatedProblems: ['commoditized-service', 'no-differentiation'],
    impactAnalysis: {
      financialImpact: "Loss of market share; increased acquisition pressure.",
      severity: "Major",
      affectedAreas: ['LTV', 'Competitive Positioning'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: 'Hard',
      quickWins: ["Run a 'Win-Back' campaign with a unique new feature", "Analyze the competitor's offer and find their weakness", "Interview the churned client to see exactly where you fell short"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Commoditization", "Passive relationship management", "Competitor innovation"],
      automationPotential: {
        rating: 'Medium',
        example: "Competitive intelligence tools to track rival pricing and features automatically."
      },
      pathToRoot: "Competitor Stole → Why They Left → Clients Churned"
    }
  },
  'no-renewal-process': {
    explanation: "Contracts are ending and no one is asking for the renewal. You are letting clients drift away simply because you didn't send a follow-up email.",
    relatedProblems: ['no-retention-system', 'assuming-stay'],
    impactAnalysis: {
      financialImpact: "Passive revenue erosion; high cost of replacement sales.",
      severity: "Major",
      affectedAreas: ['Retention Rate', 'LTV'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: 'Easy',
      quickWins: ["Setup automated renewal alerts 60 days out", "Offer a 'Renewal Bonus' for early sign-ups", "Standardize the contract extension template"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of admin oversight", "Fear of client re-evaluating the deal"],
      automationPotential: {
        rating: 'High',
        example: "Automated contract renewal workflows in your CRM or CLM."
      },
      pathToRoot: "No Renewal Process → No Retention System → Clients Churned"
    }
  },
  // LEAD GEN BRANCH
  'dont-know-where-market': {
    explanation: "You are guessing where your leads are. You are spending time on Instagram when your clients are on LinkedIn, or at trade shows when they are on Google.",
    relatedProblems: ['no-research', 'guessing-demographics'],
    impactAnalysis: {
      financialImpact: "Massive waste of marketing spend and founder time.",
      severity: "Major",
      affectedAreas: ['Marketing ROI', 'Lead Quality'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: 'Medium',
      quickWins: ["Survey your top 10 clients: 'Where do you spend your time online?'", "Install tracking pixels to see where traffic is coming from", "Interview a competitor's client"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of customer research", "Marketing based on 'Gut'"],
      automationPotential: {
        rating: 'Medium',
        example: "Using AI audience research tools (SparkToro, etc.) to map your market."
      },
      pathToRoot: "Unknown Market Location → Cant Find Prospects → Not Getting New Clients"
    }
  },
  'lead-gen-insufficient': {
    explanation: "Your pipeline is dry. You don't have enough 'Shots on Goal' to hit your revenue targets. This is a volume problem.",
    relatedProblems: ['not-enough-activity', 'sources-dried'],
    impactAnalysis: {
      financialImpact: "Revenue stagnation; inability to project future growth.",
      severity: "Critical",
      affectedAreas: ['Top-line Revenue', 'Business Survival'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Double your daily outreach activity", "Launch a cold email campaign today", "Partner with a non-competing brand for a shoutout"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inconsistent marketing effort", "Reliance on a single channel"],
      automationPotential: {
        rating: 'High',
        example: "Automated outbound prospecting systems (Instantly, Apollo, etc.)."
      },
      pathToRoot: "Low Lead Volume → Cant Find Prospects → Not Getting New Clients"
    }
  },
  'no-visibility': {
    explanation: "You are invisible to the market. You have no 'Digital Footprint,' making it impossible for prospects to find you organically.",
    relatedProblems: ['no-marketing', 'no-website', 'seo-nonexistent'],
    impactAnalysis: {
      financialImpact: "100% reliance on expensive paid ads or manual outreach.",
      severity: "Major",
      affectedAreas: ['Organic Reach', 'Acquisition Cost'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-12 months",
      difficulty: 'Hard',
      quickWins: ["Setup a basic Google My Business profile", "Launch a 1-page high-converting website", "Start a consistent social media schedule (3x/week)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder avoidance of 'Public' presence", "Technical debt in marketing tech"],
      automationPotential: {
        rating: 'High',
        example: "Automated social media posting and basic AI-driven content generation."
      },
      pathToRoot: "No Visibility → Prospects Dont Know → Not Getting New Clients"
    }
  },
  'message-no-resonate': {
    explanation: "People are seeing you, but they don't care. Your message is too generic, too technical, or simply doesn't solve a pain they actually feel.",
    relatedProblems: ['talking-us-not-problems', 'benefits-unclear', 'weak-messaging'],
    impactAnalysis: {
      financialImpact: "High cost of attention with zero conversion.",
      severity: "Major",
      affectedAreas: ['Click-through Rate', 'Conversion Rate'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: 'Medium',
      quickWins: ["Rewrite your headline to address a 'Burning Pain'", "Use 'You' more than 'I' or 'We' in your copy", "Record a 2-min video explaining the *Problem* you solve"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of empathy/customer understanding", "Feature-focused selling"],
      automationPotential: {
        rating: 'High',
        example: "Using AI to analyze customer reviews and rewrite copy in their exact voice."
      },
      pathToRoot: "Message Mismatch → Aware But Dont Engage → Not Getting New Clients"
    }
  },
  'offer-not-compelling': {
    explanation: "Your product/service sounds 'Fine.' But fine doesn't get people to part with their money. You lack a 'Grand Slam Offer' that feels like an obvious win.",
    relatedProblems: ['looks-like-everyone', 'no-differentiation', 'nothing-unique'],
    impactAnalysis: {
      financialImpact: "High price sensitivity; long sales conversations that end in 'No.'",
      severity: "Major",
      affectedAreas: ['Sales Conversion', 'Pricing Power'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Medium',
      quickWins: ["Add a 'Risk-Free Guarantee'", "Bundle a high-value 'Bonus' that costs you little", "Create a 'Limited Time' or 'Limited Quantity' reason to act now"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Commoditization", "Fear of making a bold claim"],
      automationPotential: {
        rating: 'Low',
        example: "N/A - this is a strategy and creative task."
      },
      pathToRoot: "Weak Offer → Aware But Dont Engage → Not Getting New Clients"
    }
  },
  'dont-trust-us': {
    explanation: "The prospect likes the idea, but they don't believe *you* can deliver it. You lack the 'Proof' required to lower their perceived risk.",
    relatedProblems: ['no-testimonials', 'no-track-record', 'website-unprofessional'],
    impactAnalysis: {
      financialImpact: "High drop-off at the final stage of the funnel.",
      severity: "Major",
      affectedAreas: ['Close Rate', 'Brand Equity'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Get 3 video testimonials from happy clients", "Showcase logos of recognizable brands you've worked with", "Publish a detailed 'Deep Dive' case study showing your process"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["New business/offer', 'Invisible results', 'Poor branding"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated testimonial gathering and display widgets (Senja, TrustPulse)."
      },
      pathToRoot: "Lack of Trust → Engage But Dont Buy → Not Getting New Clients"
    }
  },
  // ADMIN BRANCH
  'admin-busywork': {
    explanation: "You are spending your expensive founder hours on data entry, scheduling, and invoice chasing. Every hour you spend on admin is an hour you aren't spending on growth.",
    relatedProblems: ['low-value-work', 'admin-staff'],
    impactAnalysis: {
      financialImpact: "Massive opportunity cost; strategic stagnation.",
      severity: "Moderate",
      affectedAreas: ['Founder Throughput', 'Growth Rate'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Easy',
      quickWins: ["Hire a VA for 2 hours a day", "Setup an automated scheduler (Calendly)", "Use AI to draft your common emails"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of delegation", "Hero complex"],
      automationPotential: {
        rating: 'High',
        example: "AI-powered calendar and inbox management."
      },
      pathToRoot: "Admin Work → Low-Value Work → Time Trapped → Personal Bottlenecks"
    }
  },
  'email-meeting-overload': {
    explanation: "Your day is reactive. You are at the mercy of everyone else's priorities. If you spend 6 hours a day in meetings and email, you only have 2 hours left for the business.",
    relatedProblems: ['time-management-broken', 'interruptions-constant'],
    impactAnalysis: {
      financialImpact: "Zero time for 'Deep Work'; slow decision-making.",
      severity: "Major",
      affectedAreas: ['Strategic Vision', 'Team Speed'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: 'Medium',
      quickWins: ["Implement 'No-Meeting Wednesdays'", "Check email only 3x per day", "Cancel all recurring meetings for one week and see which ones actually need to come back"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of asynchronous culture", "Inability to say 'No'"],
      automationPotential: {
        rating: 'High',
        example: "AI meeting summaries (Fireflies/Otter) to skip 50% of meetings."
      },
      pathToRoot: "Overload → Low-Value Work → Time Trapped → Personal Bottlenecks"
    }
  },
  'dont-trust-others': {
    explanation: "The 'Only I can do it right' mindset. This is the ultimate growth killer. If you don't trust your team, you can never scale beyond your own hands.",
    relatedProblems: ['cant-delegate-founder', 'micromanagement', 'no-processes-documented'],
    impactAnalysis: {
      financialImpact: "Revenue is capped at founder's capacity; high team turnover.",
      severity: "Critical",
      affectedAreas: ['Scalability', 'Team Culture', 'Founder Burnout'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months (Mindset shift)",
      difficulty: 'Hard',
      quickWins: ["Delegate a 'Safe to Fail' task today", "Accept that 80% as good as you is good enough", "Focus on the 'Outcome' not the 'Method'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Perfectionism", "Previous bad hiring experiences"],
      automationPotential: {
        rating: 'Low',
        example: "N/A - this is a leadership and psychological hurdle."
      },
      pathToRoot: "Lack of Trust → Cant Delegate → Personal Bottlenecks"
    }
  },
  'everything-founders-head': {
    explanation: "The business relies on your 'Magic.' If you get sick, the business stops. You have no systems, only intuition.",
    relatedProblems: ['no-processes-documented', 'cant-hand-off', 'tribal-knowledge'],
    impactAnalysis: {
      financialImpact: "Zero exit value; impossible to train new hires fast.",
      severity: "Critical",
      affectedAreas: ['Business Continuity', 'Asset Value', 'Scalability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: 'Hard',
      quickWins: ["Record a Loom of you doing your core task today", "Create a 'Table of Contents' for your business", "Hire a 'Systems Architect' or VA to document for you"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Rushing to deliver", "Undervaluing systems"],
      automationPotential: {
        rating: 'Medium',
        example: "Using AI to transcribe your 'Brain Dumps' into structured SOPs."
      },
      pathToRoot: "Founders Head → No Processes → Time Trapped → Personal Bottlenecks"
    }
  },
  'everything-urgent': {
    explanation: "The 'Firefighting' mode. You are always reacting to the latest crisis. You never have time for the 'Important but not Urgent' tasks that actually grow the business.",
    relatedProblems: ['poor-prioritization', 'reactive-not-proactive'],
    impactAnalysis: {
      financialImpact: "Strategic drift; high burnout; missed long-term opportunities.",
      severity: "Major",
      affectedAreas: ['Strategic Growth', 'Mental Clarity'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: 'Medium',
      quickWins: ["Use the Eisenhower Matrix to categorize tasks", "Identify the 'One Thing' that makes everything else easier", "Schedule 90 mins of 'Proactive Time' first thing in the morning"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear goals", "No operational buffers"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated 'Crisis Alerts' that flag real problems vs noise."
      },
      pathToRoot: "Everything Urgent → Poor Prioritization → Disorganized → Personal Bottlenecks"
    }
  },
  'inbox-overflowing': {
    explanation: "Your email is a To-Do list that anyone in the world can add to. If you're drowning in unread messages, you've lost control of your communication.",
    relatedProblems: ['communication-mess', 'email-meeting-overload'],
    impactAnalysis: {
      financialImpact: "Missed sales leads; delayed project approvals; high anxiety.",
      severity: "Moderate",
      affectedAreas: ['Admin Efficiency', 'Sales Velocity'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: 'Easy',
      quickWins: ["Achieve 'Inbox Zero' once (even if by archiving everything older than 30 days)", "Setup filters for 'CC' emails", "Unsubscribe from every newsletter today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Using email for internal chat", "Lack of VA support"],
      automationPotential: {
        rating: 'High',
        example: "AI email triage (SaneBox or custom AI agents) to pre-sort your mail."
      },
      pathToRoot: "Inbox Overflow → Communication Chaos → Disorganized → Personal Bottlenecks"
    }
  },
  'working-too-much': {
    explanation: "The 'Hustle Porn' trap. You are working 70+ hours a week but the results aren't increasing. You are trading your life for a business that isn't working.",
    relatedProblems: ['burnout-energy', 'nights-weekends', 'no-time-off'],
    impactAnalysis: {
      financialImpact: "Diminishing returns on labor; high risk of health/relationship collapse.",
      severity: "Critical",
      affectedAreas: ['Founder Health', 'Decision Quality', 'Sustainability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Set a 'Hard Stop' at 6 PM today", "Remove work apps from your phone", "Book a weekend getaway with NO laptop"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inefficient systems", "Fear of failure", "Low prices (requiring volume)"],
      automationPotential: {
        rating: 'High',
        example: "Automating the 'Routine' work to buy back 20+ hours a week."
      },
      pathToRoot: "Too Much Work → Burnout → Personal Bottlenecks → Not Enough Money"
    }
  },
  'no-financial-literacy': {
    explanation: "You don't understand your P&L, Balance Sheet, or Cash Flow Statement. You are flying a plane without a dashboard.",
    relatedProblems: ['no-business-skills', 'dont-know-costs'],
    impactAnalysis: {
      financialImpact: "Inadvertent bankruptcy; tax surprises; missed profit opportunities.",
      severity: "Critical",
      affectedAreas: ['Financial Stability', 'Strategic Planning'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: 'Medium',
      quickWins: ["Hire a fractional CFO or high-level bookkeeper for an audit", "Learn the 'Big 3' financial metrics for your industry", "Review your numbers weekly, not once a year"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Creative/Technician background", "Aversion to numbers"],
      automationPotential: {
        rating: 'High',
        example: "Automated financial dashboards (Fathom, Syft) that translate numbers into plain English."
      },
      pathToRoot: "No Financial Literacy → Skills Gap → Personal Bottlenecks"
    }
  },
  'imposter-syndrome': {
    explanation: "You feel like a fraud. You're afraid that if you raise prices or speak with authority, you'll be 'found out.' This keeps you playing small.",
    relatedProblems: ['mindset-blocks', 'afraid-raise-prices'],
    impactAnalysis: {
      financialImpact: "Directly caps your revenue and pricing power.",
      severity: "Major",
      affectedAreas: ['Sales', 'Leadership', 'Brand Authority'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: 'Hard (Mindset)',
      quickWins: ["Keep a 'Win Folder' of client praise", "Talk to a mentor who has been there", "Raise prices for ONE client as an experiment"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of external validation", "Comparison trap"],
      automationPotential: {
        rating: 'Low',
        example: "N/A - this is psychological."
      },
      pathToRoot: "Imposter Syndrome → Mindset Blocks → Skills Gap → Personal Bottlenecks"
    }
  },
  // FULFILLMENT / CAPACITY
  'cant-hire-fast': {
    explanation: "You have the money to hire, but you can't find the right people. Your hiring process is either too slow, too picky, or you're looking in the wrong places.",
    relatedProblems: ['job-market-competitive', 'hiring-process-slow'],
    impactAnalysis: {
      financialImpact: "Missed revenue from unfulfilled sales; existing team burnout.",
      severity: "Major",
      affectedAreas: ['Capacity', 'Team Morale', 'Growth Rate'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: 'Hard',
      quickWins: ["Standardize the interview questions", "Use a 'Test Task' to filter applicants fast", "Ask for referrals from your current best employees"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of employer branding", "Unclear job descriptions", "Bottlenecked interview process"],
      automationPotential: {
        rating: 'High',
        example: "Using Applicant Tracking Systems (ATS) with AI screening to filter the top 5% of candidates."
      },
      pathToRoot: "Cant Hire Fast → Capacity Issues → Bought Cant Deliver"
    }
  },
  'training-long': {
    explanation: "It takes 6 months for a new hire to become 'Profitable.' This lag time drains your cash flow and makes scaling dangerous.",
    relatedProblems: ['no-training-system', 'learning-curve-steep'],
    impactAnalysis: {
      financialImpact: "High cost of 'Unproductive' payroll; slow ROI on new hires.",
      severity: "Moderate",
      affectedAreas: ['Cash Flow', 'Team Efficiency'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: 'Medium',
      quickWins: ["Create a 'First 7 Days' onboarding checklist", "Record 'Screen-shares' of common tasks", "Assign a 'Buddy' to new hires to offload the founder"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Complex/bespoke service", "Lack of documentation", "No structured training path"],
      automationPotential: {
        rating: 'High',
        example: "Using AI-driven training platforms (Trainual, Whale) to automate the knowledge transfer."
      },
      pathToRoot: "Long Training → Capacity Issues → Bought Cant Deliver"
    }
  },
  'team-unreliable': {
    explanation: "You have people, but they don't care as much as you do. Mistakes are made, deadlines are missed, and you feel like you have to 'Babysit' everyone.",
    relatedProblems: ['people-underperform', 'management-issues', 'motivation-low'],
    impactAnalysis: {
      financialImpact: "High cost of rework; churn risk; massive founder stress.",
      severity: "Critical",
      affectedAreas: ['Quality Control', 'Team Culture', 'Operations'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard',
      quickWins: ["Set clear 'Performance KPIs' for every role", "Hold weekly 1-on-1s focused on goals", "Fire the worst performer to reset the standard"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor hiring criteria", "Lack of leadership", "No accountability systems"],
      automationPotential: {
        rating: 'Medium',
        example: "Automated task-tracking and 'Missed Deadline' alerts to maintain accountability without 'Nagging'."
      },
      pathToRoot: "Unreliable Team → Capacity Issues → Bought Cant Deliver"
    }
  },
  'manual-data-entry': {
    explanation: "You are paying humans to copy-paste information from one tool to another. This is the ultimate form of 'Waste' in a modern business.",
    relatedProblems: ['copy-paste-hell', 'no-automation', 'tools-inadequate'],
    impactAnalysis: {
      financialImpact: "High labor cost; high error rate; zero scalability.",
      severity: "Major",
      affectedAreas: ['Efficiency', 'Gross Margin', 'Scalability'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: 'Easy',
      quickWins: ["Setup Zapier/Make between your CRM and Billing", "Use 'Import/Export' instead of typing", "Identify the 'Most Repeated' data task and automate it today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical debt", "Siloed tools", "Lack of integration knowledge"],
      automationPotential: {
        rating: 'High',
        example: "Using API-based integrations to move data instantly and perfectly between all systems."
      },
      pathToRoot: "Manual Data Entry → Tools Inadequate → Process Bottlenecks → Bought Cant Deliver"
    }
  },
  'scope-creep-profit': {
    explanation: "The client asks for 'One more thing' and you say 'Sure.' You are trading your profit for their happiness, and they don't even realize you're doing them a favor.",
    relatedProblems: ['extras-free', 'no-change-order-process'],
    impactAnalysis: {
      financialImpact: "Direct erosion of project margin; team burnout from 'Never-ending' work.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Team Capacity', 'Project Management'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: 'Medium',
      quickWins: ["Refer to the 'Initial Scope' in every feedback meeting", "Create a 'Phase 2' list for all extra requests", "Charge a 20% premium for any work added mid-project"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Vague SOWs", "Fear of client conflict", "No formal change process"],
      automationPotential: {
        rating: 'Medium',
        example: "Using project management tools that require 'Credit' or 'Add-on' approvals for new tasks."
      },
      pathToRoot: "Scope Creep → Project Management Issues → Bought Cant Deliver"
    }
  },
  'timelines-slip': {
    explanation: "Projects are taking longer than quoted. This delays your next project, delays your payment, and costs you more in overhead per deal.",
    relatedProblems: ['underestimate-time-pm', 'dependencies-delays'],
    impactAnalysis: {
      financialImpact: "Cash flow stagnation; decreased annual throughput; high opportunity cost.",
      severity: "Major",
      affectedAreas: ['Operations', 'Cash Flow', 'Reputation'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: 'Medium',
      quickWins: ["Add a 'Timeline Buffer' to all new quotes", "Identify the 'Critical Path' and monitor it daily", "Ask: 'What is the #1 thing that causes delays?' and fix it"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Optimism bias", "Unmanaged dependencies", "Poor resource planning"],
      automationPotential: {
        rating: 'High',
        example: "Automated Gantt charts and 'Delay Warnings' that flag issues before they become crises."
      },
      pathToRoot: "Timelines Slip → Project Management Issues → Bought Cant Deliver"
    }
  },
  'wrong-clients': {
    explanation: "You are working with people who can't afford you, don't value you, or have problems you aren't optimized to solve. They are draining your energy and profit.",
    relatedProblems: ['bad-fit-services', 'cant-afford-pricing', 'high-maintenance-low-profit'],
    impactAnalysis: {
      financialImpact: "High 'Support-to-Revenue' ratio; high churn; team misery.",
      severity: "Major",
      affectedAreas: ['Profitability', 'Team Morale', 'Brand Alignment'],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: 'Hard (Mindset)',
      quickWins: ["Fire your most 'Abusive' or 'Unprofitable' client today", "Tighten your 'Lead Qualification' form", "Say 'No' to any prospect who asks for a discount in the first meeting"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling out of desperation", "Weak marketing filters", "No clear niche"],
      automationPotential: {
        rating: 'High',
        example: "Using automated 'Qualification Quizzes' to filter out bad-fit clients before they even talk to you."
      },
      pathToRoot: "Wrong Clients → Client Management Issues → Bought Cant Deliver"
    }
  }
};

// Default explanation when specific node not found
export const getNodeExplanation = (nodeId: string): NodeExplanation => {
  return nodeExplanations[nodeId] || {
    explanation: "This specific issue contributes to the overall problem in your diagnostic branch. It represents a point of friction, inefficiency, or missing infrastructure that needs to be addressed to unlock growth.",
    relatedProblems: [],
    impactAnalysis: {
      financialImpact: "Varies by business context; usually manifests as lost time or missed opportunities.",
      severity: "To be assessed",
      affectedAreas: ['Operations', 'Efficiency'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: 'Medium',
      quickWins: ["Document the current process", "Identify the single biggest bottleneck in this step", "Ask the team for one suggestion to fix it"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of standardized SOP", "Undefined ownership", "Outdated tools"],
      automationPotential: {
        rating: 'Medium',
        example: "Look for repetitive data entry or communication steps that can be automated."
      },
      pathToRoot: "Part of the larger systemic chain identified in the map."
    }
  };
};
