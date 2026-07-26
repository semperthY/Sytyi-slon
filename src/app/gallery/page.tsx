import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import PageContainer from "@/components/PageContainer";

export const metadata: Metadata = {
  title: "Галерея | Сытый Слонъ",
  description: "Фотографии кафе «Сытый Слонъ».",
};

export default function GalleryPage() {
  return (
    <>
      <Header />

      <PageContainer>
        <section className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold">Галерея</h1>

          <p className="mx-auto max-w-2xl text-gray-600">
            Фотографии интерьера, блюд и атмосферы кафе «Сытый Слонъ».
          </p>
        </section>

        <GalleryGrid />
      </PageContainer>

      <Footer />
    </>
  );
}
