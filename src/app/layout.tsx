import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
} from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Сытый Слонъ",
  description:
    "Кафе «Сытый Слонъ» — домашняя кухня, банкеты и поминальные обеды.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${playfair.variable}
        h-full
        antialiased
      `}
    >
      <body className="min-h-full flex flex-col bg-neutral-950">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}