"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const scroll = () => {
      const element = document.querySelector(hash);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    // ждём, пока страница полностью отрисуется
    requestAnimationFrame(() => {
      setTimeout(scroll, 100);
    });
  }, [pathname]);

  return null;
}
