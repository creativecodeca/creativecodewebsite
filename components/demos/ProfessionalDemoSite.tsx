import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Award, Clock, Phone, Mail, MapPin, CheckCircle, Calendar, Shield } from 'lucide-react';
import { BlockedButton, GradientPlaceholder, AvatarPlaceholder } from './demoUtils';

interface ProfessionalDemoSiteProps {
  onDemoClick: (e: React.MouseEvent) => void;
}

const ProfessionalDemoSite: React.FC<ProfessionalDemoSiteProps> = ({ onDemoClick }) => {
  const services = [
    {
      icon: Scale,
      title: 'Business Law',
      description: 'Contract negotiations, mergers & acquisitions, corporate governance, and business formation services.'
    },
    {
      icon: Shield,
      title: 'Estate Planning',
      description: 'Wills, trusts, probate administration, and comprehensive estate planning for your family\'s future.'
    },
    {
      icon: Award,
      title: 'Real Estate Law',
      description: 'Property transactions, title disputes, zoning issues, and commercial real estate representation.'
    },
    {
      icon: CheckCircle,
      title: 'Civil Litigation',
      description: 'Expert representation in disputes, settlements, and trial advocacy for complex civil matters.'
    }
  ];

  const team = [
    {
      name: 'James Richardson',
      title: 'Senior Partner',
      initials: 'JR',
      credentials: 'JD, Harvard Law School',
      experience: '25 years',
      specialties: ['Business Law', 'Mergers & Acquisitions']
    },
    {
      name: 'Sarah Chen',
      title: 'Partner',
      initials: 'SC',
      credentials: 'JD, Yale Law School',
      experience: '18 years',
      specialties: ['Estate Planning', 'Tax Law']
    },
    {
      name: 'Michael Torres',
      title: 'Partner',
      initials: 'MT',
      credentials: 'JD, Columbia Law School',
      experience: '15 years',
      specialties: ['Real Estate', 'Civil Litigation']
    },
    {
      name: 'Emily Watson',
      title: 'Associate Attorney',
      initials: 'EW',
      credentials: 'JD, Stanford Law School',
      experience: '8 years',
      specialties: ['Business Law', 'Contract Law']
    }
  ];

  const credentials = [
    {
      icon: Award,
      title: 'Top Rated Firm',
      description: 'Martindale-Hubbell AV Preeminent Rating'
    },
    {
      icon: Scale,
      title: 'Over 40 Years',
      description: 'Combined legal experience serving clients'
    },
    {
      icon: CheckCircle,
      title: '500+ Cases',
      description: 'Successfully resolved for our clients'
    },
    {
      icon: Shield,
      title: 'Licensed',
      description: 'California & New York State Bar'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020202] to-[#0a0a1a] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <GradientPlaceholder 
            gradient="from-indigo-900/20 to-blue-900/20"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Richardson & Associates
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">
              Attorneys at Law
            </p>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-4">
              Providing trusted legal counsel for over 40 years. Our experienced team is dedicated to protecting your interests and achieving the best possible outcomes.
            </p>
            <div className="flex items-center justify-center gap-6 mb-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <span>AV Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-400" />
                <span>Licensed in CA & NY</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
                <span>500+ Cases Won</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <BlockedButton
                onClick={onDemoClick}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule Consultation
              </BlockedButton>
              <BlockedButton
                onClick={onDemoClick}
                className="px-8 py-4 bg-white/5 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                (415) 555-0188
              </BlockedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
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
              Practice Areas
            </h2>
            <p className="text-xl text-slate-400">
              Comprehensive legal services tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-indigo-500/30 transition-all duration-300"
              >
                <service.icon className="w-12 h-12 text-indigo-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.description}</p>
                <BlockedButton
                  onClick={onDemoClick}
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full hover:scale-105 transition-all text-sm font-semibold"
                >
                  Learn More
                </BlockedButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Attorneys
            </h2>
            <p className="text-xl text-slate-400">
              Experienced professionals dedicated to your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="flex gap-6 mb-6">
                  <AvatarPlaceholder 
                    initials={member.initials}
                    gradient="from-indigo-500 to-blue-500"
                    className="w-24 h-24 rounded-full text-2xl shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <div className="text-indigo-400 font-semibold mb-2">{member.title}</div>
                    <div className="text-sm text-slate-400 mb-2">{member.credentials}</div>
                    <div className="text-sm text-slate-500">{member.experience} of experience</div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="text-sm font-semibold text-slate-300 mb-2">Specialties:</div>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-xs text-indigo-300"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why Choose Our Firm
            </h2>
            <p className="text-xl text-slate-400">
              Proven track record and unwavering commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {credentials.map((credential, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-full flex items-center justify-center border border-white/10">
                  <credential.icon className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{credential.title}</h3>
                <p className="text-slate-400 text-sm">{credential.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Our Commitment to You</h3>
                <div className="space-y-3">
                  {[
                    'Personalized attention to every case',
                    'Transparent communication at all times',
                    'Strategic approach to legal challenges',
                    'Competitive and fair fee structures',
                    'Available for urgent matters'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-4xl font-bold text-indigo-400 mb-2">Free Consultation</div>
                <p className="text-slate-400 mb-6">Initial consultation at no cost to discuss your case</p>
                <BlockedButton
                  onClick={onDemoClick}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Your Consultation
                </BlockedButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Appointment Booking */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Schedule an Appointment
            </h2>
            <p className="text-xl text-slate-400">
              Take the first step toward resolving your legal matter
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name *"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 transition-colors"
                onClick={onDemoClick}
              />
              <input
                type="email"
                placeholder="Email Address *"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 transition-colors"
                onClick={onDemoClick}
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 transition-colors"
                onClick={onDemoClick}
              />
              <select
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 transition-colors"
                onClick={onDemoClick}
              >
                <option>Select Practice Area *</option>
                <option>Business Law</option>
                <option>Estate Planning</option>
                <option>Real Estate Law</option>
                <option>Civil Litigation</option>
                <option>Other</option>
              </select>
              <input
                type="date"
                placeholder="Preferred Date"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 transition-colors"
                onClick={onDemoClick}
              />
              <select
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 transition-colors"
                onClick={onDemoClick}
              >
                <option>Preferred Time</option>
                <option>Morning (9 AM - 12 PM)</option>
                <option>Afternoon (12 PM - 5 PM)</option>
                <option>Evening (After 5 PM)</option>
              </select>
              <textarea
                placeholder="Brief description of your legal matter..."
                rows={5}
                className="md:col-span-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
                onClick={onDemoClick}
              />
            </div>
            <BlockedButton
              onClick={onDemoClick}
              className="w-full mt-6 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full hover:scale-105 transition-all font-bold text-lg"
            >
              Request Appointment
            </BlockedButton>
            <p className="text-center text-sm text-slate-500 mt-4">
              All consultations are confidential. We'll contact you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h2>
            <p className="text-xl text-slate-400">
              We're here to help with your legal needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GradientPlaceholder 
                gradient="from-indigo-900/30 to-blue-900/30"
                className="h-[400px] rounded-2xl border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                    <div className="text-lg font-semibold">Office Location</div>
                    <div className="text-sm text-slate-400">Downtown Financial District</div>
                  </div>
                </div>
              </GradientPlaceholder>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-2">Office Address</div>
                    <div className="text-slate-400">
                      555 Market Street, Suite 3200<br />
                      San Francisco, CA 94105
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-2">Phone</div>
                    <div className="text-slate-400">
                      Main: (415) 555-0188<br />
                      Fax: (415) 555-0189
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-2">Email</div>
                    <div className="text-slate-400">
                      info@richardsonassociates.com
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                  <div>
                    <div className="font-bold mb-2">Office Hours</div>
                    <div className="text-slate-400 space-y-1">
                      <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                      <div>Saturday: By appointment only</div>
                      <div className="text-sm text-slate-500 mt-2">Emergency consultations available</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessionalDemoSite;
