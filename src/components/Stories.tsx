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
    <div className="container mx-auto px-4 md:px-14 p-56 md:pt-54">
      <h2 className="text-3xl md:text-6xl font-bold text-center mb-8">Top Stories</h2>
      <div className="space-y-16">
        {getTopStories().map((story, index) => (
          <div
            key={story.id}
            ref={(el: HTMLDivElement | null) => {
              storyRefs.current[index] = el;
            }}
            className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="w-1/2">
              <Image
                src={story.image}
                alt={story.title}
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-1/2 story-text">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.accent }}>{story.title}</h3>
              <p>{story.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
