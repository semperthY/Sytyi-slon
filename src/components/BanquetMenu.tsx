"use client";

import { useState } from "react";
import menu from "@/data/banquet-menu.json";

const priceFormat = new Intl.NumberFormat("ru-RU");

export default function BanquetMenu() {
  const [category, setCategory] = useState(menu[0]);

  return (
    <section className="mb-20" aria-labelledby="banquet-menu-title">
      <h2 id="banquet-menu-title" className="text-3xl font-bold text-white sm:text-4xl">
        Банкетное меню
      </h2>

      <div className="mb-7 mt-4 flex flex-wrap gap-2" role="group" aria-label="Категории банкетного меню">
        {menu.map((entry) => {
          const selected = category.id === entry.id;

          return (
            <button
              key={entry.id}
              type="button"
              aria-pressed={selected}
              aria-controls="banquet-menu-items"
              onClick={() => setCategory(entry)}
              className={`rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 sm:text-base ${
                selected
                  ? "border-amber-500 bg-amber-500 text-neutral-950"
                  : "border-amber-900 bg-neutral-900 text-amber-400 hover:bg-neutral-800"
              }`}
            >
              {entry.title}
            </button>
          );
        })}
      </div>

      <section id="banquet-menu-items" aria-labelledby="banquet-category-title" className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
        <h3 id="banquet-category-title" className="border-b border-neutral-800 px-4 py-3 text-xl font-bold text-amber-500 sm:px-5">
          {category.title}
        </h3>
        <ul className="grid gap-px bg-neutral-800 md:grid-cols-2">
          {category.items.map((item) => (
            <li key={item.name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 bg-neutral-900 p-3 sm:gap-3 sm:px-5 sm:py-4">
              <div>
                <h4 className="font-semibold text-white">{item.name}</h4>
                {item.description && (
                  <p className="mt-1 text-sm leading-5 text-neutral-400">{item.description}</p>
                )}
              </div>
              <div className="whitespace-nowrap text-right">
                <p className="font-semibold text-amber-500">{priceFormat.format(item.price)} ₽</p>
                <p className="text-xs text-neutral-400 sm:text-sm">{item.portion}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
