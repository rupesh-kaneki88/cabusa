'use client';

import { videos } from '@/data/videos';
import { useTheme } from '@/components/ThemeProvider';
import { useRef, useEffect, use } from 'react';
import { gsap } from 'gsap';

const VideoDetailPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = use(params);
  const { colors } = useTheme();
  const video = videos.find((p) => p.slug === slug);
  const titleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<(HTMLDivElement | null)[]>([]);

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
      <div ref={titleRef} style={{ backgroundColor: colors.mainBackground }} className="h-24 md:h-40 flex mt-24 md:mt-20 items-center justify-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold uppercase italic" style={{ color: colors.secondaryBackground }}>{video.title}</h1>
      </div>
      <div className="container mx-auto px-4 md:px-24 py-8">
        <p className="text-lg text-center mb-8">{video.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {video.videos.map((videoData, index) => (
            <div key={index} ref={el => videoRef.current[index] = el} className="shadow-lg rounded-lg overflow-hidden">
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
                <p className="text-gray-700">{videoData.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;