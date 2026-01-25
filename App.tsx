import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Mail, Phone, MapPin } from 'lucide-react';
// import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
// import AIChatWidget from './components/AIChatWidget';
import PageWrapper from './components/PageWrapper';

// Handle chunk loading errors by reloading the page (client-side only)
const handleChunkError = () => {
  if (typeof window === 'undefined') return; // Skip during SSR
  
  const chunkFailedMessage = /Loading chunk \d+ failed|Failed to fetch dynamically imported module/i;
  
  window.addEventListener('error', (event) => {
    if (chunkFailedMessage.test(event.message)) {
      console.log('Chunk load error detected, reloading...');
      // Only reload once to prevent infinite loops
      if (!sessionStorage.getItem('chunk-error-reload')) {
        sessionStorage.setItem('chunk-error-reload', 'true');
        window.location.reload();
      }
    }
  });
  
  window.addEventListener('load', () => {
    // Clear the reload flag after successful load
    sessionStorage.removeItem('chunk-error-reload');
  });
};

// Initialize chunk error handling (only in browser)
if (typeof window !== 'undefined') {
  handleChunkError();
}

// Retry lazy loading with exponential backoff (client-side only)
const retryImport = (importFn: () => Promise<any>, retries = 3, delay = 1000): Promise<any> => {
  return importFn().catch((error) => {
    // Skip retry logic during SSR
    if (typeof window === 'undefined') {
      throw error;
    }
    
    if (retries === 0) {
      // If all retries failed, force reload the page to get fresh chunks
      if (!sessionStorage.getItem('chunk-error-reload')) {
        sessionStorage.setItem('chunk-error-reload', 'true');
        window.location.reload();
      }
      throw error;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(retryImport(importFn, retries - 1, delay * 2));
      }, delay);
    });
  });
};

// Lazy load all route components with retry logic
const Home = lazy(() => retryImport(() => import('./components/Home')));
const Products = lazy(() => retryImport(() => import('./components/Products')));
const About = lazy(() => retryImport(() => import('./components/About')));
const Contact = lazy(() => retryImport(() => import('./components/Contact')));
const PrivacyPolicy = lazy(() => retryImport(() => import('./components/PrivacyPolicy')));
const TermsConditions = lazy(() => retryImport(() => import('./components/TermsConditions')));
const WebsiteServices = lazy(() => retryImport(() => import('./components/WebsiteServices')));
const WebsiteExamples = lazy(() => retryImport(() => import('./components/WebsiteExamples')));
const MetaAdsServices = lazy(() => retryImport(() => import('./components/MetaAdsServices')));
const MetaAdsExamples = lazy(() => retryImport(() => import('./components/MetaAdsExamples')));
const AutomationServices = lazy(() => retryImport(() => import('./components/AutomationServices')));
const AutomationExamples = lazy(() => retryImport(() => import('./components/AutomationExamples')));
const VoiceAIServices = lazy(() => retryImport(() => import('./components/VoiceAIServices')));
const VoiceAIExamples = lazy(() => retryImport(() => import('./components/VoiceAIExamples')));
const BuyPopupWebsite = lazy(() => retryImport(() => import('./components/BuyPopupWebsite')));
const BuyStandardWebsite = lazy(() => retryImport(() => import('./components/BuyStandardWebsite')));
const MobileContact = lazy(() => retryImport(() => import('./components/MobileContact')));
const ClientCall = lazy(() => retryImport(() => import('./components/ClientCall')));
const WebsiteOnboardingForm = lazy(() => retryImport(() => import('./components/WebsiteOnboardingForm')));
const FunnelPrivateGift = lazy(() => retryImport(() => import('./components/FunnelPrivateGift')));
const Tools = lazy(() => retryImport(() => import('./components/Tools')));
const DiagnosisMap = lazy(() => retryImport(() => import('./components/DiagnosisMap')));
const AdGenerator = lazy(() => retryImport(() => import('./components/AdGenerator')));
const DemoWebsiteWrapper = lazy(() => retryImport(() => import('./components/demos/DemoWebsiteWrapper')));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#020202]">
    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
  </div>
);

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    // If there's a hash, let the component handle the scroll
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Don't show navbar or footer on funnel pages
  const isFunnelPage = location.pathname.startsWith('/funnel/');
  const isDiagnosisMap = location.pathname === '/tools/diagnosismap';
  const isDemoPage = location.pathname.startsWith('/demo/');

  return (
    <div className="relative min-h-screen bg-[#020202] text-slate-200 selection:bg-white/20 selection:text-white overflow-x-hidden font-sans">
      {/* <CustomCursor /> */}
      {!isFunnelPage && !isDemoPage && <Navbar />}
      {/* <AIChatWidget /> */}

      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait">
          {/* @ts-ignore */}
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/mobilecontact" element={<PageWrapper><MobileContact /></PageWrapper>} />
            <Route path="/clientcall" element={<PageWrapper><ClientCall /></PageWrapper>} />
            <Route path="/onboarding/websiteform" element={<PageWrapper><WebsiteOnboardingForm /></PageWrapper>} />
            <Route path="/services/website" element={<PageWrapper><WebsiteServices /></PageWrapper>} />
            <Route path="/services/website/examples" element={<PageWrapper><WebsiteExamples /></PageWrapper>} />
            <Route path="/services/website/buy-popup" element={<PageWrapper><BuyPopupWebsite /></PageWrapper>} />
            <Route path="/services/website/buy-standard" element={<PageWrapper><BuyStandardWebsite /></PageWrapper>} />
            <Route path="/services/meta-ads" element={<PageWrapper><MetaAdsServices /></PageWrapper>} />
            <Route path="/services/meta-ads/examples" element={<PageWrapper><MetaAdsExamples /></PageWrapper>} />
            <Route path="/services/automation" element={<PageWrapper><AutomationServices /></PageWrapper>} />
            <Route path="/services/automation/examples" element={<PageWrapper><AutomationExamples /></PageWrapper>} />
            <Route path="/services/voice-ai" element={<PageWrapper><VoiceAIServices /></PageWrapper>} />
            <Route path="/services/voice-ai/examples" element={<PageWrapper><VoiceAIExamples /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
            <Route path="/terms" element={<PageWrapper><TermsConditions /></PageWrapper>} />
            <Route path="/funnel/privategift/r1/:name" element={<FunnelPrivateGift />} />
            <Route path="/tools" element={<PageWrapper><Tools /></PageWrapper>} />
            <Route path="/tools/diagnosismap" element={<DiagnosisMap />} />
            <Route path="/tools/ad-generator" element={<PageWrapper><AdGenerator /></PageWrapper>} />
            <Route path="/demo/:type" element={<DemoWebsiteWrapper />} />
            {/* Catch-all route - redirect to home for any undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </Suspense>

      {/* Footer - hidden on funnel pages, diagnosis map, and demo pages */}
      {!isFunnelPage && !isDiagnosisMap && !isDemoPage && (
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
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>Ontario, Canada</span>
            </div>
            <a href="mailto:info@creativecodeca.com" className="flex items-center gap-3 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-slate-500" />
              <span>info@creativecodeca.com</span>
            </a>
            <a href="tel:+18889775027" className="flex items-center gap-3 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-slate-500" />
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
      )}
    </div>
  );
}

export default AppContent;