import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const festive = process.env.SITE_EDITION === "holiday";

export const metadata: Metadata = {
  title: "Новогоднее меню | Сытый Слонъ",
  robots: { index: false, follow: true },
};

const variants = [
  { title: "Вариант 1", image: "/images/holiday/menu-1.jpg", height: 1493 },
  { title: "Вариант 2", image: "/images/holiday/menu-2.jpg", height: 1492 },
];

export default function NewYearMenuPage() {
  if (!festive) {
    return (
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-32 text-center text-white">
        <h1 className="text-3xl font-bold">Новогоднее меню сейчас недоступно</h1>
        <Link href="/menu/" className="mt-6 inline-block text-amber-400 underline">
          Открыть меню кафе
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-emerald-950 px-4 pb-16 pt-28 text-amber-50 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center font-serif text-4xl font-bold sm:text-6xl">
          Новогоднее меню
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {variants.map(({ title, image, height }) => (
            <article key={title} className="rounded-2xl border border-amber-300/30 bg-black/20 p-3 sm:p-5">
              <h2 className="mb-3 text-center text-2xl font-semibold text-amber-200">{title}</h2>
              <a href={image} className="block rounded-lg focus-visible:outline-2 focus-visible:outline-amber-300">
                <Image src={image} width={1054} height={height} alt={`Новогоднее меню. ${title}`} className="h-auto w-full rounded-lg" />
                <span className="mt-3 block text-center text-sm text-amber-200 underline">Открыть изображение в полном размере</span>
              </a>
            </article>
          ))}
        </div>
        <Link href="/menu/" className="mt-8 inline-block text-amber-200 underline">Обычное меню кафе</Link>
      </div>
    </section>
  );
}
