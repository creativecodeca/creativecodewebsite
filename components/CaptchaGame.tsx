import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CaptchaGameProps {
    onSuccess: () => void;
}

const CaptchaGame: React.FC<CaptchaGameProps> = ({ onSuccess }) => {
    const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
    const [clicks, setClicks] = useState(0);
    const [dashSpeed, setDashSpeed] = useState(1.5);
    const [isCompleted, setIsCompleted] = useState(false);
    const maxClicks = 3;

    // Continuous movement (auto‑move every 1.5s)
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isCompleted) {
                const newX = Math.random() * 70 + 15; // 15‑85%
                const newY = Math.random() * 60 + 20; // 20‑80%
                setTargetPosition({ x: newX, y: newY });
                setDashSpeed(1.5);
            }
        }, 1500);
        return () => clearInterval(interval);
    }, [isCompleted]);

    const handleTargetClick = () => {
        const newClicks = clicks + 1;
        setClicks(newClicks);

        if (newClicks >= maxClicks) {
            // Third click – pop and disappear instantly
            setIsCompleted(true);
            launchGreenExplosion();
            setTimeout(() => onSuccess(), 500);
            return; // stop further dash
        }

        // First two clicks – dash away quickly
        const newX = Math.random() * 70 + 15;
        const newY = Math.random() * 60 + 20;
        setTargetPosition({ x: newX, y: newY });
        setDashSpeed(0.2);
    };

    const launchGreenExplosion = () => {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '50%';
        container.style.top = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9999';
        document.body.appendChild(container);

        const greenColors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];
        for (let i = 0; i < 60; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 10 + 5;
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = greenColors[Math.floor(Math.random() * greenColors.length)];
            particle.style.borderRadius = '50%';
            particle.style.opacity = '1';
            particle.style.boxShadow = `0 0 ${size * 3}px ${greenColors[Math.floor(Math.random() * greenColors.length)]}`;
            container.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 60;
            const velocity = Math.random() * 250 + 150;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.animate(
                [
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 },
                ],
                { duration: 1200, easing: 'cubic-bezier(0, .9, .57, 1)' }
            );
        }
        setTimeout(() => document.body.removeChild(container), 1200);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col justify-center"
        >
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-4 text-center">
                Verify you're human
            </h2>
            <p className="text-slate-400 text-center mb-8">Click the green dot {maxClicks} times</p>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mb-8">
                {[...Array(maxClicks)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all ${i < clicks ? 'bg-emerald-500 scale-110' : 'bg-white/20'}`}
                    />
                ))}
            </div>

            {/* Game Area */}
            <div className="relative w-full max-w-2xl mx-auto h-80 bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                <motion.button
                    onClick={handleTargetClick}
                    className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer interactable"
                    animate={{
                        left: `${targetPosition.x}%`,
                        top: `${targetPosition.y}%`,
                        scale: isCompleted ? 1.5 : 1,
                        opacity: isCompleted ? 0 : 1,
                    }}
                    transition={{
                        left: { duration: dashSpeed, ease: 'easeOut' },
                        top: { duration: dashSpeed, ease: 'easeOut' },
                        scale: { duration: 0.15, ease: 'easeOut' },
                        opacity: { duration: 0.15 },
                    }}
                >
                    <div className="w-full h-full rounded-full bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.6)] relative">
                        <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    </div>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default CaptchaGame;
