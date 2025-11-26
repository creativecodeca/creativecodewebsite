import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Star, Shield, Globe, Award, Briefcase, TrendingUp } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const WebsiteServices: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Website Design
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 font-light tracking-wide">
                            CREATIVE CODE
                        </p>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Pop-Up Website */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col relative group hover:border-white/20 transition-colors">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Pop-Up Website</h3>
                                <p className="text-slate-400 text-sm">(3 Pages)</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$99</span>
                                    <span className="text-slate-500 text-sm">USD</span>
                                </div>
                                <div className="text-indigo-400 font-medium mt-2">$25/month</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                    <span>Conversion Based Templated Design</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                    <span>Standard Tier Copywriting</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-500">
                                    <div className="w-5 h-5 flex items-center justify-center shrink-0">✕</div>
                                    <span>No SEO</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                                    <p className="text-xs text-slate-400 mb-2">Not sure if this is the right fit?</p>
                                    <Link to="/contact" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                                        CLICK HERE to chat
                                    </Link>
                                </div>
                                <Link to="/services/website/buy-popup" className="block w-full py-4 bg-white/10 hover:bg-white/20 text-white text-center rounded-xl font-medium transition-colors border border-white/5">
                                    Purchase
                                </Link>
                            </div>
                        </div>

                        {/* Standard Website */}
                        <div className="bg-[#0a0a0a] border border-indigo-500/30 rounded-3xl p-8 flex flex-col relative group shadow-[0_0_40px_rgba(99,102,241,0.1)] hover:border-indigo-500/50 transition-colors">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Standard Website</h3>
                                <p className="text-slate-400 text-sm">(4 Pages)</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$500</span>
                                    <span className="text-slate-500 text-sm">USD</span>
                                </div>
                                <div className="text-indigo-400 font-medium mt-2">$25/month</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                    <span>Custom Design</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                    <span>5-7 days delivery</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                    <span>Basic SEO</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                                    <p className="text-xs text-slate-400 mb-2">Not sure if this is the right fit?</p>
                                    <Link to="/contact" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                                        CLICK HERE to chat
                                    </Link>
                                </div>
                                <Link to="/services/website/buy-standard" className="block w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-center rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/25">
                                    Purchase
                                </Link>
                            </div>
                        </div>

                        {/* Premium Website */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col relative group hover:border-white/20 transition-colors">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-2">Premium Website</h3>
                                <p className="text-slate-400 text-sm">Custom Solution</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">$1500+</span>
                                    <span className="text-slate-500 text-sm">USD</span>
                                </div>
                                <div className="text-indigo-400 font-medium mt-2">$30+/month</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                    <span>Premium Copywriting & Custom Design</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                    <span>Animations</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                    <span>7-14 days delivery</span>
                                </div>
                                <div className="flex gap-3 text-sm text-slate-300">
                                    <Check className="w-5 h-5 text-indigo-500 shrink-0" />
                                    <span>Standard SEO</span>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                                    <p className="text-xs text-slate-400 mb-2">Not sure if this is the right fit?</p>
                                    <Link to="/contact" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                                        CLICK HERE to chat
                                    </Link>
                                </div>
                                <Link to="/contact" className="block w-full py-4 bg-white/10 hover:bg-white/20 text-white text-center rounded-xl font-medium transition-colors border border-white/5">
                                    Get in touch
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 px-6 bg-white/5 border-y border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-6">Benefits Of A Good Website</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                                Having a good website is a necessity for businesses whether you are a pop-up-shop or a massive corporation. Here's why:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Shield className="w-8 h-8 text-indigo-400" />,
                                    title: "Trust",
                                    desc: "People want to know who they're interacting with. When you're a ghost on the web, there's nothing different from you than of a scam company."
                                },
                                {
                                    icon: <Globe className="w-8 h-8 text-blue-400" />,
                                    title: "Visibility",
                                    desc: "As strong as word of mouth seems. Most people look for companies online. When you don't have a website, you rarely show up, even if you have a google business profile."
                                },
                                {
                                    icon: <Award className="w-8 h-8 text-yellow-400" />,
                                    title: "Reputation",
                                    desc: "Buyers want to see experience. They will simply find your competitor who has their track record laid out on their website. A website separates freelancers and businesses."
                                },
                                {
                                    icon: <Star className="w-8 h-8 text-pink-400" />,
                                    title: "Proof Of Quality",
                                    desc: "Showing images and videos of your location, your past jobs, past works, and products show potential buyers your quality of work before they even call."
                                },
                                {
                                    icon: <Briefcase className="w-8 h-8 text-emerald-400" />,
                                    title: "Professionalism",
                                    desc: "Investing in a website is showing you care. A website dedicated to showing off your craft, your passion, and your work sets you apart from the rest."
                                },
                                {
                                    icon: <TrendingUp className="w-8 h-8 text-orange-400" />,
                                    title: "Opportunity",
                                    desc: "Companies all over the world are prospecting every day. When you don't have a professional website, you're shutting the door on opportunity."
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-colors group">
                                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Talk</h2>
                        <p className="text-xl text-slate-400 mb-8">Let us take the wheel.</p>
                        <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
                            Investing in your business can be stressful and confusing.
                            We encourage you to take advantage of our free consulting by booking with the button below to get in touch with a representative for a
                            zero-pressure consulting call.
                        </p>

                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        >
                            Let's Talk
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <div className="grid grid-cols-3 gap-8 mt-20 border-t border-white/10 pt-12">
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">12+</div>
                                <div className="text-sm text-slate-500 uppercase tracking-wider">Years of Experience</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">1K+</div>
                                <div className="text-sm text-slate-500 uppercase tracking-wider">Websites Designed</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">800+</div>
                                <div className="text-sm text-slate-500 uppercase tracking-wider">Active Clients</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Info */}
                <section className="py-12 px-6 border-t border-white/10 bg-[#050505]">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-xl font-bold text-white mb-4">Creative Code CA INC.</h3>
                            <p className="text-slate-400 max-w-sm">
                                We help businesses and individuals grow by creating high-performing websites, implementing AI-driven automation, and delivering comprehensive marketing solutions.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Contact</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="mailto:info@creativecodeca.com" className="hover:text-white transition-colors">info@creativecodeca.com</a></li>
                                <li><a href="tel:+18889775027" className="hover:text-white transition-colors">+1 888 977 5027</a></li>
                                <li>Toronto, Ontario</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4">Links</h4>
                            <ul className="space-y-2 text-slate-400">
                                <li><a href="https://creativecodeca.com" className="hover:text-white transition-colors">Website</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default WebsiteServices;
