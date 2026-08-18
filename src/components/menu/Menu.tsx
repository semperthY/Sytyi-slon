"use client";

import { useMemo, useState } from "react";

import { menu as menuData } from "@/data/menu";
import type { MenuCategory, MenuItem } from "@/data/menu";

import MenuCard from "./MenuCard";

function prepareItems(items: MenuItem[]): MenuItem[] {
  return items
    .filter((item) => item.deleted !== true && item.visible !== false)
    .sort((first, second) => (first.sort ?? 0) - (second.sort ?? 0));
}

export default function Menu() {
  const [opened, setOpened] = useState("");

  const menu = useMemo<MenuCategory[]>(
    () =>
      menuData
        .map((category) => ({
          ...category,
          items: prepareItems(category.items),
        }))
        .filter((category) => category.items.length > 0),
    [],
  );

  return (
    <section className="bg-neutral-950 px-4 py-12 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
            Сытый слонъ
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">Наше меню</h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Актуальные блюда, цены и наличие
          </p>
        </div>

        <div className="space-y-4">
          {menu.map((category) => {
            const categoryKey = category.slug ?? category.title;
            const isOpened = opened === categoryKey;

            return (
              <div
                key={categoryKey}
                className="overflow-hidden rounded-2xl border border-yellow-500/15 bg-zinc-900/80"
              >
                <button
                  type="button"
                  onClick={() => setOpened(isOpened ? "" : categoryKey)}
                  aria-expanded={isOpened}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-zinc-800 sm:px-7"
                >
                  <span>
                    <span className="block text-xl font-bold text-yellow-400 sm:text-2xl">
                      {category.title}
                    </span>

                    <span className="mt-1 block text-sm text-zinc-500">
                      {category.items.length} позиций
                    </span>
                  </span>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={`h-6 w-6 shrink-0 text-yellow-400 transition-transform duration-300 ${
                      isOpened ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {isOpened && (
                  <div className="border-t border-zinc-800 p-4 sm:p-6">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {category.items.map((item) => (
                        <MenuCard key={item.slug || item.id} item={item} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
