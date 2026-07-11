"use client";

import { useState } from "react";
import { navigation } from "../config/navigation";

export default function Header(){
  const [menuOpen, setMenuOpen] = useState(false);
  return (
  <>
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
       {navigation.map((item) => (
        <a key={item.href} href={item.href}>
         {item.name}
      </a>
))}
      </nav>
</header>

{menuOpen && (
  <nav className="flex flex-col gap-4 px-6 pb-4 md:hidden">
    {navigation.map((item) => (
      <a key={item.href} href={item.href}>
       {item.name}
      </a>
    ))}
  </nav>
)}
</>
  );
}
