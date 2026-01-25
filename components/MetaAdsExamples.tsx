import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import SEO from './SEO';

const MetaAdsExamples: React.FC = () => {
    const caseStudies = [
        {
            id: 'hvac',
            industry: 'Local HVAC Company',
            location: 'Phoenix, AZ',
            challenge: 'Seasonal business struggling to generate leads during off-peak months with inconsistent marketing efforts.',
            strategy: 'Implemented year-round lead generation campaigns targeting homeowners with aging HVAC systems, using local radius targeting and seasonal messaging.',
            results: {
                roas: '427%',
                costPerLead: '$18',
                leadIncrease: '312%',
                timeframe: '6 months'
            },
            color: 'from-orange-500 to-red-500',
            icon: TrendingUp
        },
        {
            id: 'ecommerce',
            industry: 'E-commerce Fashion Brand',
            location: 'Online',
            challenge: 'High cart abandonment rates and difficulty scaling beyond initial customer base.',
            strategy: 'Created retargeting campaigns for cart abandoners, built lookalike audiences from best customers, and implemented dynamic product ads.',
            results: {
                roas: '5.8x',
                costPerLead: '$8.50',
                leadIncrease: '280%',
                timeframe: '4 months'
            },
            color: 'from-purple-500 to-pink-500',
            icon: DollarSign
        },
        {
            id: 'dental',
            industry: 'Dental Practice',
            location: 'Toronto, ON',
            challenge: 'New practice needed to build patient base quickly in competitive market.',
            strategy: 'Targeted local families with children and adults 25-55, highlighting same-day appointments and modern technology. Used video testimonials and before/after imagery.',
            results: {
                roas: '620%',
                costPerLead: '$24',
                leadIncrease: '450%',
                timeframe: '3 months'
            },
            color: 'from-blue-500 to-cyan-500',
            icon: Users
        },
        {
            id: 'fitness',
            industry: 'Fitness Studio',
            location: 'Los Angeles, CA',
            challenge: 'Membership sales plateaued after initial launch momentum, needed to attract new demographics.',
            strategy: 'Developed campaigns targeting different fitness goals (weight loss, strength, flexibility) with specific class offerings. Leveraged user-generated content and transformation stories.',
            results: {
                roas: '385%',
                costPerLead: '$15',
                leadIncrease: '195%',
                timeframe: '5 months'
            },
            color: 'from-green-500 to-emerald-500',
            icon: Target
        },
        {
            id: 'saas',
            industry: 'B2B SaaS Platform',
            location: 'San Francisco, CA',
            challenge: 'High customer acquisition cost and long sales cycles limiting growth potential.',
            strategy: 'Built multi-touch attribution campaigns targeting decision-makers in specific industries. Used lead magnets, webinars, and case studies to nurture prospects.',
            results: {
                roas: '520%',
                costPerLead: '$45',
                leadIncrease: '240%',
                timeframe: '8 months'
            },
            color: 'from-indigo-500 to-purple-500',
            icon: TrendingUp
        }
    ];

    return (
        <div className="min-h-screen bg-[#020202] text-white">
            <SEO
                title="Meta Ads Case Studies | Facebook & Instagram Success Stories"
                description="Real results from our Meta advertising campaigns. See how we've helped businesses achieve 300%+ ROAS across various industries."
                canonical="https://creativecodeca.com/services/meta-ads/examples"
            />
            
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 text-center">
                    <div className="max-w-5xl mx-auto">
                        <Link
                            to="/services/meta-ads"
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
                                Meta Ads Case Studies
                            </h1>
                            <p className="text-xl text-slate-400 mb-4 font-light">
                                Real campaigns. Real results.
                            </p>
                            <p className="text-slate-500 max-w-2xl mx-auto">
                                See how we've helped businesses across different industries achieve exceptional ROI through strategic Meta advertising campaigns.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Case Studies */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto space-y-20">
                        {caseStudies.map((study, index) => {
                            const Icon = study.icon;
                            return (
                                <motion.div
                                    key={study.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <SpotlightCard>
                                        <div className="bg-[#0a0a0a] rounded-2xl p-8 md:p-12">
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                {/* Left: Overview */}
                                                <div className="lg:col-span-2 space-y-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${study.color} p-3 shrink-0`}>
                                                            <Icon className="w-full h-full text-white" />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                                                {study.industry}
                                                            </h2>
                                                            <p className="text-slate-400 text-sm">
                                                                {study.location}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-semibold text-pink-400 mb-2">
                                                            The Challenge
                                                        </h3>
                                                        <p className="text-slate-300 leading-relaxed">
                                                            {study.challenge}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-semibold text-pink-400 mb-2">
                                                            Our Strategy
                                                        </h3>
                                                        <p className="text-slate-300 leading-relaxed">
                                                            {study.strategy}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Right: Results */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-white mb-4">
                                                        Results
                                                    </h3>
                                                    
                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                                        <div className={`text-4xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent mb-2`}>
                                                            {study.results.roas}
                                                        </div>
                                                        <div className="text-sm text-slate-400 uppercase tracking-wider">
                                                            Return on Ad Spend
                                                        </div>
                                                    </div>

                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                                        <div className="text-3xl font-bold text-white mb-2">
                                                            {study.results.costPerLead}
                                                        </div>
                                                        <div className="text-sm text-slate-400 uppercase tracking-wider">
                                                            Cost Per Lead
                                                        </div>
                                                    </div>

                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                                        <div className="text-3xl font-bold text-white mb-2">
                                                            {study.results.leadIncrease}
                                                        </div>
                                                        <div className="text-sm text-slate-400 uppercase tracking-wider">
                                                            Lead Increase
                                                        </div>
                                                    </div>

                                                    <div className="text-center text-sm text-slate-500 pt-2">
                                                        Achieved in {study.results.timeframe}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Mock Ad Preview */}
                                            <div className="mt-8 pt-8 border-t border-white/10">
                                                <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                                                    Sample Ad Creative
                                                </h4>
                                                <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 rounded-full bg-white/10"></div>
                                                        <div>
                                                            <div className="w-32 h-3 bg-white/10 rounded mb-1"></div>
                                                            <div className="w-20 h-2 bg-white/5 rounded"></div>
                                                        </div>
                                                    </div>
                                                    <div className={`h-48 rounded-lg bg-gradient-to-br ${study.color} opacity-20 mb-4 flex items-center justify-center`}>
                                                        <div className="text-white/60 text-sm">Ad Visual</div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="w-full h-3 bg-white/10 rounded"></div>
                                                        <div className="w-5/6 h-3 bg-white/10 rounded"></div>
                                                        <div className="w-4/6 h-3 bg-white/10 rounded"></div>
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
                        <div className="bg-gradient-to-br from-pink-900/20 to-rose-900/20 border border-pink-500/20 rounded-2xl p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready for Similar Results?
                            </h2>
                            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                                Let's discuss how we can create a winning Meta advertising strategy for your business.
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
                                    to="/services/meta-ads"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105"
                                >
                                    View Pricing
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default MetaAdsExamples;
