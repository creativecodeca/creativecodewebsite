import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Code, Home, ShoppingBag, Utensils, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import SEO from './SEO';

const WebsiteExamples: React.FC = () => {
    const examples = [
        {
            id: 'saas',
            title: 'SaaS Platform',
            description: 'Modern dashboard interface for software products with clean data visualization and intuitive user flows.',
            icon: Code,
            color: 'from-blue-500 to-cyan-500',
            features: [
                'User dashboard with analytics',
                'Subscription management portal',
                'API documentation pages',
                'Responsive admin panels'
            ],
            mockup: 'dashboard'
        },
        {
            id: 'renovation',
            title: 'Home Renovation',
            description: 'Visual-heavy design showcasing before/after transformations with project galleries and service breakdowns.',
            icon: Home,
            color: 'from-orange-500 to-red-500',
            features: [
                'Portfolio gallery with filters',
                'Before & after sliders',
                'Service area coverage maps',
                'Client testimonial showcase'
            ],
            mockup: 'gallery'
        },
        {
            id: 'ecommerce',
            title: 'E-commerce Store',
            description: 'Product-focused layout with seamless checkout experience, perfect for retail and luxury goods.',
            icon: ShoppingBag,
            color: 'from-purple-500 to-pink-500',
            features: [
                'Product catalogs with filters',
                'Shopping cart & checkout',
                'Inventory management',
                'Customer accounts'
            ],
            mockup: 'shop'
        },
        {
            id: 'restaurant',
            title: 'Restaurant',
            description: 'Appetizing visual design with online reservations, menu display, and atmosphere-focused imagery.',
            icon: Utensils,
            color: 'from-green-500 to-emerald-500',
            features: [
                'Interactive menu with photos',
                'Online reservation system',
                'Location & hours display',
                'Special events calendar'
            ],
            mockup: 'menu'
        },
        {
            id: 'professional',
            title: 'Professional Services',
            description: 'Trust-building design for lawyers, doctors, consultants with credential highlights and booking systems.',
            icon: Briefcase,
            color: 'from-indigo-500 to-blue-500',
            features: [
                'Team member profiles',
                'Appointment booking',
                'Service descriptions',
                'Client portal access'
            ],
            mockup: 'professional'
        }
    ];

    const renderMockup = (type: string, color: string) => {
        switch(type) {
            case 'dashboard':
                return (
                    <div className="bg-[#0a0a0a] rounded-xl p-6 h-full min-h-[300px]">
                        {/* Dashboard Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="w-24 h-6 bg-white/10 rounded"></div>
                            <div className="w-10 h-10 rounded-full bg-white/5"></div>
                        </div>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="w-12 h-4 bg-white/10 rounded mb-2"></div>
                                <div className="w-16 h-8 bg-white/20 rounded"></div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="w-12 h-4 bg-white/10 rounded mb-2"></div>
                                <div className="w-16 h-8 bg-white/20 rounded"></div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="w-12 h-4 bg-white/10 rounded mb-2"></div>
                                <div className="w-16 h-8 bg-white/20 rounded"></div>
                            </div>
                        </div>
                        {/* Chart Area */}
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10 h-32 flex items-end gap-2">
                            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                                <div key={i} className={`flex-1 bg-gradient-to-t ${color} rounded-t`} style={{ height: `${height}%` }}></div>
                            ))}
                        </div>
                    </div>
                );
            case 'gallery':
                return (
                    <div className="bg-[#0a0a0a] rounded-xl p-6 h-full min-h-[300px]">
                        {/* Gallery Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 rounded-lg h-32 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20"></div>
                                <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                                    <div className="w-16 h-2 bg-white/60 rounded"></div>
                                </div>
                            </div>
                            <div className="bg-white/10 rounded-lg h-32 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20"></div>
                                <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1">
                                    <div className="w-16 h-2 bg-white/60 rounded"></div>
                                </div>
                            </div>
                            <div className="bg-white/10 rounded-lg h-32 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20"></div>
                            </div>
                            <div className="bg-white/10 rounded-lg h-32 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20"></div>
                            </div>
                        </div>
                    </div>
                );
            case 'shop':
                return (
                    <div className="bg-[#0a0a0a] rounded-xl p-6 h-full min-h-[300px]">
                        {/* Product Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className="space-y-2">
                                    <div className="bg-white/5 rounded-lg h-24 border border-white/10 relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20`}></div>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded"></div>
                                    <div className="w-12 h-3 bg-white/20 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'menu':
                return (
                    <div className="bg-[#0a0a0a] rounded-xl p-6 h-full min-h-[300px]">
                        {/* Menu Items */}
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex gap-4 items-start">
                                    <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 shrink-0 relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20`}></div>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between">
                                            <div className="w-24 h-3 bg-white/20 rounded"></div>
                                            <div className="w-10 h-3 bg-white/10 rounded"></div>
                                        </div>
                                        <div className="w-full h-2 bg-white/5 rounded"></div>
                                        <div className="w-3/4 h-2 bg-white/5 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'professional':
                return (
                    <div className="bg-[#0a0a0a] rounded-xl p-6 h-full min-h-[300px]">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 rounded-full bg-white/5 border-2 border-white/10"></div>
                            <div className="flex-1 space-y-2">
                                <div className="w-32 h-4 bg-white/20 rounded"></div>
                                <div className="w-24 h-3 bg-white/10 rounded"></div>
                            </div>
                        </div>
                        {/* Content Blocks */}
                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="w-40 h-3 bg-white/20 rounded mb-2"></div>
                                <div className="w-full h-2 bg-white/5 rounded mb-1"></div>
                                <div className="w-5/6 h-2 bg-white/5 rounded"></div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="w-40 h-3 bg-white/20 rounded mb-2"></div>
                                <div className="w-full h-2 bg-white/5 rounded mb-1"></div>
                                <div className="w-4/5 h-2 bg-white/5 rounded"></div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white">
            <SEO
                title="Website Design Examples | Creative Code Portfolio"
                description="Explore our portfolio of custom websites across various industries including SaaS, e-commerce, restaurants, professional services, and more."
                canonical="https://creativecodeca.com/services/website/examples"
            />
            
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 text-center">
                    <div className="max-w-5xl mx-auto">
                        <Link
                            to="/services/website"
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
                                Website Examples
                            </h1>
                            <p className="text-xl text-slate-400 mb-4 font-light">
                                Professional websites built for every industry
                            </p>
                            <p className="text-slate-500 max-w-2xl mx-auto">
                                From SaaS platforms to local businesses, we craft custom websites that drive results. Each design is tailored to your industry's unique needs and optimized for conversions.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Examples Grid */}
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
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                                >
                                    {/* Content */}
                                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${example.color} p-3 mb-6 opacity-90`}>
                                            <Icon className="w-full h-full text-white" />
                                        </div>
                                        
                                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                                            {example.title}
                                        </h2>
                                        
                                        <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                            {example.description}
                                        </p>
                                        
                                        <ul className="space-y-3 mb-8">
                                            {example.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                                                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${example.color}`}></div>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <Link
                                            to="/contact#booking"
                                            className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${example.color} text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg`}
                                        >
                                            Book a Strategy Call
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                    
                                    {/* Mockup */}
                                    <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                        <div className={`absolute -inset-4 bg-gradient-to-br ${example.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`}></div>
                                        <SpotlightCard className="transform transition-transform duration-500 hover:scale-[1.02]">
                                            {renderMockup(example.mockup, example.color)}
                                        </SpotlightCard>
                                    </div>
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
                        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-2xl p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready to Build Your Dream Website?
                            </h2>
                            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                                Let's discuss your project and create a custom website that drives real results for your business.
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <Link
                                    to="/contact#booking"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                >
                                    Schedule a Free Consultation
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/services/website"
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

export default WebsiteExamples;
