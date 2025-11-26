import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if device supports hover (has a mouse/trackpad)
    // This properly handles hybrid devices - if they have a mouse, show cursor
    const checkIsMobile = () => {
      // Use hover media query - true if primary input can hover (mouse/trackpad)
      const canHover = window.matchMedia('(hover: hover)').matches;

      // Also check for strictly mobile user agents (phones/tablets without mouse)
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

      // Show custom cursor if device can hover OR is not a mobile device
      // This ensures hybrid devices (Surface, touchscreen laptops) show cursor when using mouse
      return !canHover && isMobileUserAgent;
    };

    setIsMobile(checkIsMobile());

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return; // Don't track mouse on mobile

      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;

      // Check if mouse is over an iframe or Stripe buy button
      const isOverIframe = target.tagName === 'IFRAME' || target.closest('iframe') !== null;
      const isOverStripeBuyButton = target.tagName === 'STRIPE-BUY-BUTTON' || target.closest('stripe-buy-button') !== null;

      // Hide cursor when over iframe or Stripe elements to prevent glitches
      if (isOverIframe || isOverStripeBuyButton) {
        setIsHidden(true);
        return;
      } else {
        setIsHidden(false);
      }

      // Check for 'interactable' class or common interactive elements (excluding labels)
      const isInteractive =
        target.tagName !== 'LABEL' && (
          target.classList.contains('interactable') ||
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          target.closest('.interactable') !== null ||
          target.classList.contains('cursor-pointer') ||
          target.closest('.cursor-pointer') !== null
        );

      setIsHovered(isInteractive);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      document.body.addEventListener('mouseenter', handleMouseEnter);
      document.body.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  if (isHidden || isMobile) return null;

  return (
    <div
      className={`fixed top-0 left-0 border border-white/50 bg-white/[0.05] rounded-full pointer-events-none z-[9999] backdrop-blur-[2px] mix-blend-difference transition-all duration-300 ease-out`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        width: isHovered ? '60px' : '20px',
        height: isHovered ? '60px' : '20px',
        borderColor: isHovered ? '#fff' : 'rgba(255, 255, 255, 0.5)',
        background: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
        borderWidth: isHovered ? '2px' : '1px'
      }}
    />
  );
};

export default CustomCursor;