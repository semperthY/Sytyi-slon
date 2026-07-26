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
  metadataBase: new URL("https://сытыйслон.рф"),

  title: {
    default: "Сытый Слонъ | Кафе домашней кухни",
    template: "%s | Сытый Слонъ",
  },

  description:
    "Кафе «Сытый Слонъ» — домашняя кухня, банкеты, поминальные обеды, уютная атмосфера и вкусные блюда.",

  keywords: [
    "кафе",
    "Сытый Слонъ",
    "домашняя кухня",
    "банкеты",
    "поминальные обеды",
    "ресторан",
    "семейное кафе",
    "еда",
  ],

  applicationName: "Сытый Слонъ",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://sytyi-slon.vercel.app",
    siteName: "Сытый Слонъ",
    title: "Сытый Слонъ | Кафе домашней кухни",
    description:
      "Домашняя кухня, банкеты, поминальные обеды и уютная атмосфера.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Кафе Сытый Слонъ",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Сытый Слонъ",
    description:
      "Домашняя кухня, банкеты, поминальные обеды.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}