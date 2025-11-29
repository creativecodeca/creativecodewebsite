import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowRight, ArrowLeft, Plus, X, Loader2, CheckCircle, XCircle, Github, ExternalLink, Trash2, Copy, Check, Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Page {
    id: string;
    title: string;
    information: string;
}

interface FormData {
    // General Information
    companyName: string;
    industry: string;
    address: string;
    city: string;
    phoneNumber: string;
    email: string;
    companyType: string;
    colors: string;
    brandThemes: string;
    extraDetailedInfo: string;
    
    // Pages
    pages: Page[];
    
    // Addons
    contactForm: boolean;
    bookingForm: boolean;
}

interface WebsiteGeneratorFormProps {
    onSiteGenerated?: () => void;
}

const WebsiteGeneratorForm: React.FC<WebsiteGeneratorFormProps> = ({ onSiteGenerated }) => {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        industry: '',
        address: '',
        city: '',
        phoneNumber: '',
        email: '',
        companyType: '',
        colors: '',
        brandThemes: '',
        extraDetailedInfo: '',
        pages: [],
        contactForm: false,
        bookingForm: false,
    });

    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 3; // General Info, Pages, Addons
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [generationResult, setGenerationResult] = useState<{
        repoUrl?: string;
        vercelUrl?: string;
        projectUrl?: string;
        error?: string;
    } | null>(null);

    const [newPageTitle, setNewPageTitle] = useState('');
    const [copied, setCopied] = useState(false);
    const [gmbUrl, setGmbUrl] = useState('');
    const [isFetchingGmb, setIsFetchingGmb] = useState(false);
    const formContainerRef = useRef<HTMLDivElement>(null);

    const companyTypes = [
        'Service Location Business',
        'Service Area Business',
        'Online Store',
        'E-commerce',
        'Professional Services',
        'Restaurant/Food Service',
        'Healthcare/Medical',
        'Real Estate',
        'Fitness/Gym',
        'Beauty/Salon',
        'Education/Training',
        'Non-Profit',
        'Other'
    ];

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 0: // General Information
                return formData.companyName.trim() &&
                       formData.industry.trim() &&
                       formData.address.trim() &&
                       formData.city.trim() &&
                       formData.phoneNumber.trim() &&
                       formData.email.trim() &&
                       isValidEmail(formData.email) &&
                       formData.companyType.trim() &&
                       formData.colors.trim() &&
                       formData.brandThemes.trim();
            case 1: // Pages
                return formData.pages.length > 0 && 
                       formData.pages.every(page => page.title.trim() && page.information.trim());
            case 2: // Addons (optional, always valid)
                return true;
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFetchGmb = async () => {
        if (!gmbUrl.trim()) return;

        setIsFetchingGmb(true);
        try {
            const response = await fetch('/api/fetch-gmb-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gmbUrl: gmbUrl.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch GMB information');
            }

            if (data.success && data.data) {
                // Populate form fields with fetched data
                setFormData(prev => ({
                    ...prev,
                    companyName: data.data.companyName || prev.companyName,
                    industry: data.data.industry || prev.industry,
                    address: data.data.address || prev.address,
                    city: data.data.city || prev.city,
                    phoneNumber: data.data.phoneNumber || prev.phoneNumber,
                    email: data.data.email || prev.email,
                    companyType: data.data.companyType || prev.companyType,
                    colors: data.data.colors || prev.colors,
                    brandThemes: data.data.brandThemes || prev.brandThemes,
                    extraDetailedInfo: data.data.extraDetailedInfo || prev.extraDetailedInfo,
                }));

                // Show success message (optional - you could add a toast notification here)
                console.log('GMB information fetched successfully');
            }
        } catch (error: any) {
            console.error('Error fetching GMB info:', error);
            alert(`Failed to fetch GMB information: ${error.message || 'Unknown error'}`);
        } finally {
            setIsFetchingGmb(false);
        }
    };

    const addPage = () => {
        if (!newPageTitle.trim()) return;
        
        const newPage: Page = {
            id: Date.now().toString(),
            title: newPageTitle.trim(),
            information: ''
        };
        
        setFormData(prev => ({
            ...prev,
            pages: [...prev.pages, newPage]
        }));
        
        setNewPageTitle('');
    };

    const removePage = (pageId: string) => {
        setFormData(prev => ({
            ...prev,
            pages: prev.pages.filter(page => page.id !== pageId)
        }));
    };

    const updatePage = (pageId: string, field: 'title' | 'information', value: string) => {
        setFormData(prev => ({
            ...prev,
            pages: prev.pages.map(page =>
                page.id === pageId ? { ...page, [field]: value } : page
            )
        }));
    };

    const submitForm = async () => {
        setIsSubmitting(true);
        setGenerationResult(null);
        setCopied(false);
        
        try {
            const response = await fetch('/api/generate-website', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                // If response isn't JSON, it's likely a server error
                const text = await response.text();
                throw new Error('Server error occurred. Please try again.');
            }

            if (!response.ok) {
                // Use the error message from API, or a generic one
                throw new Error(data.error || 'Failed to generate website');
            }

            setGenerationResult({
                repoUrl: data.repoUrl,
                vercelUrl: data.vercelUrl,
                projectUrl: data.projectUrl,
            });
            
            // Save to dashboard
            if (data.repoUrl) {
                try {
                    await fetch('/api/save-site', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            companyName: formData.companyName,
                            repoUrl: data.repoUrl,
                            vercelUrl: data.vercelUrl,
                            projectUrl: data.projectUrl,
                            industry: formData.industry,
                        }),
                    });
                    // Refresh the sites list
                    if (onSiteGenerated) {
                        onSiteGenerated();
                    }
                } catch (saveError) {
                    console.error('Failed to save site to dashboard:', saveError);
                    // Don't block the user if saving fails
                }
            }
            
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
                            <>
                                <p className="text-slate-400 mb-6">
                                    A new Vercel project has been automatically created and deployed.
                                </p>
                                
                                {/* Copy Link Button */}
                                <div className="mb-6 flex items-center justify-center gap-3">
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 max-w-md w-full">
                                        <input
                                            type="text"
                                            value={generationResult.vercelUrl}
                                            readOnly
                                            className="flex-1 bg-transparent text-white text-sm outline-none"
                                        />
                                        <button
                                            onClick={async () => {
                                                if (generationResult.vercelUrl) {
                                                    await navigator.clipboard.writeText(generationResult.vercelUrl);
                                                    setCopied(true);
                                                    setTimeout(() => setCopied(false), 2000);
                                                }
                                            }}
                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                            title="Copy link"
                                        >
                                            {copied ? (
                                                <Check className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <Copy className="w-4 h-4 text-slate-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Website Preview Iframe */}
                                <div className="mb-8 max-w-6xl mx-auto px-4">
                                    <div className="bg-black/50 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                        <div className="bg-white/5 border-b border-white/10 px-4 py-2.5 flex items-center gap-2">
                                            <div className="flex gap-1.5">
                                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                                            </div>
                                            <div className="flex-1 bg-white/5 rounded px-3 py-1 text-xs text-slate-400 text-center truncate">
                                                {generationResult.vercelUrl}
                                            </div>
                                        </div>
                                        <div className="relative bg-white" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                            <iframe
                                                src={generationResult.vercelUrl}
                                                className="absolute top-0 left-0 w-full h-full border-0"
                                                title="Website Preview"
                                                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-top-navigation"
                                                loading="lazy"
                                                allow="fullscreen"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
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
                                    companyName: '',
                                    industry: '',
                                    address: '',
                                    city: '',
                                    phoneNumber: '',
                                    email: '',
                                    companyType: '',
                                    colors: '',
                                    brandThemes: '',
                                    extraDetailedInfo: '',
                                    pages: [],
                                    contactForm: false,
                                    bookingForm: false,
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
                    {/* Step 0: General Information */}
                    {currentStep === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <h4 className="text-2xl font-semibold text-white mb-6">General Information <span className="text-emerald-500">*</span></h4>
                            
                            {/* GMB Reference Link */}
                            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                <label className="block text-sm text-slate-300 mb-3 font-medium">
                                    <MapPin className="w-4 h-4 inline mr-2" />
                                    GMB Reference Link (Optional - Auto-fill form from Google My Business)
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="url"
                                        value={gmbUrl}
                                        onChange={(e) => setGmbUrl(e.target.value)}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                        placeholder="https://www.google.com/maps/place/..."
                                    />
                                    <button
                                        type="button"
                                        onClick={handleFetchGmb}
                                        disabled={!gmbUrl.trim() || isFetchingGmb}
                                        className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isFetchingGmb ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Fetching...
                                            </>
                                        ) : (
                                            <>
                                                <Search className="w-4 h-4" />
                                                Fetch Info
                                            </>
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">
                                    Paste a Google My Business URL to automatically populate the form fields below
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Company Name <span className="text-emerald-500">*</span></label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                        placeholder="Acme Corp"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Industry <span className="text-emerald-500">*</span></label>
                                    <input
                                        type="text"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                        placeholder="e.g. Real Estate, E-commerce"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Address <span className="text-emerald-500">*</span></label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                        placeholder="123 Main Street"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">City <span className="text-emerald-500">*</span></label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                        placeholder="Toronto, ON"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Phone Number <span className="text-emerald-500">*</span></label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                        placeholder="+1 (555) 000-0000"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Email <span className="text-emerald-500">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                        placeholder="info@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Company Type <span className="text-emerald-500">*</span></label>
                                    <select
                                        name="companyType"
                                        value={formData.companyType}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors [&>option]:bg-[#0a0a0a] [&>option]:text-white [&>option:hover]:bg-[#0a0a0a] [&>option:checked]:bg-[#0a0a0a]"
                                        required
                                    >
                                        <option value="" className="bg-[#0a0a0a] text-slate-400">Select company type...</option>
                                        {companyTypes.map(type => (
                                            <option key={type} value={type} className="bg-[#0a0a0a] text-white">{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Colors <span className="text-emerald-500">*</span></label>
                                    <input
                                        type="text"
                                        name="colors"
                                        value={formData.colors}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                        placeholder="e.g. #000000, #FFFFFF, #00FF00"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Brand Themes <span className="text-emerald-500">*</span></label>
                                <textarea
                                    name="brandThemes"
                                    value={formData.brandThemes}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors resize-none"
                                    placeholder="e.g. Modern, Professional, Trustworthy, Innovative"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm text-slate-400 mb-2">Extra Detailed Company Information</label>
                                <textarea
                                    name="extraDetailedInfo"
                                    value={formData.extraDetailedInfo}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-emerald-500 outline-none transition-colors resize-none"
                                    placeholder="Provide additional details about your company, services, values, history, etc."
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Step 1: Page Information */}
                    {currentStep === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <h4 className="text-2xl font-semibold text-white mb-6">Page Information <span className="text-emerald-500">*</span></h4>
                            
                            {/* Add Page Input */}
                            <div className="flex gap-2 mb-6">
                                <input
                                    type="text"
                                    value={newPageTitle}
                                    onChange={(e) => setNewPageTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPage())}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                    placeholder="Enter page title (e.g. Home, About, Services)"
                                />
                                <button
                                    type="button"
                                    onClick={addPage}
                                    disabled={!newPageTitle.trim()}
                                    className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Page
                                </button>
                            </div>

                            {/* Pages List */}
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {formData.pages.map((page, index) => (
                                        <motion.div
                                            key={page.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="bg-white/5 border border-white/10 rounded-xl p-6"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <label className="block text-sm text-slate-400 mb-2">Page Title <span className="text-emerald-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={page.title}
                                                        onChange={(e) => updatePage(page.id, 'title', e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none transition-colors"
                                                        placeholder="Page title"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removePage(page.id)}
                                                    className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-slate-400 mb-2">Page Information <span className="text-emerald-500">*</span></label>
                                                <textarea
                                                    value={page.information}
                                                    onChange={(e) => updatePage(page.id, 'information', e.target.value)}
                                                    rows={4}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-emerald-500 outline-none transition-colors resize-none"
                                                    placeholder="Describe what should be on this page, content, sections, features, etc."
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                
                                {formData.pages.length === 0 && (
                                    <div className="text-center py-12 text-slate-500">
                                        <p>No pages added yet. Add a page above to get started.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Addons */}
                    {currentStep === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <h4 className="text-2xl font-semibold text-white mb-6">Addons (Optional)</h4>
                            
                            <div className="space-y-4">
                                <label className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-emerald-500/30 transition-colors cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="contactForm"
                                        checked={formData.contactForm}
                                        onChange={handleChange}
                                        className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                                    />
                                    <div className="flex-1">
                                        <h5 className="text-lg font-semibold text-white mb-2">Contact Form</h5>
                                        <p className="text-slate-400 text-sm">
                                            Add a contact form to your website for visitors to reach out directly.
                                        </p>
                                    </div>
                                </label>
                                
                                <label className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-emerald-500/30 transition-colors cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="bookingForm"
                                        checked={formData.bookingForm}
                                        onChange={handleChange}
                                        className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                                    />
                                    <div className="flex-1">
                                        <h5 className="text-lg font-semibold text-white mb-2">Booking Form</h5>
                                        <p className="text-slate-400 text-sm">
                                            Add a booking/appointment scheduling form to your website.
                                        </p>
                                    </div>
                                </label>
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
