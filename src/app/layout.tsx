import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnchorScroll from "@/components/AnchorScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://sytyi-slon.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "Сытый Слонъ",

  description:
    "Кафе «Сытый Слонъ» — домашняя кухня, банкеты, поминальные обеды и уютная атмосфера в пгт. Некрасовское.",

  keywords: [
    "Сытый Слонъ",
    "кафе",
    "Некрасовское",
    "банкеты",
    "поминальные обеды",
    "домашняя кухня",
  ],

  authors: [{ name: "Кафе «Сытый Слонъ»" }],

  openGraph: {
    title: "Сытый Слонъ",
    description:
      "Домашняя кухня, банкеты, поминальные обеды и уютная атмосфера.",
    url: siteUrl,
    siteName: "Сытый Слонъ",
    locale: "ru_RU",
    type: "website",
    images: [
  {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Кафе «Сытый Слонъ»",
  },
  ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Сытый Слонъ",
    description:
      "Домашняя кухня, банкеты, поминальные обеды и уютная атмосфера.",
    images: ["/og-image.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
    <body className="min-h-full flex flex-col">
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        name: "Сытый Слонъ",
        image: "https://sytyi-slon.vercel.app/og-image.png",
        url: "https://sytyi-slon.vercel.app",
        telephone: "+79159847077",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Курортный переулок, 1",
          addressLocality: "рп. Некрасовское",
          addressCountry: "RU",
        },
        servesCuisine: "Русская кухня",
        priceRange: "₽₽",
        openingHours: "Mo-Su 09:00-17:00",
      }),
    }}
  />

<>
  <AnchorScroll />
  {children}
</>
</body>
    </html>
  );
}
