import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, Loader2, RefreshCw, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdFormData {
  businessName: string;
  adMessage: string;
  targetAudience: string;
  style: string;
  aspectRatio: string;
  colorScheme: string;
  customColors: string[];
}

interface GeneratedAd {
  id: string;
  imageDataUrl: string;
  prompt: string;
  timestamp: number;
  formData: AdFormData;
  concept?: string; // AI-generated creative concept
}

const STYLES = [
  { id: 'modern', label: 'Modern & Minimal', emoji: '✨' },
  { id: 'bold', label: 'Bold & Vibrant', emoji: '🔥' },
  { id: 'professional', label: 'Professional', emoji: '💼' },
  { id: 'warm', label: 'Warm & Friendly', emoji: '☀️' },
];

const ASPECT_RATIOS = [
  { id: '4:5', label: 'Portrait (4:5)', description: 'Instagram/Facebook posts', emoji: '📱' },
  { id: '1:1', label: 'Square (1:1)', description: 'Universal social media', emoji: '⬛' },
  { id: '16:9', label: 'Landscape (16:9)', description: 'YouTube/Twitter banners', emoji: '🖼️' },
];

const COLOR_SCHEMES = [
  { id: 'vibrant', label: 'Vibrant & Colorful', emoji: '🌈' },
  { id: 'dark', label: 'Dark & Moody', emoji: '🌙' },
  { id: 'light', label: 'Light & Airy', emoji: '☁️' },
  { id: 'monochrome', label: 'Black & White', emoji: '⚫' },
];

