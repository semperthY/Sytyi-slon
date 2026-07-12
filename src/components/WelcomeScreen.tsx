export default function WelcomeScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white">

      <div className="mb-8">
        {/* Здесь позже будет логотип */}
        <div className="text-7xl">🐘</div>
      </div>

      <h1 className="text-4xl font-bold tracking-wider">
        СЫТЫЙ СЛОНЪ
      </h1>

      <p className="mt-6 text-center text-lg text-yellow-400">
        Домашняя кухня.
        <br />
        Тёплая атмосфера.
      </p>

    </div>
  );
}
