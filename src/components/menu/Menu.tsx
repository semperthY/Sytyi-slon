import { menu } from "@/data/menu";
import MenuCard from "./MenuCard";

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

export default function Menu() {
  return (
    <section
      id="menu"
      className="bg-black px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Наше меню
          </h2>

          <div className="mx-auto h-1 w-24 rounded-full bg-yellow-500" />

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            Домашняя кухня, приготовленная с любовью.
            Выберите любимые блюда из нашего меню.
          </p>
        </div>

        {categories.map((category) => {
          const items = menu.filter(
            (item) => item.category === category
          );

          if (!items.length) return null;

          return (
            <div key={category} className="mb-20">
              <h3 className="mb-8 border-l-4 border-yellow-500 pl-4 text-3xl font-bold">
                {category}
              </h3>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
