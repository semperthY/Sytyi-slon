"use client";

import { useEffect, useState } from "react";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  visible?: boolean;
  sort?: number;
  createdAt?: string;
  updatedAt?: string;
};

function prepareImages(images: GalleryImage[]): GalleryImage[] {
  return images
    .filter(
      (image) =>
        image.visible !== false &&
        typeof image.src === "string" &&
        image.src.trim() !== "",
    )
    .sort(
      (first, second) =>
        (first.sort ?? 0) - (second.sort ?? 0),
    );
}

export default function GalleryGrid() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : null;

  const closeGallery = () => {
    setSelectedIndex(null);
  };

  const previousImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null || images.length === 0) {
        return null;
      }

      return currentIndex === 0
        ? images.length - 1
        : currentIndex - 1;
    });
  };

  const nextImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null || images.length === 0) {
        return null;
      }

      return currentIndex === images.length - 1
        ? 0
        : currentIndex + 1;
    });
  };

  useEffect(() => {
    let cancelled = false;

    async function loadGallery() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/data/gallery.json?v=${Date.now()}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Не удалось загрузить галерею.");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Некорректный формат галереи.");
        }

        if (!cancelled) {
          setImages(prepareImages(data as GalleryImage[]));
        }
      } catch {
        if (!cancelled) {
          setError("Не удалось загрузить фотографии.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadGallery();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        previousImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "Escape") {
        closeGallery();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, images.length]);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-yellow-500/30 border-t-yellow-500" />

        <p className="mt-4 text-gray-500">
          Загружаем фотографии...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        {error}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="rounded-2xl bg-gray-100 p-8 text-center text-gray-500">
        В галерее пока нет фотографий.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
            aria-label={`Открыть фотографию ${index + 1}`}
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={image.src}
                alt={image.alt || `Фото ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>

      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии"
          onClick={closeGallery}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-3xl text-white backdrop-blur transition hover:bg-white/25"
            onClick={(event) => {
              event.stopPropagation();
              closeGallery();
            }}
            aria-label="Закрыть"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  previousImage();
                }}
                className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-4xl text-white backdrop-blur transition hover:bg-white/25 sm:left-6"
                aria-label="Предыдущая фотография"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-4xl text-white backdrop-blur transition hover:bg-white/25 sm:right-6"
                aria-label="Следующая фотография"
              >
                ›
              </button>
            </>
          )}

          <div
            className="flex max-h-[88vh] max-w-[92vw] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={
                selectedImage.alt ||
                `Фото ${selectedIndex + 1}`
              }
              className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain"
            />
          </div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-5 py-2 text-sm text-white">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}