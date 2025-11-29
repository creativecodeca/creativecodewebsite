import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, Github, Zap, CheckCircle, XCircle, ExternalLink, Globe, Calendar } from 'lucide-react';
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
            const response = await fetch('/api/save-site');
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
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">Welcome to System</h2>
                    <p className="text-slate-400 text-lg">
                        Generate websites with AI, deploy to GitHub, and publish to Vercel.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
                        <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center justify-center mb-4">
                            <Sparkles className="w-6 h-6 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">AI Generation</h3>
                        <p className="text-slate-400 text-sm">
                            Generate complete websites using AI. Describe your vision and watch it come to life.
                        </p>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
                        <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                            <Github className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">GitHub Integration</h3>
                        <p className="text-slate-400 text-sm">
                            Automatically push generated code to GitHub repositories for version control.
                        </p>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Vercel Deployment</h3>
                        <p className="text-slate-400 text-sm">
                            Instantly deploy to Vercel with automatic builds and global CDN distribution.
                        </p>
                    </div>
                </div>

                {/* Previously Generated Sites */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-semibold text-white">Previously Generated Sites</h3>
                        <button
                            onClick={loadSavedSites}
                            disabled={loadingSites}
                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-sm disabled:opacity-50"
                        >
                            {loadingSites ? 'Loading...' : 'Refresh'}
                        </button>
                    </div>
                    
                    {loadingSites && savedSites.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-400">Loading sites...</p>
                        </div>
                    ) : savedSites.length === 0 ? (
                        <div className="text-center py-12">
                            <Globe className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400">No sites generated yet. Create your first website below!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {savedSites.map((site) => (
                                <motion.div
                                    key={site.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h4 className="text-white font-semibold mb-1 truncate">{site.companyName}</h4>
                                            {site.industry && (
                                                <p className="text-slate-400 text-xs mb-2">{site.industry}</p>
                                            )}
                                            <div className="flex items-center gap-1 text-slate-500 text-xs">
                                                <Calendar className="w-3 h-3" />
                                                <span>{new Date(site.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 mt-4">
                                        {site.vercelUrl ? (
                                            <a
                                                href={site.vercelUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg px-3 py-2 text-sm hover:bg-emerald-500/30 transition-colors"
                                            >
                                                <Globe className="w-4 h-4" />
                                                <span className="truncate flex-1">View Live Site</span>
                                                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-2 text-slate-500 text-xs px-3 py-2 bg-white/5 rounded-lg">
                                                <span>Pending deployment</span>
                                            </div>
                                        )}
                                        
                                        <a
                                            href={site.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 w-full bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span className="truncate flex-1">GitHub Repo</span>
                                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                        </a>
                                        
                                        {site.projectUrl && (
                                            <a
                                                href={site.projectUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 w-full bg-white/5 border border-white/10 text-slate-300 rounded-lg px-3 py-2 text-xs hover:bg-white/10 transition-colors"
                                            >
                                                <Zap className="w-3 h-3" />
                                                <span className="truncate flex-1">Vercel Dashboard</span>
                                                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Status Section */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 mb-12">
                    <h3 className="text-2xl font-semibold text-white mb-6">System Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                <span className="text-white">AI Generation Service</span>
                            </div>
                            <span className="text-emerald-500 text-sm font-medium">Online</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                <span className="text-white">GitHub API</span>
                            </div>
                            <span className="text-emerald-500 text-sm font-medium">Connected</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                <span className="text-white">Vercel Integration</span>
                            </div>
                            <span className="text-emerald-500 text-sm font-medium">Active</span>
                        </div>
                    </div>
                </div>

                {/* Website Generation Form */}
                <WebsiteGeneratorForm onSiteGenerated={loadSavedSites} />
            </main>
        </div>
        </>
    );
};

export default System;

