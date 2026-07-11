export default function MenuSection() {
  return (
    <section className="px-6 py-16 bg-neutral-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">
        Наше меню
      </h2>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-neutral-800 p-6">
          <h3 className="text-2xl font-semibold">☕ Кофе</h3>
          <p className="mt-3 text-neutral-300">
            Эспрессо, американо, капучино, латте.
          </p>
        </div>

        <div className="rounded-2xl bg-neutral-800 p-6">
          <h3 className="text-2xl font-semibold">🥐 Завтраки</h3>
          <p className="mt-3 text-neutral-300">
            Омлеты, сырники, круассаны, каши.
          </p>
        </div>

        <div className="rounded-2xl bg-neutral-800 p-6">
          <h3 className="text-2xl font-semibold">🍰 Десерты</h3>
          <p className="mt-3 text-neutral-300">
            Чизкейк, тирамису, эклеры и торты.
          </p>
        </div>

      </div>
    </section>
  );
}
