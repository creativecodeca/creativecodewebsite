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
    relatedProblems: ['no-followup', 'invoices-unclear', 'no-penalties'],
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
  'overhead-high': {
    explanation: "Fixed costs that exist regardless of sales volume. This 'high floor' creates immense pressure to sell constantly just to break even.",
    relatedProblems: ['expensive-office', 'many-subscriptions', 'admin-staff'],
    impactAnalysis: {
      financialImpact: "High break-even point; reduced flexibility.",
      severity: "Moderate",
      affectedAreas: ['Fixed Costs', 'Business Resilience'],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: 'Medium',
      quickWins: ["Review office space needs", "Audit software subscriptions", "Analyze admin headcount"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Premature scaling", "Over-investment in 'status' symbols", "Lack of cost discipline"],
      automationPotential: {
        rating: 'High',
        example: "Using automation to handle admin tasks instead of hiring more staff."
      },
      pathToRoot: "Overhead High → Expenses High → Money Out Fast → Not Enough Money (Root)"
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
