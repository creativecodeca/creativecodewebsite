import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Stethoscope, Home, ShoppingBag, Building, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import SEO from './SEO';

const VoiceAIExamples: React.FC = () => {
    const caseStudies = [
        {
            id: 'medical',
            industry: 'Medical Office',
            specialty: 'Family Practice',
            challenge: 'High volume of missed calls during lunch hours and after business hours, leading to appointment no-shows and frustrated patients.',
            solution: 'Deployed AI receptionist to handle all incoming calls 24/7, book appointments, answer common questions, and send reminder messages.',
            icon: Stethoscope,
            color: 'from-blue-500 to-cyan-500',
            results: {
                metric1: { value: '52%', label: 'Reduction in Missed Appointments' },
                metric2: { value: '1,800+', label: 'Calls Handled Monthly' },
                metric3: { value: '4.6/5', label: 'Patient Satisfaction Score' }
            },
            conversation: [
                { role: 'ai', text: "Hello, this is Dr. Smith's office. How can I help you today?" },
                { role: 'patient', text: "Hi, I need to schedule an annual checkup." },
                { role: 'ai', text: "I'd be happy to help with that. Let me check availability. Do you prefer morning or afternoon?" },
                { role: 'patient', text: "Afternoon would be better." },
                { role: 'ai', text: "I have Tuesday the 15th at 2:30 PM or Thursday the 17th at 3:00 PM available. Which works best?" },
                { role: 'patient', text: "Thursday at 3 works great." },
                { role: 'ai', text: "Perfect! You're all set for Thursday, March 17th at 3:00 PM. You'll receive a confirmation text shortly with appointment details." }
            ]
        },
        {
            id: 'home-services',
            industry: 'Home Services Company',
            specialty: 'Plumbing & HVAC',
            challenge: 'Emergency calls outside business hours going unanswered, losing high-value customers to competitors who answered first.',
            solution: 'Implemented 24/7 AI voice agent to triage emergency calls, schedule appointments, and dispatch technicians for urgent issues.',
            icon: Home,
            color: 'from-orange-500 to-red-500',
            results: {
                metric1: { value: '100%', label: 'Call Answer Rate' },
                metric2: { value: '$32K', label: 'Additional Monthly Revenue' },
                metric3: { value: '2.8x', label: 'After-Hours Bookings' }
            },
            conversation: [
                { role: 'ai', text: "Thank you for calling ABC Plumbing. Are you experiencing a plumbing emergency?" },
                { role: 'customer', text: "Yes! My water heater is leaking all over the basement!" },
                { role: 'ai', text: "I understand this is urgent. I'm dispatching a technician to your location right now. Can you confirm your address?" },
                { role: 'customer', text: "It's 123 Oak Street." },
                { role: 'ai', text: "Thank you. Mike, one of our master plumbers, will be there within 45 minutes. In the meantime, please turn off the water supply valve. Do you know where it's located?" },
                { role: 'customer', text: "Yes, I found it. Thank you!" },
                { role: 'ai', text: "Perfect. Mike will call you when he's 10 minutes away. Stay safe, and we'll take care of this right away." }
            ]
        },
        {
            id: 'ecommerce',
            industry: 'E-commerce Brand',
            specialty: 'Fashion & Apparel',
            challenge: 'High volume of repetitive customer service inquiries about orders, returns, and sizing, overwhelming support team.',
            solution: 'Deployed AI chat agent on website and social media to handle common questions, track orders, and process returns instantly.',
            icon: ShoppingBag,
            color: 'from-purple-500 to-pink-500',
            results: {
                metric1: { value: '75%', label: 'Queries Resolved Without Human' },
                metric2: { value: '4.6/5', label: 'Customer Satisfaction Rating' },
                metric3: { value: '52%', label: 'Reduction in Support Costs' }
            },
            conversation: [
                { role: 'ai', text: "Hi! I'm here to help. What can I assist you with today?" },
                { role: 'customer', text: "Where's my order? I ordered 5 days ago." },
                { role: 'ai', text: "I'd be happy to check on that for you. May I have your order number or email address?" },
                { role: 'customer', text: "Order #78432" },
                { role: 'ai', text: "Thank you! Your order shipped yesterday and is currently in transit. It should arrive by Friday. Would you like me to send you the tracking link?" },
                { role: 'customer', text: "Yes please!" },
                { role: 'ai', text: "Sent! You'll receive a text with the tracking link in about 30 seconds. Is there anything else I can help with?" }
            ]
        },
        {
            id: 'real-estate',
            industry: 'Real Estate Agency',
            specialty: 'Residential Sales',
            challenge: 'Agents missing calls from potential buyers while showing properties, losing leads to faster-responding competitors.',
            solution: 'AI voice agent answers all calls, qualifies leads with key questions, books showings, and alerts agents to hot prospects.',
            icon: Building,
            color: 'from-green-500 to-emerald-500',
            results: {
                metric1: { value: '85%', label: 'Lead Capture Rate' },
                metric2: { value: '120', label: 'Additional Showings/Month' },
                metric3: { value: '3.5x', label: 'Faster Lead Response' }
            },
            conversation: [
                { role: 'ai', text: "Hello, you've reached Riverside Realty. How can I help you today?" },
                { role: 'caller', text: "I'm interested in the 3-bedroom house on Maple Street." },
                { role: 'ai', text: "Wonderful! That's a beautiful property. Have you been pre-approved for a mortgage?" },
                { role: 'caller', text: "Yes, up to $450,000." },
                { role: 'ai', text: "Perfect, that property is listed at $425,000. Would you like to schedule a showing? I have availability tomorrow afternoon or Saturday morning." },
                { role: 'caller', text: "Saturday morning works better." },
                { role: 'ai', text: "Great! I've scheduled you for Saturday at 10 AM. Sarah, your agent, will meet you at the property. You'll receive a confirmation email with all the details." }
            ]
        },
        {
            id: 'restaurant',
            industry: 'Fine Dining Restaurant',
            specialty: 'Upscale Italian',
            challenge: 'Phone lines constantly busy during peak hours, missing reservations and takeout orders from frustrated callers.',
            solution: 'AI receptionist handles all incoming calls, takes reservations, answers menu questions, and processes takeout orders.',
            icon: Utensils,
            color: 'from-yellow-500 to-amber-500',
            results: {
                metric1: { value: '100%', label: 'Calls Answered Immediately' },
                metric2: { value: '$22K', label: 'Additional Monthly Revenue' },
                metric3: { value: '38%', label: 'Increase in Reservations' }
            },
            conversation: [
                { role: 'ai', text: "Thank you for calling Villa Toscana. How may I help you this evening?" },
                { role: 'caller', text: "I'd like to make a reservation for tonight." },
                { role: 'ai', text: "Of course! How many guests will be joining you?" },
                { role: 'caller', text: "Four people, around 7:30." },
                { role: 'ai', text: "I have a lovely table available at 7:30 PM for four. May I have a name for the reservation?" },
                { role: 'caller', text: "Johnson, please." },
                { role: 'ai', text: "Wonderful, Mr. or Mrs. Johnson. Your table is reserved for 7:30 PM tonight for four guests. We look forward to seeing you. Is there anything special we should know about?" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#020202] text-white">
            <SEO
                title="AI Voice Agent Case Studies | Real Customer Success Stories"
                description="See how businesses use AI voice and chat agents to improve customer service, increase bookings, and reduce costs. Real results across 5 industries."
                canonical="https://creativecodeca.com/services/voice-ai/examples"
            />
            
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 text-center">
                    <div className="max-w-5xl mx-auto">
                        <Link
                            to="/services/voice-ai"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm">Back to Pricing</span>
                        </Link>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                                Voice AI Case Studies
                            </h1>
                            <p className="text-xl text-slate-400 mb-4 font-light">
                                Real businesses. Real conversations. Real results.
                            </p>
                            <p className="text-slate-500 max-w-2xl mx-auto">
                                See how AI voice and chat agents are transforming customer interactions across different industries, from healthcare to hospitality.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Case Studies */}
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto space-y-20">
                        {caseStudies.map((study, index) => {
                            const Icon = study.icon;
                            return (
                                <motion.div
                                    key={study.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <SpotlightCard>
                                        <div className="bg-[#0a0a0a] rounded-2xl p-8 md:p-12">
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                                                {/* Left: Overview */}
                                                <div className="lg:col-span-2 space-y-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${study.color} p-3 shrink-0`}>
                                                            <Icon className="w-full h-full text-white" />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                                                {study.industry}
                                                            </h2>
                                                            <p className="text-slate-400 text-sm">
                                                                {study.specialty}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-semibold text-amber-400 mb-2">
                                                            The Challenge
                                                        </h3>
                                                        <p className="text-slate-300 leading-relaxed">
                                                            {study.challenge}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-semibold text-amber-400 mb-2">
                                                            The Solution
                                                        </h3>
                                                        <p className="text-slate-300 leading-relaxed">
                                                            {study.solution}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Right: Results */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-white mb-4">
                                                        Results
                                                    </h3>
                                                    
                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                                        <div className={`text-3xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent mb-2`}>
                                                            {study.results.metric1.value}
                                                        </div>
                                                        <div className="text-sm text-slate-400">
                                                            {study.results.metric1.label}
                                                        </div>
                                                    </div>

                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                                        <div className="text-2xl font-bold text-white mb-2">
                                                            {study.results.metric2.value}
                                                        </div>
                                                        <div className="text-sm text-slate-400">
                                                            {study.results.metric2.label}
                                                        </div>
                                                    </div>

                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                                                        <div className="text-2xl font-bold text-white mb-2">
                                                            {study.results.metric3.value}
                                                        </div>
                                                        <div className="text-sm text-slate-400">
                                                            {study.results.metric3.label}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Sample Conversation */}
                                            <div className="pt-8 border-t border-white/10">
                                                <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                                                    Sample Conversation
                                                </h4>
                                                <div className="bg-black/40 rounded-xl p-6 border border-white/5 max-h-[400px] overflow-y-auto">
                                                    <div className="space-y-4">
                                                        {study.conversation.map((message, idx) => (
                                                            <div key={idx} className={`flex ${message.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                                                <div className={`max-w-[80%] ${
                                                                    message.role === 'ai'
                                                                        ? 'bg-amber-500/10 border border-amber-500/20'
                                                                        : 'bg-white/5 border border-white/10'
                                                                } rounded-xl p-4`}>
                                                                    <p className="text-sm text-slate-200 leading-relaxed">
                                                                        {message.text}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border border-amber-500/20 rounded-2xl p-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Ready for Your Own AI Agent?
                            </h2>
                            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                                Let's discuss how an AI voice or chat agent can transform your customer experience and drive measurable results.
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <Link
                                    to="/contact#booking"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                                >
                                    Schedule Free Consultation
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link
                                    to="/services/voice-ai"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105"
                                >
                                    View Pricing
                                </Link>
                            </div>
                            <p className="text-xs text-slate-500 mt-6 max-w-xl mx-auto">
                                Case studies are representative examples. Results depend on call volume, industry, and implementation scope.
                            </p>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default VoiceAIExamples;
