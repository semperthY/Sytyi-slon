"use client";

import { useMemo, useState } from "react";
import { menu } from "@/data/menu";

export default function Menu() {
  const grouped = useMemo(() => {
    return menu.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, typeof menu>);
  }, []);

  const categories = Object.keys(grouped);

  const [opened, setOpened] = useState(categories[0]);

  return (
    <section id="menu" className="py-16 bg-white">
      <div className="container mx-auto max-w-4xl px-4">

        <h2 className="text-4xl font-bold text-center mb-10">
          Наше меню
        </h2>

        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category}
              className="border rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() =>
                  setOpened(opened === category ? "" : category)
                }
                className="w-full flex items-center justify-between px-5 py-4 bg-stone-50 hover:bg-stone-100 transition"
              >
                <span className="text-lg font-semibold">
                  {category}
                </span>

                <span
                  className={`text-xl transition-transform ${
                    opened === category ? "rotate-90" : ""
                  }`}
                >
                  ▶
                </span>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  opened === category
                    ? "max-h-[3000px]"
                    : "max-h-0"
                }`}
              >
                <div className="bg-white">

                  {grouped[category].map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center px-5 py-4 border-t"
                    >
                      <div>
                        <h3 className="font-medium">
                          {item.name}
                        </h3>

                        {item.weight && (
                          <p className="text-sm text-gray-500">
                            {item.weight}
                          </p>
                        )}

                        {item.description && (
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <span className="font-bold whitespace-nowrap">
                        {item.price} ₽
                      </span>
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
