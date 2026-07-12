import Image from "next/image";
import { brand } from "../config/brand";

type WelcomeScreenProps = {
  closing: boolean;
};

export default function WelcomeScreen({
  closing,
}: WelcomeScreenProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111111] px-8 text-center text-white ${
        closing ? "welcome-closing" : "welcome-animation"
      }`}
    >
      {/* Логотип */}
    <div className="mb-10">
      <Image
       src="/logo.png"
       alt="Сытый Слонъ"
       width={360}
       height={220}
       priority
       className="h-auto w-80 max-w-full"
      />
    </div>
      {/* Название */}
      <h1 className="text-4xl font-bold tracking-[0.2em]">
        {brand.name}
      </h1>

      {/* Слоган */}
      <div className="mt-6 text-xl text-yellow-500">
        <p>{brand.slogan.line1}</p>
        <p>{brand.slogan.line2}</p>
      </div>

      {/* Приветствие */}
      <p className="mt-10 max-w-md text-base leading-7 text-neutral-300">
        {brand.welcome}
      </p>

      {/* Разделитель */}
      <div className="my-10 flex w-full max-w-xs items-center">
        <div className="h-px flex-1 bg-yellow-600/30"></div>
        <span className="mx-4 text-yellow-500">✦</span>
        <div className="h-px flex-1 bg-yellow-600/30"></div>
      </div>

      {/* Год основания */}
      <p className="text-sm tracking-[0.25em] text-yellow-600">
        {brand.since}
      </p>
    </div>
  );
}
