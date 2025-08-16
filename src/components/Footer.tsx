
'use client';

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import Logo from "./Logo";

export default function Footer() {
  const { colors } = useTheme();

  const navLinks = [
    { name: "JOIN", href: "#join-section" },
    {
      name: "CRICKET",
      href: "#cricket-section",
      subLinks: [
        { name: "ZONES", href: "#" },
        { name: "SUBMIT YOUR NEWS", href: "#" },
        { name: "ABOUT DOMESTIC CRICKET", href: "#" },
      ],
    },
    {
      name: "TEAM",
      subLinks: [
        { name: "PROFILES", href: "#" },
        { name: "ABOUT TEAM USA", href: "#" },
        { name: "MATCH CENTER", href: "#" },
        { name: "SCHEDULE", href: "#" },
      ],
    },
    {
      name: "GET INVOLVED",
      subLinks: [
        { name: "PLAYING", href: "#" },
        { name: "OFFICIATING", href: "#" },
        { name: "COACHING", href: "#" },
        { name: "WOMEN AND GIRLS", href: "#" },
      ],
    },
    {
      name: "MORE",
      subLinks: [
        { name: "PHOTOS", href: "#" },
        { name: "VIDEOS", href: "#" },
        { name: "MEDIA RELEASES", href: "#" },
        { name: "NEWS", href: "#" },
        { name: "SOCIAL HUB", href: "#" },
      ],
    },
    {
      name: "ABOUT",
      subLinks: [
        { name: "BOARD OF DIRECTORS", href: "/about/board-of-directors" },
        { name: "CODE OF CONDUCT", href: "/about/code-of-conduct" },
        { name: "COMMITTEES", href: "/about/committees" },
        { name: "CONTACT US", href: "/about/contact-us" },
      ],
    },
  ];

  return (
    <footer
      className="w-full py-8 px-4 md:px-8 lg:px-12"
      style={{ backgroundColor: colors.secondaryBackground, color: colors.thirdBackground }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Logo />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col space-y-2">
                <h3 className="text-sm md:text-lg font-semibold" style={{ color: colors.mainBackground }}>{link.name}</h3>
                {link.subLinks ? (
                  <ul className="space-y-2 text-sm md:text-lg">
                    {link.subLinks.map((subLink) => (
                      <li key={subLink.name}>
                        <Link href={subLink.href} className="hover:underline" style={{ color: colors.mainBackground }}>
                          {subLink.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Link href={link.href || '#'} className="hover:underline text-sm md:text-lg" style={{ color: colors.mainBackground }}>
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center" style={{ borderColor: colors.thirdBackground, color: colors.mainBackground }}>
          <p className="text-xs md:text-sm">&copy; 2025 Blind Cricket Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
