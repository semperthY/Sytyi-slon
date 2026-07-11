export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-6 text-center"
    >
      <h1 className="text-5xl md:text-7xl font-bold">
        🐘 СЫТЫЙ СЛОНЪ
      </h1>

      <p className="mt-6 text-xl text-yellow-400">
        Домашняя кухня • Кофе • Уютная атмосфера
      </p>

      <p className="mt-6 max-w-2xl text-lg text-neutral-300">
        Добро пожаловать в кафе «Сытый Слонъ».
        Здесь вкусная еда, ароматный кофе и место,
        где хочется остаться подольше.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <button className="rounded-xl bg-yellow-500 px-8 py-3 font-bold text-black">
          📖 Смотреть меню
        </button>

        <button className="rounded-xl border border-yellow-500 px-8 py-3">
          📍 Как нас найти
        </button>
      </div>
    </section>
  );
}
