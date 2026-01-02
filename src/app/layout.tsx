import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SonicSlip | Your Music Boarding Pass",
  description: "Turn your Spotify history into a designer boarding pass.",
  // THIS IS WHAT GOOGLE NEEDS TO VERIFY YOU:
  other: {
    "google-adsense-account": "ca-pub-8655334992053664",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning={true}>
        {/* GOOGLE ADSENSE SCRIPT */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8655334992053664"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}