import React, { useState } from 'react';
import { Search, Loader2, X } from 'lucide-react';
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
        throw new Error('Search failed');
      }

      const data = await response.json();
      
      if (data.nodeId) {
        setResult({
          nodeId: data.nodeId,
          label: data.label,
          confidence: data.confidence || 0,
        });
      } else {
        setError('No relevant issue found. Try rephrasing your query.');
      }
    } catch (err) {
      setError('Failed to search. Please try again.');
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
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="flex flex-col items-end gap-3">
        {/* Results/Error Display */}
        <AnimatePresence>
          {(result || error) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className={`
                max-w-sm p-4 rounded-lg shadow-lg backdrop-blur-sm border
                ${result ? 'bg-green-50/95 border-green-200' : 'bg-red-50/95 border-red-200'}
              `}
            >
              {result && (
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-sm font-semibold text-green-900">Found:</p>
                      <p className="text-sm text-green-800 mt-1">{result.label}</p>
                    </div>
                    <button
                      onClick={handleClear}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {result.confidence > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-green-600">
                        Confidence: {Math.round(result.confidence * 100)}%
                      </p>
                      <div className="w-full bg-green-200 rounded-full h-1.5 mt-1">
                        <div
                          className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
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
                  <p className="text-sm text-red-800">{error}</p>
                  <button
                    onClick={handleClear}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Input */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3 w-96">
          <div className="flex items-center gap-2 mb-2">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your business problem..."
              className="flex-1 text-sm bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
              disabled={isLoading}
            />
            {query && !isLoading && (
              <button
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleSearch}
              disabled={isLoading || !query.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Use AI to find the most relevant business issue
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DiagnosisSearch;

