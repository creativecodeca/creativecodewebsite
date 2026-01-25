import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Clock, MapPin, Phone, Mail, Instagram, Star, Calendar } from 'lucide-react';
import { BlockedButton, GradientPlaceholder } from './demoUtils';

interface RestaurantDemoSiteProps {
  onDemoClick: (e: React.MouseEvent) => void;
}

const RestaurantDemoSite: React.FC<RestaurantDemoSiteProps> = ({ onDemoClick }) => {
  const menuSections = [
    {
      title: 'Appetizers',
      items: [
        { name: 'Burrata & Heirloom Tomatoes', price: '$18', description: 'Fresh burrata, heirloom tomatoes, basil, balsamic reduction' },
        { name: 'Wagyu Beef Carpaccio', price: '$24', description: 'Thinly sliced wagyu, arugula, parmesan, truffle oil' },
        { name: 'Grilled Octopus', price: '$22', description: 'Tender octopus, fingerling potatoes, paprika oil, lemon' },
        { name: 'Tuna Tartare', price: '$20', description: 'Yellowfin tuna, avocado, crispy wonton, ponzu sauce' }
      ]
    },
    {
      title: 'Main Courses',
      items: [
        { name: 'Pan-Seared Sea Bass', price: '$42', description: 'Mediterranean sea bass, fennel, cherry tomatoes, white wine sauce' },
        { name: 'Dry-Aged Ribeye', price: '$58', description: '16oz ribeye, truffle mashed potatoes, seasonal vegetables' },
        { name: 'Lobster Risotto', price: '$48', description: 'Maine lobster, saffron risotto, peas, lemon butter' },
        { name: 'Duck Confit', price: '$38', description: 'Crispy duck leg, orange glaze, roasted root vegetables' }
      ]
    },
    {
      title: 'Desserts',
      items: [
        { name: 'Chocolate Soufflé', price: '$14', description: 'Dark chocolate, vanilla ice cream, berry compote' },
        { name: 'Crème Brûlée', price: '$12', description: 'Classic French vanilla custard, caramelized sugar' },
        { name: 'Tiramisu', price: '$13', description: 'House-made ladyfingers, espresso, mascarpone' },
        { name: 'Seasonal Fruit Tart', price: '$12', description: 'Fresh seasonal fruits, pastry cream, almond crust' }
      ]
    },
    {
      title: 'Wine & Cocktails',
      items: [
        { name: 'Signature Martini', price: '$16', description: 'Premium vodka or gin, dry vermouth, olive or twist' },
        { name: 'Old Fashioned', price: '$18', description: 'Bourbon, bitters, orange, cherry, sugar cube' },
        { name: 'French Rosé', price: '$14', description: 'Glass of Provence rosé, chilled' },
        { name: 'Italian Prosecco', price: '$12', description: 'Glass of sparkling prosecco' }
      ]
    }
  ];

  const specials = [
    {
      name: "Chef's Tasting Menu",
      description: '7-course culinary journey featuring seasonal ingredients and signature dishes',
      price: '$125 per person'
    },
    {
      name: 'Wine Pairing Experience',
      description: 'Expertly curated wine selections to complement your tasting menu',
      price: '+$75 per person'
    }
  ];

  const hours = [
    { day: 'Monday - Thursday', hours: '5:00 PM - 10:00 PM' },
    { day: 'Friday - Saturday', hours: '5:00 PM - 11:00 PM' },
    { day: 'Sunday', hours: '4:00 PM - 9:00 PM' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020202] to-[#0a1a0a] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <GradientPlaceholder 
            gradient="from-green-900/30 to-emerald-900/30"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.7)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              The Emerald Table
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">
              Fine Dining Reimagined
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Experience culinary excellence in an intimate setting. Our seasonal menu showcases the finest ingredients prepared with passion and creativity.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <BlockedButton
                onClick={onDemoClick}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg inline-flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Reserve a Table
              </BlockedButton>
              <BlockedButton
                onClick={onDemoClick}
                className="px-8 py-4 bg-white/5 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all"
              >
                View Menu
              </BlockedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GradientPlaceholder 
              gradient="from-green-500/40 to-emerald-500/40"
              className="h-[500px] rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Utensils className="w-24 h-24 text-white/60 mx-auto mb-4" />
                  <div className="text-xl font-semibold text-white/80">Signature Dish</div>
                </div>
              </div>
            </GradientPlaceholder>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Menu
            </h2>
            <p className="text-xl text-slate-400">
              Seasonal selections crafted with care
            </p>
          </motion.div>

          <div className="space-y-16">
            {menuSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {section.title}
                </h3>
                <div className="space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className="flex gap-6 pb-6 border-b border-white/10 last:border-0 hover:bg-white/5 p-4 rounded-lg transition-colors cursor-pointer"
                      onClick={onDemoClick}
                    >
                      <GradientPlaceholder 
                        gradient="from-green-500/20 to-emerald-500/20"
                        className="w-24 h-24 rounded-lg border border-white/10 shrink-0"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 opacity-60"></div>
                        </div>
                      </GradientPlaceholder>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-bold">{item.name}</h4>
                          <span className="text-green-400 font-bold whitespace-nowrap ml-4">{item.price}</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef's Specials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Chef's Specials
            </h2>
            <p className="text-xl text-slate-400">
              Exclusive experiences for discerning palates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specials.map((special, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-4">{special.name}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{special.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-400">{special.price}</span>
                  <BlockedButton
                    onClick={onDemoClick}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:scale-105 transition-all font-semibold"
                  >
                    Reserve
                  </BlockedButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Make a Reservation
            </h2>
            <p className="text-xl text-slate-400">
              Reserve your table for an unforgettable dining experience
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
                placeholder="Full Name"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-green-500/50 transition-colors"
                onClick={onDemoClick}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-green-500/50 transition-colors"
                onClick={onDemoClick}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-green-500/50 transition-colors"
                onClick={onDemoClick}
              />
              <input
                type="date"
                placeholder="Date"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-green-500/50 transition-colors"
                onClick={onDemoClick}
              />
              <select
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-green-500/50 transition-colors"
                onClick={onDemoClick}
              >
                <option>Select Time</option>
                <option>5:00 PM</option>
                <option>6:00 PM</option>
                <option>7:00 PM</option>
                <option>8:00 PM</option>
                <option>9:00 PM</option>
              </select>
              <select
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-green-500/50 transition-colors"
                onClick={onDemoClick}
              >
                <option>Number of Guests</option>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5+ Guests</option>
              </select>
              <textarea
                placeholder="Special requests or dietary restrictions..."
                rows={4}
                className="md:col-span-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-green-500/50 transition-colors resize-none"
                onClick={onDemoClick}
              />
            </div>
            <BlockedButton
              onClick={onDemoClick}
              className="w-full mt-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:scale-105 transition-all font-bold text-lg"
            >
              Confirm Reservation
            </BlockedButton>
            <p className="text-center text-sm text-slate-500 mt-4">
              We'll send you a confirmation email shortly
            </p>
          </motion.div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Visit Us
            </h2>
            <p className="text-xl text-slate-400">
              Located in the heart of downtown
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
                gradient="from-green-900/30 to-emerald-900/30"
                className="h-[400px] rounded-2xl border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <div className="text-lg font-semibold">Restaurant Location</div>
                    <div className="text-sm text-slate-400">Interactive Map</div>
                  </div>
                </div>
              </GradientPlaceholder>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Address</div>
                      <div className="text-slate-400">123 Fine Dining Boulevard<br />Downtown District, NY 10001</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <div className="text-slate-400">(212) 555-0150</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <div className="text-slate-400">reservations@emeraldtable.com</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Hours of Operation</h3>
                <div className="space-y-3">
                  {hours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-slate-300">{schedule.day}</span>
                      <span className="text-green-400 font-semibold">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
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
              Follow Our Journey
            </h2>
            <p className="text-xl text-slate-400 mb-4">
              @theemeraldtable
            </p>
            <BlockedButton
              onClick={onDemoClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:scale-105 transition-all font-semibold"
            >
              <Instagram className="w-5 h-5" />
              Follow Us
            </BlockedButton>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={onDemoClick}
                className="aspect-square cursor-pointer group"
              >
                <GradientPlaceholder 
                  gradient={`${index % 3 === 0 ? 'from-green-500/30 to-emerald-500/30' : index % 3 === 1 ? 'from-emerald-500/30 to-green-500/30' : 'from-green-600/30 to-emerald-600/30'}`}
                  className="w-full h-full rounded-xl border border-white/10 group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantDemoSite;
