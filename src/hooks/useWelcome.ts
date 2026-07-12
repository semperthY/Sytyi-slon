"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "welcome-shown";

export function useWelcome() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem(STORAGE_KEY);

    if (shown) {
      setReady(true);
      return;
    }

    setVisible(true);
    setReady(true);

    const closeTimer = setTimeout(() => {
      setClosing(true);
    }, 2000);

    const hideTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, "true");
      setVisible(false);
    }, 2500);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return {
    ready,
    visible,
    closing,
  };
}
