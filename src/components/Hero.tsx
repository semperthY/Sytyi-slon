import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111111] px-6 text-white"
    >
      {/* Лёгкое свечение */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_65%)]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">

        {/* Логотип */}
        <Image
          src="/logo.png"
          alt="Сытый Слонъ"
          width={340}
          height={190}
          priority
          className="mb-10 h-auto w-80 max-w-full"
        />

        {/* Название */}
        <h1 className="text-5xl font-bold tracking-[0.15em] md:text-7xl">
          СЫТЫЙ СЛОНЪ
        </h1>

        {/* Слоган */}
        <p className="mt-5 text-lg uppercase tracking-[0.35em] text-yellow-500 md:text-xl">
          Домашняя кухня • Кофе • Уют
        </p>

        {/* Описание */}
        <p className="mt-10 max-w-2xl text-lg leading-8 text-neutral-300">
          Добро пожаловать в кафе, где домашняя кухня встречается
          с уютной атмосферой и ароматом свежесваренного кофе.
          Мы готовим с душой, чтобы каждый гость чувствовал себя как дома.
        </p>

        {/* Кнопки */}
        <div className="mt-14 flex flex-col gap-4 sm:flex-row">

          <button className="rounded-xl bg-yellow-500 px-10 py-4 font-semibold text-black transition hover:bg-yellow-400">
            Посмотреть меню
          </button>

          <button className="rounded-xl border border-yellow-500 px-10 py-4 font-semibold text-yellow-500 transition hover:bg-yellow-500 hover:text-black">
            Как нас найти
          </button>

        </div>

      </div>
    </section>
  );
}
