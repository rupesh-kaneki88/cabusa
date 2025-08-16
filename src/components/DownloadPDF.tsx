'use client'
import { useTheme } from '@/components/ThemeProvider';
import { useRef } from 'react';
import gsap from 'gsap';

const DownloadPDF = () => {
  const { colors } = useTheme();
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (buttonRef.current) {
      const { clientX, clientY } = e;
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      gsap.to(buttonRef.current, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.7,
        ease: "power3.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1,0.3)"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <a
        ref={buttonRef}
        href="/Code-of-Conduct-for-Players-Associations.pdf"
        download
        className="inline-block px-8 py-4 text-lg font-bold text-white border-2 transition-colors duration-300"
        style={{ backgroundColor: colors.secondaryBackground, color: colors.thirdBackground }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        Download Code of Conduct (PDF)
      </a>
    </div>
  );
};

export default DownloadPDF;
