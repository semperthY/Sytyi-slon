"use client";

import { useEffect, useState } from "react";

import type { MenuCategory, MenuItem } from "@/data/menu";

import MenuCard from "./MenuCard";

const categories = [
  { slug: "salads", title: "Салаты" },
  { slug: "sides", title: "Гарниры" },
  { slug: "soups", title: "Первые блюда" },
  { slug: "meat", title: "Горячие блюда" },
  { slug: "homemade", title: "Домашние блюда" },
  { slug: "bakery", title: "Выпечка" },
  { slug: "drinks", title: "Напитки" },
  { slug: "cold-rolls", title: "Холодные роллы" },
  { slug: "baked-rolls", title: "Запечённые роллы" },
  { slug: "fried-rolls", title: "Жареные роллы" },
  { slug: "onigiri", title: "Онигири" },
  { slug: "sets", title: "Сеты" },
];

function prepareItems(items: MenuItem[]): MenuItem[] {
  return items
    .filter((item) => item.deleted !== true && item.visible !== false)
    .sort((first, second) => (first.sort ?? 0) - (second.sort ?? 0));
}

export default function Menu() {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [opened, setOpened] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCategory(
      slug: string,
      title: string,
      timestamp: number,
    ): Promise<MenuCategory> {
      const response = await fetch(`/data/menu/${slug}.json?v=${timestamp}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Не удалось загрузить категорию ${slug}`);
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(`Некорректный формат категории ${slug}`);
      }

      return {
        slug,
        title,
        items: prepareItems(data as MenuItem[]),
      };
    }

    async function loadMenu() {
      setLoading(true);
      setError("");

      const timestamp = Date.now();
      const results = await Promise.allSettled(
        categories.map((category) =>
          loadCategory(category.slug, category.title, timestamp),
        ),
      );

      if (cancelled) {
        return;
      }

      const loadedMenu: MenuCategory[] = [];

      for (const result of results) {
        if (
          result.status === "fulfilled" &&
          result.value.items.length > 0
        ) {
          loadedMenu.push(result.value);
        }
      }

      setMenu(loadedMenu);
      setOpened("");

      if (loadedMenu.length === 0) {
        setError("Не удалось загрузить меню.");
      }

      setLoading(false);
    }

    void loadMenu();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-neutral-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-yellow-500/30 border-t-yellow-500" />
          <p className="mt-5 text-zinc-400">Загружаем меню...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-[60vh] bg-neutral-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-500/20 bg-zinc-900 p-8 text-center">
          <h2 className="text-2xl font-bold">Меню временно недоступно</h2>
          <p className="mt-3 text-zinc-400">Обновите страницу немного позже.</p>
        </div>
      </section>
    );
  }

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