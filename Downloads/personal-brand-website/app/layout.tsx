import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prashant Singh — CSE Student & Developer",
  description:
    "First-year B.Tech CSE student at VGU × NIAT who builds real products — event dashboards, AI agents, and booking systems. 10+ Hackathons, 11 Certifications, 2 Live Apps.",
  keywords: [
    "Prashant Singh",
    "CSE Student",
    "Web Developer",
    "AI Developer",
    "VGU NIAT",
    "Hackathon",
    "Portfolio",
    "React Developer",
    "B.Tech CSE",
  ],
  authors: [{ name: "Prashant Singh" }],
  openGraph: {
    title: "Prashant Singh — CSE Student & Developer",
    description:
      "First-year B.Tech CSE student who builds real products. 10+ Hackathons · 11 Certifications · 2 Live Apps.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashant Singh — CSE Student & Developer",
    description:
      "First-year B.Tech CSE student who builds real products. 10+ Hackathons · 11 Certifications · 2 Live Apps.",
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
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
