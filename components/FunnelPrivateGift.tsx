import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import funnelLeadsData from '../data/funnelLeads.json';

interface LeadData {
  videoLink: string;
  fullName: string;
  clinicName: string;
}

const FunnelPrivateGift: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Validate phone number format
  const isValidPhoneNumber = (phone: string): boolean => {
    if (!phone.trim()) return false;
    // Remove common formatting characters for validation
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    // Check if it has at least 10 digits (US/Canada format)
    return /^\d{10,}$/.test(cleaned);
  };

  const isFormValid = isValidPhoneNumber(phoneNumber);

  // Get lead data from JSON based on slug
  const leadData: LeadData | null = useMemo(() => {
    if (!name) return null;
    const slug = name.toLowerCase();
    return (funnelLeadsData as Record<string, LeadData>)[slug] || null;
  }, [name]);

  // Extract first name from full name (e.g., "Dr. Drew Smith" -> "Drew")
  const getFirstName = (fullName: string | undefined): string => {
    if (!fullName) {
      // Fallback: try to extract from slug
      if (!name) return 'Guest';
      const slug = name.toLowerCase();
      // Try to split camelCase slug
      const words = name.replace(/([A-Z])/g, ' $1').trim().split(/\s+/);
      const firstWord = words[0] || name;
      return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
    }
    
    // Remove "Dr." prefix if present
    const cleaned = fullName.replace(/^Dr\.\s*/i, '').trim();
    // Split by space and take first name
    const parts = cleaned.split(/\s+/);
    return parts[0] || fullName;
  };
  
  const firstName = getFirstName(leadData?.fullName);

  // Use lead data or fallback to defaults
  const videoLink = leadData?.videoLink || 'https://drive.google.com/file/d/1NgpN0mPMBtVRstH6bq6yIxoPC4r0C4dr/preview';
  const hiddenName = leadData?.fullName || 'Drew Smith';
  const hiddenClinicName = leadData?.clinicName || 'Smith Orthodontics';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    // Validate phone number
    if (!isValidPhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/funnel-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber.trim(),
          name: hiddenName,
          clinicName: hiddenClinicName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Webhook error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        {/* Prevent search engines from indexing these private funnel pages */}
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet" />
      </Helmet>
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Video Section */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md mx-auto">
            {/* Logo above welcome text */}
            <div className="flex justify-center mb-6">
              <img
                src="/logo.png"
                alt="Creative Code Logo"
                className="w-24 h-24 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">
              Welcome, {firstName}.
            </h1>
          
          <div className="relative w-full max-w-sm mx-auto bg-gray-900 rounded-lg overflow-hidden mb-8 video-container" style={{ width: '100%', maxWidth: '384px', aspectRatio: '9/16', minHeight: '640px' }}>
            <div className="absolute inset-0 flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
              <iframe
                src={videoLink}
                allow="autoplay"
                allowFullScreen
                className="video-iframe"
                style={{ 
                  width: '360px', 
                  height: '640px',
                  border: 'none'
                }}
              ></iframe>
            </div>
          </div>

          {/* Phone Number Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setError(''); // Clear error when user types
                  }}
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  disabled={isSubmitting}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-400">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/50"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-xl font-semibold text-emerald-400">
                Thank you! We'll be in touch soon.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer - same as App.tsx */}
      <footer id="contact" className="border-t border-white/10 bg-black pt-20 pb-10 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="max-w-md">
            <a href="#" className="text-white font-bold tracking-tighter text-2xl flex items-center gap-2 mb-6 interactable hover:text-slate-300 transition-colors">
              Creative Code
            </a>
            <p className="text-slate-400 text-sm leading-relaxed">
              Creative Code is a digital marketing agency dedicated to scaling your business. From premium website design, to AI chatbots, to killer ad campaigns, Creative Code is here to solve all your digital problems.
            </p>
          </div>

          <div className="flex flex-col gap-4 text-slate-400 text-sm">
            <h3 className="text-white font-semibold text-lg mb-2">Contact Us</h3>
            <div className="flex items-center gap-3 hover:text-white transition-colors">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Ontario, Canada</span>
            </div>
            <a href="mailto:info@creativecodeca.com" className="flex items-center gap-3 hover:text-white transition-colors">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@creativecodeca.com</span>
            </a>
            <a href="tel:+18889775027" className="flex items-center gap-3 hover:text-white transition-colors">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 (888) 977-5027</span>
            </a>
          </div>

          <div className="flex gap-6">
            <a href="https://www.instagram.com/creativecodeca/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" className="w-12 h-12 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all interactable hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="tel:+18889775027" aria-label="Call us at +1 (888) 977-5027" className="w-12 h-12 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all interactable hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
            <a href="mailto:info@creativecodeca.com" aria-label="Email us at info@creativecodeca.com" className="w-12 h-12 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all interactable hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> SYSTEM_STATUS: ONLINE</div>
          <div>© 2025 CREATIVE CODE INC.</div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default FunnelPrivateGift;
