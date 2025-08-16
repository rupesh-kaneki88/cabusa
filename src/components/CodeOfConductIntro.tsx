'use client'
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '@/components/ThemeProvider';

const CodeOfConductIntro = () => {
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(subtitleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(paragraphRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8 text-center">
      <h2 ref={subtitleRef} className="text-lg md:text-xl font-normal px-10 mb-1 md:px-40 lg:px-74 uppercase" style={{ color: colors.thirdBackground }}>Code of Conduct</h2>
      <p ref={paragraphRef} className="text-2xl md:text-3xl font-bold px-10 md:px-40 lg:px-74">
        Promoting a safe, fair, and inclusive environment for all participants in blind cricket.
      </p>
    </div>
  );
};

export default CodeOfConductIntro;