const AdGenerator: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAds, setGeneratedAds] = useState<GeneratedAd[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [adConcept, setAdConcept] = useState<string>('');

  const [formData, setFormData] = useState<AdFormData>({
    businessName: '',
    adMessage: '',
    targetAudience: '',
    style: '',
    aspectRatio: '',
    colorScheme: '',
    customColors: [],
  });

  // Load saved ads from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('creativeCodeAds');
    if (saved) {
      try {
        const ads: GeneratedAd[] = JSON.parse(saved);
        // Filter out expired ads (older than 24 hours)
        const validAds = ads.filter(ad => Date.now() - ad.timestamp < 24 * 60 * 60 * 1000);
        setGeneratedAds(validAds);
        if (validAds.length !== ads.length) {
          localStorage.setItem('creativeCodeAds', JSON.stringify(validAds));
        }
      } catch (e) {
        console.error('Error loading saved ads:', e);
      }
    }
  }, []);

  const updateFormData = (field: keyof AdFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canAdvance = () => {
    if (currentQuestion === 1) return formData.businessName.trim().length > 0;
    if (currentQuestion === 2) return formData.adMessage.trim().length > 0;
    if (currentQuestion === 3) return formData.targetAudience.trim().length > 0;
    if (currentQuestion === 4) return formData.style !== '';
    if (currentQuestion === 5) return formData.aspectRatio !== '';
    if (currentQuestion === 6) return formData.colorScheme !== '';
    if (currentQuestion === 7) return formData.customColors.length > 0;
    return false;
  };

  const nextQuestion = () => {
    if (canAdvance() && currentQuestion < 7) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 1 && currentQuestion <= 7) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleGenerate = async () => {
    if (!canAdvance()) return;

    setIsGenerating(true);
    setError(null);
    setCurrentQuestion(8); // Move to results view

    try {
      const response = await fetch('/api/generate-ad-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate images');
      }

      const data = await response.json();
      
      // Store the AI-generated concept
      if (data.metadata?.concept) {
        setAdConcept(data.metadata.concept);
      }
      
      const newAds: GeneratedAd[] = data.images.map((img: any) => ({
        id: img.id,
        imageDataUrl: img.dataUrl,
        prompt: img.prompt,
        timestamp: Date.now(),
        formData: { ...formData },
        concept: data.metadata?.concept,
      }));

      const updatedAds = [...newAds, ...generatedAds];
      setGeneratedAds(updatedAds);
      localStorage.setItem('creativeCodeAds', JSON.stringify(updatedAds));

    } catch (err: any) {
      setError(err.message || 'Failed to generate images. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (ad: GeneratedAd) => {
    const link = document.createElement('a');
    link.href = ad.imageDataUrl;
    link.download = `creative-code-ad-${ad.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startOver = () => {
    setCurrentQuestion(1);
    setFormData({
      businessName: '',
      adMessage: '',
      targetAudience: '',
      style: '',
      aspectRatio: '',
      colorScheme: '',
      customColors: [],
    });
    setError(null);
    setAdConcept('');
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Tools</span>
          </Link>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-2.5 flex items-center justify-center">
              <Sparkles className="w-full h-full text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Ad Generator
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Answer 7 quick questions. Powered by Google Imagen 4 Ultra.
          </p>
        </motion.div>

        {/* Progress Dots */}
        {currentQuestion <= 7 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center gap-2 mb-12"
          >
            {[1, 2, 3, 4, 5, 6, 7].map(q => (
              <div
                key={q}
                className={`h-2 rounded-full transition-all ${
                  q === currentQuestion
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500'
                    : q < currentQuestion
                    ? 'w-2 bg-purple-500'
                    : 'w-2 bg-gray-700'
                }`}
              />
            ))}
          </motion.div>
        )}

        {/* Questions */}
        <AnimatePresence mode="wait">
          {/* Question 1: Business Name */}
          {currentQuestion === 1 && (
            <motion.div
              key="q1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-12"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What's your business or product name?
                </h2>
                <p className="text-gray-400">This will appear on your ad creative.</p>
              </div>
              
              <input
                type="text"
                value={formData.businessName}
                onChange={e => updateFormData('businessName', e.target.value)}
                onKeyPress={e => e.key === 'Enter' && canAdvance() && nextQuestion()}
                placeholder="e.g., Acme Coffee Co."
                autoFocus
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-6 py-4 text-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </motion.div>
          )}

          {/* Question 2: Ad Message */}
          {currentQuestion === 2 && (
            <motion.div
              key="q2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-12"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What's your main message?
                </h2>
                <p className="text-gray-400">The headline or key selling point for your ad.</p>
              </div>
              
              <textarea
                value={formData.adMessage}
                onChange={e => updateFormData('adMessage', e.target.value)}
                placeholder="e.g., Premium Coffee Delivered Fresh to Your Door"
                autoFocus
                rows={3}
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-6 py-4 text-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </motion.div>
          )}

          {/* Question 3: Target Audience */}
          {currentQuestion === 3 && (
            <motion.div
              key="q3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-12"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Who is your target audience?
                </h2>
                <p className="text-gray-400">Describe who you're trying to reach.</p>
              </div>
              
              <input
                type="text"
                value={formData.targetAudience}
                onChange={e => updateFormData('targetAudience', e.target.value)}
                onKeyPress={e => e.key === 'Enter' && canAdvance() && nextQuestion()}
                placeholder="e.g., Busy professionals ages 25-40"
                autoFocus
                className="w-full bg-white/5 border-2 border-white/10 rounded-xl px-6 py-4 text-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </motion.div>
          )}

          {/* Question 4: Style */}
          {currentQuestion === 4 && (
            <motion.div
              key="q4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-12"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Choose your visual style
                </h2>
                <p className="text-gray-400">Pick the aesthetic that matches your brand.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STYLES.map(style => (
                  <button
                    key={style.id}
                    onClick={() => updateFormData('style', style.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      formData.style === style.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{style.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{style.label}</div>
                      </div>
                      {formData.style === style.id && (
                        <Check className="w-6 h-6 text-purple-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Question 5: Aspect Ratio */}
          {currentQuestion === 5 && (
            <motion.div
              key="q5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-12"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Select your ad dimensions
                </h2>
                <p className="text-gray-400">Choose the format for your platform.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ASPECT_RATIOS.map(ratio => (
                  <button
                    key={ratio.id}
                    onClick={() => updateFormData('aspectRatio', ratio.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-center ${
                      formData.aspectRatio === ratio.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="text-5xl mb-3">{ratio.emoji}</div>
                    <div className="font-semibold text-lg mb-1">{ratio.label}</div>
                    <div className="text-sm text-gray-400">{ratio.description}</div>
                    {formData.aspectRatio === ratio.id && (
                      <Check className="w-6 h-6 text-purple-400 mx-auto mt-3" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Question 6: Color Scheme */}
          {currentQuestion === 6 && (
            <motion.div
              key="q6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-12"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Pick your color scheme
                </h2>
                <p className="text-gray-400">Set the mood for your ad.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COLOR_SCHEMES.map(scheme => (
                  <button
                    key={scheme.id}
                    onClick={() => updateFormData('colorScheme', scheme.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      formData.colorScheme === scheme.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{scheme.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-lg">{scheme.label}</div>
                      </div>
                      {formData.colorScheme === scheme.id && (
                        <Check className="w-6 h-6 text-purple-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Question 7: Custom Colors */}
          {currentQuestion === 7 && (
            <motion.div
              key="q7"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 md:p-12"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Choose your brand colors
                </h2>
                <p className="text-gray-400">Select 2-4 colors to use in your ad (click to add).</p>
              </div>
              
              {/* Selected Colors Display */}
              {formData.customColors.length > 0 && (
                <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-gray-400 font-medium">Selected Colors:</span>
                    {formData.customColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2 group">
                        <div
                          className="w-10 h-10 rounded-lg border-2 border-white/20 shadow-lg"
                          style={{ backgroundColor: color }}
                        />
                        <button
                          onClick={() => {
                            updateFormData('customColors', formData.customColors.filter((_, i) => i !== index).join(','));
                            setFormData(prev => ({
                              ...prev,
                              customColors: prev.customColors.filter((_, i) => i !== index)
                            }));
                          }}
                          className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Picker Grid */}
              <div className="grid grid-cols-8 gap-3 mb-6">
                {[
                  '#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FFFF00', '#9ACD32', '#00FF00', '#00CED1',
                  '#1E90FF', '#0000FF', '#8A2BE2', '#9400D3', '#FF1493', '#FF69B4', '#FFB6C1', '#FFA07A',
                  '#DC143C', '#C71585', '#DB7093', '#F08080', '#CD5C5C', '#BC8F8F', '#F4A460', '#DAA520',
                  '#B8860B', '#CD853F', '#D2691E', '#8B4513', '#A0522D', '#A52A2A', '#800000', '#696969',
                  '#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC', '#F5F5F5', '#FFFFFF', '#000000',
                ].map(color => (
                  <button
                    key={color}
                    onClick={() => {
                      if (formData.customColors.length < 4 && !formData.customColors.includes(color)) {
                        setFormData(prev => ({
                          ...prev,
                          customColors: [...prev.customColors, color]
                        }));
                      }
                    }}
                    disabled={formData.customColors.includes(color) || formData.customColors.length >= 4}
                    className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                      formData.customColors.includes(color)
                        ? 'border-purple-500 opacity-50 cursor-not-allowed'
                        : formData.customColors.length >= 4
                        ? 'border-white/10 opacity-30 cursor-not-allowed'
                        : 'border-white/20 hover:border-white/40 cursor-pointer'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>

              {/* Custom Color Input */}
              <div className="flex gap-3">
                <input
                  type="color"
                  className="w-16 h-16 rounded-lg cursor-pointer border-2 border-white/20 bg-transparent"
                  onChange={(e) => {
                    const color = e.target.value.toUpperCase();
                    if (formData.customColors.length < 4 && !formData.customColors.includes(color)) {
                      setFormData(prev => ({
                        ...prev,
                        customColors: [...prev.customColors, color]
                      }));
                    }
                  }}
                />
                <div className="flex-1 flex items-center">
                  <p className="text-sm text-gray-400">
                    Use the color picker to add custom colors, or click a preset above.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results View */}
          {currentQuestion === 8 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {isGenerating ? (
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-12 text-center">
                  <Loader2 className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-2">Crafting your perfect ad...</h2>
                  <p className="text-gray-400 mb-4">AI is designing a unique creative concept</p>
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span>Step 1: Generating creative concept with Gemini</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                      <span>Step 2: Creating image with Imagen 4 Ultra</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Your Generated Ad</h2>
                    
                    {/* Show AI-generated concept */}
                    {adConcept && (
                      <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-purple-400 mb-1">AI Creative Concept</p>
                            <p className="text-sm text-gray-300 leading-relaxed">{adConcept}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {error ? (
                      <div className="text-center py-8">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button
                          onClick={handleGenerate}
                          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                        >
                          Try Again
                        </button>
                      </div>
                    ) : generatedAds.length > 0 ? (
                      <div className="space-y-6">
                        {/* Show only the most recent ad */}
                        {generatedAds.slice(0, 1).map(ad => (
                          <div key={ad.id} className="relative group">
                            <img
                              src={ad.imageDataUrl}
                              alt="Generated ad"
                              className="w-full rounded-lg border border-white/10"
                            />
                            <button
                              onClick={() => downloadImage(ad)}
                              className="absolute top-4 right-4 p-3 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center py-8">No ads generated yet.</p>
                    )}
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Generate More
                    </button>

                    <button
                      onClick={startOver}
                      className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                    >
                      Start Over
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentQuestion > 1 && currentQuestion <= 7 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mt-8"
          >
            <button
              onClick={prevQuestion}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {currentQuestion < 7 ? (
              <button
                onClick={nextQuestion}
                disabled={!canAdvance()}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={!canAdvance()}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Generate Ad
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdGenerator;
