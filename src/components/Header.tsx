
'use client';

import Logo from "./Logo";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Header() {
  const { colors } = useTheme();
  const headerRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Events", href: "#" },
    { name: "News", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed w-full z-10 top-0 flex items-center justify-between h-20 px-4 md:px-8 lg:px-12"
      style={{ backgroundColor: 'transparent', color: colors.text }}
    >
      <Logo />
      <nav className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link 
            key={link.name}
            href={link.href} 
            style={{ color: colors.text }} 
            className="relative inline-block hover:text-red-600 transition-colors text-lg"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2, color: colors.secondaryText });
              const underline = e.currentTarget.querySelector('.underline-effect');
              gsap.set(underline, { transformOrigin: 'left center' });
              gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, duration: 0.2,color: colors.text });
              const underline = e.currentTarget.querySelector('.underline-effect');
              gsap.set(underline, { transformOrigin: 'right center' });
              gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.out" });
            }}
          >
            {link.name}
            <span className="underline-effect absolute bottom-0 left-0 w-full h-[2px] bg-current transform scale-x-0"></span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
