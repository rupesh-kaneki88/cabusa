'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { youtubeVideos } from '@/data/youtube';
import { useTheme } from './ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

const Description = ({ text, maxLength }: { text: string, maxLength: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p className="animate-in text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mb-8">{text}</p>;
  }

  return (
    <div>
      <p className="animate-in text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mb-8">
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      {/* <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400 font-semibold hover:underline mb-4">
        {isExpanded ? 'Read Less' : 'Read More'}
      </button> */}
    </div>
  );
};

const YoutubeShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentIndex = useRef(0);
  const { colors } =useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalSlides = youtubeVideos.length;
      const track = trackRef.current;
      const videos = videosRef.current.filter((video): video is HTMLDivElement => video !== null);
      
      if (!track || !videos.length) return;

      // Set initial states
      gsap.set(videos, {
        opacity: 0.4,
        scale: 0.85
      });
      
      // Set first slide as active
      if (videos[0]) {
        gsap.set(videos[0], {
          opacity: 1,
          scale: 1
        });
      }

      // Animate content elements on load
      videos.forEach((video, index) => {
        const elements = video.querySelectorAll('.animate-in');
        gsap.fromTo(elements, 
          { 
            opacity: 0, 
            y: 50 
          },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            delay: index === 0 ? 0.5 : 0
          }
        );
      });

      const updateActiveSlide = (index: number) => {
        currentIndex.current = index;
        setActiveIndex(index);

        videos.forEach((video, i) => {
          if (i === index) {
            gsap.to(video, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power2.out"
            });
          } else {
            gsap.to(video, {
              opacity: 0.4,
              scale: 0.95,
              duration: 0.6,
              ease: "power2.out"
            });
          }
        });

        // Update navigation dots
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, i) => {
          if (i === index) {
            gsap.to(dot, {
              scale: 1.25,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          } else {
            gsap.to(dot, {
              scale: 1,
              opacity: 0.6,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      };

      // Main horizontal scroll animation
      const scrollTween = gsap.to(track, {
        xPercent: -100 * (totalSlides - 1) / totalSlides,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top+=1', 
          pin: true,
          scrub: 1,
          end: () => `+=${track.offsetWidth - window.innerWidth}`,
          onUpdate: (self) => {
            const minProgressToSnap = 0.05;
            const progress = self.progress < minProgressToSnap ? 0 : self.progress;
            const slideIndex = Math.round(self.progress * (totalSlides - 1));
            
            if (slideIndex !== currentIndex.current) {
              updateActiveSlide(slideIndex);
            }
            
            // Update progress bar
            if (progressRef.current) {
              gsap.set(progressRef.current, {
                scaleX: self.progress
              });
            }
          },
          snap: (progress) => {
            // Prevent early snap unless user has scrolled a bit
            return progress < 0.05
              ? 0 // snap back to first slide
              : Math.round(progress * (totalSlides - 1)) / (totalSlides - 1);
          },
        }
      });

      // Initialize first dot as active
      setTimeout(() => {
        const firstDot = document.querySelector('.nav-dot');
        if (firstDot) {
          gsap.set(firstDot, { scale: 1.25, opacity: 1 });
        }
      }, 100);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const navigateToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    
    const targetX = -index * window.innerWidth;
    
    gsap.to(track, {
      x: targetX,
      duration: 1,
      ease: "power3.inOut"
    });
    
    // Update progress manually
    const progress = index / (youtubeVideos.length - 1);
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: progress,
        duration: 1,
        ease: "power3.inOut"
      });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="w-screen h-screen overflow-hidden relative "
      style={{ backgroundColor: colors.textBody }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-px bg-gray-800 z-20">
        <div 
          ref={progressRef}
          className="h-full bg-white origin-left transform scale-x-0"
        />
      </div>

      {/* Main Content Track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{ width: `${youtubeVideos.length * 100}vw` }}
      >
        {youtubeVideos.map((video, index) => (
          <div
            key={video.id}
            ref={el => { videosRef.current[index] = el; }}
            className="w-screen h-screen flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 lg:px-20 shrink-0 will-change-transform"
          >
            {/* Video Container */}
            <div className="w-full lg:w-1/2 max-w-2xl relative group animate-in">
              <div className="relative aspect-video overflow-hidden rounded-lg shadow-2xl bg-gray-900 border border-gray-800 transition-all duration-500 hover:border-gray-700 hover:shadow-3xl hover:scale-[1.02]">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              {/* Corner accents */}
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-white opacity-20 transition-opacity duration-300 group-hover:opacity-40"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-white opacity-20 transition-opacity duration-300 group-hover:opacity-40"></div>
            </div>

            {/* Content Container */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-16 text-center lg:text-left">
              <h3
                className="animate-in text-3xl md:text-4xl lg:text-5xl font-bold cursor-pointer transition-all duration-300 hover:text-gray-300 leading-tight"
                style={{ color: colors.textHeading }}
                onClick={() =>
                  window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')
                }
              >
                {video.title}
              </h3>
              
              {/* Animated underline */}
              <div className="animate-in h-px bg-white mt-6 mb-8 transform scale-x-0 transition-transform duration-500 origin-left hover:scale-x-100"></div>
              
              <Description text={video.description} maxLength={150} />
              
              {/* Watch button */}
              <button
                onClick={() =>
                  window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')
                }
                className="animate-in px-8 py-3 bg-white text-black font-medium rounded transition-all duration-300 hover:bg-gray-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Watch Video</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h16z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {youtubeVideos.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToSlide(index)}
            className="nav-dot w-2 h-2 rounded-full bg-gray-600 transition-all duration-300 hover:bg-gray-400 focus:outline-none"
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={() => navigateToSlide(Math.max(0, currentIndex.current - 1))}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 border border-gray-700 text-white transition-all duration-300 backdrop-blur-sm hover:bg-opacity-70 hover:scale-110 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        disabled={currentIndex.current === 0}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button> */}

      {/* <button
        onClick={() => navigateToSlide(Math.min(youtubeVideos.length - 1, currentIndex.current + 1))}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 border border-gray-700 text-white transition-all duration-300 backdrop-blur-sm hover:bg-opacity-70 hover:scale-110 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        disabled={currentIndex.current === youtubeVideos.length - 1}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button> */}

      {/* Slide counter */}
      <div className="absolute top-8 right-8 text-gray-400 font-mono text-sm z-10">
        {String(activeIndex + 1).padStart(2, '0')} / {String(youtubeVideos.length).padStart(2, '0')}
      </div>
    </section>
  );
};

export default YoutubeShowcase;