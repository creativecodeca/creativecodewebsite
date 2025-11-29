import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, Github, Zap, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import WebsiteGeneratorForm from './WebsiteGeneratorForm';

const System: React.FC = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Check if already authenticated
    useEffect(() => {
        const auth = sessionStorage.getItem('system_authenticated');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

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

                {/* Status Section */}
                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8">
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
                <WebsiteGeneratorForm />
            </main>
        </div>
        </>
    );
};

export default System;

