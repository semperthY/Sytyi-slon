"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navigation } from "../config/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${scrolled
            ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-yellow-500/20"
            : "bg-transparent"
          }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Логотип появляется только после прокрутки */}
          <a
            href="#hero"
            className={`transition-all duration-500 ${scrolled
                ? "opacity-100 translate-x-0"
                : "pointer-events-none -translate-x-4 opacity-0"
              }`}
          >
            <Image
              src="/logo.png"
              alt="Сытый Слонъ"
              width={140}
              height={60}
              className="h-12 w-auto"
            />
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-white md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav className="hidden items-center gap-10 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors duration-300 hover:text-yellow-500"
              >
                {item.name}
              </a>
            ))}
          </nav>

        </div>
      </header>

      {menuOpen && (
        <nav className="fixed left-0 top-20 z-40 flex max-h-[calc(100vh-5rem)] w-full flex-col gap-5 bg-black/95 px-6 py-6 text-white backdrop-blur-md md:hidden overflow-y-auto">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="transition hover:text-yellow-500"
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
