import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Zap, Shield, CheckCircle, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { BlockedButton, GradientPlaceholder } from './demoUtils';

interface SaaSDemoSiteProps {
  onDemoClick: (e: React.MouseEvent) => void;
}

const SaaSDemoSite: React.FC<SaaSDemoSiteProps> = ({ onDemoClick }) => {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Track project progress with live dashboards and customizable reports that update in real-time.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with built-in chat, file sharing, and @mentions for your team.'
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Automate repetitive tasks and workflows to save hours every week and reduce human error.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, SOC 2 compliance, and advanced permission controls keep your data safe.'
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Built-in timers and timesheet management help you track billable hours effortlessly.'
    },
    {
      icon: TrendingUp,
      title: 'Growth Insights',
      description: 'AI-powered insights help you identify bottlenecks and optimize your team\'s productivity.'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: '$29',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 5 team members',
        '10 projects',
        'Basic analytics',
        'Email support',
        '5GB storage'
      ]
    },
    {
      name: 'Professional',
      price: '$79',
      description: 'Best for growing businesses',
      features: [
        'Up to 25 team members',
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        '100GB storage',
        'Custom integrations'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited team members',
        'Unlimited projects',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Unlimited storage',
        'Custom integrations',
        'SLA guarantee'
      ]
    }
  ];

  const testimonials = [
    {
      quote: "TaskFlow completely transformed how our team works. We've increased productivity by 40% in just 3 months.",
      author: "Sarah Chen",
      role: "VP of Operations, TechCorp",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      quote: "The best project management tool we've ever used. Simple, powerful, and our team actually enjoys using it.",
      author: "Michael Rodriguez",
      role: "CTO, StartupXYZ",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      quote: "Finally, a platform that scales with us. From 5 to 500 employees, TaskFlow has been there every step.",
      author: "Jennifer Williams",
      role: "CEO, GrowthCo",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020202] to-[#0a0a1a] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">
              Project Management, Simplified
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              The all-in-one platform for teams who want to accomplish more. Plan, track, and deliver projects with confidence.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <BlockedButton
                onClick={onDemoClick}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg"
              >
                Start Free Trial
              </BlockedButton>
              <BlockedButton
                onClick={onDemoClick}
                className="px-8 py-4 bg-white/5 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all"
              >
                Watch Demo
              </BlockedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-400">
              Powerful features that help teams work smarter, not harder
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-blue-500/30 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-400">
              Choose the plan that's right for your team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white/5 border rounded-2xl p-8 ${
                  tier.popular ? 'border-blue-500/50 bg-blue-500/5 scale-105' : 'border-white/10'
                } hover:bg-white/[0.07] transition-all duration-300 relative`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {tier.price}
                  {tier.price !== 'Custom' && <span className="text-lg text-slate-400">/month</span>}
                </div>
                <p className="text-slate-400 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <BlockedButton
                  onClick={onDemoClick}
                  className={`w-full py-3 rounded-full font-bold transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105'
                      : 'bg-white/10 border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {tier.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                </BlockedButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by 10,000+ Teams
            </h2>
            <p className="text-xl text-slate-400">
              See what our customers have to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <p className="text-slate-300 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full border border-white/10 object-cover"
                  />
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Join thousands of teams already using TaskFlow to achieve more
            </p>
            <BlockedButton
              onClick={onDemoClick}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg inline-flex items-center gap-2"
            >
              Start Your Free 14-Day Trial
            </BlockedButton>
            <p className="text-sm text-slate-500 mt-4">No credit card required • Cancel anytime</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SaaSDemoSite;
