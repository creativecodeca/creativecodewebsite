import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowRight, ArrowLeft, Plus, X, Loader2, CheckCircle, XCircle, Github, ExternalLink, Trash2, Copy, Check, Search, MapPin, History, Clock, Sparkles, RefreshCw } from 'lucide-react';
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
    
    // Quality Tier
    qualityTier: 'mockup' | 'production' | 'production-seo';
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
        qualityTier: 'mockup',
    });

    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 4; // General Info, Pages, Addons, Quality Tier
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [generationResult, setGenerationResult] = useState<{
        repoUrl?: string;
        vercelUrl?: string;
        projectUrl?: string;
        error?: string;
    } | null>(null);
    const [generationProgress, setGenerationProgress] = useState<{
        step: number;
        message: string;
        percentage: number;
    }>({
        step: 0,
        message: '',
        percentage: 0
    });

    const [newPageTitle, setNewPageTitle] = useState('');
    const [copied, setCopied] = useState(false);
    const [gmbUrl, setGmbUrl] = useState('');
    const [isFetchingGmb, setIsFetchingGmb] = useState(false);
    const [gmbUrlError, setGmbUrlError] = useState('');
    const [showHistory, setShowHistory] = useState(false);
    const [generationHistory, setGenerationHistory] = useState<Array<{
        id: string;
        timestamp: number;
        companyName: string;
        status: 'success' | 'failed';
        error?: string;
        repoUrl?: string;
        vercelUrl?: string;
        projectUrl?: string;
        formData?: FormData; // Store full form data for regeneration
        githubExists?: boolean;
        vercelDeployed?: boolean;
        vercelStatus?: string;
    }>>([]);
    const [editingSite, setEditingSite] = useState<{
        id: string;
        repoUrl: string;
        vercelUrl?: string;
        companyName: string;
    } | null>(null);
    const [editPrompt, setEditPrompt] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editProgress, setEditProgress] = useState<{ message: string; percentage: number }>({ message: '', percentage: 0 });
    const formContainerRef = useRef<HTMLDivElement>(null);

    // Load history from server API on mount
    useEffect(() => {
        const loadHistory = async () => {
            try {
                const response = await fetch('/api/get-sites');
                if (response.ok) {
                    const data = await response.json();
                    const sites = data.sites || [];
                    
                    // Convert to history format
                    const historyItems = sites.map((site: any) => ({
                        id: site.id,
                        timestamp: new Date(site.createdAt).getTime(),
                        companyName: site.companyName,
                        status: site.status || (site.vercelDeployed ? 'success' : 'failed'),
                        repoUrl: site.repoUrl,
                        vercelUrl: site.vercelDeployed ? site.vercelUrl : undefined,
                        projectUrl: site.projectUrl,
                        error: site.error,
                        formData: site.formData,
                        // Add status indicators
                        githubExists: site.githubExists,
                        vercelDeployed: site.vercelDeployed,
                        vercelStatus: site.vercelStatus
                    }));
                    
                    console.log('Loaded sites from server:', historyItems.length);
                    setGenerationHistory(historyItems);
                } else {
                    console.error('Failed to load sites from server');
                    setGenerationHistory([]);
                }
            } catch (e) {
                console.error('Error loading sites:', e);
                setGenerationHistory([]);
            }
        };
        
        loadHistory();
    }, []);

    // Save generation to history (server-side)
    const saveToHistory = async (result: {
        repoUrl?: string;
        vercelUrl?: string;
        projectUrl?: string;
        error?: string;
    }) => {
        try {
            // Save to server
            const response = await fetch('/api/save-site', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    companyName: formData.companyName,
                    repoUrl: result.repoUrl,
                    vercelUrl: result.vercelUrl,
                    projectUrl: result.projectUrl,
                    industry: formData.industry,
                    status: result.error ? 'failed' : 'success',
                    error: result.error,
                    formData: { ...formData }
                })
            });

            if (response.ok) {
                console.log('Site saved to server successfully');
                // Reload history from server to get updated status
                const historyResponse = await fetch('/api/get-sites');
                if (historyResponse.ok) {
                    const data = await historyResponse.json();
                    const sites = data.sites || [];
                    const historyItems = sites.map((site: any) => ({
                        id: site.id,
                        timestamp: new Date(site.createdAt).getTime(),
                        companyName: site.companyName,
                        status: site.status || (site.vercelDeployed ? 'success' : 'failed'),
                        repoUrl: site.repoUrl,
                        vercelUrl: site.vercelDeployed ? site.vercelUrl : undefined,
                        projectUrl: site.projectUrl,
                        error: site.error,
                        formData: site.formData,
                        githubExists: site.githubExists,
                        vercelDeployed: site.vercelDeployed,
                        vercelStatus: site.vercelStatus
                    }));
                    setGenerationHistory(historyItems);
                }
            } else {
                console.error('Failed to save site to server');
            }
        } catch (e) {
            console.error('Error saving site to server:', e);
        }
    };

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

    const isValidUrl = (url: string): boolean => {
        if (!url.trim()) return false;
        try {
            const urlObj = new URL(url.trim());
            // Check if it's http or https
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    };

    const handleGmbUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setGmbUrl(value);
        
        // Clear error if field is empty (optional field)
        if (!value.trim()) {
            setGmbUrlError('');
            return;
        }
        
        // Validate URL
        if (!isValidUrl(value)) {
            setGmbUrlError('Please enter a valid URL (must start with http:// or https://)');
        } else {
            setGmbUrlError('');
        }
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
            case 3: // Quality Tier (required)
                return formData.qualityTier !== undefined;
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
        
        // Validate URL before fetching
        if (!isValidUrl(gmbUrl)) {
            setGmbUrlError('Please enter a valid URL (must start with http:// or https://)');
            return;
        }

        setIsFetchingGmb(true);
        setGmbUrlError(''); // Clear any previous errors
        try {
            const response = await fetch('/api/fetch-gmb-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gmbUrl: gmbUrl.trim() }),
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                const text = await response.text();
                throw new Error(`Server error: ${text || 'Invalid response'}`);
            }

            if (!response.ok) {
                // Handle API error response
                const errorMsg = data?.error || `Server returned ${response.status}`;
                throw new Error(errorMsg);
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

                // Show success message
                console.log('GMB information fetched successfully');
            } else if (data.success === false) {
                // Handle case where API returns success: false
                throw new Error(data.error || 'Failed to extract GMB information');
            }
        } catch (error: any) {
            console.error('Error fetching GMB info:', error);
            const errorMessage = error.message || 'Unknown error occurred';
            alert(`Failed to fetch GMB information: ${errorMessage}\n\nPlease verify the URL is correct and accessible, or enter the information manually.`);
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
        setIsSubmitted(true); // Show progress screen immediately
        
        // Set initial progress - will update based on actual backend progress
        setGenerationProgress({ step: 1, message: 'Generating design plan...', percentage: 10 });
        
        try {
            // Use fetch with streaming to read SSE events
            const response = await fetch('/api/generate-website', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Failed to generate website' }));
                throw new Error(errorData.error || 'Failed to generate website');
            }

            // Read SSE stream
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            if (!reader) {
                throw new Error('Failed to read response stream');
            }

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Keep incomplete line in buffer

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            
                            // Handle progress updates
                            if (data.step !== undefined && data.message && data.percentage !== undefined) {
                                setGenerationProgress({
                                    step: data.step,
                                    message: data.message,
                                    percentage: data.percentage
                                });
                            }
                            
                            // Handle errors
                            if (data.success === false && data.error) {
                                setGenerationResult({ error: data.error });
                                setGenerationProgress({ step: 0, message: 'Error occurred', percentage: 0 });
                                await saveToHistory({ error: data.error });
                                return;
                            }
                            
                            // Handle final result
                            if (data.success !== false && data.repoUrl) {
                                setGenerationResult({
                                    repoUrl: data.repoUrl,
                                    vercelUrl: data.vercelUrl,
                                    projectUrl: data.projectUrl,
                                });
                                
                                // Save to history (server-side)
                                await saveToHistory({
                                    repoUrl: data.repoUrl,
                                    vercelUrl: data.vercelUrl,
                                    projectUrl: data.projectUrl,
                                });
                                
                                // History is saved via saveToHistory above
                                    if (onSiteGenerated) {
                                        onSiteGenerated();
                                    }
                                } catch (saveError) {
                                    console.error('Failed to save site to dashboard:', saveError);
                                    // Don't block the user if saving fails
                                }
                            }
                        } catch (e) {
                            // Ignore parse errors for malformed SSE messages
                        }
                    }
                }
            }
        } catch (err: any) {
            console.error('Generation failed:', err);
            const errorMessage = err.message || 'Something went wrong. Please try again.';
            setGenerationResult({ error: errorMessage });
            setGenerationProgress({ step: 0, message: 'Error occurred', percentage: 0 });
            
            // Save failed attempt to history
            await saveToHistory({ error: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    // Show progress screen when submitting
    if (isSubmitting || (isSubmitted && !generationResult?.error && !generationResult?.repoUrl)) {
        return (
            <div className="mt-12 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12">
                <div className="text-center max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Generating Your Website</h3>
                    <p className="text-slate-400 mb-8">{generationProgress.message || 'Starting generation...'}</p>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
                        <motion.div
                            className="h-full bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${generationProgress.percentage}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                    
                    <div className="space-y-3 text-left max-w-md mx-auto">
                        <div className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                            generationProgress.step >= 1 ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/5 border border-white/10'
                        }`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                generationProgress.step >= 1 ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400'
                            }`}>
                                {generationProgress.step > 1 ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : generationProgress.step === 1 ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <span className="text-sm font-bold">1</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className={`font-medium ${generationProgress.step >= 1 ? 'text-white' : 'text-slate-400'}`}>
                                    Generating Design Plan
                                </p>
                                <p className="text-xs text-slate-500">Creating the overall design strategy and layout</p>
                            </div>
                        </div>
                        
                        <div className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                            generationProgress.step >= 2 ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/5 border border-white/10'
                        }`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                generationProgress.step >= 2 ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400'
                            }`}>
                                {generationProgress.step > 6 ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : generationProgress.step >= 2 && generationProgress.step <= 6 ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <span className="text-sm font-bold">2</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className={`font-medium ${generationProgress.step >= 2 ? 'text-white' : 'text-slate-400'}`}>
                                    Creating Website Files
                                </p>
                                <p className="text-xs text-slate-500">
                                    {generationProgress.step === 2 ? 'Generating individual pages...' :
                                     generationProgress.step === 3 ? 'Applying consistency fixes...' :
                                     generationProgress.step === 4 ? 'Generating CSS...' :
                                     generationProgress.step === 5 ? 'Refining CSS...' :
                                     generationProgress.step === 6 ? 'Generating JavaScript...' :
                                     'Generating HTML, CSS, and JavaScript files'}
                                </p>
                            </div>
                        </div>
                        
                        <div className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                            generationProgress.step >= 7 ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/5 border border-white/10'
                        }`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                generationProgress.step >= 7 ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400'
                            }`}>
                                {generationProgress.step > 7 ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : generationProgress.step === 7 ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <span className="text-sm font-bold">3</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className={`font-medium ${generationProgress.step >= 7 ? 'text-white' : 'text-slate-400'}`}>
                                    Pushing to GitHub
                                </p>
                                <p className="text-xs text-slate-500">Creating repository and uploading files</p>
                            </div>
                        </div>
                        
                        <div className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                            generationProgress.step >= 8 ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/5 border border-white/10'
                        }`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                generationProgress.step >= 8 ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400'
                            }`}>
                                {generationProgress.step > 8 ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : generationProgress.step === 8 ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <span className="text-sm font-bold">4</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className={`font-medium ${generationProgress.step >= 8 ? 'text-white' : 'text-slate-400'}`}>
                                    Deploying to Vercel
                                </p>
                                <p className="text-xs text-slate-500">Setting up hosting and deployment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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

    // Show history view
    if (showHistory) {
        return (
            <div className="mt-12 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <History className="w-8 h-8 text-emerald-500" />
                        Previously Generated Sites
                    </h2>
                    <button
                        onClick={() => setShowHistory(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Form
                    </button>
                </div>

                {generationHistory.length === 0 ? (
                    <div className="text-center py-12">
                        <History className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                        <p className="text-slate-400">No previously generated sites yet.</p>
                        <p className="text-slate-500 text-sm mt-2">Your successfully generated websites will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {generationHistory.map((item) => (
                            <div
                                key={item.id}
                                className={`p-6 rounded-xl border ${
                                    item.status === 'success'
                                        ? 'bg-emerald-500/10 border-emerald-500/20'
                                        : 'bg-red-500/10 border-red-500/20'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {item.status === 'success' ? (
                                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-red-500" />
                                            )}
                                            <h3 className="text-lg font-semibold text-white">{item.companyName || 'Untitled Website'}</h3>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                item.status === 'success'
                                                    ? 'bg-emerald-500/20 text-emerald-400'
                                                    : 'bg-red-500/20 text-red-400'
                                            }`}>
                                                {item.status === 'success' ? 'Success' : 'Failed'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <Clock className="w-4 h-4" />
                                            <span>{item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Unknown date'}</span>
                                        </div>
                                    </div>
                                </div>

                                {item.status === 'failed' && item.error && (
                                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        <p className="text-sm text-red-400">{item.error}</p>
                                    </div>
                                )}

                                {item.status === 'success' && (
                                    <div className="flex flex-wrap gap-3">
                                        {item.vercelDeployed && item.vercelUrl ? (
                                            <>
                                                <a
                                                    href={item.vercelUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400 hover:bg-emerald-500/30 transition-colors text-sm"
                                                >
                                                    View Live Site
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                                {item.repoUrl && (
                                                    <button
                                                        onClick={() => setEditingSite({
                                                            id: item.id,
                                                            repoUrl: item.repoUrl!,
                                                            vercelUrl: item.vercelUrl,
                                                            companyName: item.companyName
                                                        })}
                                                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors text-sm"
                                                    >
                                                        <Sparkles className="w-4 h-4" />
                                                        AI Edit
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-400 text-sm">
                                                <Clock className="w-4 h-4" />
                                                {item.vercelStatus === 'building' ? 'Deployment in progress...' : 'Not currently deployed'}
                                            </div>
                                        )}
                                        {item.repoUrl && (
                                            <a
                                                href={item.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors text-sm"
                                            >
                                                <Github className="w-4 h-4" />
                                                GitHub
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                        {item.projectUrl && (
                                            <a
                                                href={item.projectUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors text-sm"
                                            >
                                                Vercel Dashboard
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                        {item.formData && (
                                            <button
                                                onClick={() => {
                                                    // Populate form with saved data
                                                    setFormData(item.formData!);
                                                    setCurrentStep(0);
                                                    setShowHistory(false);
                                                    // Scroll to top of form
                                                    setTimeout(() => {
                                                        formContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
                                                    }, 100);
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors text-sm"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                                Regenerate
                                            </button>
                                        )}
                                    </div>
                                )}
                                
                                {/* Show regenerate button for failed attempts too */}
                                {item.status === 'failed' && item.formData && (
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        <button
                                            onClick={() => {
                                                // Populate form with saved data
                                                setFormData(item.formData!);
                                                setCurrentStep(0);
                                                setShowHistory(false);
                                                // Scroll to top of form
                                                setTimeout(() => {
                                                    formContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
                                                }, 100);
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors text-sm"
                                        >
                                            <RefreshCw className="w-4 h-4" />
                                            Regenerate
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div ref={formContainerRef} className="mt-12 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Generate New Website</h3>
                    <p className="text-slate-400">Fill out the form below to generate a website with AI</p>
                </div>
                {generationHistory.length > 0 && (
                    <button
                        onClick={() => setShowHistory(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                        <History className="w-4 h-4" />
                        History ({generationHistory.length})
                    </button>
                )}
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
                                    <div className="flex-1">
                                        <input
                                            type="url"
                                            value={gmbUrl}
                                            onChange={handleGmbUrlChange}
                                            onBlur={(e) => {
                                                // Validate on blur as well
                                                if (e.target.value.trim() && !isValidUrl(e.target.value)) {
                                                    setGmbUrlError('Please enter a valid URL (must start with http:// or https://)');
                                                }
                                            }}
                                            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                                                gmbUrlError 
                                                    ? 'border-red-500 focus:border-red-500' 
                                                    : 'border-white/10 focus:border-emerald-500'
                                            }`}
                                            placeholder="https://www.google.com/maps/place/..."
                                        />
                                        {gmbUrlError && (
                                            <p className="text-red-400 text-xs mt-1 ml-1">{gmbUrlError}</p>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleFetchGmb}
                                        disabled={!gmbUrl.trim() || isFetchingGmb || !!gmbUrlError}
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

                    {/* Step 3: Quality Tier */}
                    {currentStep === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <h4 className="text-2xl font-semibold text-white mb-6">Select Quality Tier</h4>
                            
                            <div className="space-y-4">
                                <label className={`flex items-start gap-4 p-6 bg-white/5 border rounded-xl transition-all cursor-pointer group ${
                                    formData.qualityTier === 'mockup' 
                                        ? 'border-emerald-500 bg-emerald-500/10' 
                                        : 'border-white/10 hover:border-emerald-500/30'
                                }`}>
                                    <input
                                        type="radio"
                                        name="qualityTier"
                                        value="mockup"
                                        checked={formData.qualityTier === 'mockup'}
                                        onChange={(e) => setFormData({ ...formData, qualityTier: e.target.value as any })}
                                        className="mt-1 w-5 h-5 text-emerald-500 focus:ring-emerald-500"
                                    />
                                    <div className="flex-1">
                                        <h5 className="text-lg font-semibold text-white mb-2">Mock Up</h5>
                                        <p className="text-slate-400 text-sm">
                                            Quick generation for preview and testing. Basic design and functionality.
                                        </p>
                                    </div>
                                </label>
                                
                                <label className={`flex items-start gap-4 p-6 bg-white/5 border rounded-xl transition-all cursor-pointer group ${
                                    formData.qualityTier === 'production' 
                                        ? 'border-emerald-500 bg-emerald-500/10' 
                                        : 'border-white/10 hover:border-emerald-500/30'
                                }`}>
                                    <input
                                        type="radio"
                                        name="qualityTier"
                                        value="production"
                                        checked={formData.qualityTier === 'production'}
                                        onChange={(e) => setFormData({ ...formData, qualityTier: e.target.value as any })}
                                        className="mt-1 w-5 h-5 text-emerald-500 focus:ring-emerald-500"
                                    />
                                    <div className="flex-1">
                                        <h5 className="text-lg font-semibold text-white mb-2">Production Ready</h5>
                                        <p className="text-slate-400 text-sm">
                                            Professional quality with AI refinement for design, imagery, copywriting, consistency, and functionality.
                                        </p>
                                    </div>
                                </label>
                                
                                <label className={`flex items-start gap-4 p-6 bg-white/5 border rounded-xl transition-all cursor-pointer group ${
                                    formData.qualityTier === 'production-seo' 
                                        ? 'border-emerald-500 bg-emerald-500/10' 
                                        : 'border-white/10 hover:border-emerald-500/30'
                                }`}>
                                    <input
                                        type="radio"
                                        name="qualityTier"
                                        value="production-seo"
                                        checked={formData.qualityTier === 'production-seo'}
                                        onChange={(e) => setFormData({ ...formData, qualityTier: e.target.value as any })}
                                        className="mt-1 w-5 h-5 text-emerald-500 focus:ring-emerald-500"
                                    />
                                    <div className="flex-1">
                                        <h5 className="text-lg font-semibold text-white mb-2">Production Ready + SEO</h5>
                                        <p className="text-slate-400 text-sm">
                                            Everything in Production Ready, plus rigorous SEO optimization for maximum search engine visibility.
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
                        {currentStep === totalSteps - 1 ? (
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
