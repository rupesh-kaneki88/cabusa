import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GSAPProvider } from "@/components/GSAPProvider";

export const metadata: Metadata = {
  title: "Blind Cricket Association",
  description: "The official website for the Blind Cricket Association",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <GSAPProvider>{children}</GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
