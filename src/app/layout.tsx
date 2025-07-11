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
  title: "Bonji Meme Generator",
  description: "Create your custom Bonji character memes.",
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
