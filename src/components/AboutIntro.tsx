'use client'
import { useTheme } from '@/components/ThemeProvider';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const AboutIntro = () => {
  const { colors } = useTheme();
  const aboutPara1Ref = useRef<HTMLDivElement>(null);
  const aboutPara2Ref = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(aboutPara1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(aboutPara2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
      .fromTo(visionRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 px-4 md:px-14 space-y-2 md:space-y-4">
        {/* <h2 className="text-3xl font-bold text-center mb-4 uppercase" style={{ color: colors.thirdBackground }}>About CABUSA</h2> */}
        <p ref={aboutPara1Ref} className="text-lg text-gray-500">
          The Cricket Association for the Blind - USA (CABUSA) is a pioneering initiative, committed to introducing cricket for the blind to the United States as a transformative platform for inclusion, empowerment, and holistic development of the visually impaired. Spearheaded by the internationally acclaimed Samarthanam USA & Samarthanam Trust for the Disabled, this effort marks the United States first comprehensive program to develop adaptive cricket infrastructure for individuals with visual disabilities.
        </p>
        <p ref={aboutPara2Ref} className="text-lg text-gray-500 mt-4">
          Cricket for the Blind, a sport deeply rooted in resilience and spirit, is being introduced to a country with no historical footprint of the game - making this a landmark movement in the realm of adaptive sports. CABUSA serves as a catalyst for social change, leveraging the inclusive power of cricket to inspire opportunity, dignity, and leadership for over 7 million visually impaired individuals in the United States.
        </p>
      </div>
      <div ref={visionRef} className='px-4 md:px-14 space-y-2 md:space-y-4'>
        <h2 className="text-3xl font-bold text-center mb-4 uppercase" style={{ color: colors.thirdBackground }}>Our Vision</h2>
        <p className="text-lg text-gray-500 text-center">
          To make Cricket for the Blind a mainstream adaptive sport in the United States, empowering visually impaired individuals to rise as athletes, leaders, and change makers - and building a more inclusive sporting culture rooted in equality, opportunity, and excellence.
        </p>
      </div>
    </div>
  );
};

export default AboutIntro;
