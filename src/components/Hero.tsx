export default function Hero() {
  return (
    <section className="min-h-[70vh] bg-neutral-950 text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">

        <h1 className="text-5xl md:text-7xl font-bold">
          🐘 СЫТЫЙ СЛОНЪ
        </h1>

        <p className="mt-6 text-lg md:text-xl text-neutral-300">
          Домашняя кухня, ароматный кофе и уютная атмосфера.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <button className="rounded-xl bg-yellow-500 px-8 py-4 font-semibold text-black hover:bg-yellow-400 transition">
            Посмотреть меню
          </button>

          <button className="rounded-xl border border-yellow-500 px-8 py-4 font-semibold text-yellow-400 hover:bg-yellow-500 hover:text-black transition">
            Забронировать столик
          </button>

        </div>

      </div>
    </section>
  );
}
