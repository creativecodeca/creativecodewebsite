import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { DemoTooltip } from './demoUtils';
import SaaSDemoSite from './SaaSDemoSite';
import RenovationDemoSite from './RenovationDemoSite';
import EcommerceDemoSite from './EcommerceDemoSite';
import RestaurantDemoSite from './RestaurantDemoSite';
import ProfessionalDemoSite from './ProfessionalDemoSite';

const DemoWebsiteWrapper: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number }>({
    show: false,
    x: 0,
    y: 0,
  });

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ 
      show: true, 
      x: rect.left + rect.width / 2 - 75, // Center the tooltip
      y: rect.top 
    });
    setTimeout(() => setTooltip({ show: false, x: 0, y: 0 }), 2000);
  };

  const renderDemo = () => {
    switch (type) {
      case 'saas':
        return <SaaSDemoSite onDemoClick={handleDemoClick} />;
      case 'renovation':
        return <RenovationDemoSite onDemoClick={handleDemoClick} />;
      case 'ecommerce':
        return <EcommerceDemoSite onDemoClick={handleDemoClick} />;
      case 'restaurant':
        return <RestaurantDemoSite onDemoClick={handleDemoClick} />;
      case 'professional':
        return <ProfessionalDemoSite onDemoClick={handleDemoClick} />;
      default:
        return (
          <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Demo Not Found</h1>
              <Link 
                to="/services/website/examples"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Back to Examples
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Fixed Navigation Overlay */}
      <Link
        to="/services/website/examples"
        className="fixed top-6 left-6 z-[9999] group flex items-center gap-2 px-4 py-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/90 transition-all hover:gap-3 shadow-2xl"
      >
        <img 
          src="/resources/whitelogo.png" 
          alt="Creative Code" 
          className="h-6 w-6"
        />
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          whileHover={{ width: 'auto', opacity: 1 }}
          className="text-white text-sm font-medium whitespace-nowrap overflow-hidden group-hover:opacity-100 opacity-0 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4 inline mr-1" />
          Back to Examples
        </motion.span>
      </Link>

      {/* Tooltip */}
      <DemoTooltip show={tooltip.show} x={tooltip.x} y={tooltip.y} />

      {/* Demo Content */}
      {renderDemo()}
    </div>
  );
};

export default DemoWebsiteWrapper;
