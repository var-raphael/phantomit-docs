import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "phantomit — AI-powered git commits",
  description: "Watches your code, diffs your changes, and generates professional commit messages via Groq AI. Your GitHub graph stays green while you stay in flow.",
  keywords: ["git", "commit", "ai", "automation", "cli", "groq", "phantomit"],
  authors: [{ name: "var-raphael", url: "https://github.com/var-raphael" }],
  openGraph: {
    title: "phantomit — AI-powered git commits",
    description: "Watches your code and auto-generates professional git commits via Groq AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "phantomit — AI-powered git commits",
    description: "Watches your code and auto-generates professional git commits via Groq AI.",
    creator: "@var_raphael",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmMono.variable} antialiased bg-[#0a0a0a]`}>
        {children}
        <Script
          src="https://phantomtrack-cdn.vercel.app/phantom.v1.0.0.js?trackid=track_x3catnj53ilwq8d87fda6q"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
