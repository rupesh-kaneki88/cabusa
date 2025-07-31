
'use client';

import Logo from "./Logo";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const { colors } = useTheme();
  const headerRef = useRef(null);
  const navRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Events", href: "#" },
    { name: "News", href: "#" },
    { name: "Contact", href: "#" },
  ];

  useGSAP(() => {
    gsap.to(headerRef.current, {
      height: 72, // Shrink to h-12 (48px)
      paddingLeft: 64, // px-4
      paddingRight: 64, // px-4
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "200px top", // Animation ends after scrolling 200px
        scrub: true,
      },
    });

    gsap.to(navRef.current, {
      fontSize: "1rem", 
      scale: 0.9, // Slightly shrink the nav links
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "200px top",
        scrub: true,
      },
    });

    gsap.to(".logo-text", {
      scale: 0.9, // Slightly shrink the logo text
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "200px top",
        scrub: true,
      },
    });

  }, { scope: headerRef });

  return (
    <header
      ref={headerRef}
      className="fixed w-full z-10 top-0 flex items-center justify-between h-30 px-4 border-b shrink-0 px-4 md:px-8 lg:px-12"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <Logo />
      <nav ref={navRef} className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link 
            key={link.name}
            href={link.href} 
            style={{ color: colors.text }} 
            className="relative inline-block hover:text-red-600 transition-colors text-lg"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2, color: colors.secondaryText });
              gsap.to(e.currentTarget.querySelector('.underline-effect'), { scaleX: 1, duration: 0.3, ease: "power2.out" });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2,color: colors.text });
              gsap.to(e.currentTarget.querySelector('.underline-effect'), { scaleX: 0, duration: 0.3, ease: "power2.out" });
            }}
          >
            {link.name}
            <span className="underline-effect absolute bottom-0 left-0 w-full h-[2px] bg-current transform scale-x-0 origin-center"></span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
