import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Truck, RefreshCw, Shield, Star, Search } from 'lucide-react';
import { BlockedButton, GradientPlaceholder, BlockedLink } from './demoUtils';

interface EcommerceDemoSiteProps {
  onDemoClick: (e: React.MouseEvent) => void;
}

const EcommerceDemoSite: React.FC<EcommerceDemoSiteProps> = ({ onDemoClick }) => {
  const products = [
    { name: 'Silk Evening Dress', price: '$299', category: 'Dresses', rating: 4.8 },
    { name: 'Cashmere Sweater', price: '$189', category: 'Sweaters', rating: 4.9 },
    { name: 'Leather Crossbody', price: '$245', category: 'Bags', rating: 4.7 },
    { name: 'Pearl Necklace', price: '$159', category: 'Jewelry', rating: 5.0 },
    { name: 'Wool Blazer', price: '$349', category: 'Outerwear', rating: 4.6 },
    { name: 'Satin Blouse', price: '$129', category: 'Tops', rating: 4.8 },
    { name: 'Designer Sunglasses', price: '$199', category: 'Accessories', rating: 4.9 },
    { name: 'Velvet Heels', price: '$279', category: 'Shoes', rating: 4.7 },
    { name: 'Silk Scarf', price: '$89', category: 'Accessories', rating: 4.8 },
    { name: 'Tailored Trousers', price: '$179', category: 'Pants', rating: 4.6 },
    { name: 'Leather Belt', price: '$119', category: 'Accessories', rating: 4.9 },
    { name: 'Cashmere Coat', price: '$599', category: 'Outerwear', rating: 5.0 }
  ];

  const categories = ['All', 'Dresses', 'Tops', 'Outerwear', 'Bags', 'Accessories', 'Shoes', 'Jewelry'];

  const benefits = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $100' },
    { icon: RefreshCw, title: 'Easy Returns', description: '30-day return policy' },
    { icon: Shield, title: 'Secure Payment', description: 'SSL encrypted checkout' },
    { icon: Star, title: 'Premium Quality', description: 'Luxury materials only' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020202] to-[#0a0a1a] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <GradientPlaceholder 
            gradient="from-purple-900/20 to-pink-900/20"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Luxe & Co.
              </h1>
              <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">
                Spring Collection 2024
              </p>
              <p className="text-lg text-slate-400 mb-8">
                Discover timeless elegance with our curated collection of luxury fashion. Each piece is crafted with attention to detail and uncompromising quality.
              </p>
              <div className="flex gap-4 flex-wrap">
                <BlockedButton
                  onClick={onDemoClick}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg"
                >
                  Shop New Arrivals
                </BlockedButton>
                <BlockedButton
                  onClick={onDemoClick}
                  className="px-8 py-4 bg-white/5 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all"
                >
                  Explore Collections
                </BlockedButton>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GradientPlaceholder 
                gradient="from-purple-500/40 to-pink-500/40"
                className="h-[500px] rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <ShoppingBag className="w-24 h-24 text-white/60 mx-auto mb-4" />
                    <div className="text-xl font-semibold text-white/80">Featured Product</div>
                  </div>
                </div>
              </GradientPlaceholder>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="py-8 px-6 bg-[#0a0a0a] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-purple-500/50 transition-colors"
                onClick={onDemoClick}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => (
                <BlockedButton
                  key={category}
                  onClick={onDemoClick}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    category === 'All'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {category}
                </BlockedButton>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-slate-400">
              Handpicked selections from our latest collection
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={onDemoClick}
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <GradientPlaceholder 
                    gradient="from-purple-500/20 to-pink-500/20"
                    className="aspect-[3/4] border border-white/10 group-hover:scale-105 transition-transform duration-500"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-50"></div>
                    </div>
                  </GradientPlaceholder>
                  <button 
                    onClick={onDemoClick}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <div className="text-xs text-purple-400 mb-1">{product.category}</div>
                  <h3 className="font-semibold mb-1 group-hover:text-purple-400 transition-colors">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-purple-400 text-purple-400" />
                      <span className="text-sm text-slate-400">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <BlockedButton
              onClick={onDemoClick}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg"
            >
              Load More Products
            </BlockedButton>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GradientPlaceholder 
                gradient="from-purple-600/30 to-pink-600/30"
                className="h-[600px] rounded-2xl border border-white/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-6"></div>
                    <div className="text-2xl font-bold">Evening Collection</div>
                  </div>
                </div>
              </GradientPlaceholder>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Evening Elegance Collection
              </h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                Step into sophistication with our curated evening collection. Each piece is designed to make you feel confident and glamorous for any special occasion.
              </p>
              <ul className="space-y-3 mb-8">
                {['Premium silk and satin fabrics', 'Timeless silhouettes', 'Hand-finished details', 'Available in multiple colors'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <BlockedButton
                onClick={onDemoClick}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg inline-flex items-center gap-2"
              >
                Shop Collection
              </BlockedButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-white/10">
                  <benefit.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Exclusive Community
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Subscribe to receive early access to new collections, exclusive offers, and style tips
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-purple-500/50 transition-colors"
                onClick={onDemoClick}
              />
              <BlockedButton
                onClick={onDemoClick}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg whitespace-nowrap"
              >
                Subscribe
              </BlockedButton>
            </div>
            <p className="text-sm text-slate-500 mt-4">Join 50,000+ fashion lovers. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Follow @luxeandco
            </h2>
            <p className="text-xl text-slate-400">
              Get inspired by our community
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, index) => (
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
                  gradient={`${index % 2 === 0 ? 'from-purple-500/30 to-pink-500/30' : 'from-pink-500/30 to-purple-500/30'}`}
                  className="w-full h-full rounded-lg border border-white/10 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <Heart className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </GradientPlaceholder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EcommerceDemoSite;
