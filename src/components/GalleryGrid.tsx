"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = Array.from({ length: 19 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/${i + 1}.jpg`,
  alt: `Фото ${i + 1}`,
}));

export default function GalleryGrid() {
  const [selected, setSelected] = useState(0);

  const isOpen = selected > 0;

  const prevImage = () => {
    setSelected((prev) => (prev === 1 ? images.length : prev - 1));
  };

  const nextImage = () => {
    setSelected((prev) => (prev === images.length ? 1 : prev + 1));
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "Escape":
          setSelected(0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelected(image.id)}
            className="group overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-xl"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       33vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelected(0)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 z-50 text-5xl text-white hover:opacity-70"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(0);
            }}
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/20 px-4 py-2 text-4xl text-white backdrop-blur transition hover:bg-white/30"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/20 px-4 py-2 text-4xl text-white backdrop-blur transition hover:bg-white/30"
          >
            ›
          </button>

          <div
            className="relative h-[85vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/images/gallery/${selected}.jpg`}
              alt={`Фото ${selected}`}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-5 py-2 text-white">
            {selected} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
