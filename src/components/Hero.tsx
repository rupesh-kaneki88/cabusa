'use client';

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Hero() {
  const { colors, fontSizes, fonts } = useTheme();
  const container = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Start: Title at bottom-left with low opacity
    tl.set(titleRef.current, {
      position: "absolute",
      left: 0,
      bottom: 0,
      autoAlpha: 0.2,
      x: 0,
      y: 200
    });
    
    // Step 1: Animate the underline sweep from left to right
    tl.to(".underline-sweep", {
      width: "100%",
      duration: 0.8,
      ease: "power2.out",
    });

    // Step 2: Fade in the title at bottom-left
    tl.to(titleRef.current, {
      autoAlpha: 1,
      duration: 0,
      ease: "power2.out"
    });


    // Step 3: Move title to its final position at the top
    tl.to(titleRef.current, {
      position: "relative",
      left: "auto",
      bottom: "auto",
      x: 0,
      y: 0,
      duration: 1,
      ease: "power3.out",
      onComplete: () => {
        // Clear absolute positioning after animation
        gsap.set(titleRef.current, { clearProps: "position,left,bottom" });
      }
    });

    tl.to(".underline-sweep", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    });

    // Step 4: Show other content after title is in final position
    tl.to(contentRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, "-=0.4");
  
    tl.to(imageRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        // Add the gradient class to the title after all animations are complete
        if (titleRef.current) {
          (titleRef.current as HTMLElement).classList.add("gradient-text");
        }
      }
    }, "-=0.4");
  
  }, { scope: container });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (buttonRef.current) {
      const { clientX, clientY } = e;
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      gsap.to(buttonRef.current, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.7,
        ease: "power3.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1,0.3)"
      });
    }
  };
  
  const handleLearnMoreMouseEnter = () => {
    gsap.to(".learn-more-line", {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.out",
      transformOrigin: "left center"
    });
  };

  const handleLearnMoreMouseLeave = () => {
    gsap.to(".learn-more-line", {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.out",
      transformOrigin: "right center"
    });
  };
  
  return (
    <section
      ref={container}
      className="w-screen h-screen flex items-center justify-center pt-16 md:pt-0 px-4 lg:px-12 md:px-8 uppercase"
      style={{ backgroundColor: colors.mainBackground, color: colors.text }}
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="text-container flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="relative" style={{ minHeight: "120px" }}>
                <h1
                  ref={titleRef}
                  className="text-4xl font-bold tracking-tighter md:text-7xl gradient-text uppercase italic"
                  style={{
                    color: colors.textHeading,
                    opacity: 0,
                  }}
                >
                  Cricket Association Board of 
                  <span className="font-montserrat" style={{ color: colors.text }}> United </span>
                  States
                  <span
                    className="underline-sweep mt-2 absolute bottom-0 left-0 h-[2px] w-0"
                    style={{ backgroundColor: colors.accent }}
                  ></span>
                </h1>
              </div>
              <div ref={contentRef} style={{ opacity: 0 }}>
                <p className="max-w-[600px] text-lg md:text-xl uppercase italic" style={{ color:colors.secondaryBackground }}>
                  Discover the incredible sport of blind cricket and the amazing athletes who play it.
                </p>
                <div className="flex flex-col gap-3 min-[400px]:flex-row mt-14 lg:mt-8">
                  <Link
                    href="#"
                    className="relative inline-flex h-10 items-center justify-center px-8 text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    style={{ color: colors.thirdBackground }}
                    onMouseEnter={handleLearnMoreMouseEnter}
                    onMouseLeave={handleLearnMoreMouseLeave}
                  >
                    <span className='relative z-10'>Learn More</span>
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-current learn-more-line origin-left scale-x-0"></span>
                  </Link>
                  <Link
                    ref={buttonRef}
                    href="#"
                    className="inline-flex h-10 items-center justify-center border bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-text-light/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                    style={{ borderColor: colors.text, color: colors.text }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className='watch-highlights-btn'>Watch Highlights</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="hidden lg:block cricket-image-container" ref={imageRef} style={{ opacity: 0 }}>
              <img src='/cricket-batsman.png' alt='A blind cricket batsman playing a shot.' width={900} height={900} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
''

