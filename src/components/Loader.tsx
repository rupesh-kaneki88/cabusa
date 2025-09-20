
'use client';

import { useTheme } from './ThemeProvider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';

export default function Loader() {
  const { colors } = useTheme();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (container.current) {
      const texts = container.current.querySelectorAll('.loading-text');
      texts.forEach(text => {
        const direction = (text as HTMLElement).dataset.direction;
        let x = 0, y = 0;
        switch (direction) {
          case 'left-to-right':
            x = window.innerWidth + 200;
            break;
          case 'right-to-left':
            x = -window.innerWidth - 200;
            break;
          case 'bottom-to-top':
            y = -window.innerHeight - 200;
            break;
          case 'top-to-bottom':
            y = window.innerHeight + 200;
            break;
        }
        gsap.to(text, {
          x: x,
          y: y,
          duration: 20 + Math.random() * 10,
          repeat: -1,
          ease: 'linear'
        });
      });
    }
  }, { scope: container });

  const createTexts = (direction: string, count: number) => {
    return Array.from({ length: count }, (_, i) => (
      <div 
        key={`${direction}-${i}`}
        className="loading-text absolute whitespace-nowrap"
        data-direction={direction}
        style={{
          fontSize: `${Math.random() * 6 + 2}rem`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          color: colors.thirdBackground,
          opacity: Math.random() * 0.3 + 0.1
        }}
      >
        Blind Cricket
      </div>
    ));
  }

  return (
    <div ref={container} className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden" style={{ backgroundColor: colors.mainBackground }} role="status" aria-live="polite">
      <span className="sr-only">Loading...</span>
      {createTexts('left-to-right', 5)}
      {createTexts('right-to-left', 5)}
      {createTexts('bottom-to-top', 5)}
      {createTexts('top-to-bottom', 5)}
    </div>
  );
}
