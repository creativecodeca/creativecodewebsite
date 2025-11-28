import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';
import SpotlightCard from './SpotlightCard';
import SEO from './SEO';

const About: React.FC = () => {
    return (
        <>
            <SEO
                title="About Us | Creative Code Digital Marketing Agency"
                description="Learn about Creative Code's mission to make digital growth easy, honest, and affordable for real businesses."
                canonical="https://creativecodeca.com/about"
            />
            {/* Ambient Background Light */}
            {/* Ambient Background Light - Removed */}

            {/* Hero Section */}
            <section className="md:pt-48 md:pb-32 overflow-hidden flex flex-col pt-32 pb-20 relative justify-center">
                <ParticleCanvas />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/80 z-0 pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex hover:scale-105 transition-transform cursor-default text-xs font-medium text-slate-300 bg-white/5 border-white/10 border rounded-full mb-8 pt-2 pr-4 pb-2 pl-4 backdrop-blur-md gap-x-2 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        About Creative Code
                    </div>

                    {/* Headline */}
                    <h1 className="md:text-8xl leading-tight md:leading-[1.1] text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-8">
                        About Us
                    </h1>

                    {/* Subheadline */}
                    <p className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed px-4">
                        We bring your business into the digital world with stunning websites, AI-powered CRM, high converting ad campaigns, and smart automations.
                    </p>

                    {/* CTA Button */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                        <Link
                            to="/contact"
                            className="bg-white text-black h-14 px-10 rounded-full font-bold hover:bg-slate-200 transition-all interactable flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-105"
                        >
                            Get Started
                            <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
                        </Link>
                        <Link
                            to="/products"
                            className="bg-white/5 border border-white/10 text-white h-14 px-10 rounded-full font-bold hover:bg-white/10 transition-all interactable flex items-center gap-2 backdrop-blur-md"
                        >
                            View Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="py-32 px-6 relative">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6 text-glow">
                            Who we are.
                        </h2>
                    </div>

                    <SpotlightCard className="shadow-2xl p-[1px] mb-8">
                        <div className="relative h-full p-10 md:p-16">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-indigo-500/10 transition-colors duration-700"></div>

                            <div className="relative z-10 space-y-6 text-slate-300 text-base md:text-lg leading-relaxed">
                                <p>
                                    Creative Code was founded to make professional digital solutions actually work for business owners, not just sound good on paper.
                                </p>

                                <p>
                                    Before starting Creative Code, we ran a local business and worked with multiple agencies who promised "done-for-you" ads and guaranteed appointments. But in reality, we were left doing most of the work ourselves. Even when they didn't deliver, they refused to honor their refund promises.
                                </p>

                                <p>
                                    After speaking with countless other business owners, we realized the same problems kept coming up. Overpriced websites, confusing ad campaigns, and underwhelming results.
                                </p>

                                <p className="text-white font-medium">
                                    That's why we created Creative Code. We build high-performing websites, manage ad campaigns that actually deliver, and offer a truly done-for-you experience. If we don't hit the results we promise, you're contractually entitled to a refund. Guaranteed.
                                </p>

                                <p className="text-lg md:text-xl text-white font-semibold pt-4">
                                    Our mission is simple: make digital growth easy, honest, and affordable for real businesses.
                                </p>
                            </div>
                        </div>
                    </SpotlightCard>
                </div>
            </section>

            {/* Company Info Section */}
            <section className="py-32 px-6 relative bg-[#050505] border-y border-white/10">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]"></div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6 text-glow">
                            Creative Code CA INC.
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            We help businesses and individuals grow by creating high-performing websites, implementing AI-driven automation, and delivering comprehensive marketing solutions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Website Card */}
                        <SpotlightCard className="shadow-2xl p-[1px]">
                            <div className="relative h-full p-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-slate-300">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                                            <path d="M2 12h20"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-2 text-lg">Website</h3>
                                        <a
                                            href="https://creativecodeca.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-400 hover:text-white transition-colors interactable break-all"
                                        >
                                            creativecodeca.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* Email Card */}
                        <SpotlightCard className="shadow-2xl p-[1px]">
                            <div className="relative h-full p-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                        <Mail className="w-6 h-6 text-slate-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-2 text-lg">Email</h3>
                                        <a
                                            href="mailto:info@creativecodeca.com"
                                            className="text-slate-400 hover:text-white transition-colors interactable break-all"
                                        >
                                            info@creativecodeca.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* Address Card */}
                        <SpotlightCard className="shadow-2xl p-[1px]">
                            <div className="relative h-full p-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                        <MapPin className="w-6 h-6 text-slate-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-2 text-lg">Address</h3>
                                        <p className="text-slate-400">Toronto, Ontario</p>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* Phone Card */}
                        <SpotlightCard className="shadow-2xl p-[1px]">
                            <div className="relative h-full p-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                        <Phone className="w-6 h-6 text-slate-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-2 text-lg">Phone</h3>
                                        <a
                                            href="tel:+18889775027"
                                            className="text-slate-400 hover:text-white transition-colors interactable"
                                        >
                                            +1 (888) 977-5027
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
