import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Lightbulb, GitBranch, DollarSign, Clock, Target } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onExplain: () => void;
  onSolve: () => void;
  onImpactAnalysis: () => void;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ 
  x, 
  y, 
  onExplain, 
  onSolve, 
  onImpactAnalysis,
  onClose 
}) => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState({ x, y });

  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;
      
      let newX = x;
      let newY = y;

      // Adjust X if it goes off screen
      if (x + rect.width > innerWidth) {
        newX = innerWidth - rect.width - 10;
      }
      if (newX < 10) newX = 10;

      // Adjust Y if it goes off screen
      if (y + rect.height > innerHeight) {
        newY = innerHeight - rect.height - 10;
      }
      if (newY < 10) newY = 10;

      setCoords({ x: newX, y: newY });
    }
  }, [x, y]);

  useEffect(() => {
    const handleClick = () => onClose();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop blur */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Context Menu */}
      <motion.div
        ref={menuRef}
        className="fixed z-[101] bg-black/95 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl overflow-hidden min-w-[220px]"
        style={{
          left: coords.x,
          top: coords.y,
        }}
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExplain();
          }}
          className="w-full px-4 py-3 flex items-center gap-3 text-left text-white hover:bg-white/10 transition-colors group"
        >
          <FileText className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
          <div>
            <div className="font-semibold text-sm">Explain Problem</div>
            <div className="text-xs text-gray-400">What this means</div>
          </div>
        </button>

        <div className="h-px bg-white/10" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSolve();
          }}
          className="w-full px-4 py-3 flex items-center gap-3 text-left text-white hover:bg-white/10 transition-colors group"
        >
          <Lightbulb className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
          <div>
            <div className="font-semibold text-sm">Get Solutions</div>
            <div className="text-xs text-gray-400">AI-powered fixes</div>
          </div>
        </button>

        <div className="h-px bg-white/10" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onImpactAnalysis();
          }}
          className="w-full px-4 py-3 flex items-center gap-3 text-left text-white hover:bg-white/10 transition-colors group"
        >
          <DollarSign className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
          <div>
            <div className="font-semibold text-sm">Impact Analysis</div>
            <div className="text-xs text-gray-400">Cost & severity</div>
          </div>
        </button>
      </motion.div>
    </>
  );
};

export default ContextMenu;

