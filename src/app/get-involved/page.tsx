'use client';

import { useTheme } from '@/components/ThemeProvider';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GetInvolvedPage = () => {
  const { colors } = useTheme();
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    }
    sectionRefs.current.forEach((el) => {
      if (el) {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        });
      }
    });
  }, []);

  const sections = [
    {
      id: 'playing',
      title: 'Playing',
      image: '/cricket_6.png',
      content: 'Whether you are a seasoned player or new to the sport, there are opportunities for everyone to play blind cricket. We have teams and programs for all ages and skill levels. Join a local club, participate in our development programs, and you could even represent Team USA on the international stage. Embrace the challenge, camaraderie, and thrill of the game.',
    },
    {
      id: 'officiating',
      title: 'Officiating',
      image: '/cricket-batsman.png',
      content: 'Umpires and scorers are essential to every game of cricket. We provide comprehensive training and certification for anyone interested in officiating. By becoming an official, you play a crucial role in ensuring fair play and helping the sport grow. It is a rewarding way to stay involved with cricket and support the blind and visually impaired community.',
    },
    {
      id: 'coaching',
      title: 'Coaching',
      image: '/Gemini_cricket-Photoroom.png',
      content: 'Our coaches are dedicated to developing the next generation of blind cricket talent. If you have a passion for coaching and a desire to make a difference, we want you on our team. We offer coaching clinics and resources to help you succeed. Help shape the future of blind cricket in the USA and inspire players to achieve their full potential.',
    },
  ];

  return (
    <div className="mb-4 md:mb-8">
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Get Involved</h1>
      </div>

      <div className="container mx-auto">
        {sections.map((section, index) => (
          <div
            id={section.id}
            key={section.title}
            ref={(el) => { sectionRefs.current[index] = el; }}
            className="grid grid-cols-1 md:grid-cols-2 items-center"
          >
            <div className={`w-full h-full hidden md:block ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
              <Image
                src={section.image}
                alt={section.title}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full p-8 md:p-16">
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors.mainBackground }}>{section.title}</h2>
              <p className="text-lg text-gray-600">{section.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetInvolvedPage;
