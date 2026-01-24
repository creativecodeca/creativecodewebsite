import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, Loader2, RefreshCw, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdFormData {
  // Step 1
  businessName: string;
  industry: string;
  description: string;
  // Step 2
  headline: string;
  cta: string;
  platform: string[];
  // Step 3
  style: string;
  colorMood: string;
  additionalInstructions: string;
}

interface GeneratedAd {
  id: string;
  imageDataUrl: string;
  prompt: string;
  timestamp: number;
  formData: AdFormData;
}

const INDUSTRIES = [
  'E-commerce',
  'SaaS',
  'Healthcare',
  'Real Estate',
  'Food & Beverage',
  'Professional Services',
  'Other',
];

const CTAS = [
  'Shop Now',
  'Learn More',
  'Get Started',
  'Book Now',
  'Sign Up',
  'Contact Us',
];

const PLATFORMS = [
  'Facebook/Instagram',
  'Google Display',
  'LinkedIn',
  'Pinterest',
];

const STYLES = [
  { id: 'modern', label: 'Modern & Minimal', description: 'Clean lines, simple typography' },
  { id: 'bold', label: 'Bold & Vibrant', description: 'Energetic colors, dynamic layouts' },
  { id: 'professional', label: 'Professional & Corporate', description: 'Trustworthy, polished aesthetic' },
  { id: 'warm', label: 'Warm & Friendly', description: 'Approachable, human-centered' },
];

const COLOR_MOODS = ['Bright', 'Dark', 'Neutral', 'Brand Colors'];

const AdGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAds, setGeneratedAds] = useState<GeneratedAd[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AdFormData>({
    businessName: '',
    industry: '',
    description: '',
    headline: '',
    cta: '',
    platform: [],
    style: '',
    colorMood: '',
    additionalInstructions: '',
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

  const updateFormData = (field: keyof AdFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platform: prev.platform.includes(platform)
        ? prev.platform.filter(p => p !== platform)
        : [...prev.platform, platform],
    }));
  };

  const canAdvance = () => {
    if (currentStep === 1) {
      return formData.businessName.trim() && formData.industry && formData.description.trim();
    }
    if (currentStep === 2) {
      return formData.headline.trim() && formData.cta && formData.platform.length > 0;
    }
    if (currentStep === 3) {
      return formData.style;
    }
    return false;
  };

  const nextStep = () => {
    if (canAdvance() && currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleGenerate = async () => {
    if (!canAdvance()) return;

    setIsGenerating(true);
    setError(null);

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
      
      const newAds: GeneratedAd[] = data.images.map((img: any) => ({
        id: img.id,
        imageDataUrl: img.dataUrl,
        prompt: img.prompt,
        timestamp: Date.now(),
        formData: { ...formData },
      }));

      const updatedAds = [...newAds, ...generatedAds];
      setGeneratedAds(updatedAds);
      localStorage.setItem('creativeCodeAds', JSON.stringify(updatedAds));

      setCurrentStep(4); // Move to results view
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
    setCurrentStep(1);
    setFormData({
      businessName: '',
      industry: '',
      description: '',
      headline: '',
      cta: '',
      platform: [],
      style: '',
      colorMood: '',
      additionalInstructions: '',
    });
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
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
            Generate professional ad images in minutes. Powered by Google Nano Banana Pro.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        {currentStep <= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3].map(step => (
                <React.Fragment key={step}>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      currentStep >= step
                        ? 'border-purple-500 bg-purple-500/20 text-purple-400'
                        : 'border-gray-700 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`h-0.5 w-16 transition-colors ${
                        currentStep > step ? 'bg-purple-500' : 'bg-gray-700'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500">
              {currentStep === 1 && 'Business Basics'}
              {currentStep === 2 && 'Ad Specifics'}
              {currentStep === 3 && 'Visual Style'}
            </p>
          </motion.div>
        )}

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Tell us about your business</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Business/Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={e => updateFormData('businessName', e.target.value)}
                    placeholder="e.g., Acme Coffee Co."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Industry *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={e => updateFormData('industry', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select an industry</option>
                    {INDUSTRIES.map(industry => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Brief Description * (max 200 chars)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={e => updateFormData('description', e.target.value.slice(0, 200))}
                    placeholder="What does your business do? What makes it unique?"
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.description.length}/200
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Ad Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Primary Headline * (max 80 chars)
                  </label>
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={e => updateFormData('headline', e.target.value.slice(0, 80))}
                    placeholder="e.g., Premium Coffee Delivered Fresh Daily"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.headline.length}/80
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Call-to-Action *
                  </label>
                  <select
                    value={formData.cta}
                    onChange={e => updateFormData('cta', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select a CTA</option>
                    {CTAS.map(cta => (
                      <option key={cta} value={cta}>
                        {cta}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Target Platform * (select at least one)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {PLATFORMS.map(platform => (
                      <button
                        key={platform}
                        onClick={() => togglePlatform(platform)}
                        className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                          formData.platform.includes(platform)
                            ? 'border-purple-500 bg-purple-500/20 text-purple-400'
                            : 'border-white/10 hover:border-white/20 text-gray-400'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Choose Your Style</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Style Preference *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {STYLES.map(style => (
                      <button
                        key={style.id}
                        onClick={() => updateFormData('style', style.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.style === style.id
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="font-semibold mb-1">{style.label}</div>
                        <div className="text-sm text-gray-500">{style.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Color Mood (optional)
                  </label>
                  <select
                    value={formData.colorMood}
                    onChange={e => updateFormData('colorMood', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="">Select a color mood</option>
                    {COLOR_MOODS.map(mood => (
                      <option key={mood} value={mood}>
                        {mood}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Additional Instructions (optional, max 150 chars)
                  </label>
                  <textarea
                    value={formData.additionalInstructions}
                    onChange={e => updateFormData('additionalInstructions', e.target.value.slice(0, 150))}
                    placeholder="Any specific requests? (e.g., include product image, use sans-serif fonts)"
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.additionalInstructions.length}/150
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Your Generated Ads</h2>
                
                {generatedAds.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {generatedAds.slice(0, 4).map(ad => (
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
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-5 h-5" />
                      Generate More
                    </>
                  )}
                </button>

                <button
                  onClick={startOver}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                >
                  Start Over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-950/50 border border-red-500/30 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        {currentStep <= 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mt-8"
          >
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={!canAdvance()}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={!canAdvance() || isGenerating}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Ads
                  </>
                )}
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdGenerator;
