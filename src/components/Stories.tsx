'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getTopStories } from '@/data/stories';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Stories = () => {
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { colors } = useTheme();

  useEffect(() => {
    storyRefs.current.forEach((story) => {
      if (story) {
        const textContent = story.querySelector('.story-text');
        gsap.fromTo(
          textContent,
          { autoAlpha: 0, x: -70 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: story,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className="mx-auto px-4 md:px-2 lg:px-20 pt-26 md:pt-58 mb-16 uppercase" style={{ backgroundColor: colors.secondaryBackground }}>
      <h2 className="text-3xl md:text-6xl font-bold text-center mb-8" style={{ color: colors.mainBackground }}>Top Stories</h2>
      <div className="space-y-16">
        {getTopStories().map((story, index) => (
          <figure
            key={story.id}
            ref={(el: HTMLDivElement | null) => {
              storyRefs.current[index] = el;
            }}
            className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
            <div className="w-full md:w-1/2 relative overflow-hidden" 
              style={{ border: `2px dashed #ccc`, padding: '5px', height: '350px' }}>
              <Link href="#" className="overflow-hidden h-full block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onMouseEnter={(e) => gsap.to(e.currentTarget.querySelector('img'), { scale: 1.1, duration: 0.3, ease: 'power2.out' })}
                onMouseLeave={(e) => gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 0.3, ease: 'power2.inOut' })}>
                <Image
                  src={story.image}
                  alt={story.title}
                  width={400}
                  height={300}
                  className=" shadow-lg object-cover w-full h-full"
                />
              </Link>
            </div>
            <figcaption className="w-full md:w-1/2 story-text rounded-xl">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.mainBackground }}>{story.title}</h3>
              <p >{story.excerpt}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Stories;
