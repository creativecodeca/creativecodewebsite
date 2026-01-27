import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Sparkles, Calendar } from 'lucide-react';

const Tools: React.FC = () => {
  const tools = [
    {
      id: 'diagnosis-map',
      title: 'Business Diagnosis Map',
      description: 'Interactive mindmap to diagnose business problems and find solutions. Navigate through a comprehensive tree of business challenges with intelligent search and recommendations.',
      icon: Compass,
      link: '/tools/diagnosismap',
      features: [
        'Interactive problem tree navigation',
        'Solution recommendations',
        'Smart search capabilities',
        'Impact analysis for each issue',
      ],
    },
    {
      id: 'ad-generator',
      title: 'Ad Image Generator',
      description: 'Generate professional ad images instantly. Answer 7 quick questions and get studio-quality ad creatives—no signup required.',
      icon: Sparkles,
      link: '/tools/ad-generator',
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
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-white tracking-tight">
            Business Tools
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Diagnostic and analytical tools to help you understand and optimize your business.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                to={tool.link}
                className="block group h-full"
              >
                <div className="h-full bg-[#0a0a0a] border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all">
                  {/* Icon */}
                  <div className="w-12 h-12 mb-6 rounded-lg bg-white/5 border border-white/10 p-2.5 flex items-center justify-center">
                    <Icon className="w-full h-full text-slate-300" />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-semibold text-white mb-3">
                    {tool.title}
                  </h2>

                  {/* Description */}
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-500">
                        <div className="w-1 h-1 rounded-full bg-slate-500 mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                    <span>Launch Tool</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-[#0a0a0a] border border-white/10 rounded-xl px-8 py-6">
            <p className="text-slate-400 text-sm mb-2">
              More tools coming soon
            </p>
            <p className="text-slate-600 text-xs">
              We're constantly developing new tools to help your business.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-12 h-12 mx-auto mb-6 rounded-lg bg-white/5 border border-white/10 p-2.5 flex items-center justify-center">
                <Calendar className="w-full h-full text-slate-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Need More Than Tools?
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                Get a custom strategy tailored to your business. Book a free consultation to discuss your challenges and goals.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-all"
              >
                <Calendar className="w-5 h-5" />
                Book a Free Call
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-slate-500 mt-4">
                No commitments • 30-minute strategy session
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;

