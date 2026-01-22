import React from 'react';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

interface AIModalProps {
  title: string;
  content: string;
  isLoading: boolean;
  onClose: () => void;
  x?: number;
  y?: number;
}

const AIModal: React.FC<AIModalProps> = ({ title, content, isLoading, onClose, x, y }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isPositioned, setIsPositioned] = React.useState(false);

  React.useEffect(() => {
    if (x !== undefined && y !== undefined && modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;
      
      let newX = x;
      let newY = y;

      // Center the modal on the cursor initially, but keep it within bounds
      newX = x - rect.width / 2;
      newY = y - rect.height / 2;

      // Adjust X if it goes off screen
      if (newX + rect.width > innerWidth - 20) {
        newX = innerWidth - rect.width - 20;
      }
      if (newX < 20) newX = 20;

      // Adjust Y if it goes off screen
      if (newY + rect.height > innerHeight - 20) {
        newY = innerHeight - rect.height - 20;
      }
      if (newY < 20) newY = 20;

      setCoords({ x: newX, y: newY });
      setIsPositioned(true);
    } else if (x === undefined || y === undefined) {
      // Default to center if no coordinates provided
      setIsPositioned(true);
    }
  }, [x, y, isLoading]); // Re-calculate when loading finishes and content size might change

  const positionStyle = x !== undefined && y !== undefined && isPositioned
    ? { left: coords.x, top: coords.y, transform: 'none' }
    : { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[110]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        ref={modalRef}
        className="fixed z-[111] w-full max-w-2xl h-[600px] max-h-[85vh] bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        style={positionStyle}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ 
          opacity: isPositioned ? 1 : 0, 
          scale: isPositioned ? 1 : 0.9, 
          y: isPositioned ? 0 : 20 
        }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <p className="text-gray-400 text-sm">Generating AI response...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                {content}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-white/10 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default AIModal;

