
'use client';

import { mediaReleases, MediaRelease } from "@/data/mediaRelease";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

export default function RecentArticles() {
  const { colors, fontSizes, fonts } = useTheme();
  const container = useRef(null);
  const [selectedArticle, setSelectedArticle] = useState<MediaRelease | null>(null);

  const recentArticles = mediaReleases.slice(0, 4);
  const mainArticle = selectedArticle || recentArticles[0];
  const otherArticles = recentArticles.filter(article => article.id !== mainArticle.id);

  useEffect(() => {
    if (recentArticles.length > 0) {
      setSelectedArticle(recentArticles[0]);
    }
  }, []);

  useGSAP(() => {
    gsap.from(container.current, {
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, { scope: container });

  const handleArticleSelect = (article: MediaRelease) => {
    setSelectedArticle(article);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.1, duration: 0.1, color: colors.mainBackground });
    const underline = e.currentTarget.querySelector('.underline-effect');
    gsap.set(underline, { transformOrigin: 'left center' });
    gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.1, duration: 0.1, color: colors.mainBackground });
    const underline = e.currentTarget.querySelector('.underline-effect');
    gsap.set(underline, { transformOrigin: 'right center' });
    gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.out" });
  };

  const createSummary = (html: string) => {
    const firstP = html.match(/<p>(.*?)<\/p>/);
    if (firstP) {
      return firstP[1];
    }
    return html;
  }

  return (
    <section ref={container} className="pt-8 px-4 md:px-14 min-h-screen uppercase">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-6xl font-bold text-center mb-8" style={{color: colors.mainBackground}} >Recent Articles</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Article Window (Left Side) */}
          <div className="lg:w-2/3 relative">
            <Link href={`/media-release/${mainArticle.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
              <div className="relative w-full h-[330px] md:h-[540px] shadow-lg group overflow-hidden">
                <img src={mainArticle.image} alt={mainArticle.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <span className="text-sm opacity-80">{new Date(mainArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <h3 className="text-2xl font-bold mt-1">{mainArticle.title}</h3>
                  <p className="mt-2 opacity-90 line-clamp-2">{createSummary(mainArticle.article)}</p>
                </div>
              </div>
            </Link>
            {/* Corner accents */}
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2  opacity-80 transition-opacity duration-300 group-hover:opacity-40" style={{borderColor:colors.thirdBackground}}></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 opacity-80 transition-opacity duration-300 group-hover:opacity-40" style={{borderColor:colors.thirdBackground}}></div>
          </div>

          {/* Article List (Right Side) */}
          <div className="lg:w-1/3 flex flex-col gap-4 mt-4 md:mt-2">
            {otherArticles.map((article) => (
              <Link
                key={article.id}
                href={`/media-release/${article.slug}`}
                className="flex items-center gap-4 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => handleArticleSelect(article)}
              >
                <div className="w-1/3 h-24 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="w-2/3 flex flex-col">
                  <span className="text-xs opacity-70">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <h4
                    className="font-semibold line-clamp-2 ml-4 duration-300 relative inline-block"
                    style={{ color: colors.mainBackground }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {article.title}
                    <span className="underline-effect absolute bottom-0 left-0 w-full h-[2px] bg-current transform scale-x-0"></span>
                  </h4>
                </div>
              </Link>
            ))}
            <div className="text-right md:mt-8">
              <Link
                href="/media-release"
                className="inline-block text-white px-4 mt-6 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                style={{ color: colors.mainBackground }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                View All Articles
                <span className="underline-effect absolute bottom-0 left-0 w-full h-[2px] bg-current transform scale-x-0"></span>
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
