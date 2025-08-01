"use client";
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { youtubeVideos } from '@/data/youtube';

gsap.registerPlugin(ScrollTrigger);

const Youtube = () => {
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videos = videoRefs.current.filter((video) => video !== null) as HTMLDivElement[];

    videos.forEach((video) => {
      gsap.fromTo(
        video,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: video,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      video.addEventListener('mouseenter', () => {
        gsap.to(video, { scale: 1.05, duration: 0.3 });
      });

      video.addEventListener('mouseleave', () => {
        gsap.to(video, { scale: 1, duration: 0.3 });
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {youtubeVideos.map((video, index) => (
          <div
            key={video.id}
            ref={(el) => (videoRefs.current[index] = el)}
            className="aspect-w-16 aspect-h-9"
          >
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Youtube;