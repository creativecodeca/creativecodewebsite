import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Phone, MessageCircle, Clock, Users, Headphones, Zap } from 'lucide-react';
import SEO from './SEO';

const VoiceAIServices: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-amber-500/30">
            <SEO
                title="AI Voice & Chat Agents | 24/7 AI Receptionist Services"
                description="Professional AI voice agents and chatbots. 24/7 customer support, appointment booking, and lead qualification powered by advanced AI."
                canonical="https://creativecodeca.com/services/voice-ai"
                keywords="AI voice agent, AI receptionist, chatbot, voice AI, conversational AI, automated customer service"
            />
            
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            AI Voice & Chat Agents
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 font-light tracking-wide">
                            YOUR 24/7 AI-POWERED TEAM
                        </p>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="py-12 px-6 border-y border-white/10">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Always Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">&lt;3s</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Response Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Accuracy Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">70%</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Cost Reduction</div>
                        </div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Voice Receptionist */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col relative group hover:border-white/20 transition-colors">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Voice Receptionist</h3>
                                <p className="text-slate-400 text-sm">AI phone answering system</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$500</span>
                                    <span className="text-slate-500 text-sm">/month</span>
                                </div>
                                <div className="text-amber-400 font-medium mt-2 text-sm">500 calls included</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>24/7 call answering</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Appointment booking & scheduling</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Basic FAQ answering</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Call transcripts & recordings</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Email notifications</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Custom voice & personality</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="text-xs text-slate-500 text-center">
                                    Additional calls: $0.15 each
                                </div>
                                <Link to="/contact#booking" className="block w-full py-4 bg-white/10 hover:bg-white/20 text-white text-center rounded-xl font-medium transition-colors border border-white/5">
                                    Book a Call
                                </Link>
                            </div>
                        </div>

                        {/* AI Sales Agent */}
                        <div className="bg-[#0a0a0a] border border-amber-500/30 rounded-3xl p-8 flex flex-col relative group shadow-[0_0_40px_rgba(245,158,11,0.1)] hover:border-amber-500/50 transition-colors">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">AI Sales Agent</h3>
                                <p className="text-slate-400 text-sm">Voice + chat capabilities</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$1,500</span>
                                    <span className="text-slate-500 text-sm">/month</span>
                                </div>
                                <div className="text-amber-400 font-medium mt-2 text-sm">2,000 interactions included</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Outbound calling capabilities</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Lead qualification & scoring</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Website chat widget</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>SMS & messaging integration</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>CRM integration (HubSpot, Salesforce)</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Advanced analytics dashboard</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Multi-language support</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Priority support</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="text-xs text-slate-500 text-center">
                                    Additional interactions: $0.10 each
                                </div>
                                <Link to="/contact#booking" className="block w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-center rounded-xl font-medium transition-colors shadow-lg">
                                    Book a Call
                                </Link>
                            </div>
                        </div>

                        {/* Enterprise AI */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col relative group hover:border-white/20 transition-colors">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Enterprise AI</h3>
                                <p className="text-slate-400 text-sm">Custom AI team solution</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">Custom</span>
                                </div>
                                <div className="text-amber-400 font-medium mt-2 text-sm">Unlimited interactions</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Multiple AI agents (sales, support, etc.)</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Custom voice training & cloning</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Enterprise CRM integration</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Advanced AI training on your data</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Custom integrations & workflows</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>Dedicated AI engineer</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>24/7 monitoring & support</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>White-label options</span>
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
                                Why Choose AI Agents?
                            </h2>
                            <p className="text-slate-400 text-lg">
                                Human-like interactions at machine speed and scale
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-amber-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                                    <Clock className="w-6 h-6 text-amber-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Always Available</h3>
                                <p className="text-sm text-slate-400">
                                    Never miss a call or chat. AI agents work 24/7/365 without breaks, holidays, or sick days.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-amber-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-amber-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Unlimited Scale</h3>
                                <p className="text-sm text-slate-400">
                                    Handle thousands of conversations simultaneously without quality degradation or wait times.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-amber-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-amber-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Instant Response</h3>
                                <p className="text-sm text-slate-400">
                                    Respond to customers in under 3 seconds, improving satisfaction and conversion rates.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-amber-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                                    <Phone className="w-6 h-6 text-amber-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Natural Conversations</h3>
                                <p className="text-sm text-slate-400">
                                    Advanced AI that understands context, emotion, and intent for truly human-like interactions.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-amber-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                                    <MessageCircle className="w-6 h-6 text-amber-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Multi-Channel</h3>
                                <p className="text-sm text-slate-400">
                                    Deploy across phone, chat, SMS, and social media with consistent quality everywhere.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-amber-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                                    <Headphones className="w-6 h-6 text-amber-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Seamless Handoff</h3>
                                <p className="text-sm text-slate-400">
                                    Automatically transfer complex issues to human agents with full context and conversation history.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border border-amber-500/20 rounded-2xl p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Deploy AI Agents?
                            </h2>
                            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                                Let's discuss how AI voice and chat agents can transform your customer interactions and drive growth.
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
                                    to="/services/voice-ai/examples"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105"
                                >
                                    View Case Studies
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default VoiceAIServices;
