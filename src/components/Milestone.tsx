"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { milestones } from '@/data/milestones';

gsap.registerPlugin(ScrollTrigger);

const Milestone = () => {
  const milestoneSectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<(HTMLLIElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (timeline && milestoneSectionRef.current) {
      gsap.to(timeline, {
        scaleY: 1,
        scrollTrigger: {
          trigger: milestoneSectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });
    }

    milestoneRefs.current.forEach((el, index) => {
      if (el) {
        const isRight = index % 2 !== 0;
        gsap.fromTo(
          el.querySelector('.milestone-card'),
          { 
            opacity: 0,
            x: isRight ? 100 : -100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        const dot = dotRefs.current[index];
        if (dot) {
          gsap.fromTo(
            dot,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: el,
                start: 'top center',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }
    });
  }, []);

  return (
    <div className="py-20 px-4 md:px-14" ref={milestoneSectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-24">Our Milestones</h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2">
            <div
              ref={timelineRef}
              className="h-full w-full bg-gradient-to-b from-cyan-400 to-blue-600"
              style={{ transform: 'scaleY(0)', transformOrigin: 'top' }}
            ></div>
          </div>

          <ul className="list-none m-0 p-0">
            {milestones.map((milestone, index) => (
              <li
                key={milestone.id}
                ref={(el) => {milestoneRefs.current[index] = el}}
                className="mb-12"
              >
                <div className={`flex w-full items-center justify-between ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5/12 milestone-card">
                    <div className="bg-white rounded-lg shadow-xl p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="z-10 flex items-center justify-center">
                      <div
                        ref={(el) => {(dotRefs.current[index] = el)}}
                        className="w-4 h-4 bg-blue-600 rounded-full"
                        style={{ opacity: 0 }}
                      ></div>
                  </div>
                  <div className="w-5/12"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Milestone;