import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Wrench, Home, Phone, Mail, MapPin, Star, CheckCircle } from 'lucide-react';
import { BlockedButton, GradientPlaceholder } from './demoUtils';

interface RenovationDemoSiteProps {
  onDemoClick: (e: React.MouseEvent) => void;
}

const RenovationDemoSite: React.FC<RenovationDemoSiteProps> = ({ onDemoClick }) => {
  const services = [
    {
      icon: Home,
      title: 'Kitchen Remodeling',
      description: 'Transform your kitchen into a modern culinary space with custom cabinets, countertops, and fixtures.',
      price: 'From $25,000'
    },
    {
      icon: Hammer,
      title: 'Bathroom Renovation',
      description: 'Upgrade your bathroom with luxury tiles, modern fixtures, and spa-like amenities.',
      price: 'From $15,000'
    },
    {
      icon: Wrench,
      title: 'Whole Home Renovation',
      description: 'Complete home transformation including structural changes, additions, and full interior updates.',
      price: 'From $100,000'
    },
    {
      icon: Home,
      title: 'Basement Finishing',
      description: 'Turn your unused basement into a functional living space, home office, or entertainment room.',
      price: 'From $30,000'
    }
  ];

  const projects = [
    {
      title: 'Modern Kitchen Transformation',
      location: 'Phoenix, AZ',
      before: 'Outdated 1980s kitchen with worn cabinets',
      after: 'Sleek modern space with quartz counters'
    },
    {
      title: 'Master Bath Luxury Upgrade',
      location: 'Scottsdale, AZ',
      before: 'Small dated bathroom with basic fixtures',
      after: 'Spa-like retreat with walk-in shower'
    },
    {
      title: 'Open Concept Living',
      location: 'Tempe, AZ',
      before: 'Closed-off rooms with dark spaces',
      after: 'Bright open floor plan with natural light'
    },
    {
      title: 'Basement Entertainment Hub',
      location: 'Mesa, AZ',
      before: 'Unfinished concrete basement',
      after: 'Modern game room with bar area'
    }
  ];

  const testimonials = [
    {
      name: 'David & Lisa Thompson',
      rating: 5,
      text: 'The team at Elevation Renovations turned our outdated kitchen into a stunning modern space. They stayed on budget and finished ahead of schedule!'
    },
    {
      name: 'Robert Martinez',
      rating: 5,
      text: 'Professional, reliable, and amazing craftsmanship. Our bathroom renovation exceeded all expectations. Highly recommended!'
    },
    {
      name: 'Sarah Johnson',
      rating: 5,
      text: 'From design to completion, the process was seamless. They really listened to our vision and brought it to life beautifully.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020202] to-[#1a0a0a] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <GradientPlaceholder 
            gradient="from-orange-900/20 to-red-900/20"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Elevation Renovations
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">
              Transforming Homes, Elevating Lives
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Premier home renovation and remodeling services in Phoenix. 25+ years of experience bringing your dream home to life.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <BlockedButton
                onClick={onDemoClick}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg"
              >
                Get Free Estimate
              </BlockedButton>
              <BlockedButton
                onClick={onDemoClick}
                className="px-8 py-4 bg-white/5 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                (602) 555-0199
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
              Our Services
            </h2>
            <p className="text-xl text-slate-400">
              Expert craftsmanship for every room in your home
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
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-orange-500/30 transition-all duration-300"
              >
                <service.icon className="w-12 h-12 text-orange-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-slate-400 mb-4 leading-relaxed">{service.description}</p>
                <div className="text-orange-400 font-bold">{service.price}</div>
                <BlockedButton
                  onClick={onDemoClick}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:scale-105 transition-all text-sm font-semibold"
                >
                  Learn More
                </BlockedButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
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
              Recent Projects
            </h2>
            <p className="text-xl text-slate-400">
              See the amazing transformations we've created
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="grid grid-cols-2 gap-2 p-2">
                  <div className="relative">
                    <GradientPlaceholder 
                      gradient="from-gray-700 to-gray-800"
                      className="h-48 rounded-lg relative overflow-hidden"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs text-red-400 font-bold mb-1">BEFORE</div>
                          <div className="w-16 h-16 border-4 border-white/20 rounded-full"></div>
                        </div>
                      </div>
                    </GradientPlaceholder>
                  </div>
                  <div className="relative">
                    <GradientPlaceholder 
                      gradient="from-orange-500/40 to-red-500/40"
                      className="h-48 rounded-lg relative overflow-hidden"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs text-green-400 font-bold mb-1">AFTER</div>
                          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full"></div>
                        </div>
                      </div>
                    </GradientPlaceholder>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <span className="text-red-400">Before:</span>
                      <span className="text-slate-400">{project.before}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-400">After:</span>
                      <span className="text-slate-400">{project.after}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Map */}
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
              Serving the Phoenix Metro Area
            </h2>
            <p className="text-xl text-slate-400">
              Proud to serve homeowners throughout greater Phoenix
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <GradientPlaceholder 
                gradient="from-orange-900/20 to-red-900/20"
                className="h-96 rounded-2xl border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                    <div className="text-lg font-semibold">Service Area Map</div>
                    <div className="text-sm text-slate-400">Phoenix Metropolitan Area</div>
                  </div>
                </div>
              </GradientPlaceholder>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6">Areas We Serve:</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Phoenix', 'Scottsdale', 'Tempe', 'Mesa', 'Chandler', 'Gilbert', 'Glendale', 'Peoria'].map((city) => (
                  <div key={city} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                    <span>{city}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                <div className="text-sm text-slate-400 mb-2">Not sure if we serve your area?</div>
                <BlockedButton
                  onClick={onDemoClick}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:scale-105 transition-all font-semibold"
                >
                  Contact Us to Check
                </BlockedButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              What Our Clients Say
            </h2>
            <p className="text-xl text-slate-400">
              Don't just take our word for it
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
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="font-bold text-orange-400">{testimonial.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Start Your Project?
                </h2>
                <p className="text-slate-400 mb-6">
                  Get a free consultation and estimate for your home renovation project. We're here to help bring your vision to life.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-orange-400" />
                    <span>(602) 555-0199</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-orange-400" />
                    <span>info@elevationrenovations.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-orange-400" />
                    <span>Phoenix, AZ 85001</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-orange-500/50 transition-colors"
                  onClick={onDemoClick}
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-orange-500/50 transition-colors"
                  onClick={onDemoClick}
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-orange-500/50 transition-colors"
                  onClick={onDemoClick}
                />
                <textarea 
                  placeholder="Tell us about your project" 
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                  onClick={onDemoClick}
                />
                <BlockedButton
                  onClick={onDemoClick}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:scale-105 transition-all font-bold"
                >
                  Request Free Estimate
                </BlockedButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RenovationDemoSite;
