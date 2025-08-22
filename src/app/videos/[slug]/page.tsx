'use client';

import { videos } from '@/data/videos';
import { useTheme } from '@/components/ThemeProvider';
import { useRef, useEffect, use } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const VideoDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const { colors } = useTheme();
  const video = videos.find((p) => p.slug === slug);
  const titleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<(HTMLDivElement | null)[]>([]);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(()=>{
    const heroImage = heroImageRef.current;
    if(!heroImage)
      return;
    gsap.fromTo(
      heroImage,{
        scale:1.2,
        opacity:0.8,
      },
      {
        scale: 1,
        opacity:1,
        duration:1,
        ease:'power3.out'
      }
    )
  }, {})

  useGSAP(() => {
    const buttonEl = buttonRef.current;
    if (!buttonEl) return;
  
    const hoverIn = () => {
      gsap.to(buttonEl, {
        y: -3, 
        scale: 1.2,
        backgroundColor: colors.mainBackground,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
  
    const hoverOut = () => {
      gsap.to(buttonEl, {
        y: 0,
        scale: 1,
        backgroundColor: 'transparent', // or original color
        duration: 0.3,
        ease: 'power2.inOut',
      });
    };
  
    buttonEl.addEventListener('mouseenter', hoverIn);
    buttonEl.addEventListener('mouseleave', hoverOut);
  

    return () => {
      buttonEl.removeEventListener('mouseenter', hoverIn);
      buttonEl.removeEventListener('mouseleave', hoverOut);
    };
  }, { dependencies: [colors.mainBackground] });

  useGSAP(() => {
    const gridItems = gridRef.current?.children 
      ? Array.from(gridRef.current.children) 
      : [];
  
    if (gridItems.length) {
      gsap.fromTo(
        gridItems,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power.out3",
          stagger: 0.2,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: gridRef });


  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { x: -window.innerWidth }, { x: 0, duration: 1, ease: 'power3.out' });
    }
    if (videoRef.current) {
      videoRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, delay: index * 0.2, ease: 'power3.out' });
        }
      });
    }
  }, [slug]);

  if (!video) {
    return <div>Video not found</div>;
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return (
    <div className="mb-4 md:mb-8">
      <div style={{ backgroundColor: colors.mainBackground }} className="relative h-[400px] md:h-[560px] mt-4 md:mt-20 overflow-hidden mb-4 md:mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 transition-opacity duration-400 z-10"/>
        <Image ref={heroImageRef} src={video.thumbnail} alt={video.description} width={500} height={300} className="w-full h-full object-cover z-0" />
        <div className='absolute inset-0 flex flex-col items-center justify-center z-10 mt-14 md:mt-4'>
          <Link href={'/videos'}>
            <button ref={buttonRef} className='border border-gray-400 py-2 px-6 mb-2 cursor-pointer' style={{color: colors.secondaryBackground}}>Videos</button>
          </Link>
          <h1 className="text-3xl md:text-6xl font-bold uppercase italic mx-4" style={{ color: colors.secondaryBackground }}>{video.title}</h1>

        </div>
      </div>
      <div className="container mx-auto px-4 md:px-24 py-8">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {video.videos.map((videoData, index) => (
            <div key={index} ref={el => {videoRef.current[index] = el;}} className="shadow-lg overflow-hidden">
              <iframe
                width="100%"
                height="315"
                src={getYouTubeEmbedUrl(videoData.url)}
                title={videoData.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 object-cover"
              ></iframe>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{videoData.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;