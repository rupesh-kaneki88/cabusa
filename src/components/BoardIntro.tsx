'use client'
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '@/components/ThemeProvider';

const BoardIntro = () => {
  const { colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(subtitleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(paragraphRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
      .fromTo(detailsRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8 text-center">
      <h2 ref={subtitleRef} className="text-lg md:text-xl font-normal px-10 mb-1 md:px-40 lg:px-74 uppercase" style={{ color: colors.thirdBackground }}>Blind Cricket USA Board</h2>
      <p ref={paragraphRef} className="text-2xl md:text-3xl font-bold mb-8 px-10 md:px-40 lg:px-74">
        Blind Cricket USA’s Board of Directors holds the ultimate responsibility for guiding the vision, strategy, and development of blind cricket across the country.
      </p>
      <div ref={detailsRef} className="text-base md:text-lg text-gray-500 text-left px-4 md:px-14 space-y-2 md:space-y-4">
        <p>
          Our mission is to govern, support, promote, and develop blind and visually impaired cricket at all levels in the United States. We aim to create inclusive opportunities for athletes to participate, grow, and achieve excellence in both national and international competition.
        </p>

        <p>
          Through a committed and representative Board of Directors, Blind Cricket USA brings together voices from diverse regions and backgrounds within the visually impaired community. The Board leads efforts to raise awareness, provide access, and build a strong foundation for blind cricket in the U.S.
        </p>

        <p>
          Under the leadership of its Chairperson, the current Board is made up of dedicated individuals from across the nation. All Board members are voting members and play a key role in shaping the future of Blind Cricket USA.
        </p>
      </div>
    </div>
  );
};

export default BoardIntro;