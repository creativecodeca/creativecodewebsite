import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  show: boolean;
  x: number;
  y: number;
  message?: string;
}

export const DemoTooltip: React.FC<TooltipProps> = ({ show, x, y, message = "This is a demo site" }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed z-[10000] pointer-events-none -translate-x-1/2 -translate-y-[calc(100%+10px)]"
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-2xl text-sm font-medium whitespace-nowrap">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface BlockedLinkProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  href?: string;
}

export const BlockedLink: React.FC<BlockedLinkProps> = ({ children, onClick, className = '', href = '#' }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </a>
  );
};

export const BlockedButton: React.FC<BlockedLinkProps> = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      type="button"
    >
      {children}
    </button>
  );
};

// Placeholder image generator using gradients
export const GradientPlaceholder: React.FC<{ 
  gradient: string; 
  className?: string;
  children?: React.ReactNode;
}> = ({ gradient, className = '', children }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} ${className}`}>
      {children}
    </div>
  );
};

// Generate avatar placeholder with initials
export const AvatarPlaceholder: React.FC<{ 
  initials: string; 
  gradient: string;
  className?: string;
}> = ({ initials, gradient, className = '' }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold ${className}`}>
      {initials}
    </div>
  );
};
