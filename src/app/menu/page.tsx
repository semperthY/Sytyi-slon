import type { Metadata } from "next";
import Link from "next/link";

import Menu from "@/components/menu/Menu";

export const metadata: Metadata = {
    title: "Меню — Сытый слонъ",
    description: "Актуальное меню кафе «Сытый слонъ».",
};

export default function MenuPage() {
    return (
        <main className="min-h-screen bg-neutral-950">
            <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-zinc-900 px-4 py-2 text-sm font-medium text-yellow-400 transition hover:border-yellow-500 hover:bg-zinc-800"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="h-5 w-5"
                    >
                        <path
                            d="m15 18-6-6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    На главную
                </Link>
            </div>

            <Menu />
        </main>
    );
}