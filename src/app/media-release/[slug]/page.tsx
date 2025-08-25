'use client';

import { mediaReleases } from '@/data/mediaRelease';
import { useTheme } from '@/components/ThemeProvider';
import Link from 'next/link';
import Image from 'next/image';
import { use, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MediaReleaseSlugPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const { colors } = useTheme();
  const release = mediaReleases.find((r) => r.slug === slug);
  const articleRef = useRef<HTMLDivElement>(null);
  const relatedArticlesRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
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
    if (articleRef.current) {
      gsap.fromTo(articleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    }
    const gridItems = relatedArticlesRef.current?.children 
      ? Array.from(relatedArticlesRef.current.children) 
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
            trigger: relatedArticlesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: relatedArticlesRef });

  if (!release) {
    return <div>Media release not found</div>;
  }

  return (
    <div className="mb-4 md:mb-8">
        <div style={{ backgroundColor: colors.mainBackground }} className="relative h-[400px] md:h-[560px] mt-4 md:mt-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 transition-opacity duration-400 z-10"/>
            {release.image === '/default.png' ? (
              <div className="w-full h-full bg-black"></div>
            ) : (
              <Image ref={heroImageRef} src={release.image} alt={release.title} width={500} height={300} className="w-full h-full object-cover z-0" />
            )}
            <div className='absolute inset-0 flex flex-col items-center justify-center z-10'>
              <Link href={'/media-release'}>
                <button ref={buttonRef} className='border border-gray-400 py-1 px-4 mb-2 cursor-pointer' style={{color: colors.secondaryBackground}}>Media Release</button>
              </Link>
              <h1 className="text-3xl md:text-6xl font-bold uppercase italic mx-4 text-center" style={{ color: colors.secondaryBackground }}>{release.title}</h1>
              <p className="text-sm font-semibold text-white opacity-70 mt-4">By {release.by} | {release.date}</p>
            </div>
        </div>
      <div className="container mx-auto px-4 md:px-24 py-8">
        <div ref={articleRef}>
          <div className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: release.article }} />
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
          <div ref={relatedArticlesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {release.related_articles.map((related) => {
                const relatedArticle = mediaReleases.find(r => r.id === related.id);
                if (!relatedArticle) return null;
                return (
                    <Link 
                        key={related.id} 
                        href={`/media-release/${related.slug}`}
                        className="relative shadow-md overflow-hidden h-64 block group"
                    >
                        <Image src={relatedArticle.image} alt={relatedArticle.title} layout="fill" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4">
                            <h3 className="text-lg font-bold text-white">{related.title}</h3>
                        </div>
                    </Link>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaReleaseSlugPage;
