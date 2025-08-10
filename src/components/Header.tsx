
'use client';

import Logo from "./Logo";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

export default function Header() {
  const { colors } = useTheme();
  const headerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<SVGPathElement | null>(null);
  const line2Ref = useRef<SVGPathElement | null>(null);
  const line3Ref = useRef<SVGPathElement | null>(null);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Events", href: "#" },
    { name: "News", href: "#" },
    { name: "Contact", href: "#" },
  ];

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(mobileMenuRef.current, { x: "100%", duration: 0.3, ease: "power2.out" });
      }
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (line1Ref.current && line2Ref.current && line3Ref.current) {
      if (isMobileMenuOpen) {
        gsap.to(line1Ref.current, { attr: { d: "M6 18L18 6" }, duration: 0.3, ease: "power2.out" });
        gsap.to(line2Ref.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(line3Ref.current, { attr: { d: "M6 6l12 12" }, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(line1Ref.current, { attr: { d: "M4 6h16" }, duration: 0.3, ease: "power2.out" });
        gsap.to(line2Ref.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(line3Ref.current, { attr: { d: "M4 18h16" }, duration: 0.3, ease: "power2.out" });
      }
    }
  }, [isMobileMenuOpen]);

  const renderNavLink = (link: { name: string, href: string }, isMobile: boolean) => (
    <Link
      key={link.name}
      href={link.href}
      style={{ color: colors.text }}
      className={`relative inline-block text-lg ${isMobile ? 'py-2' : ''}`}
      onMouseEnter={(e) => {
        if (!isMobile) {
          gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2, color: colors.textAccent });
          const underline = e.currentTarget.querySelector('.underline-effect');
          gsap.set(underline, { transformOrigin: 'left center' });
          gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile) {
          gsap.to(e.currentTarget, { scale: 1, duration: 0.2, color: colors.text });
          const underline = e.currentTarget.querySelector('.underline-effect');
          gsap.set(underline, { transformOrigin: 'right center' });
          gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.out" });
        }
      }}
      onClick={() => {
        if (isMobile) {
          setIsMobileMenuOpen(false);
        }
      }}
    >
      {link.name}
      {!isMobile && <span className="underline-effect absolute bottom-0 left-0 w-full h-[2px] bg-current transform scale-x-0"></span>}
    </Link>
  );

  return (
    <header
      ref={headerRef}
      className="fixed w-full z-10 top-0 flex items-center justify-between h-20 px-4 md:px-8 lg:px-12"
      style={{ backgroundColor: 'transparent', color: colors.text }}
    >
      <Logo />
      <nav className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => renderNavLink(link, false))}
      </nav>
      <button
        className="md:hidden text-current focus:outline-none z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={line1Ref}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16"
          ></path>
          <path
            ref={line2Ref}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 12h16"
          ></path>
          <path
            ref={line3Ref}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 18h16"
          ></path>
        </svg>
      </button>
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="fixed top-0 right-0 h-screen w-64 bg-black bg-opacity-80 backdrop-blur-sm shadow-lg transform translate-x-full md:hidden z-40"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col items-center space-y-8 pt-20">
          {navLinks.map((link) => renderNavLink(link, true))}
        </div>
      </div>
    </header>
  );
}
