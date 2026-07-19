import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <h1 className="text-7xl font-bold text-amber-700">404</h1>

        <h2 className="mt-6 text-3xl font-bold">
          Такой страницы нет
        </h2>

        <p className="mt-4 text-gray-600">
          Похоже, вы свернули не туда. Давайте вернёмся в кафе
          «Сытый Слонъ».
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-amber-700 px-6 py-3 font-semibold text-white transition hover:bg-amber-800"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
