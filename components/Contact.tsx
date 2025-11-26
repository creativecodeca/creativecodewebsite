import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle, X, Phone, MapPin, Mail, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import CaptchaGame from './CaptchaGame';

const Contact: React.FC = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        topic: '',
        additionalInfo: '',
        consentNonMarketing: false,
        consentMarketing: false,
    });

    const [countryCode, setCountryCode] = useState('+1');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaCompleted, setCaptchaCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const congratsRef = useRef<HTMLButtonElement>(null);
    const countryDropdownRef = useRef<HTMLDivElement>(null);
    const formContainerRef = useRef<HTMLDivElement>(null);

    // Country codes data
    const countryCodes = [
        { code: '+1', country: 'US/CA', flag: '🇺🇸' },
        { code: '+44', country: 'UK', flag: '🇬🇧' },
        { code: '+61', country: 'AU', flag: '🇦🇺' },
        { code: '+91', country: 'IN', flag: '🇮🇳' },
        { code: '+86', country: 'CN', flag: '🇨🇳' },
        { code: '+81', country: 'JP', flag: '🇯🇵' },
        { code: '+49', country: 'DE', flag: '🇩🇪' },
        { code: '+33', country: 'FR', flag: '🇫🇷' },
        { code: '+39', country: 'IT', flag: '🇮🇹' },
        { code: '+34', country: 'ES', flag: '🇪🇸' },
    ];

    // Wizard State
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 7; // Name, Email, Phone, Topic, Info, Consent, Captcha

    // Validation helpers
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone: string) => {
        // Remove all non-digit characters for validation
        const digitsOnly = phone.replace(/\D/g, '');
        // Accept 10-11 digits (US/Canada format)
        return digitsOnly.length >= 10 && digitsOnly.length <= 11;
    };

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target as Node)) {
                setIsCountryDropdownOpen(false);
            }
        };
        if (isDropdownOpen || isCountryDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen, isCountryDropdownOpen]);

    // Auto-scroll to form on step change (Mobile only)
    useEffect(() => {
        if (window.innerWidth < 768 && formContainerRef.current) {
            // Small delay to ensure DOM has updated
            setTimeout(() => {
                formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [currentStep]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as any;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Send email via backend API
    const sendEmail = async () => {
        const topicLabels: { [key: string]: string } = {
            website: 'Website Design',
            ads: 'Ad Campaigns',
            crm: 'CRM & Automation',
            ai: 'AI Chatbot',
            general: 'General Inquiry',
            other: 'Other',
        };
        const emailBody = `New Contact Form Submission\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nTopic: ${topicLabels[formData.topic] || formData.topic}\n\nAdditional Information:\n${formData.additionalInfo || 'N/A'}\n\nConsent (Non-Marketing): ${formData.consentNonMarketing ? 'Yes' : 'No'}\nConsent (Marketing): ${formData.consentMarketing ? 'Yes' : 'No'}`;
        try {
            const response = await fetch('http://creativecodeca.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    topic: formData.topic,
                    additionalInfo: formData.additionalInfo,
                    consentNonMarketing: formData.consentNonMarketing,
                    consentMarketing: formData.consentMarketing,
                    message: emailBody,
                }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return true;
        } catch (err) {
            console.error('Email API failed:', err);
            return false;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Do nothing - navigation is handled by Next/Continue buttons
        // This just prevents Enter key from submitting the form
    };

    const handleCaptchaSuccess = () => {
        setCaptchaCompleted(true);
        setShowCaptcha(false);
        // Auto-submit after captcha success
        setTimeout(() => {
            // Optimistic UI: Show success immediately
            setIsSubmitted(true);

            // Send email in background
            sendEmail();

            // Clear form fields
            setFormData({
                name: '',
                email: '',
                phone: '',
                topic: '',
                additionalInfo: '',
                consentNonMarketing: false,
                consentMarketing: false,
            });

            // Reset to first step for next submission
            setCurrentStep(0);
        }, 100);
    };

    // Confetti animation for the "Form Sent!" button
    const handleFormSentClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const container = document.createElement('div');
        container.style.position = 'absolute';
        // Calculate absolute position including scroll offset
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        container.style.left = `${rect.left + scrollX}px`;
        container.style.top = `${rect.top + scrollY}px`;
        container.style.width = `${rect.width}px`;
        container.style.height = `${rect.height}px`;
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9999';
        document.body.appendChild(container);

        const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#ffb400', '#ffda00', '#a0e7e5', '#b4f8c8'];
        const shapes = ['circle', 'square', 'star', 'triangle', 'ribbon'];

        // Increased particle count for richer effect
        for (let i = 0; i < 150; i++) {
            const piece = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 8 + 4;

            // Randomize start position across the entire button area
            const startX = Math.random() * rect.width;
            const startY = Math.random() * rect.height;

            piece.style.position = 'absolute';
            piece.style.left = `${startX}px`;
            piece.style.top = `${startY}px`;
            piece.style.width = `${size}px`;
            piece.style.height = `${size}px`;
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.opacity = '0.9';

            if (shape === 'circle') {
                piece.style.borderRadius = '50%';
            } else if (shape === 'square') {
                piece.style.borderRadius = '0%';
            } else if (shape === 'star') {
                piece.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
            } else if (shape === 'triangle') {
                piece.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            } else if (shape === 'ribbon') {
                const ribbonHeight = Math.random() * 12 + 8;
                piece.style.width = '2px';
                piece.style.height = `${ribbonHeight}px`;
            }

            // Initial state
            piece.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
            piece.style.transition = 'transform 1000ms ease-out, opacity 1000ms ease-out';
            container.appendChild(piece);

            requestAnimationFrame(() => {
                piece.getBoundingClientRect(); // Force reflow

                // Explode outwards from the particle's specific start position
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 100 + 50; // Slightly adjusted distance since we have a wider base
                const rotation = Math.random() * 720;

                piece.style.transform = `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) rotate(${rotation}deg)`;
                piece.style.opacity = '0';
            });
        }

        setTimeout(() => {
            document.body.removeChild(container);
        }, 1000);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="md:pt-48 md:pb-72 overflow-hidden flex flex-col pt-32 pb-48 relative justify-center">
                <ParticleCanvas />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#020202]/40 z-0 pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex hover:scale-105 transition-transform cursor-default text-xs font-medium text-slate-300 bg-white/5 border-white/10 border rounded-full mb-8 pt-2 pr-4 pb-2 pl-4 backdrop-blur-md gap-x-2 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        We're here to help
                    </div>
                    <h1 className="md:text-8xl leading-tight md:leading-[1.1] text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-8">
                        Let's Talk
                    </h1>
                    <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed px-4">
                        Ready to transform your business? Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="pb-20 px-6 relative z-20">
                <div className="max-w-3xl mx-auto -mt-24 md:-mt-48">
                    <div ref={formContainerRef} className="relative rounded-3xl bg-[rgba(20,20,20,0.6)] overflow-hidden shadow-2xl min-h-[500px] flex flex-col">
                        <div className="relative h-full rounded-[22px] border border-white/5 bg-[#0a0a0a] overflow-visible p-8 md:p-12 flex-1 flex flex-col">
                            {isSubmitted ? (
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <button
                                        ref={congratsRef}
                                        onClick={handleFormSentClick}
                                        className="w-full max-w-md bg-emerald-600 text-white h-14 px-10 rounded-full font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-[1.02] interactable"
                                    >
                                        Congrats! Form sent.
                                    </button>
                                    <p className="text-white mt-6 text-center max-w-md leading-relaxed">
                                        Thanks for reaching out! We've received your message and will get back to you shortly.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col">
                                    {/* Progress Bar */}
                                    <div className="w-full h-1 bg-white/10 rounded-full mb-12 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-emerald-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((currentStep + 1) / 6) * 100}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>

                                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col relative">
                                        <AnimatePresence mode="wait">
                                            {currentStep === 0 && (
                                                <motion.div
                                                    key="step0"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center"
                                                >
                                                    <label htmlFor="name" className="block text-2xl md:text-3xl font-medium text-white mb-6">
                                                        What's your name? <span className="text-emerald-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="field_1"
                                                        name="field_1"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                        autoFocus
                                                        autocomplete="new-password"
                                                        className="w-full bg-transparent border-b-2 border-white/20 text-3xl md:text-4xl py-4 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 transition-colors"
                                                        placeholder="John Doe"
                                                        onKeyDown={(e) => e.key === 'Enter' && formData.name && handleNext()}
                                                    />
                                                </motion.div>
                                            )}

                                            {currentStep === 1 && (
                                                <motion.div
                                                    key="step1"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center"
                                                >
                                                    <label htmlFor="email" className="block text-2xl md:text-3xl font-medium text-white mb-6">
                                                        What's your email address? <span className="text-emerald-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="field_2"
                                                        name="field_2"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                        autoFocus
                                                        autocomplete="new-password"
                                                        className="w-full bg-transparent border-b-2 border-white/20 text-3xl md:text-4xl py-4 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 transition-colors"
                                                        placeholder="john@example.com"
                                                        onKeyDown={(e) => e.key === 'Enter' && formData.email && isValidEmail(formData.email) && handleNext()}
                                                    />
                                                </motion.div>
                                            )}

                                            {currentStep === 2 && (
                                                <motion.div
                                                    key="step2"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center"
                                                >
                                                    <label htmlFor="phone" className="block text-2xl md:text-3xl font-medium text-white mb-6">
                                                        What's your phone number? <span className="text-emerald-500">*</span>
                                                    </label>
                                                    <div className="flex gap-3">
                                                        {/* Country Code Autocomplete */}
                                                        <div ref={countryDropdownRef} className="relative">
                                                            <input
                                                                type="text"
                                                                value={countryCode}
                                                                onChange={(e) => {
                                                                    setCountryCode(e.target.value);
                                                                    setIsCountryDropdownOpen(true);
                                                                }}
                                                                onFocus={() => setIsCountryDropdownOpen(true)}
                                                                className="w-24 md:w-32 px-2 md:px-4 py-4 bg-white/5 border-b-2 border-white/20 hover:border-white/30 focus:border-emerald-500 text-white text-xl md:text-3xl rounded-lg transition-colors outline-none"
                                                                placeholder="+1"
                                                            />

                                                            {isCountryDropdownOpen && (
                                                                <div className="absolute top-full left-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden min-w-[250px] max-h-[180px] overflow-y-auto">
                                                                    {countryCodes
                                                                        .filter(country =>
                                                                            country.code.includes(countryCode) ||
                                                                            country.country.toLowerCase().includes(countryCode.toLowerCase())
                                                                        )
                                                                        .map((country) => (
                                                                            <button
                                                                                key={country.code}
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    setCountryCode(country.code);
                                                                                    setIsCountryDropdownOpen(false);
                                                                                }}
                                                                                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3"
                                                                            >
                                                                                <span className="text-2xl">{country.flag}</span>
                                                                                <span className="text-lg font-medium">{country.code}</span>
                                                                                <span className="text-sm text-slate-400">{country.country}</span>
                                                                            </button>
                                                                        ))}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Phone Input */}
                                                        <input
                                                            type="text"
                                                            id="field_3"
                                                            name="field_3"
                                                            value={formData.phone}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                // Only allow numbers, spaces, parentheses, and dashes
                                                                const filtered = value.replace(/[^0-9\s\-()]/g, '');
                                                                setFormData(prev => ({ ...prev, phone: filtered }));
                                                            }}
                                                            autoFocus
                                                            autocomplete="new-password"
                                                            className="flex-1 bg-transparent border-b-2 border-white/20 text-2xl md:text-4xl py-4 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 transition-colors min-w-0"
                                                            placeholder="555 000 0000"
                                                            onKeyDown={(e) => e.key === 'Enter' && formData.phone && isValidPhone(formData.phone) && handleNext()}
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}

                                            {currentStep === 3 && (
                                                <motion.div
                                                    key="step3"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center"
                                                >
                                                    <label className="block text-2xl md:text-3xl font-medium text-white mb-8">
                                                        What can we help you with? <span className="text-emerald-500">*</span>
                                                    </label>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {[
                                                            { value: 'website', label: 'Website Design' },
                                                            { value: 'ads', label: 'Ad Campaigns' },
                                                            { value: 'crm', label: 'CRM & Automation' },
                                                            { value: 'ai', label: 'AI Chatbot' },
                                                            { value: 'general', label: 'General Inquiry' },
                                                            { value: 'other', label: 'Other' }
                                                        ].map((option) => (
                                                            <div
                                                                key={option.value}
                                                                onClick={() => setFormData(prev => ({ ...prev, topic: option.value }))}
                                                                className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.topic === option.value
                                                                    ? 'bg-emerald-500/20 border-emerald-500 text-white'
                                                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-medium">{option.label}</span>
                                                                    {formData.topic === option.value && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {currentStep === 4 && (
                                                <motion.div
                                                    key="step4"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center"
                                                >
                                                    <label htmlFor="additionalInfo" className="block text-2xl md:text-3xl font-medium text-white mb-6">
                                                        Anything else we should know?
                                                    </label>
                                                    <textarea
                                                        id="additionalInfo"
                                                        name="additionalInfo"
                                                        value={formData.additionalInfo}
                                                        onChange={handleChange}
                                                        autoFocus
                                                        rows={4}
                                                        className="w-full bg-transparent border-b-2 border-white/20 text-xl md:text-2xl py-4 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                                        placeholder="Tell us a bit more about your project..."
                                                    />
                                                </motion.div>
                                            )}

                                            {currentStep === 5 && (
                                                <motion.div
                                                    key="step5"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-1 flex flex-col justify-center"
                                                >
                                                    <label className="block text-2xl md:text-3xl font-medium text-white mb-8">
                                                        Just a couple checks... <span className="text-emerald-500">*</span>
                                                    </label>
                                                    <div className="space-y-6">
                                                        <div className="relative flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer group"
                                                            onClick={() => setFormData(prev => ({ ...prev, consentNonMarketing: !prev.consentNonMarketing }))}
                                                        >
                                                            <div className="relative flex items-center justify-center w-6 h-6 mt-0.5 shrink-0">
                                                                <input
                                                                    type="checkbox"
                                                                    id="consentNonMarketing"
                                                                    name="consentNonMarketing"
                                                                    checked={formData.consentNonMarketing}
                                                                    onChange={handleChange}
                                                                    className="sr-only"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />
                                                                <div className={`w-6 h-6 rounded-md border-2 transition-all ${formData.consentNonMarketing
                                                                    ? 'bg-emerald-500 border-emerald-500'
                                                                    : 'bg-transparent border-white/30 group-hover:border-emerald-500/50'
                                                                    }`}>
                                                                    {formData.consentNonMarketing && (
                                                                        <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <label htmlFor="consentNonMarketing" className="text-sm text-slate-300 leading-relaxed cursor-pointer flex-1">
                                                                I Consent to receive non‑marketing text messages from Creative Code about my order updates, appointment reminders etc. Message & data rates may apply.
                                                            </label>
                                                        </div>
                                                        <div className="relative flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer group"
                                                            onClick={() => setFormData(prev => ({ ...prev, consentMarketing: !prev.consentMarketing }))}
                                                        >
                                                            <div className="relative flex items-center justify-center w-6 h-6 mt-0.5 shrink-0">
                                                                <input
                                                                    type="checkbox"
                                                                    id="consentMarketing"
                                                                    name="consentMarketing"
                                                                    checked={formData.consentMarketing}
                                                                    onChange={handleChange}
                                                                    className="sr-only"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />
                                                                <div className={`w-6 h-6 rounded-md border-2 transition-all ${formData.consentMarketing
                                                                    ? 'bg-emerald-500 border-emerald-500'
                                                                    : 'bg-transparent border-white/30 group-hover:border-emerald-500/50'
                                                                    }`}>
                                                                    {formData.consentMarketing && (
                                                                        <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <label htmlFor="consentMarketing" className="text-sm text-slate-300 leading-relaxed cursor-pointer flex-1">
                                                                I consent to receive marketing text messages from Creative Code. Frequency may vary. Reply STOP to opt out.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="text-center pt-6">
                                                        <p className="text-xs text-slate-500">
                                                            <Link to="/privacy" className="hover:text-white transition-colors underline">Privacy Policy</Link>{' '}-{' '}
                                                            <Link to="/terms" className="hover:text-white transition-colors underline">Terms & Conditions</Link>
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {currentStep === 6 && (
                                                <CaptchaGame onSuccess={handleCaptchaSuccess} />
                                            )}
                                        </AnimatePresence>

                                        {/* Navigation Buttons */}
                                        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                className={`flex items-center gap-2 text-slate-400 hover:text-white transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                            >
                                                <ArrowLeft className="w-5 h-5" />
                                                Back
                                            </button>

                                            {currentStep === 6 ? (
                                                <div className="opacity-0 pointer-events-none">
                                                    {/* Hidden during captcha */}
                                                </div>
                                            ) : currentStep === 5 ? (
                                                <button
                                                    type="button"
                                                    onClick={handleNext}
                                                    disabled={!formData.consentNonMarketing}
                                                    className="bg-white text-black h-12 px-8 rounded-full font-bold hover:bg-slate-200 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Continue
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={handleNext}
                                                    disabled={
                                                        (currentStep === 0 && !formData.name) ||
                                                        (currentStep === 1 && (!formData.email || !isValidEmail(formData.email))) ||
                                                        (currentStep === 2 && (!formData.phone || !isValidPhone(formData.phone))) ||
                                                        (currentStep === 3 && !formData.topic)
                                                    }
                                                    className="bg-white text-black h-12 px-8 rounded-full font-bold hover:bg-slate-200 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Next
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <section id="booking" className="py-20 px-6 relative bg-[#050505] border-y border-white/10">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4 text-glow">Book a Meeting</h2>
                        <p className="text-slate-400">Schedule a time that works best for you</p>
                    </div>
                    <div className="w-full">
                        <div className="relative z-10 w-full max-w-3xl mx-auto" style={{ minHeight: '970px' }}>
                            <iframe
                                src="https://api.leadconnectorhq.com/widget/booking/lZdUtuT0ufJlVxYH6Sjn"
                                className="w-full rounded-lg"
                                style={{ height: '970px', border: 'none' }}
                                scrolling="no"
                                title="Book a Meeting"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Contact Info */}
            <section className="py-20 px-6 relative">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4 text-glow">Other Ways to Reach Us</h2>
                        <p className="text-slate-400">Prefer a different method? We're available through multiple channels.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Email Card */}
                        <div className="relative rounded-3xl bg-[rgba(20,20,20,0.6)] overflow-hidden shadow-2xl group hover:scale-[1.02] transition-transform duration-300">
                            <div className="relative h-full rounded-[22px] border border-white/5 bg-[#0a0a0a] overflow-hidden p-8 text-center">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-shadow duration-300">
                                    <Mail className="w-7 h-7 text-slate-300 group-hover:text-emerald-400 transition-colors duration-300" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Email Us</h3>
                                <a href="mailto:info@creativecodeca.com" className="text-white hover:underline">info@creativecodeca.com</a>
                            </div>
                        </div>

                        {/* Phone Card */}
                        <div className="relative rounded-3xl bg-[rgba(20,20,20,0.6)] overflow-hidden shadow-2xl group hover:scale-[1.02] transition-transform duration-300">
                            <div className="relative h-full rounded-[22px] border border-white/5 bg-[#0a0a0a] overflow-hidden p-8 text-center">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-shadow duration-300">
                                    <Phone className="w-7 h-7 text-slate-300 group-hover:text-emerald-400 transition-colors duration-300" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Call Us</h3>
                                <a href="tel:+18889775027" className="text-white hover:underline">+1 (888) 977-5027</a>
                            </div>
                        </div>

                        {/* Schedule Meeting Card */}
                        <div
                            className="relative rounded-3xl bg-[rgba(20,20,20,0.6)] overflow-hidden shadow-2xl group hover:scale-[1.02] transition-transform duration-300 cursor-pointer interactable"
                            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <div className="relative h-full rounded-[22px] border border-white/5 bg-[#0a0a0a] overflow-hidden p-8 text-center">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-shadow duration-300">
                                    <Calendar className="w-7 h-7 text-slate-300 group-hover:text-emerald-400 transition-colors duration-300" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Book a Meeting</h3>
                                <button className="text-white hover:underline">Schedule Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
