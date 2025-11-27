import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
// import AIChatWidget from './components/AIChatWidget';
import Home from './components/Home';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import WebsiteServices from './components/WebsiteServices';
import BuyPopupWebsite from './components/BuyPopupWebsite';
import BuyStandardWebsite from './components/BuyStandardWebsite';
import MobileContact from './components/MobileContact';
import ClientCall from './components/ClientCall';
import WebsiteOnboardingForm from './components/WebsiteOnboardingForm';
import PageWrapper from './components/PageWrapper';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    // If there's a hash, let the component handle the scroll
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-[#020202] text-slate-200 selection:bg-white/20 selection:text-white overflow-x-hidden font-sans">
      <CustomCursor />
      <Navbar />
      {/* <AIChatWidget /> */}

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
          <Route path="/services/website/buy-popup" element={<PageWrapper><BuyPopupWebsite /></PageWrapper>} />
          <Route path="/services/website/buy-standard" element={<PageWrapper><BuyStandardWebsite /></PageWrapper>} />
          <Route path="/privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
          <Route path="/terms" element={<PageWrapper><TermsConditions /></PageWrapper>} />
          {/* Catch-all route - redirect to home for any undefined paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      {/* Footer */}
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
            <a href="https://www.instagram.com/creativecodeca/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all interactable hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="tel:+18889775027" className="w-12 h-12 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all interactable hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
            <a href="mailto:info@creativecodeca.com" className="w-12 h-12 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all interactable hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;