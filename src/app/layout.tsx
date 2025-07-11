import React from 'react';
import type { Metadata } from "next";
import { Inter, Fragment_Mono } from 'next/font/google';
import "./globals.css";
import ClientBody from "./ClientBody";

// Setup Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Setup Fragment Mono font
const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-fragment-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bonji On Bonk",
  description: "Bonji gang over everythang.",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Bonji",
    description: "Bonji gang over everythang.",
    url: "https://bonjionbonk.xyz",
    siteName: "Bonji",
    images: [
      {
        url: "/images/social-share.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonji On Bonk",
    description: "Bonji gang over everythang.",
    images: ["/images/social-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fragmentMono.variable}`}>
      <body suppressHydrationWarning className="antialiased font-sans">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
