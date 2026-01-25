import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Clock, RefreshCw, Workflow, Database, MessageSquare } from 'lucide-react';
import SEO from './SEO';

const AutomationServices: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
            <SEO
                title="Business Automation Services | AI-Powered Workflow Automation"
                description="Professional business automation services. Eliminate repetitive tasks and scale your operations with custom workflow automation."
                canonical="https://creativecodeca.com/services/automation"
                keywords="business automation, workflow automation, process automation, CRM automation, email automation"
            />
            
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Business Automation
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 font-light tracking-wide">
                            ELIMINATE BUSYWORK, SCALE SMARTER
                        </p>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="py-12 px-6 border-y border-white/10">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">40+</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Hours Saved/Week</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Error Reduction</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">3x</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Faster Processing</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Always Working</div>
                        </div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Basic Automation */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col relative group hover:border-white/20 transition-colors">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Basic Automation</h3>
                                <p className="text-slate-400 text-sm">Essential workflow automation</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$2,000</span>
                                    <span className="text-slate-500 text-sm">/month</span>
                                </div>
                                <div className="text-emerald-400 font-medium mt-2 text-sm">Setup included</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>3 workflow automations</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Email & CRM integrations</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Basic data sync (2 apps)</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Monthly maintenance & updates</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Email support</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Documentation & training</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <Link to="/contact#booking" className="block w-full py-4 bg-white/10 hover:bg-white/20 text-white text-center rounded-xl font-medium transition-colors border border-white/5">
                                    Book a Call
                                </Link>
                            </div>
                        </div>

                        {/* Business Automation */}
                        <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-3xl p-8 flex flex-col relative group shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:border-emerald-500/50 transition-colors">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Business Automation</h3>
                                <p className="text-slate-400 text-sm">Comprehensive automation suite</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$4,000</span>
                                    <span className="text-slate-500 text-sm">/month</span>
                                </div>
                                <div className="text-emerald-400 font-medium mt-2 text-sm">Full setup & migration</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>10 workflow automations</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Advanced integrations (Slack, Shopify, etc.)</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Multi-app data sync (5+ apps)</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Custom API connections</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Weekly optimization & monitoring</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Automated reporting dashboards</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Dedicated automation specialist</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Priority support (Slack/Email)</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <Link to="/contact#booking" className="block w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-center rounded-xl font-medium transition-colors shadow-lg">
                                    Book a Call
                                </Link>
                            </div>
                        </div>

                        {/* Enterprise Automation */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col relative group hover:border-white/20 transition-colors">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Enterprise Automation</h3>
                                <p className="text-slate-400 text-sm">Full-scale automation system</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">Custom</span>
                                </div>
                                <div className="text-emerald-400 font-medium mt-2 text-sm">Tailored to your needs</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Unlimited workflow automations</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Enterprise integrations (unlimited)</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Custom software development</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Advanced AI & machine learning</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>Dedicated automation engineer</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>24/7 monitoring & maintenance</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>SLA guarantees</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                    <span>White-glove onboarding</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <Link to="/contact#booking" className="block w-full py-4 bg-white/10 hover:bg-white/20 text-white text-center rounded-xl font-medium transition-colors border border-white/5">
                                    Book a Call
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-6 border-t border-white/10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">
                                What We Automate
                            </h2>
                            <p className="text-slate-400 text-lg">
                                From simple tasks to complex workflows
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                                    <Workflow className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Lead Management</h3>
                                <p className="text-sm text-slate-400">
                                    Automatically capture, qualify, and route leads to the right team members with intelligent scoring.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                                    <Database className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Data Synchronization</h3>
                                <p className="text-sm text-slate-400">
                                    Keep your CRM, spreadsheets, and databases in perfect sync across all platforms.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                                    <MessageSquare className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Email & Communication</h3>
                                <p className="text-sm text-slate-400">
                                    Automate follow-ups, notifications, and customer communication sequences.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                                    <Clock className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Scheduling & Booking</h3>
                                <p className="text-sm text-slate-400">
                                    Streamline appointment booking, calendar management, and reminder systems.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                                    <RefreshCw className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Invoicing & Billing</h3>
                                <p className="text-sm text-slate-400">
                                    Generate invoices, process payments, and manage billing cycles automatically.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Custom Workflows</h3>
                                <p className="text-sm text-slate-400">
                                    Build unique automation tailored to your specific business processes and needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-emerald-900/20 to-green-900/20 border border-emerald-500/20 rounded-2xl p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Automate Your Business?
                            </h2>
                            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                                Let's identify the repetitive tasks holding you back and build custom automation that works around the clock.
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
                                    to="/services/automation/examples"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105"
                                >
                                    View Examples
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AutomationServices;
