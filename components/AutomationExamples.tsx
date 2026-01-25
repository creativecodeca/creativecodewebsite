import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Users, FileText, ShoppingCart, Package, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import SEO from './SEO';

const AutomationExamples: React.FC = () => {
    const examples = [
        {
            id: 'lead-qualification',
            title: 'Lead Qualification Bot',
            description: 'Automatically scores, qualifies, and routes incoming leads based on custom criteria and behavior patterns.',
            icon: Users,
            color: 'from-blue-500 to-cyan-500',
            workflow: [
                'Lead submits form on website',
                'AI analyzes form data & scores lead',
                'Checks company size, budget, timeline',
                'Routes to appropriate sales rep',
                'Sends personalized follow-up email',
                'Creates CRM entry with notes'
            ],
            results: {
                timeSaved: '18 hours/week',
                improvement: '58% faster response',
                roi: '$8,500/month saved'
            }
        },
        {
            id: 'invoice-generation',
            title: 'Invoice Generation System',
            description: 'From quote approval to payment processing, handle the entire billing cycle without manual intervention.',
            icon: FileText,
            color: 'from-purple-500 to-pink-500',
            workflow: [
                'Client approves quote',
                'System generates invoice automatically',
                'Sends invoice via email',
                'Tracks payment status',
                'Sends reminder emails',
                'Updates accounting software'
            ],
            results: {
                timeSaved: '12 hours/week',
                improvement: '88% error reduction',
                roi: '$6,200/month saved'
            }
        },
        {
            id: 'customer-onboarding',
            title: 'Customer Onboarding Flow',
            description: 'Seamless automated welcome sequence that guides new customers through setup and engagement.',
            icon: Users,
            color: 'from-green-500 to-emerald-500',
            workflow: [
                'New customer signs up',
                'Sends welcome email series',
                'Creates accounts in all systems',
                'Schedules onboarding call',
                'Delivers training materials',
                'Assigns customer success manager'
            ],
            results: {
                timeSaved: '10 hours/week',
                improvement: '65% better retention',
                roi: '$9,500/month value'
            }
        },
        {
            id: 'inventory-management',
            title: 'Inventory Management',
            description: 'Smart inventory tracking with automatic reordering and supplier notifications based on sales velocity.',
            icon: Package,
            color: 'from-orange-500 to-red-500',
            workflow: [
                'Monitors inventory levels 24/7',
                'Predicts reorder points',
                'Generates purchase orders',
                'Sends to suppliers automatically',
                'Tracks shipment status',
                'Updates inventory system'
            ],
            results: {
                timeSaved: '15 hours/week',
                improvement: '78% stockout reduction',
                roi: '$11,500/month saved'
            }
        },
        {
            id: 'social-media',
            title: 'Social Media Scheduler',
            description: 'Complete content pipeline from creation to publishing across all platforms with performance tracking.',
            icon: Share2,
            color: 'from-indigo-500 to-purple-500',
            workflow: [
                'Content team creates posts',
                'System formats for each platform',
                'Schedules optimal posting times',
                'Publishes across channels',
                'Monitors engagement metrics',
                'Compiles performance reports'
            ],
            results: {
                timeSaved: '12 hours/week',
                improvement: '2.1x engagement increase',
                roi: '$6,800/month value'
            }
        }
    ];

    return (
        <div className="min-h-screen bg-[#020202] text-white">
            <SEO
                title="Business Automation Examples | Workflow Automation Case Studies"
                description="Explore real automation workflows that save 15-25 hours per week. See how businesses eliminate repetitive tasks and scale operations."
                canonical="https://creativecodeca.com/services/automation/examples"
            />
            
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 text-center">
                    <div className="max-w-5xl mx-auto">
                        <Link
                            to="/services/automation"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm">Back to Pricing</span>
                        </Link>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                                Automation Examples
                            </h1>
                            <p className="text-xl text-slate-400 mb-4 font-light">
                                See what's possible with intelligent automation
                            </p>
                            <p className="text-slate-500 max-w-2xl mx-auto">
                                From lead management to inventory control, these workflows run 24/7 to eliminate busywork and scale your operations.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Examples */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto space-y-16">
                        {examples.map((example, index) => {
                            const Icon = example.icon;
                            return (
                                <motion.div
                                    key={example.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <SpotlightCard>
                                        <div className="bg-[#0a0a0a] rounded-2xl p-8 md:p-12">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                {/* Left: Overview */}
                                                <div className="space-y-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${example.color} p-3 shrink-0`}>
                                                            <Icon className="w-full h-full text-white" />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                                                {example.title}
                                                            </h2>
                                                            <p className="text-slate-400 leading-relaxed">
                                                                {example.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-semibold text-emerald-400 mb-4">
                                                            Automated Workflow
                                                        </h3>
                                                        <div className="space-y-3">
                                                            {example.workflow.map((step, idx) => (
                                                                <div key={idx} className="flex gap-4 items-start">
                                                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 mt-0.5">
                                                                        {idx + 1}
                                                                    </div>
                                                                    <p className="text-slate-300 text-sm leading-relaxed">
                                                                        {step}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Results & Visual */}
                                                <div className="space-y-6">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white mb-4">
                                                            Impact & Results
                                                        </h3>
                                                        
                                                        <div className="space-y-4">
                                                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                                                <div className="text-2xl font-bold text-white mb-1">
                                                                    {example.results.timeSaved}
                                                                </div>
                                                                <div className="text-sm text-slate-400">
                                                                    Time Saved Per Week
                                                                </div>
                                                            </div>

                                                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                                                <div className={`text-2xl font-bold bg-gradient-to-r ${example.color} bg-clip-text text-transparent mb-1`}>
                                                                    {example.results.improvement}
                                                                </div>
                                                                <div className="text-sm text-slate-400">
                                                                    Process Improvement
                                                                </div>
                                                            </div>

                                                            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                                                <div className="text-2xl font-bold text-white mb-1">
                                                                    {example.results.roi}
                                                                </div>
                                                                <div className="text-sm text-slate-400">
                                                                    Value Generated
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Flow Visualization */}
                                                    <div className="bg-black/40 rounded-xl p-6 border border-white/5">
                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                                                <div className="flex-1 h-2 bg-gradient-to-r from-blue-400/40 to-transparent rounded"></div>
                                                            </div>
                                                            <div className="flex items-center gap-3 pl-6">
                                                                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                                                                <div className="flex-1 h-2 bg-gradient-to-r from-purple-400/40 to-transparent rounded"></div>
                                                            </div>
                                                            <div className="flex items-center gap-3 pl-12">
                                                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${example.color}`}></div>
                                                                <div className={`flex-1 h-2 bg-gradient-to-r ${example.color} opacity-40 rounded`}></div>
                                                            </div>
                                                            <div className="flex items-center gap-3 pl-6">
                                                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                                                <div className="flex-1 h-2 bg-gradient-to-r from-green-400/40 to-transparent rounded"></div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-4 h-4 rounded bg-emerald-500 flex items-center justify-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                                    </svg>
                                                                </div>
                                                                <span className="text-xs text-emerald-400 font-medium">Automated & Complete</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-gradient-to-br from-emerald-900/20 to-green-900/20 border border-emerald-500/20 rounded-2xl p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Automate Your Workflows?
                            </h2>
                            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                                Let's identify the repetitive tasks in your business and build custom automation that saves time and money.
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <Link
                                    to="/contact#booking"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                >
                                    Schedule Free Consultation
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/services/automation"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105"
                                >
                                    View Pricing
                                </Link>
                            </div>
                            <p className="text-xs text-slate-500 mt-6 max-w-xl mx-auto">
                                Results are illustrative examples. Actual time and cost savings depend on your specific workflows and business size.
                            </p>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default AutomationExamples;
