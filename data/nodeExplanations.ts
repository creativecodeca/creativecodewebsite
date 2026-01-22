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
    explanation: 'Your business is in a state of financial scarcity. This isn't just about 'making more sales'—it's a systemic failure where the cash produced by the business is insufficient to cover operations, pay the founder, and reinvest in growth. This creates a high-stress 'survival mode' that prevents strategic thinking.',
    relatedProblems: ["money-slow", "money-out-fast", "not-enough-revenue"],
    impactAnalysis: {
      financialImpact: 'Complete business failure risk if not addressed.',
      severity: "Critical",
      affectedAreas: ["Everything"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-12 months",
      difficulty: "Hard",
      quickWins: ["Immediate audit of all expenses", "Pause all non-essential hiring", "Contact late-paying clients today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Broken pricing model", "High churn", "Inefficient fulfillment", "Poor lead quality"],
      automationPotential: {
        rating: "High",
        example: 'End-to-end automated financial dashboard for real-time visibility.'
      },
      pathToRoot: 'This is the root node.'
    }
  },
  'money-slow': {
    explanation: 'The "Cash Gap" problem. You are earning money (accrual) but not receiving it (cash). This often happens when a business scales; you have to pay for the work before the client pays you, draining your reserves even while you grow.',
    relatedProblems: ["payment-terms-long", "clients-pay-late", "cash-flow-gaps"],
    impactAnalysis: {
      financialImpact: 'Operational paralysis; unable to pay vendors/team on time.',
      severity: "Major",
      affectedAreas: ["Operations", "Team Trust", "Vendor Relations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Implement upfront deposits", "Shorten invoice terms for new contracts", "Automate invoice reminders"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak contract terms", "Manual invoicing", "No late payment penalties"],
      automationPotential: {
        rating: "High",
        example: 'Automated dunning (follow-up) sequences for unpaid invoices.'
      },
      pathToRoot: 'Slow Money → Not Enough Money (Root)'
    }
  },
  'money-out-fast': {
    explanation: 'The "Leaky Bucket" problem. No matter how much revenue you bring in, the costs of running the business scale at the same or higher rate. This usually points to inefficient operations, high overhead, or low margins.',
    relatedProblems: ["expenses-high", "margins-low"],
    impactAnalysis: {
      financialImpact: 'Profitability death spiral; working harder for less money.',
      severity: "Major",
      affectedAreas: ["Profit Margins", "Reinvestment Capacity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-4 months",
      difficulty: "Medium",
      quickWins: ["Cancel unused SaaS subscriptions", "Review subcontractor rates", "Analyze time spent on rework"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Operational inefficiency", "Lack of budget controls", "Scope creep"],
      automationPotential: {
        rating: "High",
        example: 'Automating repetitive delivery tasks to lower cost-per-fulfillment.'
      },
      pathToRoot: 'Money Out Fast → Not Enough Money (Root)'
    }
  },
  'expenses-high': {
    explanation: 'Your total cash outflow is simply too high relative to your revenue. This can be due to bloated overhead, expensive acquisition, or inefficient fulfillment. It"s not just about spending less, but about spending effectively on the right things.',
    relatedProblems: ["overhead-high", "delivery-costs-high", "acquisition-costs-high"],
    impactAnalysis: {
      financialImpact: 'Reduced net profit; inability to build cash reserves or reinvest in growth.',
      severity: "Major",
      affectedAreas: ["Profitability", "Cash Flow", "Business Sustainability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Audit every single recurring expense today", "Negotiate better rates with top 3 vendors", "Eliminate any expense that doesn"t directly contribute to revenue or fulfillment"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of budgetary discipline", "Lifestyle/ego creep in business", "Inefficient sales or delivery models"],
      automationPotential: {
        rating: "High",
        example: 'Automated expense tracking and alerting when categories exceed budget.'
      },
      pathToRoot: 'Expenses Too High → Money Out Fast → Not Enough Money (Root)'
    }
  },
  'not-enough-capacity': {
    explanation: 'Your sales team is winning, but your delivery team is drowning. You lack the human or technical resources to fulfill the promises you"ve made without massive delays or quality drops.',
    relatedProblems: ["founder-everything", "cant-hire-fast", "scaling-constraints"],
    impactAnalysis: {
      financialImpact: 'High churn risk; inability to scale revenue; team burnout.',
      severity: "Major",
      affectedAreas: ["Operations", "Team Health", "Customer Retention"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Temporarily increase prices to slow lead flow", "Hire 1099 contractors for immediate relief", "Audit the most time-consuming step in fulfillment"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Sudden sales spike", "Under-hiring", "Inefficient fulfillment model"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated workload balancing and capacity planning dashboards.'
      },
      pathToRoot: 'Capacity Issues → Bought Cant Deliver → Not Enough Revenue (Root)'
    }
  },
  'cant-hire-fast': {
    explanation: 'You need more people, but your hiring process is too slow or you can"t find qualified candidates. The business is stalling because the 'Seat' is empty.',
    relatedProblems: ["not-enough-capacity", "training-long"],
    impactAnalysis: {
      financialImpact: 'Delayed project starts; missed revenue targets; existing team burnout.',
      severity: "Moderate",
      affectedAreas: ["Recruitment", "Growth Speed"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Implement an "Employee Referral" bonus", "Outsource initial screening to a VA or agency", "Use skills-based assessments instead of 5 rounds of interviews"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Broken hiring funnel", "Unrealistic job requirements", "Poor employer brand"],
      automationPotential: {
        rating: "High",
        example: 'Automated applicant tracking and screening using AI.'
      },
      pathToRoot: 'Hiring Bottleneck → Capacity Issues → Bought Cant Deliver'
    }
  },
  'cant-afford-hire': {
    explanation: 'You need more help, but you don"t have the cash flow or margins to pay for it. You are trapped in the 'Value Valley' where you're too big to do it alone but too small to afford a team.',
    relatedProblems: ["margins-low", "no-buffer"],
    impactAnalysis: {
      financialImpact: 'Growth ceiling; founder exhaustion; inability to scale.',
      severity: "Major",
      affectedAreas: ["Financial Stability", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Raise prices to create a "Hiring Fund"", "Hire part-time/offshore initially", "Automate one entire role instead of hiring for it"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Low margins", "Inefficient delivery model", "High overhead"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to perform the work of 1-2 junior employees.'
      },
      pathToRoot: 'Affordability Issues → Capacity Issues → Bought Cant Deliver'
    }
  },
  'training-long': {
    explanation: 'New hires take too long to become "Revenue Positive.' You are spending weeks or months training them, during which they are a net cost to the business.',
    relatedProblems: ["no-processes-documented", "team-unreliable"],
    impactAnalysis: {
      financialImpact: 'High cost of onboarding; delayed capacity scaling.',
      severity: "Moderate",
      affectedAreas: ["Onboarding Efficiency", "Profitability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Create a "New Hire Playbook" today", "Use screen recordings (Loom) for 80% of training", "Implement a "Buddy System" to offload the founder"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of SOPs", "Complex service model", "Founder-led training only"],
      automationPotential: {
        rating: "High",
        example: 'Interactive AI training modules and internal knowledge bases.'
      },
      pathToRoot: 'Slow Onboarding → Capacity Issues → Bought Cant Deliver'
    }
  },
  'team-unreliable': {
    explanation: 'You have the seats filled, but the work isn"t getting done correctly or on time. You spend more time managing 'people problems' than growing the business.',
    relatedProblems: ["management-issues", "quality-problems"],
    impactAnalysis: {
      financialImpact: 'High turnover costs; rework costs; missed deadlines.',
      severity: "Major",
      affectedAreas: ["Team Culture", "Operational Reliability", "Customer Satisfaction"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Implement a weekly "KPI Review" for every role", "Set clear "Red Lines" for performance", "Hold one-on-one "Stay Interviews" with your best people"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor hiring vetting", "Lack of clear expectations/KPIs", "Weak culture"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated performance tracking and status reporting.'
      },
      pathToRoot: 'Reliability Issues → Capacity Issues → Bought Cant Deliver'
    }
  },
  'scaling-constraints': {
    explanation: 'Your business model has a physical or logical limit. You can"t just "add more' without hitting a wall (e.g., floor space, specialized equipment, or regulatory caps).',
    relatedProblems: ["physical-limitations", "technology-cant-handle"],
    impactAnalysis: {
      financialImpact: 'Capped revenue; decreasing ROI on additional efforts.',
      severity: "Major",
      affectedAreas: ["Strategic Growth", "Profitability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Audit utilization of current assets", "Switch to a digital/scalable add-on service", "Optimize current space/tech for 20% more efficiency"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Asset-heavy model", "Outgrown infrastructure", "Legacy technology"],
      automationPotential: {
        rating: "Medium",
        example: 'Using IoT or advanced scheduling to maximize asset utilization.'
      },
      pathToRoot: 'Scaling Limits → Capacity Issues → Bought Cant Deliver'
    }
  },
  'process-bottlenecks': {
    explanation: 'Your delivery pipeline has "narrow" points where work gets stuck. Even if the rest of the team is fast, everything slows down to the speed of the bottleneck.',
    relatedProblems: ["manual-processes", "no-systems", "coordination-issues"],
    impactAnalysis: {
      financialImpact: 'Lost revenue due to delays; high team frustration; inefficient resource use.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Throughput", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Identify the single point where 80% of work stalls", "Hire a specialist for that one step", "Automate the handoff to and from the bottleneck"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of horizontal scaling", "Single-point-of-failure roles", "Manual data handoffs"],
      automationPotential: {
        rating: "High",
        example: 'Workflow automation to route tasks and data instantly between departments.'
      },
      pathToRoot: 'Process Bottleneck → Bought Cant Deliver → Not Enough Revenue'
    }
  },
  'manual-processes': {
    explanation: 'You are performing tasks by hand that should be handled by code or systems. This is the biggest "hidden tax" on your team's time.',
    relatedProblems: ["inefficient-processes", "copy-paste-hell"],
    impactAnalysis: {
      financialImpact: 'High cost-per-fulfillment; human error risk; low scalability.',
      severity: "Major",
      affectedAreas: ["Team Capacity", "Profitability", "Speed"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Identify the top 3 "Copy-Paste' tasks and automate them", "Use Zapier/Make to connect your tools", "Implement templates for all repetitive documents"],
    },
    rootCauseAnalysis: {
      likelyCauses: [""How we"ve always done it" mindset", "Technical debt", "Lack of automation knowledge"],
      automationPotential: {
        rating: "High",
        example: 'Custom scripts or AI agents to perform routine data processing.'
      },
      pathToRoot: 'Manual Work → Process Bottleneck → Bought Cant Deliver'
    }
  },
  'no-systems': {
    explanation: 'You have no standardized "Way" of doing things. Every project is an invention, leading to massive variability in quality and time.',
    relatedProblems: ["tribal-knowledge", "no-sops", "inconsistent-methods"],
    impactAnalysis: {
      financialImpact: 'Unpredictable delivery costs; impossible to scale; high rework.',
      severity: "Critical",
      affectedAreas: ["Scalability", "Quality", "Asset Value"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-12 months",
      difficulty: "Hard",
      quickWins: ["Record a video of every task today", "Create a central "How-To' database (Notion/Wiki)", "Mandate the use of checklists for every project stage"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder-centric delivery", "Rapid growth without infrastructure", "Perfectionism ("I"m the only one who can do it')"],
      automationPotential: {
        rating: "High",
        example: 'Digital SOPs integrated directly into task management tools.'
      },
      pathToRoot: 'No Systems → Process Bottleneck → Bought Cant Deliver'
    }
  },
  'dependencies-key-people': {
    explanation: 'Your business breaks if one specific person gets sick or goes on vacation. You have "Knowledge Hoarding" or specialized roles with no backup.',
    relatedProblems: ["only-one-knows", "single-point-failure", "bus-factor"],
    impactAnalysis: {
      financialImpact: 'High risk of total operational stall; "Hostage" situations with key staff.',
      severity: "Major",
      affectedAreas: ["Operational Risk", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Mandate "Cross-Training' for critical tasks", "Require documentation for all unique workflows", "Incentivize knowledge sharing over hoarding"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Scale outstripping documentation", "Hiring "Heroes" instead of "Builders'", "Lack of redundant training"],
      automationPotential: {
        rating: "Medium",
        example: 'Capturing tribal knowledge into an AI-powered internal search engine.'
      },
      pathToRoot: 'Person Dependency → Process Bottleneck → Bought Cant Deliver'
    }
  },
  'tools-inadequate': {
    explanation: 'You are using "Spreadsheets and Email" to run a business that needs a 'CRM and ERP.' Your tech stack is holding you back instead of helping you grow.',
    relatedProblems: ["wrong-software", "systems-dont-integrate"],
    impactAnalysis: {
      financialImpact: 'Efficiency drag; data loss risk; inability to provide modern client experience.',
      severity: "Moderate",
      affectedAreas: ["Operational Speed", "Customer Experience", "Team Morale"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Identify the #1 most frustrating tool and replace it", "Hire a consultant to map your tech stack", "Sign up for ONE "source of truth" project tool"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical debt", "Frugality at the cost of efficiency", "Outgrown initial tools"],
      automationPotential: {
        rating: "High",
        example: 'Full stack integration using modern APIs and automation platforms.'
      },
      pathToRoot: 'Bad Tools → Process Bottleneck → Bought Cant Deliver'
    }
  },
  'coordination-issues': {
    explanation: 'The left hand doesn"t know what the right hand is doing. Work falls through the cracks at the handoff points between team members or departments.',
    relatedProblems: ["work-stuck", "miscommunication-who-does"],
    impactAnalysis: {
      financialImpact: 'Costly rework; missed deadlines; frustrated clients.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Team Trust", "Client Experience"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Implement a "DACI" (Driver, Approver, Contributor, Informed) model for projects", "Mandate all project updates happen in the PM tool, not Slack", "Host a 15-min daily "Scrum""],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear ownership", "Reliance on synchronous communication (meetings/chat)", "Undefined handoff SOPs"],
      automationPotential: {
        rating: "High",
        example: 'Automated task assignment and notification based on project status changes.'
      },
      pathToRoot: 'Coordination Chaos → Process Bottleneck → Bought Cant Deliver'
    }
  },
  'quality-problems': {
    explanation: 'You are delivering work, but it"s not up to standard. This leads to rework, refunds, and a damaged reputation. Quality is the foundation of retention.',
    relatedProblems: ["inconsistent-delivery-quality", "mistakes-rework", "client-dissatisfaction"],
    impactAnalysis: {
      financialImpact: 'Profit erosion; high churn; zero referrals.',
      severity: "Critical",
      affectedAreas: ["Brand Reputation", "LTV", "Margins"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Implement a mandatory "Quality Sign-off' checklist", "Audit the last 5 deliverables personally", "Fix the single most common "Bug" or error today"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Rushing to fulfillment", "Lack of training", "Undefined quality standards"],
      automationPotential: {
        rating: "Medium",
        example: 'AI-powered quality control tools to flag anomalies in deliverables.'
      },
      pathToRoot: 'Quality Failure → Bought Cant Deliver → Not Enough Revenue'
    }
  },
  'inconsistent-delivery-quality': {
    explanation: 'Client A gets a great experience, but Client B gets a mediocre one. Your results depend on "who" does the work rather than 'how' the business works.',
    relatedProblems: ["different-results", "no-quality-standards"],
    impactAnalysis: {
      financialImpact: 'Revenue "Gambling"; unpredictable referrals; high management overhead.',
      severity: "Major",
      affectedAreas: ["Scalability", "Brand Trust"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Standardize the final deliverable template", "Record "Master Class" videos for internal use", "Create a "Definition of Done" for all roles"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of standardized processes", "Team skill variability", "No centralized QA"],
      automationPotential: {
        rating: "High",
        example: 'Automated delivery pipelines that ensure every client gets the exact same file/report structure.'
      },
      pathToRoot: 'Inconsistency → Quality Problems → Bought Cant Deliver'
    }
  },
  'skills-gap': {
    explanation: 'Your team lacks the specific expertise needed to deliver the high-value results you"ve sold. You are 'learning on the client's dime' at the cost of speed and quality.',
    relatedProblems: ["team-no-expertise", "learning-on-job"],
    impactAnalysis: {
      financialImpact: 'High rework; slow delivery; risk of project failure.',
      severity: "Major",
      affectedAreas: ["Delivery Speed", "Profitability", "Service Quality"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Hire a high-level consultant to "Train the Trainers"", "Invest in a specialized course for the team", "Outsource the complex 20% of the work to a specialist"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Under-hiring", "Service complexity outstripping team training", "Rapid industry changes"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this requires human upskilling or hiring.'
      },
      pathToRoot: 'Skill Gap → Quality Problems → Bought Cant Deliver'
    }
  },
  'client-dissatisfaction': {
    explanation: 'The ultimate symptom of delivery failure. Clients are unhappy, complaining, or asking for refunds. This is a red-alert state for any business.',
    relatedProblems: ["poor-results", "complaints-issues"],
    impactAnalysis: {
      financialImpact: 'Immediate revenue loss; reputation damage; high churn.',
      severity: "Critical",
      affectedAreas: ["LTV", "Brand Equity", "Founder Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Call every complaining client personally today", "Offer a "Service Recovery" (extra value/refund)", "Identify and fix the root cause of the most common complaint"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-promising in sales", "Poor quality control", "Communication breakdown"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated NPS/Satisfaction surveys to catch issues before they escalate.'
      },
      pathToRoot: 'Unhappy Clients → Quality Problems → Bought Cant Deliver'
    }
  },
  'scope-creep-profit': {
    explanation: 'You are doing more work than the client paid for. This extra effort is unbilled, meaning it comes directly out of your net profit.',
    relatedProblems: ["clients-ask-more", "no-change-order-process"],
    impactAnalysis: {
      financialImpact: 'Direct erosion of margin; team burnout from "unending" projects.',
      severity: "Major",
      affectedAreas: ["Profitability", "Capacity", "Client Management"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Implement a strict "Change Order" policy today", "Review the original contract before every new request", "Say: "That"s a great idea, let's scope that for Phase 2'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poorly defined scope upfront", "People-pleasing mindset", "Lack of project tracking"],
      automationPotential: {
        rating: "Medium",
        example: 'Project tools that alert you when task hours exceed the original estimate.'
      },
      pathToRoot: 'Scope Creep → PM Issues → Bought Cant Deliver'
    }
  },
  'timelines-slip': {
    explanation: 'Projects are taking longer than estimated. This delays your final payment, clogs your pipeline, and frustrates both the client and your team.',
    relatedProblems: ["underestimate-time-pm", "unexpected-complications"],
    impactAnalysis: {
      financialImpact: 'Delayed cash flow; increased labor costs per project; lower total capacity.',
      severity: "Major",
      affectedAreas: ["Cash Flow", "Team Capacity", "Client Trust"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Add a 20% "Buffer" to all future project estimates", "Identify the #1 cause of the last 3 delays", "Implement a "Critical Path" management style"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Optimism bias in estimation", "Poor resource planning", "Unmanaged external dependencies"],
      automationPotential: {
        rating: "High",
        example: 'Automated Gantt charts and dependency tracking to flag delays before they happen.'
      },
      pathToRoot: 'Slipping Timelines → PM Issues → Bought Cant Deliver'
    }
  },
  'communication-breakdowns-pm': {
    explanation: 'Expectations are misaligned because communication is irregular or unclear. The client is confused, and the team is working on the wrong things.',
    relatedProblems: ["expectations-misaligned", "internal-miscommunication"],
    impactAnalysis: {
      financialImpact: 'Rework costs; client churn; low referral rate.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Client Experience", "Team Alignment"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Send a weekly "Project Status Report" every Friday", "Standardize the project kickoff meeting", "Use a shared project board with the client"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Reliance on chat (Slack) for project updates", "No dedicated project manager", "Lack of communication SOPs"],
      automationPotential: {
        rating: "High",
        example: 'Automated client status updates delivered via email/portal based on task completion.'
      },
      pathToRoot: 'Communication Failure → PM Issues → Bought Cant Deliver'
    }
  },
  'resource-allocation-wrong': {
    explanation: 'You have the right people but they are on the wrong tasks. Highly skilled people are doing busywork, while juniors are struggling with complex deliverables.',
    relatedProblems: ["wrong-people-projects", "overbooking"],
    impactAnalysis: {
      financialImpact: 'High labor costs; low efficiency; high burnout risk.',
      severity: "Moderate",
      affectedAreas: ["Team Efficiency", "Profitability", "Scalability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Map team skills to current project needs", "Offload "Low-Value' tasks from senior staff today", "Audit current workload vs capacity for every team member"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Reactive staffing", "Lack of visibility into team capacity", "Flat organizational structure"],
      automationPotential: {
        rating: "High",
        example: 'Capacity planning software that auto-recommends assignments based on skill/availability.'
      },
      pathToRoot: 'Resource Mismatch → PM Issues → Bought Cant Deliver'
    }
  },
  'difficult-clients': {
    explanation: 'You are working with people who are unreasonable, disrespectful, or constantly changing their minds. These clients take up 80% of your energy for 20% of your revenue.',
    relatedProblems: ["unreasonable-expectations", "constant-changes"],
    impactAnalysis: {
      financialImpact: 'Massive hidden costs; high team turnover; founder burnout.',
      severity: "Major",
      affectedAreas: ["Founder Health", "Team Morale", "Net Profit"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Fire your worst client today", "Implement a "PITA (Pain In The Ass) Tax' for difficult requests", "Strictly enforce contract boundaries"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Desperation for revenue during sales", "Weak qualifying", "Lack of clear boundaries"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a relationship and boundary-setting task.'
      },
      pathToRoot: 'Bad Clients → Client Management Issues → Bought Cant Deliver'
    }
  },
  'wrong-clients': {
    explanation: 'You are selling to people who don"t fit your model. They can't afford you, don't value what you do, or have problems you aren't designed to solve.',
    relatedProblems: ["bad-fit-services", "cant-afford-pricing"],
    impactAnalysis: {
      financialImpact: 'Low conversion; high support costs; zero ROI for the client.',
      severity: "Major",
      affectedAreas: ["Sales pipeline", "Profitability", "Product-Market Fit"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Hard",
      quickWins: ["Tighten your "Qualifying Criteria" in the sales process", "Increase your minimum engagement fee", "Refer bad-fit leads to a partner instead of saying yes"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Undefined ICP (Ideal Customer Profile)", "Marketing to the wrong audience", "Desperate sales mindset"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Qualifying Forms" that filter out bad fits before they book a call.'
      },
      pathToRoot: 'Fit Mismatch → Client Management Issues → Bought Cant Deliver'
    }
  },
  'no-client-boundaries': {
    explanation: 'The client owns you. They call you at night, demand instant replies, and treat your team like their personal staff. You have trained them that you will always say yes.',
    relatedProblems: ["available-24-7", "scope-creep-accepted"],
    impactAnalysis: {
      financialImpact: 'Invisible labor drain; high team stress; devalued service.',
      severity: "Moderate",
      affectedAreas: ["Operational Stability", "Founder Peace of Mind"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Set fixed "Office Hours" for communication", "Stop replying to non-emergency Slacks/emails after 6 PM", "Include a "Communication Policy" in your onboarding deck"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["People-pleasing founder", "Lack of onboarding discipline", "Over-dependence on a single large client"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Out of Office" and status updates to manage client expectations instantly.'
      },
      pathToRoot: 'No Boundaries → Client Management Issues → Bought Cant Deliver'
    }
  },

  // MONEY COMES IN SLOWLY - SUB-BRANCHES
  'payment-terms-long': {
    explanation: 'You are essentially acting as a bank for your clients, providing them interest-free loans. This is common in enterprise sales but deadly for small businesses without deep pockets.',
    relatedProblems: ["net-terms", "no-deposits", "deferred-payment"],
    impactAnalysis: {
      financialImpact: 'High cost of capital; cash flow unpredictability.',
      severity: "Moderate",
      affectedAreas: ["Cash Flow", "Negotiation Power"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate (for new deals)",
      difficulty: "Medium",
      quickWins: ["Require 50% upfront", "Offer a 2% discount for payment within 7 days", "Switch to weekly billing"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of losing the deal", "Following "industry standards" blindly", "Weak sales positioning"],
      automationPotential: {
        rating: "Medium",
        example: 'Setting up a payment portal that requires credit card on file before work starts.'
      },
      pathToRoot: 'Long Terms → Money Slow → Not Enough Money (Root)'
    }
  },
  'clients-pay-late': {
    explanation: 'A breakdown in account receivables management. Clients are ignoring your terms because there are no consequences, or your invoicing process is confusing and easy to ignore.',
    relatedProblems: ["no-followup-late", "invoices-unclear", "no-penalties"],
    impactAnalysis: {
      financialImpact: 'Variable cash flow; high administrative time spent "chasing" money.',
      severity: "Moderate",
      affectedAreas: ["Accounts Receivable", "Founder Stress"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Send automated reminders 3 days before due date", "Pick up the phone and call the AP department", "Charge a 5% late fee"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["No clear follow-up process", "Lack of automated dunning", "Client cash flow issues"],
      automationPotential: {
        rating: "High",
        example: 'Automated SMS and email reminders for overdue invoices (Dunning).'
      },
      pathToRoot: 'Late Payments → Money Slow → Not Enough Money (Root)'
    }
  },
  'net-terms': {
    explanation: 'Your business is trapped in "Net-30', "Net-60', or even 'Net-90' terms. You are effectively providing interest-free financing to your clients while you carry the costs of delivery.',
    relatedProblems: ["payment-terms-long", "cash-flow-gaps"],
    impactAnalysis: {
      financialImpact: 'Severe cash drag; business growth is capped by available cash reserves.',
      severity: "Major",
      affectedAreas: ["Working Capital", "Liquidity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (New deals)",
      difficulty: "Medium",
      quickWins: ["Offer 2/10 Net 30 (2% discount for payment in 10 days)", "Switch new clients to Net-15 or Due on Receipt"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Standard industry inertia", "Low negotiation leverage", "Fear of losing clients"],
      automationPotential: {
        rating: "Medium",
        example: 'Invoice factoring or supply chain finance integrations.'
      },
      pathToRoot: 'Net Terms → Long Terms → Money Slow → Not Enough Money'
    }
  },
  'no-deposits': {
    explanation: 'Starting work with zero cash in hand is a major risk. You are assuming 100% of the financial risk while the client assumes zero until delivery.',
    relatedProblems: ["payment-terms-long", "deferred-payment"],
    impactAnalysis: {
      financialImpact: 'Negative cash flow at project start; high risk of non-payment for work already done.',
      severity: "Major",
      affectedAreas: ["Cash Flow", "Risk Management"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Mandate a 50% non-refundable deposit for all new projects", "Require a small "Discovery Fee" before scoping"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of sales confidence", "Undefined onboarding process"],
      automationPotential: {
        rating: "High",
        example: 'Automated payment link sent as part of the contract signing process.'
      },
      pathToRoot: 'No Deposits → Long Terms → Money Slow → Not Enough Money'
    }
  },
  'milestones-spread': {
    explanation: 'Payment milestones are too far apart, causing you to go weeks or months without a cash injection while work continues.',
    relatedProblems: ["deferred-payment", "long-delivery-cycle"],
    impactAnalysis: {
      financialImpact: 'Cash flow "dry spells" during the middle of projects.',
      severity: "Moderate",
      affectedAreas: ["Operational Stability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Break projects into smaller, weekly or bi-weekly milestones", "Invoiced based on time elapsed rather than just output"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor project scoping", "Inflexible billing software"],
      automationPotential: {
        rating: "Medium",
        example: 'Project management tools that auto-trigger invoices when a task status changes.'
      },
      pathToRoot: 'Spread Milestones → Long Terms → Money Slow → Not Enough Money'
    }
  },
  'deferred-payment': {
    explanation: 'Waiting until the very end of a project to get paid is a recipe for disaster. It incentivizes the client to drag out the "final 5%' to delay payment.',
    relatedProblems: ["no-deposits", "long-delivery-cycle"],
    impactAnalysis: {
      financialImpact: 'Extremely high risk; zero cash flow during project lifecycle.',
      severity: "Critical",
      affectedAreas: ["Business Survival", "Risk Management"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Medium",
      quickWins: ["Shift to "Progress Billing"", "Retain ownership of deliverables until final payment is cleared"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Outdated contract templates", "Fear of client pushback"],
      automationPotential: {
        rating: "Low",
        example: 'This is a contractual change, but can be managed via escrow-style payment tools.'
      },
      pathToRoot: 'Deferred Payment → Long Terms → Money Slow → Not Enough Money'
    }
  },
  'no-followup-late': {
    explanation: 'If you don"t ask for the money, people often won't send it. Silence is interpreted as 'it's not urgent.'',
    relatedProblems: ["clients-pay-late", "no-penalties"],
    impactAnalysis: {
      financialImpact: 'Increased Days Sales Outstanding (DSO); higher chance of bad debt.',
      severity: "Moderate",
      affectedAreas: ["Cash Flow", "Accounts Receivable"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Setup automated email reminders", "Calendar "AR Day" once a week for personal follow-up"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder discomfort with "confrontation"", "No admin support"],
      automationPotential: {
        rating: "High",
        example: 'Automated dunning sequences via tools like Chaser or QuickBooks Online.'
      },
      pathToRoot: 'No Follow-up → Late Payments → Money Slow → Not Enough Money'
    }
  },
  'invoices-unclear': {
    explanation: 'Confusion is the #1 reason for payment delays. If the client doesn"t know what they"re paying for or how to pay it, the invoice goes to the bottom of the pile.',
    relatedProblems: ["payment-friction", "wrong-person"],
    impactAnalysis: {
      financialImpact: 'Needless delays; high admin time spent answering "what is this?' emails.',
      severity: "Low",
      affectedAreas: ["Admin Efficiency", "Client Experience"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Include clear itemized lists", "Add a "Pay Now" button directly on the PDF", "Standardize invoice titles"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor billing software", "Rushed data entry"],
      automationPotential: {
        rating: "High",
        example: 'Using standardized invoice templates that pull directly from project management data.'
      },
      pathToRoot: 'Unclear Invoices → Late Payments → Money Slow → Not Enough Money'
    }
  },
  'no-penalties': {
    explanation: 'Without late fees, there is no downside for the client to prioritize other vendors over you. You are the cheapest "loan" they have.',
    relatedProblems: ["clients-pay-late", "no-followup-late"],
    impactAnalysis: {
      financialImpact: 'Devaluation of your time; incentivizes bad client behavior.',
      severity: "Moderate",
      affectedAreas: ["Client Management", "Cash Flow"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Update contract to include 1.5% monthly interest on late payments", "Apply a "grace period" but show the fee on the invoice"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of sounding "mean"", "Missing from legal templates"],
      automationPotential: {
        rating: "High",
        example: 'Accounting software that auto-applies late fees after X days.'
      },
      pathToRoot: 'No Penalties → Late Payments → Money Slow → Not Enough Money'
    }
  },
  'payment-friction': {
    explanation: 'If you only accept checks or wire transfers, you are making it hard for people to give you money. Every step you add to the process increases the chance of delay.',
    relatedProblems: ["invoices-unclear", "approval-delays"],
    impactAnalysis: {
      financialImpact: 'Slower payment velocity; increased drop-off in small-ticket transactions.',
      severity: "Moderate",
      affectedAreas: ["Sales Conversion", "Cash Flow"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 hour",
      difficulty: "Easy",
      quickWins: ["Accept Credit Cards (Stripe/PayPal)", "Enable "Pay by Bank" (ACH) for lower fees but high convenience"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Avoiding processing fees", "Old-school business mindset"],
      automationPotential: {
        rating: "High",
        example: 'One-click payment portals integrated with your invoicing system.'
      },
      pathToRoot: 'Payment Friction → Late Payments → Money Slow → Not Enough Money'
    }
  },
  'wrong-person': {
    explanation: 'Your invoice is sitting in the inbox of the project manager, not the accounts payable (AP) person who actually cuts the checks.',
    relatedProblems: ["invoices-unclear", "approval-delays"],
    impactAnalysis: {
      financialImpact: 'Hidden delays (invoices "lost" in internal mail); high friction.',
      severity: "Low",
      affectedAreas: ["Admin Efficiency", "Client Relations"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Ask for the "Billing Contact" during onboarding", "CC the project manager but address the invoice to AP"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor onboarding data collection"],
      automationPotential: {
        rating: "Medium",
        example: 'CRM fields specifically for billing contacts that sync to your accounting software.'
      },
      pathToRoot: 'Wrong Person → Late Payments → Money Slow → Not Enough Money'
    }
  },
  'approval-delays': {
    explanation: 'The work is done, but the invoice is stuck in a "Review" loop inside the client"s company. This is especially common with larger corporations.',
    relatedProblems: ["procurement-bottleneck", "wrong-person"],
    impactAnalysis: {
      financialImpact: 'Unpredictable payment dates; project team frustration.',
      severity: "Moderate",
      affectedAreas: ["Operations", "Cash Flow"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Medium",
      quickWins: ["Get pre-approval on project milestones", "Define "Auto-Approval' if no feedback is received within 3 days"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear "Success Criteria"", "Complex client hierarchy"],
      automationPotential: {
        rating: "Low",
        example: 'Client portals where they can sign off on work instantly.'
      },
      pathToRoot: 'Approval Delays → Late Payments → Money Slow → Not Enough Money'
    }
  },
  'long-sales-cycle': {
    explanation: 'Your sales process takes months to close, meaning you have to fund the "customer acquisition" period for a long time before seeing a return.',
    relatedProblems: ["many-decision-makers", "proposal-drags", "budget-approval"],
    impactAnalysis: {
      financialImpact: 'High cost of acquisition; unpredictable revenue forecasting.',
      severity: "Major",
      affectedAreas: ["Sales Efficiency", "Cash Flow"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Qualify leads faster (BANT)", "Implement "Mutual Action Plans" with prospects", "Offer a "Starter" product with a 1-week close"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Targeting large enterprise without the resources", "Complex product offering", "Passive sales follow-up"],
      automationPotential: {
        rating: "High",
        example: 'Automated nurture sequences and CRM workflow triggers to keep deals moving.'
      },
      pathToRoot: 'Long Sales Cycle → Money Slow → Not Enough Money'
    }
  },
  'many-decision-makers': {
    explanation: 'The "Consensus" trap. Too many people have a veto, and no one has a clear 'yes.' Every additional person in the room slows down the deal.',
    relatedProblems: ["procurement-bottleneck", "approval-delays"],
    impactAnalysis: {
      financialImpact: 'Increased sales labor costs; higher chance of deal "fading" away.',
      severity: "Moderate",
      affectedAreas: ["Sales Cycle", "Conversion Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Identify the "Economic Buyer" early", "Create a "Business Case" deck they can use internally", "Host a single "Consensus Meeting" rather than 10 separate ones"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling to committees", "Lack of internal champion"],
      automationPotential: {
        rating: "Low",
        example: 'This is a relationship skill, though digital sales rooms can help keep everyone on the same page.'
      },
      pathToRoot: 'Many Decision Makers → Long Sales Cycle → Money Slow → Not Enough Money'
    }
  },
  'proposal-drags': {
    explanation: 'You are spending days or weeks writing custom proposals. This delay allows the prospect"s "buying heat' to cool down.',
    relatedProblems: ["contract-negotiation", "manual-processes"],
    impactAnalysis: {
      financialImpact: 'Low sales velocity; high unbilled labor costs.',
      severity: "Low",
      affectedAreas: ["Sales Efficiency"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Use proposal templates", "Create "Productized" packages with set pricing", "Aim for "Draft to Delivery" in < 24 hours"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-customizing every deal", "No standardized pricing sheet"],
      automationPotential: {
        rating: "High",
        example: 'Using tools like PandaDoc or Better Proposals to auto-generate docs from CRM data.'
      },
      pathToRoot: 'Proposal Drags → Long Sales Cycle → Money Slow → Not Enough Money'
    }
  },
  'contract-negotiation': {
    explanation: 'Legal "redlining" is stalling your cash flow. You've won the deal, but you can't start work or get paid because of a clause in the contract.',
    relatedProblems: ["procurement-bottleneck", "many-decision-makers"],
    impactAnalysis: {
      financialImpact: 'Revenue "stuck" in legal; high legal fees if using outside counsel.',
      severity: "Moderate",
      affectedAreas: ["Sales Velocity", "Legal Costs"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Create a "Standard Terms" sheet with non-negotiable items", "Use a "Short Form" agreement for smaller deals", "Push for your own paper whenever possible"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-complex contracts", "Dealing with over-zealous legal departments"],
      automationPotential: {
        rating: "Medium",
        example: 'Contract Lifecycle Management (CLM) tools with pre-approved clause libraries.'
      },
      pathToRoot: 'Contract Negotiating → Long Sales Cycle → Money Slow → Not Enough Money'
    }
  },
  'procurement-bottleneck': {
    explanation: 'The "Black Hole" of corporate buying. Even after the business owner says yes, the 'Procurement' department adds weeks of paperwork, vendor setup, and security reviews.',
    relatedProblems: ["many-decision-makers", "wrong-person"],
    impactAnalysis: {
      financialImpact: 'Delayed project start; high admin burden.',
      severity: "Moderate",
      affectedAreas: ["Admin Efficiency", "Cash Flow"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Ask for the "Procurement Checklist" on day one", "Pre-fill common vendor security questionnaires", "Ask your champion to "expedite" the setup"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling to large organizations without being a "preferred vendor""],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to auto-fill security and procurement forms based on previous answers.'
      },
      pathToRoot: 'Procurement Bottleneck → Long Sales Cycle → Money Slow → Not Enough Money'
    }
  },
  'rfp-timeline': {
    explanation: 'Request for Proposals (RFPs) are designed for the buyer, not the seller. They are long, competitive, and often have fixed timelines that ignore your cash needs.',
    relatedProblems: ["long-sales-cycle", "low-margins"],
    impactAnalysis: {
      financialImpact: 'Extremely high cost of sale; low win percentage; zero control over timing.',
      severity: "Major",
      affectedAreas: ["Sales Strategy", "Profitability"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Strategic shift",
      difficulty: "Hard",
      quickWins: ["Avoid "Blind" RFPs where you don"t know the buyer", "Focus on "Sole Source" deals through relationship building"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Dependency on government or large institutional contracts"],
      automationPotential: {
        rating: "High",
        example: 'AI-driven RFP response software to cut down the writing time from days to hours.'
      },
      pathToRoot: 'RFP Timeline → Long Sales Cycle → Money Slow → Not Enough Money'
    }
  },
  'budget-approval': {
    explanation: 'The "Fiscal Year" problem. The client wants to buy, but they are waiting for next quarter's budget to be released. Your cash flow is at the mercy of their CFO's calendar.',
    relatedProblems: ["wrong-timing", "many-decision-makers"],
    impactAnalysis: {
      financialImpact: 'Lumpy revenue; high stress during "budget season.'',
      severity: "Moderate",
      affectedAreas: ["Revenue Predictability", "Cash Flow"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Offer a "Discovery" phase that fits in their current budget", "Sign the contract now for a future start date", "Offer deferred billing terms to lock in the deal"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling high-ticket items without a "stair-step" entry"],
      automationPotential: {
        rating: "Low",
        example: 'Tracking client fiscal cycles in your CRM to time your outreach perfectly.'
      },
      pathToRoot: 'Budget Approval → Long Sales Cycle → Money Slow → Not Enough Money'
    }
  },
  'long-delivery-cycle': {
    explanation: 'Your fulfillment process takes too long. If you spend 3 months doing work before you can send the final invoice, you are funding 90 days of payroll and overhead on a hope.',
    relatedProblems: ["invoice-after-complete", "work-takes-long", "waiting-feedback"],
    impactAnalysis: {
      financialImpact: 'Strained working capital; high risk of project "stalling.'',
      severity: "Major",
      affectedAreas: ["Operations", "Cash Flow"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Switch to "Agile" or phase-based delivery", "Implement weekly progress billing", "Standardize your delivery "stack""]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inefficient fulfillment", "Scope creep", "Manual delivery steps"],
      automationPotential: {
        rating: "High",
        example: 'Automating the delivery of work products (e.g., reports, code, setup) to speed up completion.'
      },
      pathToRoot: 'Long Delivery → Money Slow → Not Enough Money'
    }
  },
  'invoice-after-complete': {
    explanation: 'The "All or Nothing" billing model. You only get paid once everything is 100% done. This gives the client all the leverage to withhold payment for minor tweaks.',
    relatedProblems: ["deferred-payment", "revisions-delay"],
    impactAnalysis: {
      financialImpact: 'Extremely high risk; "Zero-cash' delivery period.',
      severity: "Critical",
      affectedAreas: ["Business Stability", "Risk"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Invoiced 50% at start, 25% mid-way, 25% at completion", "Bill for "Milestones" rather than "Completion'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak contract terms", "Standardized by client, not you"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated billing triggered by "Task Completion" in your project management tool.'
      },
      pathToRoot: 'Invoice After Completion → Long Delivery → Money Slow → Not Enough Money'
    }
  },
  'work-takes-long': {
    explanation: 'Your internal efficiency is low. Tasks that should take 2 days are taking 10. This increases your "cost-per-fulfillment' and slows down cash.',
    relatedProblems: ["inefficient-processes", "manual-processes", "rework-mistakes"],
    impactAnalysis: {
      financialImpact: 'Decreased net profit; lower throughput (capacity).',
      severity: "Major",
      affectedAreas: ["Efficiency", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Time-track specific tasks to find the leak", "Create SOPs for the most common tasks", "Remove distractions for delivery team"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical debt", "Poorly trained team", "No standardized tools"],
      automationPotential: {
        rating: "High",
        example: 'Using AI and automation to handle repetitive parts of the work delivery.'
      },
      pathToRoot: 'Work Takes Long → Long Delivery → Money Slow → Not Enough Money'
    }
  },
  'waiting-feedback': {
    explanation: 'Your project is ready to move, but it"s sitting on the client"s desk. This delay is costing you money in overhead every single day.',
    relatedProblems: ["approval-delays", "long-delivery-cycle"],
    impactAnalysis: {
      financialImpact: 'Project "Stagnation" costs; team context-switching costs.',
      severity: "Moderate",
      affectedAreas: ["Project Timeline", "Profitability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Implement a "3-Day Feedback' clause", "Charge "Restart Fees" for projects that stall > 14 days", "Schedule the feedback meeting *before* you send the work"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive project management", "Undefined client responsibilities"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated "Gentle Nudge" sequences if a feedback link hasn't been clicked.'
      },
      pathToRoot: 'Waiting on Feedback → Long Delivery → Money Slow → Not Enough Money'
    }
  },
  'revisions-delay': {
    explanation: 'Unlimited revisions are a profit-killer. Each extra "tweak" delays the final invoice and increases your cost of delivery.',
    relatedProblems: ["scope-creep-unbilled", "results-mediocre"],
    impactAnalysis: {
      financialImpact: 'Profit margin erosion; delayed final payment.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Delivery Timeline"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Limit to 2 revision rounds in the contract", "Charge for revisions beyond the original scope", "Define exactly what a "revision" is"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Vague "Success Metrics"", "People-pleasing founder"],
      automationPotential: {
        rating: "Low",
        example: 'Standardized "Revision Request" forms to ensure feedback is clear and consolidated.'
      },
      pathToRoot: 'Revisions Delay → Long Delivery → Money Slow → Not Enough Money'
    }
  },
  'third-party-dependencies': {
    explanation: 'You are waiting on a vendor, partner, or software provider to do their part before you can finish yours. You are at the mercy of their timeline.',
    relatedProblems: ["long-delivery-cycle", "manual-processes"],
    impactAnalysis: {
      financialImpact: 'Unpredictable project completion; risk of "Vendor Lock" delays.',
      severity: "Low",
      affectedAreas: ["Operations"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Strategic shift",
      difficulty: "Medium",
      quickWins: ["Build "Buffer Time" into schedules", "Have backup vendors for critical path items", "Bring critical dependencies in-house"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of vertical integration", "Poor vendor management"],
      automationPotential: {
        rating: "Medium",
        example: 'Using APIs to monitor third-party status and auto-alert your team of delays.'
      },
      pathToRoot: 'Third Party Dependencies → Long Delivery → Money Slow → Not Enough Money'
    }
  },
  'seasonal-constraints': {
    explanation: 'Your business is only "active" during certain times of the year. During the 'off-season,' your cash flow drops but your fixed costs remain.',
    relatedProblems: ["lumpy-revenue", "cash-flow-gaps"],
    impactAnalysis: {
      financialImpact: 'Survival risk during "Down-months'; difficulty maintaining team year-round.',
      severity: "Major",
      affectedAreas: ["Financial Stability", "Staffing"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Launch an "Off-season' product or service", "Switch to annual contracts paid monthly", "Build a 6-month cash reserve"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Niche-specific timing (e.g., Tax, Holidays, Weather)"],
      automationPotential: {
        rating: "Low",
        example: 'Using automation to scale up/down marketing spend based on seasonality.'
      },
      pathToRoot: 'Seasonal Constraints → Long Delivery → Money Slow → Not Enough Money'
    }
  },
  'cash-flow-gaps': {
    explanation: 'The timing of your "money in" doesn't match the timing of your 'money out.' You are profitable on paper, but your bank account is empty on the 1st of the month.',
    relatedProblems: ["irregular-timing", "big-expenses-before-payment", "no-buffer"],
    impactAnalysis: {
      financialImpact: 'Inability to pay payroll/taxes on time; high stress.',
      severity: "Critical",
      affectedAreas: ["Business Survival", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Move all outgoing bill dates to the 15th", "Implement a "Cash Flow Forecast" (13-week model)", "Get a Line of Credit *before* you need it"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Mismatch between AR and AP terms", "No cash reserves"],
      automationPotential: {
        rating: "High",
        example: 'Cash flow forecasting software that syncs with your bank and accounting tools.'
      },
      pathToRoot: 'Cash Flow Gaps → Money Slow → Not Enough Money'
    }
  },
  'irregular-timing': {
    explanation: 'Projects start and end randomly. You can"t predict when the next big "payout' will happen, making it impossible to plan hiring or investment.',
    relatedProblems: ["lumpy-revenue", "long-sales-cycle"],
    impactAnalysis: {
      financialImpact: 'Financial "Whiplash"; inability to make long-term commitments.',
      severity: "Moderate",
      affectedAreas: ["Strategic Planning", "Cash Flow"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Medium",
      quickWins: ["Standardize project start dates (e.g., 1st and 15th)", "Focus on "Retainer" models for predictable timing"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Reactive sales process", "No project pipeline management"],
      automationPotential: {
        rating: "Medium",
        example: 'Project queuing systems and automated onboarding workflows.'
      },
      pathToRoot: 'Irregular Timing → Cash Flow Gaps → Money Slow → Not Enough Money'
    }
  },
  'big-expenses-before-payment': {
    explanation: 'You have to pay for subcontractors, materials, or ads before the client pays you. You are "financing" the client's project with your own cash.',
    relatedProblems: ["no-deposits", "delivery-costs-high"],
    impactAnalysis: {
      financialImpact: 'Direct drain on liquidity; risk of "Growing yourself out of business.'',
      severity: "Major",
      affectedAreas: ["Liquidity", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Invoiced for "Project Startup Costs" immediately", "Align subcontractor payment terms with client payment dates", "Use a business credit card for float (carefully)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poorly negotiated vendor vs client terms"],
      automationPotential: {
        rating: "Low",
        example: 'Automated expense vs revenue tracking to see "Project Margin" in real-time.'
      },
      pathToRoot: 'Expenses Before Payment → Cash Flow Gaps → Money Slow → Not Enough Money'
    }
  },
  'no-buffer': {
    explanation: 'You are living "paycheck to paycheck" in the business. One late payment from a client or one unexpected expense could bankrupt you.',
    relatedProblems: ["cash-flow-gaps", "expenses-high"],
    impactAnalysis: {
      financialImpact: 'Zero "Sleep-at-night' factor; high risk of business failure.',
      severity: "Critical",
      affectedAreas: ["Overall Stability", "Founder Health"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Setup a separate "Tax/Reserve' savings account", "Transfer 1-5% of every invoice to reserves immediately (Profit First)", "Cut one luxury expense today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-spending on growth", "Low margins", "Personal and business finances mixed"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Bank Rules" that sweep a percentage of income into a savings account.'
      },
      pathToRoot: 'No Buffer → Cash Flow Gaps → Money Slow → Not Enough Money'
    }
  },
  'lumpy-revenue': {
    explanation: 'The "Feast or Famine" cycle. You have $50k months followed by $5k months. This makes it impossible to build a team or invest in systems.',
    relatedProblems: ["seasonal-constraints", "irregular-timing", "no-upsell-process"],
    impactAnalysis: {
      financialImpact: 'Extreme stress; high turnover of staff during "famine" periods.',
      severity: "Major",
      affectedAreas: ["Sustainability", "Revenue Growth"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "4-8 months",
      difficulty: "Hard",
      quickWins: ["Introduce "Maintenance" or "Support' packages", "Standardize your offer into a recurring model", "Incentivize annual payments"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling "One-off' projects only", "Lack of recurring value proposition"],
      automationPotential: {
        rating: "High",
        example: 'Automated recurring billing and subscription management tools.'
      },
      pathToRoot: 'Lumpy Revenue → Cash Flow Gaps → Money Slow → Not Enough Money'
    }
  },

  // EXPENSES TOO HIGH - SUB-BRANCHES
  'overhead-high': {
    explanation: 'Fixed costs that exist regardless of how many sales you make. This "high floor" creates immense pressure to sell constantly just to break even.',
    relatedProblems: ["expensive-office", "many-subscriptions", "admin-staff"],
    impactAnalysis: {
      financialImpact: 'Reduced margin for error; slow recovery in downturns.',
      severity: "Moderate",
      affectedAreas: ["Fixed Costs", "Profitability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Audit all SaaS spending", "Negotiate rent or move to remote", "Outsource admin tasks to lower-cost regions"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Ego-driven spending (office)", "Subscription bloat", "Over-hiring administrative roles"],
      automationPotential: {
        rating: "High",
        example: 'Using AI agents/automation to replace manual administrative roles.'
      },
      pathToRoot: 'High Overhead → Expenses High → Money Out Fast → Not Enough Money (Root)'
    }
  },
  'expensive-office': {
    explanation: 'Paying for more space than you need, or paying a premium for a prestigious address that doesn"t actually contribute to your bottom line. In a post-remote world, office space is often a massive unnecessary weight on a business.',
    relatedProblems: ["overhead-high", "utilities-facilities"],
    impactAnalysis: {
      financialImpact: 'High monthly cash drain; fixed commitment that"s hard to reduce quickly.',
      severity: "Moderate",
      affectedAreas: ["Fixed Costs", "Liquidity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-12 months (Lease dependent)",
      difficulty: "Hard",
      quickWins: ["Sublet unused desks or rooms", "Negotiate a rent reduction with landlord", "Switch to a smaller or coworking-only model"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Pre-remote mindset", "Over-optimism when signing lease", "Ego-driven location choice"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a physical asset management issue.'
      },
      pathToRoot: 'Expensive Office → Overhead High → Expenses High → Not Enough Money'
    }
  },
  'many-subscriptions': {
    explanation: 'The "SaaS Creep.' Dozens of small $20-$100/mo tools that add up to thousands of dollars. Often, these are duplicate tools, seats for people who no longer work there, or 'Ghost' subscriptions no one uses.',
    relatedProblems: ["unused-subscriptions", "duplicate-systems"],
    impactAnalysis: {
      financialImpact: 'Passive cash leak; hidden overhead that scales silently.',
      severity: "Low to Moderate",
      affectedAreas: ["Profitability", "Admin Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Use a tool like RocketMoney or audit bank statements", "Cancel any tool not logged into in 30 days", "Consolidate multiple tools into a single platform (e.g., Notion)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of procurement oversight", "Team members signing up for their own tools", "Free trials rolling into paid"],
      automationPotential: {
        rating: "High",
        example: 'Automated SaaS management tools that flag unused licenses.'
      },
      pathToRoot: 'Subscription Bloat → Overhead High → Expenses High → Not Enough Money'
    }
  },
  'equipment-costs': {
    explanation: 'High upfront or monthly costs for physical hardware, machinery, or specialized gear. This includes leases, maintenance, and the "Latest Model" trap where you upgrade before you need to.',
    relatedProblems: ["overhead-high", "tools-equipment-break"],
    impactAnalysis: {
      financialImpact: 'Direct hit to cash reserves; high maintenance drag.',
      severity: "Moderate",
      affectedAreas: ["Cash Flow", "Asset Management"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Delay next upgrade cycle by 6 months", "Sell unused gear on secondary market", "Renegotiate equipment leases"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-specifying for current needs", "Poor maintenance cycles", "Lack of cost-benefit analysis on gear"],
      automationPotential: {
        rating: "Medium",
        example: 'IoT-based maintenance alerts to extend equipment lifespan.'
      },
      pathToRoot: 'Equipment Costs → Overhead High → Expenses High → Not Enough Money'
    }
  },
  'insurance-legal': {
    explanation: 'Compliance and protection costs are necessary but often unoptimized. You might be over-insured for risks you don"t face, or paying 'Big Firm' rates for routine legal work that could be handled more efficiently.',
    relatedProblems: ["overhead-high", "licensing-compliance"],
    impactAnalysis: {
      financialImpact: 'Silent profit erosion; high cost of entry/existence.',
      severity: "Low to Moderate",
      affectedAreas: ["Profitability", "Risk Management"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Shop your insurance policy with 3 brokers", "Switch routine contracts to AI-vetted templates", "Set a cap on "retainer" hours for legal counsel"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Reactive risk management", "Reliance on legacy providers", "Complex regulatory environment"],
      automationPotential: {
        rating: "Medium",
        example: 'AI-driven contract review tools to reduce lawyer hours.'
      },
      pathToRoot: 'Insurance/Legal → Overhead High → Expenses High → Not Enough Money'
    }
  },
  'utilities-facilities': {
    explanation: 'The "Invisible" costs of a physical location—electricity, internet, cleaning, security, and repairs. These small bills accumulate and create a constant weight on the monthly budget.',
    relatedProblems: ["overhead-high", "expensive-office"],
    impactAnalysis: {
      financialImpact: 'Steady monthly drain; often ignored because "that"s just what it costs.'',
      severity: "Low",
      affectedAreas: ["Fixed Costs"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Audit utility bills for overcharges", "Negotiate better internet/cleaning rates", "Implement energy-saving measures (smart thermostats, etc.)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive management of small bills", "Inefficient facility usage", "Legacy vendor contracts"],
      automationPotential: {
        rating: "Medium",
        example: 'Smart building automation to reduce utility waste.'
      },
      pathToRoot: 'Utilities/Facilities → Overhead High → Expenses High → Not Enough Money'
    }
  },
  'admin-staff': {
    explanation: 'Having a large "Back Office" relative to your revenue-generating team. Often, these roles are manual, doing work that could be automated or outsourced more cheaply.',
    relatedProblems: ["overhead-high", "manual-processes", "admin-busywork"],
    impactAnalysis: {
      financialImpact: 'High labor cost with no direct ROI; "Management overhead" drag.',
      severity: "Moderate to Major",
      affectedAreas: ["Profitability", "Operational Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Hard",
      quickWins: ["Identify top 3 repetitive admin tasks and automate them", "Transition full-time roles to part-time or VA models", "Implement self-service tools for clients/team"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Scaling by hiring people instead of systems", "Inefficient legacy processes", "Fear of technology"],
      automationPotential: {
        rating: "High",
        example: 'Using AI assistants and custom automations to handle 80% of routine admin work.'
      },
      pathToRoot: 'Admin Staff → Overhead High → Expenses High → Not Enough Money'
    }
  },
  'banking-fees': {
    explanation: 'Transaction fees, wire fees, interest on lines of credit, and credit card processing. While individual fees are small, they can eat 3-5% of your total revenue if not managed.',
    relatedProblems: ["overhead-high", "payment-friction"],
    impactAnalysis: {
      financialImpact: 'Direct erosion of top-line revenue before it even hits your account.',
      severity: "Low to Moderate",
      affectedAreas: ["Net Revenue", "Profitability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Negotiate lower processing rates with Stripe/bank", "Pass credit card fees to clients where legal", "Switch to ACH for large payments"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Convenience at the cost of margin", "Lack of fee monitoring", "Using high-interest credit lines"],
      automationPotential: {
        rating: "High",
        example: 'Automated routing of payments to the lowest-fee channel.'
      },
      pathToRoot: 'Banking Fees → Overhead High → Expenses High → Not Enough Money'
    }
  },

  // MARGINS LOW - SUB-BRANCHES
  'prices-low': {
    explanation: 'Pricing is the biggest lever in business. If you are "too busy" but 'don't have enough money', your prices are almost certainly too low. You are undercutting your own future for the sake of winning low-value work.',
    relatedProblems: ["afraid-raise-prices", "competing-price", "undervaluing-expertise"],
    impactAnalysis: {
      financialImpact: 'Direct hit to bottom line; inability to afford high-quality help.',
      severity: "Major",
      affectedAreas: ["Profitability", "Service Quality", "Founder Burnout"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (next quote)",
      difficulty: "Medium",
      quickWins: ["Increase next quote by 20%", "Stop offering discounts", "Bundle services to hide individual unit costs"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Imposter syndrome", "Lack of differentiation", "Targeting the "cheap" segment of the market"],
      automationPotential: {
        rating: "Low",
        example: 'Pricing is a strategic/mindset shift, though you can use tools to analyze competitor pricing.'
      },
      pathToRoot: 'Low Prices → Low Margins → Money Out Fast → Not Enough Money (Root)'
    }
  },

  // PERSONAL/FOUNDER BOTTLENECKS
  'personal-bottlenecks': {
    explanation: 'The business is entirely dependent on the founder. If you stop working, the money stops coming. You haven"t built a business; you've built a high-stress job that you can't quit.',
    relatedProblems: ["time-trapped", "disorganized-chaotic", "burnout-energy"],
    impactAnalysis: {
      financialImpact: 'Capped revenue (limited by founder"s hours); zero enterprise value (unsellable).',
      severity: "Major",
      affectedAreas: ["Scalability", "Founder Health", "Exit Potential"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-18 months",
      difficulty: "Hard",
      quickWins: ["Identify top 3 recurring tasks and record a Loom of how to do them", "Hire a part-time VA for 5 hours/week", "Schedule 4 hours of "CEO time" per week"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of SOPs", "Hero complex", "Poor delegation skills", "Hiring late"],
      automationPotential: {
        rating: "High",
        example: 'Automating the "founder"s touch'—using AI to draft replies or triage emails.'
      },
      pathToRoot: 'Founder Bottleneck → Capacity Issues → Not Enough Revenue (Root)'
    }
  },
  'working-too-much': {
    explanation: 'You are working 60, 70, or 80 hours a week. This is unsustainable and indicates a failure of systems, delegation, or pricing. You are brute-forcing the business"s survival with your own labor.',
    relatedProblems: ["burnout-energy", "time-trapped", "low-value-work"],
    impactAnalysis: {
      financialImpact: 'Decreasing hourly ROI; high risk of health collapse; poor leadership.',
      severity: "Major",
      affectedAreas: ["Founder Energy", "Strategic Decision Making", "Family Life"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Set a strict "Hard Stop" time each day", "Take one full day off per week", "Audit your top 3 time-wasters"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of systems", "Inefficient fulfillment", "Founder hero complex"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to handle 20+ hours of routine communication and admin work.'
      },
      pathToRoot: 'Overwork → Burnout → Capacity Issues → Revenue Risk'
    }
  },
  'poor-boundaries': {
    explanation: 'There is no line where work ends and your life begins. You are working at the dinner table, on vacation, and in bed. This constant "on" state prevents your brain from resting and recovering.',
    relatedProblems: ["burnout-energy", "available-24-7", "no-client-boundaries"],
    impactAnalysis: {
      financialImpact: 'Relationship breakdown; emotional exhaustion; lower creativity.',
      severity: "Major",
      affectedAreas: ["Mental Health", "Family", "Visionary Thinking"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Delete work email from your phone today", "Create a "Physical Boundary" (e.g., no laptop in the bedroom)", "Tell your team when you are "Off-Grid'"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of missing out/failure", "Lack of personal system", "People-pleasing"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a human discipline and habit task.'
      },
      pathToRoot: 'No Boundaries → Burnout → Capacity Issues → Revenue Risk'
    }
  },
  'no-financial-literacy': {
    explanation: 'You don"t understand your P&L, balance sheet, or cash flow statement. You are making decisions based on your bank balance rather than financial data.',
    relatedProblems: ["no-business-skills", "dont-know-costs"],
    impactAnalysis: {
      financialImpact: 'Inefficient spending; high tax risk; missed profit opportunities.',
      severity: "Major",
      affectedAreas: ["Financial Management", "Strategic Planning"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Medium",
      quickWins: ["Hire a bookkeeper today", "Schedule a monthly 1-hour review of your numbers", "Learn the difference between "Revenue" and "Profit'"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technician-turned-founder", "Fear of numbers", "Poor initial accounting setup"],
      automationPotential: {
        rating: "High",
        example: 'Automated financial dashboards (Fathom, Jirav) that translate numbers into insights.'
      },
      pathToRoot: 'No Literacy → Business Skill Gap → Knowledge Gap → Revenue Risk'
    }
  },
  'no-systems-thinking': {
    explanation: 'You view the business as a series of isolated events rather than an interconnected system. You fix the symptom instead of the disease, leading to recurring problems.',
    relatedProblems: ["no-business-skills", "no-systems"],
    impactAnalysis: {
      financialImpact: 'High cost of recurring errors; inability to scale reliably.',
      severity: "Major",
      affectedAreas: ["Operations", "Scalability", "Leadership"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Map out your lead-to-cash flow today", "Read "Work the System" or 'The Goal'", "Stop fixing problems and start building systems"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Reactive leadership", "Lack of formal process training"],
      automationPotential: {
        rating: "Medium",
        example: 'Using workflow mapping tools to visualize and automate entire business cycles.'
      },
      pathToRoot: 'No Systems Thinking → Business Skill Gap → Knowledge Gap'
    }
  },
  'dont-know-target': {
    explanation: 'You are trying to sell to "everyone.' This makes your messaging weak, your ads expensive, and your sales process a struggle. A niche is a multiplier for your marketing spend.',
    relatedProblems: ["no-marketing-skills", "weak-messaging", "cant-find-prospects"],
    impactAnalysis: {
      financialImpact: 'Wasted marketing spend; low conversion; zero authority.',
      severity: "Major",
      affectedAreas: ["Marketing ROI", "Sales Velocity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Pick ONE niche to focus on for the next 90 days", "Interview 5 people in that niche", "Tailor your homepage to speak ONLY to them"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of exclusion", "Lack of market research", "Undefined core value prop"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to build detailed audience personas based on customer data.'
      },
      pathToRoot: 'Unknown Target → Marketing Skill Gap → Knowledge Gap'
    }
  },
  'no-positioning': {
    explanation: 'You don"t have a clear "Category' in the prospect's mind. You are just another [Job Title]. Positioning is what makes you the 'Only' choice rather than just 'One of' the choices.',
    relatedProblems: ["no-marketing-skills", "commoditized-service", "look-too-small"],
    impactAnalysis: {
      financialImpact: 'Price wars; slow sales cycles; low brand equity.',
      severity: "Major",
      affectedAreas: ["Brand Power", "Profitability", "Competitive Advantage"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Hard",
      quickWins: ["Define your "Point of View" (POV) on your industry", "Choose a unique name for your method", "Say "No" to projects that don"t fit your positioning"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Following competitors", "Lack of strategic vision", "Fear of being bold"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a creative and strategic leadership task.'
      },
      pathToRoot: 'Poor Positioning → Marketing Skill Gap → Knowledge Gap'
    }
  },
  'imposter-syndrome': {
    explanation: 'The constant fear that you"ll be "found out' as a fraud. This prevents you from raising prices, speaking with authority, or going after high-ticket deals.',
    relatedProblems: ["mindset-blocks", "prices-low", "afraid-raise-prices"],
    impactAnalysis: {
      financialImpact: 'Hidden growth ceiling; thousands lost in under-pricing.',
      severity: "Major",
      affectedAreas: ["Sales", "Leadership", "Margins"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Hard",
      quickWins: ["Create a "Win Folder" of client praise", "Raise your price for the next lead just to see what happens", "Talk to a mentor about your achievements"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Personal history", "Isolation", "Lack of objective performance metrics"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - requires personal growth and community support.'
      },
      pathToRoot: 'Imposter Syndrome → Mindset Blocks → Knowledge Gap'
    }
  },
  'fear-failure': {
    explanation: 'You are "playing not to lose" rather than 'playing to win.' This leads to conservative, slow decisions that prevent the business from reaching its potential.',
    relatedProblems: ["mindset-blocks", "shiny-object-syndrome"],
    impactAnalysis: {
      financialImpact: 'Missed big opportunities; slow innovation; stagnant growth.',
      severity: "Moderate to Major",
      affectedAreas: ["Innovation", "Strategic Risk", "Growth Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Hard",
      quickWins: ["Take one "Smart Risk" this week", "Define the "Worst Case Scenario" (it's usually not that bad)", "Celebrate a small failure as a learning lesson"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Risk aversion", "Fixed mindset", "Lack of cash buffer"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - requires human courage and leadership.'
      },
      pathToRoot: 'Fear of Failure → Mindset Blocks → Knowledge Gap'
    }
  },

  // NOT GETTING NEW CLIENTS
  'not-getting-new': {
    explanation: 'The top-of-funnel problem. Your message isn"t reaching enough of the right people, or the market is unaware of your existence. This is a volume and visibility issue.',
    relatedProblems: ["cant-find-prospects", "prospects-dont-know"],
    impactAnalysis: {
      financialImpact: 'Zero growth; reliance on declining referral base.',
      severity: "Major",
      affectedAreas: ["Sales pipeline", "Market Share"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Medium",
      quickWins: ["Launch an outbound experiment", "Partner with a non-competing brand", "Run a targeted ad campaign"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak marketing activity", "No outbound strategy", "Invisible online presence"],
      automationPotential: {
        rating: "High",
        example: 'Automated LinkedIn outreach or lead scraper bots.'
      },
      pathToRoot: 'Marketing Problem → Not Enough Revenue (Root)'
    }
  },
  'not-enough-activity': {
    explanation: 'You aren"t making enough "Shots on Goal.' Whether it's cold calls, emails, or ad spend, the sheer volume of your output is too low to produce the results you need. Sales is a numbers game, and your numbers are too small.',
    relatedProblems: ["lead-gen-insufficient", "inconsistent-effort"],
    impactAnalysis: {
      financialImpact: 'Low pipeline volume; unpredictable revenue; high cost-per-lead.',
      severity: "Major",
      affectedAreas: ["Sales pipeline", "Growth Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Double your outreach targets today", "Automate the initial contact phase", "Hire a part-time SDR to increase volume"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of rejection", "Under-estimating the numbers needed", "Manual outreach bottlenecks"],
      automationPotential: {
        rating: "High",
        example: 'Using automated outbound software to send 100+ personalized emails a day.'
      },
      pathToRoot: 'Low Activity → Lead Gen Insufficient → Not Getting New Clients'
    }
  },
  'sources-dried': {
    explanation: 'Your old reliable way of getting leads (e.g., one specific platform, one referral partner) has stopped working. You were over-dependent on a single source and now you"re stranded.',
    relatedProblems: ["lead-gen-insufficient", "not-trying-channels"],
    impactAnalysis: {
      financialImpact: 'Sudden revenue drop; high stress; business fragility.',
      severity: "Critical",
      affectedAreas: ["Revenue Stability", "Lead Generation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Hard",
      quickWins: ["Identify 3 new potential lead sources today", "Launch a small test on a different platform", "Re-engage past clients for immediate short-term work"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of channel diversification", "Market shift", "Platform algorithm changes"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated monitoring of lead flow across multiple channels.'
      },
      pathToRoot: 'Dried Sources → Lead Gen Insufficient → Not Getting New Clients'
    }
  },
  'no-marketing': {
    explanation: 'You are doing zero proactive work to tell people who you are. You are relying entirely on word-of-mouth or "Hope Marketing,' which is not a scalable business strategy.',
    relatedProblems: ["no-visibility", "prospects-dont-know"],
    impactAnalysis: {
      financialImpact: 'Zero growth; high risk if the referral well runs dry.',
      severity: "Critical",
      affectedAreas: ["Brand Awareness", "Sales Pipeline"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Launch a basic 3-post-a-week social strategy", "Setup a simple lead magnet", "Tell your network exactly what you"re selling"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder discomfort with sales", "Over-focus on delivery", "Lack of marketing knowledge"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to generate and schedule your first month of marketing content.'
      },
      pathToRoot: 'No Marketing → No Visibility → Prospects Dont Know → Not Getting New Clients'
    }
  },
  'social-inactive': {
    explanation: 'Your social media profiles are "Ghost Towns.' When prospects look you up (and they will), they see a business that looks like it might be closed.',
    relatedProblems: ["no-visibility", "trust-signals-missing"],
    impactAnalysis: {
      financialImpact: 'Loss of trust; lower conversion on other marketing efforts.',
      severity: "Low to Moderate",
      affectedAreas: ["Brand Trust", "Organic Reach"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Update your profiles today", "Post one "Value" post every day for a week", "Schedule 3 months of content in advance"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of content system", "Perfectionism ("I don"t know what to say")"],
      automationPotential: {
        rating: "High",
        example: 'Automated social media schedulers and AI-assisted caption writing.'
      },
      pathToRoot: 'Inactive Social → No Visibility → Prospects Dont Know → Not Getting New Clients'
    }
  },
  'not-publishing': {
    explanation: 'You aren"t sharing your expertise. You aren't building 'Authority' through content, which makes you just another replaceable vendor in the eyes of the market.',
    relatedProblems: ["no-visibility", "look-too-small"],
    impactAnalysis: {
      financialImpact: 'Zero inbound authority; constant need to "chase" leads rather than 'attract' them.',
      severity: "Moderate",
      affectedAreas: ["Brand Authority", "Lead Quality"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Write one "Deep Dive" article on a client problem today", "Share 3 "Lessons Learned" from current projects", "Start a simple newsletter"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Expert curse (thinking everyone knows what you know)", "Lack of publishing system"],
      automationPotential: {
        rating: "High",
        example: 'AI tools to turn one video recording into 10 social posts and an article.'
      },
      pathToRoot: 'Not Publishing → No Visibility → Prospects Dont Know → Not Getting New Clients'
    }
  },
  'not-asking-referrals': {
    explanation: 'You are doing great work, but you are being "Too Polite" to ask for the referral. You are missing the highest ROI sales activity because of social awkwardness.',
    relatedProblems: ["no-referrals", "forget-ask"],
    impactAnalysis: {
      financialImpact: 'Passive revenue loss; higher total acquisition cost.',
      severity: "Moderate",
      affectedAreas: ["Sales pipeline", "Customer LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Email your 3 best clients today and ask for one introduction", "Add "Referral Request" to your project closing SOP", "Offer a thank-you gift for successful referrals"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of sounding desperate", "Lack of referral process"],
      automationPotential: {
        rating: "High",
        example: 'Automated referral prompts sent after a positive project milestone.'
      },
      pathToRoot: 'Not Asking → No Referrals → Prospects Dont Know → Not Getting New Clients'
    }
  },
  'not-doing-outbound': {
    explanation: 'You are waiting for the phone to ring. You have zero control over your growth because you aren"t proactively reaching out to your ideal clients.',
    relatedProblems: ["outreach-issues", "lead-gen-insufficient"],
    impactAnalysis: {
      financialImpact: 'Stagnant revenue; reliance on external platforms/luck.',
      severity: "Critical",
      affectedAreas: ["Growth Control", "Revenue Predictability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["List your "Dream 100' clients today", "Send 10 personalized cold emails", "Start one cold outreach experiment"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of "Cold" sales", "Lack of prospecting list", "Founder avoidance"],
      automationPotential: {
        rating: "High",
        example: 'Automated outbound systems that handle the initial "Hello" at scale.'
      },
      pathToRoot: 'No Outbound → Outreach Issues → Prospects Dont Know → Not Getting New Clients'
    }
  },
  'outbound-spammy': {
    explanation: 'You are sending "Hey, buy my stuff' messages to people who don't know you. You are burning your reputation and getting blocked because you lack a 'Value-First' approach.',
    relatedProblems: ["outreach-issues", "getting-ignored"],
    impactAnalysis: {
      financialImpact: 'Domain blacklisting; reputation damage; zero conversion.',
      severity: "Major",
      affectedAreas: ["Brand Reputation", "Email Deliverability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Rewrite your outreach to offer a "Quick Win" or free audit", "Personalize the first line of every message", "Reduce your daily volume and focus on quality"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lazy sales tactics", "Lack of ICP focus", "Wrong incentives for sales team"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to personalize outreach based on prospect"s recent news/posts.'
      },
      pathToRoot: 'Spammy Outreach → Outreach Issues → Prospects Dont Know → Not Getting New Clients'
    }
  },
  'getting-ignored': {
    explanation: 'You are reaching out, but no one is replying. Your message isn"t breaking through the noise, or you are talking to people who don't have the problem you solve.',
    relatedProblems: ["outreach-issues", "message-no-resonate"],
    impactAnalysis: {
      financialImpact: 'Massive waste of effort and tech spend; zero pipeline results.',
      severity: "Major",
      affectedAreas: ["Sales pipeline", "Founder Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Change your "Hook" or subject line today", "Focus on a more specific niche", "Add social proof to your initial message"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak offer", "Boring messaging", "Poorly targeted list"],
      automationPotential: {
        rating: "High",
        example: 'AI-powered subject line testing and message optimization.'
      },
      pathToRoot: 'Getting Ignored → Outreach Issues → Prospects Dont Know → Not Getting New Clients'
    }
  },
  'unreasonable-expectations': {
    explanation: 'The client expects "Ferrari results on a Bicycle budget" or wants things done yesterday. These expectations weren't managed during the sales process.',
    relatedProblems: ["difficult-clients", "poor-communication-client"],
    impactAnalysis: {
      financialImpact: 'High rework; team stress; zero profit projects.',
      severity: "Major",
      affectedAreas: ["Team Morale", "Profitability", "Quality"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (reset)",
      difficulty: "Medium",
      quickWins: ["Re-align on the contract scope today", "Set clear "Milestone" expectations", "Say "No" to one unreasonable request"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-promising in sales", "Undefined success metrics", "Vague contract"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated onboarding sequences that reiterate the scope and timeline.'
      },
      pathToRoot: 'Bad Expectations → Difficult Clients → Client Issues → Bought Cant Deliver'
    }
  },
  'constant-changes': {
    explanation: 'The "Indecisive Client.' They keep changing their mind, which restarts your work and delays completion. This is a scope and leadership issue.',
    relatedProblems: ["difficult-clients", "scope-creep-profit"],
    impactAnalysis: {
      financialImpact: 'Margin erosion; project "Stagnation"; team frustration.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Delivery Timeline"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Charge a "Restart Fee" for major changes", "Implement a strict "Change Order" process", "Require written sign-off before moving to the next stage"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of client leadership", "No "Lock-in' milestones", "Passive project management"],
      automationPotential: {
        rating: "Medium",
        example: 'Client portals that require digital sign-off before unlock of next stage.'
      },
      pathToRoot: 'Constant Changes → Difficult Clients → Client Issues → Bought Cant Deliver'
    }
  },
  'dont-respect-boundaries': {
    explanation: 'Clients who call your personal cell at 9 PM or demand instant replies to non-emergency emails. They treat you like an employee rather than a partner.',
    relatedProblems: ["difficult-clients", "available-24-7", "no-client-boundaries"],
    impactAnalysis: {
      financialImpact: 'Founder/Team burnout; lower service quality due to constant interruption.',
      severity: "Major",
      affectedAreas: ["Mental Health", "Retention", "Operational Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week (reset)",
      difficulty: "Medium",
      quickWins: ["Tell the client: "From now on, please use [App] for all requests'", "Stop replying outside of office hours", "Standardize your "Response Time" expectations"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of initial boundary setting", "People-pleasing habits", "Fear of client loss"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Out of Office" and status triage systems.'
      },
      pathToRoot: 'Boundary Failure → Difficult Clients → Client Issues → Bought Cant Deliver'
    }
  },
  'bad-fit-services': {
    explanation: 'You are selling "Web Design" to people who need 'Lead Gen.' You are solving the wrong problem for the client, which leads to poor results and dissatisfaction.',
    relatedProblems: ["wrong-clients", "product-market-mismatch"],
    impactAnalysis: {
      financialImpact: 'High churn; zero referrals; low ROI for client.',
      severity: "Major",
      affectedAreas: ["LTV", "Sales ROI", "Reputation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Audit your last 5 churned clients for a common "Fit" issue", "Update your "Qualifying Questions" today", "Stop saying yes to projects outside your core expertise"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Vague service offering", "Desperate sales", "Lack of niche focus"],
      automationPotential: {
        rating: "Medium",
        example: 'Self-selection tools on your website that filter out bad fits.'
      },
      pathToRoot: 'Service Mismatch → Wrong Clients → Client Issues → Bought Cant Deliver'
    }
  },
  'misaligned-values': {
    explanation: 'You and the client fundamentally disagree on "How" things should be done. Whether it's communication style, ethics, or speed, the 'Vibe' is wrong, which makes delivery painful.',
    relatedProblems: ["wrong-clients", "difficult-clients"],
    impactAnalysis: {
      financialImpact: 'High emotional cost; toxic culture; low long-term retention.',
      severity: "Moderate",
      affectedAreas: ["Team Morale", "Brand Alignment"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate (vetting)",
      difficulty: "Medium",
      quickWins: ["Add "Values" to your sales deck", "Interview for culture fit during the discovery call", "Trust your gut: if the vibe is off, say no"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of defined business values", "Desperate sales"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a human intuition and culture task.'
      },
      pathToRoot: 'Value Mismatch → Wrong Clients → Client Issues → Bought Cant Deliver'
    }
  },
  'available-24-7': {
    explanation: 'You have trained your clients that you are always available. This prevents you from ever having "Deep Work" time and destroys your personal life.',
    relatedProblems: ["no-client-boundaries", "dont-respect-boundaries", "interruptions-constant"],
    impactAnalysis: {
      financialImpact: 'Inefficient labor; high burnout; inability to manage multiple clients.',
      severity: "Major",
      affectedAreas: ["Productivity", "Founder Health", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Medium",
      quickWins: ["Remove work apps from your phone", "Setup an auto-reply for "After Hours"", "Move all client comms into a project tool"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Early-stage "Hustle" habits", "Insecurity about value"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to triage client requests and provide instant "We"ve received this" replies.'
      },
      pathToRoot: 'Always Available → No Boundaries → Client Issues → Bought Cant Deliver'
    }
  },
  'scope-creep-accepted': {
    explanation: 'You say "Sure, no problem' to every extra request. You are giving away thousands of dollars in free labor because you are afraid of a 'Hard Conversation.'',
    relatedProblems: ["no-client-boundaries", "scope-creep-profit", "extras-free"],
    impactAnalysis: {
      financialImpact: 'Direct net profit loss; project delays.',
      severity: "Major",
      affectedAreas: ["Profitability", "Delivery Timelines"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Say: "I can do that, here is the quote' for the next request", "Review your scope document with the client today", "Standardize what"s NOT included"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Vague scope documents", "Fear of confrontation", "Under-valuing your own time"],
      automationPotential: {
        rating: "Medium",
        example: 'Project tools that flag "Out-of-Scope' keywords in client requests.'
      },
      pathToRoot: 'Creep Accepted → No Boundaries → Client Issues → Bought Cant Deliver'
    }
  },
  'allow-bad-behavior': {
    explanation: 'You let clients treat your team poorly, pay late without penalty, or ignore your process. This destroys your team"s trust in you and sets a dangerous precedent.',
    relatedProblems: ["no-client-boundaries", "difficult-clients", "team-unreliable"],
    impactAnalysis: {
      financialImpact: 'High team churn; low morale; devalued brand.',
      severity: "Critical",
      affectedAreas: ["Team Culture", "Brand Authority", "Retention"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Hard",
      quickWins: ["Fire a toxic client today", "Support your team in a client dispute", "Publish a "Code of Conduct" for clients"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of personal leadership", "Revenue-at-all-costs mindset"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a leadership and ethics task.'
      },
      pathToRoot: 'Bad Behavior Allowed → No Boundaries → Client Issues → Bought Cant Deliver'
    }
  },
  'cant-say-no': {
    explanation: 'The root of all boundary problems. You are afraid that saying "No" will lead to losing the client or getting a bad review. This fear is keeping you trapped in a low-profit, high-stress cycle.',
    relatedProblems: ["no-client-boundaries", "scope-creep-accepted", "difficult-clients"],
    impactAnalysis: {
      financialImpact: 'Death by a thousand "Yeses"; total loss of strategic focus.',
      severity: "Critical",
      affectedAreas: ["Strategic Vision", "Profitability", "Founder Health"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Hard",
      quickWins: ["Say "No" to one thing today", "Pre-write a "Kind No" email template", "Recognize that every "Yes" is a "No' to your own growth"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["People-pleasing mindset", "Insecurity", "Lack of clear business priorities"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a mindset and discipline task.'
      },
      pathToRoot: 'Cant Say No → No Boundaries → Client Issues → Bought Cant Deliver'
    }
  },

  // SALES PROCESS WEAK
  'sales-process-weak': {
    explanation: 'You are getting leads, but you are failing to convert them into paying clients. There are gaps in your discovery, follow-up, or closing techniques.',
    relatedProblems: ["not-qualifying", "not-closing", "following-up-inconsistently"],
    impactAnalysis: {
      financialImpact: 'Massive waste of marketing spend; low ROI on lead generation.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Script your discovery calls", "Set a 24-hour follow-up rule", "Record and review calls"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of sales training", "No CRM usage", "Fear of rejection"],
      automationPotential: {
        rating: "High",
        example: 'Automated CRM follow-up reminders and appointment booking bots.'
      },
      pathToRoot: 'Sales Gap → Not Enough Revenue (Root)'
    }
  },

  // PROCESS BOTTLENECKS
  'manual-processes': {
    explanation: 'Human hands are doing work that software should be doing. This is slow, expensive, and error-prone. It limits your capacity to scale beyond your current headcount.',
    relatedProblems: ["everything-by-hand", "no-automation", "data-entry-overwhelming"],
    impactAnalysis: {
      financialImpact: 'High labor costs; unable to take on more work without hiring.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Scalability", "Gross Margin"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Map out the workflow", "Identify the "dumbest" repetitive task", "Solve it with Zapier/Make"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of technical awareness", "Rushing to deliver instead of building systems", "Technical debt"],
      automationPotential: {
        rating: "High",
        example: 'Connecting your sales, fulfillment, and accounting apps via an integration platform.'
      },
      pathToRoot: 'Manual Work → Bottlenecks → Capacity Issues → Revenue (Root)'
    }
  },
  'no-systems': {
    explanation: 'The business relies on "Tribal Knowledge.' Every project is a bespoke creation, making quality inconsistent and delegating impossible. You are re-inventing the wheel every Monday morning.',
    relatedProblems: ["no-sops", "tribal-knowledge", "cant-scale-without-founder"],
    impactAnalysis: {
      financialImpact: 'High cost of rework; slow training of new team members.',
      severity: "Critical",
      affectedAreas: ["Operations", "Quality Control", "Asset Value"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Record Loom videos of every task today", "Create a "how-to" index in Notion", "Start a simple checklist for quality"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder hero syndrome", "Lack of operational discipline", "Scale exceeding infrastructure"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to generate draft SOPs based on your recorded Loom videos.'
      },
      pathToRoot: 'No Systems → Quality/Capacity Issues → Revenue (Root)'
    }
  },

  // ORGANIZATION / CHAOS
  'disorganized-chaotic': {
    explanation: 'The "Mental Load" problem. Information is scattered, tasks are forgotten, and everything feels urgent. You are reacting to the business rather than leading it.',
    relatedProblems: ["no-systems-organization", "poor-prioritization", "time-management-broken"],
    impactAnalysis: {
      financialImpact: 'Missed deadlines; dropped leads; constant firefighting costs.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Mental Clarity", "Team Trust"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Choose ONE project management tool", "Spend 30 mins planning tomorrow every evening", "Clean your physical/digital workspace"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of focus", "Technical debt in tools", "Personal habits of founder"],
      automationPotential: {
        rating: "High",
        example: 'Centralizing all incoming communications into a single unified inbox/dashboard.'
      },
      pathToRoot: 'Chaos → Founder Bottleneck → Capacity → Not Enough Money (Root)'
    }
  },
  'waste-inefficiency': {
    explanation: 'Invisible profit eaters. Money is leaking through redundant systems, unused subscriptions, and a lack of resource discipline. It"s the "death by a thousand cuts' scenario.',
    relatedProblems: ["unused-subscriptions", "duplicate-systems", "team-idle"],
    impactAnalysis: {
      financialImpact: 'Erosion of gross margin; working harder for less net profit.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Operational Discipline"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Audit bank statements for 12 months", "Downgrade underused software tiers", "Consolidate toolstack"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of financial tracking", "Decision-making without ROI analysis", "Rapid growth without cleanup"],
      automationPotential: {
        rating: "High",
        example: 'Automated subscription tracking and usage alerts.'
      },
      pathToRoot: 'Waste → High Expenses → Money Out Fast → Not Enough Money (Root)'
    }
  },
  'clients-churned': {
    explanation: 'The "Hole in the Bucket" problem. You are acquiring clients, but they aren't staying. This forces you to constantly find new business just to stay at zero growth.',
    relatedProblems: ["why-left", "no-retention-system"],
    impactAnalysis: {
      financialImpact: 'Unsustainable acquisition costs; low Customer Lifetime Value (LTV).',
      severity: "Major",
      affectedAreas: ["Growth Rate", "Brand Reputation", "LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Survey churned clients for "Exit Interviews"", "Fix the single biggest quality complaint", "Implement a 30-day success check-in"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Product quality issues", "Weak onboarding", "Poor customer support", "Competitor superiority"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated churn-risk alerts based on low product usage or late payments.'
      },
      pathToRoot: 'Churn → Not Enough Total Clients → Not Enough Revenue (Root)'
    }
  },
  'not-enough-capacity': {
    explanation: 'You have sold the work, but you don"t have the people, time, or infrastructure to fulfill it. You are a victim of your own success.',
    relatedProblems: ["founder-everything", "cant-hire-fast", "cant-afford-hire"],
    impactAnalysis: {
      financialImpact: 'Missed revenue (capped); poor service quality due to rushing.',
      severity: "Major",
      affectedAreas: ["Fulfillment", "Team Burnout", "Customer Satisfaction"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-9 months",
      difficulty: "Hard",
      quickWins: ["Increase prices to slow demand while increasing revenue", "Hire a temporary contractor for backlog", "Audit delivery for time-wasters"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Under-hiring", "Low operational efficiency", "Scaling too fast"],
      automationPotential: {
        rating: "High",
        example: 'Using AI/automation to handle 20-40% of the fulfillment tasks without human intervention.'
      },
      pathToRoot: 'Capacity Gap → Delivery Failure → Revenue Risk (Root)'
    }
  },
  'quality-problems': {
    explanation: 'Inconsistent delivery is killing your reputation and causing rework costs. Every client gets a different version of your service, most of which are below standard.',
    relatedProblems: ["inconsistent-delivery-quality", "mistakes-rework", "client-dissatisfaction"],
    impactAnalysis: {
      financialImpact: 'High rework costs; zero referrals; eventual brand damage.',
      severity: "Major",
      affectedAreas: ["Operations", "Brand Value", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Create a "Definition of Done" checklist", "Implement a mandatory second-eye review", "Standardize the delivery tools"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["No SOPs", "Rushing due to capacity issues", "Lack of team training"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated QA checks or validation scripts for technical work.'
      },
      pathToRoot: 'Quality Issues → Churn/Rework → Profit/Revenue Risk (Root)'
    }
  },
  'low-value-work': {
    explanation: 'The founder is doing tasks that could be done for $20/hour. This is an expensive mistake. You are "busy" but not 'productive'.',
    relatedProblems: ["admin-busywork", "work-others-cheaper", "email-meeting-overload"],
    impactAnalysis: {
      financialImpact: 'Opportunity cost of thousands per hour; strategic stagnation.',
      severity: "Major",
      affectedAreas: ["Founder Productivity", "Strategic Growth"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Calculate your hourly rate (Revenue / Hours)", "Hire a VA for inbox management", "Set "Off-Limit' hours for admin tasks"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Control issues", "Lack of delegation skills", "Hiring late"],
      automationPotential: {
        rating: "High",
        example: 'AI-based email triage and automated appointment scheduling.'
      },
      pathToRoot: 'Low-Value Work → Founder Bottleneck → Capacity Issues → Revenue Risk (Root)'
    }
  },
  'expenses-high': {
    explanation: 'Your business is spending too much relative to its revenue. This can be due to high overhead, inefficient delivery, or excessive acquisition costs.',
    relatedProblems: ["overhead-high", "delivery-costs-high", "acquisition-costs-high", "waste-inefficiency"],
    impactAnalysis: {
      financialImpact: 'Direct erosion of net profit; lower runway.',
      severity: "Major",
      affectedAreas: ["Profitability", "Net Margin"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Audit all expenses", "Identify high-cost vendors", "Review team efficiency"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of budget controls", "Inefficient processes", "Scaling too fast"],
      automationPotential: {
        rating: "High",
        example: 'Automated expense tracking and approval workflows.'
      },
      pathToRoot: 'Expenses High → Money Out Fast → Not Enough Money (Root)'
    }
  },
  'acquisition-costs-high': {
    explanation: 'You are paying too much to get a new customer. If your CAC (Customer Acquisition Cost) is close to your LTV (Lifetime Value), you are effectively losing money on every sale once overhead is factored in.',
    relatedProblems: ["ads-expensive", "sales-process-long", "high-churn"],
    impactAnalysis: {
      financialImpact: 'Negative ROI on marketing; business cannot grow profitably.',
      severity: "Major",
      affectedAreas: ["Marketing Efficiency", "Profitability", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Hard",
      quickWins: ["Stop all non-performing ad channels", "Focus on referrals and organic content", "Improve the conversion rate of your landing page"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor targeting", "Weak offer", "Low conversion rate in sales funnel"],
      automationPotential: {
        rating: "High",
        example: 'Automated lead scoring and attribution tracking to identify "cheap" vs 'expensive' channels.'
      },
      pathToRoot: 'High Acquisition Cost → Expenses High → Money Out Fast'
    }
  },
  'ads-expensive': {
    explanation: 'Your cost-per-click or cost-per-lead is too high. You are competing in a saturated market without a unique "Hook" to drive down costs.',
    relatedProblems: ["acquisition-costs-high", "not-getting-new"],
    impactAnalysis: {
      financialImpact: 'Marketing budget "burn"; unable to scale ad spend profitably.',
      severity: "Moderate",
      affectedAreas: ["Marketing ROI", "Cash Flow"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Test 5 new creative hooks", "Narrow your audience targeting", "Retarget existing website visitors instead of only cold traffic"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Bad creative", "Broad targeting", "Inefficient ad platform settings"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to generate and test hundreds of ad variations (e.g., AdCreative.ai).'
      },
      pathToRoot: 'Expensive Ads → Acquisition Cost → Money Out Fast'
    }
  },
  'sales-process-long': {
    explanation: 'Time is money. Every hour spent on a prospect who doesn"t buy is a direct expense. If your sales cycle is too long, you are 'carrying' the labor cost of sales for too long.',
    relatedProblems: ["long-sales-cycle", "acquisition-costs-high"],
    impactAnalysis: {
      financialImpact: 'Increased cost of sale; lower sales velocity.',
      severity: "Moderate",
      affectedAreas: ["Sales Efficiency", "Profitability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2-3 months",
      difficulty: "Medium",
      quickWins: ["Set a 48-hour deadline for proposal sign-off", "Automate follow-ups after discovery calls", "Kill "Unqualified" deals early"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of sales training", "No sense of urgency in the offer"],
      automationPotential: {
        rating: "High",
        example: 'Automated CRM reminders and nurturing to keep leads moving without manual effort.'
      },
      pathToRoot: 'Long Sales Process → Acquisition Cost → Money Out Fast'
    }
  },
  'high-churn': {
    explanation: 'Getting a customer is expensive; keeping them is cheap. If you lose clients as fast as you get them, you are on a treadmill that never ends.',
    relatedProblems: ["clients-churned", "acquisition-costs-high", "quality-problems"],
    impactAnalysis: {
      financialImpact: 'Low LTV; massive pressure on marketing to replace lost revenue.',
      severity: "Critical",
      affectedAreas: ["LTV", "Brand Reputation", "Growth"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Implement a 30-day "Success" check-in", "Automate onboarding to ensure early wins", "Survey every churning client to find the root cause"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Bad onboarding", "Product/service doesn"t meet expectations", "Weak relationship management"],
      automationPotential: {
        rating: "Medium",
        example: 'Using "Customer Health" scores to trigger manual intervention before a client cancels.'
      },
      pathToRoot: 'High Churn → Acquisition Cost → Money Out Fast'
    }
  },
  'agency-fees': {
    explanation: 'You are paying a marketing agency a flat fee, but they aren"t delivering a measurable ROI. They are an expense, not an investment.',
    relatedProblems: ["acquisition-costs-high", "waste-inefficiency"],
    impactAnalysis: {
      financialImpact: 'Direct hit to profit; high opportunity cost of misspent capital.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Marketing Strategy"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Audit agency performance against "Sales" (not just 'Leads')", "Switch to a performance-based fee structure", "Bring marketing in-house if volume justifies it"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive management of vendors", "Lack of clear KPIs"],
      automationPotential: {
        rating: "Low",
        example: 'Setting up a real-time dashboard to monitor agency performance daily.'
      },
      pathToRoot: 'Agency Fees → Acquisition Cost → Money Out Fast'
    }
  },
  'sales-compensation': {
    explanation: 'Your sales team"s base salary is too high, or your commission structure doesn't align with profit. You are paying them for 'Revenue' even if it's 'Unprofitable Revenue.'',
    relatedProblems: ["acquisition-costs-high", "margins-low"],
    impactAnalysis: {
      financialImpact: 'Incentivizes the "wrong" kind of sales; high overhead risk during slow months.',
      severity: "Moderate",
      affectedAreas: ["Sales Culture", "Profitability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3 months (Legal/Team timing)",
      difficulty: "Hard",
      quickWins: ["Switch to "Commission on Gross Profit" rather than Revenue", "Implement a "Clawback" clause for churned clients", "Reduce base, increase upside for top performers"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Outdated compensation model", "Fear of losing sales talent"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated commission calculators that sync with your CRM and accounting software.'
      },
      pathToRoot: 'Sales Compensation → Acquisition Cost → Money Out Fast'
    }
  },
  'events-no-roi': {
    explanation: 'Trade shows, conferences, and sponsorships. They are expensive and often provide "Brand Awareness" but zero 'Direct Sales.'',
    relatedProblems: ["acquisition-costs-high", "waste-inefficiency"],
    impactAnalysis: {
      financialImpact: 'High unmeasured marketing spend; travel and booth costs eat profit.',
      severity: "Low",
      affectedAreas: ["Marketing ROI"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Calculate the "Cost Per Lead" for the last event", "Stop attending "Networking" events and focus on "Selling' events", "Use a "Digital-First' approach to networking"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Following the competition", "Founder desire for "Visibility" over Profit"],
      automationPotential: {
        rating: "Medium",
        example: 'Using automated lead capture and follow-up tools at events to ensure zero leakage.'
      },
      pathToRoot: 'Events No ROI → Acquisition Cost → Money Out Fast'
    }
  },
  'content-costs': {
    explanation: 'You are spending too much on high-production content (video, design) that doesn"t actually convert. High quality doesn't always mean high ROI.',
    relatedProblems: ["acquisition-costs-high", "waste-inefficiency"],
    impactAnalysis: {
      financialImpact: 'Wasted creative budget; over-engineering your marketing.',
      severity: "Low",
      affectedAreas: ["Marketing Strategy"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Switch to "User-Generated' style content (it often converts better)", "Use AI for initial content drafts and design", "Repurpose one "Big" piece of content into 20 'Small' ones"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Perfectionism", "Misunderstanding of what "engages" the modern audience"],
      automationPotential: {
        rating: "High",
        example: 'Using AI tools (Midjourney, ChatGPT, Canva Magic) to produce high-quality assets at 1/10th the cost.'
      },
      pathToRoot: 'Content Costs → Acquisition Cost → Money Out Fast'
    }
  },
  'commission-unsustainable': {
    explanation: 'You are paying out so much in commission or affiliate fees that there is nothing left for the business. You"ve incentivized growth at the cost of survival.',
    relatedProblems: ["acquisition-costs-high", "margins-low"],
    impactAnalysis: {
      financialImpact: 'Negative net margin on sales; risk of "Growing to Bankruptcy.'',
      severity: "Major",
      affectedAreas: ["Profitability", "Cash Flow"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Medium",
      quickWins: ["Cap commissions based on profit margins", "Implement longer payout windows to ensure client stays", "Review affiliate tiers and cut the bottom performers"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Aggressive early-stage growth strategy that was never adjusted"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated affiliate tracking that only pays out on "Cleared" funds.'
      },
      pathToRoot: 'Unsustainable Commission → Acquisition Cost → Money Out Fast'
    }
  },
  'unused-subscriptions': {
    explanation: 'Software that you are paying for but haven"t logged into in 30 days. It's an absolute waste of cash.',
    relatedProblems: ["many-subscriptions", "waste-inefficiency"],
    impactAnalysis: {
      financialImpact: 'Pure profit leakage; zero ROI.',
      severity: "Low",
      affectedAreas: ["Fixed Costs"],
      strategicPriority: 'Easy'
    },
    timeToSolve: {
      estimate: "1 hour",
      difficulty: "Easy",
      quickWins: ["Cancel all unused tools today", "Downgrade seats for tools you only use occasionally", "Use "Free" versions until the need is proven"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of financial oversight", "Forgotten trials"],
      automationPotential: {
        rating: "High",
        example: 'Software like "Subly" or simple bank statement analysis tools.'
      },
      pathToRoot: 'Unused Subs → Waste → Money Out Fast'
    }
  },
  'duplicate-systems': {
    explanation: 'You are paying for two tools that do the same thing (e.g., two CRMs, two project management tools, or Slack + Teams).',
    relatedProblems: ["many-subscriptions", "waste-inefficiency"],
    impactAnalysis: {
      financialImpact: 'Redundant spending; data silo confusion; team frustration.',
      severity: "Low",
      affectedAreas: ["Efficiency", "Fixed Costs"],
      strategicPriority: 'Easy'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Pick the "Winner" and migrate everyone to it today", "Standardize the "Official" toolstack for the team", "Cancel the redundant service"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Organic, unmanaged growth", "Lack of central technical leadership"],
      automationPotential: {
        rating: "Medium",
        example: 'Using integration tools to centralize data rather than paying for two systems.'
      },
      pathToRoot: 'Duplicate Systems → Waste → Money Out Fast'
    }
  },
  'team-idle': {
    explanation: 'Your team is waiting for work. You are paying for their hours, but you aren"t providing the pipeline to fill them. This is the most expensive type of waste.',
    relatedProblems: ["waste-inefficiency", "not-enough-revenue"],
    impactAnalysis: {
      financialImpact: 'Wasted labor budget; decreased morale; low efficiency.',
      severity: "Major",
      affectedAreas: ["Labor Costs", "Team Morale", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Increase marketing spend immediately to fill the gap", "Assign "Deep Work" projects or SOP documentation during downtime", "Switch to part-time/variable staffing models"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor capacity planning", "Famine period in sales"],
      automationPotential: {
        rating: "Medium",
        example: 'Resource management software that shows team utilization in real-time.'
      },
      pathToRoot: 'Team Idle → Waste → Money Out Fast'
    }
  },
  'overbuying-inventory': {
    explanation: 'Cash is sitting on a shelf. You"ve bought supplies, products, or materials that you won't use for months. This is cash that could be used for growth.',
    relatedProblems: ["waste-inefficiency", "materials-supplies"],
    impactAnalysis: {
      financialImpact: 'Liquidity trap; risk of obsolescence/spoilage.',
      severity: "Moderate",
      affectedAreas: ["Cash Flow", "Working Capital"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Easy",
      quickWins: ["Halt all new ordering", "Run a "Clearance" sale on old stock", "Shift to "Just-in-Time' fulfillment"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of "Out of stock"", "Buying in bulk for discounts that aren"t worth the cash drag"],
      automationPotential: {
        rating: "High",
        example: 'Inventory forecasting software that syncs with sales data.'
      },
      pathToRoot: 'Overbuying → Waste → Money Out Fast'
    }
  },
  'poor-resource-allocation': {
    explanation: 'You are putting your best people on your smallest clients, or spending your budget on the wrong priorities. You are "polishing the brass on the Titanic.'',
    relatedProblems: ["waste-inefficiency", "low-value-work"],
    impactAnalysis: {
      financialImpact: 'Opportunity cost of missed growth; inefficient use of capital.',
      severity: "Major",
      affectedAreas: ["Strategic Focus", "ROI"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Apply the 80/20 rule: focus 80% of resources on top 20% of clients", "Stop all "Minor" projects and focus on the "Big' lever", "Review the last 5 decisions—did they lead to revenue?"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear strategic goals", "Reactive management style"],
      automationPotential: {
        rating: "Low",
        example: 'This is a leadership decision, but data-driven reporting can guide the choice.'
      },
      pathToRoot: 'Poor Allocation → Waste → Money Out Fast'
    }
  },
  'afraid-raise-prices': {
    explanation: 'The "Fear of No.' You think that if you raise prices, you'll lose everyone. In reality, you'll lose the clients you probably didn't want anyway.',
    relatedProblems: ["prices-low", "undervalue-expertise"],
    impactAnalysis: {
      financialImpact: 'Self-imposed revenue ceiling; under-resourced delivery.',
      severity: "Major",
      affectedAreas: ["Profitability", "Confidence"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Hard (Mindset)',
      quickWins: ["Raise prices by 10% for the next lead and see what happens", "Blame the increase on "rising costs" or 'new features'", "Test a "Premium" version of your current offer"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Imposter syndrome", "Lack of clear differentiation"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a psychological and strategic hurdle.'
      },
      pathToRoot: 'Fear of Price Increase → Low Prices → Low Margins → Money Out Fast'
    }
  },
  'competing-price': {
    explanation: 'The "Race to the Bottom.' If your only differentiator is 'I'm cheaper,' you will eventually be beaten by someone even more desperate or automated than you.',
    relatedProblems: ["prices-low", "commoditized-service"],
    impactAnalysis: {
      financialImpact: 'Profit margins compressed to zero; unable to hire quality staff.',
      severity: "Critical",
      affectedAreas: ["Sustainability", "Brand Positioning"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Find ONE thing you do better than everyone else and lead with it", "Stop advertising your price; advertise your results", "Niche down to a more expensive market"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of unique value proposition", "Selling in a commoditized market"],
      automationPotential: {
        rating: "Low",
        example: 'Automation can lower your costs to *win* a price war, but it"s better to exit the war entirely.'
      },
      pathToRoot: 'Competing on Price → Low Prices → Low Margins → Money Out Fast'
    }
  },
  'dont-know-costs': {
    explanation: 'You are guessing your pricing. You don"t know your Cost of Goods Sold (COGS), labor cost per project, or client acquisition cost.',
    relatedProblems: ["prices-low", "margins-low"],
    impactAnalysis: {
      financialImpact: 'Inadvertently losing money on some projects while "thinking" they are profitable.',
      severity: "Major",
      affectedAreas: ["Financial Oversight", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Audit the last 3 projects for actual "Hours Spent" vs 'Fee'", "Calculate your "Breakeven" hourly rate", "Factor in software and overhead into every quote"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of bookkeeping discipline", "Simple "Top-line' revenue focus"],
      automationPotential: {
        rating: "High",
        example: 'Using project-based accounting tools like Harvest or QuickBooks Projects.'
      },
      pathToRoot: 'Unknown Costs → Low Prices → Low Margins → Money Out Fast'
    }
  },
  'underestimate-time': {
    explanation: 'The "Optimism Bias.' You think it will take 10 hours; it takes 30. You are effectively paying the client to work for them.',
    relatedProblems: ["prices-low", "taking-too-long"],
    impactAnalysis: {
      financialImpact: 'Massive unbilled labor cost; project timelines slipping.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Scheduling"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Track every minute for a week", "Add a "20% Buffer' to every time estimate automatically", "Use historic data to quote, not your "gut""]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of time-tracking data", "Over-eagerness to win the deal"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated time-tracking tools (like Toggl or RescueTime) that provide data-driven estimates.'
      },
      pathToRoot: 'Underestimating Time → Low Prices → Low Margins → Money Out Fast'
    }
  },
  'too-many-discounts': {
    explanation: 'Every discount comes directly out of your profit. A 10% discount on a project with 30% margin is a 33% hit to your net profit.',
    relatedProblems: ["prices-low", "competing-price"],
    impactAnalysis: {
      financialImpact: 'Pure profit erosion; devalues your service in the client"s eyes.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Brand Value"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Stop offering discounts to "Get the Deal"", "Offer "Added Value" instead of 'Lower Price'", "Only discount in exchange for something else (e.g., faster payment, longer term)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of sales negotiation skills", "Low confidence in value"],
      automationPotential: {
        rating: "Low",
        example: 'Removing "Discount" fields from your automated checkout or proposal tools.'
      },
      pathToRoot: 'Too Many Discounts → Low Prices → Low Margins → Money Out Fast'
    }
  },
  'grandfather-clauses': {
    explanation: 'Old clients are still paying your 2019 rates while your costs (and expertise) have doubled. You are subsidizing your oldest clients with your newest ones.',
    relatedProblems: ["prices-low", "margins-low"],
    impactAnalysis: {
      financialImpact: 'Capped profit on your most stable work; increasing unprofitability over time.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Cash Flow"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Send a "Price Adjustment" notice to all old clients", "Transition old clients to your current service packages", "Fire clients who refuse to pay a fair current rate"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of losing "Loyal" clients", "Lack of annual price review process"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a communication and contractual shift.'
      },
      pathToRoot: 'Grandfathered Rates → Low Prices → Low Margins → Money Out Fast'
    }
  },
  'race-to-bottom': {
    explanation: 'You are in a market where the only way to win is to be the cheapest. This is a losing game unless you have massive scale or automation that others don"t.',
    relatedProblems: ["competing-price", "commoditized-service"],
    impactAnalysis: {
      financialImpact: 'Eventual business failure as costs rise but prices cannot.',
      severity: "Critical",
      affectedAreas: ["Survival", "Strategic Positioning"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Pivot your offer to a "Premium" niche", "Add a service layer that competitors can"t replicate", "Build a "Moat" through specialized expertise or tech"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling a generic product/service", "No brand differentiation"],
      automationPotential: {
        rating: "Medium",
        example: 'Using automation to be the *most efficient* in the race, or using it to create a unique high-value service.'
      },
      pathToRoot: 'Race to Bottom → Low Prices → Low Margins → Money Out Fast'
    }
  },
  'undervalue-expertise': {
    explanation: 'You are charging for "Labor" when you should be charging for "Certainty' and 'Results.' You don't realize how much value you actually create for the client.',
    relatedProblems: ["prices-low", "afraid-raise-prices"],
    impactAnalysis: {
      financialImpact: 'Leaving 50-200% of potential revenue on the table.',
      severity: "Major",
      affectedAreas: ["Profitability", "Market Positioning"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Mindset shift)",
      difficulty: "Medium",
      quickWins: ["Quote based on the "Value" of the problem solved, not your hours", "Stop itemizing hours on invoices", "Position yourself as an "Advisor" rather than a "Vendor'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Imposter syndrome", "Lack of case studies showing ROI"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a strategic shift in how you sell.'
      },
      pathToRoot: 'Undervaluing Expertise → Low Prices → Low Margins → Money Out Fast'
    }
  },
  'extras-free': {
    explanation: 'The "Scope Creep" trap. You do a little bit of extra work to keep the client happy, but you never bill for it. Those 'little bits' are your entire profit margin.',
    relatedProblems: ["scope-creep-unbilled", "no-change-order"],
    impactAnalysis: {
      financialImpact: 'Unbilled labor hours; profit leakage on every project.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Labor Utilization"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Say: "Yes, we can do that. It will be an extra $X.'", "Use a "Change Order" for anything not in the original brief", "Show "Included" vs "Excluded' clearly in proposals"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["People-pleasing", "Vague project scope"],
      automationPotential: {
        rating: "Medium",
        example: 'Digital proposal tools where adding "Extras" auto-updates the price and requires a signature.'
      },
      pathToRoot: 'Free Extras → Unbilled Scope Creep → Low Margins → Money Out Fast'
    }
  },
  'no-change-order': {
    explanation: 'You have no formal process for when a project changes. You just "absorb" the extra work and hope for the best.',
    relatedProblems: ["scope-creep-unbilled", "afraid-charge-changes"],
    impactAnalysis: {
      financialImpact: 'Uncontrolled project cost growth; revenue stays static while costs rise.',
      severity: "Moderate",
      affectedAreas: ["Operations", "Profitability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Create a 1-page "Change Order" template today", "Train your team to pause work when scope changes", "Inform clients of the change order process at kickoff"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of operational discipline", "Fear of "confrontation""],
      automationPotential: {
        rating: "Medium",
        example: 'Automated "Add-on' billing in your project management system.'
      },
      pathToRoot: 'No Change Order → Unbilled Scope Creep → Low Margins → Money Out Fast'
    }
  },
  'afraid-charge-changes': {
    explanation: 'You know you should charge more, but you"re afraid the client will get angry. You value their 'happiness' more than your business's survival.',
    relatedProblems: ["scope-creep-unbilled", "afraid-raise-prices"],
    impactAnalysis: {
      financialImpact: 'Self-inflicted margin hit; creates entitled clients who expect free work.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Confidence"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Hard (Mindset)',
      quickWins: ["Blame the "System" or "Accounting': 'The system won't let us add this without a change order'", "Practice saying "No" to small things first", "Remind yourself that your time has value"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Imposter syndrome", "Boundary issues"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a mindset shift.'
      },
      pathToRoot: 'Fear of Charging for Changes → Unbilled Scope Creep → Low Margins → Money Out Fast'
    }
  },
  'scope-poorly-defined': {
    explanation: 'If you don"t know where the project ends, it never will. Vague contracts lead to endless 'But I thought this was included' conversations.',
    relatedProblems: ["scope-creep-unbilled", "one-thing-adds-up"],
    impactAnalysis: {
      financialImpact: 'Project "Stalling" costs; high risk of client dispute.',
      severity: "Major",
      affectedAreas: ["Operations", "Legal Risk", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Include a "What is NOT included" section in every proposal", "Define exact "Deliverables" rather than "Activities'", "Get a signed "Scope of Work" before any work starts"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Rushing the sales process", "Lack of technical scoping expertise"],
      automationPotential: {
        rating: "Medium",
        example: 'Using standardized scoping templates and AI to double-check for "Vague" language.'
      },
      pathToRoot: 'Poor Scope Definition → Unbilled Scope Creep → Low Margins → Money Out Fast'
    }
  },
  'one-thing-adds-up': {
    explanation: 'The "Death by a thousand Papercuts.' Each individual request is small, but combined they turn a profitable project into a loss.',
    relatedProblems: ["scope-creep-unbilled", "extras-free"],
    impactAnalysis: {
      financialImpact: 'Hidden profit erosion; team frustration.',
      severity: "Low",
      affectedAreas: ["Profitability", "Team Morale"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Track even "Small" extra requests", "Show the client a "Credit" on the invoice for the free small stuff (so they see the value)", "Implement a "Mini-Change Order' for small tasks"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of project tracking", "Micro-scope-creep"],
      automationPotential: {
        rating: "Medium",
        example: 'Ticketing systems where "Extra" requests are automatically flagged for review.'
      },
      pathToRoot: 'One Thing Adds Up → Unbilled Scope Creep → Low Margins → Money Out Fast'
    }
  },
  'taking-too-long': {
    explanation: 'Your internal efficiency is low. Tasks that should take 2 days are taking 10. This increases your "cost-per-fulfillment' and slows down cash.',
    relatedProblems: ["inefficient-delivery", "work-takes-long"],
    impactAnalysis: {
      financialImpact: 'Decreased net profit; lower throughput (capacity).',
      severity: "Major",
      affectedAreas: ["Efficiency", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Time-track specific tasks to find the leak", "Create SOPs for the most common tasks", "Remove distractions for delivery team"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical debt", "Poorly trained team", "No standardized tools"],
      automationPotential: {
        rating: "High",
        example: 'Using AI and automation to handle repetitive parts of the work delivery.'
      },
      pathToRoot: 'Taking Too Long → Inefficient Delivery → Low Margins → Money Out Fast'
    }
  },
  'not-standardized': {
    explanation: 'You are doing too much "Custom" work. Every client gets a bespoke solution, which means you can't reuse work, templates, or systems.',
    relatedProblems: ["inefficient-delivery", "no-systems"],
    impactAnalysis: {
      financialImpact: 'Impossible to scale without 1:1 hiring; high margin risk on every project.',
      severity: "Major",
      affectedAreas: ["Scalability", "Profitability", "Asset Value"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Productize your service: offer 3 "Standard" packages", "Create "Master Templates" for everything", "Say "No" to custom requests that don"t fit your core"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of being "Rigid"", "Lack of a "Core" product vision"],
      automationPotential: {
        rating: "High",
        example: 'Automated fulfillment workflows that only work with standardized "Productized" services.'
      },
      pathToRoot: 'Not Standardized → Inefficient Delivery → Low Margins → Money Out Fast'
    }
  },
  'over-delivering': {
    explanation: 'The "Golden Handcuffs.' You are doing more work than the client paid for to ensure they are 'happy.' This makes you a great freelancer but a terrible business owner.',
    relatedProblems: ["inefficient-delivery", "extras-free", "scope-creep-unbilled"],
    impactAnalysis: {
      financialImpact: 'Intentionally reducing your own profit; sets unsustainable expectations.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Capacity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Medium",
      quickWins: ["Stick to the "Definition of Done" in the contract", "Upsell the "Extra" value instead of giving it away", "Recognize that "Good Enough" is often what the client wants"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Insecurity about value", "Perfectionism"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a discipline and strategic choice.'
      },
      pathToRoot: 'Over-Delivering → Inefficient Delivery → Low Margins → Money Out Fast'
    }
  },
  'rework-eating-profit': {
    explanation: 'Mistakes are being made, and you are fixing them on your own dime. If a project requires 20% rework, you"ve just lost your entire profit margin.',
    relatedProblems: ["inefficient-delivery", "quality-problems", "rework-mistakes"],
    impactAnalysis: {
      financialImpact: 'Direct hit to bottom line; destroys project scheduling.',
      severity: "Major",
      affectedAreas: ["Profitability", "Team Capacity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Standardize the most error-prone step", "Require client "Sign-off' at each phase", "Analyze the last 3 rework cases for a common cause"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear SOPs", "Communication breakdown", "Unqualified staff"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated QA tools and validation scripts.'
      },
      pathToRoot: 'Rework Eating Profit → Inefficient Delivery → Low Margins → Money Out Fast'
    }
  },
  'expensive-office': {
    explanation: 'You are paying for more space than you need, or for a "status" location that doesn't provide a direct return on investment (ROI). In a post-remote world, physical office space is often a massive unforced error.',
    relatedProblems: ["overhead-high", "utilities-facilities"],
    impactAnalysis: {
      financialImpact: 'Direct hit to net profit every single month; long-term lease liabilities.',
      severity: "Moderate",
      affectedAreas: ["Fixed Costs", "Cash Flow"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-6 months",
      difficulty: "Hard",
      quickWins: ["Sublease unused desks/rooms", "Negotiate a rent reduction", "Switch to a smaller coworking space"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Old-school business mindset", "Long-term lease trap", "Over-estimating the need for physical presence"],
      automationPotential: {
        rating: "Low",
        example: 'Switching to a fully remote model managed by digital communication tools.'
      },
      pathToRoot: 'Expensive Office → Overhead High → Money Out Fast'
    }
  },
  'many-subscriptions': {
    explanation: 'The "SaaS Creep.' Small $20-$100/month tools add up to thousands of dollars in 'ghost' expenses that you've forgotten to cancel.',
    relatedProblems: ["unused-subscriptions", "duplicate-systems"],
    impactAnalysis: {
      financialImpact: 'Hidden profit erosion; death by a thousand cuts.',
      severity: "Low",
      affectedAreas: ["Fixed Costs", "Admin Efficiency"],
      strategicPriority: 'Easy'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Run a "Subscription Audit" using your bank statement", "Cancel any tool not used in the last 30 days", "Consolidate into "All-in-one' platforms"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of centralized software management", "Impulse buying tools"],
      automationPotential: {
        rating: "High",
        example: 'Using tools like RocketMoney (personal) or Glean (business) to track and cancel SaaS.'
      },
      pathToRoot: 'Too Many Subs → Overhead High → Money Out Fast'
    }
  },
  'equipment-costs': {
    explanation: 'You are buying high-end gear, hardware, or machinery that isn"t being fully utilized. If the equipment isn't paying for itself in 6-12 months, it's a liability.',
    relatedProblems: ["overhead-high", "tools-equipment-break"],
    impactAnalysis: {
      financialImpact: 'Capital tied up in depreciating assets; high maintenance costs.',
      severity: "Low",
      affectedAreas: ["Cash Flow", "Asset Utilization"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Sell underused equipment", "Lease instead of buy for future needs", "Charge clients an "Equipment Fee" for specialized work"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-specifying needs", "Buying instead of renting/leasing"],
      automationPotential: {
        rating: "Low",
        example: 'Using inventory management tools to track equipment ROI.'
      },
      pathToRoot: 'Equipment Costs → Overhead High → Money Out Fast'
    }
  },
  'insurance-legal': {
    explanation: 'While necessary, these costs can bloat if you aren"t shopping around or if you are over-insured for risks that are low-probability.',
    relatedProblems: ["overhead-high", "licensing-compliance"],
    impactAnalysis: {
      financialImpact: 'Fixed expense drag; potential for over-spending on "defensive" measures.',
      severity: "Low",
      affectedAreas: ["Fixed Costs"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Easy",
      quickWins: ["Get 3 quotes for business insurance", "Use "Standard" legal templates instead of custom-drafting every time", "Negotiate a flat-fee retainer with your lawyer"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of price comparison", "Over-conservative risk management"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI-driven legal tools for contract review instead of an expensive lawyer.'
      },
      pathToRoot: 'Insurance/Legal → Overhead High → Money Out Fast'
    }
  },
  'utilities-facilities': {
    explanation: 'Heating, cooling, cleaning, and maintaining a physical space. These are invisible costs that scale with the size of your office, not your revenue.',
    relatedProblems: ["expensive-office", "overhead-high"],
    impactAnalysis: {
      financialImpact: 'Variable expense drag; inefficient use of resources.',
      severity: "Low",
      affectedAreas: ["Fixed Costs"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Reduce cleaning frequency", "Install smart thermostats", "Go paperless to save on supplies/storage"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inefficient physical space management"],
      automationPotential: {
        rating: "Medium",
        example: 'Smart building automation to reduce energy and facility costs.'
      },
      pathToRoot: 'Utilities → Overhead High → Money Out Fast'
    }
  },
  'admin-staff': {
    explanation: 'You have hired full-time people for roles that could be handled by software, contractors, or AI. Administrative payroll is the "heaviest" form of overhead.',
    relatedProblems: ["overhead-high", "low-value-work"],
    impactAnalysis: {
      financialImpact: 'Massive hit to gross margin; high "management debt" for the founder.',
      severity: "Major",
      affectedAreas: ["Payroll", "Profitability", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Hard",
      quickWins: ["Automate the tasks they are doing", "Switch to part-time or virtual assistants", "Cross-train admin staff into revenue-generating roles"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Hiring to solve a "process" problem with a "person'", "Traditional staffing mindset"],
      automationPotential: {
        rating: "High",
        example: 'Replacing manual data entry, scheduling, and bookkeeping with AI agents.'
      },
      pathToRoot: 'Admin Staff → Overhead High → Money Out Fast'
    }
  },
  'banking-fees': {
    explanation: 'Wire fees, monthly service charges, and credit card processing fees. These are small percentages that, on high volume, can equal a full salary every year.',
    relatedProblems: ["overhead-high", "payment-friction"],
    impactAnalysis: {
      financialImpact: 'Direct erosion of revenue; "Tax" on every transaction.',
      severity: "Low",
      affectedAreas: ["Net Profit"],
      strategicPriority: 'Easy'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Switch to a fee-free business bank (e.g., Mercury, Relay)", "Negotiate CC processing rates", "Pass CC fees to clients where legal"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Using "Big Bank" services with high fee structures"],
      automationPotential: {
        rating: "Low",
        example: 'Switching to digital banks with automated fee-waiver systems.'
      },
      pathToRoot: 'Banking Fees → Overhead High → Money Out Fast'
    }
  },
  'delivery-costs-high': {
    explanation: 'The direct costs of fulfilling your service are too high. You are spending too much on labor, materials, or software to deliver what you"ve sold.',
    relatedProblems: ["subcontractors-expensive", "inefficient-processes", "rework-mistakes"],
    impactAnalysis: {
      financialImpact: 'Thin gross margins; working harder for less profit.',
      severity: "Major",
      affectedAreas: ["Gross Margin", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Audit subcontractor rates", "Map out the delivery workflow", "Identify the "most expensive" step and solve it"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of standardized fulfillment", "Poor vendor management", "Over-delivering"],
      automationPotential: {
        rating: "High",
        example: 'Automating 20-50% of the fulfillment tasks to reduce labor hours per client.'
      },
      pathToRoot: 'High Delivery Costs → Expenses High → Money Out Fast'
    }
  },
  'subcontractors-expensive': {
    explanation: 'You are relying on expensive freelancers or agencies to deliver your service. If you are paying them > 30-40% of the project fee, your margins are too thin.',
    relatedProblems: ["delivery-costs-high", "cant-afford-hire"],
    impactAnalysis: {
      financialImpact: 'Direct margin squeeze; lack of control over quality/timing.',
      severity: "Major",
      affectedAreas: ["Profitability", "Service Quality"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-3 months",
      difficulty: "Medium",
      quickWins: ["Negotiate bulk rates for guaranteed work", "Bring the "core" delivery in-house", "Use lower-cost international talent for non-client-facing work"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Avoiding the commitment of hiring full-time staff", "Lack of internal training systems"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to replace high-cost specialized subcontractors for specific tasks (e.g., copywriting, basic dev).'
      },
      pathToRoot: 'Expensive Subcontractors → Delivery Costs → Money Out Fast'
    }
  },
  'inefficient-processes': {
    explanation: 'Work is being done the hard way. Duplicate data entry, manual follow-ups, and a lack of standardized templates are wasting hundreds of hours.',
    relatedProblems: ["manual-processes", "delivery-costs-high", "rework-mistakes"],
    impactAnalysis: {
      financialImpact: 'High "Labor-to-Revenue' ratio; low capacity.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Capacity", "Gross Margin"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Create SOPs for the 3 most common tasks", "Connect tools using Zapier/Make", "Standardize your client onboarding"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Rushing to deliver instead of building infrastructure", "Technical debt"],
      automationPotential: {
        rating: "High",
        example: 'Connecting your sales, fulfillment, and accounting apps to eliminate manual data transfer.'
      },
      pathToRoot: 'Inefficient Processes → Delivery Costs → Money Out Fast'
    }
  },
  'rework-mistakes': {
    explanation: 'Errors are costing you double: once to fix them, and once in the opportunity cost of the time lost. It also kills your reputation and future referrals.',
    relatedProblems: ["quality-problems", "mistakes-rework", "delivery-costs-high"],
    impactAnalysis: {
      financialImpact: 'Profit margins destroyed by unbilled hours; high churn risk.',
      severity: "Major",
      affectedAreas: ["Profitability", "Customer Satisfaction", "Quality"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Implement a mandatory QA checklist", "Require a "second-eye" review before delivery", "Analyze the root cause of the last 3 mistakes"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of standardized SOPs", "Rushing due to capacity issues", "Poorly defined scope"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated validation scripts or QA check-tools for technical work.'
      },
      pathToRoot: 'Rework → Delivery Costs → Money Out Fast'
    }
  },
  'travel-meetings': {
    explanation: 'Too much time and money spent on "face-to-face' that could be handled via video or asynchronous communication. Travel is an expensive 'hidden' cost.',
    relatedProblems: ["delivery-costs-high", "low-value-work"],
    impactAnalysis: {
      financialImpact: 'Wasted labor hours; travel expenses (flights, hotels) eating profit.',
      severity: "Low",
      affectedAreas: ["Profitability", "Founder Time"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Shift to "Zoom-First' for discovery calls", "Batch in-person meetings into a single day", "Charge clients for travel time and expenses"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Old-school relationship mindset", "Inability to lead digital meetings effectively"],
      automationPotential: {
        rating: "Low",
        example: 'Using async video tools like Loom to replace 50% of status meetings.'
      },
      pathToRoot: 'Travel/Meetings → Delivery Costs → Money Out Fast'
    }
  },
  'materials-supplies': {
    explanation: 'You are paying retail prices for materials or over-buying supplies that sit in inventory. Every $1 saved here is $1 of pure profit.',
    relatedProblems: ["delivery-costs-high", "overbuying-inventory"],
    impactAnalysis: {
      financialImpact: 'Direct hit to gross margin; cash tied up in physical stock.',
      severity: "Low",
      affectedAreas: ["Gross Margin", "Cash Flow"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Negotiate wholesale rates", "Implement "Just-in-time' ordering", "Audit current inventory for waste"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor inventory management", "Lack of vendor negotiation"],
      automationPotential: {
        rating: "Medium",
        example: 'Inventory tracking software that auto-reorders at the best price.'
      },
      pathToRoot: 'Materials/Supplies → Delivery Costs → Money Out Fast'
    }
  },
  'tools-equipment-break': {
    explanation: 'Maintenance and replacement costs for the tools you use. If your gear is unreliable, you are losing time and money constantly.',
    relatedProblems: ["delivery-costs-high", "equipment-costs"],
    impactAnalysis: {
      financialImpact: 'Unexpected expenses; project delays due to downtime.',
      severity: "Low",
      affectedAreas: ["Operational Stability", "Cash Flow"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Implement a "Preventative Maintenance" schedule", "Buy high-quality gear once rather than cheap gear twice", "Have redundancy for critical tools"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Buying cheap equipment", "Neglecting maintenance"],
      automationPotential: {
        rating: "Low",
        example: 'Automated maintenance alerts based on usage/time.'
      },
      pathToRoot: 'Broken Tools → Delivery Costs → Money Out Fast'
    }
  },
  'licensing-compliance': {
    explanation: 'Software licenses, professional certifications, and regulatory compliance. These are often mandatory but can be optimized.',
    relatedProblems: ["delivery-costs-high", "insurance-legal"],
    impactAnalysis: {
      financialImpact: 'Fixed cost drag; risk of high fines if neglected.',
      severity: "Low",
      affectedAreas: ["Fixed Costs", "Risk"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Audit software licenses for "Unused Seats"", "Switch to annual licensing for discounts", "Automate compliance tracking"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of license management", "Regulatory complexity"],
      automationPotential: {
        rating: "Medium",
        example: 'Compliance management software to automate renewals and audits.'
      },
      pathToRoot: 'Licensing/Compliance → Delivery Costs → Money Out Fast'
    }
  },
  'support-costs': {
    explanation: 'Post-delivery support is eating your profit. If your product/service is confusing or buggy, your support team (or you) is spending all their time "fixing" rather than 'selling.'',
    relatedProblems: ["delivery-costs-high", "results-mediocre", "quality-problems"],
    impactAnalysis: {
      financialImpact: 'Massive hit to Net Profit; high churn risk; team frustration.',
      severity: "Major",
      affectedAreas: ["Profitability", "Customer Satisfaction", "Labor Costs"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Create a robust Help Center/FAQ", "Record "How-to' videos for common issues", "Fix the 3 most common "Bug/Complaint' root causes"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor onboarding", "Complex/unintuitive product", "Quality issues"],
      automationPotential: {
        rating: "High",
        example: 'Using AI chatbots to handle 70% of common support inquiries.'
      },
      pathToRoot: 'Support Costs → Delivery Costs → Money Out Fast'
    }
  },
  'margins-low': {
    explanation: 'You are working for very little profit. This makes the business fragile and prevents reinvestment. It"s often a sign of poor pricing or inefficient delivery.',
    relatedProblems: ["prices-low", "scope-creep-unbilled", "inefficient-delivery"],
    impactAnalysis: {
      financialImpact: 'Low ROI on efforts; inability to scale profitably.',
      severity: "Major",
      affectedAreas: ["Profitability", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Hard",
      quickWins: ["Raise prices", "Standardize delivery", "Improve project tracking"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Under-pricing", "Inefficient fulfillment", "Unbilled scope creep"],
      automationPotential: {
        rating: "Medium",
        example: 'Using project tracking automation to identify margin leakage in real-time.'
      },
      pathToRoot: 'Low Margins → Money Out Fast → Not Enough Money (Root)'
    }
  },
  'pricing-value-issues': {
    explanation: 'Even if you have clients, the revenue generated per client is too low to sustain a healthy business. This is often a combination of "pricing too low" and 'not being perceived as high-value.' You are working hard but the financial output doesn't match the effort.',
    relatedProblems: ["prices-low", "value-conveyance", "pricing-model-revenue"],
    impactAnalysis: {
      financialImpact: 'Low Average Order Value (AOV); thin margins; high pressure to acquire volume.',
      severity: "Major",
      affectedAreas: ["Profitability", "Team Quality", "Sustainability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Raise prices for next 3 leads", "Stop offering the "basic" package", "Introduce a high-ticket "VIP" tier"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Commoditization", "Fear of rejection", "Lack of clear ROI"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated value-tracking dashboards to show clients the results you"re getting them.'
      },
      pathToRoot: 'Low Revenue Per Client → Not Enough Revenue → Not Enough Money (Root)'
    }
  },
  'look-too-small': {
    explanation: 'Perception is reality in business. If you look like a "one-person shop' or an amateur operation, high-value clients will be afraid to trust you with large budgets. Your branding, website, and communication lack the authority needed to command premium prices.',
    relatedProblems: ["trust-signals-missing", "design-amateur", "anonymous-brand"],
    impactAnalysis: {
      financialImpact: 'Loss of high-ticket deals; relegated to "budget" clients.',
      severity: "Moderate",
      affectedAreas: ["Sales", "Brand Authority", "Market Positioning"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Easy",
      quickWins: ["Professionalize your email signature and LinkedIn", "Clean up website design", "Use "we" instead of "I' in communication"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of brand investment", "Founder-centric identity", "Inconsistent messaging"],
      automationPotential: {
        rating: "Medium",
        example: 'AI-powered content engines to maintain a consistent, high-authority brand presence.'
      },
      pathToRoot: 'Poor Perception → Value Not Conveyed → Clients Don"t Pay Enough → Not Enough Revenue (Root)'
    }
  },
  'weak-messaging': {
    explanation: 'Your marketing copy talks about "what you do" instead of 'the result the client gets.' You are speaking to the logical brain (features) rather than the emotional brain (pain relief).',
    relatedProblems: ["value-conveyance", "benefits-unclear"],
    impactAnalysis: {
      financialImpact: 'Leads don"t convert; prospects don't 'get' why you're better than the cheap option.',
      severity: "Major",
      affectedAreas: ["Marketing ROI", "Sales Conversion"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Rewrite your website headline to focus on a single result", "Use the "So what?' test on every bullet point in your proposal", "Interview a client and use their exact words in your copy"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Too close to the work (Expert Curse)", "Lack of copywriting skills"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to rewrite technical jargon into benefit-driven marketing copy.'
      },
      pathToRoot: 'Weak Messaging → Value Not Conveyed → Clients Don"t Pay Enough → Not Enough Revenue'
    }
  },
  'no-roi-proof': {
    explanation: 'You can"t point to a number and say "I made my client $X.' Without proof of financial return, your service is seen as a 'cost' to be cut rather than an 'investment' to be grown.',
    relatedProblems: ["value-conveyance", "cant-articulate-roi"],
    impactAnalysis: {
      financialImpact: 'Impossible to command premium prices; high churn during budget cuts.',
      severity: "Major",
      affectedAreas: ["Pricing Power", "Client Retention"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Create a simple "ROI Calculator" for your sales calls", "Survey past clients for specific financial outcomes", "Include one "Hard Number" case study in every pitch"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Not tracking data", "Fear of making specific promises"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated reporting dashboards that show the client exactly how much money/time you"ve saved them.'
      },
      pathToRoot: 'No ROI Proof → Value Not Conveyed → Clients Don"t Pay Enough → Not Enough Revenue'
    }
  },
  'value-creation': {
    explanation: 'Your core service might be "too thin.' You aren't solving a deep enough problem to justify a high price. You are doing the work, but the work itself isn't worth that much to the market.',
    relatedProblems: ["commoditized-service", "product-market-mismatch"],
    impactAnalysis: {
      financialImpact: 'Low ceiling on revenue; intense competition.',
      severity: "Major",
      affectedAreas: ["Product Strategy", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Bundle your service with a digital asset or tool", "Offer a "Guarantee" that no one else in your industry dares to offer", "Ask: "What"s the $10,000 version of what I do?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of specialized expertise", "Targeting the wrong market segment"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a product/strategy shift.'
      },
      pathToRoot: 'Low Value Creation → Not Providing Enough Value → Clients Don"t Pay Enough → Not Enough Revenue'
    }
  },
  'commoditized-service': {
    explanation: 'You look exactly like your competitors. When the client can"t see a difference, they choose based on price. You are a 'replaceable cog' in their business.',
    relatedProblems: ["competing-price", "no-differentiation"],
    impactAnalysis: {
      financialImpact: 'Constant price wars; zero brand loyalty.',
      severity: "Critical",
      affectedAreas: ["Brand Positioning", "Margins"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Pick a hyper-niche (e.g., "Email for HVAC companies" instead of just 'Marketing')", "Develop a "Proprietary Method" with a unique name", "Add a "Service Guarantee" that competitors can't match"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Following the pack", "Fear of exclusion from the broader market"],
      automationPotential: {
        rating: "Low",
        example: 'Using automation to provide a "High-Touch' experience that commodities can't afford.'
      },
      pathToRoot: 'Commoditization → Not Providing Enough Value → Clients Don"t Pay Enough → Not Enough Revenue'
    }
  },
  'product-market-mismatch': {
    explanation: 'You are selling something the market doesn"t "need' enough to pay for. It's a 'nice to have' in a world that only buys 'must-haves.'',
    relatedProblems: ["value-creation", "not-buying-mode"],
    impactAnalysis: {
      financialImpact: 'High cost of sales; low conversion; constant rejection.',
      severity: "Critical",
      affectedAreas: ["Survival", "Sales", "Product Strategy"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6 months (Pivot)",
      difficulty: "Hard",
      quickWins: ["Talk to 10 non-buyers and ask what they *would* pay for", "Pivot your existing tech/skills to solve a "Burning" problem", "Kill the current offer if it"s not gaining traction"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Building in a vacuum", "Solving a problem that doesn"t exist"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this requires human intuition and market listening.'
      },
      pathToRoot: 'Mismatch → Not Providing Enough Value → Clients Don"t Pay Enough → Not Enough Revenue'
    }
  },
  'results-mediocre': {
    explanation: 'Your service works, but it"s not "remarkable.' Remarkable results create referrals and high retention. 'Okay' results create churn and price-sensitivity.',
    relatedProblems: ["quality-problems", "client-dissatisfaction"],
    impactAnalysis: {
      financialImpact: 'Zero referrals; high acquisition costs; low client LTV.',
      severity: "Major",
      affectedAreas: ["Growth Rate", "Client LTV", "Brand Reputation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Set higher "Internal" standards for delivery", "Hire a specialist to improve the core product", "Implement a feedback loop to find where the quality drops"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Under-resourced team", "Lack of clear quality standards", "Rushing to fulfillment"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to double-check work or improve the quality of deliverables (e.g., better design, better code).'
      },
      pathToRoot: 'Mediocre Results → Not Providing Enough Value → Clients Don"t Pay Enough → Not Enough Revenue'
    }
  },
  'flat-fees-low': {
    explanation: 'You are charging a single price that hasn"t changed in years. As your costs and complexity grow, your 'Flat Fee' project is becoming less profitable by the day.',
    relatedProblems: ["prices-low", "dont-know-costs"],
    impactAnalysis: {
      financialImpact: 'Profit margin "Invisible" erosion; working for a lower effective hourly rate over time.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Cash Flow"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Raise your flat fee by 15% today", "Introduce "Tiered" flat fees based on project complexity", "Add a "Rush Fee" for fast turnarounds"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of losing the deal", "No annual price reviews"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a pricing strategy change.'
      },
      pathToRoot: 'Low Flat Fees → Pricing Structure Wrong → Clients Don"t Pay Enough → Not Enough Revenue'
    }
  },
  'no-performance-upside': {
    explanation: 'You are making your clients millions of dollars, but you only get paid a fixed fee. You have no "skin in the game" and no way to benefit from the massive value you create.',
    relatedProblems: ["value-conveyance", "pricing-model-revenue"],
    impactAnalysis: {
      financialImpact: 'Capped revenue; misaligned incentives with the client.',
      severity: "Moderate",
      affectedAreas: ["Revenue Growth", "Client Alignment"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Propose a "Performance Bonus" based on specific KPIs", "Test a "Percentage of Spend" or 'Percentage of Revenue' model", "Bundle a "Rev-Share' into a lower base fee"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of data tracking to prove results", "Fear of variable income"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated KPI tracking dashboards that trigger performance-based invoices.'
      },
      pathToRoot: 'No Upside → Pricing Structure Wrong → Clients Don"t Pay Enough → Not Enough Revenue'
    }
  },
  'no-recurring-revenue': {
    explanation: 'You have to sell every single month just to survive. Without subscriptions or retainers, your business has zero "Momentum" and zero "Exit Value.'',
    relatedProblems: ["lumpy-revenue", "pricing-model-revenue"],
    impactAnalysis: {
      financialImpact: 'High sales pressure; unpredictable cash flow; low business valuation.',
      severity: "Major",
      affectedAreas: ["Business Valuation", "Cash Flow Stability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "4-8 months",
      difficulty: "Hard",
      quickWins: ["Create a "Maintenance" or "Strategy' retainer", "Switch a one-off product to a subscription", "Incentivize long-term contracts with a small discount"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling "One-off' projects only", "Lack of an ongoing value proposition"],
      automationPotential: {
        rating: "High",
        example: 'Automated recurring billing and subscription management tools (Stripe Billing, etc.).'
      },
      pathToRoot: 'No Recurring → Pricing Structure Wrong → Clients Don"t Pay Enough → Not Enough Revenue'
    }
  },
  'why-left': {
    explanation: 'You are losing clients, but you don"t know *exactly* why. Without understanding the 'Why,' you can't fix the 'How.' Every churned client is a treasure trove of data on how to improve your business.',
    relatedProblems: ["bad-service", "competitor-stole", "no-retention-system"],
    impactAnalysis: {
      financialImpact: 'Continuous leak in revenue; high cost to replace lost income.',
      severity: "Major",
      affectedAreas: ["LTV", "Brand Reputation", "Product/Service Quality"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Call the last 3 clients who left and ask for honest feedback", "Implement an "Exit Survey" in your cancellation flow", "Analyze churn by "Service Type" to find patterns"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of feedback loops", "Ignoring "Silent" dissatisfaction"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated exit surveys triggered by subscription cancellation.'
      },
      pathToRoot: 'Why They Left → Clients Churned → Not Enough Clients → Not Enough Revenue'
    }
  },
  'bad-service': {
    explanation: 'The most painful reason for churn. You didn"t meet the expectations you set. Whether it was quality, timing, or communication, the client felt they didn't get what they paid for.',
    relatedProblems: ["quality-problems", "results-mediocre", "client-dissatisfaction"],
    impactAnalysis: {
      financialImpact: 'Zero referrals; negative word-of-mouth; immediate revenue loss.',
      severity: "Critical",
      affectedAreas: ["Brand Reputation", "Client LTV", "Team Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Fix the #1 most complained about issue today", "Offer a refund or credit to unhappy clients to save the relationship", "Implement a 30-day "Health Check" for all new clients"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of SOPs", "Over-selling/Under-delivering", "Untrained team"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated QA checklists that must be completed before work is sent to the client.'
      },
      pathToRoot: 'Bad Service → Why They Left → Clients Churned → Not Enough Revenue'
    }
  },
  'no-retention-system': {
    explanation: 'You have no proactive strategy to keep clients. You assume that if they are happy, they will stay. In reality, clients need to be "re-sold' on the value you provide regularly.',
    relatedProblems: ["not-staying-touch", "no-renewal-process", "assuming-stay"],
    impactAnalysis: {
      financialImpact: 'Passive revenue loss; high acquisition pressure.',
      severity: "Major",
      affectedAreas: ["LTV", "Client Success"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Setup a monthly "Value Report" for every client", "Schedule quarterly "Strategic Reviews"", "Create a simple "Renewal" sequence 60 days before contract end"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Transactional mindset", "Founder focus on sales over success"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Success" emails and value-tracking dashboards.'
      },
      pathToRoot: 'No Retention System → Clients Churned → Not Enough Clients → Not Enough Revenue'
    }
  },
  'clients-not-buying-more': {
    explanation: 'Your existing clients have more problems that you could solve, but they aren"t paying you to solve them. You are leaving the 'easiest' money on the table because you aren't upselling or cross-selling.',
    relatedProblems: ["lack-awareness", "no-upsell-process", "lack-need-perceived"],
    impactAnalysis: {
      financialImpact: 'Low Revenue per Client; high reliance on new leads.',
      severity: "Moderate",
      affectedAreas: ["LTV", "Sales Efficiency", "Profitability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Easy",
      quickWins: ["Send a "We also do X" email to all current clients", "Add "Expansion" as a line item in your quarterly reviews", "Create a "Discounted Bundle" for existing clients only"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive account management", "Client views you as a "single-tool" provider"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Did you know?' email sequences triggered based on client milestones.'
      },
      pathToRoot: 'Not Buying More → Not Enough Clients → Not Enough Revenue'
    }
  },
  'no-upsell-process': {
    explanation: 'You have no formal system for identifying and closing expansion opportunities. Upselling is happening randomly, if at all.',
    relatedProblems: ["not-proactively-offering", "waiting-ask", "not-identifying-opportunities"],
    impactAnalysis: {
      financialImpact: 'Stagnant LTV; missed high-margin revenue.',
      severity: "Moderate",
      affectedAreas: ["Sales pipeline", "LTV"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Define 3 "Logical Next Steps" for your core offer", "Train your delivery team to flag upsell opportunities", "Add an upsell link to your project completion emails"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of being "Salesy" after the deal", "Lack of expansion strategy"],
      automationPotential: {
        rating: "High",
        example: 'CRM automation that flags clients for an upsell after 90 days of success.'
      },
      pathToRoot: 'No Upsell Process → Not Buying More → Not Enough Clients → Not Enough Revenue'
    }
  },
  'cant-find-prospects': {
    explanation: 'The "Invisibility" problem. You don't know where your ideal clients hang out, or your target market is so broad that you are shouting into a void.',
    relatedProblems: ["dont-know-where-market", "market-too-small", "lead-gen-insufficient"],
    impactAnalysis: {
      financialImpact: 'Zero pipeline; wasted marketing dollars on the wrong audience.',
      severity: "Major",
      affectedAreas: ["Sales pipeline", "Marketing Strategy"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Define your "Ideal Customer Profile" (ICP) in detail", "Use LinkedIn/Apollo to find 100 people who fit that profile exactly", "Ask existing clients where they get their news/info"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of market research", "No niche focus"],
      automationPotential: {
        rating: "High",
        example: 'Automated lead scraping and enrichment based on specific ICP criteria.'
      },
      pathToRoot: 'Cant Find Prospects → Not Getting New Clients → Not Enough Revenue'
    }
  },
  'prospects-dont-know': {
    explanation: 'You have a great product, but you"re the "best kept secret' in the industry. Your brand visibility is zero outside of your immediate circle.',
    relatedProblems: ["no-visibility", "no-referrals", "no-word-mouth"],
    impactAnalysis: {
      financialImpact: 'No organic inbound; 100% reliance on outbound/manual efforts.',
      severity: "Major",
      affectedAreas: ["Brand Awareness", "Sales Pipeline"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-9 months",
      difficulty: "Medium",
      quickWins: ["Post 3x a week on the platform where your audience is", "Partner with an "Authority" in your space for a webinar/post", "Run a small "Awareness" ad campaign"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of content strategy", "No outbound marketing activity"],
      automationPotential: {
        rating: "High",
        example: 'Automated content distribution and social media scheduling.'
      },
      pathToRoot: 'Prospects Dont Know → Not Getting New Clients → Not Enough Revenue'
    }
  },
  'no-referrals': {
    explanation: 'You are doing good work, but you aren"t "systematizing' the praise. Referrals are the highest-converting, lowest-cost leads, yet you're leaving them to chance.',
    relatedProblems: ["not-asking-referrals", "no-incentive-referrals", "dont-know-how-refer"],
    impactAnalysis: {
      financialImpact: 'High cost of acquisition; slow growth speed.',
      severity: "Moderate",
      affectedAreas: ["Sales pipeline", "Marketing ROI"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Ask your 3 happiest clients for a referral today", "Add a "Referral" link to your email signature", "Create a simple incentive (e.g., $500 credit) for successful referrals"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of "Bothering" clients", "No referral "ask" in the process"],
      automationPotential: {
        rating: "High",
        example: 'Automated referral requests sent 24 hours after a positive NPS score or milestone.'
      },
      pathToRoot: 'No Referrals → Prospects Dont Know → Not Getting New Clients → Not Enough Revenue'
    }
  },
  'prospects-aware-dont-engage': {
    explanation: 'People see your brand, but they don"t click, call, or email. Your 'Hook' isn't sharp enough to stop the scroll or justify the time of an initial conversation.',
    relatedProblems: ["message-no-resonate", "offer-not-compelling", "no-clear-next-step"],
    impactAnalysis: {
      financialImpact: 'Wasted visibility/impressions; high marketing "noise" without 'signal.'',
      severity: "Major",
      affectedAreas: ["Marketing Conversion", "Sales pipeline"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Change your "Call to Action" to something low-friction (e.g., "Get a 5-min audit' vs 'Book a 1-hour call')", "Rewrite your main headline to be more provocative", "Test a "Lead Magnet" (free value) to capture email"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak offer", "Boring messaging", "Too much friction"],
      automationPotential: {
        rating: "High",
        example: 'A/B testing software to automatically find the highest-engaging messages.'
      },
      pathToRoot: 'Dont Engage → Not Getting New Clients → Not Enough Revenue'
    }
  },
  'prospects-engage-dont-buy': {
    explanation: 'You are getting the meetings, but you"re not getting the signatures. The 'Trust Gap' or the 'Value Gap' is too large at the point of sale.',
    relatedProblems: ["dont-trust", "dont-understand-offer", "price-objection"],
    impactAnalysis: {
      financialImpact: 'Massive waste of founder/sales time; high acquisition costs.',
      severity: "Critical",
      affectedAreas: ["Conversion Rate", "Profitability", "Founder Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Send a "Pre-meeting' video showing your expertise", "Create a "Case Study" deck to show during the call", "Simplify your pricing options to avoid "Analysis Paralysis""]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor sales skills", "Weak social proof", "Complex offer"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Pre-sale' nurture sequences that build trust before the first call.'
      },
      pathToRoot: 'Engage Dont Buy → Not Getting New Clients → Not Enough Revenue'
    }
  },
  'no-project-tracking': {
    explanation: 'You have no real-time visibility into your projects. You don"t know who is doing what, where the bottlenecks are, or if a project is going over budget until it's too late.',
    relatedProblems: ["dont-know-status", "cant-see-bottlenecks", "surprises-end"],
    impactAnalysis: {
      financialImpact: 'Budget overruns; missed deadlines; unbilled labor.',
      severity: "Major",
      affectedAreas: ["Operations", "Profitability", "Team Management"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Move all tasks into ONE project management tool (Asana, ClickUp, Notion)", "Hold a 10-min daily "Standup" to check status", "Use a "Stoplight" (Red/Yellow/Green) system for project health"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Relying on Slack/Email for management", "Lack of operational discipline"],
      automationPotential: {
        rating: "High",
        example: 'Automated project dashboards that flag "Delayed" tasks or "Over-budget' hours instantly.'
      },
      pathToRoot: 'No Project Tracking → Project Management Issues → Bought Cant Deliver'
    }
  },
  'time-trapped': {
    explanation: 'The founder is doing everything. You are the bottleneck for every decision, every email, and every deliverable. You have a job, not a business.',
    relatedProblems: ["low-value-work", "cant-delegate-founder", "no-processes-documented"],
    impactAnalysis: {
      financialImpact: 'Growth is capped by your personal hours; zero business valuation.',
      severity: "Critical",
      affectedAreas: ["Scalability", "Founder Health", "Business Value"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Audit your time for 3 days and find the "Bottom 20%' of tasks", "Hire a VA for just 5 hours/week to handle inbox/scheduling", "Record a Loom video for every recurring task you do today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Hero complex", "Lack of delegation skills", "No SOPs"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to triage your email and draft replies, saving 10+ hours a week.'
      },
      pathToRoot: 'Time Trapped → Personal Bottlenecks → Not Enough Money'
    }
  },
  'disorganized-chaotic': {
    explanation: 'Information is everywhere and nowhere. You are losing hours a week looking for files, re-answering the same questions, and fixing things that fell through the cracks.',
    relatedProblems: ["no-systems-organization", "poor-prioritization", "communication-mess"],
    impactAnalysis: {
      financialImpact: 'Hidden labor waste; high stress; poor client experience.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Mental Clarity", "Team Trust"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Spend one full day organizing your digital files (GDrive/Dropbox)", "Choose ONE source of truth for tasks", "Clean your physical workspace"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Rapid growth without cleanup", "Personal habit of founder"],
      automationPotential: {
        rating: "High",
        example: 'Automated file naming and organization tools.'
      },
      pathToRoot: 'Disorganized → Personal Bottlenecks → Not Enough Money'
    }
  },
  'value-conveyance': {
    explanation: 'You might be doing great work, but the client doesn"t perceive it as valuable. This is a messaging and translation gap. You are talking about 'features' while the client cares about 'outcomes' and 'ROI.'',
    relatedProblems: ["weak-messaging", "no-roi-proof", "look-too-small"],
    impactAnalysis: {
      financialImpact: 'High price sensitivity; constant negotiation/haggling.',
      severity: "Major",
      affectedAreas: ["Sales Conversion", "Client Satisfaction", "Pricing Power"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Rewrite your proposal to focus on client ROI", "Create 3 "Success Stories" or Case Studies", "Ask clients: "What would happen if you didn"t solve this?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical jargon", "Lack of sales training", "Inability to quantify results"],
      automationPotential: {
        rating: "High",
        example: 'Automated ROI calculators or "Savings" reports delivered monthly to clients.'
      },
      pathToRoot: 'Value Gap → Clients Don"t Pay Enough → Not Enough Revenue (Root)'
    }
  },
  'pricing-model-revenue': {
    explanation: 'The way you charge is fundamentally limiting your revenue. Relying solely on flat fees or hourly rates caps your upside and keeps you on a treadmill. You lack recurring revenue or value-based tiers that capture the true worth of your work.',
    relatedProblems: ["no-recurring-revenue", "flat-fees-low", "no-performance-upside"],
    impactAnalysis: {
      financialImpact: 'Unpredictable revenue; inability to scale without more labor.',
      severity: "Major",
      affectedAreas: ["Business Valuation", "Cash Flow", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Switch one project to a monthly retainer", "Add a "Setup Fee" + 'Maintenance' model", "Bundle software/tools with your service"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Trading time for money", "Lack of scalable productized services", "Fear of long-term commitment"],
      automationPotential: {
        rating: "High",
        example: 'Automated subscription billing and usage-based invoicing.'
      },
      pathToRoot: 'Broken Model → Clients Don"t Pay Enough → Not Enough Revenue (Root)'
    }
  },
  'not-enough-clients': {
    explanation: 'Your total client base is too small to sustain the business. This can be due to high churn, existing clients not buying more, or failing to acquire new clients.',
    relatedProblems: ["clients-churned", "clients-not-buying-more", "not-getting-new"],
    impactAnalysis: {
      financialImpact: 'Low top-line revenue; inability to cover fixed costs.',
      severity: "Major",
      affectedAreas: ["Revenue", "Growth"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Audit lead generation", "Review client retention", "Upsell existing clients"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor marketing", "Weak sales process", "Product-market fit issues"],
      automationPotential: {
        rating: "High",
        example: 'Automated lead nurturing and client engagement systems.'
      },
      pathToRoot: 'Not Enough Clients → Not Enough Revenue → Not Enough Money (Root)'
    }
  },
  'bought-cant-deliver': {
    explanation: 'You have sold more than you can handle. This leads to delivery delays, quality issues, and eventual reputation damage.',
    relatedProblems: ["not-enough-capacity", "process-bottlenecks", "quality-problems"],
    impactAnalysis: {
      financialImpact: 'Churn risk; high rework costs; missed future sales.',
      severity: "Major",
      affectedAreas: ["Delivery", "Customer Satisfaction", "Reputation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Slow down sales", "Hire temporary help", "Optimize current processes"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-selling", "Under-hiring", "Inefficient fulfillment"],
      automationPotential: {
        rating: "High",
        example: 'Automated project management and fulfillment workflows.'
      },
      pathToRoot: 'Bought Cant Deliver → Not Enough Revenue → Not Enough Money (Root)'
    }
  },
  'founder-everything': {
    explanation: 'The founder is the single point of failure. You are doing delivery, sales, admin, and strategy. This is not a business; it"s a high-stress job.',
    relatedProblems: ["cant-delegate", "no-one-knows-how", "afraid-let-go"],
    impactAnalysis: {
      financialImpact: 'Capped revenue; high burnout risk; zero exit value.',
      severity: "Major",
      affectedAreas: ["Scalability", "Founder Health"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Document top 3 tasks", "Hire a VA", "Start delegating one low-risk task"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of SOPs", "Hero complex", "Control issues"],
      automationPotential: {
        rating: "High",
        example: 'Automated triage systems to offload the founder"s initial touchpoints.'
      },
      pathToRoot: 'Founder Everything → Capacity Issues → Not Enough Revenue (Root)'
    }
  },
  'project-management-issues': {
    explanation: 'Projects are slipping, scope is creeping, and communication is failing. This leads to inefficient delivery and low profit margins.',
    relatedProblems: ["scope-creep-profit", "timelines-slip", "communication-breakdowns-pm"],
    impactAnalysis: {
      financialImpact: 'Erosion of profit margins; high rework costs.',
      severity: "Moderate",
      affectedAreas: ["Operations", "Team Efficiency", "Profitability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Choose a PM tool", "Standardize project kickoff", "Implement weekly status updates"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of standardized PM process", "Poor communication", "Undefined roles"],
      automationPotential: {
        rating: "High",
        example: 'Automated project templates and task reminders.'
      },
      pathToRoot: 'PM Issues → Inefficient Delivery → Money Out Fast → Not Enough Money (Root)'
    }
  },
  'client-management-issues': {
    explanation: 'You are dealing with difficult or wrong clients, leading to constant changes, unreasonable expectations, and low profit.',
    relatedProblems: ["difficult-clients", "wrong-clients", "no-client-boundaries"],
    impactAnalysis: {
      financialImpact: 'High stress; low profit; team burnout.',
      severity: "Moderate",
      affectedAreas: ["Team Morale", "Profitability", "Service Quality"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Define client boundaries", "Fire the worst 10% of clients", "Improve client vetting"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Desperate for business", "Weak sales qualifying", "Lack of clear boundaries"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated client onboarding and expectation-setting sequences.'
      },
      pathToRoot: 'Client Issues → Inefficient Delivery → Money Out Fast → Not Enough Money (Root)'
    }
  },
  'cant-delegate-founder': {
    explanation: 'You struggle to let go of control, either because you don"t trust others or you don"t know how to delegate effectively.',
    relatedProblems: ["dont-trust-others", "easier-do-myself", "no-one-delegate"],
    impactAnalysis: {
      financialImpact: 'Capped growth; high opportunity cost.',
      severity: "Major",
      affectedAreas: ["Scalability", "Founder Productivity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Document a task", "Delegate a small project", "Set clear expectations"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Control issues", "Lack of training systems", "Hero complex"],
      automationPotential: {
        rating: "High",
        example: 'Using delegation tracking tools to monitor task progress without constant check-ins.'
      },
      pathToRoot: 'Cant Delegate → Founder Bottleneck → Capacity Issues → Revenue Risk (Root)'
    }
  },
  'no-processes-documented': {
    explanation: 'Everything is in the founder"s head. This makes delegating impossible and training new team members slow and painful.',
    relatedProblems: ["everything-founders-head", "cant-hand-off", "explain-every-time"],
    impactAnalysis: {
      financialImpact: 'High cost of training; inconsistent quality; low asset value.',
      severity: "Major",
      affectedAreas: ["Operations", "Asset Value", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Record tasks today", "Create a simple SOP index", "Start with most recurring tasks"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder hero syndrome", "Lack of time to document", "Scale exceeding infrastructure"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to generate SOP drafts from screen recordings.'
      },
      pathToRoot: 'No Docs → Founder Bottleneck → Capacity Issues → Revenue Risk (Root)'
    }
  },
  'skills-knowledge-gap': {
    explanation: 'The founder or team lacks critical business, marketing, or technical skills needed to scale.',
    relatedProblems: ["no-business-skills", "no-marketing-skills", "learning-too-slow"],
    impactAnalysis: {
      financialImpact: 'Missed opportunities; poor strategic decisions.',
      severity: "Major",
      affectedAreas: ["Leadership", "Strategic Growth", "Competitiveness"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-18 months",
      difficulty: "Hard",
      quickWins: ["Identify top 1 skill to learn", "Find a mentor", "Join a peer group"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inexperience", "Lack of training resources", "No time to learn"],
      automationPotential: {
        rating: "Low",
        example: 'Skill gaps are solved through education/hiring, not directly through automation.'
      },
      pathToRoot: 'Skill Gap → Founder Bottleneck → Strategic Failure → Not Enough Money (Root)'
    }
  },
  // CHURN BRANCH
  'competitor-stole': {
    explanation: 'A competitor offered a better price, better features, or a better relationship. You lost the client because you stopped being the "Best" choice for them.',
    relatedProblems: ["commoditized-service", "no-differentiation"],
    impactAnalysis: {
      financialImpact: 'Loss of market share; increased acquisition pressure.',
      severity: "Major",
      affectedAreas: ["LTV", "Competitive Positioning"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Hard",
      quickWins: ["Run a "Win-Back' campaign with a unique new feature", "Analyze the competitor"s offer and find their weakness", "Interview the churned client to see exactly where you fell short"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Commoditization", "Passive relationship management", "Competitor innovation"],
      automationPotential: {
        rating: "Medium",
        example: 'Competitive intelligence tools to track rival pricing and features automatically.'
      },
      pathToRoot: 'Competitor Stole → Why They Left → Clients Churned'
    }
  },
  'no-renewal-process': {
    explanation: 'Contracts are ending and no one is asking for the renewal. You are letting clients drift away simply because you didn"t send a follow-up email.',
    relatedProblems: ["no-retention-system", "assuming-stay"],
    impactAnalysis: {
      financialImpact: 'Passive revenue erosion; high cost of replacement sales.',
      severity: "Major",
      affectedAreas: ["Retention Rate", "LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Setup automated renewal alerts 60 days out", "Offer a "Renewal Bonus" for early sign-ups", "Standardize the contract extension template"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of admin oversight", "Fear of client re-evaluating the deal"],
      automationPotential: {
        rating: "High",
        example: 'Automated contract renewal workflows in your CRM or CLM.'
      },
      pathToRoot: 'No Renewal Process → No Retention System → Clients Churned'
    }
  },
  // LEAD GEN BRANCH
  'dont-know-where-market': {
    explanation: 'You are guessing where your leads are. You are spending time on Instagram when your clients are on LinkedIn, or at trade shows when they are on Google.',
    relatedProblems: ["no-research", "guessing-demographics"],
    impactAnalysis: {
      financialImpact: 'Massive waste of marketing spend and founder time.',
      severity: "Major",
      affectedAreas: ["Marketing ROI", "Lead Quality"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Survey your top 10 clients: "Where do you spend your time online?'", "Install tracking pixels to see where traffic is coming from", "Interview a competitor"s client"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of customer research", "Marketing based on "Gut""],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI audience research tools (SparkToro, etc.) to map your market.'
      },
      pathToRoot: 'Unknown Market Location → Cant Find Prospects → Not Getting New Clients'
    }
  },
  'lead-gen-insufficient': {
    explanation: 'Your pipeline is dry. You don"t have enough "Shots on Goal' to hit your revenue targets. This is a volume problem.',
    relatedProblems: ["not-enough-activity", "sources-dried"],
    impactAnalysis: {
      financialImpact: 'Revenue stagnation; inability to project future growth.',
      severity: "Critical",
      affectedAreas: ["Top-line Revenue', "Business Survival"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Double your daily outreach activity", "Launch a cold email campaign today", "Partner with a non-competing brand for a shoutout"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inconsistent marketing effort", "Reliance on a single channel"],
      automationPotential: {
        rating: "High",
        example: 'Automated outbound prospecting systems (Instantly, Apollo, etc.).'
      },
      pathToRoot: 'Low Lead Volume → Cant Find Prospects → Not Getting New Clients'
    }
  },
  'no-visibility': {
    explanation: 'You are invisible to the market. You have no "Digital Footprint,' making it impossible for prospects to find you organically.',
    relatedProblems: ["no-marketing", "no-website", "seo-nonexistent"],
    impactAnalysis: {
      financialImpact: '100% reliance on expensive paid ads or manual outreach.',
      severity: "Major",
      affectedAreas: ["Organic Reach", "Acquisition Cost"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-12 months",
      difficulty: "Hard",
      quickWins: ["Setup a basic Google My Business profile", "Launch a 1-page high-converting website", "Start a consistent social media schedule (3x/week)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder avoidance of "Public" presence", "Technical debt in marketing tech"],
      automationPotential: {
        rating: "High",
        example: 'Automated social media posting and basic AI-driven content generation.'
      },
      pathToRoot: 'No Visibility → Prospects Dont Know → Not Getting New Clients'
    }
  },
  'message-no-resonate': {
    explanation: 'People are seeing you, but they don"t care. Your message is too generic, too technical, or simply doesn't solve a pain they actually feel.',
    relatedProblems: ["talking-us-not-problems", "benefits-unclear", "weak-messaging"],
    impactAnalysis: {
      financialImpact: 'High cost of attention with zero conversion.',
      severity: "Major",
      affectedAreas: ["Click-through Rate', "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Rewrite your headline to address a "Burning Pain"", "Use "You" more than "I' or 'We' in your copy", "Record a 2-min video explaining the *Problem* you solve"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of empathy/customer understanding", "Feature-focused selling"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to analyze customer reviews and rewrite copy in their exact voice.'
      },
      pathToRoot: 'Message Mismatch → Aware But Dont Engage → Not Getting New Clients'
    }
  },
  'offer-not-compelling': {
    explanation: 'Your product/service sounds "Fine.' But fine doesn't get people to part with their money. You lack a 'Grand Slam Offer' that feels like an obvious win.',
    relatedProblems: ["looks-like-everyone", "no-differentiation", "nothing-unique"],
    impactAnalysis: {
      financialImpact: 'High price sensitivity; long sales conversations that end in "No.'',
      severity: "Major",
      affectedAreas: ["Sales Conversion", "Pricing Power"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Add a "Risk-Free Guarantee'", "Bundle a high-value "Bonus" that costs you little", "Create a "Limited Time" or 'Limited Quantity' reason to act now"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Commoditization", "Fear of making a bold claim"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a strategy and creative task.'
      },
      pathToRoot: 'Weak Offer → Aware But Dont Engage → Not Getting New Clients'
    }
  },
  'dont-trust-us': {
    explanation: 'The prospect likes the idea, but they don"t believe *you* can deliver it. You lack the 'Proof' required to lower their perceived risk.',
    relatedProblems: ["no-testimonials", "no-track-record", "website-unprofessional"],
    impactAnalysis: {
      financialImpact: 'High drop-off at the final stage of the funnel.',
      severity: "Major",
      affectedAreas: ["Close Rate", "Brand Equity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Get 3 video testimonials from happy clients", "Showcase logos of recognizable brands you"ve worked with", "Publish a detailed "Deep Dive" case study showing your process"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["New business/offer", "Invisible results", "Poor branding"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated testimonial gathering and display widgets (Senja, TrustPulse).'
      },
      pathToRoot: 'Lack of Trust → Engage But Dont Buy → Not Getting New Clients'
    }
  },
  // ADMIN BRANCH
  'work-others-cheaper': {
    explanation: 'You are performing tasks that have a market value of $20-$50/hour while your business needs you to perform $500/hour activities. Every hour you spend on "cheap" work is an hour you are effectively paying yourself a junior's salary.',
    relatedProblems: ["low-value-work", "cant-delegate-founder"],
    impactAnalysis: {
      financialImpact: 'Direct loss of high-value growth; highest opportunity cost in the business.',
      severity: "Major",
      affectedAreas: ["Founder Throughput", "Growth Speed"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["List every task you did this week and its hourly market rate", "Hire a part-time VA or freelancer for the lowest-rate tasks", "Stop doing any task that someone on Fiverr could do for $20"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Frugality mindset ("I can save money by doing it myself")", "Lack of awareness of task value"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to perform routine drafting, research, or data tasks.'
      },
      pathToRoot: 'Cheap Work → Low-Value Work → Time Trapped → Personal Bottlenecks'
    }
  },
  'busy-not-revenue': {
    explanation: 'You are mistaking activity for progress. Your calendar is full, but your bank account isn"t growing. You are focusing on 'Business Theater' rather than 'Revenue Generating Activities' (RGAs).',
    relatedProblems: ["low-value-work", "reactive-not-proactive"],
    impactAnalysis: {
      financialImpact: 'Strategic stagnation; running in place while competition moves ahead.',
      severity: "Major",
      affectedAreas: ["Strategic Growth", "Revenue Predictability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Medium",
      quickWins: ["Identify your top 3 RGAs and schedule them for first thing in the morning", "Say "No" to 3 non-revenue meetings this week", "Set a "Revenue Target" for every major project"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Avoiding difficult sales/growth work", "Lack of clear goals", "People-pleasing"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a prioritization and mindset shift.'
      },
      pathToRoot: 'Busywork → Low-Value Work → Time Trapped → Personal Bottlenecks'
    }
  },
  'firefighting-not-building': {
    explanation: 'You spend your entire day solving problems that shouldn"t have happened in the first place. You are reactive, constantly 'putting out fires' rather than building the systems that prevent them.',
    relatedProblems: ["low-value-work", "no-systems"],
    impactAnalysis: {
      financialImpact: 'Zero progress on infrastructure; high stress; recurring mistakes.',
      severity: "Major",
      affectedAreas: ["Mental Clarity", "Scalability", "Operational Stability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Hard",
      quickWins: ["Identify the #1 "Recurring Fire" and build a system to kill it today", "Block 2 hours of "Non-Interruption' time for building SOPs", "Stop solving the same problem twice"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of operational systems", "Poorly trained team", "Reactive leadership style"],
      automationPotential: {
        rating: "Medium",
        example: 'Using automated monitoring and alerts to catch "Small Sparks" before they become fires.'
      },
      pathToRoot: 'Firefighting → Low-Value Work → Time Trapped → Personal Bottlenecks'
    }
  },
  'micromanagement': {
    explanation: 'You hired people but you don"t trust them to do the work. You are involved in every tiny detail, which slows down the team, creates a bottleneck, and prevents your staff from growing.',
    relatedProblems: ["cant-delegate-founder", "dont-trust-others"],
    impactAnalysis: {
      financialImpact: 'Highest cost of management; low team morale; zero scalability.',
      severity: "Major",
      affectedAreas: ["Team Morale", "Scalability", "Founder Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Give one project to a team member and promise not to check in for 48 hours", "Define "Success Criteria" instead of 'How to do it'", "Accept that 80% as good as you is often good enough"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Perfectionism", "Insecurity", "Lack of clear training/SOPs"],
      automationPotential: {
        rating: "Medium",
        example: 'Using project dashboards to see progress *without* having to ask for updates.'
      },
      pathToRoot: 'Micromanagement → Cant Delegate → Time Trapped → Personal Bottlenecks'
    }
  },
  'everything-founders-head': {
    explanation: 'The business knowledge is trapped in your brain. If you aren"t there to answer questions, the business stops. This makes you the world's most expensive 'Support Desk.'',
    relatedProblems: ["no-processes-documented", "knowledge-not-transferable"],
    impactAnalysis: {
      financialImpact: 'High cost of existence; zero exit value; high training friction.',
      severity: "Critical",
      affectedAreas: ["Scalability", "Asset Value", "Team Autonomy"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Record every internal question you answer this week", "Turn those answers into a simple Wiki or Notion doc", "Stop answering questions that aren"t documented yet"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Moving too fast to document", "Reliance on verbal communication"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to transcribe your verbal instructions into written SOPs.'
      },
      pathToRoot: 'Internal Bottleneck → No Docs → Time Trapped → Personal Bottlenecks'
    }
  },
  'knowledge-not-transferable': {
    explanation: 'You have built a service that is "Magic" rather than "Method.' It's based on your unique intuition or talent, meaning you can't easily teach someone else to do it.',
    relatedProblems: ["no-processes-documented", "service-complex"],
    impactAnalysis: {
      financialImpact: 'Growth ceiling; inability to hire senior replacements; high "Magic" tax.',
      severity: "Major",
      affectedAreas: ["Scalability", "Product Strategy"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Deconstruct your "Magic" into a 5-step framework", "Identify the "General" vs "Specialized' parts of your work", "Standardize the inputs needed for your intuition to work"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of proprietary method", "Over-reliance on founder talent"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI models trained on your "Method" to assist team members.'
      },
      pathToRoot: 'Non-Transferable → No Docs → Time Trapped → Personal Bottlenecks'
    }
  },
  'no-systems-organization': {
    explanation: 'You have no "Home" for information. Tasks, files, and communications are scattered across Slack, Email, WhatsApp, and your memory. This is the foundation of chaos.',
    relatedProblems: ["disorganized-chaotic", "messy-files", "no-task-management"],
    impactAnalysis: {
      financialImpact: 'High hidden labor waste; missed opportunities; high team frustration.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Mental Clarity", "Operational Stability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Choose ONE project tool and delete the rest", "Set a "No-Slack-Tasks' rule today", "Create a master file naming convention"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Tool fragmentation", "Lack of operational discipline", "Rapid scale"],
      automationPotential: {
        rating: "High",
        example: 'Automated file routing and task creation using centralized workspace tools.'
      },
      pathToRoot: 'No Org Systems → Disorganized → Personal Bottlenecks'
    }
  },
  'messy-files': {
    explanation: 'Documents are named "final_final_v2.pdf' and hidden in deep folder structures. You and your team waste 30-60 mins a day just searching for things you already have.',
    relatedProblems: ["no-systems-organization", "cant-find-things"],
    impactAnalysis: {
      financialImpact: 'Direct labor waste; risk of using outdated information.',
      severity: "Low to Moderate",
      affectedAreas: ["Efficiency", "Quality Control"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Standardize top-level folder names today", "Archive anything older than 2 years", "Use a "Master Index" document for critical project files"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of folder hierarchy SOP", "No naming convention", "Personal habit of team"],
      automationPotential: {
        rating: "High",
        example: 'Using AI-powered file search and automated tagging/organization.'
      },
      pathToRoot: 'Messy Files → No Org Systems → Disorganized → Personal Bottlenecks'
    }
  },
  'sticky-notes-everywhere': {
    explanation: 'Your "System" is physical clutter. Sticky notes, physical pads, and memory are not searchable, not shareable, and easily lost. It's a sign of a 'Single-User' business mindset.',
    relatedProblems: ["no-systems-organization", "no-task-management"],
    impactAnalysis: {
      financialImpact: 'Information loss; inability to delegate; high risk of items "falling through.'',
      severity: "Moderate",
      affectedAreas: ["Reliability", "Scalability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Throw away every sticky note today after digitizing the tasks", "Switch to a digital "Inbox" for all random thoughts", "Buy a second monitor instead of more paper"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Resistance to digital tools", "Fear of "System" overhead"],
      automationPotential: {
        rating: "High",
        example: 'Using OCR (Optical Character Recognition) to digitize notes instantly.'
      },
      pathToRoot: 'Physical Chaos → No Org Systems → Disorganized → Personal Bottlenecks'
    }
  },
  'shiny-object-syndrome': {
    explanation: 'You are constantly starting new projects but finishing none. You are chasing the "Next Big Thing" because the current thing is hard or boring. This prevents the business from ever reaching critical mass.',
    relatedProblems: ["poor-prioritization", "everything-urgent"],
    impactAnalysis: {
      financialImpact: 'Diverted resources; zero momentum; wasted R&D spend.',
      severity: "Major",
      affectedAreas: ["Growth Speed", "Focus", "Productivity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Strategic shift",
      difficulty: "Hard",
      quickWins: ["Say "No" to every new idea for 30 days", "Implement an "Ideas Parking Lot" Notion page", "Focus on the #1 revenue source until it"s automated"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Entrepreneurial boredom", "Fear of failure in the core business", "Lack of clear vision"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a leadership and focus issue.'
      },
      pathToRoot: 'Shiny Object Syndrome → Poor Prioritization → Disorganized → Personal Bottlenecks'
    }
  },
  'time-management-broken': {
    explanation: 'You have no control over your day. You are a "slave to the notifications.' This leads to long hours with very little output, eventually causing burnout.',
    relatedProblems: ["no-calendar-system", "no-time-blocking", "interruptions-constant"],
    impactAnalysis: {
      financialImpact: 'Low founder productivity; high stress; eventual health collapse.',
      severity: "Major",
      affectedAreas: ["Founder Health", "Efficiency", "Leadership"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Delete Slack/Email from your phone", "Block out the first 2 hours of your day for "Deep Work"", "Use a calendar for EVERYTHING, including lunch"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of boundaries", "Reliance on synchronous communication", "Reactive habits"],
      automationPotential: {
        rating: "High",
        example: 'Using automated calendar managers and focus-mode software.'
      },
      pathToRoot: 'Broken Time Management → Disorganized → Personal Bottlenecks'
    }
  },
  'no-time-blocking': {
    explanation: 'You work on whatever is "loudest" right now. You lack the discipline to dedicate specific blocks of time to specific types of work, leading to constant context-switching.',
    relatedProblems: ["time-management-broken", "interruptions-switching"],
    impactAnalysis: {
      financialImpact: '40% reduction in cognitive performance due to switching; delayed projects.',
      severity: "Moderate",
      affectedAreas: ["Productivity", "Quality of Work"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Color-code your calendar by activity type", "Schedule "Admin" for the end of the day", "Strictly follow the calendar for 3 days"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of planning", "Under-estimating task duration"],
      automationPotential: {
        rating: "Medium",
        example: 'Smart scheduling tools that auto-block time based on task priority.'
      },
      pathToRoot: 'No Blocking → Broken Time Management → Disorganized → Personal Bottlenecks'
    }
  },
  'interruptions-constant': {
    explanation: 'Your team, clients, and family can reach you at any time. You are never in "Deep Work" for more than 15 minutes. You are living in a state of 'continuous partial attention.'',
    relatedProblems: ["time-management-broken", "interruptions-switching"],
    impactAnalysis: {
      financialImpact: 'High error rate; low-quality decisions; high stress.',
      severity: "Major",
      affectedAreas: ["Mental Health", "Output Quality"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Medium",
      quickWins: ["Turn off ALL non-human notifications", "Set Slack to "Away" during deep work", "Tell the team: "No questions between 9 AM and 11 AM'"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Culture of immediacy", "Poor team autonomy", "Notification addiction"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Quiet Mode" across all devices during scheduled focus blocks.'
      },
      pathToRoot: 'Constant Interruptions → Broken Time Management → Disorganized → Personal Bottlenecks'
    }
  },
  'communication-mess': {
    explanation: 'You are searching 5 different apps to find one piece of information. Your "Corporate Memory" is fragmented, leading to confusion and missed deadlines.',
    relatedProblems: ["multiple-channels-mess", "losing-important-messages", "inbox-overflowing"],
    impactAnalysis: {
      financialImpact: 'Invisible time loss (search cost); client perception of incompetence.',
      severity: "Moderate",
      affectedAreas: ["Operational Speed", "Team Alignment", "Customer Experience"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Choose ONE app for internal comms and ONE for external", "Shutdown all other channels today", "Set a "No Internal Email" rule"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Tool bloat", "Lack of communication policy", "Shadow IT (team choosing their own tools)"],
      automationPotential: {
        rating: "High",
        example: 'Using AI aggregators to sync communications into a single searchable feed.'
      },
      pathToRoot: 'Comms Chaos → Disorganized → Personal Bottlenecks'
    }
  },
  'inbox-overflowing': {
    explanation: 'Your email is a To-Do list that anyone in the world can add to. With thousands of unread messages, you are living in a state of "Low-Grade Anxiety' and missing revenue opportunities.',
    relatedProblems: ["communication-mess", "losing-important-messages"],
    impactAnalysis: {
      financialImpact: 'Missed sales leads; delayed vendor payments; poor client follow-up.',
      severity: "Moderate",
      affectedAreas: ["Sales", "Mental Health", "Responsiveness"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Archive ALL emails older than 30 days today (Inbox Zero strategy)", "Unsubscribe from 50 newsletters", "Use filters to route receipts/alerts away from the inbox"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of "Inbox Zero" discipline", "No email triage system"],
      automationPotential: {
        rating: "High",
        example: 'AI-powered email filters and triage agents (SaneBox, Superhuman).'
      },
      pathToRoot: 'Inbox Chaos → Comms Chaos → Disorganized → Personal Bottlenecks'
    }
  },
  'workspace-environment': {
    explanation: 'Your physical or digital desk is a disaster. Visual clutter leads to mental clutter. If you can"t see your desk, you can't see the path to growth.',
    relatedProblems: ["physical-clutter", "desktop-chaos", "too-many-tabs"],
    impactAnalysis: {
      financialImpact: 'Reduced focus; friction in starting tasks; low energy.',
      severity: "Low",
      affectedAreas: ["Mental Clarity", "Productivity"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Clean your desk today", "Close every browser tab and start fresh", "Organize your computer desktop"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Personal habit", "Lack of regular "Cleanup" cycles"],
      automationPotential: {
        rating: "Medium",
        example: 'Digital cleanup bots that auto-archive old desktop files and browser tabs.'
      },
      pathToRoot: 'Workspace Chaos → Disorganized → Personal Bottlenecks'
    }
  },
  'health-neglected': {
    explanation: 'You are sacrificing your body for the business. Poor sleep, no exercise, and bad diet are lowering your IQ, your mood, and your leadership capacity. You are an engine running without oil.',
    relatedProblems: ["burnout-energy", "chronic-stress", "physical-symptoms"],
    impactAnalysis: {
      financialImpact: 'Poor decision-making; high medical costs; risk of long-term business stall.',
      severity: "Critical",
      affectedAreas: ["Leadership Capability", "Energy Levels", "Business Survival"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Hard",
      quickWins: ["Sleep 7+ hours tonight", "Schedule 30 mins of movement today", "Drink 2L of water"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Work-at-all-costs mindset", "Lack of self-care systems", "Isolation"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this requires human lifestyle changes, though wearable tracking can help.'
      },
      pathToRoot: 'Health Neglect → Burnout → Personal Bottlenecks'
    }
  },
  'emotionally-exhausted': {
    explanation: 'You have lost your "Why.' You are numb, cynical, or constantly on the verge of tears. Your emotional reserves are empty, making you a brittle and ineffective leader.',
    relatedProblems: ["burnout-energy", "lost-motivation", "decision-fatigue"],
    impactAnalysis: {
      financialImpact: 'Toxic culture; high team churn; missed strategic opportunities.',
      severity: "Critical",
      affectedAreas: ["Team Culture", "Vision", "Retention"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Take a 48-hour "Digital Detox"", "Find a founder peer group to talk to", "Outsource the #1 thing you hate doing today"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Long-term chronic stress", "Lack of support network", "Misalignment with core values"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - requires counseling, community, and rest.'
      },
      pathToRoot: 'Emotional Exhaustion → Burnout → Personal Bottlenecks'
    }
  },
  'no-business-skills': {
    explanation: 'You are a great "technician" but a poor 'business owner.' You don't understand cash flow, hiring, or strategy. You are trying to build a skyscraper with a Lego set.',
    relatedProblems: ["skills-knowledge-gap", "no-financial-literacy", "no-systems-thinking"],
    impactAnalysis: {
      financialImpact: 'Poor capital allocation; high risk of "accidental" bankruptcy.',
      severity: "Major",
      affectedAreas: ["Financial Management", "Strategic Growth", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-18 months",
      difficulty: "Hard",
      quickWins: ["Hire a part-time CFO or bookkeeper today", "Read "The E-Myth Revisited'", "Audit your P&L statement for 1 hour"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technician-turned-founder", "Lack of formal business education"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI-powered financial analysis and strategy planning tools.'
      },
      pathToRoot: 'Business Skill Gap → Knowledge Gap → Personal Bottlenecks'
    }
  },
  'no-marketing-skills': {
    explanation: 'You don"t know how to generate attention or trust at scale. You rely on 'Referrals and Luck,' which is not a growth strategy.',
    relatedProblems: ["skills-knowledge-gap", "dont-know-target", "no-digital-marketing"],
    impactAnalysis: {
      financialImpact: 'Revenue growth is stagnant and unpredictable.',
      severity: "Major",
      affectedAreas: ["Sales pipeline", "Brand Authority"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-12 months",
      difficulty: "Hard",
      quickWins: ["Hire a marketing consultant for a 1-hour audit", "Pick ONE channel and master it", "Define your "Irresistible Offer" today"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Assumption that "Good work sells itself"", "Technical/Product bias"],
      automationPotential: {
        rating: "High",
        example: 'AI-driven marketing strategy and content generation engines.'
      },
      pathToRoot: 'Marketing Skill Gap → Knowledge Gap → Personal Bottlenecks'
    }
  },
  'learning-too-slow': {
    explanation: 'The world is moving faster than you are. Your skills and tools are becoming obsolete, but you "don"t have time' to learn new ones. You are being out-competed by people who learn 10x faster.',
    relatedProblems: ["skills-knowledge-gap", "no-time-learn", "no-mentors"],
    impactAnalysis: {
      financialImpact: 'Decreasing competitiveness; eventual obsolescence.',
      severity: "Moderate",
      affectedAreas: ["Innovation", "Competitive Edge"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Schedule 1 hour of "Learning" time every Friday", "Subscribe to a top industry newsletter", "Join a mastermind group"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Busywork-trap", "Arrogance or fixed mindset"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to summarize books, courses, and industry news into 5-min briefs.'
      },
      pathToRoot: 'Slow Learning → Knowledge Gap → Personal Bottlenecks'
    }
  },
  'mindset-blocks': {
    explanation: 'The "Inner Bottleneck.' Fear of success, fear of failure, or an 'Imposter' mindset is preventing you from taking the big actions needed to grow.',
    relatedProblems: ["skills-knowledge-gap", "imposter-syndrome", "fear-failure"],
    impactAnalysis: {
      financialImpact: 'Hidden growth ceiling; self-sabotage of big deals.',
      severity: "Major",
      affectedAreas: ["Leadership", "Sales", "Strategic Risk"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-12 months",
      difficulty: "Hard",
      quickWins: ["Write down your #1 business fear today", "Talk to a coach or therapist", "Do the one thing you"ve been avoiding all week"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Personal trauma/history", "Lack of confidence", "Isolation"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - requires deep internal work and mentorship.'
      },
      pathToRoot: 'Mindset Blocks → Knowledge Gap → Personal Bottlenecks'
    }
  },
  'email-meeting-overload': {
    explanation: 'Your day is reactive. You are at the mercy of everyone else"s priorities. If you spend 6 hours a day in meetings and email, you only have 2 hours left for the business.',
    relatedProblems: ["time-management-broken", "interruptions-constant"],
    impactAnalysis: {
      financialImpact: 'Zero time for "Deep Work"; slow decision-making.',
      severity: "Major",
      affectedAreas: ["Strategic Vision", "Team Speed"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Implement "No-Meeting Wednesdays'", "Check email only 3x per day", "Cancel all recurring meetings for one week and see which ones actually need to come back"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of asynchronous culture", "Inability to say "No""],
      automationPotential: {
        rating: "High",
        example: 'AI meeting summaries (Fireflies/Otter) to skip 50% of meetings.'
      },
      pathToRoot: 'Overload → Low-Value Work → Time Trapped → Personal Bottlenecks'
    }
  },
  'dont-trust-others': {
    explanation: 'The "Only I can do it right" mindset. This is the ultimate growth killer. If you don't trust your team, you can never scale beyond your own hands.',
    relatedProblems: ["cant-delegate-founder", "micromanagement", "no-processes-documented"],
    impactAnalysis: {
      financialImpact: 'Revenue is capped at founder"s capacity; high team turnover.',
      severity: "Critical",
      affectedAreas: ["Scalability", "Team Culture", "Founder Burnout"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months (Mindset shift)",
      difficulty: "Hard",
      quickWins: ["Delegate a "Safe to Fail" task today", "Accept that 80% as good as you is good enough", "Focus on the "Outcome" not the "Method'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Perfectionism", "Previous bad hiring experiences"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a leadership and psychological hurdle.'
      },
      pathToRoot: 'Lack of Trust → Cant Delegate → Personal Bottlenecks'
    }
  },
  'everything-founders-head': {
    explanation: 'The business relies on your "Magic.' If you get sick, the business stops. You have no systems, only intuition.',
    relatedProblems: ["no-processes-documented", "cant-hand-off", "tribal-knowledge"],
    impactAnalysis: {
      financialImpact: 'Zero exit value; impossible to train new hires fast.',
      severity: "Critical",
      affectedAreas: ["Business Continuity", "Asset Value", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Record a Loom of you doing your core task today", "Create a "Table of Contents" for your business", "Hire a "Systems Architect" or VA to document for you"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Rushing to deliver", "Undervaluing systems"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to transcribe your "Brain Dumps" into structured SOPs.'
      },
      pathToRoot: 'Founders Head → No Processes → Time Trapped → Personal Bottlenecks'
    }
  },
  'everything-urgent': {
    explanation: 'The "Firefighting" mode. You are always reacting to the latest crisis. You never have time for the 'Important but not Urgent' tasks that actually grow the business.',
    relatedProblems: ["poor-prioritization", "reactive-not-proactive"],
    impactAnalysis: {
      financialImpact: 'Strategic drift; high burnout; missed long-term opportunities.',
      severity: "Major",
      affectedAreas: ["Strategic Growth", "Mental Clarity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Use the Eisenhower Matrix to categorize tasks", "Identify the "One Thing" that makes everything else easier", "Schedule 90 mins of "Proactive Time" first thing in the morning"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear goals", "No operational buffers"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated "Crisis Alerts" that flag real problems vs noise.'
      },
      pathToRoot: 'Everything Urgent → Poor Prioritization → Disorganized → Personal Bottlenecks'
    }
  },
  'inbox-overflowing': {
    explanation: 'Your email is a To-Do list that anyone in the world can add to. If you"re drowning in unread messages, you've lost control of your communication.',
    relatedProblems: ["communication-mess", "email-meeting-overload"],
    impactAnalysis: {
      financialImpact: 'Missed sales leads; delayed project approvals; high anxiety.',
      severity: "Moderate",
      affectedAreas: ["Admin Efficiency", "Sales Velocity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Achieve "Inbox Zero" once (even if by archiving everything older than 30 days)", "Setup filters for "CC" emails", "Unsubscribe from every newsletter today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Using email for internal chat", "Lack of VA support"],
      automationPotential: {
        rating: "High",
        example: 'AI email triage (SaneBox or custom AI agents) to pre-sort your mail.'
      },
      pathToRoot: 'Inbox Overflow → Communication Chaos → Disorganized → Personal Bottlenecks'
    }
  },
  'working-too-much': {
    explanation: 'The "Hustle Porn" trap. You are working 70+ hours a week but the results aren't increasing. You are trading your life for a business that isn't working.',
    relatedProblems: ["burnout-energy", "nights-weekends", "no-time-off"],
    impactAnalysis: {
      financialImpact: 'Diminishing returns on labor; high risk of health/relationship collapse.',
      severity: "Critical",
      affectedAreas: ["Founder Health", "Decision Quality", "Sustainability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Set a "Hard Stop" at 6 PM today", "Remove work apps from your phone", "Book a weekend getaway with NO laptop"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inefficient systems", "Fear of failure", "Low prices (requiring volume)"],
      automationPotential: {
        rating: "High",
        example: 'Automating the "Routine" work to buy back 20+ hours a week.'
      },
      pathToRoot: 'Too Much Work → Burnout → Personal Bottlenecks → Not Enough Money'
    }
  },
  'no-financial-literacy': {
    explanation: 'You don"t understand your P&L, Balance Sheet, or Cash Flow Statement. You are flying a plane without a dashboard.',
    relatedProblems: ["no-business-skills", "dont-know-costs"],
    impactAnalysis: {
      financialImpact: 'Inadvertent bankruptcy; tax surprises; missed profit opportunities.',
      severity: "Critical",
      affectedAreas: ["Financial Stability", "Strategic Planning"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Medium",
      quickWins: ["Hire a fractional CFO or high-level bookkeeper for an audit", "Learn the "Big 3' financial metrics for your industry", "Review your numbers weekly, not once a year"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Creative/Technician background", "Aversion to numbers"],
      automationPotential: {
        rating: "High",
        example: 'Automated financial dashboards (Fathom, Syft) that translate numbers into plain English.'
      },
      pathToRoot: 'No Financial Literacy → Skills Gap → Personal Bottlenecks'
    }
  },
  'imposter-syndrome': {
    explanation: 'You feel like a fraud. You"re afraid that if you raise prices or speak with authority, you'll be 'found out.' This keeps you playing small.',
    relatedProblems: ["mindset-blocks", "afraid-raise-prices"],
    impactAnalysis: {
      financialImpact: 'Directly caps your revenue and pricing power.',
      severity: "Major",
      affectedAreas: ["Sales", "Leadership", "Brand Authority"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Hard (Mindset)',
      quickWins: ["Keep a "Win Folder" of client praise", "Talk to a mentor who has been there", "Raise prices for ONE client as an experiment"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of external validation", "Comparison trap"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is psychological.'
      },
      pathToRoot: 'Imposter Syndrome → Mindset Blocks → Skills Gap → Personal Bottlenecks'
    }
  },
  // FULFILLMENT / CAPACITY
  'cant-hire-fast': {
    explanation: 'You have the money to hire, but you can"t find the right people. Your hiring process is either too slow, too picky, or you're looking in the wrong places.',
    relatedProblems: ["job-market-competitive", "hiring-process-slow"],
    impactAnalysis: {
      financialImpact: 'Missed revenue from unfulfilled sales; existing team burnout.',
      severity: "Major",
      affectedAreas: ["Capacity", "Team Morale", "Growth Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Hard",
      quickWins: ["Standardize the interview questions", "Use a "Test Task" to filter applicants fast", "Ask for referrals from your current best employees"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of employer branding", "Unclear job descriptions", "Bottlenecked interview process"],
      automationPotential: {
        rating: "High",
        example: 'Using Applicant Tracking Systems (ATS) with AI screening to filter the top 5% of candidates.'
      },
      pathToRoot: 'Cant Hire Fast → Capacity Issues → Bought Cant Deliver'
    }
  },
  'training-long': {
    explanation: 'It takes 6 months for a new hire to become "Profitable.' This lag time drains your cash flow and makes scaling dangerous.',
    relatedProblems: ["no-training-system", "learning-curve-steep"],
    impactAnalysis: {
      financialImpact: 'High cost of "Unproductive" payroll; slow ROI on new hires.',
      severity: "Moderate",
      affectedAreas: ["Cash Flow", "Team Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Medium",
      quickWins: ["Create a "First 7 Days' onboarding checklist", "Record "Screen-shares' of common tasks", "Assign a "Buddy" to new hires to offload the founder"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Complex/bespoke service", "Lack of documentation", "No structured training path"],
      automationPotential: {
        rating: "High",
        example: 'Using AI-driven training platforms (Trainual, Whale) to automate the knowledge transfer.'
      },
      pathToRoot: 'Long Training → Capacity Issues → Bought Cant Deliver'
    }
  },
  'team-unreliable': {
    explanation: 'You have people, but they don"t care as much as you do. Mistakes are made, deadlines are missed, and you feel like you have to 'Babysit' everyone.',
    relatedProblems: ["people-underperform", "management-issues", "motivation-low"],
    impactAnalysis: {
      financialImpact: 'High cost of rework; churn risk; massive founder stress.',
      severity: "Critical",
      affectedAreas: ["Quality Control", "Team Culture", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Set clear "Performance KPIs" for every role", "Hold weekly 1-on-1s focused on goals", "Fire the worst performer to reset the standard"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor hiring criteria", "Lack of leadership", "No accountability systems"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated task-tracking and "Missed Deadline" alerts to maintain accountability without 'Nagging'.'
      },
      pathToRoot: 'Unreliable Team → Capacity Issues → Bought Cant Deliver'
    }
  },
  'manual-data-entry': {
    explanation: 'You are paying humans to copy-paste information from one tool to another. This is the ultimate form of "Waste" in a modern business.',
    relatedProblems: ["copy-paste-hell", "no-automation", "tools-inadequate"],
    impactAnalysis: {
      financialImpact: 'High labor cost; high error rate; zero scalability.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Gross Margin", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Setup Zapier/Make between your CRM and Billing", "Use "Import/Export' instead of typing", "Identify the "Most Repeated" data task and automate it today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical debt", "Siloed tools", "Lack of integration knowledge"],
      automationPotential: {
        rating: "High",
        example: 'Using API-based integrations to move data instantly and perfectly between all systems.'
      },
      pathToRoot: 'Manual Data Entry → Tools Inadequate → Process Bottlenecks → Bought Cant Deliver'
    }
  },
  'scope-creep-profit': {
    explanation: 'The client asks for "One more thing" and you say "Sure.' You are trading your profit for their happiness, and they don't even realize you're doing them a favor.',
    relatedProblems: ["extras-free", "no-change-order-process"],
    impactAnalysis: {
      financialImpact: 'Direct erosion of project margin; team burnout from "Never-ending' work.',
      severity: "Major",
      affectedAreas: ["Profitability", "Team Capacity", "Project Management"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Medium",
      quickWins: ["Refer to the "Initial Scope" in every feedback meeting", "Create a "Phase 2' list for all extra requests", "Charge a 20% premium for any work added mid-project"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Vague SOWs", "Fear of client conflict", "No formal change process"],
      automationPotential: {
        rating: "Medium",
        example: 'Using project management tools that require "Credit" or "Add-on' approvals for new tasks.'
      },
      pathToRoot: 'Scope Creep → Project Management Issues → Bought Cant Deliver'
    }
  },
  'timelines-slip': {
    explanation: 'Projects are taking longer than quoted. This delays your next project, delays your payment, and costs you more in overhead per deal.',
    relatedProblems: ["underestimate-time-pm", "dependencies-delays"],
    impactAnalysis: {
      financialImpact: 'Cash flow stagnation; decreased annual throughput; high opportunity cost.',
      severity: "Major",
      affectedAreas: ["Operations", "Cash Flow", "Reputation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Add a "Timeline Buffer" to all new quotes", "Identify the "Critical Path" and monitor it daily", "Ask: "What is the #1 thing that causes delays?' and fix it"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Optimism bias", "Unmanaged dependencies", "Poor resource planning"],
      automationPotential: {
        rating: "High",
        example: 'Automated Gantt charts and "Delay Warnings" that flag issues before they become crises.'
      },
      pathToRoot: 'Timelines Slip → Project Management Issues → Bought Cant Deliver'
    }
  },
  'wrong-clients': {
    explanation: 'You are working with people who can"t afford you, don't value you, or have problems you aren't optimized to solve. They are draining your energy and profit.',
    relatedProblems: ["bad-fit-services", "cant-afford-pricing", "high-maintenance-low-profit"],
    impactAnalysis: {
      financialImpact: 'High "Support-to-Revenue' ratio; high churn; team misery.',
      severity: "Major",
      affectedAreas: ["Profitability", "Team Morale", "Brand Alignment"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard (Mindset)',
      quickWins: ["Fire your most "Abusive" or "Unprofitable' client today", "Tighten your "Lead Qualification" form", "Say "No" to any prospect who asks for a discount in the first meeting"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling out of desperation", "Weak marketing filters", "No clear niche"],
      automationPotential: {
        rating: "High",
        example: 'Using automated "Qualification Quizzes" to filter out bad-fit clients before they even talk to you.'
      },
      pathToRoot: 'Wrong Clients → Client Management Issues → Bought Cant Deliver'
    }
  },
  'out-of-business': {
    explanation: 'Your client"s company has ceased operations. While this feels outside your control, a high rate of clients going out of business suggests you are targeting an unstable or high-risk market segment.',
    relatedProblems: ["wrong-clients", "market-too-small"],
    impactAnalysis: {
      financialImpact: '100% LTV loss; potential bad debt (unpaid invoices).',
      severity: "Major",
      affectedAreas: ["Revenue Stability", "Market Strategy"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-6 months (Market shift)",
      difficulty: "Hard",
      quickWins: ["Audit the financial health of your current top 10 clients", "Pivot marketing to more "Recession-Proof' industries", "Require larger upfront payments from startups"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Targeting fragile startups", "Industry-wide downturn", "Poor client qualification"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a strategic targeting issue.'
      },
      pathToRoot: 'Client Out of Business → Why They Left → Clients Churned'
    }
  },
  'contract-ended': {
    explanation: 'The project or subscription term finished, and there was no proactive effort to renew or extend. This is a passive form of churn where you simply "let them walk away.'',
    relatedProblems: ["no-renewal-process", "assuming-stay"],
    impactAnalysis: {
      financialImpact: 'Passive revenue erosion; high cost of replacement sales.',
      severity: "Moderate",
      affectedAreas: ["Retention Rate", "LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Create a 30-day "Contract Expiry" alert in your CRM", "Draft a "Renewal Offer" template today", "Schedule "Future Planning" calls 2 months before contract end"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of administrative oversight", "Fear of re-negotiation", "Weak relationship management"],
      automationPotential: {
        rating: "High",
        example: 'Automated renewal sequences and calendar tasks for account managers.'
      },
      pathToRoot: 'Contract Ended → Why They Left → Clients Churned'
    }
  },
  'pricing-increased': {
    explanation: 'You raised your prices and the client left. While some churn is expected during price increases, losing high-value clients indicates they didn"t see enough "Added Value' to justify the new cost.',
    relatedProblems: ["afraid-raise-prices", "value-conveyance"],
    impactAnalysis: {
      financialImpact: 'Immediate revenue drop from churn; offset by higher margins on remaining clients.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Retention"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Offer a "Grandfathered" rate for 3-6 months to ease the transition", "Bundle new features or services with the price hike", "Clearly communicate the ROI increase that justifies the price"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor communication of value", "Sudden price jumps without warning", "Targeting price-sensitive segments"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a value perception and communication issue.'
      },
      pathToRoot: 'Pricing Increased Churn → Why They Left → Clients Churned'
    }
  },
  'needs-changed': {
    explanation: 'The client outgrew your current service level, or their internal strategy pivoted away from what you provide. This is often a sign that your service isn"t "Sticking' to their long-term growth.',
    relatedProblems: ["lack-awareness", "no-upsell-process"],
    impactAnalysis: {
      financialImpact: 'Loss of "Scale-up' potential; missed opportunities to grow with the client.',
      severity: "Moderate",
      affectedAreas: ["Client Lifetime Value", "Service Roadmap"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Medium",
      quickWins: ["Interview the departing client to see what they need *now*", "Develop a "Premium" or "Enterprise' tier for growing clients", "Partner with vendors who solve the "Next" problem for them"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Static service offering", "Not keeping pace with industry trends", "Lack of quarterly strategic reviews"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to track client company news and flag "Growth" triggers (hiring, funding).'
      },
      pathToRoot: 'Needs Changed → Why They Left → Clients Churned'
    }
  },
  'contact-left': {
    explanation: 'Your internal champion or primary contact left the client"s company, and you failed to build a relationship with their successor or the wider team. You were 'tied to a person,' not the organization.',
    relatedProblems: ["relationship-deteriorated", "no-retention-system"],
    impactAnalysis: {
      financialImpact: 'Sudden account risk; high probability of "New Manager" syndrome (bringing in their own vendors).',
      severity: "Major",
      affectedAreas: ["Account Stability", "LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (on occurrence)",
      difficulty: "Medium",
      quickWins: ["Multi-thread your relationships (know at least 3 people in the company)", "Set a Google Alert for your champions" names", "Reach out to the new contact with a "Value Audit" of past results"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Single-threaded relationships", "Passive account management", "Lack of institutional trust"],
      automationPotential: {
        rating: "Medium",
        example: 'Using LinkedIn integration to automatically flag when a key contact changes jobs.'
      },
      pathToRoot: 'Contact Left → Why They Left → Clients Churned'
    }
  },
  'relationship-deteriorated': {
    explanation: 'The trust and rapport between you and the client have eroded over time. This is often due to small, unaddressed frustrations, poor communication, or a "Transactional" feel to the work.',
    relatedProblems: ["bad-service", "not-asking-feedback"],
    impactAnalysis: {
      financialImpact: 'Slow-motion churn; zero referrals; increased price sensitivity.',
      severity: "Major",
      affectedAreas: ["Retention", "Referral Rate", "Team Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Send a personal, non-work related "Thinking of you" note", "Host a "Service Recovery" meeting to clear the air", "Assign a new account manager for a fresh start"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Communication gaps", "Arrogance or complacency", "Mismatch in personalities"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - relationships require human touch.'
      },
      pathToRoot: 'Relationship Deteriorated → Why They Left → Clients Churned'
    }
  },
  'not-staying-touch': {
    explanation: 'The "Out of sight, out of mind' problem. You only contact the client when there is an invoice or a problem. They don't feel valued or supported between projects.',
    relatedProblems: ["no-retention-system", "assuming-stay"],
    impactAnalysis: {
      financialImpact: 'Increased risk of competitor poaching; low upsell conversion.',
      severity: "Moderate",
      affectedAreas: ["Brand Loyalty", "Account Growth"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Setup a monthly value-add newsletter", "Schedule a recurring "15-min Coffee' call every quarter", "Share one relevant industry article with them today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Focus on "New Sales" over 'Existing Success'", "No account management process", "Founder busy-ness"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Stay-in-Touch' reminders in your CRM based on last contact date.'
      },
      pathToRoot: 'Not Staying in Touch → No Retention System → Clients Churned'
    }
  },
  'not-asking-feedback': {
    explanation: 'You are operating in a vacuum. You don"t know if the client is happy or frustrated because you never ask. Silence is not always 'Good News.'',
    relatedProblems: ["bad-service", "relationship-deteriorated"],
    impactAnalysis: {
      financialImpact: 'Surprise churn; missed opportunities to fix small issues before they become terminal.',
      severity: "Major",
      affectedAreas: ["Service Quality", "Client Satisfaction"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Send a simple 1-question NPS survey today", "Ask at the end of every call: "What"s one thing we could do better?'", "Implement a formal "Mid-Project' review"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of negative feedback", "Complacency", "No formal QA process"],
      automationPotential: {
        rating: "High",
        example: 'Automated feedback requests sent after project milestones or every 90 days.'
      },
      pathToRoot: 'Not Asking Feedback → No Retention System → Clients Churned'
    }
  },
  'not-monitoring-satisfaction': {
    explanation: 'You have no data on client health. You don"t track metrics like login frequency, usage, or response times that signal a client is 'Checking out' before they actually leave.',
    relatedProblems: ["bad-service", "no-retention-system"],
    impactAnalysis: {
      financialImpact: 'Inability to predict churn; reactive instead of proactive retention.',
      severity: "Moderate",
      affectedAreas: ["Retention Strategy", "Operational Awareness"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Identify 3 "Health Triggers" for your service", "Create a "Red Account" list for weekly review", "Check-in with any client who hasn"t responded in > 10 days"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of data tracking", "No Customer Success role", "Focus on delivery only"],
      automationPotential: {
        rating: "High",
        example: 'Customer health dashboards that aggregate usage data and survey scores.'
      },
      pathToRoot: 'Not Monitoring Satisfaction → No Retention System → Clients Churned'
    }
  },
  'assuming-stay': {
    explanation: 'The "Complacency Trap.' You believe that because they've been with you for years, they always will be. You stop 'Earning' their business every month.',
    relatedProblems: ["no-renewal-process", "not-staying-touch"],
    impactAnalysis: {
      financialImpact: 'Sudden, shocking loss of "Safe" revenue; loss of institutional knowledge.',
      severity: "Major",
      affectedAreas: ["Revenue Stability", "Strategic Planning"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing (Mindset shift)",
      difficulty: "Medium",
      quickWins: ["Re-pitch your value to an old client today", "Audit your oldest account for "Service Drift"", "Ask: "If they were a new lead today, would my current offer win them?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Arrogance", "Lack of competitive awareness", "Taking relationships for granted"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a cultural and mindset issue.'
      },
      pathToRoot: 'Assuming They"ll Stay → No Retention System → Clients Churned'
    }
  },
  'lack-awareness': {
    explanation: 'Clients don"t buy more because they don"t know what else you do. They have categorized you as 'The [X] Guy' and don't realize you also solve [Y] and [Z].',
    relatedProblems: ["dont-know-offer", "dont-know-what-else", "never-told"],
    impactAnalysis: {
      financialImpact: 'Missed high-margin upsells; client buys from competitors for things you could have done.',
      severity: "Major",
      affectedAreas: ["LTV", "Sales Efficiency", "Market Share"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Send a "Capability Deck" to all current clients", "Add a "What Else We Do" section to your email signature", "Mention one other service in every monthly update"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor internal marketing", "Narrow initial positioning", "Lack of account expansion strategy"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Did you know?' educational sequences for active clients.'
      },
      pathToRoot: 'Lack of Awareness → Existing Clients Not Buying More → Not Enough Clients'
    }
  },
  'lack-need-perceived': {
    explanation: 'The client actually has a problem you can solve, but they don"t *feel* the pain yet, or they don't see how your other services connect to their current goals.',
    relatedProblems: ["dont-see-connection", "dont-need-else"],
    impactAnalysis: {
      financialImpact: 'Stagnant account growth; perceived as a "Vendor" rather than a "Partner.'',
      severity: "Moderate",
      affectedAreas: ["Account Strategy", "Perceived Value"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Run a "Gap Analysis" for the client's business", "Show them a case study of how [Service B] improved [Service A] results", "Ask: "What happens to your [X] results if [Y] isn't solved?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of strategic consultative selling", "Focus on technical delivery over business outcomes"],
      automationPotential: {
        rating: "Medium",
        example: 'AI-driven "Next Best Action" recommendations based on client industry data.'
      },
      pathToRoot: 'Lack of Perceived Need → Existing Clients Not Buying More → Not Enough Clients'
    }
  },
  'barriers-expansion': {
    explanation: 'There are concrete obstacles preventing the client from buying more, even if they want to. This could be budget, timing, or past friction that hasn"t been resolved.',
    relatedProblems: ["budget-constraints", "bad-experience-first", "buying-elsewhere"],
    impactAnalysis: {
      financialImpact: 'Capped account revenue; increased pressure to find new leads instead of growing existing ones.',
      severity: "Major",
      affectedAreas: ["LTV", "Sales Velocity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Audit the client"s current vendors to see where you can consolidate", "Offer a "Trial" of the new service at a discount", "Identify the "Internal Blocker" (person) and build a relationship with them"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor client qualification initially", "Operational friction in first project", "Competitive lock-in"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated "Barrier Surveys" to identify why expansion deals are stalling.'
      },
      pathToRoot: 'Barriers to Expansion → Existing Clients Not Buying More → Not Enough Clients'
    }
  },
  'market-too-small': {
    explanation: 'You have picked a niche that is so specific or local that there simply aren"t enough people to hit your revenue targets. You are the 'Big Fish in a Tiny Pond.'',
    relatedProblems: ["niche-narrow", "geographic-limits", "addressable-market"],
    impactAnalysis: {
      financialImpact: 'Hard revenue ceiling; high customer acquisition costs as you exhaust the pool.',
      severity: "Major",
      affectedAreas: ["Scalability", "Business Valuation", "Growth Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months (Strategic pivot)",
      difficulty: "Hard",
      quickWins: ["Expand your "Geographic" target by 50 miles", "Identify one "Adjacent" niche you can serve with the same tech", "Increase prices to compensate for lower volume"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of competition in larger markets", "Lack of market research", "Legacy business models"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a market selection problem.'
      },
      pathToRoot: 'Market Too Small → Cant Find Prospects → Not Getting New Clients'
    }
  },
  'market-competitive': {
    explanation: 'You are in a "Red Ocean.' There are too many providers, prices are being driven down, and you look exactly like everyone else. You are fighting for scraps.',
    relatedProblems: ["race-bottom-price", "differentiation-unclear", "barriers-low"],
    impactAnalysis: {
      financialImpact: 'Margin compression; low conversion rates; high marketing spend for low ROI.',
      severity: "Major",
      affectedAreas: ["Profitability", "Competitive Positioning", "Marketing ROI"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Pick a sub-niche and become the #1 expert there", "Create a "Unique Mechanism" for your delivery", "Add a high-value guarantee that competitors are afraid to offer"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Commoditization", "Lack of innovation", "Following "Best Practices" too closely"],
      automationPotential: {
        rating: "Medium",
        example: 'Competitive intelligence tools to monitor rival pricing and offers in real-time.'
      },
      pathToRoot: 'Market Too Competitive → Cant Find Prospects → Not Getting New Clients'
    }
  },
  'no-word-mouth': {
    explanation: 'Your service is "Fine,' but it's not 'Remarkable.' People don't talk about things that just 'work as expected.' You lack the 'Wow' factor that triggers organic growth.',
    relatedProblems: ["not-talk-worthy", "no-community", "not-memorable"],
    impactAnalysis: {
      financialImpact: '100% reliance on paid/outbound channels; zero "Free" growth.',
      severity: "Moderate",
      affectedAreas: ["Acquisition Cost", "Brand Equity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Add one "Unexpected Bonus" to your onboarding", "Send a physical gift after the first milestone", "Create a "Client-Only' community or event"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Standardized/Boring delivery", "Lack of personality in brand", "Focus on "Tasks" over "Experience'"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated "Gifting" systems (e.g., Sendoso) triggered by project success.'
      },
      pathToRoot: 'No Word of Mouth → Prospects Dont Know → Not Getting New Clients'
    }
  },
  'wrong-channels': {
    explanation: 'You are fishing in the wrong pond. You are spending money on Facebook when your clients are reading trade journals, or on cold email when they prefer LinkedIn.',
    relatedProblems: ["marketing-not-audience", "message-wrong-platforms"],
    impactAnalysis: {
      financialImpact: '100% waste of marketing budget; opportunity cost of missed leads.',
      severity: "Major",
      affectedAreas: ["Marketing ROI", "Lead Quality"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Ask your last 5 leads: "How did you find us?' and 'Where do you look for [Service]?'", "Pause the lowest-performing channel today", "Reallocate 20% of budget to a "Wildcard" channel test"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Following "Marketing Trends" instead of 'Customer Behavior'", "Lack of attribution tracking", "Inertia"],
      automationPotential: {
        rating: "High",
        example: 'Attribution software (e.g., Hyros, Rockerbox) to see exactly where leads come from.'
      },
      pathToRoot: 'Wrong Channels → Prospects Dont Know → Not Getting New Clients'
    }
  },
  'wrong-clients': {
    explanation: 'You are working with people who can"t afford you, don't value you, or have problems you aren't optimized to solve. They are draining your energy and profit.',
    relatedProblems: ["bad-fit-services", "cant-afford-pricing", "high-maintenance-low-profit"],
    impactAnalysis: {
      financialImpact: 'High "Support-to-Revenue' ratio; high churn; team misery.',
      severity: "Major",
      affectedAreas: ["Profitability", "Team Morale", "Brand Alignment"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard (Mindset)',
      quickWins: ["Fire your most "Abusive" or "Unprofitable' client today", "Tighten your "Lead Qualification" form", "Say "No" to any prospect who asks for a discount in the first meeting"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling out of desperation", "Weak marketing filters", "No clear niche"],
      automationPotential: {
        rating: "High",
        example: 'Using automated "Qualification Quizzes" to filter out bad-fit clients before they even talk to you.'
      },
      pathToRoot: 'Wrong Clients → Client Management Issues → Bought Cant Deliver'
    }
  },
  'wrong-timing': {
    explanation: 'You are reaching prospects when they don"t have the problem you solve, or they aren't in a 'Buying Mode.' Without nurturing, you lose these leads forever when you could have been the first choice later.',
    relatedProblems: ["not-nurturing", "no-followup", "one-and-done"],
    impactAnalysis: {
      financialImpact: 'High "Lead Burn" rate; wasted ad spend on top-of-funnel leads that never close.',
      severity: "Moderate",
      affectedAreas: ["Conversion Rate", "Marketing ROI"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Setup an automated "Long-term' nurture email sequence", "Create a retargeting ad audience for website visitors", "Ask: "If not now, when would be a better time to re-evaluate?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Impatience in sales process", "No CRM automation", "Focus on "Right Now" deals only"],
      automationPotential: {
        rating: "High",
        example: 'Automated email nurture flows triggered by lead score or time since last contact.'
      },
      pathToRoot: 'Wrong Timing → Aware But Dont Engage → Not Getting New Clients'
    }
  },
  'no-clear-next-step': {
    explanation: 'Prospects are interested, but they don"t know what to do. Your Call-to-Action (CTA) is either missing, too complicated, or requires too much commitment too early.',
    relatedProblems: ["no-cta", "cta-unclear", "too-much-friction"],
    impactAnalysis: {
      financialImpact: 'Immediate drop-off in sales velocity; high "Bounce Rate" on landing pages.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Sales pipeline"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Add a single, bold button to your homepage", "Use a "Low-Friction' CTA (e.g., "Free 5-min Audit' vs '1-Hour Sales Call')", "Tell them exactly what happens after they click"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Analysis Paralysis", "Lack of design focus", "Fear of being "Too Direct""],
      automationPotential: {
        rating: "High",
        example: 'Using "Sticky" CTAs or chatbots to prompt the next step automatically.'
      },
      pathToRoot: 'No Clear Next Step → Aware But Dont Engage → Not Getting New Clients'
    }
  },
  'content-weak': {
    explanation: 'Your website, ads, or posts look "Amateur" or read "Boring.' In a world of infinite distraction, your creative content isn't sharp enough to stop the scroll and build authority.',
    relatedProblems: ["design-amateur", "copy-boring", "no-hook"],
    impactAnalysis: {
      financialImpact: 'High cost of attention; low engagement rates; perceived as a "Low-Value' vendor.',
      severity: "Major",
      affectedAreas: ["Brand Authority", "Marketing Conversion"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Hire a professional designer for your top 3 assets", "Rewrite your copy focusing on *Outcomes* not *Features*", "Add a "Hook" to the first 3 seconds of every video/post"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["DIY mindset", "Under-investing in creative", "Lack of brand guidelines"],
      automationPotential: {
        rating: "High",
        example: 'Using AI image and video tools to rapidly iterate on creative variations.'
      },
      pathToRoot: 'Weak Content → Aware But Dont Engage → Not Getting New Clients'
    }
  },
  'trust-signals-missing': {
    explanation: 'You are a "Faceless" brand. Prospects can't see who you've worked with, what your results are, or if you're even a real company. They won't engage because the risk of 'First Contact' feels too high.',
    relatedProblems: ["no-social-proof", "no-credentials", "anonymous-brand"],
    impactAnalysis: {
      financialImpact: 'Zero organic trust; high barrier to entry for every new lead.',
      severity: "Major",
      affectedAreas: ["Close Rate", "Brand Equity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Add client logos to your header", "Publish 3 "Customer Success" stories", "Put your face/founder"s story on the "About' page"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Privacy concerns", "Lack of social proof gathering", "Newness in market"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated "Proof" popups showing recent signups or purchases.'
      },
      pathToRoot: 'Missing Trust Signals → Aware But Dont Engage → Not Getting New Clients'
    }
  },
  'dont-trust': {
    explanation: 'The prospect likes the idea, but they don"t believe *you* can deliver it. You lack the 'Proof' required to lower their perceived risk at the point of sale.',
    relatedProblems: ["no-testimonials", "no-track-record", "website-unprofessional"],
    impactAnalysis: {
      financialImpact: 'High drop-off at the final stage of the funnel.',
      severity: "Major",
      affectedAreas: ["Close Rate", "Brand Equity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Get 3 video testimonials from happy clients", "Showcase logos of recognizable brands you"ve worked with", "Publish a detailed "Deep Dive" case study showing your process"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["New business/offer", "Invisible results", "Poor branding"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated testimonial gathering and display widgets (Senja, TrustPulse).'
      },
      pathToRoot: 'Lack of Trust → Engage But Dont Buy → Not Getting New Clients'
    }
  },
  'dont-understand-offer': {
    explanation: 'If you confuse them, you lose them. Your pricing, process, or "What"s Included" is too complex. The prospect can't figure out exactly what they're buying, so they default to 'No.'',
    relatedProblems: ["explanation-complicated", "too-many-options", "pricing-structure-confusing"],
    impactAnalysis: {
      financialImpact: 'High sales friction; deals die in "Review" because they can"t be explained to others.',
      severity: "Major",
      affectedAreas: ["Sales Velocity", "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Create a 1-page "How It Works" infographic", "Simplify to 3 clear pricing tiers", "Use a "Start Here" video to explain the first 30 days"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Expert blindness (using jargon)", "Over-engineering the offer", "Fear of being "Too Simple""],
      automationPotential: {
        rating: "High",
        example: 'Interactive "Offer Builders" that guide the user through their specific needs.'
      },
      pathToRoot: 'Dont Understand Offer → Engage But Dont Buy → Not Getting New Clients'
    }
  },
  'dont-believe-solves': {
    explanation: 'The prospect understands what you do, but they don"t think it will work for *them.* They feel their situation is 'Special' or 'Unique' and your case studies don't bridge that gap.',
    relatedProblems: ["weak-case-studies", "cant-articulate-roi", "situation-different"],
    impactAnalysis: {
      financialImpact: 'Massive sales labor waste; deals stall at "I"ll think about it.'',
      severity: "Major",
      affectedAreas: ["Close Rate", "Market Authority"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Categorize case studies by "Industry" or "Problem Type'", "Add a "Customized ROI Calculator" to your sales process", "Offer a "Mini-Sprint' to prove value first"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Generic sales deck", "Lack of industry-specific proof", "Weak consultative skills"],
      automationPotential: {
        rating: "Medium",
        example: 'AI-powered case study matching that finds the most relevant results for each prospect.'
      },
      pathToRoot: 'Dont Believe It Solves → Engage But Dont Buy → Not Getting New Clients'
    }
  },
  'price-objection': {
    explanation: 'The prospect wants it, but they say they "Can"t Afford It.' This is rarely a budget problem and almost always a 'Value Perceived' vs 'Price' problem.',
    relatedProblems: ["sticker-shock", "cant-see-value", "payment-terms-dont-work"],
    impactAnalysis: {
      financialImpact: 'Constant downward pressure on margins; haggling; "Ghosting" after pricing is revealed.',
      severity: "Major",
      affectedAreas: ["Gross Margin", "Sales Conversion"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Offer payment plans (weekly/monthly)", "Anchoring: Show a much higher price first", "Tie the price directly to the cost of *not* solving the problem"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling features instead of outcomes", "Targeting the wrong segment", "Poor value anchoring"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated "Budget Checkers" that qualify prospects before the call.'
      },
      pathToRoot: 'Price Objection → Engage But Dont Buy → Not Getting New Clients'
    }
  },
  'timing-not-right-sales': {
    explanation: 'The prospect has the problem and likes the solution, but "Now is not the time.' This is usually due to internal bureaucracy, seasonal budgets, or competing priorities.',
    relatedProblems: ["problem-not-urgent", "budget-not-now", "other-priorities"],
    impactAnalysis: {
      financialImpact: 'High "Work-in-Progress' (WIP) in sales pipeline; unpredictable revenue.',
      severity: "Moderate",
      affectedAreas: ["Sales pipeline", "Cash Flow Forecasting"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing (Nurture)",
      difficulty: "Medium",
      quickWins: ["Get a firm "Next Step" date on the calendar now", "Incentivize "Early Signing" with a future start date", "Send a "Value-Add' email every 30 days until they are ready"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["No sense of urgency", "Mismatch with fiscal cycles", "Passive follow-up"],
      automationPotential: {
        rating: "High",
        example: 'CRM automation that alerts you 14 days before their "Budget Cycle" starts.'
      },
      pathToRoot: 'Timing Not Right → Engage But Dont Buy → Not Getting New Clients'
    }
  },
  'competition-beats': {
    explanation: 'You were in the race, but you came in second. The prospect chose a competitor because they moved faster, had a better relationship, or presented a more compelling case.',
    relatedProblems: ["competitor-better-offer", "competitor-moved-faster", "lost-on-price"],
    impactAnalysis: {
      financialImpact: 'High opportunity cost; total loss of marketing/sales spend for that lead.',
      severity: "Major",
      affectedAreas: ["Market Share", "Win Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Hard",
      quickWins: ["Run a "Lost Deal" post-mortem to find out why", "Improve your response time to < 1 hour", "Add one "Exclusive" feature that no competitor has"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Slow sales response", "Weak differentiation", "Passive relationship building"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated "Battle Cards" that provide rebuttals against specific competitors in real-time.'
      },
      pathToRoot: 'Competition Beats Us → Engage But Dont Buy → Not Getting New Clients'
    }
  },
  'risk-too-high': {
    explanation: 'The prospect is afraid of making the "Wrong Choice.' They are worried about looking bad internally, losing money, or the headache of a failed implementation.',
    relatedProblems: ["big-commitment", "fear-wrong-decision", "no-trial-guarantee"],
    impactAnalysis: {
      financialImpact: 'Extreme sales friction; "Paralysis by Analysis" in mid-sized to large companies.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Sales Velocity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Add a "Money-Back Guarantee'", "Offer a "Pilot Program" or 'Discovery Phase'", "Show a "Step-by-Step' onboarding map to reduce fear of change"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of confidence in presentation", "Complex transition process", "High price without safety net"],
      automationPotential: {
        rating: "Medium",
        example: 'Interactive risk assessment tools that address concerns before the final pitch.'
      },
      pathToRoot: 'Risk Too High → Engage But Dont Buy → Not Getting New Clients'
    }
  },
  'risk-too-high': {
    explanation: 'The prospect is afraid of making the "Wrong Choice.' They are worried about looking bad internally, losing money, or the headache of a failed implementation.',
    relatedProblems: ["big-commitment", "fear-wrong-decision", "no-trial-guarantee"],
    impactAnalysis: {
      financialImpact: 'Extreme sales friction; "Paralysis by Analysis" in mid-sized to large companies.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Sales Velocity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Add a "Money-Back Guarantee'", "Offer a "Pilot Program" or 'Discovery Phase'", "Show a "Step-by-Step' onboarding map to reduce fear of change"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of confidence in presentation", "Complex transition process", "High price without safety net"],
      automationPotential: {
        rating: "Medium",
        example: 'Interactive risk assessment tools that address concerns before the final pitch.'
      },
      pathToRoot: 'Risk Too High → Engage But Dont Buy → Not Getting New Clients'
    }
  },
  'cant-delegate': {
    explanation: 'You struggle to let go of tasks, either because you don"t trust others or you don"t know how to document your 'Magic' so others can replicate it. This makes you the ultimate bottleneck.',
    relatedProblems: ["dont-trust-others", "easier-do-myself", "no-one-delegate"],
    impactAnalysis: {
      financialImpact: 'Capped growth; high opportunity cost; founder burnout.',
      severity: "Critical",
      affectedAreas: ["Scalability", "Founder Productivity", "Team Growth"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months (Mindset)",
      difficulty: "Hard",
      quickWins: ["Record a Loom of you doing a task", "Delegate one "Safe to Fail" task this week", "Accept that 80% as good as you is enough to start"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Perfectionism", "Lack of training systems", "Hero complex"],
      automationPotential: {
        rating: "High",
        example: 'Using delegation tracking tools to monitor progress without micromanaging.'
      },
      pathToRoot: 'Cant Delegate → Founder Doing Everything → Not Enough Capacity'
    }
  },
  'no-one-knows-how': {
    explanation: 'You are the only person who knows how to deliver the core value. If you stop working, the business stops. This is a job, not a scalable asset.',
    relatedProblems: ["everything-founders-head", "no-sops", "tribal-knowledge"],
    impactAnalysis: {
      financialImpact: 'Zero business valuation; impossible to scale without your direct labor.',
      severity: "Critical",
      affectedAreas: ["Business Continuity", "Asset Value", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Identify the #1 most repeated task", "Record a screen-share explanation", "Create a "How-to' index in Notion today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Expert blindness", "Lack of documentation culture", "High complexity service"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to transcribe and structure your "Brain Dumps" into usable SOPs.'
      },
      pathToRoot: 'No One Knows How → Founder Doing Everything → Not Enough Capacity'
    }
  },
  'afraid-let-go': {
    explanation: 'The fear that "No one can do it as well as I can.' This perfectionism keeps you trapped in the weeds and prevents your team from ever becoming experts themselves.',
    relatedProblems: ["micromanagement", "dont-trust-others", "perfectionism"],
    impactAnalysis: {
      financialImpact: 'Extreme founder burnout; team demotivation; stagnant revenue.',
      severity: "Critical",
      affectedAreas: ["Team Culture", "Founder Health", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing (Mindset)",
      difficulty: "Mindset",
      quickWins: ["Delegate a task and *don"t check it* for 24 hours", "Set a "Definition of Done" instead of a 'Method of Doing'", "Focus on the result, not the process"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Previous bad experiences", "Anxiety about quality", "Need for control"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a psychological and leadership hurdle.'
      },
      pathToRoot: 'Afraid to Let Go → Founder Doing Everything → Not Enough Capacity'
    }
  },
  'havent-trained': {
    explanation: 'You have people, but you haven"t invested the time to train them. You expect them to 'figure it out,' which leads to mistakes and you jumping back in to fix them.',
    relatedProblems: ["no-training-system", "training-busy-founder", "explain-every-time"],
    impactAnalysis: {
      financialImpact: 'High cost of "Inefficient" payroll; double-work for the founder.',
      severity: "Major",
      affectedAreas: ["Operations", "Gross Margin", "Team ROI"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Block 4 hours a week for "Training Time"", "Assign a "Mentor" from your current best performers", "Create a basic onboarding checklist today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Short-term focus on delivery", "Lack of time", "Underestimating training ROI"],
      automationPotential: {
        rating: "High",
        example: 'Using learning management systems (LMS) to automate the "Knowledge Transfer" phase.'
      },
      pathToRoot: 'Havent Trained → Founder Doing Everything → Not Enough Capacity'
    }
  },
  'doing-sales-delivery-admin': {
    explanation: 'The "Chief of Everything" problem. You are switching between high-level strategy, mid-level sales, and low-level admin all day. Context switching is destroying your productivity.',
    relatedProblems: ["time-trapped", "admin-busywork", "busy-not-revenue"],
    impactAnalysis: {
      financialImpact: 'Massive opportunity cost; strategic drift; low decision quality.',
      severity: "Critical",
      affectedAreas: ["Founder Throughput", "Growth Rate", "Mental Clarity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Batch your tasks (Admin on Monday, Sales on Tuesday)", "Hire a VA for just the admin tasks today", "Delete one non-essential app from your phone"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear roles", "Under-hiring', "Scale exceeding structure"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to automate the "Admin" layer (scheduling, invoicing, data entry).'
      },
      pathToRoot: 'Doing Everything → Founder Doing Everything → Not Enough Capacity'
    }
  },
  'cant-find-qualified': {
    explanation: 'You are looking for "Unicorns" or your job offer isn"t compelling enough to attract the top 5%. You feel like 'there's no good talent out there.'',
    relatedProblems: ["job-market-competitive", "hiring-process-slow"],
    impactAnalysis: {
      financialImpact: 'Missed revenue from unfulfilled orders; high recruitment spend.',
      severity: "Major",
      affectedAreas: ["Capacity", "Growth Velocity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Medium",
      quickWins: ["Rewrite your job description to focus on *their* career growth", "Ask your best employees for referrals", "Use a "Test Task" instead of a long interview"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak employer brand", "Unrealistic expectations", "Poor sourcing channels"],
      automationPotential: {
        rating: "High",
        example: 'AI-powered sourcing tools that find candidates matching your ICP automatically.'
      },
      pathToRoot: 'Cant Find Qualified → Cant Hire Fast → Not Enough Capacity'
    }
  },
  'hiring-process-slow': {
    explanation: 'By the time you offer them a job, the best candidates have already accepted another one. Your process has too many steps or too much internal friction.',
    relatedProblems: ["interview-bottleneck", "not-enough-applicants"],
    impactAnalysis: {
      financialImpact: 'Loss of top talent to competitors; increased team strain during long vacancies.',
      severity: "Moderate",
      affectedAreas: ["Recruitment ROI", "Growth Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Easy",
      quickWins: ["Cut one interview round", "Commit to an "Offer/No-Offer' decision within 24 hours of final call", "Standardize the feedback form for interviewers"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Decision-by-committee", "Fear of making a bad hire", "Lack of urgency"],
      automationPotential: {
        rating: "High",
        example: 'Using Applicant Tracking Systems (ATS) to automate interview scheduling and reminders.'
      },
      pathToRoot: 'Slow Hiring Process → Cant Hire Fast → Not Enough Capacity'
    }
  },
  'interview-bottleneck': {
    explanation: 'One person (usually the founder) has to interview everyone. This delays the process and keeps the founder stuck in "Recruitment" instead of "Growth.'',
    relatedProblems: ["cant-delegate-founder", "hiring-process-slow"],
    impactAnalysis: {
      financialImpact: 'Capped hiring speed; high founder time waste.',
      severity: "Moderate",
      affectedAreas: ["Scalability", "Founder Productivity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Train one team member to do the first "Screening" call", "Use a recorded video interview (e.g., VideoAsk) for the first round", "Only interview the top 3 candidates yourself"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of trust in team judgement", "No standardized scorecard", "Control issues"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to score initial recorded interviews based on specific criteria.'
      },
      pathToRoot: 'Interview Bottleneck → Cant Hire Fast → Not Enough Capacity'
    }
  },
  'interview-bottleneck': {
    explanation: 'One person (usually the founder) has to interview everyone. This delays the process and keeps the founder stuck in "Recruitment" instead of "Growth.'',
    relatedProblems: ["cant-delegate-founder", "hiring-process-slow"],
    impactAnalysis: {
      financialImpact: 'Capped hiring speed; high founder time waste.',
      severity: "Moderate",
      affectedAreas: ["Scalability", "Founder Productivity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Train one team member to do the first "Screening" call", "Use a recorded video interview (e.g., VideoAsk) for the first round", "Only interview the top 3 candidates yourself"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of trust in team judgement", "No standardized scorecard", "Control issues"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to score initial recorded interviews based on specific criteria.'
      },
      pathToRoot: 'Interview Bottleneck → Cant Hire Fast → Not Enough Capacity'
    }
  },
  'not-enough-applicants': {
    explanation: 'You post a job and nobody applies. This is usually because your "Candidate Hook" is weak, you aren't promoting the role, or your reputation in the market is invisible.',
    relatedProblems: ["prospects-dont-know", "cant-find-prospects"],
    impactAnalysis: {
      financialImpact: 'Stagnant growth due to zero capacity; high opportunity cost.',
      severity: "Major",
      affectedAreas: ["Capacity", "Brand Equity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Post on 3 new platforms today", "Boost your LinkedIn job post with a small budget", "Ask your network to share the role"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak job title", "Boring copy", "No distribution strategy"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to optimize job titles and copy for maximum SEO and engagement.'
      },
      pathToRoot: 'Low Applicant Volume → Cant Hire Fast → Not Enough Capacity'
    }
  },
  'job-market-competitive': {
    explanation: 'You are fighting for the same talent as Google or big competitors. If you don"t have a "Unique Talent Proposition' (UTP), you will always lose on salary or perks.',
    relatedProblems: ["market-competitive", "cant-compete-compensation"],
    impactAnalysis: {
      financialImpact: 'High cost of acquisition per employee; constant risk of team poach.',
      severity: "Major",
      affectedAreas: ["Recruitment ROI", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Offer "Remote Work" if competitors don't", "Focus on "Fast-Growth' potential as a benefit", "Highlight your unique culture or mission"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Commoditized workplace", "Lack of differentiation", "Salary wars"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is about your employer brand and offer.'
      },
      pathToRoot: 'Competitive Job Market → Cant Hire Fast → Not Enough Capacity'
    }
  },
  'cant-compete-compensation': {
    explanation: 'You can"t afford the "Market Rate' for top talent. This forces you to hire juniors (slow training) or unreliable contractors, which hurts your quality.',
    relatedProblems: ["cant-afford-hire", "margins-low"],
    impactAnalysis: {
      financialImpact: 'Lower quality output; slow training ROI; high churn risk.',
      severity: "Major",
      affectedAreas: ["Quality Control", "Gross Margin", "Capacity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months (Margin fix)",
      difficulty: "Hard",
      quickWins: ["Offer "Performance-Based' bonuses instead of high base", "Incentivize with "Equity" or "Profit-Sharing'", "Hire from lower-cost regions for non-critical roles"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Low service prices", "Thin margins", "Business model issues"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a business model and margin problem.'
      },
      pathToRoot: 'Low Compensation → Cant Hire Fast → Not Enough Capacity'
    }
  },
  'no-cash-payroll': {
    explanation: 'You want to hire, but you don"t have the cash in the bank to guarantee the first 3 months of salary. You are living month-to-month, which makes hiring feel too risky.',
    relatedProblems: ["cash-flow-gaps", "no-buffer"],
    impactAnalysis: {
      financialImpact: 'Growth stagnation; extreme founder stress; inability to build a team.',
      severity: "Critical",
      affectedAreas: ["Scalability", "Financial Stability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months",
      difficulty: "Medium",
      quickWins: ["Save 10% of every invoice into a "Payroll Reserve"", "Get a Line of Credit today (while you don"t need it)", "Shift to upfront payments to build a cash floor"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor cash management", "Lumpy revenue", "No reserves"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Cash Reserve" transfers from your main business account.'
      },
      pathToRoot: 'No Cash for Payroll → Cant Afford to Hire → Not Enough Capacity'
    }
  },
  'margins-thin-staff': {
    explanation: 'Your profit margins are so low that adding one more employee makes you unprofitable. You are trapped in a low-value business model that doesn"t scale.',
    relatedProblems: ["margins-low", "prices-low"],
    impactAnalysis: {
      financialImpact: 'Negative ROI on labor; "Scaling" leads to "Bankruptcy.'',
      severity: "Critical",
      affectedAreas: ["Profitability", "Business Model", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Raise your prices by 20% immediately", "Automate 50% of the role before you hire for it", "Fire your lowest-margin clients to make room"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Trading time for money", "Commoditized service", "Inefficient fulfillment"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to double the productivity of existing staff instead of hiring new ones.'
      },
      pathToRoot: 'Thin Margins → Cant Afford to Hire → Not Enough Capacity'
    }
  },
  'revenue-uncertain': {
    explanation: 'You have the money today, but you don"t know if you"ll have it tomorrow. Without predictable revenue, hiring feels like a 'Gamble' that could lead to layoffs.',
    relatedProblems: ["lumpy-revenue", "no-recurring-revenue"],
    impactAnalysis: {
      financialImpact: 'Hesitant growth; team instability; high cost of replacement hires.',
      severity: "Major",
      affectedAreas: ["Strategic Planning", "Team Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "4-8 months",
      difficulty: "Hard",
      quickWins: ["Convert one project into a retainer", "Setup a "Sales Pipeline" to track future deals", "Introduce 12-month contracts with monthly billing"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["One-off project focus", "Passive sales activity", "Lack of recurring offer"],
      automationPotential: {
        rating: "High",
        example: 'Automated subscription billing and renewal alerts.'
      },
      pathToRoot: 'Uncertain Revenue → Cant Afford to Hire → Not Enough Capacity'
    }
  },
  'already-stretched': {
    explanation: 'You are already at your financial limit. Every dollar is allocated, and there is no room for the "Growth Spurt" required to hire someone who will eventually make you more money.',
    relatedProblems: ["expenses-high", "no-buffer"],
    impactAnalysis: {
      financialImpact: 'Zero investment capacity; constant "Firefighting" for cash.',
      severity: "Critical",
      affectedAreas: ["Investment Power", "Growth Rate", "Founder Health"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Audit and cut the bottom 10% of expenses today", "Freeze all non-revenue spending", "Run a "Flash Sale" to generate a quick cash injection"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-spending on non-essentials", "Lack of budget controls", "Slow AR"],
      automationPotential: {
        rating: "High",
        example: 'Automated expense tracking and "Burn Rate" alerts.'
      },
      pathToRoot: 'Already Stretched → Cant Afford to Hire → Not Enough Capacity'
    }
  },
  'afraid-commitment': {
    explanation: 'The "Fear of Payroll.' You are worried about the responsibility of another human's livelihood. This psychological block keeps you small and overworked.',
    relatedProblems: ["mindset-blocks", "fear-failure"],
    impactAnalysis: {
      financialImpact: 'Capped revenue; high opportunity cost of your time.',
      severity: "Moderate",
      affectedAreas: ["Scalability", "Founder Health"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month (Mindset)",
      difficulty: "Mindset",
      quickWins: ["Start with a "Freelancer" on a project basis", "Hire for a "3-Month Trial' only", "Calculate the ROI of your time if you offloaded 10 hours/week"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Previous layoff experience", "Anxiety about the future", "Perfectionism"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a leadership mindset shift.'
      },
      pathToRoot: 'Fear of Commitment → Cant Afford to Hire → Not Enough Capacity'
    }
  },
  'no-training-system': {
    explanation: 'You hire people and then "Throw them in the deep end.' Without a system, they take twice as long to learn, make expensive mistakes, and eventually quit from frustration.',
    relatedProblems: ["training-long", "no-sops"],
    impactAnalysis: {
      financialImpact: 'Massive waste of payroll; high turnover costs; inconsistent quality.',
      severity: "Major",
      affectedAreas: ["Operations", "Team ROI", "Gross Margin"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 months",
      difficulty: "Medium",
      quickWins: ["Create a "Start Here" doc for new hires today", "Assign a "Shadow" project for the first 3 days", "Use a "New Hire Checklist" for the basics"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder too busy to document", "Undervaluing onboarding", "Implicit knowledge focus"],
      automationPotential: {
        rating: "High",
        example: 'Using automated training sequences (e.g., Trainual) that track completion.'
      },
      pathToRoot: 'No Training System → Training Takes Too Long → Not Enough Capacity'
    }
  },
  'no-training-system': {
    explanation: 'You hire people and then "Throw them in the deep end.' Without a system, they take twice as long to learn, make expensive mistakes, and eventually quit from frustration.',
    relatedProblems: ["training-long", "no-sops"],
    impactAnalysis: {
      financialImpact: 'Massive waste of payroll; high turnover costs; inconsistent quality.',
      severity: "Major",
      affectedAreas: ["Operations", "Team ROI", "Gross Margin"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 months",
      difficulty: "Medium",
      quickWins: ["Create a "Start Here" doc for new hires today", "Assign a "Shadow" project for the first 3 days", "Use a "New Hire Checklist" for the basics"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder too busy to document", "Undervaluing onboarding", "Implicit knowledge focus"],
      automationPotential: {
        rating: "High",
        example: 'Using automated training sequences (e.g., Trainual) that track completion.'
      },
      pathToRoot: 'No Training System → Training Takes Too Long → Not Enough Capacity'
    }
  },
  'service-complex': {
    explanation: 'Your core offer is too difficult for an average person to deliver. If it takes 5 years of experience to do what you do, you will never scale fast because the talent pool is too small.',
    relatedProblems: ["product-market-mismatch", "no-one-knows-how"],
    impactAnalysis: {
      financialImpact: 'High salary costs; slow growth; founder remains the "Magic.'',
      severity: "Major",
      affectedAreas: ["Scalability", "Gross Margin", "Training ROI"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6 months (Simplification)",
      difficulty: "Hard",
      quickWins: ["Productize one "Simple" version of your service", "Create a "Decision Tree" for your complex tasks", "Use software to handle the most difficult logic"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder ego/perfectionism", "Bespoke offer", "Lack of productization"],
      automationPotential: {
        rating: "High",
        example: 'Building an expert system (AI or logic-based) that handles 80% of the complex decision-making.'
      },
      pathToRoot: 'Service Too Complex → Training Takes Too Long → Not Enough Capacity'
    }
  },
  'turnover-before-trained': {
    explanation: 'People quit before they become profitable. You are paying for the "Learning Phase" but never reaping the 'Productive Phase.' Your onboarding is likely demoralizing or too slow.',
    relatedProblems: ["no-training-system", "team-unreliable"],
    impactAnalysis: {
      financialImpact: 'Constant drain on cash; high recruitment cost loop; zero momentum.',
      severity: "Critical",
      affectedAreas: ["Cash Flow", "Team Morale", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Medium",
      quickWins: ["Implement "Early Wins" in the first 7 days", "Survey departing employees honestly", "Improve the "Culture Fit" during the interview stage"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Bad onboarding experience", "Role mismatch", "Lack of early feedback"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated "New Hire Satisfaction" check-ins at day 7, 30, and 90.'
      },
      pathToRoot: 'High Early Turnover → Training Takes Too Long → Not Enough Capacity'
    }
  },
  'training-busy-founder': {
    explanation: 'The founder is the only one who can train. This means every new hire *costs* you time before they make you money. You become the bottleneck for your own expansion.',
    relatedProblems: ["interview-bottleneck", "cant-delegate-founder"],
    impactAnalysis: {
      financialImpact: 'Negative ROI on hiring in the short term; extreme founder stress.',
      severity: "Major",
      affectedAreas: ["Founder Throughput", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 months",
      difficulty: "Medium",
      quickWins: ["Record your next training session and make it the "Standard"", "Promote a "Lead" to handle training", "Use Loom for async training today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of SOPs", "Hero complex", "Fear of delegating authority"],
      automationPotential: {
        rating: "High",
        example: 'Creating a video-based training library that new hires can consume independently.'
      },
      pathToRoot: 'Founder Bottlenecked Training → Training Takes Too Long → Not Enough Capacity'
    }
  },
  'learning-curve-steep': {
    explanation: 'It takes too long to get up to speed. This isn"t just about the service being complex; it's about the tools, culture, and processes being poorly defined.',
    relatedProblems: ["no-training-system", "tools-inadequate"],
    impactAnalysis: {
      financialImpact: 'High cost of "Unproductive" payroll; low gross margin on new team members.',
      severity: "Moderate",
      affectedAreas: ["Team Efficiency", "Scalability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Medium",
      quickWins: ["Simplify the toolstack for new hires", "Create a "Quick Reference" guide for the top 10 questions", "Use "Project Templates" to reduce decision making"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-complex internal tools", "Lack of clear documentation", "Implicit expectations"],
      automationPotential: {
        rating: "High",
        example: 'AI chatbots that answer "How do I do X?' for new employees in Slack/Teams.'
      },
      pathToRoot: 'Steep Learning Curve → Training Takes Too Long → Not Enough Capacity'
    }
  },
  'people-quit': {
    explanation: 'High employee churn. You are a "Revolving Door.' This destroys team culture, drains your cash, and keeps you stuck in 'Recruitment Mode.'',
    relatedProblems: ["team-unreliable", "bad-fit-services"],
    impactAnalysis: {
      financialImpact: 'Extreme loss of institutional knowledge; high recruitment/onboarding costs.',
      severity: "Critical",
      affectedAreas: ["Team Morale", "Operations", "Revenue Stability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6 months (Culture shift)",
      difficulty: "Hard",
      quickWins: ["Hold "Stay Interviews" with your best people today", "Audit your compensation against market rates", "Identify and fix the #1 cause of frustration mentioned in exit interviews"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Toxic culture", "Low pay", "Poor management", "No career path"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a leadership and culture issue.'
      },
      pathToRoot: 'High Turnover → Team Unreliable → Not Enough Capacity'
    }
  },
  'people-underperform': {
    explanation: 'They are here, but they aren"t working at the level required. This results in slow delivery, quality errors, and more work for the manager/founder.',
    relatedProblems: ["team-unreliable", "motivation-low"],
    impactAnalysis: {
      financialImpact: 'Hidden labor waste; high cost of rework; client dissatisfaction.',
      severity: "Major",
      affectedAreas: ["Gross Margin", "Service Quality", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Set clear "Performance KPIs" this week", "Implement a weekly "Scorecard"", "Hold a "Standard-Setting' meeting with the whole team"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of accountability", "Unclear expectations", "Bad hiring"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated performance tracking dashboards that show individual results.'
      },
      pathToRoot: 'Underperformance → Team Unreliable → Not Enough Capacity'
    }
  },
  'attendance-issues': {
    explanation: 'Reliability is low. People calling in sick, showing up late, or being unavailable during work hours. This creates chaos in delivery schedules.',
    relatedProblems: ["team-unreliable", "motivation-low"],
    impactAnalysis: {
      financialImpact: 'Missed deadlines; high stress for reliable team members; unbilled time.',
      severity: "Moderate",
      affectedAreas: ["Operations", "Team Culture", "Client Trust"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Create a formal "Attendance Policy"", "Use a shared calendar for all time-off", "Address the first instance of unreliability immediately"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Low engagement", "Personal issues", "Lack of work ethic"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Check-in' tools or shared team schedules that flag absence instantly.'
      },
      pathToRoot: 'Attendance Issues → Team Unreliable → Not Enough Capacity'
    }
  },
  'skill-mismatches': {
    explanation: 'You hired a great person, but for the wrong seat. They are struggling because the role doesn"t play to their strengths, leading to frustration and poor results.',
    relatedProblems: ["hiring-process-slow", "people-underperform"],
    impactAnalysis: {
      financialImpact: 'Inefficient payroll; high opportunity cost; wasted talent.',
      severity: "Moderate",
      affectedAreas: ["Team Morale", "Efficiency", "Quality"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Run a "Skills Audit" for the team", "Move one person to a role that fits them better", "Redefine the job description for future hires"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Panic hiring", "Lack of role clarity", "Weak assessment during interviews"],
      automationPotential: {
        rating: "Medium",
        example: 'Using automated skills assessment tools (e.g., TestGorilla) before hiring.'
      },
      pathToRoot: 'Skill Mismatch → Team Unreliable → Not Enough Capacity'
    }
  },
  'motivation-low': {
    explanation: 'The team is "Quiet Quitting.' They do the bare minimum to not get fired. There is no drive, no innovation, and no ownership of results.',
    relatedProblems: ["people-underperform", "people-quit"],
    impactAnalysis: {
      financialImpact: 'Low throughput; high risk of mistakes; zero organic growth.',
      severity: "Major",
      affectedAreas: ["Team Culture", "Productivity", "Innovation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard (Mindset)',
      quickWins: ["Implement a "Win of the Week" recognition", "Connect the team"s daily work to a larger goal", "Ask: "What"s one thing preventing you from doing your best work?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Micromanagement", "Unfair compensation", "Boring work", "Poor leadership"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - motivation requires human leadership and connection.'
      },
      pathToRoot: 'Low Motivation → Team Unreliable → Not Enough Capacity'
    }
  },
  'motivation-low': {
    explanation: 'The team is "Quiet Quitting.' They do the bare minimum to not get fired. There is no drive, no innovation, and no ownership of results.',
    relatedProblems: ["people-underperform", "people-quit"],
    impactAnalysis: {
      financialImpact: 'Low throughput; high risk of mistakes; zero organic growth.',
      severity: "Major",
      affectedAreas: ["Team Culture", "Productivity", "Innovation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard (Mindset)',
      quickWins: ["Implement a "Win of the Week" recognition", "Connect the team"s daily work to a larger goal", "Ask: "What"s one thing preventing you from doing your best work?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Micromanagement", "Unfair compensation", "Boring work", "Poor leadership"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - motivation requires human leadership and connection.'
      },
      pathToRoot: 'Low Motivation → Team Unreliable → Not Enough Capacity'
    }
  },
  'management-issues': {
    explanation: 'You have people, but they aren"t being led effectively. There is no clarity on goals, no feedback loops, and no accountability. The team is busy but not efficient.',
    relatedProblems: ["communication-breakdowns-pm", "people-underperform"],
    impactAnalysis: {
      financialImpact: 'Inefficient payroll; high turnover; strategic misalignment.',
      severity: "Major",
      affectedAreas: ["Operations", "Team Performance", "Founder Health"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Medium",
      quickWins: ["Schedule recurring 1-on-1s today", "Define 3 "Priority Objectives" for the month", "Implement a simple status reporting tool"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder as a technician not a leader", "Lack of management training", "Poor communication structure"],
      automationPotential: {
        rating: "Medium",
        example: 'Using management software (e.g., Lattice, 15Five) to structure feedback and goal tracking.'
      },
      pathToRoot: 'Management Failure → Team Unreliable → Not Enough Capacity'
    }
  },
  'physical-limitations': {
    explanation: 'Your growth is stopped by the walls of your office, the number of machines you have, or the speed of your equipment. You physically cannot produce more without capital investment.',
    relatedProblems: ["equipment-costs", "geographic-constraints"],
    impactAnalysis: {
      financialImpact: 'Hard revenue ceiling; high fixed costs if you expand.',
      severity: "Moderate",
      affectedAreas: ["Scalability", "Operations", "Asset Management"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Implement "Shift Work" to use equipment 24/7", "Outsource the "Overflow" production", "Audit your space for layout inefficiencies"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of facility planning", "Under-investment in assets', "Bespoke manufacturing needs"],
      automationPotential: {
        rating: "Medium",
        example: 'Using IoT and predictive maintenance to maximize the uptime of physical assets.'
      },
      pathToRoot: 'Physical Limits → Scaling Constraints → Not Enough Capacity'
    }
  },
  'can-only-serve-x': {
    explanation: 'Your business has a built-in "Cap" on how many clients you can handle at once. Whether it's seats in a room or hours in a day, your model is fundamentally non-scalable.',
    relatedProblems: ["time-trapped", "service-complex"],
    impactAnalysis: {
      financialImpact: 'Revenue is linear to time/space; zero exponential growth potential.',
      severity: "Major",
      affectedAreas: ["Scalability", "Business Model", "LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6 months (Pivot)",
      difficulty: "Hard",
      quickWins: ["Raise prices to maximize revenue per slot", "Introduce "Group" or "Digital' versions of the service", "Create a waitlist to build buying heat"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Trading time for money", "Bespoke delivery model", "Lack of productization"],
      automationPotential: {
        rating: "High",
        example: 'Automating the delivery of core value through software or recorded content (Productization).'
      },
      pathToRoot: 'Capacity Cap → Scaling Constraints → Not Enough Capacity'
    }
  },
  'geographic-constraints': {
    explanation: 'You can only serve people in a specific town or region. If that local market is small or saturated, your business has no room to grow.',
    relatedProblems: ["market-too-small", "physical-limitations"],
    impactAnalysis: {
      financialImpact: 'Hard revenue ceiling; vulnerability to local economic shifts.',
      severity: "Moderate",
      affectedAreas: ["Growth Rate", "Market Reach", "Sustainability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "6-18 months",
      difficulty: "Hard",
      quickWins: ["Launch a "Remote" version of your offer", "Partner with vendors in other regions", "Start an online presence today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Brick-and-mortar mindset", "Lack of digital infrastructure", "Local-only focus"],
      automationPotential: {
        rating: "High",
        example: 'Using digital marketing and remote delivery tools to expand beyond local borders.'
      },
      pathToRoot: 'Geo-Locked → Scaling Constraints → Not Enough Capacity'
    }
  },
  'licensing-limits': {
    explanation: 'Regulatory or professional requirements limit who can do the work. If only "Licensed [X]' can deliver, your hiring is restricted by the speed of government or professional boards.',
    relatedProblems: ["cant-find-qualified", "licensing-compliance"],
    impactAnalysis: {
      financialImpact: 'Extreme hiring friction; high cost of specialized labor.',
      severity: "Major",
      affectedAreas: ["Capacity", "Scalability", "Legal Risk"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Standardize everything the "Licensed" person *doesn't* have to do", "Hire "Assistants" to offload the non-regulated parts of the work", "Create a "Licensing Path" for current employees"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Regulated industry", "Narrow professional standards", "Lack of role unbundling"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to handle 80% of the research or prep work, leaving only the final "Sign-off' for the licensed expert.'
      },
      pathToRoot: 'Licensing Bottleneck → Scaling Constraints → Not Enough Capacity'
    }
  },
  'technology-cant-handle': {
    explanation: 'Your website is crashing, your database is slow, or your current software is bugging out under the load. Your digital foundation is crumbling as you scale.',
    relatedProblems: ["tools-inadequate", "duplicate-systems"],
    impactAnalysis: {
      financialImpact: 'Immediate revenue loss (downtime); churn risk; high rework/bug-fix costs.',
      severity: "Critical",
      affectedAreas: ["Operations", "Client Trust", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Hard",
      quickWins: ["Audit your top 3 tech bottlenecks today", "Upgrade your hosting/infrastructure immediately", "Stop all new feature development and fix the "Core""],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical debt", "Cheap initial tools", "Scale exceeding architecture"],
      automationPotential: {
        rating: "High",
        example: 'Using cloud-native, auto-scaling infrastructure (Vercel, AWS) to handle spikes automatically.'
      },
      pathToRoot: 'Tech Failure → Scaling Constraints → Not Enough Capacity'
    }
  },
  'everything-by-hand': {
    explanation: 'You are doing manual work that software could do in seconds. This is a massive drain on human energy and increases the risk of "Human Error.'',
    relatedProblems: ["manual-data-entry", "no-automation", "repetitive-tasks"],
    impactAnalysis: {
      financialImpact: 'High "Labor-to-Value' ratio; zero scalability; high error costs.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Gross Margin", "Team Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Identify the one task you do > 5x a day", "Map the steps of that task today", "Solve it with a simple Zapier/Make flow"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of technical awareness", "Rushing to deliver", "Legacy habits"],
      automationPotential: {
        rating: "High",
        example: 'Using robotic process automation (RPA) or API integrations to remove human touchpoints.'
      },
      pathToRoot: 'Manual Work → Manual Processes → Process Bottlenecks'
    }
  },
  'no-automation': {
    explanation: 'Your business has zero "Robots" working for it. Everything relies on human attention, meaning your costs scale linearly with your revenue. You have no 'Operating Leverage.'',
    relatedProblems: ["everything-by-hand", "manual-data-entry"],
    impactAnalysis: {
      financialImpact: 'Stagnant margins; inability to scale without constant hiring; slow response times.',
      severity: "Major",
      affectedAreas: ["Scalability", "Gross Margin", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Medium",
      quickWins: ["Automate your invoicing today", "Setup an automated "Welcome" sequence for new leads", "Sync your CRM and Email marketing tools"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of tech", "Lack of time to build", "Siloed tools"],
      automationPotential: {
        rating: "High",
        example: 'Building a central "Automation Hub" (Make.com) that connects all your business functions.'
      },
      pathToRoot: 'No Automation → Manual Processes → Process Bottlenecks'
    }
  },
  'repetitive-tasks': {
    explanation: 'You are wasting your team"s brains on tasks that require zero thinking. This leads to burnout and high error rates, while preventing them from doing 'High-Value' work.',
    relatedProblems: ["low-value-work", "everything-by-hand"],
    impactAnalysis: {
      financialImpact: 'High labor waste; low employee retention; opportunity cost of strategic work.',
      severity: "Moderate",
      affectedAreas: ["Efficiency", "Team Engagement", "Operations"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Easy",
      quickWins: ["Run a "Time Audit" for the team this week", "Identify the "Top 3 Repetitive Tasks'", "Record a Loom of the task and look for automation opportunities"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of process mapping", "Inertia", "Undervaluing employee time"],
      automationPotential: {
        rating: "High",
        example: 'Using AI agents to handle the "Routine" part of the work (sorting, tagging, pre-filling).'
      },
      pathToRoot: 'Repetition → Manual Processes → Process Bottlenecks'
    }
  },
  'data-entry-overwhelming': {
    explanation: 'You spend more time "Typing" about the work than "Doing' the work. Your team is bogged down in reporting and status updates, slowing down delivery.',
    relatedProblems: ["manual-data-entry", "copy-paste-hell"],
    impactAnalysis: {
      financialImpact: 'High cost of "Hidden" admin; slow data-to-decision speed; error-prone data.',
      severity: "Moderate",
      affectedAreas: ["Admin Efficiency", "Decision Quality", "Speed"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Use "Import" tools instead of manual entry", "Connect your forms directly to your CRM", "Stop tracking data that nobody uses for decisions"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fragmented toolstack", "Lack of single source of truth", "Over-reporting"],
      automationPotential: {
        rating: "High",
        example: 'Using "Webhooks" to move data between apps instantly without human intervention.'
      },
      pathToRoot: 'Admin Overload → Manual Processes → Process Bottlenecks'
    }
  },
  'copy-paste-hell': {
    explanation: 'Moving information from an email to a CRM, or from a CRM to an invoice. This is a sign of "Tool Isolation" and is the easiest problem to solve with modern software.',
    relatedProblems: ["manual-data-entry", "everything-by-hand"],
    impactAnalysis: {
      financialImpact: 'Waste of human labor; high risk of data mismatches; frustrated employees.',
      severity: "Moderate",
      affectedAreas: ["Efficiency", "Data Integrity", "Team Morale"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Install a "One-Click' integration today", "Use Zapier to connect your top 2 tools", "Setup a shared database instead of individual spreadsheets"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Disconnected systems", "Lack of API knowledge", "Short-term thinking"],
      automationPotential: {
        rating: "High",
        example: 'Using tools like Syncari or Tray.io to keep data perfectly synced across all platforms.'
      },
      pathToRoot: 'Copy-Paste → Manual Processes → Process Bottlenecks'
    }
  },
  'tribal-knowledge': {
    explanation: 'Information lives in people"s heads, not in a system. When someone goes on vacation (or quits), the business stops or makes massive mistakes.',
    relatedProblems: ["everything-founders-head", "no-sops"],
    impactAnalysis: {
      financialImpact: 'High risk of operational collapse; zero business value; high training costs.',
      severity: "Critical",
      affectedAreas: ["Business Continuity", "Asset Value", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Record one "Knowledge Transfer" call per day", "Setup a central wiki (Notion/Slite) today", "Incentivize documentation in the team"s KPIs"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of documentation habit", "Hero complex", "Fast growth over-running systems"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to document SOPs by "Listening" to team meetings and extracting processes.'
      },
      pathToRoot: 'Knowledge Isolation → No Systems → Process Bottlenecks'
    }
  },
  'every-project-reinvented': {
    explanation: 'You treat every new client like a "Special Case.' You have no templates, no standard steps, and no 'Productized' delivery. You are building a new business for every project.',
    relatedProblems: ["not-standardized", "service-complex"],
    impactAnalysis: {
      financialImpact: 'Zero operational leverage; inconsistent margins; constant "First-Time' errors.',
      severity: "Major",
      affectedAreas: ["Profitability", "Efficiency", "Quality Control"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Create a "Standard Project Template" today", "Pick the #1 most recurring project type and map it", "Stop accepting "Bespoke" requests for 30 days"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of being "Generic", "Lack of productization", "People-pleasing founder"],
      automationPotential: {
        rating: "High",
        example: 'Using Project Management templates that auto-populate tasks and deadlines for every new deal.'
      },
      pathToRoot: 'Reinventing Wheel → No Systems → Process Bottlenecks'
    }
  },
  'cant-scale-without-founder': {
    explanation: 'The "Founder Trap.' You are involved in every handoff, every decision, and every quality check. You aren't building a business; you're building a cage for yourself.',
    relatedProblems: ["founder-everything", "cant-delegate-founder"],
    impactAnalysis: {
      financialImpact: 'Growth is capped by your personal hours; zero exit value.',
      severity: "Critical",
      affectedAreas: ["Scalability", "Founder Health", "Business Valuation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Identify one "Decision" you make daily and delegate it", "Create a "Rules of Engagement" doc so the team can decide without you", "Take a 2-day "No-Email' test"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Hero complex", "Lack of trust in systems", "Undefined authority levels"],
      automationPotential: {
        rating: "High",
        example: 'Using AI-powered decision support to guide the team through your "Logic" without needing you.'
      },
      pathToRoot: 'Founder Reliance → No Systems → Process Bottlenecks'
    }
  },
  'no-sops': {
    explanation: 'You have no Standard Operating Procedures. Your team is guessing how to do things, leading to inconsistent quality and constant questions for the manager.',
    relatedProblems: ["tribal-knowledge", "inconsistent-methods"],
    impactAnalysis: {
      financialImpact: 'High cost of management; inconsistent results; slow training ROI.',
      severity: "Major",
      affectedAreas: ["Operations", "Quality Control", "Team Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Medium",
      quickWins: ["Record a video of every task you do today", "Use a "Template" for SOPs to make them easy to write", "Hire a VA to transcribe your videos into docs"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Undervaluing systems", "Lack of time", "Expert blindness"],
      automationPotential: {
        rating: "High",
        example: 'Using AI tools (e.g., Scribe, Guidde) to automatically generate SOPs from screen recordings.'
      },
      pathToRoot: 'Missing SOPs → No Systems → Process Bottlenecks'
    }
  },
  'inconsistent-methods': {
    explanation: 'Three different people do the same task in three different ways. This makes it impossible to measure efficiency or guarantee quality. You have chaos, not a process.',
    relatedProblems: ["no-sops", "different-results"],
    impactAnalysis: {
      financialImpact: 'Unpredictable margins; varied client experience; high rework rates.',
      severity: "Major",
      affectedAreas: ["Quality Control", "Operations", "Predictability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 months",
      difficulty: "Medium",
      quickWins: ["Pick the "Best" method today and make it the "Only' method", "Run a "Process Alignment" meeting with the team", "Add a checklist to the PM tool for this task"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of standardization", "Individual silos", "Passive management"],
      automationPotential: {
        rating: "High",
        example: 'Using automated workflows that enforce a "Sequence of Events" so variations aren't possible.'
      },
      pathToRoot: 'Inconsistency → No Systems → Process Bottlenecks'
    }
  },
  'only-one-knows': {
    explanation: 'A specific part of the business relies on one person"s knowledge. If they are out, that part of the business freezes. This is a massive 'Single Point of Failure.'',
    relatedProblems: ["single-point-failure", "bus-factor"],
    impactAnalysis: {
      financialImpact: 'High risk of total operational halt; high leverage for that employee (risk of "Ransom").',
      severity: "Critical",
      affectedAreas: ["Business Continuity", "Accountability", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Schedule a "Knowledge Share" call this week", "Identify a "Backup" person for that role today", "Mandate that the expert documents their top 3 tasks"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Knowledge hoarding", "Narrow hiring", "Lack of cross-training"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to "Extract" the expert"s knowledge into a searchable database for the whole team.'
      },
      pathToRoot: 'Knowledge Silo → Dependency on Key People → Process Bottlenecks'
    }
  },
  'bottleneck-unavailable': {
    explanation: 'Your project is ready to move, but the person who needs to approve it or do the next step is busy, on vacation, or in meetings. The project stalls and cash flow slows.',
    relatedProblems: ["status-unclear", "work-stuck"],
    impactAnalysis: {
      financialImpact: 'Delayed billing; project stagnation; team idle time costs.',
      severity: "Major",
      affectedAreas: ["Operations", "Cash Flow", "Team Throughput"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Identify the "Approval" bottlenecks today", "Lower the "Authority" level required for minor approvals", "Set an "Auto-Approve' rule if no feedback within 24 hours"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Centralized authority", "Over-complex hierarchy', "Poor resource planning"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Approval Triage" that sends tasks to the first available manager or auto-approves based on rules.'
      },
      pathToRoot: 'Approval Stalls → Dependency on Key People → Process Bottlenecks'
    }
  },
  'single-point-failure': {
    explanation: 'Any part of your business that would cause total failure if one thing (person, tool, vendor) stopped working. You have zero redundancy.',
    relatedProblems: ["bus-factor", "only-one-knows"],
    impactAnalysis: {
      financialImpact: 'Risk of 100% revenue loss; extreme business fragility.',
      severity: "Critical",
      affectedAreas: ["Business Continuity", "Risk Management", "Security"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Identify your top 3 "Critical Path" items today", "Setup a "Backup" vendor for your most important tool", "Start cross-training a backup for your key person"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lean operations taken too far", "Lack of risk planning", "Under-investment in redundancy"],
      automationPotential: {
        rating: "Medium",
        example: 'Using failover systems and redundant cloud services to remove tech failures.'
      },
      pathToRoot: 'Systemic Fragility → Dependency on Key People → Process Bottlenecks'
    }
  },
  'bus-factor': {
    explanation: 'The "Bus Factor" is the number of people who, if hit by a bus tomorrow, would cause the business to fail. For most small businesses, the bus factor is 1.',
    relatedProblems: ["single-point-failure", "everything-founders-head"],
    impactAnalysis: {
      financialImpact: 'Total loss of business value; high anxiety for the founder.',
      severity: "Critical",
      affectedAreas: ["Asset Value", "Business Continuity", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Write your "Emergency Continuity" plan today", "Delegate the #1 most critical daily task", "Store all passwords in a shared Vault (e.g., 1Password)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder-centric model", "Lack of documentation", "Under-hiring leadership"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to map the business"s "Critical Paths' and identifying where human redundancy is needed.'
      },
      pathToRoot: 'Low Bus Factor → Dependency on Key People → Process Bottlenecks'
    }
  },
  'knowledge-hoarding': {
    explanation: 'A team member intentionally (or unintentionally) keeps information to themselves to maintain "Job Security" or power. This creates a toxic culture and stalls the business.',
    relatedProblems: ["tribal-knowledge", "only-one-knows"],
    impactAnalysis: {
      financialImpact: 'High cost of management; culture of fear; stagnant innovation.',
      severity: "Major",
      affectedAreas: ["Team Culture", "Operations", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months (Culture)",
      difficulty: "Hard",
      quickWins: ["Change KPIs to reward "Sharing" instead of "Doing'", "Implement a peer-to-peer training session weekly", "Address the hoarding behavior directly in 1-on-1s"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Insecure employees", "Toxic internal competition", "Lack of transparent culture"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a psychological and cultural issue.'
      },
      pathToRoot: 'Information Hoarding → Dependency on Key People → Process Bottlenecks'
    }
  },
  'knowledge-hoarding': {
    explanation: 'A team member intentionally (or unintentionally) keeps information to themselves to maintain "Job Security" or power. This creates a toxic culture and stalls the business.',
    relatedProblems: ["tribal-knowledge", "only-one-knows"],
    impactAnalysis: {
      financialImpact: 'High cost of management; culture of fear; stagnant innovation.',
      severity: "Major",
      affectedAreas: ["Team Culture", "Operations", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months (Culture)",
      difficulty: "Hard",
      quickWins: ["Change KPIs to reward "Sharing" instead of "Doing'", "Implement a peer-to-peer training session weekly", "Address the hoarding behavior directly in 1-on-1s"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Insecure employees", "Toxic internal competition", "Lack of transparent culture"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a psychological and cultural issue.'
      },
      pathToRoot: 'Information Hoarding → Dependency on Key People → Process Bottlenecks'
    }
  },
  'wrong-software': {
    explanation: 'You are using tools that aren"t designed for your specific business size or industry. This creates friction, missing features, and forces your team into 'Workarounds' instead of work.',
    relatedProblems: ["tools-inadequate", "systems-dont-integrate"],
    impactAnalysis: {
      financialImpact: 'Waste of subscription costs; hidden labor waste from workarounds.',
      severity: "Moderate",
      affectedAreas: ["Operations", "Team Efficiency", "Scalability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Audit your top 3 most used apps today", "Ask the team: "What tool makes your life hardest?'", "Trial one industry-standard alternative this week"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Starting with "Free" tools and never upgrading", "Lack of tech research", "Shiny object syndrome"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to evaluate feature sets of different software and matching them to your business needs.'
      },
      pathToRoot: 'Wrong Software → Inadequate Tools → Process Bottlenecks'
    }
  },
  'systems-dont-integrate': {
    explanation: 'Your apps don"t "Talk' to each other. This creates data silos and forces manual entry, leading to slow reporting and human errors.',
    relatedProblems: ["manual-data-entry", "copy-paste-hell"],
    impactAnalysis: {
      financialImpact: 'High cost of "Hidden" admin; delayed decision making; error-prone data.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Data Integrity", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Connect your top 2 apps via Zapier today", "Prioritize "Native Integrations" when buying new software", "Use a central database (e.g., Airtable) to link silos"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fragmented tool choice", "Lack of API knowledge", "Short-term software fixes"],
      automationPotential: {
        rating: "High",
        example: 'Using integration platforms-as-a-service (iPaaS) like Workato or Tray.io to build complex cross-app workflows.'
      },
      pathToRoot: 'Fragmented Systems → Inadequate Tools → Process Bottlenecks'
    }
  },
  'technology-unreliable': {
    explanation: 'Your core business tech keeps breaking, slowing down, or losing data. This creates a culture of frustration and makes you look amateur to your clients.',
    relatedProblems: ["technology-cant-handle", "tools-inadequate"],
    impactAnalysis: {
      financialImpact: 'Immediate revenue risk (downtime); high cost of "Emergency" fixes.',
      severity: "Critical",
      affectedAreas: ["Business Continuity", "Client Trust", "Team Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Hard",
      quickWins: ["Identify the "Oldest" piece of tech and replace it", "Setup uptime monitoring today (e.g., BetterStack)", "Move to a more reliable hosting or SaaS tier"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical debt", "Under-investing in infrastructure', "Poor vendor choice"],
      automationPotential: {
        rating: "High",
        example: 'Using automated error logging and alerting to catch tech issues before they affect the team.'
      },
      pathToRoot: 'Unreliable Tech → Inadequate Tools → Process Bottlenecks'
    }
  },
  'outgrown-tools': {
    explanation: 'The tools that worked when you had 2 employees are now breaking with 10. You are trying to manage a complex machine with a "Starter Kit.'',
    relatedProblems: ["wrong-software", "technology-cant-handle"],
    impactAnalysis: {
      financialImpact: 'Stagnant growth; team frustration; scale-limiting bottlenecks.',
      severity: "Major",
      affectedAreas: ["Scalability", "Efficiency", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["List the top 3 "Scale Killers" in your current stack", "Budget for "Enterprise" or "Pro' versions of core tools", "Plan a 90-day migration for the biggest bottleneck"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Success over-running infrastructure", "Avoiding migration headaches", "Fear of cost increases"],
      automationPotential: {
        rating: "High",
        example: 'Migrating to platforms with "Infinite" scale (e.g., move from a local server to AWS/Google Cloud).'
      },
      pathToRoot: 'Outgrown Tools → Inadequate Tools → Process Bottlenecks'
    }
  },
  'no-crm-pm': {
    explanation: 'You are managing clients and projects via Email, Slack, or Sticky Notes. You have zero central visibility, leading to missed deadlines and forgotten leads.',
    relatedProblems: ["no-project-tracking", "status-unclear"],
    impactAnalysis: {
      financialImpact: 'Missed sales deals; budget overruns; unbilled work.',
      severity: "Major",
      affectedAreas: ["Sales pipeline", "Project Operations", "Data Value"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Move all active projects into a single PM tool today", "Import your client list into a CRM this week", "Achieve "Inbox Zero" for internal project chat by moving it to the PM tool"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Relying on memory", "Informal culture", "Lack of operational discipline"],
      automationPotential: {
        rating: "High",
        example: 'Using CRM/PM automation to trigger tasks and follow-ups based on deal stages.'
      },
      pathToRoot: 'Missing Infrastructure → Inadequate Tools → Process Bottlenecks'
    }
  },
  'cobbled-solutions': {
    explanation: 'A "Frankenstein" stack of duct-tape solutions. While clever at first, this setup is brittle, hard to train people on, and impossible to scale without constant maintenance.',
    relatedProblems: ["systems-dont-integrate", "manual-data-entry"],
    impactAnalysis: {
      financialImpact: 'High cost of "Hidden" technical maintenance; high error risk.',
      severity: "Moderate",
      affectedAreas: ["Operations", "Data Integrity", "Scalability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Identify the #1 most "Brittle" integration today", "Replace one "Hack" with a native tool this month", "Standardize the data flow for the most core task"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Bricolage mindset", "Under-budgeting for tech', "No long-term architecture plan"],
      automationPotential: {
        rating: "High",
        example: 'Replacing multiple "Hacks" with a single, comprehensive platform (e.g., moving from 5 tools to one ERP or CRM).'
      },
      pathToRoot: 'Brittle Stack → Inadequate Tools → Process Bottlenecks'
    }
  },
  'work-stuck': {
    explanation: 'Projects are ready for the next step, but they are "Sitting" in someone"s inbox or on a board. There is no flow, only stops and starts.',
    relatedProblems: ["bottleneck-unavailable", "status-unclear"],
    impactAnalysis: {
      financialImpact: 'Delayed revenue; high WIP (Work in Progress) costs; client frustration.',
      severity: "Major",
      affectedAreas: ["Sales Velocity", "Operations", "Cash Flow"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Easy",
      quickWins: ["Setup a "Handoff" alert in your PM tool today", "Run a 10-min daily standup focused only on "Stuck" tasks", "Identify the #1 "Stopping Point" in your process"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Undefined handoff criteria", "Passive management", "Lack of urgency"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Task Aging" alerts that ping managers when a task hasn't moved in > 48 hours.'
      },
      pathToRoot: 'Work Stagnation → Handoff Issues → Process Bottlenecks'
    }
  },
  'miscommunication-who-does': {
    explanation: 'Two people do the same task, or more commonly, *nobody* does it because they thought someone else was doing it. Clarity on roles is missing.',
    relatedProblems: ["no-clear-ownership", "status-unclear"],
    impactAnalysis: {
      financialImpact: 'Labor waste; high error costs; missed deadlines.',
      severity: "Moderate",
      affectedAreas: ["Operations", "Team Morale", "Profitability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Assign a single "Owner" to every project board today", "Use a RACI matrix for your core processes", "Clarify role titles this week"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of role descriptions", "Informal handoffs", "Over-reliance on 'Teamwork' over 'Accountability'"],
      automationPotential: {
        rating: "High",
        example: 'Mandatory "Assignee" fields in PM tools that prevent a task from being created without an owner.'
      },
      pathToRoot: 'Role Confusion → Handoff Issues → Process Bottlenecks'
    }
  },
  'things-fall-through': {
    explanation: 'Small tasks, follow-ups, or minor quality checks are being forgotten. You are "Leaking" value because your process doesn"t capture everything.',
    relatedProblems: ["no-project-tracking", "status-unclear"],
    impactAnalysis: {
      financialImpact: 'Churn risk from poor client experience; missed upsells; reputation damage.',
      severity: "Major",
      affectedAreas: ["Client Satisfaction", "Brand Equity", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Turn on "Notifications" for overdue tasks", "Use a "Project Checklist" for all final deliveries", "Hold a weekly "Cracks" audit meeting"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Managing by memory", "Tool overload", "Lack of follow-up systems"],
      automationPotential: {
        rating: "High",
        example: 'Using automated "Sanity Checks" that flag incomplete sub-tasks before a project is closed.'
      },
      pathToRoot: 'The "Cracks" Problem → Handoff Issues → Process Bottlenecks'
    }
  },
  'no-clear-ownership': {
    explanation: 'Nobody feels responsible for the end result. People are focused on their "Task" but not the "Outcome.' This leads to a 'Not My Job' culture.',
    relatedProblems: ["miscommunication-who-does", "management-issues"],
    impactAnalysis: {
      financialImpact: 'High rework costs; client churn; stagnant innovation.',
      severity: "Major",
      affectedAreas: ["Team Accountability", "Productivity", "Culture"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months (Culture)",
      difficulty: "Hard",
      quickWins: ["Appoint a "Single Person Responsible" (DRI) for every client", "Tie performance bonuses to *Client Results* not just *Task Completion*", "Address "Not my job" comments immediately"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive leadership", "Vague goals", "Fear of accountability"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - ownership is a leadership and psychological trait.'
      },
      pathToRoot: 'Missing Responsibility → Handoff Issues → Process Bottlenecks'
    }
  },
  'status-unclear': {
    explanation: 'You have to ask "Where are we on this?' 10 times a day. There is no dashboard or visual way to see the health of projects at a glance.',
    relatedProblems: ["no-project-tracking", "work-stuck"],
    impactAnalysis: {
      financialImpact: 'Waste of management time (constant checking); delayed reporting; anxiety.',
      severity: "Moderate",
      affectedAreas: ["Operations", "Founder Peace of Mind", "Speed"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Implement a "Stoplight" status (Red/Yellow/Green) on all projects", "Use a central dashboard (Notion/ClickUp) for status updates", "Stop project updates via email/DM today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fragmented communication", "Lack of PM tool discipline", "Focus on "Doing" over 'Reporting'"],
      automationPotential: {
        rating: "High",
        example: 'Automated status reports generated weekly from PM data.'
      },
      pathToRoot: 'Opaque Progress → Handoff Issues → Process Bottlenecks'
    }
  },
  'different-results': {
    explanation: 'Quality is a coin flip. Sometimes it"s great, sometimes it's poor. This variance kills your brand and makes referrals impossible.',
    relatedProblems: ["no-quality-standards", "wing-it"],
    impactAnalysis: {
      financialImpact: 'High churn; constant rework; unpredictable refund risk.',
      severity: "Major",
      affectedAreas: ["Brand Authority", "Profitability", "Retention"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 months",
      difficulty: "Medium",
      quickWins: ["Pick the "Best" version of your work and make it the "Standard'", "Identify the #1 reason for variance today", "Add a "Final Inspection" step to every delivery"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of standardization", "Different team skill levels", "No QA process"],
      automationPotential: {
        rating: "High",
        example: 'Using automated testing or QA checklists that must be "Passed" by a system before delivery.'
      },
      pathToRoot: 'Variance → Inconsistent Delivery → Quality Problems'
    }
  },
  'no-quality-standards': {
    explanation: 'You haven"t defined what "Good' looks like. Without a standard, your team is aiming at a moving target, leading to inconsistent work and constant founder 'Tweak-ing.'',
    relatedProblems: ["wing-it", "depends-who-does"],
    impactAnalysis: {
      financialImpact: 'Inefficient labor; high cost of founder oversight; inconsistent client ROI.',
      severity: "Major",
      affectedAreas: ["Quality Control", "Team Autonomy", "Brand Value"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Create a "Definition of Done" doc today", "Share 3 examples of "Perfect" work with the team", "Stop accepting work that doesn"t meet the (newly defined) standard"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Expert blindness", "Rushing to deliver", "Undervaluing consistency"],
      automationPotential: {
        rating: "High",
        example: 'AI-powered "Style Guides" or 'Linter' tools that flag deviations from the standard automatically.'
      },
      pathToRoot: 'No Benchmarks → Inconsistent Delivery → Quality Problems'
    }
  },
  'depends-who-does': {
    explanation: 'If [Employee A] does it, it"s 10/10. If [Employee B] does it, it's 6/10. Your business depends on individuals, not processes, making it unscalable.',
    relatedProblems: ["only-one-knows", "tribal-knowledge"],
    impactAnalysis: {
      financialImpact: 'Inconsistent margins; "Lottery" style client experience; risk of losing key talent.',
      severity: "Major",
      affectedAreas: ["Scalability", "Brand Integrity", "Team Growth"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Medium",
      quickWins: ["Have the "Expert" record their process today", "Make the "Novice" follow that recording exactly", "Audit the variance between them next week"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of cross-training", "Process in heads not on paper", "Skill gaps"],
      automationPotential: {
        rating: "High",
        example: 'Building "Decision Support" tools that guide everyone through the same logic regardless of experience.'
      },
      pathToRoot: 'Person-Dependent Quality → Inconsistent Delivery → Quality Problems'
    }
  },
  'no-review-qa': {
    explanation: 'Work goes straight from "Doing" to "Client.' There is no second eye, no double-check, and no safety net for human error.',
    relatedProblems: ["errors-slip-through", "no-quality-control"],
    impactAnalysis: {
      financialImpact: 'Immediate churn risk; high rework costs; brand damage from "Silly" mistakes.',
      severity: "Critical",
      affectedAreas: ["Client Trust", "Operations", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Implement a mandatory "Peer Review" today", "Use an automated checklist before clicking "Send"", "Schedule a 15-min "Pre-Delivery' signoff call"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Rushing to hit deadlines", "Under-staffing", "Undervaluing QA"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to proofread or "Check" work against requirements before a human even sees it.'
      },
      pathToRoot: 'No Safety Net → Inconsistent Delivery → Quality Problems'
    }
  },
  'wing-it': {
    explanation: 'The team starts every task with a blank page. Intuition is used instead of a checklist. While creative, this is the enemy of efficiency and scale.',
    relatedProblems: ["every-project-reinvented", "inconsistent-methods"],
    impactAnalysis: {
      financialImpact: 'Zero operational leverage; extreme time waste; high cognitive load for the team.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Mental Clarity", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Pick the most repeated task and create a 5-step checklist today", "Forbid "Starting from Scratch" for recurring work", "Use templates for everything"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Creative hubris", "Aversion to structure", "Lack of leadership standards"],
      automationPotential: {
        rating: "High",
        example: 'Using "Workflow Engines" that don't allow Step 2 to start until Step 1's checklist is checked off.'
      },
      pathToRoot: 'Improvisation → Inconsistent Delivery → Quality Problems'
    }
  },
  'errors-slip-through': {
    explanation: 'Mistakes are reaching the client. Whether they are typos, broken links, or strategic errors, each one erodes trust and requires expensive rework.',
    relatedProblems: ["no-review-qa", "rushing-mistakes"],
    impactAnalysis: {
      financialImpact: 'Client churn; increased refund requests; high rework labor.',
      severity: "Critical",
      affectedAreas: ["Client Retention", "Brand Reputation", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Setup an automated "Pre-flight' checklist", "Identify the #1 most common error today", "Implement a "Zero-Error' bonus for the team"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of second-eye review", "Fatigue/Burnout', "Under-estimating complexity"],
      automationPotential: {
        rating: "High",
        example: 'Using AI vision or logic tools to "Scan" deliverables for common errors automatically.'
      },
      pathToRoot: 'Leaking Mistakes → Mistakes/Rework → Quality Problems'
    }
  },
  'no-quality-control': {
    explanation: 'You have no formal step in your process dedicated to checking work. Quality is assumed, not verified.',
    relatedProblems: ["no-review-qa", "different-results"],
    impactAnalysis: {
      financialImpact: 'Hidden costs of rework; slow-motion churn; unmeasurable efficiency.',
      severity: "Major",
      affectedAreas: ["Operations", "Quality Assurance", "Brand Equity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Appoint a "Quality Lead" (can be a current team member)", "Define 3 "Non-Negotiable' quality checks", "Add a "QA" stage to your PM board today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Growth at all costs mindset", "Thin margins (avoiding QA time)', "Implicit trust in team"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Smoke Tests" or regression suites that verify the core product is working.'
      },
      pathToRoot: 'Missing Verification → Mistakes/Rework → Quality Problems'
    }
  },
  'rushing-mistakes': {
    explanation: 'The team is overworked or deadlines are unrealistic. Speed is being prioritized over quality, leading to careless errors that take longer to fix than if they were done right the first time.',
    relatedProblems: ["working-too-much", "timelines-slip"],
    impactAnalysis: {
      financialImpact: ' Diminishing returns on speed; high rework costs; team burnout.',
      severity: "Major",
      affectedAreas: ["Team Morale", "Gross Margin", "Client Trust"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Extend the "Next Deadline" by 20% today", "Identify the #1 "Time Pressure" source", "Mandate a "Cool-off' hour before final delivery"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-promising in sales", "Poor capacity planning", "Under-staffing"],
      automationPotential: {
        rating: "High",
        example: 'Using capacity planning tools to automatically block out "QA Time" so it can't be skipped for speed.'
      },
      pathToRoot: 'Speed vs Quality → Mistakes/Rework → Quality Problems'
    }
  },
  'miscommunication-wrong-work': {
    explanation: 'The team did a great job... but on the wrong thing. Requirements were misunderstood, leading to 100% rework and a very frustrated client.',
    relatedProblems: ["expectations-misaligned", "internal-miscommunication"],
    impactAnalysis: {
      financialImpact: '100% loss of project labor; extreme churn risk.',
      severity: "Critical",
      affectedAreas: ["Profitability", "Client Trust", "Team Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Mandate a "Brief Review" call before work starts", "Use "Project Wikis" for single source of truth", "Have the team repeat the requirements back to you in their own words"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Vague briefs", "Oral-only instructions', "Assumed understanding"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to compare the "Project Brief" against the 'Final Work' to flag discrepancies automatically.'
      },
      pathToRoot: 'Briefing Failure → Mistakes/Rework → Quality Problems'
    }
  },
  'high-defect-rate': {
    explanation: 'A high percentage of your deliverables require significant edits or corrections. You are "Finishing the work twice" for every one project.',
    relatedProblems: ["rework-mistakes", "no-quality-standards"],
    impactAnalysis: {
      financialImpact: 'Gross margin collapse; inability to scale; constant "Crisis" mode.',
      severity: "Critical",
      affectedAreas: ["Profitability", "Efficiency", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Hard",
      quickWins: ["Track the "Rework Ratio" for the next 30 days", "Identify the #1 "Repetitive Error"", "Stop delivery for one day to run a "Quality Retrospective""],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Systemic process failure", "Skill gaps", "Outdated tools"],
      automationPotential: {
        rating: "Medium",
        example: 'Using statistical process control (SPC) logic to flag when your defect rate is spiking.'
      },
      pathToRoot: 'Systemic Errors → Mistakes/Rework → Quality Problems'
    }
  },
  'high-defect-rate': {
    explanation: 'A high percentage of your deliverables require significant edits or corrections. You are "Finishing the work twice" for every one project.',
    relatedProblems: ["rework-eating-profit", "no-quality-standards"],
    impactAnalysis: {
      financialImpact: 'Gross margin collapse; inability to scale; constant "Crisis" mode.',
      severity: "Critical",
      affectedAreas: ["Profitability", "Efficiency", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Hard",
      quickWins: ["Track the "Rework Ratio" for the next 30 days", "Identify the #1 "Repetitive Error"", "Stop delivery for one day to run a "Quality Retrospective""]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Systemic process failure", "Skill gaps", "Outdated tools"],
      automationPotential: {
        rating: "Medium",
        example: 'Using statistical process control (SPC) logic to flag when your defect rate is spiking.'
      },
      pathToRoot: 'Systemic Errors → Mistakes/Rework → Quality Problems'
    }
  },
  'team-no-expertise': {
    explanation: 'You have a team, but they lack the deep technical or strategic knowledge required for the current projects. This leads to mediocre work and constant founder intervention.',
    relatedProblems: ["skills-knowledge-gap", "complex-beyond-capability"],
    impactAnalysis: {
      financialImpact: 'High cost of management; inability to command premium prices; slow delivery.',
      severity: "Major",
      affectedAreas: ["Quality Control", "Pricing Power", "Growth Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Hire one "Senior" to level up the juniors", "Identify the #1 "Missing Skill" and buy a course for the team", "Partner with an expert freelancer for current high-risk work"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Hiring based on budget not talent", "Fast market shift", "Under-investment in L&D"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - expertise is human capital.'
      },
      pathToRoot: 'Expertise Gap → Skills Gap → Quality Problems'
    }
  },
  'complex-beyond-capability': {
    explanation: 'The work you"ve sold is more difficult than your team can handle. This creates high stress, quality failures, and eventually 'Burnout' as people struggle to perform.',
    relatedProblems: ["team-no-expertise", "bought-cant-deliver"],
    impactAnalysis: {
      financialImpact: 'Immediate project risk; potential for legal/reputation damage; high rework costs.',
      severity: "Critical",
      affectedAreas: ["Service Quality", "Team Mental Health", "Client Retention"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Scope reduction)",
      difficulty: "Hard",
      quickWins: ["Simplify the project requirements today", "Bring in a specialist contractor to finish the difficult parts", "Be honest with the client and reset expectations"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-selling capability", "Lack of technical scoping during sales", "Hero complex"],
      automationPotential: {
        rating: "Medium",
        example: 'Using technical assessment AI to verify if a project brief matches the team"s historical skill data.'
      },
      pathToRoot: 'Over-selling → Skills Gap → Quality Problems'
    }
  },
  'need-specialists': {
    explanation: 'Your project requires niche knowledge (e.g., specific law, advanced AI, specialized design) that your "Generalist" team doesn"t have. You are trying to solve complex problems with basic tools.',
    relatedProblems: ["team-no-expertise", "subcontractors-expensive"],
    impactAnalysis: {
      financialImpact: 'Mediocre results; inability to solve the "High-Value' part of the problem.',
      severity: "Moderate",
      affectedAreas: ["Market Reach", "Value Creation", "Strategic Positioning"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Identify the "Specialist" needed for the current project", "Create a "Specialist" bench of freelancers", "Joint-venture with a niche agency today"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Evolving client needs", "Broad offer without depth", "Lack of specialized network"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to find and vet specialists on platforms like Upwork or Malt automatically.'
      },
      pathToRoot: 'Generalist Trap → Skills Gap → Quality Problems'
    }
  },
  'trying-not-good-at': {
    explanation: 'You are accepting work that is outside your "Zone of Genius.' You are doing it for the money, but it's taking 3x longer and producing worse results than your core service.',
    relatedProblems: ["wrong-clients", "bad-fit-services"],
    impactAnalysis: {
      financialImpact: 'Massive margin drain; team frustration; damage to your "Expert" brand.',
      severity: "Major",
      affectedAreas: ["Profitability", "Brand Integrity", "Team Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Say "No")",
      difficulty: "Hard (Mindset)',
      quickWins: ["Define your "Anti-Offer' (what you *won't* do)", "Fire the worst "Off-strategy' project today", "Refer the next "Bad Fit" lead to a partner"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Scarcity mindset", "Lack of niche focus", "No sales filters"],
      automationPotential: {
        rating: "High",
        example: 'Using automated qualification forms that reject leads for services you don"t excel at.'
      },
      pathToRoot: 'Lack of Focus → Skills Gap → Quality Problems'
    }
  },
  'learning-on-job': {
    explanation: 'You are using client projects as "Training Ground.' While some learning is necessary, doing it without supervision leads to slow delivery and high risk of errors.',
    relatedProblems: ["no-training-system", "errors-slip-through"],
    impactAnalysis: {
      financialImpact: 'Unbilled "Research" hours; client frustration with speed; potential for rookie mistakes.',
      severity: "Moderate",
      affectedAreas: ["Gross Margin", "Client Trust", "Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Add a "Senior Review" step to all new tasks", "Separate "Internal R&D' from 'Client Work'", "Be transparent with the client about "Beta" services"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of internal R&D budget", "New service launches", "Under-staffing seniors"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to guide the "Learning" phase with real-time suggestions and quality checks.'
      },
      pathToRoot: 'Rookie Mistakes → Skills Gap → Quality Problems'
    }
  },
  'not-meeting-expectations': {
    explanation: 'The client expected an "A" and you delivered a 'B-'. This is often a failure of 'Expectation Management' during the sales or onboarding process.',
    relatedProblems: ["expectations-misaligned", "bad-service"],
    impactAnalysis: {
      financialImpact: 'High churn risk; zero referrals; increased demand for "Free" extra work to compensate.',
      severity: "Critical",
      affectedAreas: ["Brand Reputation", "LTV", "Team Pride"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Audit your "Sales Promises" against 'Delivery Reality'", "Ask: "What did you think this would look like?' today", "Send a "Progress Report" that clearly ties work to original goals"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-promising in sales", "Vague Success Criteria", "Lack of communication"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Onboarding Questionnaires" that force the client to define 'Success' numerically.'
      },
      pathToRoot: 'Expectation Gap → Client Dissatisfaction → Quality Problems'
    }
  },
  'communication-breakdowns-quality': {
    explanation: 'The work is fine, but the client doesn"t know it. Or the client has concerns that aren't being heard. The 'Communication Layer' is failing, making the work *seem* lower quality than it is.',
    relatedProblems: ["internal-miscommunication", "no-communication-plan"],
    impactAnalysis: {
      financialImpact: 'Increased churn; high anxiety for both parties; needless rework.',
      severity: "Major",
      affectedAreas: ["Client Trust", "Team Speed", "Referral Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Setup a weekly "Status Email" today", "Give the client a "Project Dashboard" for visibility", "Identify the "Primary Contact" for each account"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Managing via Slack/DMs", "No dedicated account management", "Founder busy-ness"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Client Reporting" dashboards that pull data directly from PM/CRM tools.'
      },
      pathToRoot: 'Opaque Process → Client Dissatisfaction → Quality Problems'
    }
  },
  'missed-deadlines-quality': {
    explanation: 'You deliver good work, but always "Late.' This makes the client look bad internally and creates a feeling of unreliability that outweighs the quality of the work.',
    relatedProblems: ["timelines-slip", "underestimate-time-pm"],
    impactAnalysis: {
      financialImpact: 'Churn risk; high price sensitivity; penalty fees in some contracts.',
      severity: "Major",
      affectedAreas: ["Account Stability", "Market Reputation", "Cash Flow"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Add a 20% "Buffer" to the next deadline today", "Alert the client 48 hours *before* a deadline if you"ll miss it", "Identify the #1 cause of delays this week"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor capacity planning", "Optimism bias", "Internal bottlenecks"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Deadline Alerts" that ping the team when a task is 50% through its duration but 0% complete.'
      },
      pathToRoot: 'Lateness → Client Dissatisfaction → Quality Problems'
    }
  },
  'poor-results': {
    explanation: 'The work was delivered on time and on budget, but it didn"t solve the client"s problem. You produced 'Deliverables' but not 'Outcomes.'',
    relatedProblems: ["results-mediocre", "cant-articulate-roi"],
    impactAnalysis: {
      financialImpact: '100% Churn; negative ROI for the client; potential refund requests.',
      severity: "Critical",
      affectedAreas: ["LTV", "Brand Authority", "Business Viability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months (Strategy shift)",
      difficulty: "Hard",
      quickWins: ["Ask the client: "What is the #1 KPI you care about?'", "Audit your "Product-Market Fit'", "Stop selling "Tasks" and start selling "Transformations'"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Wrong strategy", "Weak execution", "Mismatched expectations"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to analyze results data and suggest strategic optimizations in real-time.'
      },
      pathToRoot: 'Failure to Deliver → Client Dissatisfaction → Quality Problems'
    }
  },
  'complaints-issues': {
    explanation: 'Your inbox is full of client complaints. You are spending all your time "Defending" your work instead of "Improving' your work.',
    relatedProblems: ["bad-service", "relationship-deteriorated"],
    impactAnalysis: {
      financialImpact: 'Massive time waste; high churn; team demoralization.',
      severity: "Critical",
      affectedAreas: ["Team Morale", "Founder Peace of Mind", "Retention"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month (Service recovery)",
      difficulty: "Hard",
      quickWins: ["Create a "Complaint Log" today to find patterns", "Hold a "Root Cause" meeting for every complaint", "Implement a formal "Service Recovery" policy (e.g., credit/refund)"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Systemic quality failure", "Poor communication", "Wrong client expectations"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated "Sentiment Analysis" on client emails to flag frustrations before they become complaints.'
      },
      pathToRoot: 'Constant Friction → Client Dissatisfaction → Quality Problems'
    }
  },
  'clients-ask-more': {
    explanation: 'The client keeps adding "Tiny Requests" that they think are easy but actually derail your team. You haven't set a boundary, so the project grows without the budget growing.',
    relatedProblems: ["extras-free", "scope-creep-profit"],
    impactAnalysis: {
      financialImpact: 'Profit margin erosion; unbilled labor; team burnout.',
      severity: "Major",
      affectedAreas: ["Profitability", "Team Capacity", "Project Management"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Medium",
      quickWins: ["Say: "Yes, we can do that. Here is the cost.'", "Refer back to the original SOW in every meeting", "Introduce a "Phase 2' bucket for all extras"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of boundaries", "Desire to please", "Vague initial agreement"],
      automationPotential: {
        rating: "High",
        example: 'Using "Add-on' buttons in your PM tool that require a budget approval before the task is unlocked.'
      },
      pathToRoot: 'Boundary Failure → Scope Creep → Project Management Issues'
    }
  },
  'original-scope-unclear': {
    explanation: 'You started the work before defining exactly what "Finished" looks like. Now you and the client have different ideas of the goal, leading to infinite work.',
    relatedProblems: ["scope-poorly-defined", "expectations-misaligned"],
    impactAnalysis: {
      financialImpact: 'Budget overruns; unmeasurable success; high rework risk.',
      severity: "Major",
      affectedAreas: ["Project Operations", "Client Satisfaction", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Medium",
      quickWins: ["Write a "Definition of Done" for the current project today", "Hold a "Mid-Project Alignment' call", "Standardize your "Scope" template for all future deals"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Rushing to start", "Expert blindness (assuming they know)', "Weak contract templates"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Scoping Questionnaires" that generate a draft SOW based on client answers.'
      },
      pathToRoot: 'Vague Start → Scope Creep → Project Management Issues'
    }
  },
  'saying-yes-everything': {
    explanation: 'The founder or sales team says "Yes" to every request to close the deal or keep the client happy. You are over-promising and creating an impossible burden for delivery.',
    relatedProblems: ["overcommitting", "cant-say-no"],
    impactAnalysis: {
      financialImpact: 'Delivery failure risk; high labor costs; team burnout.',
      severity: "Major",
      affectedAreas: ["Team Morale", "Operations", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month (Mindset shift)",
      difficulty: "Mindset",
      quickWins: ["Introduce a "Cool-off' period before agreeing to extras", "Require "Delivery Team" sign-off on all new sales promises", "Practice saying: "We don"t specialize in that, but we can do X.'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Scarcity mindset", "Fear of conflict", "No role unbundling (sales vs delivery)"],
      automationPotential: {
        rating: "Medium",
        example: 'Using a "Deal Scorer" that flags projects with too many custom 'Yes' items as high-risk.'
      },
      pathToRoot: 'Yes-Man Trap → Scope Creep → Project Management Issues'
    }
  },
  'feature-creep': {
    explanation: 'The project is growing "Features" that weren"t in the plan. While each feature is cool, the collective weight is making the project late and unprofitable.',
    relatedProblems: ["gold-plating", "clients-ask-more"],
    impactAnalysis: {
      financialImpact: 'Stagnant project revenue while costs climb; delayed final payout.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Delivery Speed", "Simplicity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Freeze all new features today", "Categorize current features into "Must-have' vs 'Nice-to-have'", "Bill for the "Creep" retrospectively if possible"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Perfectionism", "Lack of MVP mindset", "Weak project management oversight"],
      automationPotential: {
        rating: "High",
        example: 'Using "Change Order" automation that adds a fee every time a new requirement is logged.'
      },
      pathToRoot: 'Complexity Bloat → Scope Creep → Project Management Issues'
    }
  },
  'gold-plating': {
    explanation: 'Your team is adding extra quality or features that the client didn"t ask for and won"t pay for. You are 'Over-delivering' yourself into bankruptcy.',
    relatedProblems: ["over-delivering", "feature-creep"],
    impactAnalysis: {
      financialImpact: 'Wasted labor hours; decreased annual throughput; zero ROI on "Extra" quality.',
      severity: "Moderate",
      affectedAreas: ["Gross Margin", "Efficiency", "Team Priorities"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Define "Minimum Viable Quality" today", "Reward team for "On-Time and On-Scope' rather than 'Extra' work", "Audit the last project for "Unasked-for' features"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Team perfectionism", "Lack of business awareness in delivery team", "Hero complex"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a management and priority issue.'
      },
      pathToRoot: 'Over-polishing → Scope Creep → Project Management Issues'
    }
  },
  'gold-plating': {
    explanation: 'Your team is adding extra quality or features that the client didn"t ask for and won"t pay for. You are 'Over-delivering' yourself into bankruptcy.',
    relatedProblems: ["over-delivering", "feature-creep"],
    impactAnalysis: {
      financialImpact: 'Wasted labor hours; decreased annual throughput; zero ROI on "Extra" quality.',
      severity: "Moderate",
      affectedAreas: ["Gross Margin", "Efficiency", "Team Priorities"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Define "Minimum Viable Quality" today", "Reward team for "On-Time and On-Scope' rather than 'Extra' work", "Audit the last project for "Unasked-for' features"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Team perfectionism", "Lack of business awareness in delivery team", "Hero complex"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a management and priority issue.'
      },
      pathToRoot: 'Over-polishing → Scope Creep → Project Management Issues'
    }
  },
  'unexpected-complications': {
    explanation: 'Things are going wrong that you "couldn"t have predicted.' While some risk is inherent, a pattern of 'Surprises' suggests poor initial research or weak contingency planning.',
    relatedProblems: ["dependencies-delays", "underestimate-time-pm"],
    impactAnalysis: {
      financialImpact: 'Budget overruns; project delays; high "Emergency" labor costs.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Speed", "Founder Stress"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month (Planning improvement)",
      difficulty: "Medium",
      quickWins: ["Run a "Pre-Mortem' before the next project starts", "Identify the #1 source of "Surprises" in the last 3 deals", "Add a 15% "Unforeseen" buffer to all quotes"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of risk assessment", "Shallow discovery phase", "New/Untested technology"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to simulate project risks based on historical data and flagging likely failure points.'
      },
      pathToRoot: 'Planning Failure → Timelines Slip → Project Management Issues'
    }
  },
  'client-delays-pm': {
    explanation: 'Your project is ready to move, but it"s sitting on the client"s desk. This delay is costing you money in overhead and context-switching every single day.',
    relatedProblems: ["waiting-feedback", "work-stuck"],
    impactAnalysis: {
      financialImpact: 'Stagnant cash flow; team idle time; project "Stagnation" costs.',
      severity: "Major",
      affectedAreas: ["Operations", "Team Throughput", "Cash Flow"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Implement a "3-Day Approval' rule in contracts", "Schedule the review call *before* you send the work", "Charge a "Restart Fee" for projects that stall > 14 days"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive project management", "Undefined client responsibilities", "Complex client hierarchy"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Nagging" systems that follow up with clients every 24 hours until they provide feedback.'
      },
      pathToRoot: 'Client Stalls → Timelines Slip → Project Management Issues'
    }
  },
  'interruptions-switching': {
    explanation: 'Your team is constantly being pulled away from project work to handle "Quick Questions" or emergencies. This kills their flow and makes tasks take 3x longer than needed.',
    relatedProblems: ["email-meeting-overload", "everything-urgent"],
    impactAnalysis: {
      financialImpact: 'Massive hidden labor waste; high error rate; delayed deliveries.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Team Mental Health", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Medium",
      quickWins: ["Implement "Deep Work" blocks (no Slack/Email) today", "Limit meetings to specific days/hours", "Setup a "Triage" system for questions so they don"t hit the makers"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Slack/Chat culture", "Poor prioritization", "Reactive management"],
      automationPotential: {
        rating: "High",
        example: 'Using AI assistants to answer basic team questions so they don"t interrupt the expert.'
      },
      pathToRoot: 'Context Switching → Timelines Slip → Project Management Issues'
    }
  },
  'overcommitting': {
    explanation: 'You are selling more work than your team can possibly deliver. You are working at 110% capacity, which means the first small problem causes a total project collapse.',
    relatedProblems: ["bought-cant-deliver", "firefighting"],
    impactAnalysis: {
      financialImpact: 'Churn risk; high rework costs; team burnout and turnover.',
      severity: "Critical",
      affectedAreas: ["Capacity", "Team Morale", "Client Trust"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Sales freeze)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Halt all new sales for 14 days today", "Extend all current "Next" deadlines by 1 week", "Calculate your *True* capacity based on past data, not hopes"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Scarcity mindset", "Lack of capacity planning", "Optimism bias"],
      automationPotential: {
        rating: "High",
        example: 'Using capacity forecasting tools that "Redline" your sales team when delivery is at 80%.'
      },
      pathToRoot: 'Capacity Overload → Timelines Slip → Project Management Issues'
    }
  },
  'expectations-misaligned': {
    explanation: 'The client thinks they bought a "Ferrari" and you"re building a 'Jeep.' This gap in perception leads to endless frustration, even if the work is technically good.',
    relatedProblems: ["not-meeting-expectations", "original-scope-unclear"],
    impactAnalysis: {
      financialImpact: 'High churn; low referral rate; constant demands for free extras.',
      severity: "Major",
      affectedAreas: ["Client Trust", "Brand Equity", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month (Onboarding fix)",
      difficulty: "Medium",
      quickWins: ["Run a "Kickoff" meeting focused *only* on expectations today", "Ask the client to define "Failure" for this project", "Create a "What we don"t do" list"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-selling", "Vague briefs", "Assumed understanding"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Expectation Setting" videos delivered immediately after purchase.'
      },
      pathToRoot: 'Perception Gap → Communication Breakdowns → Project Management Issues'
    }
  },
  'internal-miscommunication': {
    explanation: 'Information is getting lost inside your own walls. Sales doesn"t tell Delivery what was promised; Manager doesn't tell Team about changes. You are working against yourselves.',
    relatedProblems: ["information-silos", "miscommunication-who-does"],
    impactAnalysis: {
      financialImpact: 'Needless rework; duplicate labor; missed sales promises.',
      severity: "Major",
      affectedAreas: ["Team Morale", "Efficiency", "Quality"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Easy",
      quickWins: ["Implement a mandatory "Sales-to-Delivery' handoff call", "Standardize your internal project chat channels today", "Hold a 10-min daily huddle"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of central documentation", "Managing via DM", "No standardized handoffs"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to summarize sales calls and auto-post the "Promises" into the delivery project board.'
      },
      pathToRoot: 'Internal Friction → Communication Breakdowns → Project Management Issues'
    }
  },
  'assumptions-not-verified': {
    explanation: 'You are building based on "I think" instead of "I know.' Whether it's a technical requirement or a client goal, unverified assumptions lead to 100% rework later.',
    relatedProblems: ["miscommunication-wrong-work", "unexpected-complications"],
    impactAnalysis: {
      financialImpact: 'Massive rework costs; project delays; erosion of professional authority.',
      severity: "Major",
      affectedAreas: ["Profitability", "Accuracy", "Client Confidence"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate (Checklist)",
      difficulty: "Easy",
      quickWins: ["Add a "Verification" step to your project brief", "Ask "How do we know this is true?' for every core assumption", "Run a 15-min "Validation" call before starting build"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Expert hubris", "Rushing to deliver", "Shallow discovery phase"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to flag "Assumptive Language" in project briefs and prompting for proof.'
      },
      pathToRoot: 'Verification Failure → Communication Breakdowns → Project Management Issues'
    }
  },
  'information-silos': {
    explanation: 'Information is trapped in individual departments or heads. People are making decisions without the full picture, leading to disjointed efforts and repeated mistakes.',
    relatedProblems: ["tribal-knowledge", "internal-miscommunication"],
    impactAnalysis: {
      financialImpact: 'Hidden inefficiencies; slow decision making; inconsistent quality.',
      severity: "Major",
      affectedAreas: ["Strategic Alignment", "Operations", "Culture"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months (Infrastructure)",
      difficulty: "Hard",
      quickWins: ["Move all work communication into "Public" channels today", "Create a central "Company Wiki" (Notion/Notion)", "Hold a weekly cross-functional demo session"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fragmented tools", "Managing via private DMs", "No central documentation culture"],
      automationPotential: {
        rating: "High",
        example: 'Using central knowledge bases that automatically "Link" related info across different apps.'
      },
      pathToRoot: 'Isolation → Communication Breakdowns → Project Management Issues'
    }
  },
  'no-communication-plan': {
    explanation: 'You are communicating "Reactively.' You only talk to the client when there is a problem or an invoice. This leaves them feeling anxious and out-of-the-loop.',
    relatedProblems: ["updates-missing", "client-delays-pm"],
    impactAnalysis: {
      financialImpact: 'Increased churn; price sensitivity; high anxiety for the account manager.',
      severity: "Moderate",
      affectedAreas: ["Client Experience", "Referral Rate", "Retention"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Commit to a "Weekly Friday Update" for all clients today", "Define exactly *where* communication happens (e.g., "We don"t use Slack")", "Set expectations for response times upfront"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Under-valuing the "Experience" over the "Work', "Founder busy-ness', "Inexperience"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Progress Updates" triggered by project milestones in your PM tool.'
      },
      pathToRoot: 'Passive Comm → Communication Breakdowns → Project Management Issues'
    }
  },
  'updates-missing': {
    explanation: 'The client goes weeks without hearing from you. Even if you are working hard, to them, "Silence = Nothing is happening.' This is the #1 trigger for anxiety-based churn.',
    relatedProblems: ["no-communication-plan", "client-delays-pm"],
    impactAnalysis: {
      financialImpact: 'Immediate account risk; high price sensitivity; loss of trust.',
      severity: "Major",
      affectedAreas: ["Retention", "Referral Rate", "Client Trust"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Set a calendar alert for "Update Day" every Friday", "Send a 2-sentence "What we did / What's next' update today", "Use a Loom video for faster reporting"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Focus on "Doing" over "Reporting', "Perfectionism (waiting for 'Real' news)', "No system"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to generate a "Weekly Summary" of completed tasks from your PM tool and auto-emailing it.'
      },
      pathToRoot: 'Inconsistent Updates → Communication Breakdowns → Project Management Issues'
    }
  },
  'wrong-people-projects': {
    explanation: 'You are putting "Round pegs in square holes.' Assigning tasks based on 'Who is free' instead of 'Who is best' leads to slow delivery and quality errors.',
    relatedProblems: ["skill-mismatches", "people-underperform"],
    impactAnalysis: {
      financialImpact: ' Labor waste; high cost of rework; slow training ROI.',
      severity: "Moderate",
      affectedAreas: ["Efficiency", "Quality", "Team Morale"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Run a "Skills Matrix" for your team this week", "Move one project to a better-suited person today", "Create "Subject Matter Experts" for core tasks"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor capacity planning", "Hiring based on availability", "No role specialization"],
      automationPotential: {
        rating: "Medium",
        example: 'AI-powered resource management that matches task "Skills" to employee "History' automatically.'
      },
      pathToRoot: 'Allocation Failure → Resource Allocation Wrong → Project Management Issues'
    }
  },
  'overbooking': {
    explanation: 'You"ve assigned 120 hours of work to a team with 80 hours of capacity. You are intentionally building a 'Systemic Delay' into your business and burning out your best people.',
    relatedProblems: ["overcommitting", "working-too-much"],
    impactAnalysis: {
      financialImpact: 'Total loss of delivery quality; high team turnover costs; missed deadlines.',
      severity: "Critical",
      affectedAreas: ["Team Mental Health", "Operations", "Client Retention"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Scope cut)",
      difficulty: "Hard",
      quickWins: ["Stop all new project starts today", "Hire a contractor for the "Overflow" this week", "Be honest with clients about delayed timelines now"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of capacity tracking", "Saying "Yes" to every sale', "Ignoring labor math"],
      automationPotential: {
        rating: "High",
        example: 'Using resource planning tools (e.g., Float, Resource Guru) that "Lock" project starts when at capacity.'
      },
      pathToRoot: 'Systemic Overload → Resource Allocation Wrong → Project Management Issues'
    }
  },
  'underbooking': {
    explanation: 'You have a team sitting idle because sales are slow or projects are stuck. You are paying for capacity you aren"t using, which is pure profit drain.',
    relatedProblems: ["team-idle", "not-enough-revenue"],
    impactAnalysis: {
      financialImpact: 'Immediate drain on cash flow; negative ROI on labor; team boredom/demotivation.',
      severity: "Major",
      affectedAreas: ["Gross Margin", "Profitability", "Team Retention"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week (Sales push)",
      difficulty: "Medium",
      quickWins: ["Assign all idle staff to "SOP Documentation" today", "Run a "Flash Sale" to fill the gaps", "Increase marketing spend immediately"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inconsistent sales pipeline", "Lumpy project timing", "Poor capacity visibility"],
      automationPotential: {
        rating: "High",
        example: 'Connecting your CRM pipeline to your Resource Manager to trigger marketing when "Future Capacity" is high.'
      },
      pathToRoot: 'Wasted Capacity → Resource Allocation Wrong → Project Management Issues'
    }
  },
  'skill-mismatch-resource': {
    explanation: 'You are assigning high-level seniors to low-level admin work, or juniors to high-level strategy. Either way, you are wasting money or risking quality.',
    relatedProblems: ["low-value-work", "skill-mismatches"],
    impactAnalysis: {
      financialImpact: 'Inefficient labor costs; missed opportunities; high error risk.',
      severity: "Moderate",
      affectedAreas: ["Profitability", "Quality Control", "Team Growth"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Audit your top 2 seniors" time this week", "Hire a junior to offload the senior admin work today", "Redefine task-level authority"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Flat organizational structure", "Founder as technician", "Lack of role unbundling"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to categorize tasks by "Complexity" and suggesting the appropriate pay-grade for each.'
      },
      pathToRoot: 'Efficiency Gap → Resource Allocation Wrong → Project Management Issues'
    }
  },
  'priorities-unclear': {
    explanation: 'The team doesn"t know what to work on first. They are busy, but on the wrong things. This leads to high-value projects being delayed for low-value 'Busy Work.'',
    relatedProblems: ["poor-prioritization", "everything-urgent"],
    impactAnalysis: {
      financialImpact: 'Opportunity cost of delayed revenue; team frustration; strategic drift.',
      severity: "Major",
      affectedAreas: ["Throughput", "Strategic Goals", "Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Implement a "Top 3 for the Day' for everyone today", "Use a "Priority" field in your PM tool (and use it!)", "Cancel all "Maybe" tasks this week"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear KPIs", "Reactive management", "Too many "Big" ideas"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to auto-sort task lists based on "Due Date" and 'Revenue Impact' automatically.'
      },
      pathToRoot: 'Direction Failure → Resource Allocation Wrong → Project Management Issues'
    }
  },
  'firefighting': {
    explanation: 'You are managing by crisis. You only focus on what is "Burning" right now. You have no time for the 'Building' tasks that would prevent future fires.',
    relatedProblems: ["everything-urgent", "reactive-not-proactive"],
    impactAnalysis: {
      financialImpact: 'High operational waste; founder burnout; stagnant growth.',
      severity: "Critical",
      affectedAreas: ["Founder Mental Health", "Strategic Growth", "Sustainability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months (Mindset shift)",
      difficulty: "Hard",
      quickWins: ["Block 90 mins of "Proactive Time" first thing tomorrow", "Fix the #1 recurring "Crisis" permanently today", "Stop answering Slack/Email during your focus block"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of operational buffers", "Poor systems", "Hero complex"],
      automationPotential: {
        rating: "Medium",
        example: 'Using automated monitoring to flag "Small Problems" before they become 'Fires'.'
      },
      pathToRoot: 'Crisis Mode → Resource Allocation Wrong → Project Management Issues'
    }
  },
  'no-visibility-utilization': {
    explanation: 'You don"t know how much of your team"s time is actually being spent on revenue-generating work. You are managing 'Blind' regarding your most expensive asset: labor.',
    relatedProblems: ["team-idle", "dont-know-costs"],
    impactAnalysis: {
      financialImpact: 'Undiagnosed profit leaks; inefficient staffing; unmeasurable ROI.',
      severity: "Major",
      affectedAreas: ["Gross Margin", "Efficiency", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Implement a simple "Billable vs Non-Billable' tracker today", "Set a target utilization rate (e.g., 75%)", "Audit the last week"s time logs"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Aversion to time-tracking", "Informal culture", "Lack of data focus"],
      automationPotential: {
        rating: "High",
        example: 'Using automated time-tracking tools (e.g., Harvest, Timely) that categorize work by project and task type.'
      },
      pathToRoot: 'Invisible Waste → No Project Tracking → Project Management Issues'
    }
  },
  'surprises-end': {
    explanation: 'You only find out a project is over budget or failing when it"s already done. You have no 'Mid-Course' correction, making every project a gamble.',
    relatedProblems: ["no-project-tracking", "unexpected-complications"],
    impactAnalysis: {
      financialImpact: 'Shocking revenue losses; damaged client relationships; unable to plan cash.',
      severity: "Critical",
      affectedAreas: ["Profitability", "Client Trust", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Setup a "50% Completion' check-in today", "Implement a weekly budget-vs-actual report", "Use automated "Warning" alerts in your PM tool"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of real-time tracking", "Post-mortem only culture', "Passive management"],
      automationPotential: {
        rating: "High",
        example: 'Real-time project dashboards that predict final budget based on current burn-rate.'
      },
      pathToRoot: 'Lagging Data → No Project Tracking → Project Management Issues'
    }
  },
  'budget-overruns': {
    explanation: 'Projects are consistently costing you more than you budgeted. You are essentially "paying to work" for some clients, and you might not even know it.',
    relatedProblems: ["dont-know-costs", "scope-creep-profit"],
    impactAnalysis: {
      financialImpact: 'Negative project margins; cash flow drain; inability to reinvest.',
      severity: "Critical",
      affectedAreas: ["Profitability", "Cash Flow", "Business Viability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Hard",
      quickWins: ["Audit the last 3 projects for "Actual vs Quote" today", "Raise your next quote by 20% to build in a buffer", "Track all "Internal" labor costs per project"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor cost estimation", "Unbilled scope creep", "High rework labor"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Budget Alerts" that lock down a project when it hits 90% of its estimated costs.'
      },
      pathToRoot: 'Profit Drain → No Project Tracking → Project Management Issues'
    }
  },
  'unreasonable-expectations': {
    explanation: 'Your clients want the "World for a Dollar.' You haven't educated them on what is possible or realistic, so they are constantly disappointed even when you deliver well.',
    relatedProblems: ["expectations-misaligned", "bad-fit-services"],
    impactAnalysis: {
      financialImpact: 'High churn; constant demands for free extras; team demoralization.',
      severity: "Major",
      affectedAreas: ["Client Satisfaction", "Team Morale", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month (Sales reset)",
      difficulty: "Medium",
      quickWins: ["Add a "Realistic Results" slide to your sales deck", "Fire the client who refuses to accept reality", "Clearly define "Out-of-Scope' during kickoff"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-selling in sales", "Targeting "Entitled" segments', "Lack of authoritative positioning"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Success Benchmarks" that show the client how their results compare to industry averages.'
      },
      pathToRoot: 'Education Failure → Difficult Clients → Client Management Issues'
    }
  },
  'constant-changes': {
    explanation: 'The client can"t make up their mind. Every week they pivot the goal, which forces your team into a loop of 'Start-Stop-Start,' destroying efficiency.',
    relatedProblems: ["scope-creep-accepted", "timelines-slip"],
    impactAnalysis: {
      financialImpact: 'Massive labor waste; profit margin collapse; team burnout.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Team Morale", "Gross Margin"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Change fees)",
      difficulty: "Medium",
      quickWins: ["Implement a mandatory "Change Fee" today", "Pause work until the client provides a final brief", "Limit the number of "Pivots" allowed per phase"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of client conviction", "Vague initial agreement", "Passive management"],
      automationPotential: {
        rating: "Medium",
        example: 'Using interactive "Approval Loops" where a change isn't accepted until the client clicks 'Agree to New Fee'.'
      },
      pathToRoot: 'Indecision Loop → Difficult Clients → Client Management Issues'
    }
  },
  'poor-communication-client': {
    explanation: 'The client is "Ghosting" you or giving vague, unhelpful feedback. You are spending more time 'Chasing' them than 'Working' for them.',
    relatedProblems: ["client-delays-pm", "waiting-feedback"],
    impactAnalysis: {
      financialImpact: 'Project stagnation; delayed revenue; team frustration.',
      severity: "Moderate",
      affectedAreas: ["Operations", "Speed", "Cash Flow"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Define "Rules of Communication" today", "Use a "Single Thread" for all project info", "Give the client a "Communication Score" in your weekly internal review"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Wrong point-of-contact", "Client overwhelmed", "Lack of communication systems"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Deadline" pings that notify the client"s manager if they don't respond.'
      },
      pathToRoot: 'Communication Lag → Difficult Clients → Client Management Issues'
    }
  },
  'dont-respect-boundaries': {
    explanation: 'Clients are emailing you at 10 PM, texting your personal phone, or demanding "Emergency" work for "Non-emergency' issues. You have lost control of the relationship.',
    relatedProblems: ["available-24-7", "working-too-much"],
    impactAnalysis: {
      financialImpact: 'Extreme founder burnout; team demotivation; unsustainable operations.',
      severity: "Major",
      affectedAreas: ["Founder Health", "Team Culture", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week (Reset)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Delete client Slack/Email from your phone today", "Stop answering personal texts for work", "Send a "Working Hours" update to all clients"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["People-pleasing founder", "Lack of professional onboarding", "Scarcity mindset"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Out of Office" responders that only trigger for clients after hours.'
      },
      pathToRoot: 'Boundary Collapse → Difficult Clients → Client Management Issues'
    }
  },
  'late-responsibilities': {
    explanation: 'The client isn"t giving you the data, login, or files you need to start. Your team is sitting idle while the clock is ticking, and the client still expects an 'On-Time' delivery.',
    relatedProblems: ["client-delays-pm", "underbooking"],
    impactAnalysis: {
      financialImpact: 'Wasted labor capacity; delayed final payment; high stress.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Cash Flow", "Team Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Use an "Onboarding Portal" (e.g., Content Snare) to collect files", "Stop work until all assets are received", "Add a "Day-for-Day' delay rule to your contract today"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Managing assets via email", "Lack of "Prerequisite" rules', "Passive onboarding"],
      automationPotential: {
        rating: "High",
        example: 'Automated asset gathering tools that remind the client every 12 hours until the upload is 100% complete.'
      },
      pathToRoot: 'Asset Stalls → Difficult Clients → Client Management Issues'
    }
  },
  'abusive': {
    explanation: 'The client is rude, aggressive, or belittling to you or your team. This is a toxic influence that destroys team morale and has zero place in a professional business.',
    relatedProblems: ["team-unreliable", "bad-fit-services"],
    impactAnalysis: {
      financialImpact: 'High risk of team turnover; founder health collapse; negative brand energy.',
      severity: "Critical",
      affectedAreas: ["Team Culture", "Founder Health", "Employee Retention"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Fire them)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Fire your most abusive client today", "Implement a "No-Assholes' policy for future leads", "Tell your team you have their back and won"t tolerate it"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of client vetting", "Scarcity mindset (taking anyone with money)', "Weak leadership"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this requires a firm leadership decision.'
      },
      pathToRoot: 'Toxic Account → Difficult Clients → Client Management Issues'
    }
  },
  'bad-fit-services': {
    explanation: 'You sold them something they don"t actually need, or your service won't solve their specific version of the problem. You've set yourselves up for failure from day one.',
    relatedProblems: ["wrong-clients", "product-market-mismatch"],
    impactAnalysis: {
      financialImpact: '100% Churn; negative brand reputation; high support/rework costs.',
      severity: "Major",
      affectedAreas: ["Brand Reputation", "LTV", "Team Pride"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Say "No")",
      difficulty: "Medium",
      quickWins: ["Tighten your sales qualification form today", "Clearly define your "Anti-Offer'", "Stop incentivizing sales reps on "Revenue" and start on "Retention'"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling for the commission/cash", "Weak understanding of ICP", "Broad positioning"],
      automationPotential: {
        rating: "High",
        example: 'Using AI lead-scoring to auto-reject any prospect that doesn"t fit your core success criteria.'
      },
      pathToRoot: 'Strategy Mismatch → Wrong Clients → Client Management Issues'
    }
  },
  'cant-afford-pricing': {
    explanation: 'You are targeting prospects who are "Cash-Poor.' They will haggle over every dollar, demand more 'Value' for less 'Price,' and will be the first to churn when things get tight.',
    relatedProblems: ["price-objection", "market-too-small"],
    impactAnalysis: {
      financialImpact: 'Compressed margins; constant haggling; high churn risk.',
      severity: "Major",
      affectedAreas: ["Profitability", "LTV", "Sales ROI"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months (Market shift)",
      difficulty: "Hard",
      quickWins: ["Add a "Minimum Revenue" field to your lead form", "Double your prices for the next lead to test the market", "Refer low-budget leads to a "Productized" cheaper alternative"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Targeting small/new businesses", "Fear of competing at the high-end', "Poor value anchoring"],
      automationPotential: {
        rating: "Medium",
        example: 'Using business data tools (e.g., ZoomInfo, Apollo) to automatically verify lead revenue before you call.'
      },
      pathToRoot: 'Budget Mismatch → Wrong Clients → Client Management Issues'
    }
  },
  'dont-value': {
    explanation: 'The client sees you as a "Cost" to be minimized, not an 'Investment' to be maximized. They don't respect your expertise and will treat you like a commodity vendor.',
    relatedProblems: ["commoditized-service", "undervalue-expertise"],
    impactAnalysis: {
      financialImpact: 'Low pricing power; constant threat of replacement; zero strategic leverage.',
      severity: "Major",
      affectedAreas: ["Pricing Power", "Strategic Positioning", "LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months (Positioning)",
      difficulty: "Hard",
      quickWins: ["Stop itemizing your invoices by "Hours"", "Publish an "Expert" whitepaper or case study this week", "Only speak to the "Decision Maker,' never the 'User'"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical jargon selling", "Commoditized offer", "Lack of authority proof"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to analyze your brand voice and ensuring it sounds like an "Advisor" not a "Vendor'.'
      },
      pathToRoot: 'Perception Failure → Wrong Clients → Client Management Issues'
    }
  },
  'high-maintenance-low-profit': {
    explanation: 'The "Nightmare Client.' They take 80% of your support time but only provide 5% of your profit. They are subsidizing their business with your team's unpaid labor.',
    relatedProblems: ["scope-creep-profit", "difficult-clients"],
    impactAnalysis: {
      financialImpact: 'Extreme drain on team resources; negative net margin on the account.',
      severity: "Critical",
      affectedAreas: ["Profitability", "Team Capacity", "Mental Health"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Fire them)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Run an "Account Profitability" report today", "Fire the bottom 10% of clients by margin", "Raise prices for "Maintenance" tasks for remaining clients"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of "Cost-per-Account' tracking', "People-pleasing founder', "Vague boundaries"],
      automationPotential: {
        rating: "High",
        example: 'Using automated time-tracking per client to show a "Net Profit" dashboard for every account.'
      },
      pathToRoot: 'Profit Leak → Wrong Clients → Client Management Issues'
    }
  },
  'misaligned-values': {
    explanation: 'You and the client simply don"t see the world the same way. Whether it's ethics, speed of work, or communication style, the mismatch creates constant friction and a 'heavy' feeling to the work.',
    relatedProblems: ["bad-fit-services", "relationship-deteriorated"],
    impactAnalysis: {
      financialImpact: 'High management friction; slow-motion churn; team demotivation.',
      severity: "Moderate",
      affectedAreas: ["Team Morale", "Operations", "LTV"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate (Vetting fix)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Define your "Core Values" today", "Add a "Values Check" question to your sales process", "Part ways with one client who feels "Heavy""],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Taking anyone with money", "Lack of company identity", "No sales filters"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - values are a human-to-human match.'
      },
      pathToRoot: 'Cultural Mismatch → Wrong Clients → Client Management Issues'
    }
  },
  'available-24-7': {
    explanation: 'You have trained your clients that they can reach you at any time. By responding to that 9 PM text, you"ve set a standard that you can never sustain.',
    relatedProblems: ["dont-respect-boundaries", "working-too-much"],
    impactAnalysis: {
      financialImpact: 'Zero operational leverage; extreme founder burnout; unscalable delivery.',
      severity: "Major",
      affectedAreas: ["Founder Health", "Team Autonomy", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week (Reset)",
      difficulty: "Mindset",
      quickWins: ["Stop answering all non-emergency calls after 6 PM today", "Use "Scheduled Send" for your late-night emails", "Remove work apps from your phone"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Anxiety about losing deals", "Lack of other hobbies/identity', "Hero complex"],
      automationPotential: {
        rating: "High",
        example: 'Using automated "After Hours" responders that route emergencies to a dedicated system and others to tomorrow.'
      },
      pathToRoot: 'Availability Trap → No Client Boundaries → Client Management Issues'
    }
  },
  'scope-creep-accepted': {
    explanation: 'You know they are asking for more, but you say "Sure" anyway without asking for money. You are undervaluing your team's time and training the client to keep asking.',
    relatedProblems: ["afraid-charge-changes", "clients-ask-more"],
    impactAnalysis: {
      financialImpact: 'Direct profit margin loss; team frustration; increased "Bespoke" complexity.',
      severity: "Major",
      affectedAreas: ["Profitability", "Efficiency", "Accountability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Change fee)",
      difficulty: "Medium",
      quickWins: ["Use the phrase: "We can definitely do that, let me send you the quote for it' today", "Refer to the original brief in every review", "Empower your team to say "No""],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of being "Mean", "Undervaluing your time", "No formal change process"],
      automationPotential: {
        rating: "High",
        example: 'Using "Add-on' modules in your PM tool that require a payment before the task is visible to the team.'
      },
      pathToRoot: 'Value Leaks → No Client Boundaries → Client Management Issues'
    }
  },
  'allow-bad-behavior': {
    explanation: 'You tolerate late payments, rude emails, or missed meetings. By allowing it once, you"ve made it the "New Normal' for that account.',
    relatedProblems: ["abusive", "clients-pay-late"],
    impactAnalysis: {
      financialImpact: 'Cash flow instability; team demoralization; loss of authority.',
      severity: "Major",
      affectedAreas: ["Operations", "Team Morale", "Cash Flow"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week (Policy reset)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Implement an "Automatic Pause" rule for late payers today", "Address one instance of "Bad Behavior" immediately and professionally", "Fire the repeat offender"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Scarcity mindset", "Low self-esteem as a business', "Passive management"],
      automationPotential: {
        rating: "High",
        example: 'Using automated dunning systems that lock account access until payment is cleared.'
      },
      pathToRoot: 'Standard Failure → No Client Boundaries → Client Management Issues'
    }
  },
  'cant-say-no': {
    explanation: 'The "Pleaser" mindset. You take every project, every deadline, and every request because you're afraid of the word 'No.' You are building a business based on other people's needs, not your goals.',
    relatedProblems: ["saying-yes-everything", "overcommitting"],
    impactAnalysis: {
      financialImpact: 'Strategic drift; profit margin collapse; extreme burnout.',
      severity: "Critical",
      affectedAreas: ["Scalability", "Founder Health", "Strategic Vision"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Mindset shift)",
      difficulty: "Mindset",
      quickWins: ["Say "No" to the next project that doesn"t feel right", "Define your "Perfect Client" profile today", "Set a "No-Sales' day once a week"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Scarcity mindset", "Need for external validation", "Lack of long-term goals"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a core leadership and personal hurdle.'
      },
      pathToRoot: 'People Pleasing → No Client Boundaries → Client Management Issues'
    }
  },
  'cant-say-no': {
    explanation: 'The "Pleaser" mindset. You take every project, every deadline, and every request because you're afraid of the word 'No.' You are building a business based on other people's needs, not your goals.',
    relatedProblems: ["saying-yes-everything", "overcommitting"],
    impactAnalysis: {
      financialImpact: 'Strategic drift; profit margin collapse; extreme burnout.',
      severity: "Critical",
      affectedAreas: ["Scalability", "Founder Health", "Strategic Vision"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate (Mindset shift)",
      difficulty: "Mindset",
      quickWins: ["Say "No" to the next project that doesn"t feel right", "Define your "Perfect Client" profile today", "Set a "No-Sales' day once a week"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Scarcity mindset", "Need for external validation", "Lack of long-term goals"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a core leadership and personal hurdle.'
      },
      pathToRoot: 'People Pleasing → No Client Boundaries → Client Management Issues'
    }
  },
  'work-others-cheaper': {
    explanation: 'You are doing tasks that you could pay someone $20/hour to do, while your own time is worth $200/hour. You are effectively "losing" $180 every hour you spend on low-value work.',
    relatedProblems: ["admin-busywork", "time-trapped"],
    impactAnalysis: {
      financialImpact: 'Massive opportunity cost; negative ROI on founder time.',
      severity: "Major",
      affectedAreas: ["Profitability", "Founder Throughput", "Growth Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Identify 3 tasks to outsource today", "Hire a VA for 5 hours a week this month", "Calculate your "Founder Hourly Rate""],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Scarcity mindset", "Lack of delegation skills", "Hero complex"],
      automationPotential: {
        rating: "High",
        example: 'Using AI or low-cost contractors to handle the "Routine" layer of the business.'
      },
      pathToRoot: 'Labor Inefficiency → Doing Low-Value Work → Time Trapped'
    }
  },
  'busy-not-revenue': {
    explanation: 'You are "Busy" all day but your bank account isn"t growing. You are confusing 'Movement' with 'Progress.' You are likely avoiding the high-leverage sales or product work that actually moves the needle.',
    relatedProblems: ["poor-prioritization", "everything-urgent"],
    impactAnalysis: {
      financialImpact: 'Stagnant revenue; wasted labor capacity; strategic drift.',
      severity: "Major",
      affectedAreas: ["Revenue Growth", "Efficiency", "Strategic Vision"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 day (Priority shift)",
      difficulty: "Medium",
      quickWins: ["List your tasks today and label them "Revenue" or "Non-Revenue'", "Do one "Revenue" task first thing tomorrow morning", "Cancel one "Busy" meeting today"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Procrastination on difficult tasks", "Lack of clear revenue targets", "Reactive habits"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to track your calendar and flagging how much time is spent on "Growth" vs "Admin'.'
      },
      pathToRoot: 'Activity Trap → Doing Low-Value Work → Time Trapped'
    }
  },
  'firefighting-not-building': {
    explanation: 'You spend 90% of your time fixing mistakes or handling crises. You have zero time to build the systems that would stop the fires from starting in the first place.',
    relatedProblems: ["everything-urgent", "firefighting"],
    impactAnalysis: {
      financialImpact: 'High operational waste; founder burnout; zero scalability.',
      severity: "Critical",
      affectedAreas: ["Founder Mental Health", "Operations", "Strategic Growth"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months (Mindset/Process shift)",
      difficulty: "Hard",
      quickWins: ["Fix the #1 recurring fire permanently today", "Block 1 hour a day for "System Building" only", "Accept that some small fires might burn while you build"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of systems", "No operational buffers", "Hero complex"],
      automationPotential: {
        rating: "Medium",
        example: 'Using automated monitoring and alerts to catch "Smoldering" issues before they become "Fires'.'
      },
      pathToRoot: 'Crisis Mode → Doing Low-Value Work → Time Trapped'
    }
  },
  'easier-do-myself': {
    explanation: 'The "Expert Trap.' You believe that explaining it takes longer than doing it. This is true for today, but false for the next 5 years. By doing it yourself, you ensure you will *always* have to do it yourself.',
    relatedProblems: ["cant-delegate", "afraid-let-go"],
    impactAnalysis: {
      financialImpact: 'Capped revenue; zero business valuation; extreme opportunity cost.',
      severity: "Critical",
      affectedAreas: ["Scalability", "Founder Health", "Team Growth"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month (Mindset shift)",
      difficulty: "Mindset",
      quickWins: ["Record yourself doing the task once (Loom)", "Accept a "B+' result from a team member today", "Invest 2 hours in training someone now to save 100 hours this year"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Short-term thinking", "Perfectionism", "Expert blindness"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to "Extract" your process as you do it, creating a draft SOP for others to follow.'
      },
      pathToRoot: 'Short-termism → Cant Delegate → Time Trapped'
    }
  },
  'no-one-delegate': {
    explanation: 'You have no team, or your team is already at 100% capacity. You want to offload work, but there is "No one to catch the ball.'',
    relatedProblems: ["cant-afford-hire", "not-enough-capacity"],
    impactAnalysis: {
      financialImpact: 'Growth is linear to founder hours; zero resilience; high burnout risk.',
      severity: "Major",
      affectedAreas: ["Capacity", "Founder Peace of Mind", "Business Value"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 months (Hiring)",
      difficulty: "Hard",
      quickWins: ["Hire a freelancer for a 10-hour project today", "Audit your tasks to see if 20% can be "Automated" instead of delegated", "Post a part-time VA role this week"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Under-investing in labor", "Thin margins", "Fear of management"],
      automationPotential: {
        rating: "High",
        example: 'Using AI "Agents" to act as your first "Digital Employees' for basic tasks.'
      },
      pathToRoot: 'Missing Team → Cant Delegate → Time Trapped'
    }
  },
  'dont-know-how-delegate': {
    explanation: 'You give vague instructions and then get frustrated when the result is wrong. You don"t have a "Delegation Framework,' so you default back to doing it yourself.',
    relatedProblems: ["havent-trained", "no-sops"],
    impactAnalysis: {
      financialImpact: 'High rework labor; team demotivation; founder bottlenecking.',
      severity: "Moderate",
      affectedAreas: ["Team ROI", "Operations", "Scalability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Use the "5 Levels of Delegation' framework today", "Specify the "Definition of Done" for every task", "Ask the team to repeat instructions back to you"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of management training", "Poor communication habits", "Rushing"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to "Polish" your rough instructions into a detailed project brief.'
      },
      pathToRoot: 'Skill Gap → Cant Delegate → Time Trapped'
    }
  },
  'micromanagement': {
    explanation: 'You are checking every email, every pixel, and every line of code. You are paying for a team but still doing their jobs for them. This kills trust and prevents your team from growing.',
    relatedProblems: ["afraid-let-go", "dont-trust-others"],
    impactAnalysis: {
      financialImpact: 'Diminishing returns on team labor; high turnover of high-performers; founder burnout.',
      severity: "Critical",
      affectedAreas: ["Team Culture", "Founder Throughput", "Retention"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months (Mindset/Culture)",
      difficulty: "Mindset",
      quickWins: ["Stop attending one "Internal" meeting today", "Set a "No-Check' limit for projects < $X", "Focus on "Output" KPIs, not 'How' they did it"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Perfectionism", "Anxiety about quality", "Lack of trust in systems"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - micromanagement is a leadership behavior.'
      },
      pathToRoot: 'Need for Control → Cant Delegate → Time Trapped'
    }
  },
  'cant-hand-off': {
    explanation: 'You"ve built a project, but you can't hand it over to the client or the next team member without a 3-hour meeting. The 'Knowledge Gap' is too wide at the transition point.',
    relatedProblems: ["everything-founders-head", "explain-every-time"],
    impactAnalysis: {
      financialImpact: 'Project "Tail" drags on; unbilled support hours; high friction.',
      severity: "Moderate",
      affectedAreas: ["Efficiency", "Client Experience", "Project Payout"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Create a "Client Handover" portal today", "Standardize the project completion checklist", "Record a video "Walkthrough" instead of a live call"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of "Deliverable" standards", "Poor documentation", "Expert blindness"],
      automationPotential: {
        rating: "High",
        example: 'Automated "Onboarding/Offboarding' flows that deliver all docs and logins instantly.'
      },
      pathToRoot: 'Transition Failure → No Processes → Time Trapped'
    }
  },
  'explain-every-time': {
    explanation: 'You are answering the same questions over and over. You are a "Human Help Desk.' This is a sign that you lack a central knowledge base or that your team hasn't been trained to look for answers themselves.',
    relatedProblems: ["tribal-knowledge", "no-sops"],
    impactAnalysis: {
      financialImpact: 'Massive hidden time waste; high cognitive load; slow team speed.',
      severity: "Major",
      affectedAreas: ["Founder Productivity", "Team Autonomy", "Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Create a "Frequently Asked Questions" wiki today", "Stop answering questions that are already in the wiki", "Record every answer as a Loom video"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Managing via DM", "Lack of searchable docs", "Hero complex"],
      automationPotential: {
        rating: "High",
        example: 'AI chatbots (e.g., Guru, CustomGPT) that index your SOPs and answer team questions 24/7.'
      },
      pathToRoot: 'Repetitive Support → No Processes → Time Trapped'
    }
  },
  'knowledge-not-transferable': {
    explanation: 'Your expertise is "Magic.' It's based on intuition or 20 years of experience that you haven't broken down into steps. This makes you impossible to replace and the business impossible to sell.',
    relatedProblems: ["service-complex", "tribal-knowledge"],
    impactAnalysis: {
      financialImpact: 'Zero business valuation; zero scalability; high risk if you leave.',
      severity: "Critical",
      affectedAreas: ["Asset Value", "Scalability", "Risk Management"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Identify the "First 20%' of your intuition that can be coded", "Hire a "Writer" to interview you and document your brain", "Create a "Decision Tree" for your most complex task"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Expert blindness", "Undervaluing process", "Complex service model"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to "Model" your decision making by analyzing your past work results and finding patterns.'
      },
      pathToRoot: 'Magic Trap → No Processes → Time Trapped'
    }
  },
  'no-systems-organization': {
    explanation: 'You have no "Operating System" for your business. There is no central place for tasks, files, or communication. You are managing a multi-million dollar potential with a 'Mom and Pop' setup.',
    relatedProblems: ["no-crm-pm", "communication-mess"],
    impactAnalysis: {
      financialImpact: 'Invisible efficiency leaks; high stress; impossible to manage a team larger than 3.',
      severity: "Major",
      affectedAreas: ["Operations", "Founder Peace of Mind", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Choose ONE tool for tasks, ONE for files, ONE for chat today", "Forbid "Work outside the system"", "Migrate your top 3 projects to the new system this week"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Organic growth without infrastructure planning", "Lack of operational discipline", "Tool overwhelm"],
      automationPotential: {
        rating: "High",
        example: 'Building a central "Operating System" in Notion or Airtable that links all business functions.'
      },
      pathToRoot: 'Infrastructure Gap → Disorganized → Personal Bottlenecks'
    }
  },
  'messy-files': {
    explanation: 'Your digital documents are scattered across GDrive, Dropbox, Desktop, and Email. You are losing hours a month just "Searching" for the right version of a file.',
    relatedProblems: ["cant-find-things", "duplicate-work"],
    impactAnalysis: {
      financialImpact: 'Labor waste; high risk of sending wrong version to client; data security risk.',
      severity: "Moderate",
      affectedAreas: ["Efficiency", "Accuracy", "Professionalism"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Adopt a "Standard Naming Convention" today", "Delete all old versions of files", "Move everything into a single, structured cloud drive today"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of folder structure", "Saving to desktop habits", "No file versioning system"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to automatically tag and sort files based on their content.'
      },
      pathToRoot: 'Digital Chaos → No Systems/Org → Disorganized'
    }
  },
  'no-task-management': {
    explanation: 'You are managing your To-Do list in your head, email, or Slack DMs. This creates constant "Mental Noise" and ensures that small but important things will be forgotten.',
    relatedProblems: ["everything-urgent", "things-fall-through"],
    impactAnalysis: {
      financialImpact: 'Missed sales follow-ups; delayed projects; team confusion.',
      severity: "Major",
      affectedAreas: ["Execution Speed", "Mental Clarity", "Founder Throughput"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Move all tasks into ONE tool (Asana, ClickUp, Todoist) today", "Empty your brain onto that list tonight", "Delete all "Mental" To-Dos"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Relying on memory", "Informal habits", "Aversion to structure"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to "Extract" tasks from your Slack messages and auto-add them to your PM tool.'
      },
      pathToRoot: 'Mental Overload → No Systems/Org → Disorganized'
    }
  },
  'sticky-notes-everywhere': {
    explanation: 'Managing a business via physical notes or random text files. This information is non-searchable, non-sharable, and easily lost. It"s "Analog management' in a 'Digital world.'',
    relatedProblems: ["no-task-management", "messy-files"],
    impactAnalysis: {
      financialImpact: 'Hidden inefficiencies; impossible to delegate; zero data historical value.',
      severity: "Moderate",
      affectedAreas: ["Operations", "Founder Peace of Mind", "Collaboration"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Transcribe all current sticky notes into your task tool today", "Throw away all the paper notes", "Set a "Digital First" rule for all new info"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Legacy habits", "Tactile preference over efficiency", "Fear of digital tools"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI OCR to scan and digitize physical notes instantly into your central system.'
      },
      pathToRoot: 'Analog Trap → No Systems/Org → Disorganized'
    }
  },
  'cant-find-things': {
    explanation: 'The "Where is that?' problem. You spend 15% of your day searching for logins, files, emails, or links. This is pure 'Friction' that adds zero value to your clients.',
    relatedProblems: ["messy-files", "no-task-management"],
    impactAnalysis: {
      financialImpact: 'Direct labor waste; high frustration; slow response times.',
      severity: "Moderate",
      affectedAreas: ["Efficiency", "Professionalism", "Speed"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Setup a password manager (1Password) today", "Create a "Core Links" document for the team", "Archive anything older than 6 months"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of single source of truth", "Tool fragmentation", "Disorganized digital habits"],
      automationPotential: {
        rating: "High",
        example: 'Using "Unified Search" tools (e.g., Glean, Raycast) to search across all your apps at once.'
      },
      pathToRoot: 'Friction → No Systems/Org → Disorganized'
    }
  },
  'duplicate-work': {
    explanation: 'You or your team are re-doing work that has already been done because nobody can find the original, or nobody knew it existed. This is 100% wasted labor.',
    relatedProblems: ["messy-files", "internal-miscommunication"],
    impactAnalysis: {
      financialImpact: 'Pure margin drain; negative ROI on payroll; team demotivation.',
      severity: "Major",
      affectedAreas: ["Profitability", "Efficiency", "Team Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Create a "Knowledge Base" of past projects today", "Search the system *before* starting anything new", "Hold a weekly "What we did" demo to share work across the team"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of central repository", "Siloed projects", "Poor internal communication"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to flag "Similar Projects" when a new task is created, preventing redundant work.'
      },
      pathToRoot: 'Redundancy → No Systems/Org → Disorganized'
    }
  },
  'poor-prioritization': {
    explanation: 'You are doing the "Easiest" things first, not the 'Most Important' things. You are crossing things off a list but not moving the business forward.',
    relatedProblems: ["busy-not-revenue", "everything-urgent"],
    impactAnalysis: {
      financialImpact: 'Opportunity cost of delayed growth; strategic stagnation; high burnout.',
      severity: "Major",
      affectedAreas: ["Growth Velocity", "Strategic Vision", "Founder Peace of Mind"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 day (Framework)",
      difficulty: "Medium",
      quickWins: ["Use the Eisenhower Matrix today", "Choose ONE "Big Lever" for the week", "Say "No" to 3 minor tasks this morning"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of clear goals", "Reactive mindset", "Dopamine seeking (small wins)"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to auto-sort your task list based on "Impact" vs "Effort' scores.'
      },
      pathToRoot: 'Strategic Failure → Disorganized → Personal Bottlenecks'
    }
  },
  'cant-say-no-personal': {
    explanation: 'You agree to every meeting, every "Quick Call,' and every random opportunity. Your calendar is full of other people's priorities, leaving no room for your own.',
    relatedProblems: ["cant-say-no", "email-meeting-overload"],
    impactAnalysis: {
      financialImpact: 'Zero time for high-value strategic work; slow decision making.',
      severity: "Major",
      affectedAreas: ["Founder Throughput", "Growth Rate", "Mental Health"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 day (Mindset)",
      difficulty: "Mindset",
      quickWins: ["Set your "Default" answer to "No'", "Charge for your time for "Quick Calls"", "Block "Maker Time" on your calendar today"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["People-pleasing", "FOMO (Fear of Missing Out)', "Lack of boundary setting"],
      automationPotential: {
        rating: "High",
        example: 'Using automated scheduling rules that only allow meetings during specific "Open" windows.'
      },
      pathToRoot: 'Boundary Failure → Poor Prioritization → Disorganized'
    }
  },
  'reactive-not-proactive': {
    explanation: 'You are waiting for things to happen and then responding to them. You are "Playing Defense" all day. You have no control over the direction of the business.',
    relatedProblems: ["firefighting", "everything-urgent"],
    impactAnalysis: {
      financialImpact: 'Linear growth at best; high risk of being blindsided by market shifts.',
      severity: "Major",
      affectedAreas: ["Leadership", "Strategic Growth", "Sustainability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months (Mindset shift)",
      difficulty: "Hard",
      quickWins: ["Block 90 mins of "Strategy Time" first thing tomorrow", "Fix one "Root Cause" today", "Stop checking Slack/Email for the first hour of work"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of long-term vision", "Under-staffing (no buffer)', "Hero complex"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI "Forecasting" to predict future problems so you can solve them pro-actively.'
      },
      pathToRoot: 'Defense Mode → Poor Prioritization → Disorganized'
    }
  },
  'no-clear-goals': {
    explanation: 'You don"t know where you"re going, so any road will take you there. Without clear 'North Star' metrics, your team is pulling in different directions.',
    relatedProblems: ["poor-prioritization", "strategic-priority"],
    impactAnalysis: {
      financialImpact: 'Wasted labor spend; high opportunity cost; team confusion.',
      severity: "Critical",
      affectedAreas: ["Strategic Vision", "Team Alignment", "Growth Velocity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Medium",
      quickWins: ["Define your "One Big Number" for the year today", "Communicate 3 core objectives to the team this week", "Set a "Stop List" of things you'll no longer do"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of commitment to a niche", "Lack of strategic planning", "Shiny object syndrome"],
      automationPotential: {
        rating: "High",
        example: 'Using OKR tracking software (e.g., Koan, Perdoo) to keep the team focused on goals automatically.'
      },
      pathToRoot: 'Direction Failure → Poor Prioritization → Disorganized'
    }
  },
  'shiny-object-syndrome': {
    explanation: 'You are constantly pivoting to the "Next Big Thing" before the current thing has even worked. You have 10 projects at 10% completion and zero at 100%.',
    relatedProblems: ["poor-prioritization", "overcommitting"],
    impactAnalysis: {
      financialImpact: 'Massive waste of R&D and founder time; zero "Momentum" revenue.',
      severity: "Major",
      affectedAreas: ["Execution", "Strategic Vision", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing (Mindset shift)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Forbid all "New Ideas" for the next 30 days", "Finish the #1 most-complete project this week", "Keep an "Ideas" list but don"t act on them"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Entrepreneurial ADD", "Fear of failure (pivoting as a defense)', "Low attention span"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a core founder discipline issue.'
      },
      pathToRoot: 'Focus Failure → Poor Prioritization → Disorganized'
    }
  },
  'no-calendar-system': {
    explanation: 'You are managing your time by "Feeling.' You have no visual map of your day, which leads to double-booking, missed calls, and zero focus time.',
    relatedProblems: ["overcommitting-personal", "constantly-late"],
    impactAnalysis: {
      financialImpact: 'Missed sales leads; high stress; unprofessional brand image.',
      severity: "Moderate",
      affectedAreas: ["Time Efficiency", "Professionalism", "Mental Clarity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Move all appointments to a digital calendar (GCal/Outlook) today", "Setup an automated scheduler (Calendly)", "Block out your lunch and sleep times today"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Informal habits", "Managing via memory", "Lack of structure"],
      automationPotential: {
        rating: "High",
        example: 'Using AI schedulers (e.g., Reclaim.ai, Clockwise) to auto-optimize your day for focus.'
      },
      pathToRoot: 'Time Chaos → Time Management Broken → Disorganized'
    }
  },
  'overcommitting-personal': {
    explanation: 'You say "Yes" to more than you can physically do in 24 hours. You are constantly 'Under Water,' which leads to poor quality work and high anxiety.',
    relatedProblems: ["cant-say-no-personal", "working-too-much"],
    impactAnalysis: {
      financialImpact: 'Burnout risk; diminished returns on labor; error-prone decisions.',
      severity: "Major",
      affectedAreas: ["Founder Health", "Quality", "Sustainability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week (Reset)",
      difficulty: "Mindset",
      quickWins: ["Cancel 20% of your meetings for next week today", "Add a "Buffer" between every appointment", "Practice saying: "I"d love to, but I'm at capacity right now'"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Optimism bias", "People-pleasing', "Lack of time-budgeting"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to analyze your task list and flagging when it exceeds your available hours.'
      },
      pathToRoot: 'Overload → Time Management Broken → Disorganized'
    }
  },
  'constantly-late': {
    explanation: 'Being late to meetings or deadlines is a sign of "Time Optimism.' It erodes your professional authority and creates a culture of lateness in your team.',
    relatedProblems: ["no-calendar-system", "poor-boundaries"],
    impactAnalysis: {
      financialImpact: 'Damage to brand reputation; increased client price-sensitivity; team demotivation.',
      severity: "Moderate",
      affectedAreas: ["Professionalism", "Team Culture", "Client Trust"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week (Habit shift)",
      difficulty: "Easy",
      quickWins: ["Set all calendar alerts to 10 mins before", "Standardize 25 or 50-minute meetings (not 30/60)", "Assume every task takes 2x longer than you think"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Planning fallacy", "Adrenaline seeking", "Lack of buffers"],
      automationPotential: {
        rating: "High",
        example: 'Using "Buffer Time" automation that auto-adds 10 mins of travel/prep between every meeting.'
      },
      pathToRoot: 'Reliability Failure → Time Management Broken → Disorganized'
    }
  },
  'no-time-blocking': {
    explanation: 'You work on whatever "Pings" you first. Without dedicated blocks for 'Deep Work,' you never finish the complex strategic tasks that actually scale the business.',
    relatedProblems: ["interruptions-constant", "low-value-work"],
    impactAnalysis: {
      financialImpact: 'Massive hidden time waste; high cognitive load; zero strategic progress.',
      severity: "Major",
      affectedAreas: ["Productivity", "Strategic Growth", "Mental Clarity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Block 9 AM - 11 AM tomorrow for "No-Slack' work", "Group all your "Quick Calls" into a single afternoon block", "Set "Focus Mode" on your laptop"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Reactive culture", "Lack of discipline", "Tool distraction"],
      automationPotential: {
        rating: "High",
        example: 'AI calendar tools that "Shield" your focus time by auto-declining conflicting meetings.'
      },
      pathToRoot: 'Focus Failure → Time Management Broken → Disorganized'
    }
  },
  'interruptions-constant': {
    explanation: 'Slack, Email, and Team "Quick Questions" are the 'Death by a thousand cuts' for your productivity. Every interruption costs you 20 mins of recovery time.',
    relatedProblems: ["email-meeting-overload", "everything-urgent"],
    impactAnalysis: {
      financialImpact: ' Massive labor waste; high error rate; founder burnout.',
      severity: "Major",
      affectedAreas: ["Efficiency", "Mental Health", "Decision Quality"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week (Policy change)",
      difficulty: "Medium",
      quickWins: ["Turn off Slack/Email notifications today", "Set "Office Hours" for team questions", "Switch to async communication for non-emergencies"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Synchronous culture", "Lack of SOPs (people need to ask how)', "Poor boundaries"],
      automationPotential: {
        rating: "High",
        example: 'AI triage bots that answer basic team questions so they don"t hit the founder.'
      },
      pathToRoot: 'Distraction Loop → Time Management Broken → Disorganized'
    }
  },
  'communication-mess': {
    explanation: 'Messages are scattered across Email, Slack, WhatsApp, and Phone. You are losing information and spending hours a week just "Consolidating" conversations.',
    relatedProblems: ["multiple-channels-mess", "losing-important-messages"],
    impactAnalysis: {
      financialImpact: 'Missed sales leads; delayed project approvals; team anxiety.',
      severity: "Major",
      affectedAreas: ["Operations", "Sales Velocity", "Team Alignment"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Pick ONE tool for internal and ONE for external comms today", "Delete work apps that don"t belong (e.g., WhatsApp for work)", "Forbid "Important decisions" via DM"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Organic tool bloat", "Lack of communication rules", "Urgency culture"],
      automationPotential: {
        rating: "High",
        example: 'Using "Omni-channel' hubs that pull all messages into a single, searchable stream.'
      },
      pathToRoot: 'Information Chaos → Communication Chaos → Disorganized'
    }
  },
  'multiple-channels-mess': {
    explanation: 'You have too many ways to be reached. This creates "Inbox Anxiety" and ensures that you will miss something critical because you didn't check 'Channel #5' today.',
    relatedProblems: ["communication-mess", "inbox-overflowing"],
    impactAnalysis: {
      financialImpact: 'Extreme cognitive load; labor waste searching across apps; missed deadlines.',
      severity: "Moderate",
      affectedAreas: ["Mental Clarity", "Efficiency", "Speed"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Shut down 2 communication channels today", "Point all clients to a single "Help Desk" email", "Set "Do Not Disturb" on non-core apps"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-connectedness", "Lack of customer onboarding rules", "Fear of being unavailable"],
      automationPotential: {
        rating: "High",
        example: 'Using tools like Zapier to "Mirror" messages from secondary channels into your primary one.'
      },
      pathToRoot: 'Channel Bloat → Communication Chaos → Disorganized'
    }
  },
  'losing-important-messages': {
    explanation: 'A sales lead, a client approval, or a team crisis was missed because it was buried under 500 other messages. You are "Leaking" opportunities every day.',
    relatedProblems: ["inbox-overflowing", "no-follow-up-system"],
    impactAnalysis: {
      financialImpact: 'Direct revenue loss; churn risk; damaged reputation.',
      severity: "Critical",
      affectedAreas: ["Revenue Growth", "Client Trust", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 day (Triage)",
      difficulty: "Easy",
      quickWins: ["Implement an "Important" tag or filter today", "Archive all non-essential mail immediately", "Use a "Read-Only' inbox for notifications"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Low signal-to-noise ratio", "Lack of inbox management skills", "Under-staffing (no VA)"],
      automationPotential: {
        rating: "High",
        example: 'AI-powered inbox triage that flags "Actionable" or "Revenue-Related' emails automatically.'
      },
      pathToRoot: 'Information Loss → Communication Chaos → Disorganized'
    }
  },
  'no-follow-up-system': {
    explanation: 'You rely on your "Memory" to follow up. If you don't do it today, it's gone. You are leaving 50% of your sales and 20% of your project momentum on the table.',
    relatedProblems: ["no-crm-pm", "prospects-engage-dont-buy"],
    impactAnalysis: {
      financialImpact: 'Massive sales leakage; delayed project finalization; stagnant account growth.',
      severity: "Major",
      affectedAreas: ["Sales pipeline", "Cash Flow", "LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Set an "Automatic Follow-up' in your CRM today", "Use a "Wait" or "Remind Me' feature in email", "Block 30 mins a day for "Follow-up' only"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive mindset", "Lack of CRM discipline", "Over-reliance on 'buying heat'"],
      automationPotential: {
        rating: "High",
        example: 'Using automated sales sequences (e.g., Apollo, Instantly) that follow up until a response is received.'
      },
      pathToRoot: 'Follow-up Failure → Communication Chaos → Disorganized'
    }
  },
  'no-follow-up-system': {
    explanation: 'You rely on your "Memory" to follow up. If you don't do it today, it's gone. You are leaving 50% of your sales and 20% of your project momentum on the table.',
    relatedProblems: ["no-crm-pm", "prospects-engage-dont-buy"],
    impactAnalysis: {
      financialImpact: 'Massive sales leakage; delayed project finalization; stagnant account growth.',
      severity: "Major",
      affectedAreas: ["Sales pipeline", "Cash Flow", "LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Set an "Automatic Follow-up' in your CRM today", "Use a "Wait" or "Remind Me' feature in email", "Block 30 mins a day for "Follow-up' only"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive mindset", "Lack of CRM discipline", "Over-reliance on "buying heat""],
      automationPotential: {
        rating: "High",
        example: 'Using automated sales sequences (e.g., Apollo, Instantly) that follow up until a response is received.'
      },
      pathToRoot: 'Follow-up Failure → Communication Chaos → Disorganized'
    }
  },
  'workspace-environment': {
    explanation: 'Your physical and digital "Home" is chaotic. This environment triggers high cortisol (stress) and prevents the 'Deep Focus' required for high-level business building.',
    relatedProblems: ["physical-clutter", "too-many-tabs", "desktop-chaos"],
    impactAnalysis: {
      financialImpact: 'Hidden productivity drain; high stress levels; low mental energy.',
      severity: "Moderate",
      affectedAreas: ["Founder Mental Health", "Efficiency", "Creativity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Clear your physical desk today", "Close all browser tabs tonight", "Add one "Calm" element to your workspace (e.g., a plant)"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of cleaning habits", "Over-stimulation', "Too many active projects"],
      automationPotential: {
        rating: "High",
        example: 'Using "Tab Management" and 'File Cleaners' to keep your digital workspace organized automatically.'
      },
      pathToRoot: 'Atmosphere Failure → Disorganized → Personal Bottlenecks'
    }
  },
  'physical-clutter': {
    explanation: 'Papers, trash, and random items on your desk. Visual clutter is "Mental noise" that competes for your attention and makes you feel "Overwhelmed' before you even start work.',
    relatedProblems: ["sticky-notes-everywhere", "cant-find-things"],
    impactAnalysis: {
      financialImpact: 'Lower cognitive bandwidth; high stress; unprofessional environment.',
      severity: "Moderate",
      affectedAreas: ["Focus", "Mental Health", "Organization"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 hour",
      difficulty: "Easy",
      quickWins: ["Throw away all non-essential items on your desk now", "Create a "To-File' box for papers", "Adopt a "Clear Desk at Night" policy"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of storage", "Procrastination on small cleaning tasks", "Analog focus"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - physical cleaning requires manual effort.'
      },
      pathToRoot: 'Physical Mess → Workspace Environment → Disorganized'
    }
  },
  'too-many-tabs': {
    explanation: 'Having 50+ browser tabs open is a sign of "Mental Incompletion.' It slows down your computer and your brain, making it impossible to focus on the ONE thing you're actually doing.',
    relatedProblems: ["shiny-object-syndrome", "poor-prioritization"],
    impactAnalysis: {
      financialImpact: 'Massive hidden distraction; slow computer performance; anxiety.',
      severity: "Minor",
      affectedAreas: ["Focus", "Tech Performance", "Mental Clarity"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "5 mins",
      difficulty: "Easy",
      quickWins: ["Close all tabs today", "Use a "Read it Later" tool (Pocket/Instapaper)", "Use ONE window per project"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of losing info", "Parallel processing habit", "Distraction seeking"],
      automationPotential: {
        rating: "High",
        example: 'Using "OneTab" or 'Arc Browser' to automatically group and snooze inactive tabs.'
      },
      pathToRoot: 'Digital Bloat → Workspace Environment → Disorganized'
    }
  },
  'desktop-chaos': {
    explanation: 'Your computer desktop is full of random files, screenshots, and "Final_v2' documents. This is the digital equivalent of working in a trash pile.',
    relatedProblems: ["messy-files", "cant-find-things"],
    impactAnalysis: {
      financialImpact: 'Labor waste searching for files; high risk of using wrong versions; tech clutter.',
      severity: "Minor",
      affectedAreas: ["Efficiency", "Mental Health", "Organization"],
      strategicPriority: 'Low'
    },
    timeToSolve: {
      estimate: "30 mins",
      difficulty: "Easy",
      quickWins: ["Move all desktop files into a "Triage" folder today", "Change your "Download" location to a specific folder", "Delete all screenshots older than 24 hours"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of folder structure", "Laziness in file naming", "No digital cleanup routine"],
      automationPotential: {
        rating: "High",
        example: 'Using "Hazel" (Mac) or 'Files-Linter' (Windows) to auto-sort desktop files into folders.'
      },
      pathToRoot: 'Digital Clutter → Workspace Environment → Disorganized'
    }
  },
  'disorganized-tools': {
    explanation: 'You have 10 apps that all do the same thing, or none of them are setup correctly. You are paying for tech that is adding more complexity than value.',
    relatedProblems: ["duplicate-systems", "wrong-software"],
    impactAnalysis: {
      financialImpact: 'Waste of subscription spend; high training costs; team confusion.',
      severity: "Moderate",
      affectedAreas: ["Operational ROI", "Team Efficiency", "Scalability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Audit your monthly app spend today", "Pick ONE tool per category and delete the rest", "Standardize the setup for your top 3 tools"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Shiny object syndrome", "No central tech ownership", "Fragmented growth"],
      automationPotential: {
        rating: "High",
        example: 'Using "SaaS Management" tools to track usage and auto-cancel underutilized subscriptions.'
      },
      pathToRoot: 'Tool Bloat → Workspace Environment → Disorganized'
    }
  },
  'nights-weekends': {
    explanation: 'You are working 24/7. This isn"t "Hustle,' it's 'Inefficiency.' You have no time to recover, which means your decision quality is dropping and you are a ticking time bomb for burnout.',
    relatedProblems: ["working-too-much", "poor-boundaries"],
    impactAnalysis: {
      financialImpact: 'Diminishing returns on hours worked; high health costs; long-term productivity collapse.',
      severity: "Critical",
      affectedAreas: ["Founder Health", "Sustainability", "Decision Quality"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month (Boundary reset)",
      difficulty: "Mindset",
      quickWins: ["Set a "No-Work' time (e.g., after 7 PM) today", "Forbid work on Sundays immediately", "Delete work apps from your phone during weekends"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of delegation", "Over-committing', "Founder identity tied only to work"],
      automationPotential: {
        rating: "High",
        example: 'Using automated scheduling to "Timebox" your work hours and auto-replying during off-times.'
      },
      pathToRoot: 'Workaholism → Working Too Much → Burnout'
    }
  },
  'no-time-off': {
    explanation: 'You haven"t taken a real vacation in over a year. Your brain has no 'Reset' time, leading to cynical thinking and a loss of the 'Big Picture' perspective.',
    relatedProblems: ["nights-weekends", "emotionally-exhausted"],
    impactAnalysis: {
      financialImpact: 'High risk of total operational failure if you crash; zero strategic innovation.',
      severity: "Critical",
      affectedAreas: ["Strategic Vision", "Founder Health", "Sustainability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months (Planning)",
      difficulty: "Medium",
      quickWins: ["Book a 3-day "Digital Detox" for next month today", "Schedule a "Weekly Recovery" day", "Tell your team: "I am unavailable on [Date]'"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear the business will fail without you", "Poor systems", "Scarcity mindset"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - recovery requires physical and mental disconnect.'
      },
      pathToRoot: 'Recovery Failure → Working Too Much → Burnout'
    }
  },
  'always-on-call': {
    explanation: 'You never truly disconnect. You are checking Slack at dinner and Email in bed. You are in a constant state of "Low-level anxiety,' which prevents deep recovery.',
    relatedProblems: ["available-24-7", "poor-boundaries"],
    impactAnalysis: {
      financialImpact: 'Extreme decision fatigue; long-term burnout; relationship strain.',
      severity: "Major",
      affectedAreas: ["Mental Health", "Sustainability", "Relationship Success"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week (Policy reset)",
      difficulty: "Mindset",
      quickWins: ["Turn off all work notifications after hours today", "Use a "Second Phone" for work that stays in the office", "Establish an "Emergency-Only' contact method"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Anxiety about missing out", "Lack of trust in team", "Poor boundaries"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to triage "Emergency" vs "Routine' and only alerting you for the true crises.'
      },
      pathToRoot: 'Hyper-Availability → Working Too Much → Burnout'
    }
  },
  'cant-stop-thinking': {
    explanation: 'Work has invaded your thoughts 24/7. You can"t sleep or relax because you are "replaying' problems. This is the final stage before a major mental health crash.',
    relatedProblems: ["sleep-deprived", "chronic-stress"],
    impactAnalysis: {
      financialImpact: 'Total loss of creative power; high risk of major medical leave.',
      severity: "Critical",
      affectedAreas: ["Mental Health", "Sustainability", "Strategic Vision"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing (Therapy/Mindset)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Start a "Brain Dump" journal before bed", "Practice 10 mins of meditation tonight", "Seek professional coaching or therapy"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-identification with the business", "High-stakes anxiety', "Lack of mental closure"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a psychological and wellness issue.'
      },
      pathToRoot: 'Mental Ruminating → Working Too Much → Burnout'
    }
  },
  'poor-boundaries': {
    explanation: 'You don"t know where the "Business' ends and 'You' begin. You allow work to bleed into family, health, and personal time without a fight.',
    relatedProblems: ["family-suffering", "no-hobbies", "guilt-not-working"],
    impactAnalysis: {
      financialImpact: 'Hidden costs of burnout; high "Divorce/Relationship Risk' (which is the #1 killer of businesses).',
      severity: "Critical",
      affectedAreas: ["Sustainability", "Founder Health", "Life Balance"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month (Reset)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Establish a "Physical" boundary (e.g., "No laptops in the bedroom")", "Schedule one "Sacred" personal event per week", "Communicate your boundaries to your family/team"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of personal identity", "Scarcity mindset", "Passive habits"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - boundaries require human-to-human enforcement.'
      },
      pathToRoot: 'Boundary Failure → Personal Life Impact → Burnout'
    }
  },
  'family-suffering': {
    explanation: 'Your relationships with spouse, children, or friends are deteriorating because you are never truly "Present,' even when you are there physically.',
    relatedProblems: ["social-isolation", "guilt-not-working"],
    impactAnalysis: {
      financialImpact: 'High cost of divorce/legal issues; loss of support system; extreme emotional drain.',
      severity: "Critical",
      affectedAreas: ["Sustainability", "Life Balance", "Mental Health"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing (Healing)",
      difficulty: "Hard",
      quickWins: ["Schedule a "No-Phone' date night tonight", "Put your phone in a box during dinner", "Ask your partner: "What"s one thing I can do to show up better for you?'"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Workaholism", "Prioritizing "Revenue" over 'Connection', "Lack of presence"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - relationships require human presence.'
      },
      pathToRoot: 'Relational Damage → Personal Life Impact → Burnout'
    }
  },
  'no-hobbies': {
    explanation: 'You have no interests outside of business. This makes you a "One-Dimensional' person and ensures that your self-worth is entirely tied to your bank account.',
    relatedProblems: ["poor-boundaries", "cant-stop-thinking"],
    impactAnalysis: {
      financialImpact: 'Lack of creative cross-pollination; high stress; unsustainable lifestyle.',
      severity: "Moderate",
      affectedAreas: ["Creativity", "Sustainability", "Mental Health"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Revisit one childhood hobby this weekend", "Join a non-business club/group today", "Block 2 hours for "Play" each week"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Time-poverty", "Guilt about not working", "Narrow identity"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - hobbies are personal pursuits.'
      },
      pathToRoot: 'Identity Loss → Personal Life Impact → Burnout'
    }
  },
  'social-isolation': {
    explanation: 'You have lost touch with friends and mentors. You are "Alone at the Top,' which makes every problem feel 10x heavier than it actually is.',
    relatedProblems: ["no-hobbies", "family-suffering"],
    impactAnalysis: {
      financialImpact: 'Lack of "External Perspective" (leads to bad decisions); higher stress levels.',
      severity: "Major",
      affectedAreas: ["Mental Health", "Sustainability", "Strategic Growth"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Reach out to one old friend today", "Join a peer mastermind group", "Schedule a non-business lunch this week"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-work", "Social anxiety from burnout", "Geographic isolation"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - social connection is human.'
      },
      pathToRoot: 'Social Loss → Personal Life Impact → Burnout'
    }
  },
  'guilt-not-working': {
    explanation: 'When you aren"t working, you feel like you 'Should be.' This guilt prevents any true recovery and makes leisure time more stressful than work itself.',
    relatedProblems: ["cant-stop-thinking", "poor-boundaries"],
    impactAnalysis: {
      financialImpact: '100% loss of recovery ROI; high cortisol levels; low creativity.',
      severity: "Major",
      affectedAreas: ["Mental Health", "Sustainability", "Creativity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing (Mindset)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Accept that "Recovery is part of the work"", "Schedule your leisure time as a "Task"", "Practice doing "Nothing" for 5 mins today"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Internalized "Hustle Culture"', "Anxiety about business survival", "Low self-worth"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a psychological belief system.'
      },
      pathToRoot: 'Guilt Cycle → Personal Life Impact → Burnout'
    }
  },
  'health-neglected': {
    explanation: 'You are sacrificing your physical body for your business. This is the ultimate "False Economy" because a sick founder cannot run a healthy business.',
    relatedProblems: ["chronic-stress", "sleep-deprived", "physical-symptoms"],
    impactAnalysis: {
      financialImpact: 'Massive future medical costs; total loss of operational capacity; low daily energy.',
      severity: "Critical",
      affectedAreas: ["Sustainability", "Daily Energy", "Life Expectancy"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Book a full medical check-up today", "Drink 2L of water tomorrow", "Go for a 20-min walk daily"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Time poverty", "Prioritizing "Growth" over 'Health', "Convenience diet"],
      automationPotential: {
        rating: "Medium",
        example: 'Using wearable health trackers to auto-alert you when your stress/sleep is reaching critical levels.'
      },
      pathToRoot: 'Physical Neglect → Health Impact → Burnout'
    }
  },
  'chronic-stress': {
    explanation: 'Your body is in a constant state of "Fight or Flight.' This high-cortisol environment destroys your immune system, your sleep, and your ability to think clearly.',
    relatedProblems: ["health-neglected", "emotionally-exhausted"],
    impactAnalysis: {
      financialImpact: 'Increased medical leave; high error rate; poor strategic decisions.',
      severity: "Critical",
      affectedAreas: ["Founder Health", "Decision Quality", "Sustainability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Hard",
      quickWins: ["Identify your #1 stress trigger today", "Implement "Box Breathing" during the day", "Stop all caffeine after 12 PM"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Unaddressed business risks", "Poor coping mechanisms", "No operational buffer"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - stress management is a biological and psychological requirement.'
      },
      pathToRoot: 'Stress Loop → Health Impact → Burnout'
    }
  },
  'sleep-deprived': {
    explanation: 'You are running on 4-5 hours of sleep. Science shows that a sleep-deprived brain has the same cognitive impairment as being drunk. You are managing your business while "Digital Drunk.'',
    relatedProblems: ["cant-stop-thinking", "health-neglected"],
    impactAnalysis: {
      financialImpact: 'Extreme drop in IQ/Decision quality; high risk of accidents/errors; long-term brain damage.',
      severity: "Critical",
      affectedAreas: ["Decision Quality", "Daily Energy", "Mental Health"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week (Habit shift)",
      difficulty: "Medium",
      quickWins: ["Set a "No-Screens' rule 60 mins before bed today", "Go to bed at the same time every night", "Get 8 hours of sleep tonight, no matter what"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Revenge Bedtime Procrastination", "Caffeine abuse", "Night-time anxiety"],
      automationPotential: {
        rating: "High",
        example: 'Using "Smart Lights" to auto-dim and trigger your sleep cycle.'
      },
      pathToRoot: 'Sleep Failure → Health Impact → Burnout'
    }
  },
  'poor-diet-exercise': {
    explanation: 'You are eating junk and moving zero. Your brain is starved of proper fuel and oxygen, leading to "Brain Fog" and low daily throughput.',
    relatedProblems: ["health-neglected", "physical-symptoms"],
    impactAnalysis: {
      financialImpact: 'Low daily energy = lower revenue; high risk of chronic disease.',
      severity: "Moderate",
      affectedAreas: ["Daily Energy", "Sustainability", "Founder Confidence"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Hard",
      quickWins: ["Prep your meals for tomorrow tonight", "Do 10 pushups today", "Replace one coffee with a green tea"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Convenience-first lifestyle", "Lack of time-budgeting for health', "Stress eating"],
      automationPotential: {
        rating: "High",
        example: 'Using meal-prep services to automate your nutrition and remove daily decision making.'
      },
      pathToRoot: 'Physical Decay → Health Impact → Burnout'
    }
  },
  'physical-symptoms': {
    explanation: 'Back pain, headaches, eye strain, or stomach issues. Your body is "Screaming" at you to stop. If you ignore these signals, your body will eventually 'Stop' for you.',
    relatedProblems: ["health-neglected", "chronic-stress"],
    impactAnalysis: {
      financialImpact: 'Frequent unplanned "Down Days"; potential for major surgery/long-term leave.',
      severity: "Critical",
      affectedAreas: ["Sustainability", "Founder Health", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-6 months",
      difficulty: "Medium",
      quickWins: ["Audit your "Ergonomics" (chair/desk) today", "See a specialist for your #1 pain today", "Stop work when you feel the first sign of a headache"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor workstation setup", "Ignoring early warning signs", "Chronic stress"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - physical symptoms require medical attention.'
      },
      pathToRoot: 'Somatic Breakdown → Health Impact → Burnout'
    }
  },
  'physical-symptoms': {
    explanation: 'Back pain, headaches, eye strain, or stomach issues. Your body is "Screaming" at you to stop. If you ignore these signals, your body will eventually 'Stop' for you.',
    relatedProblems: ["health-neglected", "chronic-stress"],
    impactAnalysis: {
      financialImpact: 'Frequent unplanned "Down Days"; potential for major surgery/long-term leave.',
      severity: "Critical",
      affectedAreas: ["Sustainability", "Founder Health", "Operations"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-6 months",
      difficulty: "Medium",
      quickWins: ["Audit your "Ergonomics" (chair/desk) today", "See a specialist for your #1 pain today", "Stop work when you feel the first sign of a headache"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor workstation setup", "Ignoring early warning signs", "Chronic stress"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - physical symptoms require medical attention.'
      },
      pathToRoot: 'Somatic Breakdown → Health Impact → Burnout'
    }
  },
  'lost-motivation': {
    explanation: 'You don"t care about the business anymore. The spark is gone, and you are just 'Going through the motions.' This is a dangerous state because your energy sets the ceiling for the whole company.',
    relatedProblems: ["cynical-negative", "emotionally-exhausted"],
    impactAnalysis: {
      financialImpact: 'Stagnant revenue; team demotivation; zero innovation.',
      severity: "Critical",
      affectedAreas: ["Strategic Vision", "Team Culture", "Sustainability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months (Re-discovery)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Reconnect with your "Why" today", "Take a 1-week break to clear your head", "Assign a "Success Manager" to handle the day-to-day work"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Alignment failure", "Chronic over-work', "Lost connection to purpose"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - motivation is a personal and internal driver.'
      },
      pathToRoot: 'Apathy → Emotionally Exhausted → Burnout'
    }
  },
  'cynical-negative': {
    explanation: 'You have a "Bad Attitude" towards clients, employees, and the market. You've been burned too many times and now you expect failure, which creates a self-fulfilling prophecy.',
    relatedProblems: ["relationship-deteriorated", "abusive"],
    impactAnalysis: {
      financialImpact: 'Toxic team culture; high client churn; lost opportunities from being "Hard to work with.'',
      severity: "Major",
      affectedAreas: ["Team Morale", "Brand Equity", "Strategic Thinking"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Hard (Mindset)',
      quickWins: ["Practice "Gratitude" for 3 things every morning", "Stop reading "Negative" industry news for 30 days", "Audit your internal self-talk"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Previous failures unaddressed", "Exposure to toxic people", "Burnout"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - cynicism is a psychological filter.'
      },
      pathToRoot: 'Toxicity → Emotionally Exhausted → Burnout'
    }
  },
  'decision-fatigue': {
    explanation: 'You have made too many small decisions today. By 4 PM, you are incapable of high-level thinking, leading to procrastination or bad choices on the "Big" things.',
    relatedProblems: ["founder-everything", "micromanagement"],
    impactAnalysis: {
      financialImpact: 'Strategic errors; slow execution speed; missed big-picture opportunities.',
      severity: "Major",
      affectedAreas: ["Founder Efficiency", "Decision Quality", "Mental Clarity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Make "Big" decisions before 10 AM today", "Automate or delegate all minor choices (e.g., meal prep)", "Limit meetings to 3 per day"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of delegation", "Fragmented focus", "High cognitive load"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to "Pre-Screen' decisions and presenting only the top 2 options to the founder.'
      },
      pathToRoot: 'Decision Bloat → Emotionally Exhausted → Burnout'
    }
  },
  'feel-trapped': {
    explanation: 'You feel like you "Have" to do this business, rather than 'Want' to. You've built a cage made of payroll, overhead, and client demands, and you don't see the exit.',
    relatedProblems: ["working-too-much", "no-time-off"],
    impactAnalysis: {
      financialImpact: 'Zero innovative energy; hidden desire for the business to fail; stagnant growth.',
      severity: "Critical",
      affectedAreas: ["Strategic Vision", "Founder Health", "Business Sustainability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6 months (Strategic pivot/exit)",
      difficulty: "Hard",
      quickWins: ["Design your "Ideal Life" first, then the business", "Hire a VA to handle the part you hate most today", "Identify one "Exit" path (sale, merger, shutdown)"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Alignment failure", "Scale exceeding purpose", "Financial pressure"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - this is a core life-path and strategic alignment issue.'
      },
      pathToRoot: 'Lost Agency → Emotionally Exhausted → Burnout'
    }
  },
  'no-business-skills': {
    explanation: 'You are a great technician (designer, coder, coach) but you don"t know how to run a company. You are guessing on hiring, finance, and strategy.',
    relatedProblems: ["no-financial-literacy", "no-hiring-skills"],
    impactAnalysis: {
      financialImpact: 'Hidden profit leaks; poor investment ROI; unstable operations.',
      severity: "Major",
      affectedAreas: ["Business Growth", "Operations", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Read "The E-Myth Revisited' this weekend", "Hire a business coach today", "Review your P&L statement every month"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical background", "Lack of formal training", "Learning on the job without mentors"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI business advisors to provide "On-Demand' coaching for specific management problems.'
      },
      pathToRoot: 'Skill Gap → Lack of Critical Skills → Personal Bottlenecks'
    }
  },
  'no-hiring-skills': {
    explanation: 'You hire based on "Gut" or "Likability.' You don't have a scorecard or a vetting process, which leads to expensive bad hires and a revolving door of staff.',
    relatedProblems: ["team-unreliable", "hiring-process-slow"],
    impactAnalysis: {
      financialImpact: 'Massive cost of "Bad Hires" (3x salary); team demotivation.',
      severity: "Major",
      affectedAreas: ["Recruitment ROI", "Team Culture", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Medium",
      quickWins: ["Adopt a "Scorecard" hiring method today", "Ask "Behavioral" questions in interviews", "Always call 3 references"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of HR training", "Rushing to fill seats", "Bias towards "Likable" candidates"],
      automationPotential: {
        rating: "High",
        example: 'Using automated interviewing and assessment tools to filter for "Competence" over "Charisma'.'
      },
      pathToRoot: 'Recruitment Gap → Lack of Critical Skills → Personal Bottlenecks'
    }
  },
  'no-sales-skills': {
    explanation: 'You are afraid to sell, or you "hope" people will buy. You lack the ability to handle objections, articulate ROI, or close the deal confidently.',
    relatedProblems: ["price-objection", "sales-process-weak"],
    impactAnalysis: {
      financialImpact: 'Stagnant revenue; low close rates; high price sensitivity.',
      severity: "Major",
      affectedAreas: ["Revenue Growth", "Market Reach", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months",
      difficulty: "Medium",
      quickWins: ["Take a sales training course this month", "Practice your "Pitch" in front of a mirror", "Record your sales calls and listen back to them"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of rejection", "Undervaluing your own work", "Lack of sales training"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to analyze sales call transcripts and provide coaching on objection handling.'
      },
      pathToRoot: 'Sales Gap → Lack of Critical Skills → Personal Bottlenecks'
    }
  },
  'no-systems-thinking': {
    explanation: 'You see every problem as a "One-off' event rather than a symptom of a broken process. You solve the 'Fire' but never the 'Fuel.'',
    relatedProblems: ["no-sops", "firefighting"],
    impactAnalysis: {
      financialImpact: 'Repeating the same expensive mistakes; inability to scale; infinite management time.',
      severity: "Major",
      affectedAreas: ["Operations", "Scalability", "Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6 months (Mindset shift)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Ask "Why?' 5 times for every problem today", "Map out the "Process" for the next error you find", "Read "Systems Thinking" books"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technician mindset", "Short-term focus', "Reactive habits"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to "Map" the recurring themes in your business errors and suggest systemic fixes.'
      },
      pathToRoot: 'Process Blindness → Lack of Critical Skills → Personal Bottlenecks'
    }
  },
  'no-marketing-skills': {
    explanation: 'You don"t know how to generate attention or build a brand. You are a 'Hidden Secret' in the market, relying entirely on luck or referrals.',
    relatedProblems: ["no-visibility", "prospects-dont-know"],
    impactAnalysis: {
      financialImpact: 'Inconsistent lead flow; low brand equity; zero market authority.',
      severity: "Major",
      affectedAreas: ["Revenue Growth", "Market Reach", "Asset Value"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Define your "Target Audience" today", "Publish one piece of "Authority" content this week", "Hire a marketing consultant for a 90-day strategy"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of marketing training", "Undervaluing attention", "Reliance on referrals"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to automate your content creation and distribution across social platforms.'
      },
      pathToRoot: 'Market Blindness → Lack of Critical Skills → Personal Bottlenecks'
    }
  },
  'dont-know-target': {
    explanation: 'You are trying to sell to "Everyone.' This means your message is generic, your ads are expensive, and nobody feels like you're talking to them.',
    relatedProblems: ["market-too-small", "message-no-resonate"],
    impactAnalysis: {
      financialImpact: 'Waste of marketing budget; low conversion rates; weak brand identity.',
      severity: "Major",
      affectedAreas: ["Marketing ROI", "Conversion Rate", "Strategic Positioning"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week (Research)",
      difficulty: "Medium",
      quickWins: ["Define your "Ideal Customer Profile" (ICP) today", "Interview your top 3 clients about their pain points", "Stop all ads targeting "Everyone" immediately"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of missing out (FOMO)", "Lack of market research", "Broad service offer"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to analyze your past client data and identify the most profitable "Target" segment.'
      },
      pathToRoot: 'Targeting Failure → No Marketing Skills → Personal Bottlenecks'
    }
  },
  'no-positioning': {
    explanation: 'You look exactly like your competitors. When the client can"t tell the difference, they choose based on 'Price,' which leads to a race to the bottom.',
    relatedProblems: ["market-competitive", "prices-low"],
    impactAnalysis: {
      financialImpact: 'Compressed margins; high price sensitivity; low win rates.',
      severity: "Major",
      affectedAreas: ["Pricing Power", "Market Share", "Brand Value"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3 months (Re-branding)",
      difficulty: "Hard",
      quickWins: ["Identify one "Unique Mechanism" for your work today", "Rewrite your homepage to focus on *how* you are different", "Add a "Bold Guarantee" that no one else has"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Commoditized offer", "Lack of innovative strategy", "Fear of being different"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to analyze competitor messaging and finding the "White Space" where you can stand out.'
      },
      pathToRoot: 'Commoditization → No Marketing Skills → Personal Bottlenecks'
    }
  },
  'no-digital-marketing': {
    explanation: 'You are invisible online. In 2026, if you"re not easily findable and authoritative on digital channels, you simply don't exist for most high-value prospects.',
    relatedProblems: ["no-visibility", "seo-nonexistent"],
    impactAnalysis: {
      financialImpact: 'Missed 80% of the market opportunity; high reliance on offline/analog sales.',
      severity: "Major",
      affectedAreas: ["Market Reach", "Asset Value", "Revenue Stability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6 months",
      difficulty: "Hard",
      quickWins: ["Optimize your Google Business profile today", "Setup a basic "Lead Magnet" on your site", "Post 3x a week on your target"s primary social platform"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Legacy business mindset", "Lack of tech skills", "Under-investing in digital"],
      automationPotential: {
        rating: "High",
        example: 'Using AI-powered SEO and social management tools to maintain a 24/7 digital presence automatically.'
      },
      pathToRoot: 'Digital Invisibility → No Marketing Skills → Personal Bottlenecks'
    }
  },
  'no-content-creation': {
    explanation: 'You aren"t sharing your expertise. By staying quiet, you allow your competitors to define the market. Content is the 'Scalable Salesperson' you are currently ignoring.',
    relatedProblems: ["no-word-mouth", "content-weak"],
    impactAnalysis: {
      financialImpact: 'Zero "Inbound" leads; high cost of sales (manual education); low authority.',
      severity: "Moderate",
      affectedAreas: ["Brand Authority", "Lead Generation", "Sales ROI"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Turn your next 3 client emails into "Blog Posts" today", "Record a 5-min video explaining one complex concept", "Use AI to repurpose one article into 10 social posts"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Perfectionism", "Imposter syndrome", "Undervaluing your own knowledge"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to ghostwrite and schedule content based on your core ideas and "Brain Dumps".'
      },
      pathToRoot: 'Silence → No Marketing Skills → Personal Bottlenecks'
    }
  },
  'learning-too-slow': {
    explanation: 'The market is moving faster than you are. You are using 2010 strategies in a 2026 world. If your "Learning Rate" is lower than the 'Market Change Rate,' you are dying.',
    relatedProblems: ["no-business-skills", "wrong-learning-sources"],
    impactAnalysis: {
      financialImpact: 'Obsolescence risk; decreasing margins; lost competitive advantage.',
      severity: "Major",
      affectedAreas: ["Strategic Growth", "Innovation", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Follow 3 industry leaders on LinkedIn today", "Listen to a business podcast during your commute", "Join a peer-learning community"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of "Learning" time on calendar", "Arrogance (think you know it all)', "Information silos"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to summarize 10 books or articles into 5-min "Key Takeaways" for you every week.'
      },
      pathToRoot: 'Knowledge Stagnation → Skill Gap → Personal Bottlenecks'
    }
  },
  'no-mentors': {
    explanation: 'You are trying to figure it all out alone. You are making mistakes that others have already solved. You lack the "Shortcut" that comes from talking to someone further ahead.',
    relatedProblems: ["social-isolation", "no-peer-network"],
    impactAnalysis: {
      financialImpact: 'High cost of "Unnecessary" mistakes; slow growth velocity; high stress.',
      severity: "Moderate",
      affectedAreas: ["Strategic Growth", "Mental Health", "Sustainability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Email one person you admire today with a specific question", "Hire a business mentor/coach this month", "Attend a "Mastermind" event"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of asking for help", "Hero complex", "Lack of investment in coaching"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - mentorship is a high-level human connection.'
      },
      pathToRoot: 'Isolation → Learning Too Slow → Personal Bottlenecks'
    }
  },
  'no-peer-network': {
    explanation: 'You don"t have a "Tribe' of people at your level. You lack the benchmark of what is 'Normal,' leading to either complacency or unnecessary panic.',
    relatedProblems: ["social-isolation", "no-mentors"],
    impactAnalysis: {
      financialImpact: 'Lack of "Referral" partners; zero market intelligence; high anxiety.',
      severity: "Moderate",
      affectedAreas: ["Mental Health", "Market Awareness", "Sustainability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Join a "Founders Only" Slack or group today", "Schedule a "Coffee Chat" with a competitor this week", "Invite 3 peers to a monthly dinner"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Managing in secret", "Time poverty", "Aversion to networking events"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to find and introduce you to relevant peers based on your business profile.'
      },
      pathToRoot: 'Tribeless → Learning Too Slow → Personal Bottlenecks'
    }
  },
  'wrong-learning-sources': {
    explanation: 'You are reading "Business Entertainment" instead of 'Business Strategy.' You are following influencers who don't run real businesses, leading to 'Tactical' whiplash.',
    relatedProblems: ["shiny-object-syndrome", "learning-too-slow"],
    impactAnalysis: {
      financialImpact: 'Wasted learning hours; implementation of bad advice; strategic confusion.',
      severity: "Moderate",
      affectedAreas: ["Strategic Growth", "Efficiency", "Decision Quality"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week (Curation reset)",
      difficulty: "Easy",
      quickWins: ["Unfollow 10 "Guru" accounts today", "Buy a book by a proven, real-world CEO", "Stop reading "Trend" articles and focus on "Fundamentals'"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Dopamine-seeking in learning", "Lack of critical vetting", "Algorithm bubbles"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to vet sources based on "Author Track Record" before you invest time in reading.'
      },
      pathToRoot: 'Bad Input → Learning Too Slow → Personal Bottlenecks'
    }
  },
  'mindset-blocks': {
    explanation: 'The biggest bottleneck in the business is the 6 inches between your ears. Your fears, insecurities, and childhood beliefs are limiting what the business is "Allowed" to become.',
    relatedProblems: ["imposter-syndrome", "scarcity-mindset"],
    impactAnalysis: {
      financialImpact: 'Revenue is capped by your personal "Comfort Zone"; high self-sabotage risk.',
      severity: "Critical",
      affectedAreas: ["Scalability", "Leadership", "Strategic Vision"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing (Therapy/Coaching)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Identify your #1 "Fear" today", "Ask: "What would I do if I wasn"t afraid?'", "Seek professional therapy or mindset coaching"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Upbringing/Conditioning", "Previous failures unaddressed", "Lack of self-awareness"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - mindset is a human psychological journey.'
      },
      pathToRoot: 'Mental Ceiling → Mindset Blocks → Personal Bottlenecks'
    }
  },
  'perfectionism': {
    explanation: 'The desire to be "Perfect" is just "Procrastination' in a fancy suit. It's a defense mechanism to avoid being judged, and it kills your speed and profitability.',
    relatedProblems: ["afraid-let-go", "over-delivering"],
    impactAnalysis: {
      financialImpact: '100% loss of "Speed to Market"; high unbilled labor costs; team frustration.',
      severity: "Major",
      affectedAreas: ["Execution Speed", "Gross Margin", "Team Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing (Mindset shift)",
      difficulty: "Mindset",
      quickWins: ["Ship something "Good Enough" today", "Set a "Time Limit" for every task (and stick to it)", "Celebrate a "B-' result that went out on time"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of judgement", "High personal standards taken too far", "Lack of "Done" definition"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - perfectionism is a personal behavior.'
      },
      pathToRoot: 'Fear of Judgement → Mindset Blocks → Personal Bottlenecks'
    }
  },
  'fear-failure': {
    explanation: 'You aren"t taking big risks because you"re afraid of what happens if they don't work. This 'Safe' strategy ensures that you will never have a 'Big' success.',
    relatedProblems: ["scarcity-mindset", "afraid-commitment"],
    impactAnalysis: {
      financialImpact: 'Stagnant, linear growth; missed "Game-Changing' opportunities.',
      severity: "Major",
      affectedAreas: ["Strategic Vision", "Innovation", "Growth Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing (Mindset shift)",
      difficulty: "Mindset",
      quickWins: ["Run one "Small" risk today (e.g., call a big lead)", "Map out the "Worst Case Scenario" and realize you'll survive it", "Celebrate the "Attempt" not just the "Result'"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of confidence", "Over-estimating risk', "Financial fragility"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - courage is a leadership trait.'
      },
      pathToRoot: 'Risk Aversion → Mindset Blocks → Personal Bottlenecks'
    }
  },
  'scarcity-mindset': {
    explanation: 'You believe there isn"t "Enough' to go around. This leads to penny-pinching, afraid-to-hire, and treating competitors like enemies. It keeps you small and stressed.',
    relatedProblems: ["afraid-raise-prices", "cant-afford-hire"],
    impactAnalysis: {
      financialImpact: 'Inability to invest in growth; high price sensitivity (your own); toxic culture.',
      severity: "Critical",
      affectedAreas: ["Strategic Growth", "Team Culture", "Investment Capacity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing (Mindset shift)",
      difficulty: "Mindset",
      quickWins: ["Pay one bill early today", "Refer a client to a competitor", "Invest $100 in yourself tonight"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Upbringing/Poverty", "Focus on "Saving" over 'Growing', "Fear of lack"],
      automationPotential: {
        rating: "Low",
        example: 'N/A - scarcity is a deep-seated belief system.'
      },
      pathToRoot: 'Abundance Failure → Mindset Blocks → Personal Bottlenecks'
    }
  },
  'cant-think-bigger': {
    explanation: 'You are focused on "Next Week" while your competitors are focused on 'Next Year.' You lack the imagination or the confidence to play a larger game.',
    relatedProblems: ["no-clear-goals", "mindset-blocks"],
    impactAnalysis: {
      financialImpact: 'Linear growth; business that is easily replaced; zero legacy value.',
      severity: "Major",
      affectedAreas: ["Strategic Vision", "Business Valuation", "Market Reach"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing (Vision)",
      difficulty: "Hard (Mindset)',
      quickWins: ["Write your "10x" plan today (even if it's crazy)", "Talk to one person who is 5 years ahead of you", "Stop doing one task that "Small" you would do"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of exposure to big thinkers", "Daily operational overwhelm", "Fear of scale"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to "Model" what your business would look like with 10x more revenue, identifying where it breaks.'
      },
      pathToRoot: 'Vision Ceiling → Mindset Blocks → Personal Bottlenecks'
    }
  },
  'outreach-issues': {
    explanation: 'Your outbound efforts (calls, emails, DMs) are being ignored, blocked, or deleted. You are likely being seen as "Spam" because your approach lacks personalization or value.',
    relatedProblems: ["outbound-spammy", "getting-ignored", "lists-outdated"],
    impactAnalysis: {
      financialImpact: 'High labor cost for zero return; damage to domain/brand reputation.',
      severity: "Major",
      affectedAreas: ["Sales pipeline", "Brand Reputation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Stop all automated "Mass" blasts today", "Switch to "10-10-10" (10 high-quality, personalized outreaches per day)", "Offer a "Mini-Win' (audit, tip, insight) in the first message"],
    },
    rootCauseAnalysis: {
      likelyCauses: ["Reliance on "Volume" over "Value'", "Weak sales copy", "Bad data/lists"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to personalize the first 2 sentences of every outbound email based on prospect LinkedIn data.'
      },
      pathToRoot: 'Outreach Issues → Prospects Dont Know → Not Getting New Clients'
    }
  },
  'wrong-clients': {
    explanation: 'You are working with people who can"t afford you, don't value you, or have problems you aren't optimized to solve. They are draining your energy and profit.',
    relatedProblems: ["bad-fit-services", "cant-afford-pricing", "high-maintenance-low-profit"],
    impactAnalysis: {
      financialImpact: 'High "Support-to-Revenue' ratio; high churn; team misery.',
      severity: "Major",
      affectedAreas: ["Profitability", "Team Morale", "Brand Alignment"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard (Mindset)',
      quickWins: ["Fire your most "Abusive" or "Unprofitable' client today", "Tighten your "Lead Qualification" form", "Say "No" to any prospect who asks for a discount in the first meeting"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling out of desperation", "Weak marketing filters", "No clear niche"],
      automationPotential: {
        rating: "High",
        example: 'Using automated "Qualification Quizzes" to filter out bad-fit clients before they even talk to you.'
      },
      pathToRoot: 'Wrong Clients → Client Management Issues → Bought Cant Deliver'
    }
  },
  // LEVEL 7 NODES - DON"T KNOW WHERE TARGET MARKET IS
  'no-research': {
    explanation: 'You are making business decisions without data. Your understanding of your customer is based on assumptions rather than research, leading to wasted marketing spend and ineffective messaging.',
    relatedProblems: ["guessing-demographics", "assumptions-hangout", "not-where-looking"],
    impactAnalysis: {
      financialImpact: 'Wasted marketing budget on wrong channels; low conversion rates; high CAC.',
      severity: "Major",
      affectedAreas: ["Marketing", "Product-Market Fit', "Sales"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 weeks",
      difficulty: "Easy",
      quickWins: ["Interview 5 recent customers this week", "Send a survey to your email list", "Join 3 communities where your customers hang out and lurk"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Assuming you already know the answer", "Too busy to research", "Fear of what you might find"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to analyze customer support tickets and reviews for common pain points and language patterns.'
      },
      pathToRoot: 'No Research → Don"t Know Where Market Is → Can't Find Prospects → Not Getting New Clients'
    }
  },
  'guessing-demographics': {
    explanation: 'Your ideal customer profile is a guess based on intuition rather than data. You are marketing to a phantom customer that might not actually exist or be reachable.',
    relatedProblems: ["no-research", "assumptions-hangout", "wrong-channels"],
    impactAnalysis: {
      financialImpact: 'High ad spend waste; poor targeting; low ROAS.',
      severity: "Major",
      affectedAreas: ["Marketing Efficiency", "Customer Acquisition"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Easy",
      quickWins: ["Audit your last 20 customers: age, location, job title, income", "Check Google Analytics demographics data", "Run a Facebook Pixel analysis"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Launched product before validating market", "Marketing to "Everyone"", "Using outdated personas"],
      automationPotential: {
        rating: "High",
        example: 'Automated customer data enrichment via HubSpot, Clearbit, or similar to reveal actual demographics.'
      },
      pathToRoot: 'Guessing Demographics → Don"t Know Where Market Is → Can't Find Prospects'
    }
  },
  'assumptions-hangout': {
    explanation: 'You think you know where your customers are online or offline, but you have never actually validated this. You are fishing in the wrong pond.',
    relatedProblems: ["no-research", "marketing-not-audience", "wrong-channels"],
    impactAnalysis: {
      financialImpact: 'Complete marketing budget waste if assumption is wrong.',
      severity: "Major",
      affectedAreas: ["Marketing Channels", "Lead Generation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 weeks",
      difficulty: "Easy",
      quickWins: ["Ask your best customers: "Where do you get business advice?'", "Check where competitors are active", "Test 3 different channels with small budgets"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Following industry "Best practices" blindly", "Confirmation bias", "Not tracking channel data"],
      automationPotential: {
        rating: "Medium",
        example: 'Using social listening tools like SparkToro or Brandwatch to find where your target keywords appear most.'
      },
      pathToRoot: 'Assumptions About Hangout → Don"t Know Where Market Is → Can't Find Prospects'
    }
  },
  'not-where-looking': {
    explanation: 'Your ideal customers exist, but they are not in the places you are currently marketing. This is a simple misalignment between your effort and the reality of customer behavior.',
    relatedProblems: ["wrong-channels", "marketing-not-audience", "no-research"],
    impactAnalysis: {
      financialImpact: 'Zero ROI on current marketing; opportunity cost of not being where they are.',
      severity: "Major",
      affectedAreas: ["Marketing Effectiveness", "Growth Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Medium",
      quickWins: ["Survey customers: "Where did you first hear about us?'", "Analyze traffic sources in GA4", "Ask "Where were you before this?' in sales calls"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Marketing strategy based on your preferences not theirs", "Industry echo chamber", "Stale data"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated tracking of referral sources and first-touch attribution.'
      },
      pathToRoot: 'Not Where Looking → Don"t Know Where Market Is → Can't Find Prospects'
    }
  },
  'market-shifted': {
    explanation: 'Your customers used to be in one place (e.g., Facebook groups), but they have migrated (e.g., to Discord or private Slack communities), and you didn"t notice. Your strategy is outdated.',
    relatedProblems: ["tactics-stopped-working", "sources-dried", "not-where-looking"],
    impactAnalysis: {
      financialImpact: 'Declining lead quality and volume; eroding market presence.',
      severity: "Major",
      affectedAreas: ["Customer Acquisition", "Market Position"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Interview recent customers about their media habits", "Check trending platforms in your niche", "Join new communities and observe"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Not staying current with trends", "Set-it-and-forget-it marketing", "Lack of customer feedback loops"],
      automationPotential: {
        rating: "Low",
        example: 'Social listening tools can detect emerging platforms, but human judgment is key.'
      },
      pathToRoot: 'Market Shifted → Don"t Know Where Market Is → Can't Find Prospects'
    }
  },
  // TARGET MARKET TOO SMALL
  'niche-narrow': {
    explanation: 'Your total addressable market is too small to sustain your revenue goals. You have over-niched, and there simply aren"t enough customers to build a scalable business.',
    relatedProblems: ["market-too-small", "geographic-limits", "addressable-market"],
    impactAnalysis: {
      financialImpact: 'Hard revenue ceiling; inability to scale beyond current market size.',
      severity: "Critical",
      affectedAreas: ["Growth Potential", "Valuation", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Calculate your TAM (Total Addressable Market) honestly", "Identify adjacent markets you could serve", "Survey customers: "Who else has this problem?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Over-specialization", "Geographic constraints self-imposed", "Misunderstanding of "Niche down" advice"],
      automationPotential: {
        rating: "Low",
        example: 'Market sizing tools like Gartner or Statista can provide TAM data, but strategy requires human insight.'
      },
      pathToRoot: 'Niche Too Narrow → Target Market Too Small → Can"t Find Prospects'
    }
  },
  'geographic-limits': {
    explanation: 'You have artificially limited yourself to a specific city, state, or region when your service could be delivered remotely or expanded. This is a self-imposed constraint.',
    relatedProblems: ["niche-narrow", "market-too-small", "addressable-market"],
    impactAnalysis: {
      financialImpact: '10-100x smaller market than necessary; limiting growth trajectory.',
      severity: "Major",
      affectedAreas: ["Scalability", "Revenue Ceiling"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Offer one "Remote" pilot project to a customer outside your area", "Build a self-serve or online component", "Partner with providers in other regions"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Legacy business model", "Fear of logistics", "Licensing or legal constraints"],
      automationPotential: {
        rating: "High",
        example: 'Remote delivery via Zoom, recorded trainings, or project management software removes geographic limits.'
      },
      pathToRoot: 'Geographic Limits → Target Market Too Small → Can"t Find Prospects'
    }
  },
  'industry-specialized': {
    explanation: 'You serve such a specialized industry vertical that there are only a handful of potential customers. This might be fine for enterprise deals, but deadly for SMB models.',
    relatedProblems: ["niche-narrow", "market-too-small"],
    impactAnalysis: {
      financialImpact: 'Low lead volume; high dependence on few accounts; vulnerability to industry downturns.',
      severity: "Major",
      affectedAreas: ["Risk", "Growth Potential", "Diversification"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Identify 2 adjacent industries with similar problems", "Reframe your value prop as a problem (not industry)", "Test messaging in new vertical"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder"s previous career shaped niche", "Early clients were all in one industry", "Vertical-specific product"],
      automationPotential: {
        rating: "Low",
        example: 'Industry expansion is strategic, but AI can help identify adjacent markets via keyword analysis.'
      },
      pathToRoot: 'Industry Too Specialized → Target Market Too Small → Can"t Find Prospects'
    }
  },
  'addressable-market': {
    explanation: 'Even if the total market is large, the segment you can actually reach and serve (your SAM - Serviceable Addressable Market) is too small due to constraints like budget, tech requirements, or awareness.',
    relatedProblems: ["niche-narrow", "market-too-small", "targeting-specific"],
    impactAnalysis: {
      financialImpact: 'Revenue cap at low level; difficulty raising capital or selling business.',
      severity: "Major",
      affectedAreas: ["Scalability", "Valuation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Map your TAM → SAM → SOM", "Identify barriers preventing you from serving more of the market", "Create a "Budget-friendly' tier to expand reach"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["High price point excludes most of market", "Tech or skill barriers", "Awareness gap"],
      automationPotential: {
        rating: "Medium",
        example: 'Creating self-serve or AI-assisted versions of your service can expand your SAM.'
      },
      pathToRoot: 'Addressable Market Too Small → Target Market Too Small → Can"t Find Prospects'
    }
  },
  'targeting-specific': {
    explanation: 'Your Ideal Customer Profile is so specific (e.g., "45-year-old female dentist in Ohio with 2+ locations') that it excludes 99% of potential customers who could benefit from your service.',
    relatedProblems: ["niche-narrow", "market-too-small"],
    impactAnalysis: {
      financialImpact: 'Artificially small pipeline; high cost to find each lead.',
      severity: "Moderate",
      affectedAreas: ["Lead Volume", "Marketing Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Broaden ICP by one dimension (e.g., all states, not just Ohio)", "Focus on problem not demographics", "Test broader targeting in ads"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Misapplied "Niche down" advice", "Early success with specific type", "Over-optimization"],
      automationPotential: {
        rating: "Medium",
        example: 'Lookalike audiences in Facebook/LinkedIn Ads can find similar but broader profiles.'
      },
      pathToRoot: 'Targeting Too Specific → Target Market Too Small → Can"t Find Prospects'
    }
  },
  // TARGET MARKET TOO COMPETITIVE
  'market-saturated': {
    explanation: 'Your market has too many providers chasing too few customers. This drives prices down, makes differentiation nearly impossible, and forces you to compete on price alone.',
    relatedProblems: ["big-players-dominate", "race-bottom-price", "differentiation-unclear"],
    impactAnalysis: {
      financialImpact: 'Razor-thin margins; constant price pressure; high customer churn to cheaper alternatives.',
      severity: "Major",
      affectedAreas: ["Profitability", "Pricing Power", "Market Position"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Identify one unique capability competitors don"t have", "Niche down to a sub-segment", "Bundle to create differentiation"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Entered a "Gold rush" market too late", "Low barriers to entry", "Commoditized service"],
      automationPotential: {
        rating: "Low",
        example: 'Automation itself can become differentiation (e.g., faster delivery via AI).'
      },
      pathToRoot: 'Market Saturated → Target Market Too Competitive → Can"t Find Prospects'
    }
  },
  'big-players-dominate': {
    explanation: 'Large incumbents (enterprise companies, franchises, or platforms) have such dominant market share, brand recognition, and resources that small players like you are invisible to customers.',
    relatedProblems: ["market-saturated", "incumbent-advantage", "competitor-better-reputation"],
    impactAnalysis: {
      financialImpact: 'Difficulty acquiring customers; high CAC due to trust gap; pricing disadvantage.',
      severity: "Major",
      affectedAreas: ["Market Share", "Brand Trust", "Growth Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "12+ months",
      difficulty: "Hard",
      quickWins: ["Compete on speed, not size ("We respond in 1 hour, they take 3 days')", "Target customers big players ignore", "Position as "Boutique alternative""]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Network effects or economies of scale favor large players", "Brand legacy", "Capital-intensive industry"],
      automationPotential: {
        rating: "Medium",
        example: 'Using AI to match or exceed big-player capabilities (e.g., 24/7 chatbot support).'
      },
      pathToRoot: 'Big Players Dominate → Target Market Too Competitive → Can"t Find Prospects'
    }
  },
  'race-bottom-price': {
    explanation: 'Competitors keep undercutting each other on price, creating a death spiral where no one makes money. This is common in markets with low differentiation and desperate sellers.',
    relatedProblems: ["market-saturated", "competing-price", "lost-on-price"],
    impactAnalysis: {
      financialImpact: 'Negative or near-zero margins; unsustainable business model; eventual market exit.',
      severity: "Critical",
      affectedAreas: ["Profitability", "Business Viability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6 months",
      difficulty: "Hard",
      quickWins: ["Refuse to compete on price ("Premium positioning")", "Add value that can"t be commoditized", "Exit this market segment"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Commoditized offering", "No clear value differentiation", "Desperate competitors willing to lose money"],
      automationPotential: {
        rating: "Medium",
        example: 'Automation reduces your costs so you can maintain margins even at lower prices.'
      },
      pathToRoot: 'Race to Bottom → Target Market Too Competitive → Can"t Find Prospects'
    }
  },
  'differentiation-unclear': {
    explanation: 'Even if you are different, prospects can"t tell how. Your messaging, positioning, and visual identity all look like everyone else's, making you forgettable.',
    relatedProblems: ["generic-positioning", "looks-like-everyone", "no-differentiation"],
    impactAnalysis: {
      financialImpact: 'High CAC due to lack of preference; price becomes the only decision factor.',
      severity: "Major",
      affectedAreas: ["Brand", "Conversion Rate", "Pricing Power"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Identify your "Unfair advantage"", "Rewrite homepage to focus on unique benefit", "Create a "Comparison table" showing your edge"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Generic messaging ("We help businesses grow")", "Fear of being too niche", "Copying competitors"],
      automationPotential: {
        rating: "High",
        example: 'Using AI to analyze competitor messaging and identify gaps you can own.'
      },
      pathToRoot: 'Differentiation Unclear → Target Market Too Competitive → Can"t Find Prospects'
    }
  },
  'barriers-low': {
    explanation: 'Anyone can start doing what you do with minimal capital, skill, or certification. This floods the market with low-quality competitors and makes it hard to establish authority.',
    relatedProblems: ["market-saturated", "race-bottom-price"],
    impactAnalysis: {
      financialImpact: 'Constant new competition; downward price pressure; difficulty standing out.',
      severity: "Moderate",
      affectedAreas: ["Market Positioning", "Pricing Power"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Hard",
      quickWins: ["Build a "Moat" through brand, expertise, or tech", "Create proprietary methodology or IP", "Invest in certifications or credentials"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Service-based or digital business model", "No regulatory barriers", "Low startup costs"],
      automationPotential: {
        rating: "High",
        example: 'Building proprietary AI tools or systems that competitors can"t easily replicate.'
      },
      pathToRoot: 'Barriers Low → Target Market Too Competitive → Can"t Find Prospects'
    }
  },
  // LEAD GENERATION INSUFFICIENT
  'not-enough-activity': {
    explanation: 'You are simply not doing enough outreach, content creation, or marketing activity. The volume is too low to generate meaningful results, even if your conversion rate is good.',
    relatedProblems: ["inconsistent-effort", "not-trying-channels", "sources-dried"],
    impactAnalysis: {
      financialImpact: 'Directly proportional to growth; low activity = low revenue.',
      severity: "Major",
      affectedAreas: ["Pipeline", "Revenue Growth"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Set a daily lead gen goal (e.g., 10 outreaches/day)", "Block 2 hours every morning for lead gen", "Hire a VA to help with volume"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder doing everything", "Fear of rejection", "No accountability or tracking"],
      automationPotential: {
        rating: "High",
        example: 'Automated email sequences, social media scheduling, and lead scraping tools can 10x your activity.'
      },
      pathToRoot: 'Not Enough Activity → Lead Gen Insufficient → Can"t Find Prospects'
    }
  },
  'tactics-stopped-working': {
    explanation: 'What used to bring in leads (e.g., cold email, Facebook ads, SEO) has become saturated, outdated, or algorithmically penalized. Your lead flow has dried up.',
    relatedProblems: ["sources-dried", "market-shifted", "not-trying-channels"],
    impactAnalysis: {
      financialImpact: 'Sudden revenue drop; scrambling to find new channels; loss of predictability.',
      severity: "Major",
      affectedAreas: ["Lead Generation", "Revenue Predictability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Test 3 new channels this month", "Ask customers how they found you", "Study what"s working for competitors now"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Platform algorithm changes", "Market saturation of tactic", "Customer behavior shifts"],
      automationPotential: {
        rating: "Medium",
        example: 'AI-powered ad testing and multi-channel automation to quickly identify what"s working.'
      },
      pathToRoot: 'Tactics Stopped Working → Lead Gen Insufficient → Can"t Find Prospects'
    }
  },
  'not-trying-channels': {
    explanation: 'You are stuck in one or two marketing channels (e.g., only Instagram, only referrals) and haven"t tested others. This limits your reach and makes you vulnerable to channel risk.',
    relatedProblems: ["not-enough-activity", "inconsistent-effort", "wrong-channels"],
    impactAnalysis: {
      financialImpact: 'Missed opportunities; vulnerable to single-channel failure; slower growth.',
      severity: "Moderate",
      affectedAreas: ["Lead Diversity", "Risk Management"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Easy",
      quickWins: ["Test one new channel this week with $100 or 5 hours", "Ask peers what"s working for them", "Use a "Channel Matrix" to identify untested options"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of the unknown", "Comfort with current method", "Resource constraints"],
      automationPotential: {
        rating: "High",
        example: 'Multi-channel marketing automation platforms (e.g., HubSpot, Marketo) make it easy to test new channels.'
      },
      pathToRoot: 'Not Trying Channels → Lead Gen Insufficient → Can"t Find Prospects'
    }
  },
  'inconsistent-effort': {
    explanation: 'You do marketing in bursts when desperate for leads, then stop when busy. This creates a feast-or-famine cycle where your pipeline is either empty or overflowing.',
    relatedProblems: ["not-enough-activity", "lumpy-revenue", "cash-flow-gaps"],
    impactAnalysis: {
      financialImpact: 'Unpredictable revenue; inability to plan or scale; constant stress.',
      severity: "Major",
      affectedAreas: ["Revenue Predictability", "Scalability", "Founder Stress"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Block recurring time on calendar for lead gen", "Hire someone to keep it consistent", "Set up evergreen automated campaigns"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Reactive business management", "No systems or delegation", "Founder doing delivery and sales"],
      automationPotential: {
        rating: "High",
        example: 'Automated drip campaigns, SEO, and content marketing run 24/7 whether you are busy or not.'
      },
      pathToRoot: 'Inconsistent Effort → Lead Gen Insufficient → Can"t Find Prospects'
    }
  },
  // NO VISIBILITY
  'no-website': {
    explanation: 'You have no website or a broken/outdated one. Prospects who search for you online find nothing, or find something that makes you look unprofessional or out of business.',
    relatedProblems: ["no-visibility", "seo-nonexistent", "website-unprofessional"],
    impactAnalysis: {
      financialImpact: 'Lost inbound leads; damaged credibility; inability to scale marketing.',
      severity: "Major",
      affectedAreas: ["Lead Generation", "Brand Trust", "Marketing Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 weeks",
      difficulty: "Easy",
      quickWins: ["Launch a simple 1-page site today (Carrd, Webflow, Wix)", "Get a professional domain", "Add basic SEO (title, description, keywords)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Relying solely on referrals", "Thinking "I don"t need a website"", "Perfectionism preventing launch"],
      automationPotential: {
        rating: "High",
        example: 'AI website builders (e.g., 10Web, Durable) can create a professional site in minutes.'
      },
      pathToRoot: 'No Website → No Visibility → Prospects Don"t Know We Exist'
    }
  },
  'not-on-platforms': {
    explanation: 'You are absent from the platforms where your audience is actively searching, discussing, and making buying decisions (e.g., LinkedIn, Reddit, industry forums).',
    relatedProblems: ["no-visibility", "social-inactive", "wrong-channels"],
    impactAnalysis: {
      financialImpact: 'Invisible to a large segment of potential customers; competitors capture mindshare.',
      severity: "Major",
      affectedAreas: ["Brand Awareness", "Lead Generation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Create profiles on top 3 platforms for your niche", "Engage (comment, share) before selling", "Post valuable content consistently"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Don"t know where audience is", "Fear of social media", "Too busy"],
      automationPotential: {
        rating: "High",
        example: 'Social media scheduling tools (Buffer, Hootsuite) and AI content generators make this easy.'
      },
      pathToRoot: 'Not On Platforms → No Visibility → Prospects Don"t Know We Exist'
    }
  },
  'seo-nonexistent': {
    explanation: 'Your website doesn"t rank for any relevant keywords. When prospects search for solutions to their problems, you don't appear in results—even on page 10.',
    relatedProblems: ["not-showing-search", "no-visibility", "no-website"],
    impactAnalysis: {
      financialImpact: 'Zero organic traffic; reliance on expensive paid ads; missed long-term compounding.',
      severity: "Major",
      affectedAreas: ["Inbound Leads", "CAC", "Scalability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Medium",
      quickWins: ["Fix basic on-page SEO (titles, headers, alt tags)", "Create 10 blog posts targeting long-tail keywords", "Get 5 backlinks from relevant sites"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["New website", "No content strategy", "Technical SEO issues", "No backlink profile"],
      automationPotential: {
        rating: "High",
        example: 'AI SEO tools (e.g., Surfer SEO, Clearscope) guide optimization; AI content tools scale production.'
      },
      pathToRoot: 'SEO Non-Existent → No Visibility → Prospects Don"t Know We Exist'
    }
  },
  'not-showing-search': {
    explanation: 'Even if you have a website, it"s not appearing in Google/Bing for the keywords your prospects are searching. This could be technical (de-indexed) or competitive (outranked).',
    relatedProblems: ["seo-nonexistent", "no-visibility"],
    impactAnalysis: {
      financialImpact: 'Lost organic lead flow; higher reliance on paid channels.',
      severity: "Major",
      affectedAreas: ["Organic Traffic", "CAC"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Check Google Search Console for indexing issues", "Submit sitemap", "Fix any crawl errors", "Target less competitive keywords"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical SEO issues (robots.txt blocking crawlers)", "Google penalty", "Zero backlinks", "Weak content"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated SEO audits (Screaming Frog, Ahrefs) identify technical issues.'
      },
      pathToRoot: 'Not Showing in Search → No Visibility → Prospects Don"t Know We Exist'
    }
  },
  'social-inactive': {
    explanation: 'Your social media profiles exist but are dormant (last post was 6 months ago). This signals to prospects that your business might be dead or unprofessional.',
    relatedProblems: ["no-visibility", "not-on-platforms", "not-publishing"],
    impactAnalysis: {
      financialImpact: 'Lost trust and credibility; missed networking and referral opportunities.',
      severity: "Moderate",
      affectedAreas: ["Brand Perception", "Lead Generation"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Post 3x/week minimum", "Share valuable content, not just promotional", "Engage with others" posts daily"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Don"t see ROI", "Too busy", "Don"t know what to post"],
      automationPotential: {
        rating: "High",
        example: 'AI content generators and scheduling tools (Buffer, Later) automate social presence.'
      },
      pathToRoot: 'Social Inactive → No Visibility → Prospects Don"t Know We Exist'
    }
  },
  'not-publishing': {
    explanation: 'You create no content—no blog posts, videos, podcasts, or case studies. You have no way to demonstrate expertise, attract organic traffic, or nurture leads.',
    relatedProblems: ["no-visibility", "seo-nonexistent", "social-inactive"],
    impactAnalysis: {
      financialImpact: 'No inbound marketing engine; high CAC; no compounding growth.',
      severity: "Major",
      affectedAreas: ["Lead Generation", "Authority Building", "SEO"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Publish one piece of content this week", "Repurpose existing knowledge (FAQs, client questions)", "Commit to weekly publishing schedule"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Perfectionism", "Don"t know what to write", "Too busy", "Fear of judgment"],
      automationPotential: {
        rating: "High",
        example: 'AI writing tools (ChatGPT, Jasper) can draft content in minutes; video tools auto-transcribe and repurpose.'
      },
      pathToRoot: 'Not Publishing → No Visibility → Prospects Don"t Know We Exist'
    }
  },
  // NO REFERRALS COMING IN
  'dont-know-how-refer': {
    explanation: 'Your customers want to refer you but don"t know how. There's no clear process, link, or incentive structure guiding them.',
    relatedProblems: ["no-referrals", "not-asking-referrals", "dont-make-easy"],
    impactAnalysis: {
      financialImpact: 'Lost low-CAC leads; untapped word-of-mouth growth.',
      severity: "Moderate",
      affectedAreas: ["Lead Generation", "Customer Lifetime Value"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Create a simple referral landing page", "Send an email explaining how to refer", "Add a "Refer a Friend" button to invoices/emails"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Assumed it was obvious", "No formal referral program", "No incentive offered"],
      automationPotential: {
        rating: "High",
        example: 'Referral software (ReferralCandy, Viral Loops) automates tracking and rewards.'
      },
      pathToRoot: 'Don"t Know How to Refer → No Referrals → Prospects Don't Know We Exist'
    }
  },
  'no-incentive-referrals': {
    explanation: 'You ask for referrals but offer nothing in return. Most people need a nudge—either financial (commission, discount) or social (recognition).',
    relatedProblems: ["no-referrals", "not-asking-referrals"],
    impactAnalysis: {
      financialImpact: 'Referral rate stays at baseline (<5%); missed compounding growth.',
      severity: "Moderate",
      affectedAreas: ["Growth Rate", "CAC"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Offer 10-20% discount for referrals", "Give both referrer and referee a bonus", "Publicly thank top referrers"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Cheapness", "Fear of "Paying for referrals"", "Didn"t think it was necessary"],
      automationPotential: {
        rating: "High",
        example: 'Automated referral tracking and reward distribution via platforms like Rewardful.'
      },
      pathToRoot: 'No Incentive → No Referrals → Prospects Don"t Know We Exist'
    }
  },
  'service-not-remarkable': {
    explanation: 'Your service is fine but not exceptional. There"s nothing "Wow' about it that compels customers to tell their friends. It's forgettable.',
    relatedProblems: ["no-referrals", "no-word-mouth", "not-memorable"],
    impactAnalysis: {
      financialImpact: 'Low organic growth; high dependence on paid marketing; limited viral potential.',
      severity: "Major",
      affectedAreas: ["Growth Rate", "Brand Advocacy"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Add one "Surprise and delight" element", "Ask customers what would make it referral-worthy", "Over-deliver on one specific aspect"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Commoditized service", "Low service standards", "No unique process or experience"],
      automationPotential: {
        rating: "Medium",
        example: 'AI-powered personalization or instant results can create "Wow" moments.'
      },
      pathToRoot: 'Service Not Remarkable → No Referrals → Prospects Don"t Know We Exist'
    }
  },
  'dont-make-easy': {
    explanation: 'Even motivated customers struggle to refer you because the process is clunky—no link, no template, no form. Friction kills referrals.',
    relatedProblems: ["no-referrals", "dont-know-how-refer"],
    impactAnalysis: {
      financialImpact: 'Referral rate cut in half by friction alone.',
      severity: "Moderate",
      affectedAreas: ["Lead Generation", "Growth Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Create a one-click referral link", "Provide a pre-written email template", "Add "Share" buttons to confirmation emails"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Never thought about the UX of referring", "No dedicated landing page", "Manual process"],
      automationPotential: {
        rating: "High",
        example: 'Referral platforms (ReferralCandy, GrowSurf) make sharing one-click simple.'
      },
      pathToRoot: 'Don"t Make It Easy → No Referrals → Prospects Don't Know We Exist'
    }
  },
  'forget-ask': {
    explanation: 'You intend to ask for referrals but always forget—after project completion, after great results, after positive feedback. The moment passes.',
    relatedProblems: ["not-asking-referrals", "no-referrals"],
    impactAnalysis: {
      financialImpact: 'Massive missed opportunity; lost low-CAC leads at peak satisfaction.',
      severity: "Moderate",
      affectedAreas: ["Lead Generation", "Growth Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Add referral ask to project completion email", "Set calendar reminder 1 week post-delivery", "Train team to ask during final call"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["No system or reminder", "Awkwardness or fear of asking", "Too busy"],
      automationPotential: {
        rating: "High",
        example: 'Automated post-delivery email sequences with referral CTA.'
      },
      pathToRoot: 'Forget to Ask → No Referrals → Prospects Don"t Know We Exist'
    }
  },
  // NO WORD OF MOUTH
  'not-talk-worthy': {
    explanation: 'Your service doesn"t generate stories or emotions strong enough for people to naturally bring it up in conversation. It's transactional, not memorable.',
    relatedProblems: ["no-word-mouth", "service-not-remarkable", "not-memorable"],
    impactAnalysis: {
      financialImpact: 'No viral coefficient; reliance on paid/outbound only; slow growth.',
      severity: "Moderate",
      affectedAreas: ["Growth Rate", "Brand Advocacy"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Create one "Shareworthy" moment in delivery", "Use unexpected packaging or communication", "Ask "What would make this worth talking about?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Generic service delivery", "No emotional connection", "Purely functional value"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated personalized video messages or AI-generated custom insights can create "Wow" moments.'
      },
      pathToRoot: 'Not Talk-Worthy → No Word of Mouth → Prospects Don"t Know We Exist'
    }
  },
  'no-community': {
    explanation: 'You have no community, group, or network where customers can connect with each other. This kills network effects and organic word-of-mouth.',
    relatedProblems: ["no-word-mouth", "not-talk-worthy"],
    impactAnalysis: {
      financialImpact: 'Low retention; no viral loops; missed upsell opportunities.',
      severity: "Moderate",
      affectedAreas: ["Customer Retention", "LTV", "Organic Growth"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Create a private Facebook/Slack group for customers", "Host monthly Q&A or networking calls", "Feature customer wins publicly"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Transactional business model", "No thought given to post-sale engagement", "Fear of moderation burden"],
      automationPotential: {
        rating: "Medium",
        example: 'Community platforms (Circle, Skool) have built-in automation and AI moderation.'
      },
      pathToRoot: 'No Community → No Word of Mouth → Prospects Don"t Know We Exist'
    }
  },
  'not-memorable': {
    explanation: 'Your brand, service, and experience are so bland that customers forget about you the moment they finish working with you. No top-of-mind awareness.',
    relatedProblems: ["not-talk-worthy", "no-word-mouth", "service-not-remarkable"],
    impactAnalysis: {
      financialImpact: 'No repeat business; no referrals; constant need to reintroduce yourself.',
      severity: "Moderate",
      affectedAreas: ["Brand Recall", "Repeat Revenue", "Referrals"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Medium",
      quickWins: ["Develop a unique brand voice or visual identity", "Create a signature process or framework", "Use storytelling in all communications"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Generic branding", "No personality", "Purely functional service"],
      automationPotential: {
        rating: "Low",
        example: 'Brand identity is human-driven, but AI can help with consistent messaging.'
      },
      pathToRoot: 'Not Memorable → No Word of Mouth → Prospects Don"t Know We Exist'
    }
  },
  'clients-dont-understand': {
    explanation: 'Your service is so complex or technical that even satisfied customers can"t explain what you do to their peers. 'It's complicated' kills referrals.',
    relatedProblems: ["no-word-mouth", "explanation-complicated"],
    impactAnalysis: {
      financialImpact: 'Low referral rate despite satisfaction; longer sales cycles (re-explaining every time).',
      severity: "Moderate",
      affectedAreas: ["Referrals", "Sales Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Create a simple 1-sentence description", "Develop a visual explainer or analogy", "Test it: "Can a 10-year-old understand it?'"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Industry jargon", "Technical service", "No clear value prop"],
      automationPotential: {
        rating: "High",
        example: 'AI-generated explainer videos or infographics simplify complex concepts.'
      },
      pathToRoot: 'Clients Don"t Understand → No Word of Mouth → Prospects Don't Know We Exist'
    }
  },
  // WRONG CHANNELS
  'marketing-not-audience': {
    explanation: 'You are marketing where you prefer to be, not where your customers actually are. Classic mismatch between your behavior and theirs.',
    relatedProblems: ["wrong-channels", "not-on-platforms", "assumptions-hangout"],
    impactAnalysis: {
      financialImpact: '100% wasted marketing budget on wrong channels.',
      severity: "Critical",
      affectedAreas: ["Marketing ROI", "Lead Generation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Survey customers: "Where do you spend time online?'", "Audit where competitors are active", "Test new channel this week"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Founder comfort over customer research", "Following generic advice", "Assumptions not validated"],
      automationPotential: {
        rating: "Medium",
        example: 'Social listening tools (SparkToro) reveal where your audience actually hangs out.'
      },
      pathToRoot: 'Marketing Not Where Audience Is → Wrong Channels → Prospects Don"t Know We Exist'
    }
  },
  'message-wrong-platforms': {
    explanation: 'Your message might be right, but you"re saying it on the wrong platform. LinkedIn content on TikTok, or vice versa, falls flat.',
    relatedProblems: ["wrong-channels", "tactics-dont-match"],
    impactAnalysis: {
      financialImpact: 'Low engagement; wasted content production effort.',
      severity: "Moderate",
      affectedAreas: ["Marketing Efficiency", "Content ROI"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Match content format to platform norms", "Study top performers on each platform", "Repurpose don"t copy-paste"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Cross-posting same content everywhere", "Not understanding platform culture"],
      automationPotential: {
        rating: "High",
        example: 'AI tools (Repurpose.io) adapt content format to each platform automatically.'
      },
      pathToRoot: 'Message on Wrong Platforms → Wrong Channels → Prospects Don"t Know We Exist'
    }
  },
  'tactics-dont-match': {
    explanation: 'You"re using outbound tactics (cold email) for an inbound audience (they want to discover you), or vice versa. The approach doesn't fit customer buying behavior.',
    relatedProblems: ["wrong-channels", "message-wrong-platforms"],
    impactAnalysis: {
      financialImpact: 'High effort, low conversion; wasted time and resources.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "CAC"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 month",
      difficulty: "Medium",
      quickWins: ["Map customer buying journey", "Identify whether they "Search" or need to be "Interrupted'", "Align tactics accordingly"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Copying other industries", "Not understanding customer journey", "Using what"s comfortable not what works"],
      automationPotential: {
        rating: "Medium",
        example: 'Marketing automation platforms help align tactics to journey stage.'
      },
      pathToRoot: 'Tactics Don"t Match Behavior → Wrong Channels → Prospects Don't Know We Exist'
    }
  },
  'budget-wrong-activities': {
    explanation: 'You"re spending money on low-ROI activities (e.g., expensive trade shows) while neglecting high-ROI ones (e.g., SEO, email).',
    relatedProblems: ["wrong-channels", "events-no-roi", "ads-expensive"],
    impactAnalysis: {
      financialImpact: 'Direct waste of marketing budget; missed opportunities in better channels.',
      severity: "Major",
      affectedAreas: ["Marketing ROI", "Profitability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Medium",
      quickWins: ["Calculate ROI of each channel", "Cut bottom 20%", "Reallocate to top performers"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Not tracking ROI", "Emotional attachment to certain tactics", "Sunk cost fallacy"],
      automationPotential: {
        rating: "High",
        example: 'Marketing attribution software (HubSpot, Google Analytics 4) shows exact ROI per channel.'
      },
      pathToRoot: 'Budget on Wrong Activities → Wrong Channels → Prospects Don"t Know We Exist'
    }
  },
  // OUTREACH ISSUES (LEVEL 7)
  'lists-outdated': {
    explanation: 'You"re emailing or calling prospects from old, bought, or scraped lists. Most contacts are invalid, irrelevant, or already annoyed by spam.',
    relatedProblems: ["outreach-issues", "getting-ignored", "outbound-spammy"],
    impactAnalysis: {
      financialImpact: 'Wasted labor and tools; domain reputation damage; potential legal issues (GDPR/CAN-SPAM).',
      severity: "Moderate",
      affectedAreas: ["Outbound Effectiveness", "Brand Reputation"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Clean list (remove bounces, unsubscribes)", "Use real-time data providers (Apollo, ZoomInfo)", "Verify emails before sending"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Bought cheap list", "Haven"t updated in months/years", "No data hygiene process"],
      automationPotential: {
        rating: "High",
        example: 'Email verification tools (NeverBounce, ZeroBounce) auto-clean lists.'
      },
      pathToRoot: 'Lists Outdated → Outreach Issues → Prospects Don"t Know We Exist'
    }
  },
  // MESSAGE DOESN"T RESONATE (LEVEL 7)
  'talking-us-not-problems': {
    explanation: 'Your marketing talks about you—your features, your company, your awards—not their problems, desires, or transformation. It"s all "We' and no 'You'.',
    relatedProblems: ["message-no-resonate", "benefits-unclear", "generic-messaging"],
    impactAnalysis: {
      financialImpact: 'Low engagement; high bounce rate; prospects tune out.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Engagement"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Rewrite homepage to start with their problem", "Count "You" vs "We' ratio (should be 3:1)", "Lead with pain not features"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Ego-driven marketing", "Copywriting 101 not learned", "Internal focus"],
      automationPotential: {
        rating: "High",
        example: 'AI copywriting tools (Jasper, Copy.ai) can reframe features as benefits.'
      },
      pathToRoot: 'Talking About Us → Message Doesn"t Resonate → Prospects Aware But Don't Engage'
    }
  },
  'wrong-language': {
    explanation: 'You"re either using too much jargon (confusing) or not enough industry terminology (not credible). The language doesn't match how your audience talks.',
    relatedProblems: ["message-no-resonate", "doesnt-speak-pain", "explanation-complicated"],
    impactAnalysis: {
      financialImpact: 'Low trust; high friction; prospects don"t "Get it'.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Trust"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Easy",
      quickWins: ["Mine customer reviews for exact phrases they use", "Interview 5 customers about how they describe their problem", "Mirror their language back"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Assuming your vocabulary is theirs", "Technical background showing through", "No customer research"],
      automationPotential: {
        rating: "High",
        example: 'AI text analysis of customer support tickets and reviews reveals their exact language.'
      },
      pathToRoot: 'Wrong Language → Message Doesn"t Resonate → Prospects Aware But Don't Engage'
    }
  },
  'benefits-unclear': {
    explanation: 'You list features but don"t translate them into benefits. Prospects think 'So what?' because you haven't connected the dots for them.',
    relatedProblems: ["message-no-resonate", "unclear-value-prop", "talking-us-not-problems"],
    impactAnalysis: {
      financialImpact: 'Low conversion; prospects don"t see value; price becomes only differentiator.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Perceived Value"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["For every feature, add "Which means...' and state the benefit", "Focus on outcomes not inputs", "Show before/after transformation"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inside-out thinking", "Feature-focused product development", "Poor copywriting"],
      automationPotential: {
        rating: "High",
        example: 'AI can convert feature lists to benefit statements using frameworks like PAS (Problem-Agitate-Solution).'
      },
      pathToRoot: 'Benefits Unclear → Message Doesn"t Resonate → Prospects Aware But Don't Engage'
    }
  },
  'doesnt-speak-pain': {
    explanation: 'Your messaging focuses on aspirational outcomes but doesn"t acknowledge or amplify the current pain. Pain is a stronger motivator than gain for most buyers.',
    relatedProblems: ["message-no-resonate", "talking-us-not-problems"],
    impactAnalysis: {
      financialImpact: 'Low urgency; prospects delay; "Maybe later" becomes "Never'.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Deal Velocity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Open with the pain point", "Use emotional language around current struggle", "Make the cost of inaction clear"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Accentuate the positive" mindset", "Not understanding emotional triggers", "Fear of being "Negative""],
      automationPotential: {
        rating: "Medium",
        example: 'AI sentiment analysis can identify high-pain keywords and phrases from reviews.'
      },
      pathToRoot: 'Doesn"t Speak to Pain → Message Doesn't Resonate → Prospects Aware But Don't Engage'
    }
  },
  'generic-messaging': {
    explanation: 'Your message could apply to anyone. "We help businesses grow" or "Quality service, affordable prices.' Nothing specific, memorable, or differentiated.',
    relatedProblems: ["message-no-resonate", "generic-positioning", "looks-like-everyone"],
    impactAnalysis: {
      financialImpact: 'Invisible in market; no recall; confused prospects; price competition.',
      severity: "Major",
      affectedAreas: ["Brand Differentiation", "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2 weeks",
      difficulty: "Medium",
      quickWins: ["Add specific numbers or niche", "State WHO you serve and the TRANSFORMATION you create", "Avoid platitudes ("Best quality", "Customer-first')"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of being too niche", "Copying competitors", "No clear positioning"],
      automationPotential: {
        rating: "Medium",
        example: 'AI competitor analysis tools identify overused phrases to avoid.'
      },
      pathToRoot: 'Generic Messaging → Message Doesn"t Resonate → Prospects Aware But Don't Engage'
    }
  },
  // OFFER NOT COMPELLING (LEVEL 7)
  'looks-like-everyone': {
    explanation: 'Your service offering, pricing, packaging, and presentation are indistinguishable from competitors. There"s no clear reason to choose you over them.',
    relatedProblems: ["offer-not-compelling", "no-differentiation", "generic-positioning"],
    impactAnalysis: {
      financialImpact: 'Price becomes the only decision factor; low margins; high churn.',
      severity: "Critical",
      affectedAreas: ["Differentiation", "Pricing Power", "Win Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Hard",
      quickWins: ["Add one unique element to your offer", "Change packaging or delivery format", "Identify your "Unfair advantage""]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Copying industry standards", "Fear of being different", "No strategic positioning"],
      automationPotential: {
        rating: "Low",
        example: 'Strategic differentiation is human-driven, but AI can analyze competitor positioning gaps.'
      },
      pathToRoot: 'Looks Like Everyone → Offer Not Compelling → Prospects Aware But Don"t Engage'
    }
  },
  'no-differentiation': {
    explanation: 'You have not clearly articulated what makes you different. Even if differences exist, they are invisible to prospects because you haven"t communicated them.',
    relatedProblems: ["offer-not-compelling", "differentiation-unclear", "looks-like-everyone"],
    impactAnalysis: {
      financialImpact: 'Commoditization; price competition; low brand value.',
      severity: "Major",
      affectedAreas: ["Pricing Power", "Brand Equity", "Win Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Complete a positioning canvas (target, problem, solution, alternatives, differentiation)", "Ask customers why they chose you", "Make your USP prominent"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Never did positioning work", "Assumed differences were obvious", "Internal vs external perspective gap"],
      automationPotential: {
        rating: "Medium",
        example: 'AI-powered competitive analysis identifies white space opportunities.'
      },
      pathToRoot: 'No Differentiation → Offer Not Compelling → Prospects Aware But Don"t Engage'
    }
  },
  'generic-positioning': {
    explanation: 'Your positioning is broad and vague. You serve "Everyone" with "Everything,' which means you are memorable to no one.',
    relatedProblems: ["offer-not-compelling", "generic-messaging", "no-differentiation"],
    impactAnalysis: {
      financialImpact: 'High CAC; low conversion; difficult to scale marketing.',
      severity: "Major",
      affectedAreas: ["Marketing Efficiency", "Brand Strength"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Choose one niche to dominate first", "Rewrite positioning statement with specificity", "Say no to projects outside your niche"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of turning away business", "No strategic clarity", "Generalist background"],
      automationPotential: {
        rating: "Low",
        example: 'AI can help analyze market segments, but strategic positioning is a human decision.'
      },
      pathToRoot: 'Generic Positioning → Offer Not Compelling → Prospects Aware But Don"t Engage'
    }
  },
  'nothing-unique': {
    explanation: 'There is genuinely nothing unique about your service. You are a pure commodity, and the only way to compete is on price or availability.',
    relatedProblems: ["offer-not-compelling", "commoditized-service", "looks-like-everyone"],
    impactAnalysis: {
      financialImpact: 'Race to bottom on price; zero brand value; unsustainable margins.',
      severity: "Critical",
      affectedAreas: ["Profitability", "Business Sustainability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Create a proprietary process or framework", "Bundle services uniquely", "Add a unique guarantee or delivery model"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Never innovated beyond industry standard", "Lack of strategic thinking", "Survival mode (reactive business)"],
      automationPotential: {
        rating: "High",
        example: 'Building proprietary AI or automation into your service creates instant differentiation.'
      },
      pathToRoot: 'Nothing Unique → Offer Not Compelling → Prospects Aware But Don"t Engage'
    }
  },
  'doesnt-stand-out': {
    explanation: 'Your offer might be good, but it"s visually, verbally, and experientially bland. Nothing catches the eye or ear. You blend into the background.',
    relatedProblems: ["offer-not-compelling", "design-amateur", "not-memorable"],
    impactAnalysis: {
      financialImpact: 'Low attention capture; poor recall; high prospect drop-off.',
      severity: "Moderate",
      affectedAreas: ["Brand Recognition", "Conversion Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Medium",
      quickWins: ["Redesign key brand elements for boldness", "Use contrarian or provocative messaging", "Add visual/experiential "Wow" factor"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Playing it safe", "No design/brand investment", "Risk aversion"],
      automationPotential: {
        rating: "Medium",
        example: 'AI design tools (Canva, Looka) can create standout visuals quickly.'
      },
      pathToRoot: 'Doesn"t Stand Out → Offer Not Compelling → Prospects Aware But Don't Engage'
    }
  },
  // WRONG TIMING (LEVEL 7)
  'not-buying-mode': {
    explanation: 'You"re reaching prospects when they are not actively looking for a solution. They might have the problem but no urgency to solve it right now.',
    relatedProblems: ["wrong-timing", "not-nurturing", "problem-not-urgent"],
    impactAnalysis: {
      financialImpact: 'Low conversion despite interest; long sales cycles; high follow-up burden.',
      severity: "Moderate",
      affectedAreas: ["Conversion Rate", "Deal Velocity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Build a nurture sequence for "Not now"", "Ask "When would be a better time?'", "Stay top-of-mind via content"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Outbound to cold lists", "No trigger-based outreach", "No long-term nurture"],
      automationPotential: {
        rating: "High",
        example: 'Automated drip campaigns keep you top-of-mind until buying mode activates.'
      },
      pathToRoot: 'Not in Buying Mode → Wrong Timing → Prospects Aware But Don"t Engage'
    }
  },
  'not-nurturing': {
    explanation: 'You contact prospects once, they say "Not now,' and you give up. No follow-up, no nurturing, no staying in touch. You let them go cold.',
    relatedProblems: ["wrong-timing", "no-followup", "one-and-done"],
    impactAnalysis: {
      financialImpact: 'Massive lost opportunity; 80% of sales happen after 5+ touches.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Pipeline Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Build a 6-month email nurture sequence", "Follow up at 1 week, 1 month, 3 months", "Provide value in each touch (not just "Checking in")"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of CRM or follow-up system", "Impatience", "Fear of being annoying"],
      automationPotential: {
        rating: "High",
        example: 'Marketing automation (HubSpot, ActiveCampaign) handles nurturing automatically.'
      },
      pathToRoot: 'Not Nurturing → Wrong Timing → Prospects Aware But Don"t Engage'
    }
  },
  'no-followup': {
    explanation: 'You send one message or have one conversation, then wait for them to come back to you. Most won"t. No follow-up means no sales.',
    relatedProblems: ["not-nurturing", "one-and-done", "following-up-inconsistently"],
    impactAnalysis: {
      financialImpact: 'Conversion rate drops by 50-80% without follow-up.',
      severity: "Critical",
      affectedAreas: ["Sales Conversion", "Pipeline Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Set reminders to follow up 2, 7, and 14 days after initial contact", "Use CRM to track follow-ups", "Create follow-up templates"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Forgetting", "Assuming they"ll reach out if interested", "Fear of rejection"],
      automationPotential: {
        rating: "High",
        example: 'Automated follow-up sequences trigger based on prospect behavior.'
      },
      pathToRoot: 'No Follow-Up → Wrong Timing → Prospects Aware But Don"t Engage'
    }
  },
  'one-and-done': {
    explanation: 'You give up after the first attempt. One email, one call, one message. This is the most common sales mistake and kills 80% of potential deals.',
    relatedProblems: ["no-followup", "not-nurturing", "inconsistent-effort"],
    impactAnalysis: {
      financialImpact: 'Leaving 80% of revenue on the table; massive opportunity cost.',
      severity: "Critical",
      affectedAreas: ["Sales Effectiveness", "Revenue Growth"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Commit to minimum 5 touches per prospect", "Space them out over weeks/months", "Vary the medium (email, call, LinkedIn)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of being pushy", "Lack of persistence", "No system"],
      automationPotential: {
        rating: "High",
        example: 'Sales engagement platforms (Outreach, SalesLoft) automate multi-touch sequences.'
      },
      pathToRoot: 'One-and-Done → Wrong Timing → Prospects Aware But Don"t Engage'
    }
  },
  // NO CLEAR NEXT STEP (LEVEL 7)
  'no-cta': {
    explanation: 'Your marketing or sales conversation ends with no call-to-action. Prospects are interested but don"t know what to do next, so they do nothing.',
    relatedProblems: ["no-clear-next-step", "cta-unclear"],
    impactAnalysis: {
      financialImpact: 'Huge drop-off at conversion point; lost qualified leads.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Sales Effectiveness"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Add a clear CTA to every page, email, and conversation", "Make it one specific action", "Tell them exactly what happens next"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Assumption that prospects will figure it out", "Passive selling", "Fear of being pushy"],
      automationPotential: {
        rating: "Low",
        example: 'This is a human/design fix, but A/B testing tools can optimize CTA wording.'
      },
      pathToRoot: 'No CTA → No Clear Next Step → Prospects Aware But Don"t Engage'
    }
  },
  'cta-unclear': {
    explanation: 'Your CTA exists but is vague or confusing. "Learn more,' 'Get started,' 'Contact us'—these don't tell prospects what will actually happen or why they should click.',
    relatedProblems: ["no-clear-next-step", "no-cta", "too-much-friction"],
    impactAnalysis: {
      financialImpact: 'Lower click-through and conversion rates; confused prospects bounce.',
      severity: "Moderate",
      affectedAreas: ["Conversion Rate", "User Experience"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Make CTA specific ("Book a 15-min demo')", "Add value ("Get instant pricing")", "Reduce ambiguity"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Generic templates", "Not thinking from prospect"s perspective", "Fear of commitment"],
      automationPotential: {
        rating: "Medium",
        example: 'A/B testing tools (Optimizely, VWO) identify best-performing CTA wording.'
      },
      pathToRoot: 'CTA Unclear → No Clear Next Step → Prospects Aware But Don"t Engage'
    }
  },
  'too-much-friction': {
    explanation: 'The next step requires too much effort, information, or commitment. Long forms, scheduling hassles, or unclear processes kill momentum.',
    relatedProblems: ["no-clear-next-step", "cta-unclear", "ask-too-big"],
    impactAnalysis: {
      financialImpact: 'Massive drop-off at conversion point; qualified leads lost due to process friction.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "User Experience"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Reduce form fields to 3 max", "Add one-click scheduling (Calendly)", "Remove unnecessary steps"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Internal process requirements overriding UX", "No funnel optimization", "Lack of awareness"],
      automationPotential: {
        rating: "High",
        example: 'Form builders and scheduling tools (Calendly, Typeform) eliminate friction.'
      },
      pathToRoot: 'Too Much Friction → No Clear Next Step → Prospects Aware But Don"t Engage'
    }
  },
  'ask-too-big': {
    explanation: 'Your first ask is too large. "Sign a 12-month contract' or 'Pay $10k upfront.' You haven't built enough trust or demonstrated value yet.',
    relatedProblems: ["no-clear-next-step", "too-much-friction", "risk-too-high"],
    impactAnalysis: {
      financialImpact: 'High abandonment rate; long sales cycles; low close rate.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Deal Velocity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 weeks",
      difficulty: "Medium",
      quickWins: ["Create a micro-commitment first step ("Free consultation", "7-day trial')", "Build a value ladder", "Reduce risk perception"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["No low-commitment offer", "Impatience to close", "Not understanding buyer psychology"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated lead magnets and trials lower the first commitment threshold.'
      },
      pathToRoot: 'Ask Too Big → No Clear Next Step → Prospects Aware But Don"t Engage'
    }
  },
  'multiple-conflicting-cta': {
    explanation: 'Your page or pitch has too many CTAs (Book a demo, Download whitepaper, Subscribe, Call us). Paradox of choice leads to no action.',
    relatedProblems: ["no-clear-next-step", "too-many-options", "cta-unclear"],
    impactAnalysis: {
      financialImpact: 'Conversion rate drops significantly; confused prospects leave.',
      severity: "Moderate",
      affectedAreas: ["Conversion Rate", "Clarity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Choose ONE primary CTA per page", "Make it prominent", "Remove or hide secondary options"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Trying to please everyone", "No prioritization", "Internal politics (everyone wants their CTA)"],
      automationPotential: {
        rating: "Low",
        example: 'A/B testing can determine which single CTA performs best.'
      },
      pathToRoot: 'Multiple Conflicting CTAs → No Clear Next Step → Prospects Aware But Don"t Engage'
    }
  },
  // CONTENT/CREATIVE WEAK (LEVEL 7)
  'design-amateur': {
    explanation: 'Your website, ads, or materials look unprofessional—bad fonts, low-quality images, poor layout. This signals "Amateur" and kills trust before they even read your message.',
    relatedProblems: ["content-weak", "website-unprofessional", "doesnt-stand-out"],
    impactAnalysis: {
      financialImpact: 'High bounce rate; low trust; inability to charge premium prices.',
      severity: "Major",
      affectedAreas: ["Brand Perception", "Trust", "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 weeks",
      difficulty: "Easy",
      quickWins: ["Hire a designer on Fiverr/Upwork for quick fixes", "Use professional templates (Webflow, Framer)", "Invest in brand photography"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["DIY everything", "No budget for design", "Undervaluing importance of aesthetics"],
      automationPotential: {
        rating: "High",
        example: 'AI design tools (Canva, Looka, Uizard) create professional-looking assets quickly.'
      },
      pathToRoot: 'Design Looks Amateur → Content/Creative Weak → Prospects Aware But Don"t Engage'
    }
  },
  'copy-boring': {
    explanation: 'Your copy is technically correct but lifeless. No personality, no emotion, no storytelling. Prospects read it and feel nothing, remember nothing.',
    relatedProblems: ["content-weak", "no-hook", "not-memorable"],
    impactAnalysis: {
      financialImpact: 'Low engagement; high bounce rate; no emotional connection.',
      severity: "Moderate",
      affectedAreas: ["Engagement", "Brand Connection"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 weeks",
      difficulty: "Medium",
      quickWins: ["Hire a copywriter", "Study great copy (examples from your niche)", "Add storytelling, metaphors, and emotion"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Engineering/technical background", "Fear of being too bold", "No copywriting skill"],
      automationPotential: {
        rating: "High",
        example: 'AI copywriting tools (Jasper, Copy.ai) can punch up bland copy.'
      },
      pathToRoot: 'Copy Boring → Content/Creative Weak → Prospects Aware But Don"t Engage'
    }
  },
  'no-hook': {
    explanation: 'Your content doesn"t grab attention in the first 3 seconds. No compelling headline, no pattern interrupt, no curiosity gap. Prospects scroll right past.',
    relatedProblems: ["content-weak", "copy-boring", "doesnt-stand-out"],
    impactAnalysis: {
      financialImpact: 'Zero engagement despite ad spend; wasted content production.',
      severity: "Major",
      affectedAreas: ["Attention Capture", "Engagement Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Study viral content in your niche", "Use proven hook formulas ("How to X without Y")", "Lead with surprising stat or bold claim"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Burying the lede", "No copywriting training", "Playing it too safe"],
      automationPotential: {
        rating: "High",
        example: 'AI tools analyze high-performing hooks and suggest variations.'
      },
      pathToRoot: 'No Hook → Content/Creative Weak → Prospects Aware But Don"t Engage'
    }
  },
  'too-much-text': {
    explanation: 'Your page or ad is a wall of text. No one reads anymore—they scan. Dense paragraphs with no visuals or breaks get ignored.',
    relatedProblems: ["content-weak", "design-amateur", "explanation-complicated"],
    impactAnalysis: {
      financialImpact: 'High bounce rate; key messages never seen; low conversion.',
      severity: "Moderate",
      affectedAreas: ["Engagement", "Conversion Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Break text into short paragraphs (2-3 lines max)", "Add bullet points, subheadings, and images", "Use white space liberally"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Academic or technical writing background", "Trying to explain everything", "No design awareness"],
      automationPotential: {
        rating: "Medium",
        example: 'AI editing tools (Hemingway, Grammarly) suggest readability improvements.'
      },
      pathToRoot: 'Too Much Text → Content/Creative Weak → Prospects Aware But Don"t Engage'
    }
  },
  'unclear-value-prop': {
    explanation: 'After visiting your site or reading your message, prospects still don"t understand what you do, who it's for, or why it matters. Confusion kills conversion.',
    relatedProblems: ["content-weak", "benefits-unclear", "explanation-complicated"],
    impactAnalysis: {
      financialImpact: 'High bounce rate; low conversion; confused prospects leave.',
      severity: "Critical",
      affectedAreas: ["Clarity", "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Medium",
      quickWins: ["Use the formula: "We help [WHO] achieve [WHAT] without [PAIN]'", "Test with 5 strangers: "What do we do?'", "Make it your homepage headline"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inside-out thinking", "Trying to serve everyone", "No clear positioning"],
      automationPotential: {
        rating: "Medium",
        example: 'AI can test value prop clarity with simulated audiences.'
      },
      pathToRoot: 'Unclear Value Prop → Content/Creative Weak → Prospects Aware But Don"t Engage'
    }
  },
  // TRUST SIGNALS MISSING (LEVEL 7)
  'no-social-proof': {
    explanation: 'You have no visible testimonials, reviews, ratings, or client logos. Prospects have no external validation that you"re legit or effective.',
    relatedProblems: ["trust-signals-missing", "no-testimonials", "no-recognizable-clients"],
    impactAnalysis: {
      financialImpact: 'Low trust; high skepticism; prospects choose competitors with proof.',
      severity: "Major",
      affectedAreas: ["Trust", "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Ask 5 happy customers for testimonials this week", "Add star ratings or review widgets", "Display client logos"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Never asked for testimonials", "Forgot to add them to site", "No social proof strategy"],
      automationPotential: {
        rating: "High",
        example: 'Review collection tools (Trustpilot, Birdeye) automate gathering and displaying social proof.'
      },
      pathToRoot: 'No Social Proof → Trust Signals Missing → Prospects Aware But Don"t Engage'
    }
  },
  'no-credentials': {
    explanation: 'You have no visible credentials, certifications, awards, or recognitions. Prospects can"t assess your authority or expertise.',
    relatedProblems: ["trust-signals-missing", "anonymous-brand", "look-too-small"],
    impactAnalysis: {
      financialImpact: 'Lower trust; inability to command premium pricing; longer sales cycles.',
      severity: "Moderate",
      affectedAreas: ["Authority", "Trust", "Pricing Power"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Display any existing certifications prominently", "Join industry associations", "Pursue relevant certifications", "Publish thought leadership"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["New business", "Haven"t pursued credentials", "Undervaluing importance of authority signals"],
      automationPotential: {
        rating: "Low",
        example: 'Authority building is human-driven, but AI can help publish thought leadership content.'
      },
      pathToRoot: 'No Credentials → Trust Signals Missing → Prospects Aware But Don"t Engage'
    }
  },
  'anonymous-brand': {
    explanation: 'Your brand has no face, name, or personality. It"s a faceless entity. People buy from people, not corporations.',
    relatedProblems: ["trust-signals-missing", "no-credentials", "new-unknown"],
    impactAnalysis: {
      financialImpact: 'Low trust; difficulty building relationships; harder to differentiate.',
      severity: "Moderate",
      affectedAreas: ["Trust", "Brand Connection"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Put founder photo and bio on About page", "Show your face in content", "Use personal stories"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Hiding behind brand", "Shyness or privacy concerns", "Corporate mindset"],
      automationPotential: {
        rating: "Low",
        example: 'AI-generated avatars and voices can add personality, but real humans build more trust.'
      },
      pathToRoot: 'Anonymous Brand → Trust Signals Missing → Prospects Aware But Don"t Engage'
    }
  },
  'new-unknown': {
    explanation: 'Your brand is new with no track record. Prospects are risk-averse and prefer established players. You haven"t built any brand equity yet.',
    relatedProblems: ["trust-signals-missing", "too-new-unproven", "no-track-record"],
    impactAnalysis: {
      financialImpact: 'High skepticism; need to offer more proof or lower prices; longer sales cycles.',
      severity: "Major",
      affectedAreas: ["Trust", "Pricing Power", "Win Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Leverage founder"s previous experience", "Offer guarantees or trials", "Build case studies ASAP"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["New business", "No prior track record to transfer"],
      automationPotential: {
        rating: "Low",
        example: 'Trust building is human and time-based, but AI-powered content can accelerate thought leadership.'
      },
      pathToRoot: 'New/Unknown Brand → Trust Signals Missing → Prospects Aware But Don"t Engage'
    }
  },
  // DON"T TRUST US (LEVEL 7)
  'no-testimonials': {
    explanation: 'You have no customer testimonials displayed anywhere. Prospects can"t hear from real people who have used and benefited from your service.',
    relatedProblems: ["dont-trust", "no-social-proof", "no-track-record"],
    impactAnalysis: {
      financialImpact: 'Significantly reduced conversion rate; prospects choose competitors with testimonials.',
      severity: "Major",
      affectedAreas: ["Trust", "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Email 10 happy customers asking for a testimonial", "Record video testimonials (even selfie-style)", "Add testimonials to homepage, pricing, and checkout"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Never asked", "Afraid of rejection", "Don"t know where to put them"],
      automationPotential: {
        rating: "High",
        example: 'Automated review request emails after project completion (via Trustpilot, Boast).'
      },
      pathToRoot: 'No Testimonials → Don"t Trust Us → Prospects Engage But Don't Buy'
    }
  },
  'no-track-record': {
    explanation: 'You have no visible history of success. No case studies, no portfolio, no results shown. Prospects see you as unproven and risky.',
    relatedProblems: ["dont-trust", "no-case-studies", "too-new-unproven"],
    impactAnalysis: {
      financialImpact: 'Low close rate; inability to charge premium; only price-sensitive customers buy.',
      severity: "Major",
      affectedAreas: ["Trust", "Pricing Power", "Win Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Build 3 detailed case studies from best clients", "Show before/after results with numbers", "Offer first clients a discount in exchange for case study rights"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["New business", "Haven"t documented results", "Client confidentiality concerns (get permission)"],
      automationPotential: {
        rating: "Medium",
        example: 'AI case study templates can speed up creation, but stories must be real.'
      },
      pathToRoot: 'No Track Record → Don"t Trust Us → Prospects Engage But Don't Buy'
    }
  },
  'website-unprofessional': {
    explanation: 'Your website looks outdated, broken, or cheap. Poor design, slow load times, or missing information signal that your service quality might be similarly poor.',
    relatedProblems: ["dont-trust", "design-amateur", "no-website"],
    impactAnalysis: {
      financialImpact: 'High bounce rate; lost credibility; prospects don"t even engage.',
      severity: "Critical",
      affectedAreas: ["Brand Perception", "Trust", "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 weeks",
      difficulty: "Medium",
      quickWins: ["Redesign with a professional template (Webflow, Framer)", "Hire a freelancer", "Fix broken links and speed issues immediately"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Built it yourself years ago", "No budget allocated", "Underestimating impact of web presence"],
      automationPotential: {
        rating: "High",
        example: 'AI website builders (10Web, Durable) create professional sites in minutes.'
      },
      pathToRoot: 'Website Unprofessional → Don"t Trust Us → Prospects Engage But Don't Buy'
    }
  },
  'no-case-studies': {
    explanation: 'You have no documented success stories. Prospects can"t visualize how you"ve solved similar problems or what results to expect.',
    relatedProblems: ["dont-trust", "no-track-record", "no-testimonials"],
    impactAnalysis: {
      financialImpact: 'Longer sales cycles; lower close rates; inability to prove ROI.',
      severity: "Major",
      affectedAreas: ["Sales Conversion", "Trust"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "2-4 weeks",
      difficulty: "Medium",
      quickWins: ["Document 3 wins with specific numbers", "Use Problem-Solution-Results format", "Get client permission and publish"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Never took time to document", "Confidentiality fears", "Don"t know how to write them"],
      automationPotential: {
        rating: "High",
        example: 'AI can draft case studies from interview transcripts or project summaries.'
      },
      pathToRoot: 'No Case Studies → Don"t Trust Us → Prospects Engage But Don't Buy'
    }
  },
  'cant-find-reviews': {
    explanation: 'When prospects Google you or search review sites, they find nothing—or worse, bad reviews. No reviews = no trust in modern buying.',
    relatedProblems: ["dont-trust", "no-social-proof", "no-testimonials"],
    impactAnalysis: {
      financialImpact: 'Lost deals to competitors with reviews; prospects ghost after research phase.',
      severity: "Major",
      affectedAreas: ["Trust", "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 months",
      difficulty: "Easy",
      quickWins: ["Claim Google Business Profile", "Ask happy clients to leave Google/Trustpilot reviews", "Respond to all reviews (good and bad)"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Never actively solicited reviews", "Don"t have review profiles set up", "Afraid of bad reviews"],
      automationPotential: {
        rating: "High",
        example: 'Review request automation (Birdeye, Podium) asks for reviews automatically post-service.'
      },
      pathToRoot: 'Can"t Find Reviews → Don't Trust Us → Prospects Engage But Don't Buy'
    }
  },
  'no-recognizable-clients': {
    explanation: 'You have no well-known brands or logos to display. Prospects can"t use social proof shortcuts ('If X trusts them, I can too').',
    relatedProblems: ["dont-trust", "no-social-proof", "too-new-unproven"],
    impactAnalysis: {
      financialImpact: 'Harder to close enterprise or premium clients; lack of brand association.',
      severity: "Moderate",
      affectedAreas: ["Trust", "Brand Perception"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "3-12 months",
      difficulty: "Hard",
      quickWins: ["Target one recognizable brand as a case study client (discount if needed)", "Display any known brands you"ve worked with", "Use industry recognition instead if no big logos"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["New business", "Serve SMBs not enterprises", "Haven"t prioritized "Trophy clients'"],
      automationPotential: {
        rating: "Low",
        example: 'Client acquisition is human-driven, but CRM can help target and track enterprise prospects.'
      },
      pathToRoot: 'No Recognizable Clients → Don"t Trust Us → Prospects Engage But Don't Buy'
    }
  },
  'too-new-unproven': {
    explanation: 'You just launched, have few or no clients, and no reputation. You"re asking prospects to be guinea pigs. Most won't take that risk.',
    relatedProblems: ["dont-trust", "new-unknown", "no-track-record"],
    impactAnalysis: {
      financialImpact: 'Very high skepticism; need to discount or over-deliver to win early clients.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Pricing Power"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Offer first 5 clients a steep discount for testimonials/case studies", "Leverage founder"s prior experience", "Offer money-back guarantee"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["New business", "No transferable reputation"],
      automationPotential: {
        rating: "Low",
        example: 'Trust is built over time with real results, but AI content can accelerate thought leadership.'
      },
      pathToRoot: 'Too New/Unproven → Don"t Trust Us → Prospects Engage But Don't Buy'
    }
  },
  'promises-too-good': {
    explanation: 'Your marketing promises seem unrealistic or exaggerated ("10X your revenue in 30 days!'). This triggers skepticism and 'Too good to be true' alarm bells.',
    relatedProblems: ["dont-trust", "results-unrealistic", "cant-articulate-roi"],
    impactAnalysis: {
      financialImpact: 'High skepticism; prospects assume scam; brand damage.',
      severity: "Major",
      affectedAreas: ["Trust", "Brand Reputation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Tone down hyperbolic claims", "Add caveats and realistic timelines", "Show proof for every claim"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Copying "Guru" marketing", "Desperation", "Lack of ethical marketing standards"],
      automationPotential: {
        rating: "Low",
        example: 'This is a messaging and ethics issue, not an automation opportunity.'
      },
      pathToRoot: 'Promises Too Good → Don"t Trust Us → Prospects Engage But Don't Buy'
    }
  },
  // DON"T UNDERSTAND OFFER (LEVEL 7)
  'explanation-complicated': {
    explanation: 'Your service description is full of jargon, technical terms, or convoluted explanations. Prospects can"t grasp what you actually do or how it helps them.',
    relatedProblems: ["dont-understand-offer", "process-unclear", "wrong-language"],
    impactAnalysis: {
      financialImpact: 'High drop-off; confused prospects don"t buy; longer sales cycles re-explaining.',
      severity: "Major",
      affectedAreas: ["Clarity", "Conversion Rate", "Sales Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Medium",
      quickWins: ["Rewrite with 5th-grade reading level", "Use analogies and examples", "Test with someone outside your industry"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Technical background", "Trying to sound smart", "Inside-out thinking"],
      automationPotential: {
        rating: "High",
        example: 'AI readability tools (Hemingway, Grammarly) simplify language; AI can convert jargon to plain English.'
      },
      pathToRoot: 'Explanation Complicated → Don"t Understand Offer → Prospects Engage But Don't Buy'
    }
  },
  'too-many-options': {
    explanation: 'You offer too many packages, tiers, or add-ons. Paradox of choice overwhelms prospects, and they freeze rather than decide.',
    relatedProblems: ["dont-understand-offer", "pricing-structure-confusing", "multiple-conflicting-cta"],
    impactAnalysis: {
      financialImpact: 'Lower conversion; analysis paralysis; prospects delay or abandon.',
      severity: "Moderate",
      affectedAreas: ["Conversion Rate", "Decision Speed"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Simplify to 3 clear options max", "Add a "Most popular" recommendation", "Offer a quiz to guide choice"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Trying to serve everyone", "Adding options without removing old ones", "Fear of missing a sale"],
      automationPotential: {
        rating: "High",
        example: 'AI recommendation engines guide customers to the right option based on their answers.'
      },
      pathToRoot: 'Too Many Options → Don"t Understand Offer → Prospects Engage But Don't Buy'
    }
  },
  'unclear-included': {
    explanation: 'Prospects don"t know exactly what they"re getting. What's included? What's extra? Ambiguity creates anxiety and blocks purchase decisions.',
    relatedProblems: ["dont-understand-offer", "process-unclear", "pricing-structure-confusing"],
    impactAnalysis: {
      financialImpact: 'Low trust; high pre-sale support burden; lost deals due to uncertainty.',
      severity: "Moderate",
      affectedAreas: ["Clarity", "Conversion Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Create a clear "What"s Included" list", "Add FAQs addressing scope questions", "Use checkmarks and bullets for clarity"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Assumed it was obvious", "Custom scopes make it hard to define", "Fear of being too specific"],
      automationPotential: {
        rating: "Medium",
        example: 'Interactive scope builders let prospects see what"s included as they configure.'
      },
      pathToRoot: 'Unclear What"s Included → Don't Understand Offer → Prospects Engage But Don't Buy'
    }
  },
  'process-unclear': {
    explanation: 'Prospects don"t understand what happens after they buy. How does onboarding work? What are the steps? How long does it take? Mystery creates friction.',
    relatedProblems: ["dont-understand-offer", "unclear-included", "explanation-complicated"],
    impactAnalysis: {
      financialImpact: 'Hesitation at purchase; longer sales cycles; lost deals to clearer competitors.',
      severity: "Moderate",
      affectedAreas: ["Conversion Rate", "Sales Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Create a visual "How It Works" section (1. You do X, 2. We do Y, 3. You get Z)", "Add a timeline", "Show sample deliverables"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Internal focus", "Assumed prospects know the process", "No documented process to show"],
      automationPotential: {
        rating: "Medium",
        example: 'Interactive process walkthroughs or explainer videos can clarify.'
      },
      pathToRoot: 'Process Unclear → Don"t Understand Offer → Prospects Engage But Don't Buy'
    }
  },
  'pricing-structure-confusing': {
    explanation: 'Your pricing is complex, hard to calculate, or full of caveats. Prospects can"t figure out what they"ll actually pay, so they don't commit.',
    relatedProblems: ["dont-understand-offer", "unclear-included", "payment-terms-dont-work"],
    impactAnalysis: {
      financialImpact: 'Lost deals; high pre-sale support; sticker shock surprises kill trust.',
      severity: "Major",
      affectedAreas: ["Clarity", "Trust", "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Medium",
      quickWins: ["Simplify to flat pricing if possible", "Add a pricing calculator", "Show total cost upfront with no hidden fees"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Complex variable pricing", "Trying to hide true cost", "No pricing strategy"],
      automationPotential: {
        rating: "High",
        example: 'Pricing calculators and configurators make costs transparent and instant.'
      },
      pathToRoot: 'Pricing Structure Confusing → Don"t Understand Offer → Prospects Engage But Don't Buy'
    }
  },
  'terms-unclear': {
    explanation: 'Your contract terms, refund policy, or commitments are vague or buried in fine print. Prospects fear hidden traps.',
    relatedProblems: ["dont-understand-offer", "risk-too-high", "no-trial-guarantee"],
    impactAnalysis: {
      financialImpact: 'Hesitation at purchase; legal friction; prospects choose clearer alternatives.',
      severity: "Moderate",
      affectedAreas: ["Trust", "Conversion Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 day",
      difficulty: "Easy",
      quickWins: ["Create a simple "Terms Summary" page", "Highlight key terms on pricing page", "Make cancellation/refund policy prominent"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Legal-first thinking", "Hiding unfavorable terms", "No thought given to clarity"],
      automationPotential: {
        rating: "Low",
        example: 'This is a legal/clarity issue, but AI can simplify legal language into plain terms.'
      },
      pathToRoot: 'Terms Unclear → Don"t Understand Offer → Prospects Engage But Don't Buy'
    }
  },
  // DON"T BELIEVE IT SOLVES THEIR PROBLEM (LEVEL 7)
  'weak-case-studies': {
    explanation: 'Your case studies are vague, generic, or irrelevant to the prospect"s situation. They don't see themselves in the stories you tell.',
    relatedProblems: ["dont-believe-solves", "no-proof-situation", "situation-different"],
    impactAnalysis: {
      financialImpact: 'Low credibility; prospects don"t believe you can help them; longer sales cycles.',
      severity: "Moderate",
      affectedAreas: ["Trust", "Conversion Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "2-4 weeks",
      difficulty: "Medium",
      quickWins: ["Rewrite case studies with specific numbers and context", "Match case studies to prospect"s industry/problem", "Use Problem-Solution-Results format"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Generic templates", "No storytelling skill", "Protecting client confidentiality too much"],
      automationPotential: {
        rating: "Medium",
        example: 'AI can draft case studies from interview transcripts, but specificity requires real data.'
      },
      pathToRoot: 'Weak Case Studies → Don"t Believe It Solves → Prospects Engage But Don't Buy'
    }
  },
  'cant-articulate-roi': {
    explanation: 'You can"t clearly explain the financial return prospects will get. No numbers, no payback period, no value quantification. Just vague promises.',
    relatedProblems: ["dont-believe-solves", "benefits-unclear", "no-roi-proof"],
    impactAnalysis: {
      financialImpact: 'Low conversion on high-ticket offers; budget objections; lost enterprise deals.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Deal Size", "Win Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 weeks",
      difficulty: "Medium",
      quickWins: ["Build an ROI calculator", "Show average client results in dollars/time saved", "Create before/after financial snapshots"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Never tracked client outcomes", "Fear of overpromising", "Soft outcomes (hard to quantify)"],
      automationPotential: {
        rating: "High",
        example: 'Interactive ROI calculators automate value demonstration.'
      },
      pathToRoot: 'Can"t Articulate ROI → Don't Believe It Solves → Prospects Engage But Don't Buy'
    }
  },
  'no-proof-situation': {
    explanation: 'You have general proof, but nothing specific to their industry, size, or unique situation. They don"t believe it will work for them.',
    relatedProblems: ["dont-believe-solves", "situation-different", "weak-case-studies"],
    impactAnalysis: {
      financialImpact: 'Lost deals to specialists; need to discount to overcome skepticism.',
      severity: "Moderate",
      affectedAreas: ["Win Rate", "Pricing Power"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Hard",
      quickWins: ["Build case studies for each major customer segment", "Offer a pilot or proof-of-concept", "Show process adaptability"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Generic marketing", "Haven"t segmented case studies", "New to this type of client"],
      automationPotential: {
        rating: "Medium",
        example: 'Dynamic case study displays can show the most relevant proof based on prospect profile.'
      },
      pathToRoot: 'No Proof for Their Situation → Don"t Believe It Solves → Prospects Engage But Don't Buy'
    }
  },
  'results-unrealistic': {
    explanation: 'Your promised results seem too big, too fast, or too good. This triggers skepticism rather than excitement.',
    relatedProblems: ["dont-believe-solves", "promises-too-good", "cant-articulate-roi"],
    impactAnalysis: {
      financialImpact: 'High skepticism; prospects assume exaggeration; brand damage.',
      severity: "Major",
      affectedAreas: ["Trust", "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Add realistic timelines and caveats", "Show range of outcomes (not just best case)", "Explain the process that creates results"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Hyperbolic marketing", "Cherry-picking best results", "Copying "Guru" tactics"],
      automationPotential: {
        rating: "Low",
        example: 'This is an ethics and messaging issue, not automation.'
      },
      pathToRoot: 'Results Seem Unrealistic → Don"t Believe It Solves → Prospects Engage But Don't Buy'
    }
  },
  'situation-different': {
    explanation: 'Prospects believe their situation is uniquely different or complex, so your solution won"t work for them. Classic objection requiring empathy and proof.',
    relatedProblems: ["dont-believe-solves", "no-proof-situation", "weak-case-studies"],
    impactAnalysis: {
      financialImpact: 'Lost deals despite qualification; longer sales cycles overcoming objection.',
      severity: "Moderate",
      affectedAreas: ["Win Rate", "Sales Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Acknowledge their uniqueness, then show pattern similarities", "Offer customization or pilot", "Show diverse case studies"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Prospect rationalization", "Lack of relevant case studies", "Generic positioning"],
      automationPotential: {
        rating: "Low",
        example: 'This is a sales objection requiring human empathy, but AI can suggest relevant case studies.'
      },
      pathToRoot: 'Situation Feels Different → Don"t Believe It Solves → Prospects Engage But Don't Buy'
    }
  },
  'missing-key-features': {
    explanation: 'Your solution is close but lacks one or two critical features the prospect needs. This deal-breaker prevents purchase.',
    relatedProblems: ["dont-believe-solves", "bad-fit-services"],
    impactAnalysis: {
      financialImpact: 'Lost qualified deals; opportunity cost of not expanding offering.',
      severity: "Moderate",
      affectedAreas: ["Product-Market Fit', "Win Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-6 months (depends on feature)",
      difficulty: "Hard",
      quickWins: ["Track most-requested missing features", "Partner with another provider", "Build the feature if demand is high"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Product/service not fully developed", "Targeting wrong segment", "Not listening to customer needs"],
      automationPotential: {
        rating: "Medium",
        example: 'Feature request tracking and prioritization tools guide product roadmap.'
      },
      pathToRoot: 'Missing Key Features → Don"t Believe It Solves → Prospects Engage But Don't Buy'
    }
  },
  // PRICE OBJECTION (LEVEL 7)
  'sticker-shock': {
    explanation: 'Your price is higher than prospects expected. The surprise creates resistance, even if the value is there. Anchoring matters.',
    relatedProblems: ["price-objection", "cant-see-value", "comparing-cheaper"],
    impactAnalysis: {
      financialImpact: 'Lost deals at pricing reveal; need to justify or discount.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Pricing Integrity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Medium",
      quickWins: ["Preview pricing range earlier in sales process", "Frame value before revealing price", "Anchor with higher option first"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Hiding price too long", "Market mispricing", "Weak value demonstration"],
      automationPotential: {
        rating: "Medium",
        example: 'Pricing reveal sequences that build value first can reduce sticker shock.'
      },
      pathToRoot: 'Sticker Shock → Price Objection → Prospects Engage But Don"t Buy'
    }
  },
  'cant-see-value': {
    explanation: 'Prospects understand the price but don"t see enough value to justify it. The value-to-price ratio feels off.',
    relatedProblems: ["price-objection", "benefits-unclear", "cant-articulate-roi"],
    impactAnalysis: {
      financialImpact: 'Forced discounting; inability to charge premium; commoditization.',
      severity: "Major",
      affectedAreas: ["Pricing Power", "Margins"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 weeks",
      difficulty: "Medium",
      quickWins: ["Quantify ROI in dollar terms", "Show opportunity cost of not buying", "Add bonuses or guarantees to boost perceived value"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak value proposition", "Poor sales presentation", "Wrong target market (can"t afford)"],
      automationPotential: {
        rating: "High",
        example: 'Interactive ROI calculators and value demonstration tools show worth.'
      },
      pathToRoot: 'Can"t See Value vs Cost → Price Objection → Prospects Engage But Don't Buy'
    }
  },
  'payment-terms-dont-work': {
    explanation: 'Your payment structure doesn"t fit their cash flow, budget cycle, or procurement process. They want to buy but can't with current terms.',
    relatedProblems: ["price-objection", "budget-not-available", "timing-not-right-sales"],
    impactAnalysis: {
      financialImpact: 'Lost qualified deals due to payment inflexibility; opportunity cost.',
      severity: "Moderate",
      affectedAreas: ["Win Rate", "Revenue"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Offer payment plans or financing", "Accept POs for enterprise", "Allow quarterly vs annual billing"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Inflexible payment policy", "Not understanding customer needs", "Cash flow concerns on your side"],
      automationPotential: {
        rating: "High",
        example: 'Financing integrations (Affirm, Klarna) or automated payment plans remove barriers.'
      },
      pathToRoot: 'Payment Terms Don"t Work → Price Objection → Prospects Engage But Don't Buy'
    }
  },
  'comparing-cheaper': {
    explanation: 'Prospects are comparing you to lower-priced competitors. Unless you"ve differentiated, price becomes the deciding factor.',
    relatedProblems: ["price-objection", "no-differentiation", "competing-price"],
    impactAnalysis: {
      financialImpact: 'Pressure to discount; margin erosion; lost deals to cheaper options.',
      severity: "Major",
      affectedAreas: ["Pricing Power", "Win Rate", "Margins"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Hard",
      quickWins: ["Create a comparison table showing your advantages", "Quantify cost of cheap option (risks, quality)", "Refuse to compete on price alone"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak differentiation", "Commoditized service", "Wrong target market (price-sensitive)"],
      automationPotential: {
        rating: "Low",
        example: 'Differentiation is strategic, but AI can identify competitor weaknesses to highlight.'
      },
      pathToRoot: 'Comparing to Cheaper Alternatives → Price Objection → Prospects Engage But Don"t Buy'
    }
  },
  'budget-not-available': {
    explanation: 'Prospect has no budget allocated for your solution. They might want it, but the money isn"t there (or isn't approved yet).',
    relatedProblems: ["price-objection", "not-decision-maker-budget", "timing-not-right-sales"],
    impactAnalysis: {
      financialImpact: 'Long sales cycles; lost deals to budget constraints.',
      severity: "Major",
      affectedAreas: ["Deal Velocity", "Win Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Ask about budget early in discovery", "Help them build a business case", "Offer a smaller entry point"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Selling to unqualified prospects", "Budget timing misalignment", "Lack of urgency"],
      automationPotential: {
        rating: "Medium",
        example: 'CRM qualification questions filter out prospects without budget authority.'
      },
      pathToRoot: 'Budget Not Available → Price Objection → Prospects Engage But Don"t Buy'
    }
  },
  'not-decision-maker-budget': {
    explanation: 'You"re talking to someone who likes your solution but has no authority to approve the budget. You need to reach the economic buyer.',
    relatedProblems: ["price-objection", "budget-not-available", "not-qualifying"],
    impactAnalysis: {
      financialImpact: 'Wasted sales effort; long cycles; deals stall or die.',
      severity: "Major",
      affectedAreas: ["Sales Efficiency", "Win Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Ask upfront: "Who makes budget decisions?'", "Request introduction to economic buyer", "Provide materials they can use to sell internally"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor qualification", "Not asking about decision-making process", "Avoiding difficult questions"],
      automationPotential: {
        rating: "Low",
        example: 'This is a sales qualification and process issue requiring human intervention.'
      },
      pathToRoot: 'Not Decision Maker on Budget → Price Objection → Prospects Engage But Don"t Buy'
    }
  },
  'cost-benefit-unclear': {
    explanation: 'Prospects can"t do the mental math on whether your price is worth it. The cost is clear, but the benefit isn't quantified.',
    relatedProblems: ["price-objection", "cant-articulate-roi", "benefits-unclear"],
    impactAnalysis: {
      financialImpact: 'Hesitation and lost deals; need to over-explain in every sale.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Sales Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Build a simple ROI calculator", "Show payback period clearly", "Use before/after dollar comparisons"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["No value quantification", "Soft benefits only", "Weak sales presentation"],
      automationPotential: {
        rating: "High",
        example: 'Interactive ROI calculators automate cost-benefit demonstration.'
      },
      pathToRoot: 'Cost vs Benefit Unclear → Price Objection → Prospects Engage But Don"t Buy'
    }
  },
  // TIMING NOT RIGHT (SALES) - LEVEL 7
  'problem-not-urgent': {
    explanation: 'The prospect acknowledges the problem but doesn"t feel urgency to solve it now. It's on their 'Someday' list, not 'This quarter.'',
    relatedProblems: ["timing-not-right-sales", "other-priorities", "want-think-about"],
    impactAnalysis: {
      financialImpact: 'Pipeline full of stalled deals; low conversion; wasted nurture effort.',
      severity: "Major",
      affectedAreas: ["Deal Velocity", "Conversion Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Agitate the pain (cost of inaction)", "Create urgency with limited-time offers", "Qualify for urgency upfront"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Problem isn"t painful enough yet", "No triggering event", "Competing priorities"],
      automationPotential: {
        rating: "High",
        example: 'Automated nurture sequences stay top-of-mind until urgency increases.'
      },
      pathToRoot: 'Problem Not Urgent → Timing Not Right → Prospects Engage But Don"t Buy'
    }
  },
  'budget-not-now': {
    explanation: 'Budget exists but isn"t available right now due to fiscal year, seasonal constraints, or recent spending. They want to buy later.',
    relatedProblems: ["timing-not-right-sales", "budget-not-available", "waiting-approval"],
    impactAnalysis: {
      financialImpact: 'Delayed revenue; risk of losing deal to forgetfulness or competitor.',
      severity: "Moderate",
      affectedAreas: ["Revenue Timing", "Pipeline Predictability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Easy",
      quickWins: ["Ask when budget resets", "Set follow-up for that date", "Offer a small pilot now to reserve budget later"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Budget cycle misalignment", "Recent spending exhausted budget", "Unexpected expenses"],
      automationPotential: {
        rating: "High",
        example: 'CRM reminders and automated follow-ups at the right time keep deals alive.'
      },
      pathToRoot: 'Budget Not Available Now → Timing Not Right → Prospects Engage But Don"t Buy'
    }
  },
  'other-priorities': {
    explanation: 'Prospect is interested but has other more urgent initiatives taking precedence. Your solution is important, but not #1.',
    relatedProblems: ["timing-not-right-sales", "problem-not-urgent", "want-think-about"],
    impactAnalysis: {
      financialImpact: 'Deals pushed to "Later" often die; lost to competitors who create urgency.',
      severity: "Moderate",
      affectedAreas: ["Win Rate", "Deal Velocity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Understand their priorities", "Show how your solution supports their top priority", "Offer a phased approach"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Your solution isn"t critical enough", "Poor timing", "Weak value positioning"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated check-ins keep you top-of-mind when priorities shift.'
      },
      pathToRoot: 'Other Priorities → Timing Not Right → Prospects Engage But Don"t Buy'
    }
  },
  'waiting-approval': {
    explanation: 'Prospect wants to move forward but needs internal approvals, legal review, or committee sign-off. They"re stuck in internal process.',
    relatedProblems: ["timing-not-right-sales", "many-decision-makers", "procurement-bottleneck"],
    impactAnalysis: {
      financialImpact: 'Long sales cycles; deals stall; risk of losing to status quo.',
      severity: "Moderate",
      affectedAreas: ["Deal Velocity", "Predictability"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Ask about approval process upfront", "Provide materials to support internal selling", "Offer to join approval meetings"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Enterprise/complex org structures", "High-risk purchase requires multiple approvals", "Political dynamics"],
      automationPotential: {
        rating: "Low",
        example: 'This is a human/political issue, but CRM can track approval stages.'
      },
      pathToRoot: 'Waiting on Approval → Timing Not Right → Prospects Engage But Don"t Buy'
    }
  },
  'want-think-about': {
    explanation: 'The classic stall. Prospect says they need time to think, often a polite way of saying "No" or hiding another objection.',
    relatedProblems: ["timing-not-right-sales", "problem-not-urgent", "other-priorities"],
    impactAnalysis: {
      financialImpact: 'Most "Think about it" deals die; lost time and effort.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Sales Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Medium",
      quickWins: ["Ask "What specifically do you need to think about?'", "Uncover real objection", "Set specific next step"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Hidden objection", "Conflict avoidance", "Lack of urgency"],
      automationPotential: {
        rating: "Low",
        example: 'This is a sales skill issue requiring human objection handling.'
      },
      pathToRoot: 'Want to Think About It → Timing Not Right → Prospects Engage But Don"t Buy'
    }
  },
  'need-finish-current': {
    explanation: 'Prospect is locked into a current provider or solution and needs to finish that contract, project, or commitment before considering yours.',
    relatedProblems: ["timing-not-right-sales", "switching-costs-high", "incumbent-advantage"],
    impactAnalysis: {
      financialImpact: 'Long wait times; risk competitor locks them in first.',
      severity: "Moderate",
      affectedAreas: ["Deal Timing", "Win Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Easy",
      quickWins: ["Ask when current contract/project ends", "Set calendar reminder", "Position as "Next solution" now to build relationship"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Contract lock-in", "Mid-project disruption risk", "Switching costs"],
      automationPotential: {
        rating: "High",
        example: 'Automated reminders and nurture sequences keep you top-of-mind until they"re ready.'
      },
      pathToRoot: 'Need to Finish Current Solution → Timing Not Right → Prospects Engage But Don"t Buy'
    }
  },
  // SALES PROCESS WEAK (LEVEL 7)
  'not-qualifying': {
    explanation: 'You"re talking to anyone who shows interest instead of pre-qualifying for budget, authority, need, and timeline. This fills your pipeline with junk.',
    relatedProblems: ["sales-process-weak", "wrong-prospects", "not-decision-maker-budget"],
    impactAnalysis: {
      financialImpact: 'Wasted sales effort on unqualified leads; low close rate; burnout.',
      severity: "Major",
      affectedAreas: ["Sales Efficiency", "Win Rate", "Morale"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Implement BANT (Budget, Authority, Need, Timeline)", "Ask qualifying questions early", "Disqualify fast and move on"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Desperate for leads", "No sales process", "Fear of rejection"],
      automationPotential: {
        rating: "High",
        example: 'Automated qualification forms and chatbots filter leads before sales involvement.'
      },
      pathToRoot: 'Not Qualifying → Sales Process Weak → Prospects Engage But Don"t Buy'
    }
  },
  'not-asking-discovery': {
    explanation: 'You jump straight to pitching without understanding the prospect"s situation, pain, or goals. Generic pitches don't convert.',
    relatedProblems: ["sales-process-weak", "proposal-misses-mark", "not-qualifying"],
    impactAnalysis: {
      financialImpact: 'Low close rate; proposals that miss the mark; wasted effort.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Sales Effectiveness"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Create a discovery question checklist", "Listen 80%, talk 20%", "Understand before pitching"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Eagerness to sell", "No sales training", "Product-focused mindset"],
      automationPotential: {
        rating: "Medium",
        example: 'CRM prompts can guide discovery, but listening is a human skill.'
      },
      pathToRoot: 'Not Asking Good Discovery Questions → Sales Process Weak → Prospects Engage But Don"t Buy'
    }
  },
  'not-handling-objections': {
    explanation: 'When prospects raise objections, you either avoid them or become defensive instead of addressing them confidently and empathetically.',
    relatedProblems: ["sales-process-weak", "not-closing", "too-pushy-not-assertive"],
    impactAnalysis: {
      financialImpact: 'Lost deals at objection stage; weak negotiation position.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Deal Progress"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 weeks",
      difficulty: "Medium",
      quickWins: ["Study common objections and prepare responses", "Use framework: Acknowledge → Clarify → Respond → Confirm", "Role-play objection handling"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of sales training", "Fear of conflict", "Weak product confidence"],
      automationPotential: {
        rating: "Low",
        example: 'Objection handling is a human skill, but AI can suggest responses based on best practices.'
      },
      pathToRoot: 'Not Handling Objections → Sales Process Weak → Prospects Engage But Don"t Buy'
    }
  },
  'not-closing': {
    explanation: 'You never ask for the sale. You present, answer questions, then wait for them to decide. Most won"t without a clear ask.',
    relatedProblems: ["sales-process-weak", "following-up-inconsistently", "too-pushy-not-assertive"],
    impactAnalysis: {
      financialImpact: 'Leaving 30-50% of potential deals on the table; low conversion.',
      severity: "Critical",
      affectedAreas: ["Win Rate", "Revenue"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["End every sales call with "Are you ready to move forward?'", "Use assumptive close ("When should we start?')", "Practice asking directly"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of rejection", "Passive sales style", "No training on closing techniques"],
      automationPotential: {
        rating: "Low",
        example: 'Closing is a human skill requiring confidence and timing.'
      },
      pathToRoot: 'Not Closing/Asking for Sale → Sales Process Weak → Prospects Engage But Don"t Buy'
    }
  },
  'following-up-inconsistently': {
    explanation: 'You follow up sometimes but not systematically. Some prospects get 10 touches, others get 1. No consistency = lost deals.',
    relatedProblems: ["sales-process-weak", "not-closing", "no-followup"],
    impactAnalysis: {
      financialImpact: 'Random win rate; unpredictable revenue; missed opportunities.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Revenue Predictability"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Create a standard follow-up cadence (Day 1, 3, 7, 14)", "Use CRM reminders", "Automate where possible"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["No system", "Forgetting", "Too busy"],
      automationPotential: {
        rating: "High",
        example: 'Sales engagement platforms (Outreach, SalesLoft) automate consistent follow-up.'
      },
      pathToRoot: 'Following Up Inconsistently → Sales Process Weak → Prospects Engage But Don"t Buy'
    }
  },
  'too-pushy-not-assertive': {
    explanation: 'You"re either too aggressive (turning prospects off) or too passive (not driving the sale forward). Finding the balance is key.',
    relatedProblems: ["sales-process-weak", "not-closing", "not-handling-objections"],
    impactAnalysis: {
      financialImpact: 'Lost deals either way; damaged relationships or stalled pipeline.',
      severity: "Moderate",
      affectedAreas: ["Win Rate", "Brand Perception"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Hard",
      quickWins: ["Get sales training or coaching", "Ask prospects for feedback", "Practice assertive without aggressive"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["No sales training", "Personality extremes", "Desperation or passivity"],
      automationPotential: {
        rating: "Low",
        example: 'This is a human skill and personality issue requiring training and self-awareness.'
      },
      pathToRoot: 'Too Pushy or Not Assertive Enough → Sales Process Weak → Prospects Engage But Don"t Buy'
    }
  },
  'taking-long-respond': {
    explanation: 'You take hours or days to respond to prospect questions. Slow response kills momentum and signals you"ll be slow to deliver too.',
    relatedProblems: ["sales-process-weak", "poor-communication-client"],
    impactAnalysis: {
      financialImpact: 'Lost deals to faster competitors; damaged trust; slower sales cycles.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Deal Velocity", "Trust"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Set goal: Respond within 1 hour during business hours", "Use canned responses for common questions", "Enable mobile notifications"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Too busy", "No urgency culture", "Disorganization"],
      automationPotential: {
        rating: "High",
        example: 'Chatbots and auto-responders provide instant answers to common questions.'
      },
      pathToRoot: 'Taking Too Long to Respond → Sales Process Weak → Prospects Engage But Don"t Buy'
    }
  },
  'proposal-misses-mark': {
    explanation: 'Your proposals don"t address the specific needs, pain, or goals discovered in sales conversations. They're generic templates that miss the point.',
    relatedProblems: ["sales-process-weak", "not-asking-discovery", "expectations-misaligned"],
    impactAnalysis: {
      financialImpact: 'Low proposal acceptance rate; need to redo work; lost deals.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Sales Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Medium",
      quickWins: ["Customize every proposal to prospect"s stated needs", "Mirror their language back", "Include specific pain points and ROI"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Poor discovery", "Template laziness", "Rushed proposal creation"],
      automationPotential: {
        rating: "High",
        example: 'Proposal software (PandaDoc, Proposify) with dynamic fields pulls from CRM for customization.'
      },
      pathToRoot: 'Proposal Misses the Mark → Sales Process Weak → Prospects Engage But Don"t Buy'
    }
  },
  // COMPETITION BEATS US (LEVEL 7)
  'competitor-better-offer': {
    explanation: 'Competitor has a better product, price, terms, or value proposition. You"re simply outgunned on the fundamentals.',
    relatedProblems: ["competition-beats", "lost-on-price", "nothing-unique"],
    impactAnalysis: {
      financialImpact: 'Systematic losing to specific competitor; market share erosion.',
      severity: "Critical",
      affectedAreas: ["Win Rate", "Market Position"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "3-6 months",
      difficulty: "Hard",
      quickWins: ["Study competitor"s offer in detail", "Identify and exploit their weakness", "Differentiate or improve offer"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Product/service gap", "Pricing strategy", "Better positioning"],
      automationPotential: {
        rating: "Low",
        example: 'Competitive intelligence tools track competitor moves, but strategy is human.'
      },
      pathToRoot: 'Competitor Better Offer → Competition Beats Us → Prospects Engage But Don"t Buy'
    }
  },
  'competitor-stronger-relationship': {
    explanation: 'Competitor has an existing relationship, referral, or network advantage. They have trust you don"t.',
    relatedProblems: ["competition-beats", "incumbent-advantage", "dont-trust"],
    impactAnalysis: {
      financialImpact: 'High CAC; low win rate on competitive deals; relationship disadvantage.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Sales Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Hard",
      quickWins: ["Build your own network and referral engine", "Leverage your existing relationships", "Differentiate so strongly relationships matter less"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["New market entrant", "Weak network", "Referral disadvantage"],
      automationPotential: {
        rating: "Low",
        example: 'Relationships are human-built, but CRM helps nurture and track them.'
      },
      pathToRoot: 'Competitor Stronger Relationship → Competition Beats Us → Prospects Engage But Don"t Buy'
    }
  },
  'competitor-moved-faster': {
    explanation: 'Competitor responded quicker, proposed faster, or closed before you could. Speed wins in competitive sales.',
    relatedProblems: ["competition-beats", "taking-long-respond", "proposal-drags"],
    impactAnalysis: {
      financialImpact: 'Lost deals to speed; first-mover advantage goes to competitor.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Deal Velocity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Respond same-day to all inquiries", "Streamline proposal process", "Create urgency to move fast"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Slow internal processes", "Disorganization", "Undervaluing speed"],
      automationPotential: {
        rating: "High",
        example: 'Automated proposal generation and instant quotes speed up response times.'
      },
      pathToRoot: 'Competitor Moved Faster → Competition Beats Us → Prospects Engage But Don"t Buy'
    }
  },
  'competitor-better-reputation': {
    explanation: 'Competitor is a known brand with strong reputation. You"re unknown or have less brand equity. Prospects default to the safer choice.',
    relatedProblems: ["competition-beats", "new-unknown", "no-social-proof"],
    impactAnalysis: {
      financialImpact: 'Need to offer more proof, lower prices, or stronger guarantees to compete.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Pricing Power"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "6-12 months",
      difficulty: "Hard",
      quickWins: ["Build case studies and testimonials fast", "Leverage founder reputation", "Niche down where you can become known"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["New business", "Competing with established players", "Weak marketing"],
      automationPotential: {
        rating: "Medium",
        example: 'AI-powered content marketing can accelerate thought leadership and brand building.'
      },
      pathToRoot: 'Competitor Better Reputation → Competition Beats Us → Prospects Engage But Don"t Buy'
    }
  },
  'incumbent-advantage': {
    explanation: 'Competitor is already the incumbent provider. Switching costs, familiarity, and inertia work in their favor.',
    relatedProblems: ["competition-beats", "switching-costs-high", "need-finish-current"],
    impactAnalysis: {
      financialImpact: 'Very low win rate on replacement deals; need to 10X better to switch.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Market Penetration"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Hard",
      quickWins: ["Target dissatisfied customers", "Make switching easy (migration support)", "Offer trial alongside incumbent"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Status quo bias", "Switching costs", "Incumbent lock-in tactics"],
      automationPotential: {
        rating: "High",
        example: 'Automated migration tools and onboarding reduce switching friction.'
      },
      pathToRoot: 'Incumbent Advantage → Competition Beats Us → Prospects Engage But Don"t Buy'
    }
  },
  'lost-on-price': {
    explanation: 'Competitor undercut you on price. If you can"t differentiate enough to justify premium, price becomes the deciding factor.',
    relatedProblems: ["competition-beats", "comparing-cheaper", "no-differentiation"],
    impactAnalysis: {
      financialImpact: 'Margin pressure; race to bottom; commoditization.',
      severity: "Major",
      affectedAreas: ["Margins", "Win Rate", "Brand Value"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Hard",
      quickWins: ["Refuse to compete on price alone", "Quantify your superior ROI", "Target less price-sensitive customers"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Weak differentiation", "Commoditized offering", "Wrong target market"],
      automationPotential: {
        rating: "Low",
        example: 'Pricing strategy is human, but ROI calculators help justify premium pricing.'
      },
      pathToRoot: 'Lost on Price → Competition Beats Us → Prospects Engage But Don"t Buy'
    }
  },
  // RISK FEELS TOO HIGH (LEVEL 7)
  'big-commitment': {
    explanation: 'Your offer requires a large commitment (time, money, or resources) with a provider they don"t know well. That's a scary ask.',
    relatedProblems: ["risk-too-high", "fear-wrong-decision", "no-trial-guarantee"],
    impactAnalysis: {
      financialImpact: 'Low close rate on first deals; long sales cycles; need to over-prove.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Deal Velocity"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-2 weeks",
      difficulty: "Medium",
      quickWins: ["Create a smaller entry offer", "Offer trial or pilot", "Add money-back guarantee"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["No low-risk entry point", "High-ticket offer only", "New/unknown provider"],
      automationPotential: {
        rating: "Medium",
        example: 'Trial and pilot programs can be automated for easy onboarding.'
      },
      pathToRoot: 'Big Commitment with Unknown → Risk Too High → Prospects Engage But Don"t Buy'
    }
  },
  'fear-wrong-decision': {
    explanation: 'Prospect fears making the wrong choice and looking bad internally or wasting money. Paralysis by analysis sets in.',
    relatedProblems: ["risk-too-high", "political-risk", "want-think-about"],
    impactAnalysis: {
      financialImpact: 'Deals stall indefinitely; prospects choose inaction over risk.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Deal Progress"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Provide social proof (others like them chose you)", "Offer guarantee to reduce risk", "Position as reversible decision"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["High-stakes decision", "Lack of trust or proof", "Organizational culture of risk aversion"],
      automationPotential: {
        rating: "Low",
        example: 'Risk reduction is psychological; requires human reassurance and proof.'
      },
      pathToRoot: 'Fear of Wrong Decision → Risk Too High → Prospects Engage But Don"t Buy'
    }
  },
  'no-trial-guarantee': {
    explanation: 'You offer no way to try before buying or get money back if unsatisfied. Prospects carry all the risk.',
    relatedProblems: ["risk-too-high", "big-commitment", "switching-costs-high"],
    impactAnalysis: {
      financialImpact: 'Significantly lower conversion; lose deals to competitors with trials.',
      severity: "Major",
      affectedAreas: ["Conversion Rate", "Win Rate"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Add 30-day money-back guarantee", "Offer 7-14 day trial", "Create pilot program"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of refund abuse", "Complex delivery model", "Never considered it"],
      automationPotential: {
        rating: "High",
        example: 'Automated trial management and guarantee policies are standard in SaaS.'
      },
      pathToRoot: 'No Trial or Guarantee → Risk Too High → Prospects Engage But Don"t Buy'
    }
  },
  'switching-costs-high': {
    explanation: 'Switching to you requires significant effort, migration pain, or disruption. Prospects prefer to stick with the devil they know.',
    relatedProblems: ["risk-too-high", "incumbent-advantage", "big-commitment"],
    impactAnalysis: {
      financialImpact: 'Very low win rate on replacement deals; need to be 10X better to justify switch.',
      severity: "Major",
      affectedAreas: ["Win Rate", "Market Penetration"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Hard",
      quickWins: ["Offer white-glove migration support", "Create transition plan/timeline", "Run alongside existing solution during transition"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Complex integration", "Data migration required", "Change management resistance"],
      automationPotential: {
        rating: "High",
        example: 'Automated migration tools, onboarding, and training reduce switching friction.'
      },
      pathToRoot: 'Switching Costs High → Risk Too High → Prospects Engage But Don"t Buy'
    }
  },
  'political-risk': {
    explanation: 'Internal politics make this a risky decision for your champion. If it fails, they look bad. If another faction opposes it, it creates conflict.',
    relatedProblems: ["risk-too-high", "fear-wrong-decision", "waiting-approval"],
    impactAnalysis: {
      financialImpact: 'Deals stall or die in committee; need executive sponsorship to overcome.',
      severity: "Moderate",
      affectedAreas: ["Enterprise Win Rate", "Deal Velocity"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Hard",
      quickWins: ["Identify and align with power players", "Provide cover (data, case studies) for champion", "Offer pilot to reduce political risk"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Organizational complexity", "Turf wars", "Change-resistant culture"],
      automationPotential: {
        rating: "Low",
        example: 'Politics are human dynamics; requires relationship building and stakeholder management.'
      },
      pathToRoot: 'Political Risk Internally → Risk Too High → Prospects Engage But Don"t Buy'
    }
  },
  // CLIENTS NOT BUYING MORE - LEVEL 6
  'dont-know-offer': {
    explanation: 'Your existing customers don"t know about your other services. You've never told them, and they assume you only do what they hired you for.',
    relatedProblems: ["lack-awareness", "assume-one-thing", "never-told"],
    impactAnalysis: {
      financialImpact: 'Massive missed upsell opportunity; customers buy from competitors what you could provide.',
      severity: "Major",
      affectedAreas: ["Revenue per Customer", "LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Email existing customers about your full service menu", "Add services section to invoices", "Mention other services in every interaction"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Assumed they"d ask", "No cross-sell process", "Focus on new customers only"],
      automationPotential: {
        rating: "High",
        example: 'Automated email campaigns educate customers on full service offering.'
      },
      pathToRoot: 'Don"t Know We Offer → Lack of Awareness → Not Buying More'
    }
  },
  'dont-know-what-else': {
    explanation: 'Customers know you offer more, but don"t understand what those other services are or how they could help.',
    relatedProblems: ["lack-awareness", "dont-know-offer", "dont-see-connection"],
    impactAnalysis: {
      financialImpact: 'Low upsell rate; customers don"t see connection between services.',
      severity: "Moderate",
      affectedAreas: ["Cross-sell Rate', "LTV"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1 week",
      difficulty: "Easy",
      quickWins: ["Create simple service descriptions", "Show how services complement each other", "Share case studies of customers using multiple services"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Unclear service descriptions", "No education process", "Siloed service delivery"],
      automationPotential: {
        rating: "High",
        example: 'Automated content series educating customers on complementary services.'
      },
      pathToRoot: 'Don"t Know What Else We Can Do → Lack of Awareness → Not Buying More'
    }
  },
  'never-told': {
    explanation: 'You have never proactively communicated your other offerings to existing customers. Out of sight, out of mind.',
    relatedProblems: ["lack-awareness", "dont-know-offer", "not-proactively-offering"],
    impactAnalysis: {
      financialImpact: 'Zero cross-sell; leaving money on the table.',
      severity: "Major",
      affectedAreas: ["Revenue Growth", "Customer LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Send a "Did you know we also...' email", "Add to email signatures", "Mention in status calls"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of seeming pushy", "No cross-sell strategy", "Siloed teams"],
      automationPotential: {
        rating: "High",
        example: 'Automated cross-sell campaigns triggered by customer milestones or service completion.'
      },
      pathToRoot: 'Never Told About Other Options → Lack of Awareness → Not Buying More'
    }
  },
  'assume-one-thing': {
    explanation: 'Customers have pigeonholed you as "The X company" and don't realize you do A, B, C, and D as well. Brand perception is too narrow.',
    relatedProblems: ["lack-awareness", "dont-know-offer"],
    impactAnalysis: {
      financialImpact: 'Lost cross-sell opportunities; narrow market perception limits growth.',
      severity: "Moderate",
      affectedAreas: ["Cross-sell Rate', "Market Position"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Rebrand as "Full-service X'", "Show breadth in marketing", "Cross-sell actively to change perception"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Strong initial positioning in one area", "No marketing of other services", "Historical focus"],
      automationPotential: {
        rating: "Medium",
        example: 'Marketing automation can systematically educate customers on full offering.'
      },
      pathToRoot: 'Assume We Only Do One Thing → Lack of Awareness → Not Buying More'
    }
  },
  // LACK OF NEED (PERCEIVED) - LEVEL 6
  'dont-need-else': {
    explanation: 'Customers are satisfied with what they"re currently getting and genuinely don"t see a need for your other services right now.',
    relatedProblems: ["lack-need-perceived", "satisfied-current"],
    impactAnalysis: {
      financialImpact: 'Low cross-sell until you create/reveal need.',
      severity: "Moderate",
      affectedAreas: ["Revenue per Customer", "Growth Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Educate on "What you"re missing"", "Show results others get with full suite", "Create bundled offerings"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Genuine lack of need", "Not seeing connection", "Happy with current scope"],
      automationPotential: {
        rating: "High",
        example: 'Automated educational content and use-case demonstrations reveal hidden needs.'
      },
      pathToRoot: 'Don"t Need Anything Else → Lack of Need → Not Buying More'
    }
  },
  'dont-see-connection': {
    explanation: 'Customers don"t see how your other services relate to or support what they"re already doing with you. The connection isn't obvious.',
    relatedProblems: ["lack-need-perceived", "dont-need-else"],
    impactAnalysis: {
      financialImpact: 'Low cross-sell; customers buy complementary services elsewhere.',
      severity: "Moderate",
      affectedAreas: ["Cross-sell Rate', "Market Share of Wallet"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-2 weeks",
      difficulty: "Easy",
      quickWins: ["Show how services work together", "Create "Better together" bundles", "Use customer success stories demonstrating multi-service value"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Unclear value proposition connection", "Siloed service presentation", "No education"],
      automationPotential: {
        rating: "High",
        example: 'Automated journey mapping shows customers how services complement each other.'
      },
      pathToRoot: 'Don"t See Connection to Other Services → Lack of Need → Not Buying More'
    }
  },
  'satisfied-current': {
    explanation: 'Customers are happy with what they have and see no reason to expand. They"re not experiencing pain that would drive them to buy more.',
    relatedProblems: ["lack-need-perceived", "dont-need-else"],
    impactAnalysis: {
      financialImpact: 'Flat revenue per customer; reliance on new customer acquisition for growth.',
      severity: "Moderate",
      affectedAreas: ["LTV", "Growth Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Hard",
      quickWins: ["Introduce "What"s next" conversations", "Show what they"re leaving on the table", "Create aspirational positioning"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Comfortable with status quo", "No urgency for more", "Already getting value"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated benchmarking reports show customers what similar clients achieve with expanded services.'
      },
      pathToRoot: 'Satisfied with Current Scope → Lack of Need → Not Buying More'
    }
  },
  // BARRIERS TO EXPANSION - LEVEL 6
  'budget-constraints': {
    explanation: 'Customers want more but genuinely can"t afford it right now. Budget is allocated elsewhere or constrained.',
    relatedProblems: ["barriers-expansion", "cant-afford-pricing"],
    impactAnalysis: {
      financialImpact: 'Lost expansion revenue until budget frees up.',
      severity: "Moderate",
      affectedAreas: ["Revenue Growth", "Cross-sell Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Offer payment plans", "Create lower-priced entry versions", "Time offers to budget cycles"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Economic conditions", "Customer cash flow issues", "Budget allocation to other priorities"],
      automationPotential: {
        rating: "High",
        example: 'Financing options or payment plans make expansion affordable.'
      },
      pathToRoot: 'Budget Constraints → Barriers to Expansion → Not Buying More'
    }
  },
  'bad-experience-first': {
    explanation: 'Customers had a negative experience with the first service, so they"re not eager to try more from you. Trust is damaged.',
    relatedProblems: ["barriers-expansion", "client-dissatisfaction"],
    impactAnalysis: {
      financialImpact: 'Zero cross-sell; potential churn; negative word-of-mouth.',
      severity: "Major",
      affectedAreas: ["Cross-sell Rate', "Churn Risk", "Reputation"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Hard",
      quickWins: ["Fix the original issue", "Over-deliver to rebuild trust", "Offer a "Make it right" discount on next service"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Quality issues", "Miscommunication", "Unmet expectations"],
      automationPotential: {
        rating: "Medium",
        example: 'Automated satisfaction monitoring can catch issues before they kill cross-sell opportunities.'
      },
      pathToRoot: 'Bad Experience with First Service → Barriers to Expansion → Not Buying More'
    }
  },
  'buying-elsewhere': {
    explanation: 'Customer already has a provider for that service and is satisfied with them. You"d need to displace an incumbent.',
    relatedProblems: ["barriers-expansion", "incumbent-advantage"],
    impactAnalysis: {
      financialImpact: 'Lost cross-sell; customer relationship not maximized.',
      severity: "Moderate",
      affectedAreas: ["Share of Wallet", "Cross-sell Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Hard",
      quickWins: ["Offer to run alongside for comparison", "Show integration benefits of single provider", "Wait for their contract renewal"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Existing relationships", "Timing (you came second)", "They don"t know you offer it"],
      automationPotential: {
        rating: "Low",
        example: 'Relationship-based; requires human persuasion and differentiation.'
      },
      pathToRoot: 'Buying That Service Elsewhere → Barriers to Expansion → Not Buying More'
    }
  },
  'decision-maker-changed': {
    explanation: 'Your original contact left or lost authority. The new decision-maker doesn"t know you, trust you, or prioritize expansion.',
    relatedProblems: ["barriers-expansion", "contact-left", "relationship-deteriorated"],
    impactAnalysis: {
      financialImpact: 'Cross-sell opportunities stall; need to re-establish relationship.',
      severity: "Moderate",
      affectedAreas: ["Account Growth", "Relationship Risk"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Quickly build relationship with new contact", "Re-establish value", "Provide easy wins to earn trust"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Personnel turnover", "Organizational restructuring", "Relying on single contact"],
      automationPotential: {
        rating: "Medium",
        example: 'CRM alerts when key contacts change; automated intro sequences help onboard new stakeholders.'
      },
      pathToRoot: 'Decision Maker Changed → Barriers to Expansion → Not Buying More'
    }
  },
  'timing-not-right': {
    explanation: 'Customer is interested in expanding but not right now. Other priorities, seasonality, or internal factors create timing mismatch.',
    relatedProblems: ["barriers-expansion", "other-priorities", "budget-not-now"],
    impactAnalysis: {
      financialImpact: 'Delayed expansion revenue; risk of losing opportunity to competitor or forgetfulness.',
      severity: "Moderate",
      affectedAreas: ["Revenue Timing", "Growth Rate"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Easy",
      quickWins: ["Ask when timing would be right", "Set follow-up reminder", "Offer pilot or phased approach to start sooner"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Seasonal business cycles", "Internal capacity constraints", "Competing priorities"],
      automationPotential: {
        rating: "High",
        example: 'Automated nurture and reminder sequences keep expansion top-of-mind until timing aligns.'
      },
      pathToRoot: 'Timing Not Right → Barriers to Expansion → Not Buying More'
    }
  },
  // NO UPSELL PROCESS - LEVEL 6
  'not-proactively-offering': {
    explanation: 'You never proactively suggest additional services to existing customers. You wait for them to ask, and most never will.',
    relatedProblems: ["no-upsell-process", "waiting-ask", "not-identifying-opportunities"],
    impactAnalysis: {
      financialImpact: 'Zero proactive upsell; massive missed revenue.',
      severity: "Critical",
      affectedAreas: ["Revenue per Customer", "Growth Efficiency"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Create an upsell script", "Train team to suggest relevant services", "Build upsell into service reviews"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Fear of seeming pushy", "No process", "Focus on new customer acquisition"],
      automationPotential: {
        rating: "High",
        example: 'Automated upsell prompts triggered by milestones, usage, or service completion.'
      },
      pathToRoot: 'Not Proactively Offering → No Upsell Process → Not Buying More'
    }
  },
  'not-identifying-opportunities': {
    explanation: 'You"re not watching for signals that customers could benefit from additional services. You miss the moment when need emerges.',
    relatedProblems: ["no-upsell-process", "not-proactively-offering", "waiting-ask"],
    impactAnalysis: {
      financialImpact: 'Lost upsell opportunities; customers buy from competitors.',
      severity: "Major",
      affectedAreas: ["Cross-sell Rate', "Revenue per Customer"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Ongoing",
      difficulty: "Medium",
      quickWins: ["Create trigger list (when to offer what)", "Train team to spot signals", "Regular account reviews"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["No process for monitoring accounts", "Reactive not proactive", "No tracking"],
      automationPotential: {
        rating: "High",
        example: 'AI-powered account monitoring identifies expansion opportunities based on usage patterns, industry trends, or life-cycle stage.'
      },
      pathToRoot: 'Not Identifying Opportunities → No Upsell Process → Not Buying More'
    }
  },
  'waiting-ask': {
    explanation: 'You assume customers will ask when they need something. They won"t. You need to educate and suggest proactively.',
    relatedProblems: ["no-upsell-process", "not-proactively-offering", "never-told"],
    impactAnalysis: {
      financialImpact: 'Passive approach leaves most upsell revenue on the table.',
      severity: "Major",
      affectedAreas: ["Revenue Growth", "Customer LTV"],
      strategicPriority: 'High'
    },
    timeToSolve: {
      estimate: "Immediate",
      difficulty: "Easy",
      quickWins: ["Shift mindset to proactive", "Create prompts to suggest services", "Build upsell into regular touchpoints"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Passive sales culture", "Fear of rejection", "Assumed they"d ask if interested"],
      automationPotential: {
        rating: "High",
        example: 'Automated upsell campaigns and suggestions remove reliance on customers asking.'
      },
      pathToRoot: 'Waiting for Them to Ask → No Upsell Process → Not Buying More'
    }
  }
};

// Default explanation when specific node not found
export const getNodeExplanation = (nodeId: string): NodeExplanation => {
  return nodeExplanations[nodeId] || {
    explanation: 'This specific issue contributes to the overall problem in your diagnostic branch. It represents a point of friction, inefficiency, or missing infrastructure that needs to be addressed to unlock growth.',
    relatedProblems: [],
    impactAnalysis: {
      financialImpact: 'Varies by business context; usually manifests as lost time or missed opportunities.',
      severity: "To be assessed",
      affectedAreas: ["Operations", "Efficiency"],
      strategicPriority: 'Medium'
    },
    timeToSolve: {
      estimate: "1-3 months",
      difficulty: "Medium",
      quickWins: ["Document the current process", "Identify the single biggest bottleneck in this step", "Ask the team for one suggestion to fix it"]
    },
    rootCauseAnalysis: {
      likelyCauses: ["Lack of standardized SOP", "Undefined ownership", "Outdated tools"],
      automationPotential: {
        rating: "Medium",
        example: 'Look for repetitive data entry or communication steps that can be automated.'
      },
      pathToRoot: 'Part of the larger systemic chain identified in the map.'
    }
  };
};
