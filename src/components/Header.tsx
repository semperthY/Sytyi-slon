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
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <a href="#hero" className="flex items-center gap-3">

            <Image
              src="/logo.png"
              alt="Сытый Слонъ"
              width={56}
              height={56}
              className="h-12 w-auto"
            />

          </a>

          <button
            className="text-3xl text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <nav className="hidden gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition hover:text-yellow-500"
              >
                {item.name}
              </a>
            ))}
          </nav>

        </div>
      </header>

      {menuOpen && (
        <nav className="fixed left-0 top-20 z-40 flex w-full flex-col gap-4 bg-black/95 px-6 py-6 text-white backdrop-blur-md md:hidden">
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
