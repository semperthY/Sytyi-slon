import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Фоновое изображение */}
      <Image
        src="/hero-bg.png"
        alt="Интерьер кафе"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Затемнение */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Золотое свечение */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_60%)]" />

      {/* Контент */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center text-white">

        {/* Логотип */}
        <Image
          src="/logo.png"
          alt="Сытый Слонъ"
          width={420}
          height={240}
          priority
          className="mb-10 h-auto w-80 max-w-full"
        />

        {/* Слоган */}
        <p className="text-lg uppercase tracking-[0.35em] text-yellow-500 md:text-xl">
          Домашняя кухня • Кофе • Уют
        </p>

        {/* Описание */}
        <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-200">
          Добро пожаловать в кафе, где домашняя кухня встречается
          с уютной атмосферой и ароматом свежесваренного кофе.
          Мы готовим с душой, чтобы каждый гость чувствовал себя как дома.
        </p>

        {/* Кнопки */}
        <div className="mt-12 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-center">

          <button className="rounded-xl bg-yellow-500 px-8 py-4 font-semibold text-black transition duration-300 hover:scale-105 hover:bg-yellow-400">
            Посмотреть меню
          </button>

          <button className="rounded-xl border border-yellow-500 px-8 py-4 font-semibold text-yellow-400 transition duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-black">
            Как нас найти
          </button>

        </div>

        {/* Основание */}
        <p className="mt-12 text-sm uppercase tracking-[0.35em] text-yellow-500">
          ✦ Основано в 2016 году
        </p>

        {/* Индикатор прокрутки */}
        <div className="mt-12 animate-bounce text-3xl text-yellow-500">
          ↓
        </div>

      </div>
    </section>
  );
}
