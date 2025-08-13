"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { milestones } from '@/data/milestones';
import { useTheme } from './ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const Milestone = () => {
  const { colors } = useTheme();
  const milestoneSectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<(HTMLLIElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileLineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

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
        const isRight = !isMobile && index % 2 !== 0;
        gsap.fromTo(
          el.querySelector('.milestone-card'),
          {
            opacity: 0,
            x: isMobile ? 100 : (isRight ? 100 : -100),
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top center',
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

    desktopLineRefs.current.forEach((line) => {
        if (line) {
            gsap.to(line, {
                scaleX: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: line.closest('li'),
                    start: 'top center',
                    toggleActions: 'play none none reverse',
                },
            });
        }
    });

    mobileLineRefs.current.forEach((line) => {
        if (line) {
            gsap.to(line, {
                scaleX: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: line.closest('li'),
                    start: 'top 95%',
                    toggleActions: 'play none none reverse',
                },
            });
        }
    });
  }, []);

  return (
    <div className="py-10 px-4 md:px-14" ref={milestoneSectionRef}>
      <div className="container mx-auto px-4 uppercase">
        <h2 className="text-3xl md:text-6xl font-bold text-center mb-8" style={{ color: colors.mainBackground }}>Our Milestones</h2>
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 h-full w-1 md:-translate-x-1/2" role="presentation">
            <div
              ref={timelineRef}
              className="h-full w-full bg-gradient-to-b from-blue-600 to-cyan-400"
              style={{ transform: 'scaleY(0)', transformOrigin: 'top' }}
            ></div>
          </div>

          <ul className="list-none m-0 p-0" aria-label="Our Milestones Timeline">
            {milestones.map((milestone, index) => (
              <li
                key={milestone.id}
                ref={(el) => { milestoneRefs.current[index] = el; }}
                className="mb-12"
                role="listitem"
                aria-roledescription="milestone"
              >
                <div className={`flex w-full items-center justify-between md:justify-between ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-5/12 milestone-card ml-16 md:ml-0" >
                    <div className="shadow-xl p-6" style={{ backgroundColor: colors.mainBackground }}>
                      <h3 className="text-xl font-bold mb-2 italic" style={{color: colors.thirdBackground}}>{milestone.title}</h3>
                      <p className="opacity-80" style={{color:colors.secondaryBackground }}>{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-7 md:left-1/2 z-10 flex items-center justify-center" role="presentation">
                    {/* <div
                      ref={(el) => { (dotRefs.current[index] = el); }}
                      className="w-4 h-4 rounded-full"
                      style={{ opacity: 0, backgroundColor: colors.mainBackground }}
                    ></div> */}
                  </div>
                  <div className="hidden md:block w-5/12 relative">
                    <div
                        ref={(el) => { desktopLineRefs.current[index] = el; }}
                        className={`absolute top-1/2 h-px w-full border-t-2 border-dashed border-gray-400 ${index % 2 !== 0 ? 'right-0' : 'left-0'}`}
                        style={{ transform: 'scaleX(0)', transformOrigin: index % 2 !== 0 ? 'right' : 'left' }}
                    ></div>
                  </div>
                </div>
                {/* <div
                    ref={(el) => { mobileLineRefs.current[index] = el; }}
                    className="absolute top-1/2 left-2 h-px w-16 border-t-2 border-dashed border-gray-400 md:hidden"
                    style={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                ></div> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Milestone;