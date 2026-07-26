"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const images = [
    "/images/hero/hero-1.jpg",
    "/images/hero/hero-2.jpg",
    "/images/hero/hero-3.jpg",
    "/images/hero/hero-4.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Карусель */}
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`Фото ${index + 1}`}
          fill
          priority={index === 0}
          className={`object-cover object-center transition-opacity duration-1000 ${current === index ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}

      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Золотое свечение */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_60%)]" />

      {/* Контент */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pt-36 md:pt-44 text-center text-white">        {/* Логотип */}
        <div className="hero-fade-1">
          <Image
            src="/logo.png"
            alt="Сытый Слонъ"
            width={420}
            height={240}
            priority
            className="mb-10 h-auto w-80 max-w-full"
          />
        </div>

        {/* Слоган */}
        <p className="hero-fade-2 text-lg uppercase tracking-[0.35em] text-yellow-500 md:text-xl">
          Домашняя кухня • Кофе • Уют
        </p>

        {/* Описание */}
        <p className="hero-fade-3 mt-8 max-w-2xl text-lg leading-8 text-neutral-200">
          Добро пожаловать в кафе, где домашняя кухня встречается
          с уютной атмосферой и ароматом свежесваренного кофе.
          Мы готовим с душой, чтобы каждый гость чувствовал себя как дома.
        </p>

        {/* Кнопки */}
        <div className="hero-fade-4 mt-12 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="#menu"
            className="rounded-xl bg-yellow-500 px-8 py-4 text-center font-semibold text-black transition duration-300 hover:scale-105 hover:bg-yellow-400"
          >
            Посмотреть меню
          </a>

          <a
            href="#contacts"
            className="rounded-xl border border-yellow-500 px-8 py-4 text-center font-semibold text-yellow-400 transition duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-black"
          >
            Как нас найти
          </a>
        </div>

        {/* Основано */}
        <p className="hero-fade-5 mt-12 text-sm uppercase tracking-[0.35em] text-yellow-500">
          ✦ Основано в 2016 году
        </p>

        {/* Стрелка */}
        <div className="mt-12 animate-bounce text-3xl text-yellow-500">
          ↓
        </div>

        {/* Индикаторы */}
        <div className="mt-8 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Слайд ${index + 1}`}
              className={`h-3 rounded-full transition-all duration-300 ${current === index
                ? "w-8 bg-yellow-500"
                : "w-3 bg-white/50 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}