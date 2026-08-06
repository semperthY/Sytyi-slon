"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "../config/navigation";

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  const mobileNavigation = navigation.filter(
    (item) => item.name !== "Меню",
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const headerSolid = !isHome || scrolled;

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("/#")) {
      setMenuOpen(false);
      return;
    }

    event.preventDefault();

    if (pathname === "/") {
      document
        .querySelector(href.substring(1))
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }

    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${headerSolid
            ? "border-b border-yellow-500/20 bg-black/80 shadow-lg backdrop-blur-md"
            : "bg-transparent"
          }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className={`transition-all duration-500 ${headerSolid
                ? "translate-x-0 opacity-100"
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
            onClick={() => setMenuOpen((previous) => !previous)}
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
                  onClick={(event) =>
                    handleNavigation(event, item.href)
                  }
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
          {mobileNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) =>
                handleNavigation(event, item.href)
              }
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