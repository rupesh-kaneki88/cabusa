
'use client';

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Logo({ color }: { color: string }) {
  const { colors } = useTheme();

  return (
    <Link href="/" className="flex items-center space-x-2" style={{ color: color }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <title>Blind Cricket Association Logo</title>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      <span className="font-bold logo-text">Blind Cricket</span>
    </Link>
  );
}
