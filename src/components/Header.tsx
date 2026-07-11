"use client";

import { useState } from "react";
export default function Header(){
  const [menuOpen, setMenuOpen] = useState(false);
  return ( <>
    <header className="flex items-center justify-between p-6 bg-neutral-900 text-white">
      <h1 className="text-2xl font-bold">
        🐘 СЫТЫЙ СЛОНЪ
      </h1>
      <button
      className="text-3xl md:hidden"
      onClick={() => setMenuOpen(!menuOpen)}
      >
      ☰
      </button>
      <nav className="hidden md:flex gap-6">
        <a href="#">Главная</a>
        <a href="#">Меню</a>
        <a href="#">О нас</a>
        <a href="#">Контакты</a>
      </nav>
</header>

{menuOpen && (
  <nav className="flex flex-col gap-4 px-6 pb-4 md:hidden">
    <a href="#">Главная</a>
    <a href="#">Меню</a>
    <a href="#">О нас</a>
    <a href="#">Контакты</a>
  </nav>
)}
</>
  );
}
