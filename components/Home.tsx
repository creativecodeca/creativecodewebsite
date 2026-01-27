import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Target, Zap, Users, CheckCircle, Mail, Database, ArrowRight, ArrowLeft } from 'lucide-react';
const ParticleCanvas = lazy(() => import('./ParticleCanvas'));
import SpotlightCard from './SpotlightCard';
import SEO from './SEO';
import Spline from '@splinetool/react-spline';

const Home: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [showParticleCanvas, setShowParticleCanvas] = useState(false);
  const [fadeOverlay, setFadeOverlay] = useState(true);

  const steps = [
    {
      id: 0,
      label: "Paid Ads",
      content: (
        <div className="w-24 h-24 bg-[#151515] border border-white/20 rounded-2xl flex items-center justify-center relative shadow-[0_0_30px_rgba(236,72,153,0.15)] mb-4 transition-transform duration-500">
          <Target className="w-10 h-10 text-pink-500" />
        </div>
      )
    },
    {
      id: 1,
      label: "Premium Website",
      content: (
        <div className="w-24 h-24 bg-[#151515] border border-white/20 rounded-2xl flex items-center justify-center relative shadow-[0_0_30px_rgba(59,130,246,0.15)] mb-4 transition-transform duration-500">
          <Monitor className="w-10 h-10 text-blue-500" />
        </div>
      )
    },
    {
      id: 2,
      label: "Automated Follow Up",
      content: (
        <div className="w-24 h-24 bg-[#151515] border border-white/20 rounded-2xl flex items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.15)] mb-4 transition-transform duration-500">
          <Mail className="w-10 h-10 text-white" />
        </div>
      )
    },
    {
      id: 3,
      label: "Closed Deal",
      content: (
        <div className="w-24 h-24 bg-[#151515] border border-white/20 rounded-2xl flex items-center justify-center relative shadow-[0_0_30px_rgba(16,185,129,0.15)] mb-4 transition-transform duration-500">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
          <div className="absolute inset-0 overflow-visible pointer-events-none">
            <div className="money-symbol" style={{ "--x": "40px", "--y": "-80px", "animationDelay": "0s" } as React.CSSProperties}>$</div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastInteraction > 5000) { // Only auto-rotate if no interaction for 5s
        setActiveStep((prev) => (prev + 1) % steps.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [lastInteraction, steps.length]);

  // Defer ParticleCanvas until after first paint
  useEffect(() => {
    // Use requestAnimationFrame to ensure it runs after first paint
    requestAnimationFrame(() => {
      setTimeout(() => {
        setShowParticleCanvas(true);
      }, 100);
    });
  }, []);

  // Fade out black overlay after 0.2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOverlay(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % steps.length);
    setLastInteraction(Date.now());
  }, [steps.length]);

  const handlePrev = useCallback(() => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
    setLastInteraction(Date.now());
  }, [steps.length]);

  const getStepIndex = (offset: number) => {
    return (activeStep + offset + steps.length) % steps.length;
  };

  return (
    <>
      <SEO
        title="Web Design & Digital Marketing Agency | Creative Code"
        description="Professional web design and digital marketing services. Custom websites, AI chatbots, Meta & Google ads. Expert web development for business growth."
        canonical="https://creativecodeca.com/"
        keywords="web design, website design, digital marketing agency, web development, custom website design, professional web design, responsive web design, AI chatbots, Meta ads, Google ads, marketing automation, SEO services"
      />
      {/* Ambient Background Light - specific to Home */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-black blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen opacity-40"></div>
      <div className="fixed bottom-0 right-0 w-[800px] h-[600px] bg-black blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen opacity-30"></div>

      {/* Hero Section */}
      <section className="min-h-screen pt-20 overflow-hidden flex items-center relative">
        {/* Spline 3D Scene Background - Full Width (hidden on mobile) */}
        <div className="hidden md:block absolute inset-0 z-0">
          <Spline 
            scene="/scene.splinecode"
            className="w-full h-full"
          />
          {/* Black fade overlay - fades out over 0.2 seconds */}
          <div 
            className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-[200ms] ${
              fadeOverlay ? 'opacity-100' : 'opacity-0'
            }`}
          ></div>
          {/* Top fade gradient */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020202] to-transparent pointer-events-none"></div>
          {/* Bottom fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020202] to-transparent pointer-events-none"></div>
        </div>

        {/* Gradient overlay for mobile */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/80 z-0 pointer-events-none"></div>

        {/* Centered Text Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight font-semibold text-white tracking-tighter mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            Creative Code
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Let software do what your employees can't.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Link to="/contact#contact-form" className="bg-white text-black h-14 px-10 rounded-full font-bold hover:bg-slate-200 transition-all interactable flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-105">
              Inquire
              <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </Link>
            <Link to="/products" className="bg-black text-white border-2 border-white h-14 px-10 rounded-full font-bold hover:bg-white hover:text-black transition-all interactable flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-105">
              Services
            </Link>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="hidden md:block relative z-20 px-6 pb-20 mt-10 md:-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[2rem] p-3 bg-black border border-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] group animate-fade-in delay-300">
            {/* Subtle Glow effect behind video */}
            <div className="absolute -inset-1 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-1000"></div>

            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 aspect-video bg-black">
              <video
                src="https://storage.googleapis.com/msgsndr/rpTHZGMl1DRkn0TYGHwe/media/6925136de7b094361150a365.mp4"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                autoPlay
                loop
                muted
                playsInline
                controls
              ></video>

              {/* Inner Shadow Overlay for Depth */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section id="services" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-2">
            <div className="">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6 text-glow">
                The Growth Stack
              </h2>
              <p className="text-slate-400 max-w-md text-lg">
                Modular components designed to replace your manual workforce with code.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Design */}
            <SpotlightCard className="md:col-span-2 shadow-2xl p-[1px]">
              <div className="relative h-full p-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-indigo-500/10 transition-colors duration-700"></div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-slate-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                      <Monitor className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3 tracking-tight group-hover:text-slate-200 transition-colors">
                      High-Velocity Web Design
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                      Stop waiting months for a website. We deploy SEO-optimized,
                      visually stunning React frameworks in days, not weeks.
                    </p>
                  </div>

                  <div className="mt-12 w-full h-48 bg-[#1a1a1a] rounded-t-xl border border-white/10 relative overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] bg-[position:0_0] animate-[shimmer_2s_infinite]"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-white/20"></div>
                      <div className="w-3 h-3 rounded-full bg-white/20"></div>
                      <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    </div>
                    <div className="absolute top-12 left-4 right-4 bottom-0 bg-[#0f0f0f] rounded-t-lg border border-white/5 p-4 flex gap-4">
                      <div className="w-1/3 h-full bg-white/5 rounded animate-pulse"></div>
                      <div className="w-2/3 space-y-3">
                        <div className="h-4 w-3/4 bg-white/5 rounded"></div>
                        <div className="h-4 w-1/2 bg-white/5 rounded"></div>
                        <div className="h-20 w-full bg-white/5 rounded border border-white/5 mt-4 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Card 2: Ads */}
            <SpotlightCard className="shadow-2xl p-[1px]">
              <div className="relative h-full p-10 flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-slate-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-3 tracking-tight group-hover:text-slate-200 transition-colors">
                  Algorithmic Ads
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Meta & Google campaigns managed by predictive AI models.
                </p>

                <div className="flex items-end justify-between h-32 gap-3 mt-auto">
                  <div className="w-full bg-[#2a2a2a] rounded-t-md h-12 group-hover:h-16 transition-all duration-500 border-t border-white/5"></div>
                  <div className="w-full bg-[#2a2a2a] rounded-t-md h-20 group-hover:h-24 transition-all duration-500 delay-75 border-t border-white/5"></div>
                  <div className="w-full bg-gradient-to-t from-slate-800 to-white/60 rounded-t-md h-32 relative shadow-[0_0_25px_rgba(255,255,255,0.1)]">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black font-bold text-[11px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      +400%
                    </div>
                  </div>
                  <div className="w-full bg-[#2a2a2a] rounded-t-md h-24 group-hover:h-28 transition-all duration-500 delay-100 border-t border-white/5"></div>
                </div>
              </div>
            </SpotlightCard>

            {/* Card 3: Automation */}
            <SpotlightCard className="shadow-2xl p-[1px]">
              <div className="relative h-full p-10 flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-slate-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-medium text-white mb-3 tracking-tight group-hover:text-slate-200 transition-colors">
                  Zapier Logic
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-12">
                  Connect your ecosystem. Automate invoicing, onboarding, and fulfillment.
                </p>

                <div className="mt-auto relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full"></div>
                  <div className="relative z-10 flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#222] border border-white/10 flex items-center justify-center shadow-lg">
                      <Mail className="w-5 h-5 text-white/70" />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-700 to-slate-500 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] z-20">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#222] border border-white/10 flex items-center justify-center shadow-lg">
                      <Database className="w-5 h-5 text-white/70" />
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>

            {/* Card 4: CRM */}
            <SpotlightCard className="md:col-span-2 shadow-2xl p-[1px]">
              <div className="relative h-full p-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-slate-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                    <Users className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3 tracking-tight group-hover:text-slate-200 transition-colors">
                    Unified CRM Dashboard
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    A single source of truth. Visualize your pipeline from cold
                    lead to closed deal with real-time analytics and automated
                    follow-ups.
                  </p>
                </div>

                <div className="flex-1 w-full bg-[#1a1a1a]/90 rounded-xl border border-white/10 p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden group-hover:border-white/20 transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full"></div>
                  <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4 relative z-10">
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      Pipeline Status
                    </div>
                    <div className="text-xs text-white/80 font-mono font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      LIVE
                    </div>
                  </div>
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center gap-2 sm:gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer shadow-lg">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white shadow-md">SJ</div>
                      <div className="flex-1 min-w-0">
                        <div className="h-2 w-20 sm:w-24 bg-white/30 rounded mb-1.5"></div>
                        <div className="h-1.5 w-14 sm:w-16 bg-white/10 rounded"></div>
                      </div>
                      <div className="text-emerald-400 font-bold text-[11px] sm:text-xs whitespace-nowrap flex-shrink-0">$12,400</div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-3 bg-transparent rounded-lg border border-transparent hover:bg-white/5 hover:border-white/10 transition-colors cursor-pointer">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white shadow-md">MK</div>
                      <div className="flex-1 min-w-0">
                        <div className="h-2 w-16 sm:w-20 bg-white/30 rounded mb-1.5"></div>
                        <div className="h-1.5 w-10 sm:w-12 bg-white/10 rounded"></div>
                      </div>
                      <div className="text-slate-500 font-medium text-[11px] sm:text-xs whitespace-nowrap flex-shrink-0">$4,200</div>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Why Choose Us - SEO Content Section */}
      <section className="py-20 px-6 relative border-t border-white/10 bg-[#020202]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-8 text-glow">
            Why Partner with Creative Code?
          </h2>
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed text-justify md:text-center">
            <p>
              In today's fast-paced digital landscape, having a generic website isn't enough. You need a <strong>high-performance digital ecosystem</strong> that works as hard as you do. At Creative Code, we don't just build websites; we engineer <strong>custom web design solutions</strong> that act as 24/7 sales engines. Our team of expert developers and digital marketers combines cutting-edge technology with proven psychological triggers to convert visitors into loyal customers.
            </p>
            <p>
              Whether you need a <strong>responsive website redesign</strong>, a complex <strong>ecommerce platform</strong>, or an <strong>AI-powered customer support agent</strong>, we deliver results that move the needle. We specialize in <strong>SEO optimization</strong> to ensure your brand dominates search results, and we run data-driven <strong>Meta and Google ad campaigns</strong> that maximize your ROI.
            </p>
            <p>
              Stop settling for agencies that over-promise and under-deliver. Partner with a <strong>digital marketing agency</strong> that prioritizes transparency, speed, and measurable growth. From Toronto to the world, Creative Code is your trusted partner for <strong>scalable business growth</strong> through technology.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Engine */}
      <section id="workflows" className="py-32 relative border-y border-white/10 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#111] border border-white/20 text-slate-300 mb-8 shadow-[0_0_40px_rgba(255,255,255,0.05)] animate-pulse-ring relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path></svg>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6 text-glow">
              Autopilot Revenue Engine
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              See exactly how we route your traffic through intelligent filters.
            </p>
          </div>

          <div className="relative w-full h-[300px] md:h-[450px] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-visible mb-20">

            {/* DESKTOP VIEW - GRID */}
            <div className="hidden md:flex absolute inset-0 items-center justify-between px-6 md:px-24 z-20">
              {/* Node 1: Paid Ads */}
              <Link to="/products" className="relative group interactable">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#151515] border border-white/20 rounded-2xl flex items-center justify-center relative z-10 group-hover:border-pink-500/50 group-hover:scale-110 transition-all duration-300 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(236,72,153,0.15)]">
                  <Target className="w-8 h-8 md:w-10 md:h-10 text-slate-400 group-hover:text-pink-500 transition-colors" />
                </div>
                <div className="absolute top-28 left-1/2 -translate-x-1/2 text-center w-32">
                  <p className="text-white text-xs font-bold uppercase tracking-wider">Paid Ads</p>
                </div>
              </Link>

              {/* Node 2: Premium Website */}
              <Link to="/products" className="relative group interactable">
                <div className="absolute -inset-4 bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#151515] border border-white/20 rounded-2xl flex items-center justify-center relative z-10 group-hover:border-blue-500/50 group-hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                  <Monitor className="w-8 h-8 md:w-10 md:h-10 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="absolute top-28 left-1/2 -translate-x-1/2 text-center w-32">
                  <p className="text-white text-xs font-bold uppercase tracking-wider">Premium Website</p>
                </div>
              </Link>

              {/* Node 3: Automated Follow Up */}
              <Link to="/products" className="relative group interactable">
                <div className="absolute -inset-4 bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#151515] border border-white/20 rounded-2xl flex items-center justify-center relative z-10 group-hover:border-white/50 group-hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  <Mail className="w-8 h-8 md:w-10 md:h-10 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <div className="absolute top-28 left-1/2 -translate-x-1/2 text-center w-40">
                  <p className="text-white text-xs font-bold uppercase tracking-wider">Automated Follow Up</p>
                </div>
              </Link>

              {/* Node 4: Closed Deal */}
              <Link to="/products" className="relative group interactable">
                <div className="absolute -inset-4 bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#151515] border border-white/20 rounded-2xl flex items-center justify-center relative z-10 group-hover:border-emerald-500/50 group-hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  <div className="absolute inset-0 overflow-visible pointer-events-none">
                    <div className="money-symbol" style={{ "--x": "40px", "--y": "-80px", "animationDelay": "0s" } as React.CSSProperties}>$</div>
                    <div className="money-symbol" style={{ "--x": "-30px", "--y": "-90px", "animationDelay": "0.4s" } as React.CSSProperties}>$</div>
                    <div className="money-symbol" style={{ "--x": "20px", "--y": "-110px", "animationDelay": "0.8s" } as React.CSSProperties}>$</div>
                  </div>
                </div>
                <div className="absolute top-28 left-1/2 -translate-x-1/2 text-center w-32">
                  <p className="text-white text-xs font-bold uppercase tracking-wider">Closed Deal</p>
                </div>
              </Link>
            </div>

            {/* DESKTOP SVG */}
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="white" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path d="M10 50 L90 50" stroke="#333" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
              <path d="M10 50 L90 50" stroke="url(#flowGrad)" strokeWidth="3" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" className="opacity-100" filter="url(#glow)">
                <animate attributeName="stroke-dashoffset" values="24;0" dur="1s" repeatCount="indefinite"></animate>
              </path>
            </svg>

            {/* MOBILE VIEW - CAROUSEL */}
            <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center z-20">
              {/* Navigation Touch Zones (Invisible) */}
              <div
                onClick={handlePrev}
                className="absolute left-0 top-0 bottom-0 w-1/3 z-30 cursor-pointer"
              />
              <div
                onClick={handleNext}
                className="absolute right-0 top-0 bottom-0 w-1/3 z-30 cursor-pointer"
              />

              {/* Left Preview */}
              <div
                key={`left-${activeStep}`}
                className="absolute left-[15%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 scale-75 opacity-40 blur-[1px] grayscale pointer-events-none transition-all duration-500"
              >
                <div className="flex flex-col items-center justify-start h-[180px]">
                  {steps[getStepIndex(-1)].content}
                </div>
              </div>

              {/* Active Item */}
              <div
                key={`active-${activeStep}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 scale-100 opacity-100 transition-all duration-500 pointer-events-none animate-in fade-in slide-in-from-right-4 duration-500"
              >
                <div className="flex flex-col items-center justify-start h-[180px]">
                  {steps[activeStep].content}
                  <p className="text-white text-sm font-bold uppercase tracking-wider mt-4 text-center w-full max-w-[200px] px-4">
                    {steps[activeStep].label}
                  </p>
                </div>
              </div>

              {/* Right Preview */}
              <div
                key={`right-${activeStep}`}
                className="absolute right-[15%] top-1/2 translate-x-1/2 -translate-y-1/2 z-10 scale-75 opacity-40 blur-[1px] grayscale pointer-events-none transition-all duration-500"
              >
                <div className="flex flex-col items-center justify-start h-[180px]">
                  {steps[getStepIndex(1)].content}
                </div>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-6 flex gap-2 z-30 left-1/2 -translate-x-1/2 pointer-events-none">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeStep ? 'bg-white w-6' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Us CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Want to Learn More About Us?
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Discover our story, mission, and the team behind Creative Code. We're passionate about helping businesses succeed through innovative digital marketing solutions.
          </p>
          <Link
            to="/about"
            className="inline-block bg-white text-black text-sm font-bold px-8 py-4 rounded-full hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 interactable"
          >
            About Us
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;