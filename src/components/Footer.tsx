
'use client';

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { colors } = useTheme();

  return (
    <footer
      className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <p className="text-xs" style={{ opacity: 0.8 }}>&copy; 2024 Blind Cricket Association. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" style={{ color: colors.text }} className="text-xs hover:text-accent-yellow transition-colors">Terms of Service</Link>
        <Link href="#" style={{ color: colors.text }} className="text-xs hover:text-accent-yellow transition-colors">Privacy</Link>
      </nav>
    </footer>
  );
}
