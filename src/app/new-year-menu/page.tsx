import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Contacts from "@/components/Contacts";

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
    <>
      <section className="bg-emerald-950 px-4 pb-16 pt-28 text-amber-50 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <section aria-labelledby="holiday-heading" className="rounded-3xl border border-amber-300/30 bg-black/20 px-5 py-9 text-center sm:px-10 sm:py-12">
            <h1 id="holiday-heading" className="mx-auto max-w-3xl font-serif text-3xl font-bold text-amber-100 sm:text-5xl">
              🎄 Новогодние праздники в кафе «Сытый слонъ»
            </h1>
            <p className="mt-5 text-xl font-semibold text-amber-200 sm:text-2xl">Время собираться вместе!</p>
            <div className="mx-auto mt-5 max-w-2xl space-y-4 text-pretty leading-7 text-amber-50/90 sm:text-lg">
              <p>Новый год — это время тёплых встреч, весёлых компаний и незабываемых моментов. Соберите коллег, друзей или близких за праздничным столом, а мы позаботимся о вкусной стороне вашего праздника!</p>
              <p>Для вас мы подготовили два варианта новогоднего меню с разнообразными закусками, салатами, горячими блюдами и десертами.</p>
              <p>Выбирайте меню по вкусу, приглашайте гостей и наслаждайтесь праздником!</p>
              <p>Пусть этот Новый год подарит вам яркие впечатления, приятные встречи и множество поводов для улыбок.</p>
            </div>
          </section>
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
      <Contacts />
    </>
  );
}
