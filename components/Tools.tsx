import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Sparkles, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Tools: React.FC = () => {
  const tools = [
    {
      id: 'diagnosis-map',
      title: 'Business Diagnosis Map',
      description: 'Interactive mindmap to diagnose business problems and find solutions. Navigate through a comprehensive tree of business challenges with intelligent search and recommendations.',
      icon: Compass,
      link: '/tools/diagnosismap',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Interactive problem tree navigation',
        'Solution recommendations',
        'Smart search capabilities',
        'Impact analysis for each issue',
      ],
    },
    {
      id: 'ad-generator',
      title: 'AI Ad Image Generator',
      description: 'Generate professional ad images instantly. Answer 7 quick questions and get studio-quality ad creatives—no signup required.',
      icon: Sparkles,
      link: '/tools/ad-generator',
      color: 'from-purple-500 to-pink-500',
      features: [
        'Professional-quality images',
        'No account needed',
        'High-resolution output',
        'Custom brand colors',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Business Tools
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Powerful diagnostic and analytical tools to help you understand, solve, and optimize your business challenges.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={tool.link}
                  className="block group h-full"
                >
                  <div className="relative h-full bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${tool.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-full h-full text-white" />
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">
                        {tool.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-400 mb-6 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {tool.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tool.color} mt-1.5 flex-shrink-0`}></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-4 transition-all">
                        <span className={`bg-gradient-to-r ${tool.color} bg-clip-text text-transparent`}>
                          Launch Tool
                        </span>
                        <ArrowRight className={`w-4 h-4 bg-gradient-to-r ${tool.color} bg-clip-text`} style={{ color: 'transparent', stroke: 'url(#gradient)' }} />
                        <svg width="0" height="0">
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-gray-900 to-black border border-white/10 rounded-2xl px-8 py-6">
            <p className="text-gray-400 text-sm mb-2">
              More tools coming soon
            </p>
            <p className="text-gray-600 text-xs">
              We're constantly developing new diagnostic and optimization tools to help your business thrive.
            </p>
          </div>
        </motion.div>

        {/* CTA Section - Book a Call */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-2xl p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-3 flex items-center justify-center">
                <Calendar className="w-full h-full text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Need More Than Tools?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get a custom strategy tailored to your business. Book a free consultation to discuss your unique challenges and goals.
              </p>
              <Link
                to="/book"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                <Calendar className="w-5 h-5" />
                Book a Free Call
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                No commitments • 30-minute strategy session
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tools;

