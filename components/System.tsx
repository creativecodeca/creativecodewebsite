import React, { useState, useEffect, useRef } from 'react';
import { Lock, Sparkles, Github, Zap, CheckCircle, XCircle, ExternalLink, Globe, Calendar, RefreshCw, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import WebsiteGeneratorForm from './WebsiteGeneratorForm';

const System: React.FC = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [savedSites, setSavedSites] = useState<any[]>([]);
    const [loadingSites, setLoadingSites] = useState(true);

    // Check if already authenticated
    useEffect(() => {
        const auth = sessionStorage.getItem('system_authenticated');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // Load saved sites when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadSavedSites();
            // Refresh sites every 30 seconds
            const interval = setInterval(loadSavedSites, 30000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    const loadSavedSites = async () => {
        try {
            setLoadingSites(true);
            const response = await fetch('/api/get-sites');
            if (response.ok) {
                const data = await response.json();
                setSavedSites(data.sites || []);
            }
        } catch (error) {
            console.error('Failed to load saved sites:', error);
        } finally {
            setLoadingSites(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate a brief delay for better UX
        setTimeout(() => {
            if (password === 'Portalex') {
                setIsAuthenticated(true);
                sessionStorage.setItem('system_authenticated', 'true');
                setPassword('');
            } else {
                setError('Incorrect password. Please try again.');
                setPassword('');
            }
            setIsLoading(false);
        }, 300);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('system_authenticated');
        setPassword('');
        setError('');
    };

    if (!isAuthenticated) {
        return (
            <>
                <Helmet>
                    <title>System Portal | Creative Code</title>
                    <meta name="robots" content="noindex, nofollow" />
                    <meta name="googlebot" content="noindex, nofollow" />
                </Helmet>
                <div className="min-h-screen bg-[#020202] flex items-center justify-center px-6">
                <div className="max-w-md w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                    >
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">System Portal</h1>
                            <p className="text-slate-400">Enter password to access</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    autoFocus
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 transition-colors"
                                    disabled={isLoading}
                                />
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading || !password}
                                className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="w-4 h-4" />
                                        Access System
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>System Portal | Creative Code</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex, nofollow" />
                <meta name="description" content="Creative Code System Portal - AI Website Generator" />
            </Helmet>
            <div className="min-h-screen bg-[#020202] text-slate-200">
            {/* Header */}
            <header className="border-b border-white/10 bg-[#0a0a0a]/60 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">System Portal</h1>
                            <p className="text-xs text-slate-400">AI Website Generator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-sm"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">Total Sites</p>
                                <p className="text-2xl font-bold text-white">{savedSites.length}</p>
                            </div>
                            <Globe className="w-8 h-8 text-emerald-500/50" />
                        </div>
                    </div>
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">Live Sites</p>
                                <p className="text-2xl font-bold text-white">
                                    {savedSites.filter(s => s.vercelUrl).length}
                                </p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-emerald-500/50" />
                        </div>
                    </div>
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm mb-1">Pending</p>
                                <p className="text-2xl font-bold text-white">
                                    {savedSites.filter(s => !s.vercelUrl).length}
                                </p>
                            </div>
                            <Clock className="w-8 h-8 text-slate-500/50" />
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Website Generator Form (2/3 width) */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-white mb-2">Generate New Website</h2>
                            <p className="text-slate-400">
                                Create a professional website with AI-powered generation
                            </p>
                        </div>
                        <WebsiteGeneratorForm 
                            onSiteGenerated={loadSavedSites}
                        />
                    </div>

                    {/* Right: Live Websites (1/3 width) */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-white">Live Websites</h3>
                                <button
                                    onClick={loadSavedSites}
                                    disabled={loadingSites}
                                    className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
                                    title="Refresh"
                                >
                                    <RefreshCw className={`w-4 h-4 ${loadingSites ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                            
                            {loadingSites && savedSites.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3"></div>
                                    <p className="text-slate-400 text-sm">Loading...</p>
                                </div>
                            ) : savedSites.length === 0 ? (
                                <div className="text-center py-8">
                                    <Globe className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                                    <p className="text-slate-400 text-sm">No sites yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                                    {savedSites.map((site) => (
                                        <motion.div
                                            key={site.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-emerald-500/30 transition-colors"
                                        >
                                            <div className="mb-3">
                                                <h4 className="text-white font-semibold text-sm mb-1 truncate">{site.companyName}</h4>
                                                {site.industry && (
                                                    <p className="text-slate-500 text-xs truncate">{site.industry}</p>
                                                )}
                                            </div>
                                            
                                            <div className="space-y-2">
                                                {site.vercelUrl ? (
                                                    <>
                                                        <a
                                                            href={site.vercelUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg px-3 py-2 text-xs hover:bg-emerald-500/30 transition-colors"
                                                        >
                                                            <Globe className="w-3 h-3 flex-shrink-0" />
                                                            <span className="truncate flex-1">Live Site</span>
                                                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                                        </a>
                                                        <button
                                                            onClick={() => {
                                                                // Trigger AI Edit from WebsiteGeneratorForm
                                                                const event = new CustomEvent('openAIEdit', {
                                                                    detail: {
                                                                        repoUrl: site.repoUrl,
                                                                        vercelUrl: site.vercelUrl,
                                                                        companyName: site.companyName
                                                                    }
                                                                });
                                                                window.dispatchEvent(event);
                                                            }}
                                                            className="flex items-center gap-2 w-full bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg px-3 py-2 text-xs hover:bg-purple-500/30 transition-colors"
                                                        >
                                                            <Sparkles className="w-3 h-3 flex-shrink-0" />
                                                            <span className="truncate flex-1">AI Edit</span>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-slate-500 text-xs px-3 py-2 bg-white/5 rounded-lg">
                                                        <Clock className="w-3 h-3" />
                                                        <span>Pending</span>
                                                    </div>
                                                )}
                                                
                                                <a
                                                    href={site.repoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 w-full bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2 text-xs hover:bg-white/10 transition-colors"
                                                >
                                                    <Github className="w-3 h-3 flex-shrink-0" />
                                                    <span className="truncate flex-1">GitHub</span>
                                                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                                </a>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
        </>
    );
};

export default System;

