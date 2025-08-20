
'use client'
import { useTheme } from '@/components/ThemeProvider';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { User } from 'lucide-react';
import ImageCarousel from '@/components/ImageCarousel';

const TeamUSAPage = () => {
  const { colors } = useTheme();
  const titleRef = useRef<HTMLDivElement>(null);

  
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    }
    if (quoteRef.current) {
      gsap.fromTo(quoteRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' });
    }
    if (leftColRef.current) {
      gsap.fromTo(leftColRef.current.children, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1.1, stagger: 0.3, ease: 'power3.out' });
    }
    if (rightColRef.current) {
      gsap.fromTo(rightColRef.current.children, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 1.4, stagger: 0.3, ease: 'power3.out' });
    }
  }, []);

  const mensCommittee = [
    "Bhavya Shah",
    "John check",
    "Jane Doe",
    "Peter Jones",
    "Mary Smith",
  ];

  const womensCommittee = [
    "Bhavya Shah",
    "John check",
    "Jane Doe",
    "Peter Jones",
    "Mary Smith",
  ];

  const carouselImages = [
    { src: '/cricket-story1.webp', alt: 'A right handed batsman playing a sweep shot' },
    { src: '/cricket-story2.webp', alt: 'The team India posing with trophies after the series win.' },
    { src: '/cricket-story3.webp', alt: 'The whole team along with Dr Mahantesh presenting the world cup to Prime Minister Narendra Modi.' },
  ];

  return (
    <div className='mb-4 md:mb-8'>
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>About Team USA</h1>
      </div>
      <div className="container mx-auto px-4 md:px-24 py-8">
        <div className="text-center mb-8">
          <div className="text-center mb-8">
          <h2 ref={subtitleRef} className="text-lg md:text-xl font-normal px-10 mb-1 md:px-40 lg:px-74 uppercase" style={{color: colors.thirdBackground}}>WE ARE USA BLIND CRICKET</h2>
          <p ref={quoteRef} className="text-2xl md:text-3xl font-bold mb-8 px-10 md:px-40 lg:px-74 uppercase">Our mission is to build a world-class blind cricket team that consistently competes at the highest level, while inspiring and uplifting the blind and visually impaired cricket community throughout the United States.</p>
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400">
          <div ref={leftColRef}>
            <p className="text-lg mb-4">
              These representative blind cricket teams compete in international tournaments, including events organized under the World Blind Cricket Council (WBCC).
            </p>
            <p className="text-lg mb-4">
              The typical pathway to selection for the U.S. Blind National Squads begins with standout performances in domestic blind cricket competitions, regional development programs, and participation in national talent identification camps.
            </p>
            <p className="text-lg">
              USA Blind Cricket is also working to establish a structured championship system, with the goal of launching a National Blind Cricket Championship to provide greater opportunities and visibility for players across the country.
            </p>
          </div>
          <div ref={rightColRef}>
            <div className="mb-8">
              <h3 className="text-lg md:text-xl font-semibold mb-4" style={{color:colors.mainBackground}}>Men&#39;s National Selection Committee</h3>
              <ul>
                {mensCommittee.map((member) => (
                  <li key={member} className="flex items-center mb-2">
                    <User className="mr-2" />
                    <span>{member}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4" style={{color:colors.mainBackground}}>Women&#39;s National Selection Committee</h3>
              <ul>
                {womensCommittee.map((member) => (
                  <li key={member} className="flex items-center mb-2">
                    <User className="mr-2" />
                    <span>{member}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full" style={{ background: 'linear-gradient(to top right, #002d73, #0071ce)', color: colors.secondaryBackground }}>
        <div className="container mx-auto px-4 md:px-24 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.secondaryBackground }}>USA Senior Men</h3>
                <p className="mb-2"><span className="font-semibold">Current Status:</span> Preparing for upcoming tours.</p>
                <p className="mb-2"><span className="font-semibold">Captain:</span> Rohan Kanhai</p>
                <p className="mb-2"><span className="font-semibold">Head Coach:</span> Michael Holding</p>
                <p><span className="font-semibold">Next Assignment:</span> West Indies tour (2025)</p>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4" style={{ color: colors.secondaryBackground }}>USA Senior Women</h3>
                <p className="mb-2"><span className="font-semibold">Current Status:</span> Training camp in progress.</p>
                <p className="mb-2"><span className="font-semibold">Captain:</span> Lisa Sthalekar</p>
                <p className="mb-2"><span className="font-semibold">Head Coach:</span> Charlotte Edwards</p>
                <p><span className="font-semibold">Next Assignment:</span> England tour (2025)</p>
              </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-24 py-8">
        <ImageCarousel images={carouselImages} />
      </div>
    </div>
  );
};

export default TeamUSAPage;
