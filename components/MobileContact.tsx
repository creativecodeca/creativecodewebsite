import React from 'react';
import { motion } from 'framer-motion';

const MobileContact: React.FC = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/resources/creativecodecontact.vcf';
        link.download = 'Creative-Code-Contact.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 sm:p-6 overflow-hidden relative">
            <motion.div
                initial={{ rotateX: 15, rotateY: -10, opacity: 0, scale: 0.95 }}
                animate={{ rotateX: 0, rotateY: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", type: "spring", stiffness: 60 }}
                onClick={handleDownload}
                className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[1.586/1] cursor-pointer"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
                {/* Card Container - Sleek Black Design */}
                <div className="relative w-full h-full rounded-[20px] bg-gradient-to-br from-[#0a0a0a] via-[#000000] to-[#0a0a0a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8 group hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.98),0_0_0_1px_rgba(255,255,255,0.15)]">

                    {/* Realistic Glossy Shine - Top Left */}
                    <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent opacity-100 pointer-events-none" />

                    {/* Subtle Edge Highlight */}
                    <div className="absolute inset-0 rounded-[20px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(0,0,0,0.5)] pointer-events-none" />

                    {/* Logo - Properly Scaled */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 mb-4 sm:mb-6 flex items-center justify-center flex-shrink-0"
                    >
                        <img
                            src="https://storage.googleapis.com/msgsndr/rpTHZGMl1DRkn0TYGHwe/media/69251cd0b2875758c843f88e.png"
                            alt="Creative Code Logo"
                            className="w-full h-full object-contain relative z-10 drop-shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
                        />
                    </motion.div>

                    {/* Company Name */}
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 relative z-10"
                    >
                        Creative Code
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-slate-400 text-xs sm:text-sm font-medium tracking-widest uppercase mb-6 sm:mb-8 relative z-10"
                    >
                        Digital Agency
                    </motion.p>

                    {/* Contact Info Text - No Buttons */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.8 }}
                        className="flex flex-col items-center gap-2 relative z-10 text-center"
                    >
                        <p className="text-slate-300 text-xs sm:text-sm font-medium">+1 (888) 977-5027</p>
                        <p className="text-slate-400 text-xs sm:text-sm">info@creativecodeca.com</p>
                        <p className="text-slate-500 text-[10px] sm:text-xs mt-2 italic">Tap to save contact</p>
                    </motion.div>

                    {/* Subtle Bottom Shine */}
                    <div className="absolute bottom-0 right-0 w-[40%] h-[30%] bg-gradient-to-tl from-white/[0.03] to-transparent opacity-100 pointer-events-none" />
                </div>
            </motion.div>
        </div>
    );
};

export default MobileContact;
