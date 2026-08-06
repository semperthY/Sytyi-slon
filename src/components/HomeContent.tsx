"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useWelcome } from "../hooks/useWelcome";

import WelcomeScreen from "./WelcomeScreen";
import Hero from "./Hero";
import About from "./About";
import Contacts from "./Contacts";
import Services from "./Services";

export default function HomeContent() {
  const pathname = usePathname();
  const { ready, visible, closing } = useWelcome();

  useEffect(() => {
    if (pathname !== "/") return;

    if (window.location.hash) {
      const id = window.location.hash.substring(1);

      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [pathname]);

  if (!ready) {
    return null;
  }

  if (visible) {
    return <WelcomeScreen closing={closing} />;
  }

  return (
    <>
      <Hero />

      <section
        id="menu"
        className="relative overflow-hidden bg-neutral-950 px-6 py-20 text-white"
      >
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-yellow-500/20 bg-zinc-900/90 px-6 py-12 text-center shadow-2xl shadow-yellow-500/5 sm:px-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
            Блюда и цены
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
            Посмотрите наше меню
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Актуальный список блюд, стоимость и наличие всегда доступны
            на отдельной странице.
          </p>

          <Link
            href="/menu/"
            className="group mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-yellow-500 px-8 py-4 text-base font-bold text-black shadow-lg shadow-yellow-500/20 transition hover:-translate-y-1 hover:bg-yellow-400 hover:shadow-xl hover:shadow-yellow-500/30"
          >
            Открыть меню

            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
            >
              <path
                d="m9 18 6-6-6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      <Services />
      <About />
      <Contacts />
    </>
  );
}