import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

const MobileContact: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ rotateX: 20, rotateY: -20, opacity: 0, scale: 0.9 }}
                animate={{ rotateX: 0, rotateY: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", type: "spring", stiffness: 50 }}
                className="relative w-full max-w-[400px] aspect-[1.58/1] perspective-1000"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Card Container */}
                <div className="relative w-full h-full rounded-2xl bg-[#111] border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col items-center justify-center p-8 group hover:scale-[1.02] transition-transform duration-500">

                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                    {/* Logo */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="relative z-10 w-24 h-24 mb-6 flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full opacity-50 animate-pulse" />
                        <img
                            src="https://storage.googleapis.com/msgsndr/rpTHZGMl1DRkn0TYGHwe/media/69251cd0b2875758c843f88e.png"
                            alt="Creative Code Logo"
                            className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Company Name */}
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="text-2xl font-bold text-white tracking-tight mb-1 relative z-10"
                    >
                        Creative Code
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="text-slate-400 text-sm font-medium tracking-widest uppercase mb-8 relative z-10"
                    >
                        Digital Agency
                    </motion.p>

                    {/* Contact Icons Row */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        className="flex items-center gap-6 relative z-10"
                    >
                        <a href="tel:+18889775027" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
                            <Phone className="w-4 h-4" />
                        </a>
                        <a href="mailto:info@creativecodeca.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
                            <Mail className="w-4 h-4" />
                        </a>
                        <a href="https://creativecodeca.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
                            <Globe className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default MobileContact;
