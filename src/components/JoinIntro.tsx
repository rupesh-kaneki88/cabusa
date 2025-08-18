'use client'
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '@/components/ThemeProvider';

const JoinIntro = () => {
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLParagraphElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (titleRef.current) {
      tl.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1.2 });
    }

    tl.fromTo(subtitleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
      .fromTo(paragraphRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
      .fromTo(detailsRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
  }, []);

  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Become a Volunteer</h1>
      </div>
      <div ref={containerRef} className="container mx-auto px-4 py-8 text-center">
        <h2 ref={subtitleRef} className="text-lg md:text-xl font-normal px-10 mb-1 md:px-40 lg:px-74 uppercase" style={{ color: colors.thirdBackground }}>Join Our Team</h2>
        <p ref={paragraphRef} className="text-2xl md:text-3xl font-bold mb-8 px-10 md:px-40 lg:px-74">
          “The best way to find yourself is to lose yourself in the service of others.”
        </p>
        <div ref={detailsRef} className="text-base md:text-lg text-gray-500 text-left px-4 md:px-14 space-y-2 md:space-y-4">
          <p>
            Volunteers are the backbone of Blind Cricket USA. Your time, skills, and passion can make a real difference in the lives of visually impaired athletes. Whether you can help on match days, assist with administrative tasks, or lend your professional expertise, we have a role for you.
          </p>

          <p>
            By joining us, you’ll become part of a dedicated community working to promote inclusivity, sportsmanship, and excellence in blind cricket. We welcome volunteers from all backgrounds and abilities. No prior experience with cricket is necessary—just a willingness to learn and a desire to contribute.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinIntro;
