import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowRight, ArrowLeft, UploadCloud, Loader2, CheckCircle, XCircle, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
    name: string;
    email: string;
    phone: string;
    companyName: string;
    industry: string;
    currentWebsite: string;
    designPreferences: string;
    features: string;
    competitors: string;
    assetsLink: string;
    additionalInfo: string;
}

const WebsiteGeneratorForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
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
    const totalSteps = 7;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [generationResult, setGenerationResult] = useState<{
        repoUrl?: string;
        vercelUrl?: string;
        projectUrl?: string;
        error?: string;
    } | null>(null);

    const formContainerRef = useRef<HTMLDivElement>(null);

    const WORD_LIMITS = {
        designPreferences: 200,
        features: 200,
        competitors: 150,
        additionalInfo: 200,
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const countWords = (text: string) => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 0:
                return formData.name.trim() && formData.email.trim() && isValidEmail(formData.email) && formData.phone.trim();
            case 1:
                return formData.companyName.trim() && formData.industry.trim();
            case 2:
                return formData.designPreferences.trim() && countWords(formData.designPreferences) <= WORD_LIMITS.designPreferences;
            case 3:
                return formData.features.trim() && countWords(formData.features) <= WORD_LIMITS.features;
            case 4:
                return true;
            case 5:
                return formData.assetsLink.trim();
            case 6:
                return countWords(formData.additionalInfo) <= WORD_LIMITS.additionalInfo;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (currentStep === totalSteps - 1) {
            submitForm();
        } else {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

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
        setGenerationResult(null);
        
        try {
            const response = await fetch('/api/generate-website', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate website');
            }

            setGenerationResult({
                repoUrl: data.repoUrl,
                vercelUrl: data.vercelUrl,
                projectUrl: data.projectUrl,
            });
            setIsSubmitted(true);
        } catch (err: any) {
            console.error('Generation failed:', err);
            setGenerationResult({ error: err.message || 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    if (isSubmitted && generationResult) {
        return (
            <div className="mt-12 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
                {generationResult.error ? (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <XCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Generation Failed</h3>
                        <p className="text-red-500 mb-6">{generationResult.error}</p>
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                setGenerationResult(null);
                                setCurrentStep(0);
                            }}
                            className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Website Generated Successfully!</h3>
                        <p className="text-slate-400 mb-2">
                            Your website has been created and pushed to GitHub.
                        </p>
                        {!generationResult.vercelUrl && (
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8 max-w-md mx-auto">
                                <p className="text-amber-400 text-sm">
                                    <strong>Next Step:</strong> Go to your Vercel dashboard and import this repository to deploy it. 
                                    To automate this in the future, add a VERCEL_TOKEN environment variable.
                                </p>
                            </div>
                        )}
                        {generationResult.vercelUrl && (
                            <p className="text-slate-400 mb-8">
                                A new Vercel project has been automatically created and deployed.
                            </p>
                        )}
                        <div className="space-y-4 max-w-md mx-auto">
                            {generationResult.repoUrl && (
                                <a
                                    href={generationResult.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white hover:bg-white/10 transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                    View GitHub Repository
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            {generationResult.vercelUrl && (
                                <a
                                    href={generationResult.vercelUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-emerald-500 text-white rounded-xl px-6 py-4 font-bold hover:bg-emerald-400 transition-colors"
                                >
                                    View Live Website
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            <a
                                href={generationResult.projectUrl || 'https://vercel.com/dashboard'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white hover:bg-white/10 transition-colors text-sm"
                            >
                                {generationResult.vercelUrl ? 'Vercel Project Dashboard' : 'Import to Vercel'}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                setGenerationResult(null);
                                setCurrentStep(0);
                                setFormData({
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
                            }}
                            className="mt-8 text-slate-400 hover:text-white transition-colors"
                        >
                            Generate Another Website
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div ref={formContainerRef} className="mt-12 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">Generate New Website</h3>
                <p className="text-slate-400">Fill out the form below to generate a website with AI</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                    {/* Step 0: Contact Info */}
                    {currentStep === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <h4 className="text-xl font-semibold text-white mb-4">Contact Information <span className="text-emerald-500">*</span></h4>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Your Name</label>
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
                                <label className="block text-sm text-slate-400 mb-2">Email Address</label>
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
                                <label className="block text-sm text-slate-400 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                    placeholder="+1 (555) 000-0000"
                                />
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
                            className="space-y-4"
                        >
                            <h4 className="text-xl font-semibold text-white mb-4">Business Information <span className="text-emerald-500">*</span></h4>
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Company Name</label>
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
                                <label className="block text-sm text-slate-400 mb-2">Industry / Niche</label>
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
                                <label className="block text-sm text-slate-400 mb-2">Current Website (if any)</label>
                                <input
                                    type="text"
                                    name="currentWebsite"
                                    value={formData.currentWebsite}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                    placeholder="https://www.example.com"
                                />
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
                        >
                            <h4 className="text-xl font-semibold text-white mb-4">Design Preferences <span className="text-emerald-500">*</span></h4>
                            <p className="text-slate-400 mb-4 text-sm">
                                Describe the look and feel you want. Max {WORD_LIMITS.designPreferences} words.
                            </p>
                            <textarea
                                name="designPreferences"
                                value={formData.designPreferences}
                                onChange={handleChange}
                                rows={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors resize-none"
                                placeholder="I want a sleek, dark-themed website with neon green accents..."
                            />
                            <div className="text-sm text-slate-500 mt-2">
                                {countWords(formData.designPreferences)} / {WORD_LIMITS.designPreferences} words
                            </div>
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
                        >
                            <h4 className="text-xl font-semibold text-white mb-4">Features & Pages <span className="text-emerald-500">*</span></h4>
                            <p className="text-slate-400 mb-4 text-sm">
                                List pages and functionality needed. Max {WORD_LIMITS.features} words.
                            </p>
                            <textarea
                                name="features"
                                value={formData.features}
                                onChange={handleChange}
                                rows={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors resize-none"
                                placeholder="We need a Home page, About Us, Services page, and a Contact form..."
                            />
                            <div className="text-sm text-slate-500 mt-2">
                                {countWords(formData.features)} / {WORD_LIMITS.features} words
                            </div>
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
                        >
                            <h4 className="text-xl font-semibold text-white mb-4">Competitors / Inspiration</h4>
                            <p className="text-slate-400 mb-4 text-sm">
                                Optional. List competitor websites or websites you admire. Max {WORD_LIMITS.competitors} words.
                            </p>
                            <textarea
                                name="competitors"
                                value={formData.competitors}
                                onChange={handleChange}
                                rows={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors resize-none"
                                placeholder="Competitor A (www.comp-a.com) - I like their layout..."
                            />
                            <div className="text-sm text-slate-500 mt-2">
                                {countWords(formData.competitors)} / {WORD_LIMITS.competitors} words
                            </div>
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
                        >
                            <h4 className="text-xl font-semibold text-white mb-4">Brand Assets <span className="text-emerald-500">*</span></h4>
                            <p className="text-slate-400 mb-4 text-sm">
                                Provide a link to Google Drive or Dropbox folder with logo, brand guidelines, images, etc.
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
                        >
                            <h4 className="text-xl font-semibold text-white mb-4">Additional Information</h4>
                            <p className="text-slate-400 mb-4 text-sm">
                                Optional. Max {WORD_LIMITS.additionalInfo} words.
                            </p>
                            <textarea
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleChange}
                                rows={6}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors resize-none"
                                placeholder="Any specific deadlines, budget constraints, or other details..."
                            />
                            <div className="text-sm text-slate-500 mt-2">
                                {countWords(formData.additionalInfo)} / {WORD_LIMITS.additionalInfo} words
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-white/5">
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
                        disabled={!isStepValid() || isSubmitting}
                        className="bg-emerald-500 text-white h-12 px-8 rounded-full font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Generating...
                            </>
                        ) : currentStep === totalSteps - 1 ? (
                            <>
                                <Send className="w-4 h-4" />
                                Generate Website
                            </>
                        ) : (
                            <>
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WebsiteGeneratorForm;

