"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useWelcome } from "../hooks/useWelcome";

import WelcomeScreen from "./WelcomeScreen";
import Hero from "./Hero";
import Menu from "./menu/Menu";
import About from "./About";
import Contacts from "./Contacts";
import Services from "./Services";

export default function HomeContent() {
  const pathname = usePathname();
  const { ready, visible, closing } = useWelcome();

  console.log({
    ready,
    visible,
    closing,
  });

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
      <Menu />
      <Services />
      <About />
      <Contacts />
    </>
  );
}