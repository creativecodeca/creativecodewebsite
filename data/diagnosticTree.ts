// Business Problem Diagnostic Tree Data Structure
// Parsed from markdown hierarchy

export interface TreeNode {
  id: string;
  label: string;
  level: number;
  children: TreeNode[];
  parent?: string;
}

// Raw diagnostic tree data
const rawTreeData: TreeNode = {
  id: 'root',
  label: "DON'T HAVE ENOUGH MONEY",
  level: 1,
  children: [
    {
      id: 'money-slow',
      label: 'MONEY COMES IN TOO SLOWLY',
      level: 2,
      children: [
        {
          id: 'payment-terms-long',
          label: 'PAYMENT TERMS TOO LONG',
          level: 3,
          children: [
            { id: 'net-terms', label: 'Clients on NET-30, NET-60, or NET-90', level: 4, children: [] },
            { id: 'no-deposits', label: 'No upfront deposits or retainers', level: 4, children: [] },
            { id: 'milestones-spread', label: 'Milestone payments too spread out', level: 4, children: [] },
            { id: 'deferred-payment', label: 'All payment deferred until project end', level: 4, children: [] },
          ],
        },
        {
          id: 'clients-pay-late',
          label: 'CLIENTS PAY LATE',
          level: 3,
          children: [
            { id: 'no-followup', label: 'No invoice follow-up system', level: 4, children: [] },
            { id: 'invoices-unclear', label: 'Invoices unclear, incorrect, or incomplete', level: 4, children: [] },
            { id: 'no-penalties', label: 'No late payment penalties or interest', level: 4, children: [] },
            { id: 'payment-friction', label: 'Payment process has too much friction', level: 4, children: [] },
            { id: 'wrong-person', label: 'Invoices going to wrong person/department', level: 4, children: [] },
            { id: 'approval-delays', label: 'Client approval process causes delays', level: 4, children: [] },
          ],
        },
        {
          id: 'long-sales-cycle',
          label: 'LONG SALES CYCLE',
          level: 3,
          children: [
            { id: 'many-decision-makers', label: 'Too many decision makers involved', level: 4, children: [] },
            { id: 'proposal-drags', label: 'Proposal/quote process drags on', level: 4, children: [] },
            { id: 'contract-negotiation', label: 'Contract negotiation takes forever', level: 4, children: [] },
            { id: 'procurement-bottleneck', label: 'Procurement/legal review bottlenecks', level: 4, children: [] },
            { id: 'rfp-timeline', label: 'RFP process extends timeline', level: 4, children: [] },
            { id: 'budget-approval', label: 'Budget approval cycles delay close', level: 4, children: [] },
          ],
        },
        {
          id: 'long-delivery-cycle',
          label: 'LONG DELIVERY CYCLE BEFORE PAYMENT',
          level: 3,
          children: [
            { id: 'invoice-after-complete', label: "Can't invoice until work complete", level: 4, children: [] },
            { id: 'work-takes-long', label: 'Work takes too long to finish', level: 4, children: [] },
            { id: 'waiting-feedback', label: 'Waiting on client feedback/approvals', level: 4, children: [] },
            { id: 'revisions-delay', label: 'Revisions and scope changes delay completion', level: 4, children: [] },
            { id: 'third-party-dependencies', label: 'Dependencies on third parties', level: 4, children: [] },
            { id: 'seasonal-constraints', label: 'Seasonal/timing constraints', level: 4, children: [] },
          ],
        },
        {
          id: 'cash-flow-gaps',
          label: 'CASH FLOW GAPS',
          level: 3,
          children: [
            { id: 'irregular-timing', label: 'Irregular project timing', level: 4, children: [] },
            { id: 'big-expenses-before-payment', label: 'Big expenses before payment received', level: 4, children: [] },
            { id: 'no-buffer', label: 'No financial buffer/reserves', level: 4, children: [] },
            { id: 'lumpy-revenue', label: 'Lumpy revenue (feast or famine)', level: 4, children: [] },
          ],
        },
      ],
    },
    {
      id: 'money-out-fast',
      label: 'MONEY GOES OUT TOO FAST',
      level: 2,
      children: [
        {
          id: 'expenses-high',
          label: 'EXPENSES TOO HIGH',
          level: 3,
          children: [
            {
              id: 'overhead-high',
              label: 'OVERHEAD TOO HIGH',
              level: 4,
              children: [
                { id: 'expensive-office', label: 'Expensive office/rent/coworking', level: 5, children: [] },
                { id: 'many-subscriptions', label: 'Too many software subscriptions', level: 5, children: [] },
                { id: 'equipment-costs', label: 'Equipment costs eating profit', level: 5, children: [] },
                { id: 'insurance-legal', label: 'Insurance and legal fees high', level: 5, children: [] },
                { id: 'utilities-facilities', label: 'Utilities and facilities costs', level: 5, children: [] },
                { id: 'admin-staff', label: 'Administrative staff overhead', level: 5, children: [] },
                { id: 'banking-fees', label: 'Banking and transaction fees', level: 5, children: [] },
              ],
            },
            {
              id: 'delivery-costs-high',
              label: 'DELIVERY COSTS TOO HIGH',
              level: 4,
              children: [
                { id: 'subcontractors-expensive', label: 'Paying subcontractors/freelancers too much', level: 5, children: [] },
                { id: 'inefficient-processes', label: 'Inefficient processes waste time and money', level: 5, children: [] },
                { id: 'rework-mistakes', label: 'Rework and mistakes cost money', level: 5, children: [] },
                { id: 'travel-meetings', label: 'Travel and meeting expenses', level: 5, children: [] },
                { id: 'materials-supplies', label: 'Materials and supplies expensive', level: 5, children: [] },
                { id: 'tools-equipment-break', label: 'Tools and equipment break or need replacement', level: 5, children: [] },
                { id: 'licensing-compliance', label: 'Licensing and compliance costs', level: 5, children: [] },
                { id: 'support-costs', label: 'Customer support costs high', level: 5, children: [] },
              ],
            },
            {
              id: 'acquisition-costs-high',
              label: 'ACQUISITION COSTS TOO HIGH',
              level: 4,
              children: [
                { id: 'ads-expensive', label: 'Ads too expensive per lead/customer', level: 5, children: [] },
                { id: 'sales-process-long', label: 'Sales process takes too long (time = money)', level: 5, children: [] },
                { id: 'high-churn', label: 'High refund/cancellation/churn rate', level: 5, children: [] },
                { id: 'agency-fees', label: 'Marketing agency/consultant fees high', level: 5, children: [] },
                { id: 'sales-compensation', label: 'Sales team compensation expensive', level: 5, children: [] },
                { id: 'events-no-roi', label: "Events and sponsorships don't ROI", level: 5, children: [] },
                { id: 'content-costs', label: 'Content creation costs high', level: 5, children: [] },
                { id: 'commission-unsustainable', label: 'Commission structure unsustainable', level: 5, children: [] },
              ],
            },
            {
              id: 'waste-inefficiency',
              label: 'WASTE AND INEFFICIENCY',
              level: 4,
              children: [
                { id: 'unused-subscriptions', label: 'Unused subscriptions and tools', level: 5, children: [] },
                { id: 'duplicate-systems', label: 'Duplicate systems', level: 5, children: [] },
                { id: 'team-idle', label: 'Team idle time', level: 5, children: [] },
                { id: 'overbuying-inventory', label: 'Overbuying inventory/supplies', level: 5, children: [] },
                { id: 'poor-resource-allocation', label: 'Poor resource allocation', level: 5, children: [] },
              ],
            },
          ],
        },
        {
          id: 'margins-low',
          label: 'PROFIT MARGINS TOO LOW',
          level: 3,
          children: [
            {
              id: 'prices-low',
              label: 'PRICES TOO LOW',
              level: 4,
              children: [
                { id: 'afraid-raise-prices', label: 'Afraid to raise prices', level: 5, children: [] },
                { id: 'competing-price', label: 'Competing on price not value', level: 5, children: [] },
                { id: 'dont-know-costs', label: "Don't know true costs", level: 5, children: [] },
                { id: 'underestimate-time', label: 'Underestimating time required', level: 5, children: [] },
                { id: 'too-many-discounts', label: 'Giving too many discounts', level: 5, children: [] },
                { id: 'grandfather-clauses', label: 'Grandfather clauses lock in old pricing', level: 5, children: [] },
                { id: 'race-to-bottom', label: 'Race to bottom in market', level: 5, children: [] },
                { id: 'undervalue-expertise', label: 'Undervaluing expertise', level: 5, children: [] },
              ],
            },
            {
              id: 'scope-creep-unbilled',
              label: 'SCOPE CREEP NOT BILLED',
              level: 4,
              children: [
                { id: 'extras-free', label: 'Clients ask for extras for free', level: 5, children: [] },
                { id: 'no-change-order', label: 'No change order process', level: 5, children: [] },
                { id: 'afraid-charge-changes', label: 'Afraid to charge for changes', level: 5, children: [] },
                { id: 'scope-poorly-defined', label: 'Scope poorly defined upfront', level: 5, children: [] },
                { id: 'one-thing-adds-up', label: '"Just this one thing" adds up', level: 5, children: [] },
              ],
            },
            {
              id: 'inefficient-delivery',
              label: 'INEFFICIENT DELIVERY',
              level: 4,
              children: [
                { id: 'taking-too-long', label: 'Taking too long to deliver', level: 5, children: [] },
                { id: 'not-standardized', label: 'Too much custom work (not standardized)', level: 5, children: [] },
                { id: 'over-delivering', label: 'Over-delivering beyond scope', level: 5, children: [] },
                { id: 'rework-eating-profit', label: 'Rework eating profit', level: 5, children: [] },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'not-enough-revenue',
      label: 'NOT ENOUGH REVENUE COMING IN',
      level: 2,
      children: [
        {
          id: 'not-enough-clients',
          label: 'NOT ENOUGH CLIENTS TOTAL',
          level: 3,
          children: [
            {
              id: 'clients-churned',
              label: 'EXISTING CLIENTS CHURNED/LEFT',
              level: 4,
              children: [
                {
                  id: 'why-left',
                  label: 'WHY THEY LEFT',
                  level: 5,
                  children: [
                    { id: 'bad-service', label: 'Delivered bad service or results', level: 6, children: [] },
                    { id: 'out-of-business', label: 'They went out of business', level: 6, children: [] },
                    { id: 'competitor-stole', label: 'Competitor stole them with better offer', level: 6, children: [] },
                    { id: 'contract-ended', label: 'Contract ended with no renewal attempt', level: 6, children: [] },
                    { id: 'pricing-increased', label: "Pricing increased and they couldn't afford", level: 6, children: [] },
                    { id: 'needs-changed', label: 'Their needs changed (outgrew or no longer need)', level: 6, children: [] },
                    { id: 'contact-left', label: 'Key contact left their company', level: 6, children: [] },
                    { id: 'relationship-deteriorated', label: 'Relationship deteriorated', level: 6, children: [] },
                  ],
                },
                {
                  id: 'no-retention-system',
                  label: 'NO RETENTION SYSTEM',
                  level: 5,
                  children: [
                    { id: 'not-staying-touch', label: 'Not staying in touch', level: 6, children: [] },
                    { id: 'not-asking-feedback', label: 'Not asking for feedback', level: 6, children: [] },
                    { id: 'not-monitoring-satisfaction', label: 'Not monitoring satisfaction', level: 6, children: [] },
                    { id: 'no-renewal-process', label: 'No renewal process', level: 6, children: [] },
                    { id: 'assuming-stay', label: "Assuming they'll stay", level: 6, children: [] },
                  ],
                },
              ],
            },
            {
              id: 'clients-not-buying-more',
              label: 'EXISTING CLIENTS NOT BUYING MORE',
              level: 4,
              children: [
                {
                  id: 'lack-awareness',
                  label: 'LACK OF AWARENESS',
                  level: 5,
                  children: [
                    { id: 'dont-know-offer', label: "Don't know we offer other services", level: 6, children: [] },
                    { id: 'dont-know-what-else', label: "Don't know what else we can do", level: 6, children: [] },
                    { id: 'never-told', label: 'Never been told about other options', level: 6, children: [] },
                    { id: 'assume-one-thing', label: 'Assume we only do one thing', level: 6, children: [] },
                  ],
                },
                {
                  id: 'lack-need-perceived',
                  label: 'LACK OF NEED (PERCEIVED)',
                  level: 5,
                  children: [
                    { id: 'dont-need-else', label: "Don't need anything else right now", level: 6, children: [] },
                    { id: 'dont-see-connection', label: "Don't see connection to other services", level: 6, children: [] },
                    { id: 'satisfied-current', label: 'Satisfied with current scope', level: 6, children: [] },
                  ],
                },
                {
                  id: 'barriers-expansion',
                  label: 'BARRIERS TO EXPANSION',
                  level: 5,
                  children: [
                    { id: 'budget-constraints', label: 'Budget constraints', level: 6, children: [] },
                    { id: 'bad-experience-first', label: 'Bad experience with first service', level: 6, children: [] },
                    { id: 'buying-elsewhere', label: 'Buying that service elsewhere already', level: 6, children: [] },
                    { id: 'decision-maker-changed', label: 'Decision maker changed', level: 6, children: [] },
                    { id: 'timing-not-right', label: 'Timing not right', level: 6, children: [] },
                  ],
                },
                {
                  id: 'no-upsell-process',
                  label: 'NO UPSELL PROCESS',
                  level: 5,
                  children: [
                    { id: 'not-proactively-offering', label: 'Not proactively offering', level: 6, children: [] },
                    { id: 'not-identifying-opportunities', label: 'Not identifying opportunities', level: 6, children: [] },
                    { id: 'waiting-ask', label: 'Waiting for them to ask', level: 6, children: [] },
                  ],
                },
              ],
            },
            {
              id: 'not-getting-new',
              label: 'NOT GETTING NEW CLIENTS',
              level: 4,
              children: [
                {
                  id: 'cant-find-prospects',
                  label: "CAN'T FIND ENOUGH PROSPECTS",
                  level: 5,
                  children: [
                    {
                      id: 'dont-know-where-market',
                      label: "DON'T KNOW WHERE TARGET MARKET IS",
                      level: 6,
                      children: [
                        { id: 'no-research', label: 'No customer research done', level: 7, children: [] },
                        { id: 'guessing-demographics', label: 'Guessing at demographics and psychographics', level: 7, children: [] },
                        { id: 'assumptions-hangout', label: 'Assumptions about where they hang out', level: 7, children: [] },
                        { id: 'not-where-looking', label: "Not where we're currently looking", level: 7, children: [] },
                        { id: 'market-shifted', label: "Market shifted and we didn't notice", level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'market-too-small',
                      label: 'TARGET MARKET TOO SMALL',
                      level: 6,
                      children: [
                        { id: 'niche-narrow', label: 'Niche too narrow to sustain business', level: 7, children: [] },
                        { id: 'geographic-limits', label: 'Geographic limitations restrict pool', level: 7, children: [] },
                        { id: 'industry-specialized', label: 'Industry too specialized', level: 7, children: [] },
                        { id: 'addressable-market', label: 'Addressable market smaller than needed', level: 7, children: [] },
                        { id: 'targeting-specific', label: 'Targeting too specific a profile', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'market-competitive',
                      label: 'TARGET MARKET TOO COMPETITIVE',
                      level: 6,
                      children: [
                        { id: 'market-saturated', label: 'Market saturated with providers', level: 7, children: [] },
                        { id: 'big-players-dominate', label: 'Big players dominate and squeeze out small', level: 7, children: [] },
                        { id: 'race-bottom-price', label: 'Race to bottom on price', level: 7, children: [] },
                        { id: 'differentiation-unclear', label: 'Differentiation unclear', level: 7, children: [] },
                        { id: 'barriers-low', label: "Barriers to entry too low (everyone's doing it)", level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'lead-gen-insufficient',
                      label: 'LEAD GENERATION INSUFFICIENT',
                      level: 6,
                      children: [
                        { id: 'not-enough-activity', label: 'Not enough activity/volume', level: 7, children: [] },
                        { id: 'sources-dried', label: 'Lead sources dried up', level: 7, children: [] },
                        { id: 'tactics-stopped-working', label: 'Tactics stopped working', level: 7, children: [] },
                        { id: 'not-trying-channels', label: 'Not trying enough channels', level: 7, children: [] },
                        { id: 'inconsistent-effort', label: 'Inconsistent effort', level: 7, children: [] },
                      ],
                    },
                  ],
                },
                {
                  id: 'prospects-dont-know',
                  label: "PROSPECTS DON'T KNOW WE EXIST",
                  level: 5,
                  children: [
                    {
                      id: 'no-visibility',
                      label: 'NO VISIBILITY',
                      level: 6,
                      children: [
                        { id: 'no-marketing', label: 'No marketing at all', level: 7, children: [] },
                        { id: 'no-website', label: 'No website or online presence', level: 7, children: [] },
                        { id: 'not-on-platforms', label: 'Not on platforms where audience is', level: 7, children: [] },
                        { id: 'seo-nonexistent', label: 'SEO non-existent', level: 7, children: [] },
                        { id: 'not-showing-search', label: 'Not showing up in search', level: 7, children: [] },
                        { id: 'social-inactive', label: 'Social media inactive or absent', level: 7, children: [] },
                        { id: 'not-publishing', label: 'Not publishing content', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'no-referrals',
                      label: 'NO REFERRALS COMING IN',
                      level: 6,
                      children: [
                        { id: 'not-asking-referrals', label: 'Not asking for referrals', level: 7, children: [] },
                        { id: 'dont-know-how-refer', label: "Clients don't know how to refer", level: 7, children: [] },
                        { id: 'no-incentive-referrals', label: 'No incentive or system for referrals', level: 7, children: [] },
                        { id: 'service-not-remarkable', label: 'Service not remarkable enough to refer', level: 7, children: [] },
                        { id: 'dont-make-easy', label: "Don't make it easy to refer", level: 7, children: [] },
                        { id: 'forget-ask', label: 'Forget to ask at right time', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'no-word-mouth',
                      label: 'NO WORD OF MOUTH',
                      level: 6,
                      children: [
                        { id: 'not-talk-worthy', label: 'Not creating talk-worthy experiences', level: 7, children: [] },
                        { id: 'no-community', label: 'No community or network effect', level: 7, children: [] },
                        { id: 'not-memorable', label: 'Not memorable', level: 7, children: [] },
                        { id: 'clients-dont-understand', label: "Clients don't understand business well enough to explain", level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'wrong-channels',
                      label: 'WRONG CHANNELS',
                      level: 6,
                      children: [
                        { id: 'marketing-not-audience', label: "Marketing where audience isn't", level: 7, children: [] },
                        { id: 'message-wrong-platforms', label: 'Message on wrong platforms', level: 7, children: [] },
                        { id: 'tactics-dont-match', label: "Tactics don't match customer behavior", level: 7, children: [] },
                        { id: 'budget-wrong-activities', label: 'Budget allocated to wrong activities', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'outreach-issues',
                      label: 'OUTREACH ISSUES',
                      level: 6,
                      children: [
                        { id: 'not-doing-outbound', label: 'Not doing outbound at all', level: 7, children: [] },
                        { id: 'outbound-spammy', label: 'Outbound too spammy/generic', level: 7, children: [] },
                        { id: 'getting-ignored', label: 'Getting ignored or blocked', level: 7, children: [] },
                        { id: 'lists-outdated', label: 'Lists outdated or wrong', level: 7, children: [] },
                      ],
                    },
                  ],
                },
                {
                  id: 'prospects-aware-dont-engage',
                  label: "PROSPECTS AWARE BUT DON'T ENGAGE",
                  level: 5,
                  children: [
                    {
                      id: 'message-no-resonate',
                      label: "MESSAGE DOESN'T RESONATE",
                      level: 6,
                      children: [
                        { id: 'talking-us-not-problems', label: 'Talking about us not their problems', level: 7, children: [] },
                        { id: 'wrong-language', label: 'Using wrong language/jargon (or not enough)', level: 7, children: [] },
                        { id: 'benefits-unclear', label: 'Benefits unclear or not compelling', level: 7, children: [] },
                        { id: 'doesnt-speak-pain', label: "Doesn't speak to their pain", level: 7, children: [] },
                        { id: 'generic-messaging', label: 'Generic messaging (could be anyone)', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'offer-not-compelling',
                      label: 'OFFER NOT COMPELLING',
                      level: 6,
                      children: [
                        { id: 'looks-like-everyone', label: 'Looks like everyone else', level: 7, children: [] },
                        { id: 'no-differentiation', label: 'No clear differentiation', level: 7, children: [] },
                        { id: 'generic-positioning', label: 'Generic positioning', level: 7, children: [] },
                        { id: 'nothing-unique', label: 'Nothing unique or special', level: 7, children: [] },
                        { id: 'doesnt-stand-out', label: "Doesn't stand out", level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'wrong-timing',
                      label: 'WRONG TIMING',
                      level: 6,
                      children: [
                        { id: 'not-buying-mode', label: 'Reaching them when not in buying mode', level: 7, children: [] },
                        { id: 'not-nurturing', label: 'Not nurturing over time', level: 7, children: [] },
                        { id: 'no-followup', label: 'No follow-up sequence', level: 7, children: [] },
                        { id: 'one-and-done', label: 'One-and-done approach', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'no-clear-next-step',
                      label: 'NO CLEAR NEXT STEP',
                      level: 6,
                      children: [
                        { id: 'no-cta', label: 'No call-to-action', level: 7, children: [] },
                        { id: 'cta-unclear', label: 'CTA too complicated or unclear', level: 7, children: [] },
                        { id: 'too-much-friction', label: 'Too much friction to engage', level: 7, children: [] },
                        { id: 'ask-too-big', label: 'Too big an ask too soon', level: 7, children: [] },
                        { id: 'multiple-conflicting-cta', label: 'Multiple conflicting CTAs', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'content-weak',
                      label: 'CONTENT/CREATIVE WEAK',
                      level: 6,
                      children: [
                        { id: 'design-amateur', label: 'Design looks amateur', level: 7, children: [] },
                        { id: 'copy-boring', label: 'Copy is boring or confusing', level: 7, children: [] },
                        { id: 'no-hook', label: 'No hook to grab attention', level: 7, children: [] },
                        { id: 'too-much-text', label: 'Too much text/information', level: 7, children: [] },
                        { id: 'unclear-value-prop', label: 'Unclear value proposition', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'trust-signals-missing',
                      label: 'TRUST SIGNALS MISSING',
                      level: 6,
                      children: [
                        { id: 'no-social-proof', label: 'No social proof visible', level: 7, children: [] },
                        { id: 'no-credentials', label: 'No credentials shown', level: 7, children: [] },
                        { id: 'anonymous-brand', label: 'Anonymous/faceless brand', level: 7, children: [] },
                        { id: 'new-unknown', label: 'New/unknown brand', level: 7, children: [] },
                      ],
                    },
                  ],
                },
                {
                  id: 'prospects-engage-dont-buy',
                  label: "PROSPECTS ENGAGE BUT DON'T BUY",
                  level: 5,
                  children: [
                    {
                      id: 'dont-trust',
                      label: "DON'T TRUST US",
                      level: 6,
                      children: [
                        { id: 'no-testimonials', label: 'No social proof or testimonials', level: 7, children: [] },
                        { id: 'no-track-record', label: 'No track record shown', level: 7, children: [] },
                        { id: 'website-unprofessional', label: 'Website looks unprofessional', level: 7, children: [] },
                        { id: 'no-case-studies', label: 'No case studies or results', level: 7, children: [] },
                        { id: 'cant-find-reviews', label: "Can't find reviews or they're bad", level: 7, children: [] },
                        { id: 'no-recognizable-clients', label: 'No recognizable clients/logos', level: 7, children: [] },
                        { id: 'too-new-unproven', label: 'Too new/unproven', level: 7, children: [] },
                        { id: 'promises-too-good', label: 'Promises seem too good to be true', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'dont-understand-offer',
                      label: "DON'T UNDERSTAND OFFER",
                      level: 6,
                      children: [
                        { id: 'explanation-complicated', label: 'Explanation too complicated or technical', level: 7, children: [] },
                        { id: 'too-many-options', label: 'Too many options (paradox of choice)', level: 7, children: [] },
                        { id: 'unclear-included', label: "Unclear what's included vs excluded", level: 7, children: [] },
                        { id: 'process-unclear', label: 'Process unclear or confusing', level: 7, children: [] },
                        { id: 'pricing-structure-confusing', label: 'Pricing structure confusing', level: 7, children: [] },
                        { id: 'terms-unclear', label: 'Terms and conditions unclear', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'dont-believe-solves',
                      label: "DON'T BELIEVE IT SOLVES THEIR PROBLEM",
                      level: 6,
                      children: [
                        { id: 'weak-case-studies', label: 'Weak or irrelevant case studies', level: 7, children: [] },
                        { id: 'cant-articulate-roi', label: "Can't articulate ROI clearly", level: 7, children: [] },
                        { id: 'no-proof-situation', label: 'No proof it works for their situation', level: 7, children: [] },
                        { id: 'results-unrealistic', label: 'Results seem unrealistic', level: 7, children: [] },
                        { id: 'situation-different', label: 'Their situation feels too different', level: 7, children: [] },
                        { id: 'missing-key-features', label: 'Missing key features they need', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'price-objection',
                      label: 'PRICE OBJECTION',
                      level: 6,
                      children: [
                        { id: 'sticker-shock', label: 'Sticker shock (seems too expensive)', level: 7, children: [] },
                        { id: 'cant-see-value', label: "Can't see value relative to cost", level: 7, children: [] },
                        { id: 'payment-terms-dont-work', label: "Payment terms don't work for them", level: 7, children: [] },
                        { id: 'comparing-cheaper', label: 'Comparing to cheaper alternatives', level: 7, children: [] },
                        { id: 'budget-not-available', label: 'Budget not approved or available', level: 7, children: [] },
                        { id: 'not-decision-maker-budget', label: 'Not decision maker on budget', level: 7, children: [] },
                        { id: 'cost-benefit-unclear', label: 'Cost vs benefit unclear', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'timing-not-right-sales',
                      label: 'TIMING NOT RIGHT',
                      level: 6,
                      children: [
                        { id: 'problem-not-urgent', label: 'Problem not urgent enough right now', level: 7, children: [] },
                        { id: 'budget-not-now', label: 'Budget not available now (seasonal, fiscal)', level: 7, children: [] },
                        { id: 'other-priorities', label: 'Other priorities taking precedence', level: 7, children: [] },
                        { id: 'waiting-approval', label: 'Waiting on internal approval/alignment', level: 7, children: [] },
                        { id: 'want-think-about', label: 'Want to think about it', level: 7, children: [] },
                        { id: 'need-finish-current', label: 'Need to finish current solution first', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'sales-process-weak',
                      label: 'SALES PROCESS WEAK',
                      level: 6,
                      children: [
                        { id: 'not-qualifying', label: 'Not qualifying properly (wrong prospects)', level: 7, children: [] },
                        { id: 'not-asking-discovery', label: 'Not asking good discovery questions', level: 7, children: [] },
                        { id: 'not-handling-objections', label: 'Not handling objections effectively', level: 7, children: [] },
                        { id: 'not-closing', label: 'Not closing or asking for the sale', level: 7, children: [] },
                        { id: 'following-up-inconsistently', label: 'Following up inconsistently or not at all', level: 7, children: [] },
                        { id: 'too-pushy-not-assertive', label: 'Too pushy or not assertive enough', level: 7, children: [] },
                        { id: 'taking-long-respond', label: 'Taking too long to respond', level: 7, children: [] },
                        { id: 'proposal-misses-mark', label: 'Proposal misses the mark', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'competition-beats',
                      label: 'COMPETITION BEATS US',
                      level: 6,
                      children: [
                        { id: 'competitor-better-offer', label: 'Competitor has better offer', level: 7, children: [] },
                        { id: 'competitor-stronger-relationship', label: 'Competitor has stronger relationship', level: 7, children: [] },
                        { id: 'competitor-moved-faster', label: 'Competitor moved faster', level: 7, children: [] },
                        { id: 'competitor-better-reputation', label: 'Competitor has better reputation', level: 7, children: [] },
                        { id: 'incumbent-advantage', label: 'Incumbent advantage', level: 7, children: [] },
                        { id: 'lost-on-price', label: 'Lost on price', level: 7, children: [] },
                      ],
                    },
                    {
                      id: 'risk-too-high',
                      label: 'RISK FEELS TOO HIGH',
                      level: 6,
                      children: [
                        { id: 'big-commitment', label: 'Big commitment with unknown provider', level: 7, children: [] },
                        { id: 'fear-wrong-decision', label: 'Fear of making wrong decision', level: 7, children: [] },
                        { id: 'no-trial-guarantee', label: 'No trial or guarantee', level: 7, children: [] },
                        { id: 'switching-costs-high', label: 'Switching costs feel high', level: 7, children: [] },
                        { id: 'political-risk', label: 'Political risk internally', level: 7, children: [] },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'bought-cant-deliver',
          label: 'CLIENTS BOUGHT BUT CAN'T DELIVER',
          level: 3,
          children: [
            {
              id: 'not-enough-capacity',
              label: 'NOT ENOUGH CAPACITY TO FULFILL',
              level: 4,
              children: [
                {
                  id: 'founder-everything',
                  label: 'FOUNDER DOING EVERYTHING',
                  level: 5,
                  children: [
                    { id: 'cant-delegate', label: "Can't delegate or trust others", level: 6, children: [] },
                    { id: 'no-one-knows-how', label: 'No one else knows how to do the work', level: 6, children: [] },
                    { id: 'afraid-let-go', label: 'Afraid to let go of control/quality', level: 6, children: [] },
                    { id: 'havent-trained', label: "Haven't trained anyone else", level: 6, children: [] },
                    { id: 'doing-sales-delivery-admin', label: 'Doing sales, delivery, admin, everything', level: 6, children: [] },
                  ],
                },
                {
                  id: 'cant-hire-fast',
                  label: "CAN'T HIRE FAST ENOUGH",
                  level: 5,
                  children: [
                    { id: 'cant-find-qualified', label: "Can't find qualified people", level: 6, children: [] },
                    { id: 'hiring-process-slow', label: 'Hiring process too slow or broken', level: 6, children: [] },
                    { id: 'interview-bottleneck', label: 'Interview process bottleneck', level: 6, children: [] },
                    { id: 'not-enough-applicants', label: 'Not enough applicants or low quality', level: 6, children: [] },
                    { id: 'job-market-competitive', label: 'Job market competitive', level: 6, children: [] },
                    { id: 'cant-compete-compensation', label: "Can't compete on compensation", level: 6, children: [] },
                  ],
                },
                {
                  id: 'cant-afford-hire',
                  label: "CAN'T AFFORD TO HIRE",
                  level: 5,
                  children: [
                    { id: 'no-cash-payroll', label: 'No cash for payroll', level: 6, children: [] },
                    { id: 'margins-thin-staff', label: 'Margins too thin to support staff', level: 6, children: [] },
                    { id: 'revenue-uncertain', label: 'Revenue too uncertain/variable', level: 6, children: [] },
                    { id: 'already-stretched', label: 'Already stretched financially', level: 6, children: [] },
                    { id: 'afraid-commitment', label: 'Afraid of commitment', level: 6, children: [] },
                  ],
                },
                {
                  id: 'training-long',
                  label: 'TRAINING TAKES TOO LONG',
                  level: 5,
                  children: [
                    { id: 'no-training-system', label: 'No training system or materials', level: 6, children: [] },
                    { id: 'service-complex', label: 'Service complex and hard to learn', level: 6, children: [] },
                    { id: 'turnover-before-trained', label: 'High turnover before people are trained', level: 6, children: [] },
                    { id: 'training-busy-founder', label: 'Training falls on already-busy founder', level: 6, children: [] },
                    { id: 'learning-curve-steep', label: 'Learning curve steep', level: 6, children: [] },
                  ],
                },
                {
                  id: 'team-unreliable',
                  label: 'TEAM UNRELIABLE OR UNDERPERFORMING',
                  level: 5,
                  children: [
                    { id: 'people-quit', label: 'People quit frequently', level: 6, children: [] },
                    { id: 'people-underperform', label: "People underperform or don't care", level: 6, children: [] },
                    { id: 'attendance-issues', label: 'Attendance and reliability issues', level: 6, children: [] },
                    { id: 'skill-mismatches', label: 'Skill mismatches (hired wrong people)', level: 6, children: [] },
                    { id: 'motivation-low', label: 'Motivation and engagement low', level: 6, children: [] },
                    { id: 'management-issues', label: 'Management and leadership issues', level: 6, children: [] },
                  ],
                },
                {
                  id: 'scaling-constraints',
                  label: 'SCALING CONSTRAINTS',
                  level: 5,
                  children: [
                    { id: 'physical-limitations', label: 'Physical limitations (space, equipment)', level: 6, children: [] },
                    { id: 'can-only-serve-x', label: 'Can only serve X clients at once', level: 6, children: [] },
                    { id: 'geographic-constraints', label: 'Geographic constraints', level: 6, children: [] },
                    { id: 'licensing-limits', label: 'Licensing or certification limits', level: 6, children: [] },
                    { id: 'technology-cant-handle', label: "Technology can't handle volume", level: 6, children: [] },
                  ],
                },
              ],
            },
            {
              id: 'process-bottlenecks',
              label: 'PROCESS BOTTLENECKS',
              level: 4,
              children: [
                {
                  id: 'manual-processes',
                  label: 'MANUAL PROCESSES TOO SLOW',
                  level: 5,
                  children: [
                    { id: 'everything-by-hand', label: 'Everything done by hand', level: 6, children: [] },
                    { id: 'no-automation', label: 'No automation anywhere', level: 6, children: [] },
                    { id: 'repetitive-tasks', label: 'Repetitive tasks eat tons of time', level: 6, children: [] },
                    { id: 'data-entry-overwhelming', label: 'Data entry and admin overwhelming', level: 6, children: [] },
                    { id: 'copy-paste-hell', label: 'Copy-paste hell', level: 6, children: [] },
                  ],
                },
                {
                  id: 'no-systems',
                  label: 'NO SYSTEMS OR DOCUMENTATION',
                  level: 5,
                  children: [
                    { id: 'tribal-knowledge', label: "Tribal knowledge only (in people's heads)", level: 6, children: [] },
                    { id: 'every-project-reinvented', label: 'Every project reinvented from scratch', level: 6, children: [] },
                    { id: 'cant-scale-without-founder', label: "Can't scale without founder involved", level: 6, children: [] },
                    { id: 'no-sops', label: 'No SOPs or playbooks', level: 6, children: [] },
                    { id: 'inconsistent-methods', label: 'Inconsistent methods', level: 6, children: [] },
                  ],
                },
                {
                  id: 'dependencies-key-people',
                  label: 'DEPENDENCIES ON KEY PEOPLE',
                  level: 5,
                  children: [
                    { id: 'only-one-knows', label: 'Only one person knows how to do X', level: 6, children: [] },
                    { id: 'bottleneck-unavailable', label: "Bottleneck when they're unavailable", level: 6, children: [] },
                    { id: 'single-point-failure', label: 'Single point of failure', level: 6, children: [] },
                    { id: 'bus-factor', label: 'Bus factor of 1', level: 6, children: [] },
                    { id: 'knowledge-hoarding', label: 'Knowledge hoarding', level: 6, children: [] },
                  ],
                },
                {
                  id: 'tools-inadequate',
                  label: 'TOOLS AND TECH INADEQUATE',
                  level: 5,
                  children: [
                    { id: 'wrong-software', label: 'Using wrong software for the job', level: 6, children: [] },
                    { id: 'systems-dont-integrate', label: "Systems don't integrate or talk to each other", level: 6, children: [] },
                    { id: 'manual-data-entry', label: 'Manual data entry between systems', level: 6, children: [] },
                    { id: 'technology-unreliable', label: 'Technology keeps breaking or is unreliable', level: 6, children: [] },
                    { id: 'outgrown-tools', label: 'Outgrown current tools', level: 6, children: [] },
                    { id: 'no-crm-pm', label: 'No CRM or project management system', level: 6, children: [] },
                    { id: 'cobbled-solutions', label: 'Cobbled together solutions', level: 6, children: [] },
                  ],
                },
                {
                  id: 'coordination-issues',
                  label: 'COORDINATION AND HANDOFF ISSUES',
                  level: 5,
                  children: [
                    { id: 'work-stuck', label: 'Work gets stuck between people/teams', level: 6, children: [] },
                    { id: 'miscommunication-who-does', label: 'Miscommunication on who does what', level: 6, children: [] },
                    { id: 'things-fall-through', label: 'Things fall through cracks', level: 6, children: [] },
                    { id: 'no-clear-ownership', label: 'No clear ownership', level: 6, children: [] },
                    { id: 'status-unclear', label: 'Status unclear', level: 6, children: [] },
                  ],
                },
              ],
            },
            {
              id: 'quality-problems',
              label: 'QUALITY PROBLEMS',
              level: 4,
              children: [
                {
                  id: 'inconsistent-delivery-quality',
                  label: 'INCONSISTENT DELIVERY',
                  level: 5,
                  children: [
                    { id: 'different-results', label: 'Different results each time', level: 6, children: [] },
                    { id: 'no-quality-standards', label: 'No quality standards or checklist', level: 6, children: [] },
                    { id: 'depends-who-does', label: 'Depends entirely on who does the work', level: 6, children: [] },
                    { id: 'no-review-qa', label: 'No review or QA process', level: 6, children: [] },
                    { id: 'wing-it', label: 'Wing it every time', level: 6, children: [] },
                  ],
                },
                {
                  id: 'mistakes-rework',
                  label: 'MISTAKES REQUIRING REWORK',
                  level: 5,
                  children: [
                    { id: 'errors-slip-through', label: 'Errors slip through to client', level: 6, children: [] },
                    { id: 'no-quality-control', label: 'No quality control or double-check', level: 6, children: [] },
                    { id: 'rushing-mistakes', label: 'Rushing causes careless mistakes', level: 6, children: [] },
                    { id: 'miscommunication-wrong-work', label: 'Miscommunication leads to wrong work', level: 6, children: [] },
                    { id: 'high-defect-rate', label: 'High defect rate', level: 6, children: [] },
                  ],
                },
                {
                  id: 'skills-gap',
                  label: 'SKILLS GAP IN TEAM',
                  level: 5,
                  children: [
                    { id: 'team-no-expertise', label: "Team doesn't have expertise needed", level: 6, children: [] },
                    { id: 'complex-beyond-capability', label: 'Complex work beyond current capability', level: 6, children: [] },
                    { id: 'need-specialists', label: "Need specialists we don't have", level: 6, children: [] },
                    { id: 'trying-not-good-at', label: "Trying to do things we're not good at", level: 6, children: [] },
                    { id: 'learning-on-job', label: 'Learning on the job (slow and risky)', level: 6, children: [] },
                  ],
                },
                {
                  id: 'client-dissatisfaction',
                  label: 'CLIENT DISSATISFACTION',
                  level: 5,
                  children: [
                    { id: 'not-meeting-expectations', label: 'Not meeting expectations', level: 6, children: [] },
                    { id: 'communication-breakdowns-quality', label: 'Communication breakdowns', level: 6, children: [] },
                    { id: 'missed-deadlines-quality', label: 'Missed deadlines', level: 6, children: [] },
                    { id: 'poor-results', label: 'Poor results or outcomes', level: 6, children: [] },
                    { id: 'complaints-issues', label: 'Complaints and issues', level: 6, children: [] },
                  ],
                },
              ],
            },
            {
              id: 'project-management-issues',
              label: 'PROJECT MANAGEMENT ISSUES',
              level: 4,
              children: [
                {
                  id: 'scope-creep-profit',
                  label: 'SCOPE CREEP EATS PROFIT',
                  level: 5,
                  children: [
                    { id: 'clients-ask-more', label: 'Clients keep asking for more', level: 6, children: [] },
                    { id: 'no-change-order-process', label: 'No change order process', level: 6, children: [] },
                    { id: 'original-scope-unclear', label: 'Original scope unclear or poorly defined', level: 6, children: [] },
                    { id: 'saying-yes-everything', label: 'Saying yes to everything', level: 6, children: [] },
                    { id: 'feature-creep', label: 'Feature creep', level: 6, children: [] },
                    { id: 'gold-plating', label: 'Gold plating (over-delivering)', level: 6, children: [] },
                  ],
                },
                {
                  id: 'timelines-slip',
                  label: 'TIMELINES SLIP',
                  level: 5,
                  children: [
                    { id: 'underestimate-time-pm', label: 'Underestimating time needed', level: 6, children: [] },
                    { id: 'unexpected-complications', label: 'Unexpected complications arise', level: 6, children: [] },
                    { id: 'dependencies-delays', label: 'Dependencies on others cause delays', level: 6, children: [] },
                    { id: 'client-delays-pm', label: 'Client delays in feedback/approvals', level: 6, children: [] },
                    { id: 'interruptions-switching', label: 'Interruptions and context switching', level: 6, children: [] },
                    { id: 'overcommitting', label: 'Overcommitting and overbooking', level: 6, children: [] },
                  ],
                },
                {
                  id: 'communication-breakdowns-pm',
                  label: 'COMMUNICATION BREAKDOWNS',
                  level: 5,
                  children: [
                    { id: 'expectations-misaligned', label: 'Client expectations misaligned with reality', level: 6, children: [] },
                    { id: 'internal-miscommunication', label: 'Internal miscommunication between team', level: 6, children: [] },
                    { id: 'assumptions-not-verified', label: 'Assumptions not verified', level: 6, children: [] },
                    { id: 'information-silos', label: "Information silos (people don't know what's happening)", level: 6, children: [] },
                    { id: 'no-communication-plan', label: 'No clear communication plan', level: 6, children: [] },
                    { id: 'updates-missing', label: 'Updates irregular or missing', level: 6, children: [] },
                  ],
                },
                {
                  id: 'resource-allocation-wrong',
                  label: 'RESOURCE ALLOCATION WRONG',
                  level: 5,
                  children: [
                    { id: 'wrong-people-projects', label: 'Wrong people assigned to wrong projects', level: 6, children: [] },
                    { id: 'overbooking', label: 'Overbooking team (burnout)', level: 6, children: [] },
                    { id: 'underbooking', label: 'Underbooking team (idle time wasted)', level: 6, children: [] },
                    { id: 'skill-mismatch-resource', label: 'Skills mismatch', level: 6, children: [] },
                    { id: 'priorities-unclear', label: 'Priorities unclear', level: 6, children: [] },
                    { id: 'firefighting', label: 'Firefighting instead of planning', level: 6, children: [] },
                  ],
                },
                {
                  id: 'no-project-tracking',
                  label: 'NO PROJECT TRACKING',
                  level: 5,
                  children: [
                    { id: 'dont-know-status', label: "Don't know status of projects", level: 6, children: [] },
                    { id: 'cant-see-bottlenecks', label: "Can't see bottlenecks", level: 6, children: [] },
                    { id: 'no-visibility-utilization', label: 'No visibility into utilization', level: 6, children: [] },
                    { id: 'surprises-end', label: 'Surprises at the end', level: 6, children: [] },
                    { id: 'budget-overruns', label: 'Budget overruns', level: 6, children: [] },
                  ],
                },
              ],
            },
            {
              id: 'client-management-issues',
              label: 'CLIENT MANAGEMENT ISSUES',
              level: 4,
              children: [
                {
                  id: 'difficult-clients',
                  label: 'DIFFICULT CLIENTS',
                  level: 5,
                  children: [
                    { id: 'unreasonable-expectations', label: 'Unreasonable expectations', level: 6, children: [] },
                    { id: 'constant-changes', label: 'Constant changes and indecision', level: 6, children: [] },
                    { id: 'poor-communication-client', label: 'Poor communication from their side', level: 6, children: [] },
                    { id: 'dont-respect-boundaries', label: "Don't respect boundaries", level: 6, children: [] },
                    { id: 'late-responsibilities', label: 'Late on their responsibilities', level: 6, children: [] },
                    { id: 'abusive', label: 'Abusive or disrespectful', level: 6, children: [] },
                  ],
                },
                {
                  id: 'wrong-clients',
                  label: 'WRONG CLIENTS',
                  level: 5,
                  children: [
                    { id: 'bad-fit-services', label: 'Bad fit for services', level: 6, children: [] },
                    { id: 'cant-afford-pricing', label: "Can't afford pricing", level: 6, children: [] },
                    { id: 'dont-value', label: "Don't value what we do", level: 6, children: [] },
                    { id: 'high-maintenance-low-profit', label: 'High maintenance, low profit', level: 6, children: [] },
                    { id: 'misaligned-values', label: 'Misaligned values or approach', level: 6, children: [] },
                  ],
                },
                {
                  id: 'no-client-boundaries',
                  label: 'NO CLIENT BOUNDARIES',
                  level: 5,
                  children: [
                    { id: 'available-24-7', label: 'Available 24/7', level: 6, children: [] },
                    { id: 'scope-creep-accepted', label: 'Scope creep accepted', level: 6, children: [] },
                    { id: 'allow-bad-behavior', label: 'Allow bad behavior', level: 6, children: [] },
                    { id: 'cant-say-no', label: "Can't say no", level: 6, children: [] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'personal-bottlenecks',
      label: 'PERSONAL/FOUNDER BOTTLENECKS',
      level: 2,
      children: [
        {
          id: 'time-trapped',
          label: 'TIME TRAPPED',
          level: 3,
          children: [
            {
              id: 'low-value-work',
              label: 'DOING LOW-VALUE WORK',
              level: 4,
              children: [
                { id: 'admin-busywork', label: 'Administrative tasks and busywork', level: 5, children: [] },
                { id: 'work-others-cheaper', label: 'Work others could do cheaper', level: 5, children: [] },
                { id: 'email-meeting-overload', label: 'Email and meeting overload', level: 5, children: [] },
                { id: 'busy-not-revenue', label: 'Busy work instead of revenue work', level: 5, children: [] },
                { id: 'firefighting-not-building', label: 'Firefighting instead of building', level: 5, children: [] },
              ],
            },
            {
              id: 'cant-delegate-founder',
              label: "CAN'T DELEGATE",
              level: 4,
              children: [
                { id: 'dont-trust-others', label: "Don't trust others to do it right", level: 5, children: [] },
                { id: 'easier-do-myself', label: '"Easier/faster to do it myself" mindset', level: 5, children: [] },
                { id: 'no-one-delegate', label: 'No one to delegate to', level: 5, children: [] },
                { id: 'dont-know-how-delegate', label: "Don't know how to delegate", level: 5, children: [] },
                { id: 'micromanagement', label: 'Micromanagement tendencies', level: 5, children: [] },
              ],
            },
            {
              id: 'no-processes-documented',
              label: 'NO DOCUMENTED PROCESSES',
              level: 4,
              children: [
                { id: 'everything-founders-head', label: "Everything in founder's head", level: 5, children: [] },
                { id: 'cant-hand-off', label: "Can't hand off work easily", level: 5, children: [] },
                { id: 'explain-every-time', label: 'Have to explain every single time', level: 5, children: [] },
                { id: 'knowledge-not-transferable', label: 'Knowledge not transferable', level: 5, children: [] },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export function getAllNodes(tree: TreeNode = rawTreeData, parentId?: string): TreeNode[] {
  const nodes: TreeNode[] = [];
  
  const traverse = (node: TreeNode, parent?: string) => {
    const nodeWithParent = { ...node, parent };
    nodes.push(nodeWithParent);
    
    node.children.forEach(child => traverse(child, node.id));
  };
  
  traverse(tree, parentId);
  return nodes;
}

export function getNodeById(id: string, tree: TreeNode = rawTreeData): TreeNode | null {
  if (tree.id === id) return tree;
  
  for (const child of tree.children) {
    const found = getNodeById(id, child);
    if (found) return found;
  }
  
  return null;
}

export function getChildrenIds(nodeId: string): string[] {
  const node = getNodeById(nodeId);
  if (!node) return [];
  
  return node.children.map(child => child.id);
}

export { rawTreeData };

