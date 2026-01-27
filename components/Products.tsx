import React from 'react';
import { Link } from 'react-router-dom';
import SpotlightCard from './SpotlightCard';
import SEO from './SEO';

const Products: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#020202] w-full relative overflow-hidden">
            <SEO
                title="Web Design Services & Digital Marketing | Creative Code"
                description="Professional web design, Meta advertising, AI automation, and voice agents. Complete digital marketing solutions for business growth."
                canonical="https://creativecodeca.com/products"
                keywords="web design services, website design, Meta advertising, Facebook ads, Google ads, AI automation, chatbot development, voice AI, digital marketing services, CRM automation"
            />
            <section className="py-20 px-6 relative pt-32 min-h-screen">
                {/* Background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)]"></div>
                </div>

                <div className="max-w-7xl mx-auto space-y-24 relative z-10 pb-20">

                    {/* Header Section */}
                    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-20">
                        <h1 className="md:text-8xl leading-tight md:leading-[1.1] text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-8">
                            Products & Services
                        </h1>
                        <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
                            Everything you need to scale your business in the digital age.
                        </p>
                    </div>

                    {/* Section 1: Websites */}
                    <div id="websites" className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="order-2 md:order-1 relative group">
                            <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <SpotlightCard className="transform transition-transform duration-500 hover:scale-[1.02]">
                                <div className="relative bg-[#0a0a0a] rounded-xl overflow-hidden aspect-[4/3] flex flex-col">
                                    {/* Browser Header */}
                                    <div className="h-8 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                                    </div>
                                    {/* Browser Content */}
                                    <div className="flex-1 p-6 relative">
                                        {/* Skeleton UI */}
                                        <div className="flex justify-between items-center mb-8">
                                            <div className="w-24 h-6 bg-white/10 rounded"></div>
                                            <div className="flex gap-4">
                                                <div className="w-12 h-4 bg-white/5 rounded"></div>
                                                <div className="w-12 h-4 bg-white/5 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="w-2/3 h-8 bg-white/10 rounded mb-4"></div>
                                        <div className="w-1/2 h-8 bg-white/10 rounded mb-8"></div>
                                        <div className="grid grid-cols-3 gap-4 mt-12">
                                            <div className="h-24 bg-white/5 rounded border border-white/5"></div>
                                            <div className="h-24 bg-white/5 rounded border border-white/5"></div>
                                            <div className="h-24 bg-white/5 rounded border border-white/5"></div>
                                        </div>
                                        {/* Conversion Badge */}
                                        <div className="absolute bottom-6 right-6 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg animate-float">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                                            +42% Conversions
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line><line x1="9" x2="9" y1="21" y2="9"></line></svg>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">High-Performance Websites</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Your website shouldn't just look good—it should be your best salesperson. We build stunning, ultra-fast digital experiences designed specifically to turn visitors into paying customers.
                            </p>
                            <ul className="mt-8 space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Lightning fast load times
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Mobile-optimized design
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-300">
                                    <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Built for search engine ranking (SEO)
                                </li>
                            </ul>
                            <div className="flex gap-4 flex-wrap">
                                <Link to="/services/website" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                                    View Pricing
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                </Link>
                                <Link to="/services/website/examples" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105">
                                    See Examples
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Meta Advertising */}
                    <div id="advertising" className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="">
                            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6 text-pink-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">Meta Advertising</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Stop wasting money on ads that don't work. We use data-driven strategies on Facebook and Instagram to put your offer in front of the exact people ready to buy right now.
                            </p>
                            <div className="mt-8 flex gap-4 mb-8">
                                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-center">
                                    <div className="text-2xl font-medium text-white">4.5x</div>
                                    <div className="text-[10px] uppercase tracking-wider text-slate-500">Avg. ROI</div>
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-center">
                                    <div className="text-2xl font-medium text-white">$12</div>
                                    <div className="text-[10px] uppercase tracking-wider text-slate-500">Cost Per Lead</div>
                                </div>
                            </div>
                            <div className="flex gap-4 flex-wrap">
                                <Link to="/services/meta-ads" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                                    View Pricing
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                </Link>
                                <Link to="/services/meta-ads/examples" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105">
                                    See Examples
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </Link>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-pink-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <SpotlightCard>
                                <div className="relative bg-[#0a0a0a] rounded-xl p-8 aspect-[4/3] flex flex-col justify-end">
                                    {/* Chart Visual */}
                                    <div className="flex items-end justify-between gap-3 h-48 w-full">
                                        <div className="w-full bg-neutral-800/50 rounded-t-sm h-[30%] group-hover:bg-neutral-800 transition-colors"></div>
                                        <div className="w-full bg-neutral-800/50 rounded-t-sm h-[50%] group-hover:bg-neutral-800 transition-colors"></div>
                                        <div className="w-full bg-neutral-800/50 rounded-t-sm h-[40%] group-hover:bg-neutral-800 transition-colors"></div>
                                        <div className="w-full bg-neutral-800/50 rounded-t-sm h-[60%] group-hover:bg-neutral-800 transition-colors"></div>
                                        <div className="w-full bg-neutral-800/50 rounded-t-sm h-[45%] group-hover:bg-neutral-800 transition-colors"></div>
                                        {/* Growth Bar */}
                                        <div className="w-full relative h-[85%]">
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pink-900 to-pink-500 rounded-t-sm h-full shadow-[0_0_20px_rgba(236,72,153,0.3)]"></div>
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-xs py-1 px-2 rounded border border-white/10 whitespace-nowrap">
                                                Record Sales
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-slate-600 mt-4 font-mono">
                                        <span>Q1</span>
                                        <span>Q2</span>
                                        <span>Q3</span>
                                        <span>Q4 (Projected)</span>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>
                    </div>

                    {/* Section 3: AI Automation */}
                    <div id="automation" className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="order-2 md:order-1 relative group">
                            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <SpotlightCard>
                                <div className="relative bg-[#0a0a0a] rounded-xl p-6 sm:p-8 min-h-[400px] sm:min-h-0 sm:aspect-[4/3] flex items-center justify-center overflow-hidden">
                                    {/* Flow Diagram */}
                                    <div className="relative z-10 w-full max-w-sm">
                                        <div className="flex flex-col gap-6 sm:gap-8 items-center">
                                            {/* Top Node */}
                                            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-800 rounded-lg border border-white/10 w-full">
                                                <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                                </div>
                                                <div className="text-sm text-white">New Lead (Email)</div>
                                            </div>

                                            {/* Connector */}
                                            <div className="h-8 w-0.5 bg-slate-700 relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-1/2 bg-emerald-500 animate-[scan_1.5s_linear_infinite]"></div>
                                            </div>

                                            {/* Middle Node (AI) */}
                                            <div className="flex items-center gap-3 px-4 py-3 bg-neutral-800 rounded-lg border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] w-full">
                                                <div className="w-8 h-8 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=""><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" className=""></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                                                </div>
                                                <div className="text-sm text-white flex-1">AI Qualifies &amp; Replies</div>
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                            </div>

                                            {/* Connector */}
                                            <div className="h-8 w-0.5 bg-slate-700 relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-1/2 bg-emerald-500 animate-[scan_1.5s_linear_infinite_0.5s]"></div>
                                            </div>

                                            {/* Bottom Nodes (Split) */}
                                            <div className="grid grid-cols-2 gap-4 w-full">
                                                <div className="px-3 py-2 bg-neutral-800 rounded border border-white/5 text-xs text-slate-400 text-center">Add to CRM</div>
                                                <div className="px-3 py-2 bg-neutral-800 rounded border border-white/5 text-xs text-slate-400 text-center">Slack Alert</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">Internal Automation</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Eliminate repetitive busywork. We build "invisible" systems that connect your apps (email, CRM, spreadsheets) to automatically process data, so you can focus on strategy, not copy-pasting.
                            </p>
                            <div className="mt-6 space-y-2 mb-8">
                                <p className="text-sm text-slate-500">Common workflows we automate:</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300 border border-white/5">Invoice Generation</span>
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300 border border-white/5">Lead Qualification</span>
                                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-300 border border-white/5">Onboarding</span>
                                </div>
                            </div>
                            <div className="flex gap-4 flex-wrap">
                                <Link to="/services/automation" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                                    View Pricing
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                </Link>
                                <Link to="/services/automation/examples" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105">
                                    See Examples
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: AI Agents */}
                    <div id="agents" className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 tracking-tight">AI Voice &amp; Text Agents</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Clone your best support rep or sales agent. Our AI agents live on your website or phone line, answering questions, booking appointments, and closing deals 24/7—instantly and accurately.
                            </p>
                            <div className="mt-8 grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-amber-500/20 p-1 rounded text-amber-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-medium">Voice Agents</h4>
                                        <p className="text-slate-500 text-xs mt-1">Handles inbound calls &amp; outbound appointment setting.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 bg-amber-500/20 p-1 rounded text-amber-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                                    </div>
                                    <div className="">
                                        <h4 className="text-white text-sm font-medium">Chat Agents</h4>
                                        <p className="text-slate-500 text-xs mt-1">Instant website support and lead capture.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 flex-wrap">
                                <Link to="/services/voice-ai" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                                    View Pricing
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                </Link>
                                <Link to="/services/voice-ai/examples" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition-all hover:scale-105">
                                    See Examples
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </Link>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-amber-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <SpotlightCard>
                                <div className="relative bg-[#0a0a0a] rounded-xl p-8 aspect-[4/3] flex flex-col justify-end">
                                    {/* Chat Interface */}
                                    <div className="space-y-4 w-full">
                                        {/* Message 1 (User) */}
                                        <div className="flex justify-end animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-forwards">
                                            <div className="bg-neutral-800 text-slate-200 text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                                                Does this integrate with my calendar?
                                            </div>
                                        </div>

                                        {/* Typing Indicator */}
                                        <div className="flex items-center gap-1 ml-1 h-4 w-fit">
                                            <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce"></span>
                                            <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                                            <span className="w-1 h-1 bg-slate-500 rounded-full animate-bounce delay-200"></span>
                                        </div>

                                        {/* Message 2 (AI) */}
                                        <div className="flex justify-start items-end gap-2 animate-in fade-in slide-in-from-bottom-3 duration-500 delay-300 fill-mode-forwards" style={{ animationFillMode: 'backwards' }}>
                                            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
                                            </div>
                                            <div className="bg-amber-500/10 border border-amber-500/20 text-white text-sm px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] shadow-lg">
                                                Yes! I can see your availability. Would you like to book a demo for Tuesday at 2 PM?
                                            </div>
                                        </div>

                                        {/* Message 3 (User) */}
                                        <div className="flex justify-end animate-in fade-in slide-in-from-bottom-3 duration-500 delay-700 fill-mode-forwards" style={{ animationFillMode: 'backwards' }}>
                                            <div className="bg-white text-black text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%] font-medium">
                                                Perfect, let's do it.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </div>
                    </div>
                </div>

                {/* SEO Content Block */}
                <div className="mt-32 max-w-5xl mx-auto border-t border-white/10 pt-20">
                    <h2 className="text-3xl md:text-5xl font-medium text-white mb-10 text-center">
                        Comprehensive Digital Solutions for Modern Businesses
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 leading-relaxed">
                        <div className="space-y-6">
                            <p>
                                At Creative Code, we understand that a fragmented approach to digital marketing leads to fragmented results. That's why we offer a holistic suite of services designed to work in perfect harmony. Our <strong>custom web development</strong> ensures your foundation is rock-solid, fast, and secure, while our <strong>advanced SEO strategies</strong> drive organic traffic that actually converts.
                            </p>
                            <p>
                                We go beyond basic aesthetics. Our <strong>web design services</strong> focus on user experience (UX) and conversion rate optimization (CRO), ensuring every pixel serves a purpose. By integrating <strong>marketing automation tools</strong> and CRM systems, we help you nurture leads automatically, ensuring no opportunity slips through the cracks.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <p>
                                The future of business is automated. Our <strong>AI automation services</strong> allow you to scale your operations without increasing headcount. From <strong>intelligent chatbots</strong> that handle customer inquiries instantly to <strong>voice AI agents</strong> that can manage appointment bookings, we implement technology that gives you a competitive edge.
                            </p>
                            <p>
                                Combined with our precision-targeted <strong>paid advertising campaigns</strong> on platforms like Facebook, Instagram, and Google, we create a predictable revenue engine for your business. Choose Creative Code for a partner who is as invested in your growth as you are.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;