
'use client';

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Hero() {
  const { colors, fontSizes } = useTheme();
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".text-container .reveal", { 
      opacity: 0, 
      y: 60, 
      duration: 1, 
      stagger: 0.2 
    });
  }, { scope: container });

  return (
    <section
      ref={container}
      className="w-full mt-26 md:mt-30 lg:mt-36 px-4 lg:px-12 md:px-8"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="text-container flex flex-col justify-center space-y-4">
            <div className="space-y-2 reveal">
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                style={{ fontSize: fontSizes["6xl"] }}
              >
                Welcome to the World of Blind Cricket
              </h1>
              <p className="max-w-[600px] md:text-xl" style={{ opacity: 0.8 }}>
                Discover the incredible sport of blind cricket and the amazing athletes who play it.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row reveal">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                style={{ backgroundColor: colors.secondaryText, color: colors.text }}
                onMouseEnter={() => gsap.to(".learn-more-btn", { scale: 1.05, duration: 0.2 })}
                onMouseLeave={() => gsap.to(".learn-more-btn", { scale: 1, duration: 0.2 })}
              >
                <span className='learn-more-btn'>Learn More</span>
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-text-light/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                style={{ borderColor: colors.text, color: colors.text }}
                onMouseEnter={() => gsap.to(".watch-highlights-btn", { scale: 1.05, duration: 0.2 })}
                onMouseLeave={() => gsap.to(".watch-highlights-btn", { scale: 1, duration: 0.2 })}
              >
                <span className='watch-highlights-btn'>Watch Highlights</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="cricket-image-container">
              <img src='/GEMINI_cricket-Photoroom.png' alt='cricket' width={900} height={900} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
