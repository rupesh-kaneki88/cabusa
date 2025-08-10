"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/components/ThemeProvider';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ShortSummery from "@/components/ShortSummery";
import Stories from "@/components/Stories";
import Sponsers from "@/components/Sponsers";
import Youtube from '@/components/Youtube';
import RecentArticles from '@/components/RecentArticles';
import Milestone from '@/components/Milestone';
import SocialMedia from '@/components/SocialMedia';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { colors } = useTheme();

  useEffect(() => {
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
    });
  }, []);

  return (
    <>
      <Header />
      <div className="relative">
        <div ref={heroRef}><Hero /></div>
        <div 
          ref={contentRef} 
          className="relative z-10 w-full"
          style={{ backgroundColor: colors.secondaryBackground }}
        >
          <ShortSummery />
          <Stories />
          <Youtube />
          <RecentArticles />
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3">
              <Milestone />
            </div>
            <div className="w-full lg:w-1/3">
              <div className="lg:sticky lg:top-0">
                <SocialMedia />
              </div>
            </div>
          </div>
          <Sponsers />
        </div>
      </div>
      <Footer />
    </>
  );
}
