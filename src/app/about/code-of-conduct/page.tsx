'use client'
import { useTheme } from '@/components/ThemeProvider';
import CodeOfConductIntro from '@/components/CodeOfConductIntro';
import DownloadPDF from '@/components/DownloadPDF';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const CodeOfConductPage = () => {
  const { colors } = useTheme();
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }
  }, []);

  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Code of Conduct</h1>
      </div>
      <CodeOfConductIntro />
      <DownloadPDF />
    </div>
  );
};

export default CodeOfConductPage;
