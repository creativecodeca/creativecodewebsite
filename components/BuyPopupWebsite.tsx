import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';

const BuyPopupWebsite: React.FC = () => {
    useEffect(() => {
        // Load Stripe script
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/buy-button.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <section className="pt-32 pb-12 px-6">
                    <div className="max-w-4xl mx-auto">
                        <Link to="/services/website" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Website Services
                        </Link>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Pop-Up Website
                        </h1>
                        <p className="text-xl text-slate-400 mb-8">
                            Get your business online quickly with our conversion-optimized template design.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Left Column - Details */}
                            <div>
                                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 mb-8">
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1 mb-2">
                                            <span className="text-5xl font-bold text-white">$99</span>
                                            <span className="text-slate-500 text-lg">USD</span>
                                        </div>
                                        <div className="text-indigo-400 font-medium text-lg">+ $25/month hosting</div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-white mb-4">What's Included:</h3>
                                        <div className="flex gap-3 text-slate-300">
                                            <Check className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                            <span>3 Pages (Home, About, Contact)</span>
                                        </div>
                                        <div className="flex gap-3 text-slate-300">
                                            <Check className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                            <span>Conversion-Based Template Design</span>
                                        </div>
                                        <div className="flex gap-3 text-slate-300">
                                            <Check className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                            <span>Standard Tier Copywriting</span>
                                        </div>
                                        <div className="flex gap-3 text-slate-300">
                                            <Check className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                            <span>Mobile Responsive</span>
                                        </div>
                                        <div className="flex gap-3 text-slate-300">
                                            <Check className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                                            <span>Fast Delivery (3-5 days)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6">
                                    <h4 className="text-white font-semibold mb-2">Need Help?</h4>
                                    <p className="text-slate-400 text-sm mb-4">
                                        Not sure if this is the right package? Contact us for a free consultation.
                                    </p>
                                    <Link to="/contact" className="text-indigo-400 hover:text-indigo-300 font-medium text-sm">
                                        Get in touch →
                                    </Link>
                                </div>
                            </div>

                            {/* Right Column - Stripe Checkout */}
                            <div>
                                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 sticky top-24">
                                    <h3 className="text-2xl font-bold text-white mb-6">Complete Your Purchase</h3>
                                    <div className="flex justify-center">
                                        <stripe-buy-button
                                            buy-button-id="buy_btn_1SSPHjBx7uHSBjgp0NEEyTL4"
                                            publishable-key="pk_live_51Qhd1LBx7uHSBjgpm9hAcycxgPAtzAWQeVUz0Wm0Ws9ym30Mcmmuc7VOhe2WdyaeH37Plw0IdYZxEHauDMmYnmkd003GRPnJd5"
                                        >
                                        </stripe-buy-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BuyPopupWebsite;
