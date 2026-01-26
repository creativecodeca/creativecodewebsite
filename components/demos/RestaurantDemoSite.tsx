import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Clock, MapPin, Phone, Mail, Award } from 'lucide-react';
import { BlockedButton, GradientPlaceholder } from './demoUtils';

interface RestaurantDemoSiteProps {
  onDemoClick: (e: React.MouseEvent) => void;
}

const RestaurantDemoSite: React.FC<RestaurantDemoSiteProps> = ({ onDemoClick }) => {
  const menuSections = [
    {
      title: 'Appetizers',
      items: [
        { 
          name: 'Burrata & Heirloom Tomatoes', 
          price: '18', 
          description: 'Fresh burrata, heirloom tomatoes, basil, aged balsamic',
          image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80&w=200&h=200'
        },
        { 
          name: 'Wagyu Beef Carpaccio', 
          price: '24', 
          description: 'Thinly sliced wagyu, arugula, parmesan, truffle oil',
          image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=200&h=200'
        },
        { 
          name: 'Grilled Octopus', 
          price: '22', 
          description: 'Tender octopus, fingerling potatoes, paprika oil',
          image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=200&h=200'
        },
        { 
          name: 'Tuna Tartare', 
          price: '20', 
          description: 'Yellowfin tuna, avocado, crispy wonton, ponzu',
          image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&q=80&w=200&h=200'
        }
      ]
    },
    {
      title: 'Main Courses',
      items: [
        { 
          name: 'Pan-Seared Sea Bass', 
          price: '42', 
          description: 'Mediterranean sea bass, fennel, cherry tomatoes, white wine',
          image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=200&h=200'
        },
        { 
          name: 'Dry-Aged Ribeye', 
          price: '58', 
          description: '16oz ribeye, truffle mashed potatoes, seasonal vegetables',
          image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=200&h=200'
        },
        { 
          name: 'Lobster Risotto', 
          price: '48', 
          description: 'Maine lobster, saffron risotto, peas, lemon butter',
          image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=200&h=200'
        },
        { 
          name: 'Duck Confit', 
          price: '38', 
          description: 'Crispy duck leg, orange glaze, roasted root vegetables',
          image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=200&h=200'
        }
      ]
    },
    {
      title: 'Desserts',
      items: [
        { 
          name: 'Chocolate Soufflé', 
          price: '14', 
          description: 'Dark chocolate, vanilla ice cream, berry compote',
          image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&q=80&w=200&h=200'
        },
        { 
          name: 'Crème Brûlée', 
          price: '12', 
          description: 'Classic French vanilla custard, caramelized sugar',
          image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&q=80&w=200&h=200'
        },
        { 
          name: 'Tiramisu', 
          price: '13', 
          description: 'House-made ladyfingers, espresso, mascarpone',
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=200&h=200'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d1b0d] text-[#e8f4e8]" style={{ fontFamily: 'Georgia, Garamond, serif' }}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0d1b0d]"></div>
        
        {/* Background image */}
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070" 
          alt="Fine Dining" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <div className="mb-8">
            <div className="w-20 h-20 border-2 border-[#c9a961] mx-auto mb-6 flex items-center justify-center">
              <Utensils className="w-10 h-10 text-[#c9a961]" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl mb-6 font-light tracking-wide" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            The Emerald Table
          </h1>
          <p className="text-xl md:text-2xl mb-4 tracking-widest text-[#c9a961] uppercase" style={{ fontFamily: 'Georgia, serif', fontSize: '0.875rem', letterSpacing: '0.3em' }}>
            Fine Dining
          </p>
          <div className="flex items-center justify-center gap-4 text-sm mb-12 opacity-90">
            <Award className="w-4 h-4" />
            <span>Michelin Recommended</span>
            <span className="text-[#c9a961]">•</span>
            <span>Est. 1998</span>
          </div>
          <BlockedButton
            onClick={onDemoClick}
            className="px-12 py-4 border-2 border-[#c9a961] text-[#c9a961] hover:bg-[#c9a961] hover:text-[#0d1b0d] transition-all duration-300 tracking-widest text-sm font-light"
          >
            RESERVE YOUR TABLE
          </BlockedButton>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="text-xs tracking-widest mb-2 opacity-70">SCROLL</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#c9a961] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 bg-[#0d1b0d]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs tracking-[0.3em] mb-6 text-[#c9a961]">OUR PHILOSOPHY</p>
            <h2 className="text-4xl md:text-5xl mb-8 font-light" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              A Culinary Journey
            </h2>
            <div className="w-16 h-[1px] bg-[#c9a961] mx-auto mb-8"></div>
            <p className="text-lg leading-relaxed mb-6 opacity-90">
              At The Emerald Table, we believe dining is an art form. Our seasonal menu showcases the finest ingredients, prepared with classical techniques and modern creativity.
            </p>
            <p className="text-base leading-relaxed opacity-80">
              Chef André Beaumont brings 30 years of Michelin-starred experience to create dishes that celebrate both tradition and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0d1b0d] to-[#1a2f1a]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.3em] mb-6 text-[#c9a961]">SEASONAL MENU</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Tonight's Selection
            </h2>
            <div className="w-16 h-[1px] bg-[#c9a961] mx-auto mt-6"></div>
          </motion.div>

          {menuSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
              className="mb-20 last:mb-0"
            >
              <h3 className="text-2xl md:text-3xl mb-12 text-center font-light tracking-wide text-[#c9a961]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                {section.title}
              </h3>
              <div className="space-y-10">
                {section.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex gap-6 pb-8 border-b border-[#c9a961]/20 last:border-0 hover:bg-white/[0.03] p-4 rounded-lg transition-all cursor-pointer group"
                    onClick={onDemoClick}
                  >
                    <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg border border-[#c9a961]/20">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2 gap-4">
                        <h4 className="text-xl font-light group-hover:text-[#c9a961] transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[#c9a961] font-light text-lg whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-sm opacity-70 leading-relaxed italic">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          <div className="text-center mt-20 pt-12 border-t border-[#c9a961]/20">
            <p className="text-sm mb-6 opacity-80">Wine pairings available for all courses</p>
            <BlockedButton
              onClick={onDemoClick}
              className="px-10 py-3 border border-[#c9a961] text-[#c9a961] hover:bg-[#c9a961] hover:text-[#0d1b0d] transition-all duration-300 tracking-widest text-sm"
            >
              VIEW FULL MENU
            </BlockedButton>
          </div>
        </div>
      </section>

      {/* Chef's Tasting Menu */}
      <section className="py-32 px-6 bg-[#0d1b0d]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[500px] overflow-hidden rounded-lg shadow-2xl border border-[#c9a961]/20"
            >
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1974" 
                alt="Chef's Tasting Menu" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.3em] mb-6 text-[#c9a961]">SIGNATURE EXPERIENCE</p>
              <h2 className="text-4xl md:text-5xl mb-6 font-light leading-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Chef's Tasting Menu
              </h2>
              <div className="w-16 h-[1px] bg-[#c9a961] mb-8"></div>
              <p className="text-base leading-relaxed mb-8 opacity-90">
                Embark on a seven-course culinary journey curated by Chef Beaumont. Each dish tells a story, celebrating seasonal ingredients and time-honored techniques.
              </p>
              <div className="space-y-4 mb-8 text-sm opacity-80">
                <div className="flex items-start gap-3">
                  <span className="text-[#c9a961] mt-1">•</span>
                  <span>Seven thoughtfully crafted courses</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#c9a961] mt-1">•</span>
                  <span>Optional wine pairing selected by our sommelier</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#c9a961] mt-1">•</span>
                  <span>Approximately 2.5 hours dining experience</span>
                </div>
              </div>
              <div className="flex items-end gap-6 mb-8">
                <div>
                  <p className="text-sm opacity-70 mb-1">Tasting Menu</p>
                  <p className="text-3xl text-[#c9a961]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>$125</p>
                </div>
                <div>
                  <p className="text-sm opacity-70 mb-1">With Wine Pairing</p>
                  <p className="text-3xl text-[#c9a961]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>$200</p>
                </div>
              </div>
              <BlockedButton
                onClick={onDemoClick}
                className="px-10 py-3 bg-[#c9a961] text-[#0d1b0d] hover:bg-[#d4b66f] transition-all duration-300 tracking-widest text-sm font-medium"
              >
                RESERVE EXPERIENCE
              </BlockedButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0d1b0d] to-[#1a2f1a]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] mb-6 text-[#c9a961]">RESERVATIONS</p>
            <h2 className="text-4xl md:text-5xl mb-6 font-light" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Join Us
            </h2>
            <div className="w-16 h-[1px] bg-[#c9a961] mx-auto mb-8"></div>
            <p className="text-base opacity-80">
              We recommend booking at least two weeks in advance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#0d1b0d]/50 border border-[#c9a961]/30 p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                className="px-5 py-4 bg-transparent border border-[#c9a961]/30 text-[#e8f4e8] placeholder-[#c9a961]/50 focus:outline-none focus:border-[#c9a961] transition-colors"
                onClick={onDemoClick}
              />
              <input
                type="email"
                placeholder="Email"
                className="px-5 py-4 bg-transparent border border-[#c9a961]/30 text-[#e8f4e8] placeholder-[#c9a961]/50 focus:outline-none focus:border-[#c9a961] transition-colors"
                onClick={onDemoClick}
              />
              <input
                type="tel"
                placeholder="Phone"
                className="px-5 py-4 bg-transparent border border-[#c9a961]/30 text-[#e8f4e8] placeholder-[#c9a961]/50 focus:outline-none focus:border-[#c9a961] transition-colors"
                onClick={onDemoClick}
              />
              <input
                type="date"
                className="px-5 py-4 bg-transparent border border-[#c9a961]/30 text-[#e8f4e8] placeholder-[#c9a961]/50 focus:outline-none focus:border-[#c9a961] transition-colors"
                onClick={onDemoClick}
              />
              <select
                className="px-5 py-4 bg-transparent border border-[#c9a961]/30 text-[#e8f4e8] focus:outline-none focus:border-[#c9a961] transition-colors"
                onClick={onDemoClick}
              >
                <option value="" className="bg-[#0d1b0d]">Select Time</option>
                <option className="bg-[#0d1b0d]">5:00 PM</option>
                <option className="bg-[#0d1b0d]">6:00 PM</option>
                <option className="bg-[#0d1b0d]">7:00 PM</option>
                <option className="bg-[#0d1b0d]">8:00 PM</option>
                <option className="bg-[#0d1b0d]">9:00 PM</option>
              </select>
              <select
                className="px-5 py-4 bg-transparent border border-[#c9a961]/30 text-[#e8f4e8] focus:outline-none focus:border-[#c9a961] transition-colors"
                onClick={onDemoClick}
              >
                <option value="" className="bg-[#0d1b0d]">Party Size</option>
                <option className="bg-[#0d1b0d]">2 Guests</option>
                <option className="bg-[#0d1b0d]">3 Guests</option>
                <option className="bg-[#0d1b0d]">4 Guests</option>
                <option className="bg-[#0d1b0d]">5+ Guests</option>
              </select>
              <textarea
                placeholder="Special requests or dietary restrictions"
                rows={4}
                className="md:col-span-2 px-5 py-4 bg-transparent border border-[#c9a961]/30 text-[#e8f4e8] placeholder-[#c9a961]/50 focus:outline-none focus:border-[#c9a961] transition-colors resize-none"
                onClick={onDemoClick}
              />
            </div>
            <BlockedButton
              onClick={onDemoClick}
              className="w-full py-4 bg-[#c9a961] text-[#0d1b0d] hover:bg-[#d4b66f] transition-all duration-300 tracking-widest text-sm font-medium"
            >
              COMPLETE RESERVATION
            </BlockedButton>
          </motion.div>
        </div>
      </section>

      {/* Contact & Hours */}
      <section className="py-32 px-6 bg-[#0d1b0d]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.3em] mb-6 text-[#c9a961]">VISIT US</p>
              <h2 className="text-3xl md:text-4xl mb-8 font-light" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Location & Hours
              </h2>
              <div className="space-y-8 text-base">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#c9a961] mt-1 shrink-0" />
                  <div>
                    <p className="font-light mb-1">Address</p>
                    <p className="opacity-70">123 Fine Dining Boulevard<br />Downtown District, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#c9a961] mt-1 shrink-0" />
                  <div>
                    <p className="font-light mb-1">Reservations</p>
                    <p className="opacity-70">(212) 555-0150</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#c9a961] mt-1 shrink-0" />
                  <div>
                    <p className="font-light mb-1">Email</p>
                    <p className="opacity-70">reservations@emeraldtable.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#c9a961] mt-1 shrink-0" />
                  <div>
                    <p className="font-light mb-3">Hours</p>
                    <div className="space-y-2 text-sm opacity-70">
                      <div className="flex justify-between gap-8">
                        <span>Tuesday – Thursday</span>
                        <span>5:00 PM – 10:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Friday – Saturday</span>
                        <span>5:00 PM – 11:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Sunday</span>
                        <span>4:00 PM – 9:00 PM</span>
                      </div>
                      <p className="italic mt-3">Closed Mondays</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GradientPlaceholder 
                gradient="from-emerald-900 to-green-950"
                className="h-full min-h-[400px] border border-[#c9a961]/30"
              >
                <div className="h-full flex items-center justify-center opacity-30">
                  <MapPin className="w-16 h-16 text-[#c9a961]" />
                </div>
              </GradientPlaceholder>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0a140a] border-t border-[#c9a961]/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-16 h-16 border border-[#c9a961] mx-auto mb-6 flex items-center justify-center">
            <Utensils className="w-8 h-8 text-[#c9a961]" />
          </div>
          <p className="text-sm opacity-70">
            © 2024 The Emerald Table. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantDemoSite;
