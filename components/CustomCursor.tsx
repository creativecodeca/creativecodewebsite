import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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
          target.closest('.interactable') !== null
        );

      setIsHovered(isInteractive);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`fixed top-0 left-0 border border-white/50 bg-white/[0.05] rounded-full pointer-events-none z-[9999] backdrop-blur-[2px] mix-blend-difference transition-all duration-200 ease-out`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        width: isHovered ? '50px' : '20px',
        height: isHovered ? '50px' : '20px',
        borderColor: isHovered ? '#fff' : 'rgba(255, 255, 255, 0.5)',
        background: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'
      }}
    />
  );
};

export default CustomCursor;