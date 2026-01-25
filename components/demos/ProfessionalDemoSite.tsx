import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Award, Clock, Phone, Mail, MapPin, CheckCircle, Briefcase, Shield, FileText } from 'lucide-react';
import { BlockedButton, GradientPlaceholder, AvatarPlaceholder } from './demoUtils';

interface ProfessionalDemoSiteProps {
  onDemoClick: (e: React.MouseEvent) => void;
}

const ProfessionalDemoSite: React.FC<ProfessionalDemoSiteProps> = ({ onDemoClick }) => {
  const services = [
    {
      icon: Briefcase,
      title: 'Business Law',
      description: 'Contract negotiations, mergers & acquisitions, corporate governance, and business formation.'
    },
    {
      icon: FileText,
      title: 'Estate Planning',
      description: 'Wills, trusts, probate administration, and comprehensive estate planning services.'
    },
    {
      icon: Scale,
      title: 'Real Estate Law',
      description: 'Property transactions, title disputes, zoning issues, and commercial real estate.'
    },
    {
      icon: Shield,
      title: 'Civil Litigation',
      description: 'Expert representation in disputes, settlements, and trial advocacy.'
    }
  ];

  const team = [
    {
      name: 'James Richardson',
      title: 'Senior Partner',
      initials: 'JR',
      credentials: 'JD, Harvard Law',
      experience: '25 years',
      specialties: ['Business Law', 'M&A']
    },
    {
      name: 'Sarah Chen',
      title: 'Partner',
      initials: 'SC',
      credentials: 'JD, Yale Law',
      experience: '18 years',
      specialties: ['Estate Planning', 'Tax']
    },
    {
      name: 'Michael Torres',
      title: 'Partner',
      initials: 'MT',
      credentials: 'JD, Columbia Law',
      experience: '15 years',
      specialties: ['Real Estate', 'Litigation']
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#1a1a1a]" style={{ fontFamily: 'Georgia, Times, serif' }}>
      {/* Top Bar */}
      <div className="bg-[#1a2332] text-[#c5a572] py-3 px-6 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              (415) 555-0188
            </span>
            <span className="hidden md:flex items-center gap-2">
              <Mail className="w-4 h-4" />
              info@richardsonlaw.com
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Licensed in CA & NY</span>
            <span className="text-white/30">|</span>
            <span>AV Rated</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-[#1a2332]/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <Scale className="w-16 h-16 mx-auto mb-6 text-[#1a2332]" />
              <h1 className="text-5xl md:text-6xl mb-6 text-[#1a2332]" style={{ fontFamily: 'Georgia, Times, serif' }}>
                Richardson & Associates
              </h1>
              <p className="text-xl text-[#c5a572] mb-4 tracking-wide uppercase" style={{ fontSize: '0.875rem', letterSpacing: '0.2em' }}>
                Attorneys at Law
              </p>
              <div className="w-24 h-[1px] bg-[#c5a572] mx-auto mb-8"></div>
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Providing trusted legal counsel and exceptional representation since 1982. Our experienced team is dedicated to protecting your interests and achieving favorable outcomes.
            </p>
            <div className="flex items-center justify-center gap-8 mb-10 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#c5a572]" />
                <span>AV Preeminent Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#c5a572]" />
                <span>40+ Years Combined Experience</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <BlockedButton
                onClick={onDemoClick}
                className="px-10 py-4 bg-[#1a2332] text-white hover:bg-[#2a3342] transition-colors"
              >
                Schedule Consultation
              </BlockedButton>
              <BlockedButton
                onClick={onDemoClick}
                className="px-10 py-4 border-2 border-[#1a2332] text-[#1a2332] hover:bg-[#1a2332] hover:text-white transition-colors"
              >
                (415) 555-0188
              </BlockedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-[#1a2332] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '40+', label: 'Years Combined Experience' },
              { value: '500+', label: 'Cases Successfully Resolved' },
              { value: 'AV', label: 'Martindale-Hubbell Rating' },
              { value: '98%', label: 'Client Satisfaction Rate' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <p className="text-4xl font-bold text-[#c5a572] mb-2">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm text-[#c5a572] mb-4 tracking-widest uppercase">Our Expertise</p>
            <h2 className="text-4xl md:text-5xl mb-4 text-[#1a2332]" style={{ fontFamily: 'Georgia, Times, serif' }}>
              Practice Areas
            </h2>
            <div className="w-16 h-[1px] bg-[#c5a572] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#fafaf8] border border-[#1a2332]/10 p-10 hover:border-[#c5a572] hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={onDemoClick}
              >
                <service.icon className="w-12 h-12 text-[#1a2332] mb-6" />
                <h3 className="text-2xl mb-4 text-[#1a2332]" style={{ fontFamily: 'Georgia, Times, serif' }}>
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>
                <span className="text-[#c5a572] text-sm tracking-wider uppercase hover:underline cursor-pointer">
                  Learn More →
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Attorneys */}
      <section className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm text-[#c5a572] mb-4 tracking-widest uppercase">Legal Team</p>
            <h2 className="text-4xl md:text-5xl mb-4 text-[#1a2332]" style={{ fontFamily: 'Georgia, Times, serif' }}>
              Our Attorneys
            </h2>
            <div className="w-16 h-[1px] bg-[#c5a572] mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Experienced professionals dedicated to providing exceptional legal representation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-[#1a2332]/10 overflow-hidden hover:border-[#c5a572] hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-[#1a2332] p-8 flex justify-center">
                  <AvatarPlaceholder 
                    initials={member.initials}
                    gradient="from-[#c5a572] to-[#a08855]"
                    className="w-32 h-32 text-3xl"
                  />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl mb-2 text-[#1a2332]" style={{ fontFamily: 'Georgia, Times, serif' }}>
                    {member.name}
                  </h3>
                  <p className="text-[#c5a572] mb-4 text-sm tracking-wide">{member.title}</p>
                  <div className="text-sm text-gray-600 mb-4 space-y-1">
                    <p>{member.credentials}</p>
                    <p>{member.experience} of experience</p>
                  </div>
                  <div className="pt-4 border-t border-[#1a2332]/10">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Specialties</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.map((specialty, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-[#fafaf8] border border-[#1a2332]/10 text-xs text-[#1a2332]"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm text-[#c5a572] mb-4 tracking-widest uppercase">Our Commitment</p>
            <h2 className="text-4xl md:text-5xl mb-4 text-[#1a2332]" style={{ fontFamily: 'Georgia, Times, serif' }}>
              Why Choose Our Firm
            </h2>
            <div className="w-16 h-[1px] bg-[#c5a572] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Personalized Attention', desc: 'Every client receives individualized attention and strategy tailored to their unique situation.' },
              { title: 'Proven Track Record', desc: 'Over 500 cases successfully resolved with favorable outcomes for our clients.' },
              { title: 'Transparent Communication', desc: 'We keep you informed at every stage, explaining legal concepts in clear terms.' },
              { title: 'Competitive Fees', desc: 'Fair, transparent pricing with no hidden costs. Free initial consultation available.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <CheckCircle className="w-6 h-6 text-[#c5a572] shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl mb-2 text-[#1a2332]" style={{ fontFamily: 'Georgia, Times, serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-24 px-6 bg-[#1a2332] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Scale className="w-16 h-16 mx-auto mb-6 text-[#c5a572]" />
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Georgia, Times, serif' }}>
              Schedule Your Free Consultation
            </h2>
            <div className="w-16 h-[1px] bg-[#c5a572] mx-auto mb-8"></div>
            <p className="text-lg mb-8 text-gray-300 leading-relaxed">
              Discuss your legal matter with an experienced attorney. Initial consultation at no cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <BlockedButton
                onClick={onDemoClick}
                className="px-12 py-5 bg-[#c5a572] text-[#1a2332] hover:bg-[#d4b66f] transition-colors font-medium"
              >
                Schedule Appointment
              </BlockedButton>
              <BlockedButton
                onClick={onDemoClick}
                className="px-12 py-5 border-2 border-white text-white hover:bg-white hover:text-[#1a2332] transition-colors"
              >
                Call (415) 555-0188
              </BlockedButton>
            </div>
            <p className="text-sm text-gray-400">
              Available Monday-Friday, 9:00 AM - 6:00 PM • Emergency consultations available
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm text-[#c5a572] mb-4 tracking-widest uppercase">Contact</p>
              <h2 className="text-3xl md:text-4xl mb-8 text-[#1a2332]" style={{ fontFamily: 'Georgia, Times, serif' }}>
                Our Office
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#c5a572] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold mb-2 text-[#1a2332]">Address</p>
                    <p className="text-gray-700">555 Market Street, Suite 3200<br />San Francisco, CA 94105</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[#c5a572] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold mb-2 text-[#1a2332]">Phone</p>
                    <p className="text-gray-700">Main: (415) 555-0188<br />Fax: (415) 555-0189</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#c5a572] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold mb-2 text-[#1a2332]">Email</p>
                    <p className="text-gray-700">info@richardsonlaw.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#c5a572] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold mb-2 text-[#1a2332]">Office Hours</p>
                    <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: By appointment<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GradientPlaceholder 
                gradient="from-[#1a2332] to-[#2a3342]"
                className="h-full min-h-[400px] border border-[#1a2332]/10"
              >
                <div className="h-full flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-[#c5a572]/30" />
                </div>
              </GradientPlaceholder>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#1a2332] text-white border-t border-[#c5a572]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <Scale className="w-10 h-10 text-[#c5a572] mb-4" />
              <p className="text-2xl mb-2" style={{ fontFamily: 'Georgia, Times, serif' }}>
                Richardson & Associates
              </p>
              <p className="text-sm text-gray-400">Attorneys at Law</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 text-[#c5a572] tracking-wider uppercase">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {['Practice Areas', 'Our Team', 'About Us', 'Contact'].map((link) => (
                  <li key={link}>
                    <BlockedButton onClick={onDemoClick} className="hover:text-white transition-colors text-left">
                      {link}
                    </BlockedButton>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 text-[#c5a572] tracking-wider uppercase">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map((link) => (
                  <li key={link}>
                    <BlockedButton onClick={onDemoClick} className="hover:text-white transition-colors text-left">
                      {link}
                    </BlockedButton>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#c5a572]/20 text-center text-sm text-gray-400">
            <p>© 2024 Richardson & Associates. All rights reserved. Licensed in California and New York.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalDemoSite;
