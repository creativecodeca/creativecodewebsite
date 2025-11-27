import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle, X, ArrowRight, ArrowLeft, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import CaptchaGame from './CaptchaGame';

const WebsiteOnboardingForm: React.FC = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        industry: '',
        currentWebsite: '',
        designPreferences: '',
        features: '',
        competitors: '',
        assetsLink: '',
        additionalInfo: '',
    });

    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 7; // Contact, Business, Design, Features, Competitors, Assets, Additional
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaCompleted, setCaptchaCompleted] = useState(false);

    const formContainerRef = useRef<HTMLDivElement>(null);

    // Validation helpers
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleNext = () => {
        if (currentStep === totalSteps - 1) {
            // If it's the last step, show captcha
            setShowCaptcha(true);
        } else {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    // Auto-scroll to form on step change (Mobile only)
    useEffect(() => {
        if (window.innerWidth < 768 && formContainerRef.current) {
            setTimeout(() => {
                formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [currentStep]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const submitForm = async () => {
        setIsSubmitting(true);
        try {
            // Send to our secure server-side API route instead of directly to the webhook
            const response = await fetch('/api/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            setIsSubmitted(true);
        } catch (err) {
            console.error('Submission failed:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCaptchaSuccess = () => {
        setCaptchaCompleted(true);
        setShowCaptcha(false);
        submitForm();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            {/* Hero Section */}
            <section className="md:pt-48 md:pb-32 overflow-hidden flex flex-col pt-32 pb-24 relative justify-center">
                <ParticleCanvas />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#020202]/40 z-0 pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <h1 className="md:text-8xl leading-tight md:leading-[1.1] text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-8">
                        Website Onboarding
                    </h1>
                    <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed px-4">
                        Let's build something amazing. Tell us about your vision.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className="pb-20 px-6 relative z-20">
                <div className="max-w-3xl mx-auto -mt-12 md:-mt-24">
                    <div ref={formContainerRef} className="relative rounded-3xl bg-[rgba(20,20,20,0.6)] overflow-hidden shadow-2xl min-h-[500px] flex flex-col">
                        <div className="relative h-full rounded-[22px] border border-white/5 bg-[#0a0a0a] overflow-visible p-8 md:p-12 flex-1 flex flex-col">
                            {isSubmitted ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">Information Received!</h3>
                                    <p className="text-slate-400 mb-8 max-w-md">
                                        Thank you for providing your project details. Our team will review everything and get started on your website.
                                    </p>
                                    <Link
                                        to="/"
                                        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors"
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col">
                                    {/* Progress Bar */}
                                    <div className="w-full h-1 bg-white/10 rounded-full mb-12 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-emerald-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>

                                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col relative">
                                        <AnimatePresence mode="wait">
                                            {/* Step 0: Contact Info */}
                                            {currentStep === 0 && (
                                                <motion.div
                                                    key="step0"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center space-y-6"
                                                >
                                                    <h2 className="text-2xl md:text-3xl font-medium text-white mb-2">
                                                        Let's start with the basics. <span className="text-emerald-500">*</span>
                                                    </h2>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm text-slate-400 mb-1">Your Name</label>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleChange}
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                                                placeholder="John Doe"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-slate-400 mb-1">Email Address</label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                                                placeholder="john@example.com"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-slate-400 mb-1">Phone Number</label>
                                                            <input
                                                                type="tel"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                                                placeholder="+1 (555) 000-0000"
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Step 1: Business Info */}
                                            {currentStep === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center space-y-6"
                                                >
                                                    <h2 className="text-2xl md:text-3xl font-medium text-white mb-2">
                                                        Tell us about your business.
                                                    </h2>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm text-slate-400 mb-1">Company Name</label>
                                                            <input
                                                                type="text"
                                                                name="companyName"
                                                                value={formData.companyName}
                                                                onChange={handleChange}
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                                                placeholder="Acme Corp"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-slate-400 mb-1">Industry / Niche</label>
                                                            <input
                                                                type="text"
                                                                name="industry"
                                                                value={formData.industry}
                                                                onChange={handleChange}
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                                                placeholder="e.g. Real Estate, E-commerce, Healthcare"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-slate-400 mb-1">Current Website (if any)</label>
                                                            <input
                                                                type="text"
                                                                name="currentWebsite"
                                                                value={formData.currentWebsite}
                                                                onChange={handleChange}
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                                                placeholder="https://www.example.com"
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Step 2: Design Preferences */}
                                            {currentStep === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center"
                                                >
                                                    <label className="block text-2xl md:text-3xl font-medium text-white mb-6">
                                                        What are your design preferences?
                                                    </label>
                                                    <p className="text-slate-400 mb-4 text-sm">Describe the look and feel you want (e.g., modern, minimalist, colorful, dark mode). Mention any specific colors or fonts.</p>
                                                    <textarea
                                                        name="designPreferences"
                                                        value={formData.designPreferences}
                                                        onChange={handleChange}
                                                        rows={6}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors resize-none"
                                                        placeholder="I want a sleek, dark-themed website with neon green accents..."
                                                    />
                                                </motion.div>
                                            )}

                                            {/* Step 3: Features */}
                                            {currentStep === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center"
                                                >
                                                    <label className="block text-2xl md:text-3xl font-medium text-white mb-6">
                                                        What features do you need?
                                                    </label>
                                                    <p className="text-slate-400 mb-4 text-sm">List pages (Home, About, Services) and functionality (Contact Form, Booking System, E-commerce, Blog).</p>
                                                    <textarea
                                                        name="features"
                                                        value={formData.features}
                                                        onChange={handleChange}
                                                        rows={6}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors resize-none"
                                                        placeholder="We need a Home page, About Us, Services page, and a Contact form. Also need a booking calendar..."
                                                    />
                                                </motion.div>
                                            )}

                                            {/* Step 4: Competitors */}
                                            {currentStep === 4 && (
                                                <motion.div
                                                    key="step4"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center"
                                                >
                                                    <label className="block text-2xl md:text-3xl font-medium text-white mb-6">
                                                        Who are your competitors?
                                                    </label>
                                                    <p className="text-slate-400 mb-4 text-sm">List a few competitor websites or websites you admire for inspiration.</p>
                                                    <textarea
                                                        name="competitors"
                                                        value={formData.competitors}
                                                        onChange={handleChange}
                                                        rows={6}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors resize-none"
                                                        placeholder="Competitor A (www.comp-a.com) - I like their layout. Competitor B..."
                                                    />
                                                </motion.div>
                                            )}

                                            {/* Step 5: Assets Link */}
                                            {currentStep === 5 && (
                                                <motion.div
                                                    key="step5"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center"
                                                >
                                                    <label className="block text-2xl md:text-3xl font-medium text-white mb-6">
                                                        Brand Assets
                                                    </label>
                                                    <p className="text-slate-400 mb-4 text-sm">
                                                        Please provide a link to a Google Drive or Dropbox folder containing your logo, brand guidelines, images, and any other assets we should use.
                                                    </p>
                                                    <div className="relative">
                                                        <UploadCloud className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                                        <input
                                                            type="text"
                                                            name="assetsLink"
                                                            value={formData.assetsLink}
                                                            onChange={handleChange}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-emerald-500 outline-none transition-colors"
                                                            placeholder="https://drive.google.com/drive/folders/..."
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Step 6: Additional Info */}
                                            {currentStep === 6 && (
                                                <motion.div
                                                    key="step6"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center"
                                                >
                                                    <label className="block text-2xl md:text-3xl font-medium text-white mb-6">
                                                        Anything else?
                                                    </label>
                                                    <textarea
                                                        name="additionalInfo"
                                                        value={formData.additionalInfo}
                                                        onChange={handleChange}
                                                        rows={6}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors resize-none"
                                                        placeholder="Any specific deadlines, budget constraints, or other details..."
                                                    />
                                                </motion.div>
                                            )}

                                            {/* Captcha Step */}
                                            {showCaptcha && (
                                                <CaptchaGame onSuccess={handleCaptchaSuccess} />
                                            )}
                                        </AnimatePresence>

                                        {/* Navigation Buttons */}
                                        {!showCaptcha && (
                                            <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
                                                <button
                                                    type="button"
                                                    onClick={handleBack}
                                                    className={`flex items-center gap-2 text-slate-400 hover:text-white transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                                >
                                                    <ArrowLeft className="w-5 h-5" />
                                                    Back
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={handleNext}
                                                    disabled={
                                                        (currentStep === 0 && (!formData.name || !formData.email || !isValidEmail(formData.email)))
                                                    }
                                                    className="bg-white text-black h-12 px-8 rounded-full font-bold hover:bg-slate-200 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {currentStep === totalSteps - 1 ? 'Submit' : 'Next'}
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WebsiteOnboardingForm;
