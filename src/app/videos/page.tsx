
'use client';

import { videos } from '@/data/videos';
import { useTheme } from '@/components/ThemeProvider';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';


gsap.registerPlugin(ScrollTrigger);

const VideosPage = () => {
  const { colors } = useTheme();
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }
  }, []);

  useGSAP(() => {
    const gridItems = gridRef.current?.children 
      ? Array.from(gridRef.current.children) 
      : [];
  
    if (gridItems.length) {
      gsap.fromTo(
        gridItems,
        {
          y: 200,
          opacity: 0,
          scale: 1,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: gridRef });

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector('img'), { scale: 1.1, duration: 0.3, opacity:1 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 0.3, opacity:0.7 });
  };

  const handleFocus = (e: React.FocusEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector('img'), { scale: 1.1, duration: 0.3, opacity:1 });
  };

  const handleBlur = (e: React.FocusEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 0.3, opacity:0.7 });
  };

  return (
    <div className="mb-4 md:mb-8">
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Videos</h1>
      </div>
      <div ref={gridRef} className="container mx-auto px-4 md:px-24 py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {videos.map((video) => (
          <Link 
            key={video.id} 
            href={`/videos/${video.slug}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={0}
            className="relative shadow-md overflow-hidden h-84"
          >
            <Image src={video.thumbnail} alt={video.title} layout="fill" className="w-full h-full object-cover opacity-70" />
            <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm">{video.category}</div>
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4">
              <h2 className="text-lg font-bold text-white">{video.title}</h2>
              <p className="text-sm text-gray-300">{video.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
