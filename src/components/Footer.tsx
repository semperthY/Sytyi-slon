export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-amber-400">
              Сытый Слонъ
            </h3>

            <p className="leading-7">
              Уютное кафе для семейных ужинов, праздников,
              банкетов и поминальных обедов.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              Навигация
            </h4>

            <ul className="space-y-2">
              <li><a href="/">Главная</a></li>
              <li><a href="/#menu">Меню</a></li>
              <li><a href="/banquets">Банкеты</a></li>
              <li><a href="/memorial">Поминальные обеды</a></li>
              <li><a href="/#contacts">Контакты</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-700 pt-6 text-center text-sm text-stone-500">
          © {new Date().getFullYear()} Сытый Слонъ. Все права защищены. sempY prod.
        </div>
      </div>
    </footer>
  );
}
