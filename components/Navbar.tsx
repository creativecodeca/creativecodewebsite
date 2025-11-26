import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleScrollToContact = (e: React.MouseEvent) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      e.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed z-50 w-full top-0 bg-[#020202]/60 backdrop-blur-[20px] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="text-white font-semibold tracking-tighter text-lg flex items-center gap-3 group interactable"
        >
          <div className="w-8 h-8 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-white/20 blur-md rounded-full group-hover:bg-white/30 transition-all opacity-40"></div>
            <img
              src="https://storage.googleapis.com/msgsndr/rpTHZGMl1DRkn0TYGHwe/media/69251cd0b2875758c843f88e.png"
              alt="Creative Code Logo"
              className="w-full h-full object-contain relative z-10 drop-shadow-md"
            />
          </div>
          <span className="tracking-tight text-white/90">Creative Code</span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-xs font-semibold uppercase tracking-widest text-slate-500">
          <Link
            to="/products"
            className={`hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all interactable ${location.pathname === '/products' ? 'text-white' : ''}`}
          >
            Products
          </Link>
          <Link
            to="/about"
            className={`hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all interactable ${location.pathname === '/about' ? 'text-white' : ''}`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all interactable ${location.pathname === '/contact' ? 'text-white' : ''}`}
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden md:block bg-white text-black text-xs font-bold px-6 py-2.5 rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] interactable"
          >
            Get in touch
          </Link>

          <button
            className="md:hidden text-white interactable"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#020202] border-b border-white/10 p-6 flex flex-col gap-6 animate-fade-in shadow-2xl">
          <Link
            to="/products"
            className="text-lg font-medium text-slate-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-lg font-medium text-slate-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg font-medium text-slate-300"
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          >
            Contact
          </Link>
          <Link
            to="/contact"
            className="bg-white text-black text-center font-bold px-6 py-3 rounded-full"
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          >
            Get in touch
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;