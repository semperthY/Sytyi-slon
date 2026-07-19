"use client";

import { useMemo, useState } from "react";
import { menu } from "../data/menu";

export default function MenuSection() {
  const grouped = useMemo(() => {
    return menu.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }

      acc[item.category].push(item);

      return acc;
    }, {} as Record<string, typeof menu>);
  }, []);

  const categories = Object.keys(grouped);

  const [opened, setOpened] = useState(categories[0] ?? "");

  return (
    <section
      id="menu"
      className="bg-neutral-950 px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-4xl">

        <h2 className="mb-14 text-center text-4xl font-bold">
          Наше меню
        </h2>

        <div className="space-y-4">

          {categories.map((category) => (

            <div
              key={category}
              className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
            >

              <button
                onClick={() =>
                  setOpened(
                    opened === category ? "" : category
                  )
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-neutral-800"
              >

                <span className="text-2xl font-bold text-yellow-400">
                  {category}
                </span>

                <span
                  className={`text-2xl transition-transform duration-300 ${
                    opened === category
                      ? "rotate-90"
                      : ""
                  }`}
                >
                  ▶
                </span>

              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  opened === category
                    ? "max-h-[3000px]"
                    : "max-h-0"
                }`}
              >
                <div className="divide-y divide-neutral-800">

                  {grouped[category].map((item) => (

                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4 px-6 py-4"
                    >

                      <div className="flex-1">

                        <h3 className="text-lg font-medium text-white">
                          {item.name}
                        </h3>

                        {item.weight && (
                          <p className="mt-1 text-sm text-neutral-400">
                            {item.weight}
                          </p>
                        )}

                        {item.description && (
                          <p className="mt-1 text-sm text-neutral-500">
                            {item.description}
                          </p>
                        )}

                      </div>

                      <div className="whitespace-nowrap text-lg font-bold text-yellow-400">
                        {item.price} ₽
                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
