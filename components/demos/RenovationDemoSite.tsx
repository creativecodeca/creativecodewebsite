import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Wrench, Home, Phone, Mail, MapPin, Star, CheckCircle, Award, Clock } from 'lucide-react';
import { BlockedButton, GradientPlaceholder } from './demoUtils';

interface RenovationDemoSiteProps {
  onDemoClick: (e: React.MouseEvent) => void;
}

const RenovationDemoSite: React.FC<RenovationDemoSiteProps> = ({ onDemoClick }) => {
  const services = [
    {
      icon: Home,
      title: 'Kitchen Remodeling',
      description: 'Complete kitchen renovations from design to completion',
      price: 'Starting at $25,000'
    },
    {
      icon: Hammer,
      title: 'Bathroom Renovation',
      description: 'Modern bathroom upgrades with quality fixtures',
      price: 'Starting at $15,000'
    },
    {
      icon: Wrench,
      title: 'Whole Home Renovation',
      description: 'Full home transformations and additions',
      price: 'Starting at $100,000'
    },
    {
      icon: Home,
      title: 'Basement Finishing',
      description: 'Turn unused space into functional living areas',
      price: 'Starting at $30,000'
    }
  ];

  const projects = [
    {
      title: 'Modern Kitchen Transformation',
      location: 'Phoenix, AZ',
      before: 'Outdated 1980s kitchen',
      after: 'Sleek modern space'
    },
    {
      title: 'Master Bath Upgrade',
      location: 'Scottsdale, AZ',
      before: 'Small dated bathroom',
      after: 'Spa-like retreat'
    },
    {
      title: 'Open Concept Living',
      location: 'Tempe, AZ',
      before: 'Closed-off dark rooms',
      after: 'Bright open floor plan'
    },
    {
      title: 'Basement Entertainment',
      location: 'Mesa, AZ',
      before: 'Unfinished basement',
      after: 'Modern game room'
    }
  ];

  const testimonials = [
    {
      name: 'David & Lisa T.',
      rating: 5,
      text: 'Exceptional work! Our kitchen is now the heart of our home. They stayed on schedule and on budget.'
    },
    {
      name: 'Robert M.',
      rating: 5,
      text: 'Professional team, great quality. Our bathroom renovation exceeded our expectations!'
    },
    {
      name: 'Sarah J.',
      rating: 5,
      text: 'From start to finish, they made the process easy. The craftsmanship is outstanding.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#2c2416]">
      {/* Hero Section - Bold contractor style */}
      <section className="relative bg-[#d84315] text-white pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.1) 10px, rgba(0,0,0,.1) 20px)' }}></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block bg-[#bf360c] px-6 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
              25+ Years Experience
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
              ELEVATION<br/>RENOVATIONS
            </h1>
            <p className="text-xl md:text-2xl mb-4 font-bold uppercase">
              Phoenix's Trusted Home Contractor
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Licensed • Bonded • Insured • BBB A+ Rated
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <BlockedButton
                onClick={onDemoClick}
                className="px-10 py-5 bg-[#ffd54f] text-[#2c2416] font-black rounded-none hover:bg-[#ffecb3] transition-colors shadow-lg uppercase text-lg border-4 border-[#2c2416]"
              >
                FREE ESTIMATE
              </BlockedButton>
              <BlockedButton
                onClick={onDemoClick}
                className="px-10 py-5 bg-transparent border-4 border-white text-white font-black rounded-none hover:bg-white/10 transition-colors uppercase text-lg"
              >
                <Phone className="w-6 h-6 inline mr-2" />
                (602) 555-0199
              </BlockedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#2c2416] text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Award, text: 'BBB A+ Rated' },
              { icon: CheckCircle, text: 'Licensed & Insured' },
              { icon: Star, text: '500+ Projects' },
              { icon: Clock, text: 'On-Time Guarantee' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <item.icon className="w-8 h-8 text-[#ffd54f]" />
                <span className="font-bold text-sm uppercase">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
              Our Services
            </h2>
            <div className="w-24 h-2 bg-[#d84315] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#f8f5f0] border-4 border-[#2c2416] p-8 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                onClick={onDemoClick}
              >
                <div className="bg-[#d84315] w-16 h-16 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-3 uppercase">{service.title}</h3>
                <p className="text-[#4a4a4a] mb-4 leading-relaxed">{service.description}</p>
                <div className="text-[#d84315] font-black text-lg">{service.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-20 px-6 bg-[#f8f5f0]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
              Recent Projects
            </h2>
            <div className="w-24 h-2 bg-[#d84315] mx-auto mb-4"></div>
            <p className="text-xl text-[#4a4a4a]">See the transformations we've created</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-4 border-[#2c2416] overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={onDemoClick}
              >
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative bg-[#8d6e63] aspect-square">
                    <div className="absolute top-4 left-4 bg-[#d84315] text-white px-3 py-1 font-black text-xs uppercase">
                      Before
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-white/50 font-black text-6xl">
                      ✕
                    </div>
                  </div>
                  <div className="relative bg-[#ffd54f] aspect-square">
                    <div className="absolute top-4 right-4 bg-[#2c2416] text-white px-3 py-1 font-black text-xs uppercase">
                      After
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-[#2c2416]/50 font-black text-6xl">
                      ✓
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-black mb-2 uppercase">{project.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-[#4a4a4a] mb-4">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-3">
                      <span className="font-bold text-[#d84315]">BEFORE:</span>
                      <span className="text-[#4a4a4a]">{project.before}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-bold text-[#2c2416]">AFTER:</span>
                      <span className="text-[#4a4a4a]">{project.after}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
              What Clients Say
            </h2>
            <div className="w-24 h-2 bg-[#d84315] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#f8f5f0] border-4 border-[#2c2416] p-6"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ffd54f] text-[#ffd54f]" />
                  ))}
                </div>
                <p className="text-[#2c2416] mb-6 leading-relaxed font-medium">"{testimonial.text}"</p>
                <div className="font-black text-[#d84315] uppercase text-sm">{testimonial.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-[#d84315] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.1) 10px, rgba(0,0,0,.1) 20px)' }}></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-4">
              FREE consultation & estimate for your project
            </p>
            <p className="text-lg mb-8">
              Licensed • Bonded • Insured • ROC #123456
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-3 text-xl">
                <Phone className="w-6 h-6" />
                <span className="font-black">(602) 555-0199</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-5 h-5" />
                <span>info@elevationrenovations.com</span>
              </div>
            </div>
            <BlockedButton
              onClick={onDemoClick}
              className="px-12 py-6 bg-[#ffd54f] text-[#2c2416] font-black rounded-none hover:bg-[#ffecb3] transition-colors shadow-lg uppercase text-xl border-4 border-[#2c2416]"
            >
              GET YOUR FREE ESTIMATE
            </BlockedButton>
            <p className="text-sm mt-6 opacity-90">
              Serving Phoenix Metro • Available Mon-Sat 7AM-6PM
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RenovationDemoSite;
