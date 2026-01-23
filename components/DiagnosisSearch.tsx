import React, { useState } from 'react';
import { Send, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagnosisSearchProps {
  onNavigate: (nodeId: string) => void;
}

const DiagnosisSearch: React.FC<DiagnosisSearchProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ nodeId: string; label: string; confidence: number } | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/diagnosis-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to search');
      }

      const data = await response.json();
      
      if (data.nodeId && data.label) {
        setResult({
          nodeId: data.nodeId,
          label: data.label,
          confidence: data.confidence || 0.8,
        });
      } else {
        setError('No matching issue found. Try rephrasing your problem.');
      }
    } catch (err: any) {
      setError(err.message || 'Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToNode = () => {
    if (result) {
      onNavigate(result.nodeId);
      // Clear search after navigation
      setTimeout(() => {
        setQuery('');
        setResult(null);
      }, 500);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResult(null);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed top-24 left-6 z-50 flex flex-col max-w-md">
      {/* Search Input with embedded send button */}
      <motion.div 
        className="bg-black/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/10 p-3 w-96"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your business problem..."
            className="flex-1 text-sm bg-transparent border-none outline-none text-white placeholder-gray-500 py-2"
            disabled={isLoading}
          />
          
          {/* Clear button (when there's text and not loading) */}
          {query && !isLoading && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-200 transition-colors p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {/* Send button / Loading spinner */}
          <button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="p-2 rounded-md text-white hover:bg-white/10 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            aria-label="Search"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          Use AI to find the most relevant business issue
        </p>
      </motion.div>

      {/* Results/Error Display */}
      <AnimatePresence>
        {(result || error) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className={`
              mt-3 p-4 rounded-lg shadow-lg backdrop-blur-sm border
              ${result ? 'bg-green-950/95 border-green-500/30' : 'bg-red-950/95 border-red-500/30'}
            `}
          >
            {result && (
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-sm font-semibold text-green-200">Found:</p>
                    <p className="text-sm text-green-300 mt-1">{result.label}</p>
                  </div>
                  <button
                    onClick={handleClear}
                    className="text-green-400 hover:text-green-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {result.confidence > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-green-400">
                      Confidence: {Math.round(result.confidence * 100)}%
                    </p>
                    <div className="w-full bg-green-900/50 rounded-full h-1.5 mt-1">
                      <div
                        className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleGoToNode}
                  className="w-full px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Go to Issue
                </button>
              </div>
            )}
            {error && (
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-red-300">{error}</p>
                <button
                  onClick={handleClear}
                  className="text-red-400 hover:text-red-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiagnosisSearch;
