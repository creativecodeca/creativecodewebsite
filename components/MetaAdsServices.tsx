import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Target, TrendingUp, BarChart3, Users, Zap, Shield } from 'lucide-react';
import SEO from './SEO';

const MetaAdsServices: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-pink-500/30">
            <SEO
                title="Meta Advertising Services | Facebook & Instagram Ads"
                description="Professional Meta advertising management. Data-driven Facebook and Instagram ad campaigns that deliver measurable ROI."
                canonical="https://creativecodeca.com/services/meta-ads"
                keywords="meta advertising, facebook ads, instagram ads, social media advertising, paid social, ad management"
            />
            
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Meta Advertising
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 font-light tracking-wide">
                            FACEBOOK & INSTAGRAM AD MANAGEMENT
                        </p>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="py-12 px-6 border-y border-white/10">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">3.2x</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Average ROAS</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">$18</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Avg Cost Per Lead</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">$1.2M+</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Ad Spend Managed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">89%</div>
                            <div className="text-sm text-slate-500 uppercase tracking-wider">Client Satisfaction</div>
                        </div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Starter Package */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col relative group hover:border-pink-500/30 hover:bg-[#0d0d0d] transition-all duration-300 hover:scale-[1.02]">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Starter Package</h3>
                                <p className="text-slate-400 text-sm">Perfect for testing the waters</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$1,500</span>
                                    <span className="text-slate-500 text-sm">/month</span>
                                </div>
                                <div className="text-pink-400 font-medium mt-2 text-sm">+ ad spend budget • 3-month minimum</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Manage up to $3,000/month ad spend</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>2 campaign setups (Facebook & Instagram)</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Monthly performance reporting</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Basic creative testing (2 variants)</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Audience research & targeting</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Email support</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <Link to="/contact#booking" className="block w-full py-4 bg-white/10 hover:bg-white/20 text-white text-center rounded-xl font-medium transition-colors border border-white/5">
                                    Book a Call
                                </Link>
                            </div>
                        </div>

                        {/* Growth Package */}
                        <div className="bg-[#0a0a0a] border border-pink-500/30 rounded-3xl p-8 flex flex-col relative group shadow-[0_0_40px_rgba(236,72,153,0.1)] hover:border-pink-500/50 hover:bg-[#0d0d0d] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(236,72,153,0.2)]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                Most Popular
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Growth Package</h3>
                                <p className="text-slate-400 text-sm">For scaling businesses</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$3,000</span>
                                    <span className="text-slate-500 text-sm">/month</span>
                                </div>
                                <div className="text-pink-400 font-medium mt-2 text-sm">+ ad spend budget • 3-month minimum</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Manage up to $10,000/month ad spend</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>5 campaign setups across platforms</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Weekly optimization & reporting</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Advanced A/B testing (5+ variants)</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Custom audience creation & lookalikes</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Conversion tracking & pixel setup</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Dedicated account manager</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Priority support (Slack/Email)</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <Link to="/contact#booking" className="group/btn block w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-center rounded-xl font-medium transition-all shadow-lg hover:shadow-pink-500/50 hover:scale-[1.02] flex items-center justify-center gap-2">
                                    <span>Book a Call</span>
                                    <ArrowRight className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                </Link>
                            </div>
                        </div>

                        {/* Scale Package */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col relative group hover:border-pink-500/30 hover:bg-[#0d0d0d] transition-all duration-300 hover:scale-[1.02]">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Scale Package</h3>
                                <p className="text-slate-400 text-sm">Enterprise-level campaigns</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">Custom</span>
                                </div>
                                <div className="text-pink-400 font-medium mt-2 text-sm">Let's talk about your needs</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Unlimited ad spend management</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Unlimited campaigns & platforms</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Daily optimization & analysis</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Advanced pixel tracking & attribution</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Full funnel optimization</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Creative production assistance</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>Dedicated growth team</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-pink-500 shrink-0" />
                                    <span>24/7 priority support</span>
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
                                What's Included
                            </h2>
                            <p className="text-slate-400 text-lg">
                                Everything you need to dominate on Meta platforms
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-pink-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                                    <Target className="w-6 h-6 text-pink-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Precision Targeting</h3>
                                <p className="text-sm text-slate-400">
                                    Reach your ideal customers with laser-focused audience targeting based on demographics, interests, and behaviors.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-pink-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                                    <TrendingUp className="w-6 h-6 text-pink-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Continuous Optimization</h3>
                                <p className="text-sm text-slate-400">
                                    We monitor and adjust campaigns daily to maximize ROI and minimize wasted ad spend.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-pink-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                                    <BarChart3 className="w-6 h-6 text-pink-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Transparent Reporting</h3>
                                <p className="text-sm text-slate-400">
                                    Clear, actionable insights delivered regularly so you always know how your campaigns are performing.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-pink-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-pink-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Audience Building</h3>
                                <p className="text-sm text-slate-400">
                                    Create custom and lookalike audiences to expand your reach while maintaining quality leads.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-pink-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-pink-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Rapid Testing</h3>
                                <p className="text-sm text-slate-400">
                                    A/B test creatives, copy, and targeting to quickly identify winning combinations.
                                </p>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-pink-500/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-pink-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Ad Account Protection</h3>
                                <p className="text-sm text-slate-400">
                                    Stay compliant with Meta's policies to avoid costly account suspensions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-pink-900/20 to-rose-900/20 border border-pink-500/20 rounded-2xl p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Scale Your Business?
                            </h2>
                            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                                Book a free strategy call and let's discuss how we can turn your Meta ads into a predictable revenue engine.
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
                                    to="/services/meta-ads/examples"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105"
                                >
                                    View Case Studies
                                </Link>
                            </div>
                            <p className="text-xs text-slate-500 mt-6 max-w-xl mx-auto">
                                Results vary by industry, competition, and ad spend. All packages require a 3-month minimum commitment.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MetaAdsServices;
