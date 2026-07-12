import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Фоновое изображение */}
      <Image
        src="/hero-bg.jpg"
        alt="Интерьер кафе"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Золотое свечение */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_60%)]" />

      {/* Контент */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center text-white">

        <Image
          src="/logo.png"
          alt="Сытый Слонъ"
          width={320}
          height={180}
          priority
          className="mb-10 h-auto w-72 max-w-full"
        />

        <h1 className="text-5xl font-bold tracking-[0.15em] md:text-7xl">
          СЫТЫЙ СЛОНЪ
        </h1>

        <p className="mt-5 text-lg uppercase tracking-[0.35em] text-yellow-500">
          Домашняя кухня • Кофе • Уют
        </p>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-200">
          Добро пожаловать в кафе, где домашняя кухня встречается
          с уютной атмосферой и ароматом свежесваренного кофе.
          Мы готовим с душой, чтобы каждый гость чувствовал себя как дома.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">

          <button className="rounded-xl bg-yellow-500 px-8 py-4 font-semibold text-black transition hover:bg-yellow-400">
            Посмотреть меню
          </button>

          <button className="rounded-xl border border-yellow-500 px-8 py-4 font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black">
            Как нас найти
          </button>

        </div>

        <p className="mt-12 text-sm uppercase tracking-[0.3em] text-yellow-500">
          ✦ Основано в 2016 году
        </p>

      </div>
    </section>
  );
}
