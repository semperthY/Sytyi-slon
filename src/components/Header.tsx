"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "../config/navigation";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerSolid = !isHome || scrolled;

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("/#")) {
      setMenuOpen(false);
      return;
    }

    e.preventDefault();

    if (pathname === "/") {
      document
        .querySelector(href.substring(1))
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }

    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${headerSolid
            ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-yellow-500/20"
            : "bg-transparent"
          }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className={`transition-all duration-500 ${headerSolid
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
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="relative z-[60] text-3xl text-white md:hidden"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav className="hidden items-center gap-10 text-white md:flex">
            {navigation.map((item) => {
              const baseHref = item.href.split("#")[0];

              const active =
                item.href === "/"
                  ? pathname === "/"
                  : baseHref !== "/" && pathname === baseHref;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  className={`transition-colors duration-300 ${active
                      ? "font-semibold text-yellow-500"
                      : "hover:text-yellow-500"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {menuOpen && (
        <nav className="fixed left-0 top-20 z-40 flex max-h-[calc(100vh-5rem)] w-full flex-col gap-5 overflow-y-auto bg-black/95 px-6 py-6 text-white backdrop-blur-md md:hidden">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavigation(e, item.href)}
              className="transition hover:text-yellow-500"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}