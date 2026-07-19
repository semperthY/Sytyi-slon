import { menu } from "../data/menu";

const categories = [
  "Закуски",
  "Горячие закуски",
  "Салаты",
  "Супы",
  "Горячие блюда",
  "Гарниры",
  "Паста",
  "Пицца",
  "Бургеры",
  "Десерты",
  "Напитки",
];

export default function MenuSection() {
  return (
    <section
      id="menu"
      className="bg-neutral-950 px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-14 text-center text-4xl font-bold">
          Наше меню
        </h2>

        {categories.map((category) => {
          const items = menu.filter(
            (item) => item.category === category
          );

          if (!items.length) return null;

          return (
            <div key={category} className="mb-16">
              <h3 className="mb-6 border-l-4 border-yellow-500 pl-4 text-3xl font-bold">
                {category}
              </h3>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-neutral-900 p-6 transition hover:-translate-y-1 hover:border hover:border-yellow-500"
                  >
                    <div className="mb-5 flex aspect-video items-center justify-center rounded-xl bg-neutral-800 text-5xl">
                      🍽️
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-xl font-semibold">
                        {item.name}
                      </h4>

                      <span className="rounded-full bg-yellow-500 px-3 py-1 font-bold text-black">
                        {item.price}
                      </span>
                    </div>

                    {item.weight && (
                      <p className="mt-2 text-sm text-neutral-400">
                        {item.weight}
                      </p>
                    )}

                    {item.description && (
                      <p className="mt-3 text-neutral-300">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
