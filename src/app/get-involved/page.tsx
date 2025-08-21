'use client';

import { useTheme } from '@/components/ThemeProvider';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sections } from '@/data/getInvolved';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const GetInvolvedPage = () => {
  const { colors } = useTheme();
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, x: -window.innerWidth }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' });
    }
    sectionRefs.current.forEach((el) => {
      if (el) {
        gsap.fromTo(el, { opacity: 0, y: 90 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        });
      }
    });
  }, []);

  return (
    <div className="">
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Get Involved</h1>
      </div>

      <div className="w-full mx-auto">
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
                alt={section.description}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full p-12 md:p-30">
              <p className='text-lg md:text-xl text-gray-400 font-bold'>Explore...</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase italic" style={{ color: colors.mainBackground }}>{section.title}</h2>
              <p className="text-base md:text-lg text-gray-500">{section.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='h-20 md:h-34 flex items-center justify-center' style={{ backgroundColor:colors.thirdBackground, color: colors.secondaryBackground}}>
        <Link href={'/about/contact-us'}>
          <button className='text-xl md:text-2xl uppercase font-semibold cursor-pointer underline transition hover:text-gray-300'>
            Become part of the blind cricket
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default GetInvolvedPage;
