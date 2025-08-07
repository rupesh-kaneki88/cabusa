
'use client';

import { articles, Article } from "@/data/articles";
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
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const recentArticles = articles.slice(0, 4);
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

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.1, duration: 0.1, color: colors.secondaryText });
    const underline = e.currentTarget.querySelector('.underline-effect');
    gsap.set(underline, { transformOrigin: 'left center' });
    gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { scale: 1.1, duration: 0.1, color: colors.text });
    const underline = e.currentTarget.querySelector('.underline-effect');
    gsap.set(underline, { transformOrigin: 'right center' });
    gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section ref={container} className="py-12 px-4 md:px-14 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-6xl font-bold text-center mb-8">Recent Articles</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Article Window (Left Side) */}
          <div className="lg:w-2/3">
            <Link href={mainArticle.link}>
              <div className="relative w-full h-[330px] md:h-[540px] rounded-lg overflow-hidden shadow-lg group">
                <img src={mainArticle.image} alt={mainArticle.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <span className="text-sm opacity-80">{new Date(mainArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <h3 className="text-2xl font-bold mt-1">{mainArticle.title}</h3>
                  <p className="mt-2 opacity-90 line-clamp-2">{mainArticle.description}</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Article List (Right Side) */}
          <div className="lg:w-1/3 flex flex-col gap-4 mt-4 md:mt-2">
            {otherArticles.map((article) => (
              <div key={article.id} 
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => handleArticleSelect(article)} >
                <div className="w-1/3 h-24 rounded-lg overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="w-2/3 flex flex-col">
                  <span className="text-xs opacity-70">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <h4 
                    className="font-semibold line-clamp-2 ml-4 group-hover:text-blue-500 transition-colors duration-300 relative inline-block"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {article.title}
                    <span className="underline-effect absolute bottom-0 left-0 w-full h-[2px] bg-current transform scale-x-0"></span>
                  </h4>
                </div>
              </div>
            ))}
            <div className="text-right md:mt-8">
              <Link href="/articles">
                <div 
                  className="inline-block text-white px-4 mt-6 rounded-lg relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  View All Articles
                  <span className="underline-effect absolute bottom-0 left-0 w-full h-[2px] bg-current transform scale-x-0"></span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
