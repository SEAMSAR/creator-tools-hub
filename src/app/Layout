import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CreatorBoost — AI Tools for Instagram & Reels Creators",
  description:
    "8 AI-powered tools built for short-form creators. Generate captions, hashtags, hooks, Reel ideas and more in seconds. Trusted by 2.4M+ creators worldwide.",
  keywords: [
    "caption generator",
    "hashtag generator",
    "hook generator",
    "reel ideas",
    "instagram tools",
    "creator tools",
    "AI for creators",
    "CreatorBoost",
  ],
  authors: [{ name: "CreatorBoost" }],
  creator: "CreatorBoost",
  openGraph: {
    title: "CreatorBoost — AI Tools for Instagram & Reels Creators",
    description:
      "Generate viral captions, hashtags, hooks & Reel ideas in seconds. Join 2.4M+ creators.",
    siteName: "CreatorBoost",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CreatorBoost — AI Tools for Instagram & Reels Creators",
    description:
      "8 AI-powered creator tools. Captions, hashtags, hooks & more. Free to start.",
    creator: "@creatorboost",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased bg-[#0a0a0f] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
