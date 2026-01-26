import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Truck, RefreshCw, Shield, Star, Search, ChevronRight } from 'lucide-react';
import { BlockedButton, GradientPlaceholder, BlockedLink } from './demoUtils';

interface EcommerceDemoSiteProps {
  onDemoClick: (e: React.MouseEvent) => void;
}

const EcommerceDemoSite: React.FC<EcommerceDemoSiteProps> = ({ onDemoClick }) => {
  const products = [
    { 
      name: 'Silk Evening Dress', 
      price: '$299', 
      category: 'Dresses', 
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=400&h=600'
    },
    { 
      name: 'Cashmere Sweater', 
      price: '$189', 
      category: 'Sweaters', 
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1576188973526-0e5d742240ad?auto=format&fit=crop&q=80&w=400&h=600'
    },
    { 
      name: 'Leather Crossbody', 
      price: '$245', 
      category: 'Bags', 
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400&h=600'
    },
    { 
      name: 'Pearl Necklace', 
      price: '$159', 
      category: 'Jewelry', 
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400&h=600'
    },
    { 
      name: 'Wool Blazer', 
      price: '$349', 
      category: 'Outerwear', 
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400&h=600'
    },
    { 
      name: 'Satin Blouse', 
      price: '$129', 
      category: 'Tops', 
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=400&h=600'
    },
    { 
      name: 'Designer Sunglasses', 
      price: '$199', 
      category: 'Accessories', 
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400&h=600'
    },
    { 
      name: 'Velvet Heels', 
      price: '$279', 
      category: 'Shoes', 
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400&h=600'
    }
  ];

  const categories = ['New Arrivals', 'Dresses', 'Tops', 'Outerwear', 'Bags', 'Accessories', 'Shoes', 'Jewelry', 'Sale'];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Banner */}
      <div className="bg-black text-white py-2 px-6 text-center text-sm">
        <p>Free shipping on orders over $150 | Spring Collection Now Available</p>
      </div>

      {/* Header/Nav */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-8">
              <h1 className="text-3xl font-light tracking-[0.2em] cursor-pointer" onClick={onDemoClick}>
                LUXE & CO.
              </h1>
            </div>
            <nav className="hidden lg:flex items-center gap-8 text-sm tracking-wider">
              {['NEW', 'SHOP', 'COLLECTIONS', 'ABOUT'].map((item) => (
                <BlockedLink key={item} onClick={onDemoClick} className="hover:text-gray-600 transition-colors">
                  {item}
                </BlockedLink>
              ))}
            </nav>
            <div className="flex items-center gap-6">
              <BlockedButton onClick={onDemoClick} className="hover:text-gray-600 transition-colors">
                <Search className="w-5 h-5" />
              </BlockedButton>
              <BlockedButton onClick={onDemoClick} className="hover:text-gray-600 transition-colors relative">
                <Heart className="w-5 h-5" />
              </BlockedButton>
              <BlockedButton onClick={onDemoClick} className="hover:text-gray-600 transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full">
                  0
                </span>
              </BlockedButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070" 
          alt="Spring Collection" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-sm tracking-[0.3em] mb-4 text-gray-600">SPRING 2024</p>
            <h2 className="text-6xl md:text-7xl font-light mb-6 leading-tight">
              Effortless<br/>Elegance
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Discover our new collection of timeless pieces crafted for the modern woman.
            </p>
            <BlockedButton
              onClick={onDemoClick}
              className="px-10 py-4 bg-black text-white font-light tracking-wider hover:bg-gray-800 transition-all"
            >
              SHOP THE COLLECTION
            </BlockedButton>
          </motion.div>
        </div>
      </section>

      {/* Category Nav */}
      <section className="border-y border-gray-200 bg-gray-50 py-6 px-6 overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8 items-center justify-center whitespace-nowrap">
            {categories.map((category) => (
              <BlockedButton
                key={category}
                onClick={onDemoClick}
                className="text-sm tracking-wider hover:text-gray-600 transition-colors font-light"
              >
                {category}
              </BlockedButton>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm tracking-[0.3em] mb-4 text-gray-600">CURATED FOR YOU</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              New Arrivals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each piece is carefully selected to bring you the finest in luxury fashion
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
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
                <div className="relative mb-4 overflow-hidden aspect-[3/4] bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button 
                    onClick={onDemoClick}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-center text-sm tracking-wider font-medium">QUICK VIEW</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1 tracking-wider">{product.category}</p>
                  <h3 className="font-light mb-2">{product.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-black text-black" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <BlockedButton
              onClick={onDemoClick}
              className="px-10 py-4 border border-black text-black font-light tracking-wider hover:bg-black hover:text-white transition-all"
            >
              VIEW ALL PRODUCTS
            </BlockedButton>
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <p className="text-sm tracking-[0.3em] mb-4 text-gray-600">SPRING EDIT</p>
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                The Art of<br/>Minimalism
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Embrace simplicity with our carefully curated edit of essential pieces. Clean lines, luxurious fabrics, and timeless silhouettes that transcend seasons.
              </p>
              <ul className="space-y-3 mb-8">
                {['Sustainable materials', 'Handcrafted details', 'Limited production', 'Timeless design'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <div className="w-1 h-1 bg-black"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <BlockedButton
                onClick={onDemoClick}
                className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-light tracking-wider hover:bg-gray-800 transition-all"
              >
                EXPLORE THE EDIT
                <ChevronRight className="w-4 h-4" />
              </BlockedButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2 h-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070" 
                alt="Minimalist Collection" 
                className="w-full h-[600px] object-cover shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-16 px-6 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Truck, title: 'Complimentary Shipping', description: 'On orders over $150' },
              { icon: RefreshCw, title: 'Easy Returns', description: '30 days, no questions asked' },
              { icon: Shield, title: 'Secure Checkout', description: 'Your data protected' },
              { icon: Star, title: 'Exceptional Quality', description: 'Handpicked materials' }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <benefit.icon className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-light mb-1 tracking-wide">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Stay in Touch
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to receive early access to new collections and exclusive offers
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 border border-gray-300 focus:outline-none focus:border-black transition-colors bg-white"
                onClick={onDemoClick}
              />
              <BlockedButton
                onClick={onDemoClick}
                className="px-8 py-4 bg-black text-white font-light tracking-wider hover:bg-gray-800 transition-all whitespace-nowrap"
              >
                SUBSCRIBE
              </BlockedButton>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { title: 'Shop', items: ['New Arrivals', 'Clothing', 'Accessories', 'Sale'] },
              { title: 'About', items: ['Our Story', 'Sustainability', 'Careers', 'Press'] },
              { title: 'Help', items: ['Contact Us', 'Shipping', 'Returns', 'Size Guide'] },
              { title: 'Connect', items: ['Instagram', 'Pinterest', 'Facebook', 'Twitter'] }
            ].map((column, i) => (
              <div key={i}>
                <h3 className="font-light mb-4 tracking-wider text-sm">{column.title}</h3>
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item}>
                      <BlockedLink onClick={onDemoClick} className="text-sm text-gray-600 hover:text-black transition-colors">
                        {item}
                      </BlockedLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>© 2024 Luxe & Co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcommerceDemoSite;
