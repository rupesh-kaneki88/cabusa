'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getTopStories } from '@/data/stories';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';

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
    <div className="container mx-auto px-4 md:px-2 lg:px-20 p-56 md:pt-54">
      <h2 className="text-3xl md:text-6xl font-bold text-center mb-8" style={{ color: colors.mainBackground }}>Top Stories</h2>
      <div className="space-y-16">
        {getTopStories().map((story, index) => (
          <figure
            key={story.id}
            ref={(el: HTMLDivElement | null) => {
              storyRefs.current[index] = el;
            }}
            className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
            <div className="w-full md:w-1/2 relative overflow-hidden rounded-lg" 
              style={{ border: '2px dashed #ccc', padding: '5px', height: '350px' }}>
              <div className="overflow-hidden rounded-lg h-full" tabIndex={0}
                onMouseEnter={(e) => gsap.to(e.currentTarget.querySelector('img'), { scale: 1.1, duration: 0.3, ease: 'power2.out' })}
                onMouseLeave={(e) => gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 0.3, ease: 'power2.inOut' })}>
                <Image
                  src={story.image}
                  alt={story.title}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg object-cover w-full h-full"
                />
              </div>
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
