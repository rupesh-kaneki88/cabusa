'use client';

import { photos } from '@/data/photos';
import { useTheme } from '@/components/ThemeProvider';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const PhotosPage = () => {
  const { colors } = useTheme();
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelector('img'), { scale: 1.1, duration: 0.3, opacity:1 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelector('img'), { scale: 1, duration: 0.3, opacity:0.7 });
  };

  return (
    <div className="mb-4 md:mb-8">
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>Photos</h1>
      </div>
      <div className="container mx-auto px-4 md:px-24 py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {photos.map((photo) => (
          <Link 
            key={photo.id} 
            href={`/photos/${photo.slug}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            tabIndex={0}
            className="relative shadow-md overflow-hidden h-84"
          >
            <Image src={photo.image} alt={photo.title} layout="fill" className="w-full h-full object-cover opacity-70" />
            <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-md text-sm">{photo.category}</div>
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4">
              <h2 className="text-lg font-bold text-white">{photo.title}</h2>
              <p className="text-sm text-gray-300">{photo.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PhotosPage;
