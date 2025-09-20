
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
  const [clickedLink, setClickedLink] = useState<string | null>(null);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<string | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Example threshold
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "JOIN", href: "/join" },
    {
      name: "CRICKET",
      href: "#cricket-section",
      subLinks: [
        { name: "TOURNAMENT", href: "/cricket/tournament" },
        // { name: "MATCH CENTER", href: "#" },
        // { name: "ABOUT DOMESTIC CRICKET", href: "#" },
      ],
    },
    {
      name: "TEAM",
      // href: "#team-section",
      subLinks: [
        { name: "PROFILES", href: "/team/profiles" },
        { name: "ABOUT TEAM USA", href: "/team/about-team-usa" },
        // { name: "MATCH CENTER", href: "#" },
        // { name: "SCHEDULE", href: "#" },
      ],
    },
    {
      name: "GET INVOLVED",
      // href: "/get-involved",
      subLinks: [
        { name: "PLAYING", href: "/get-involved#playing" },
        { name: "OFFICIATING", href: "/get-involved#officiating" },
        { name: "COACHING", href: "/get-involved#coaching" },
      ],
    },
    {
      name: "MORE",
      // href: "#more-section",
      subLinks: [
        { name: "PHOTOS", href: "/photos" },
        { name: "VIDEOS", href: "/videos" },
        { name: "MEDIA RELEASES", href: "/media-release" },
        // { name: "SOCIAL HUB", href: "#" },
      ],
    },
    {
      name: "ABOUT",
      // href: "#about-section",
      subLinks: [
        { name: "ABOUT US", href: "/about" },
        { name: "BOARD OF DIRECTORS", href: "/about/board-of-directors" },
        { name: "CODE OF CONDUCT", href: "/about/code-of-conduct" },
        { name: "COMMITTEES", href: "/about/committees" },
        { name: "CONTACT US", href: "/about/contact-us" }
      ],
    },
    { name: "DONATE", href: "/donate" },
  ];

  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, { 
        x: isMobileMenuOpen ? 0 : "100%", 
        duration: 0.6, 
        ease: "power3.out" 
      });
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

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const bg = e.currentTarget.querySelector('.bg-div');
    gsap.set(bg, { transformOrigin: 'left' }); // grow from left
    gsap.to(bg, {
      scaleX: 1,
      duration: 0.3,
      ease: 'power2.out',
      backgroundColor: colors.thirdBackground,
    });
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickedLink !== e.currentTarget.id) {
      const bg = e.currentTarget.querySelector('.bg-div');
      gsap.set(bg, { transformOrigin: 'right' }); // shrink toward right
      gsap.to(bg, {
        scaleX: 0,
        duration: 0.3,
        ease: 'power2.in',
        backgroundColor: colors.secondaryBackground,
      });
    }
  };

  useGSAP(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        height: clickedLink ? "5rem" : (isScrolled ? "4rem" : "5rem"), // 64px vs 80px
        duration: 0.3,
        ease: "power2.out"
      });
    }

    Object.keys(dropdownRefs.current).forEach(key => {
      const dropdown = dropdownRefs.current[key];
      if (dropdown) {
        gsap.set(dropdown, { height: 0, opacity: 0, display: 'none' });
      }
    });

    if (clickedLink && dropdownRefs.current[clickedLink]) {
      const dropdown = dropdownRefs.current[clickedLink];
      gsap.to(dropdown, {
        display: 'block',
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [clickedLink, isScrolled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (clickedLink && dropdownRefs.current[clickedLink] && !dropdownRefs.current[clickedLink]?.contains(event.target as Node)) {
        const linkElement = document.getElementById(clickedLink);
        if (linkElement && !linkElement.contains(event.target as Node)) {
          const bg = linkElement.querySelector('.bg-div');
          gsap.to(bg, { scaleX: 0, duration: 0.3, backgroundColor: colors.secondaryBackground });
          setClickedLink(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickedLink]);

  const handleClick = (linkName: string) => {
    const oldClickedLink = clickedLink;
    setClickedLink(clickedLink === linkName ? null : linkName);

    if (oldClickedLink && oldClickedLink !== linkName) {
      const oldLink = document.getElementById(oldClickedLink);
      if (oldLink) {
        const bg = oldLink.querySelector('.bg-div');
        gsap.to(bg, { scaleX: 0, duration: 0.6, backgroundColor: colors.secondaryBackground });
      }
    }

    if (clickedLink === linkName) {
      const currentLink = document.getElementById(linkName);
      if (currentLink) {
        const bg = currentLink.querySelector('.bg-div');
        gsap.to(bg, { scaleX: 0, duration: 0.3, backgroundColor: colors.secondaryBackground });
      }
    }
  };

  const mobileSubMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useGSAP(() => {
    Object.keys(mobileSubMenuRefs.current).forEach(key => {
      const subMenu = mobileSubMenuRefs.current[key];
      if (subMenu) {
        if (openMobileSubMenu === key) {
          gsap.to(subMenu, { height: 'auto', opacity: 1, duration: 0.6, ease: 'power2.out' });
        } else {
          gsap.to(subMenu, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
        }
      }
    });
  }, [openMobileSubMenu]);

  const toggleMobileSubMenu = (linkName: string) => {
    setOpenMobileSubMenu(openMobileSubMenu === linkName ? null : linkName);
  };

  return (
    <header
      ref={headerRef}
      className="fixed w-full z-20 top-0 flex items-center justify-between px-4 md:px-8 lg:px-12"
      style={{ backgroundColor: colors.secondaryBackground, color: colors.thirdBackground, borderBottom: `4px solid ${colors.thirdBackground}` }}
    >
      <Logo color={colors.mainBackground}/>
      <nav className="hidden md:flex items-center space-x-4 h-full">
        {navLinks.map((link) => (
          <div
            key={link.name}
            id={link.name}
            className="relative h-full flex items-center"
            onClick={() => link.subLinks && handleClick(link.name)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={link.href || '#'}
              className={`relative flex items-center text-lg px-4 py-2`}
              style={{ color: colors.mainBackground, zIndex: 1 }}
            >
              {/* Move bg-div here */}
              <span
                className="bg-div absolute inset-0 w-full h-full scale-x-0 z-[-1]"
                style={{ backgroundColor: colors.secondaryBackground, transformOrigin: 'left' }}
              />
              {link.name}
              {link.subLinks && (
                <svg
                  className={`w-4 h-4 ml-2 transition-transform duration-300 ${clickedLink === link.name ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
          
            {link.subLinks && (
              <div
                ref={(el) => { dropdownRefs.current[link.name] = el; }}
                className={`absolute top-full w-max p-2 shadow-lg hidden ${link.name === 'ABOUT' ? 'right-0 left-auto' : 'left-0'}`}
                style={{ backgroundColor: colors.thirdBackground, color: colors.secondaryBackground }}
              >
                {link.subLinks.map(subLink => (
                  <Link
                    key={subLink.name}
                    href={subLink.href}
                    className="block px-4 py-3 text-sm"
                  >
                    {subLink.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        
        ))}
      </nav>
      
      <button
        className="md:hidden text-current z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path ref={line1Ref} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16"></path>
          <path ref={line2Ref} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16"></path>
          <path ref={line3Ref} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 18h16"></path>
        </svg>
      </button>
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="fixed top-0 right-0 h-screen w-64 shadow-lg transform translate-x-full md:hidden z-40 overflow-y-auto"
        style={{ backgroundColor: colors.secondaryBackground, backdropFilter: 'blur(8px)' }}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col space-y-2 p-4 pt-20">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.subLinks ? (
                <button
                  onClick={() => toggleMobileSubMenu(link.name)}
                  className="w-full flex justify-between items-center px-4 py-2 text-lg text-left bg-gray-400"
                  style={{ color: colors.mainBackground }}
                >
                  {link.name}
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-400 ${openMobileSubMenu === link.name ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              ) : (
                <Link
                  href={link.href || '#'}
                  className="block px-4 py-2 text-lg bg-gray-400"
                  style={{ color: colors.mainBackground }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )}
              {link.subLinks && (
                <div 
                  ref={(el) => { mobileSubMenuRefs.current[link.name] = el; }}
                  className="pl-4 mt-2 flex-col space-y-2 overflow-hidden h-0 opacity-0 bg-gray-300"
                >
                  {link.subLinks.map(subLink => (
                    <Link
                      key={subLink.name}
                      href={subLink.href}
                      className="block px-4 py-2 text-base opacity-70"
                      style={{ color: colors.mainBackground }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subLink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/donate"
            className="block px-4 py-2 text-lg bg-gray-400"
            style={{ color: colors.mainBackground }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}
