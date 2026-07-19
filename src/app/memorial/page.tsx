import PageHero from "@/components/PageHero";
import Link from "next/link";
import {
  Phone,
  UtensilsCrossed,
  HandHeart,
  CalendarDays,
  HeartHandshake,
} from "lucide-react";

export const metadata = {
  title: "Поминальные обеды | Сытый Слонъ",
  description:
    "Организация поминальных обедов в кафе «Сытый Слонъ». Стоимость от 1500 до 2000 ₽ с человека.",
};

const features = [
  {
    icon: <HeartHandshake className="h-8 w-8 text-amber-600" />,
    title: "Готовые меню",
    text: "Два готовых варианта стоимостью 1500 ₽ и 2000 ₽ на человека.",
  },
  {
    icon: <UtensilsCrossed className="h-8 w-8 text-amber-600" />,
    title: "Домашняя кухня",
    text: "Традиционные блюда из свежих и качественных продуктов.",
  },
  {
    icon: <HandHeart className="h-8 w-8 text-amber-600" />,
    title: "Тактичное обслуживание",
    text: "Спокойная атмосфера, внимательный и деликатный персонал.",
  },
  {
    icon: <CalendarDays className="h-8 w-8 text-amber-600" />,
    title: "Подготовим всё заранее",
    text: "К вашему приезду зал и стол будут полностью готовы.",
  },
];

export default function MemorialPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <PageHero
        title="Поминальные обеды"
        subtitle="Организуем поминальный обед в спокойной и уважительной атмосфере."
      />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="mb-20 grid gap-6 md:grid-cols-2">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {item.icon}

              <h3 className="mt-5 text-2xl font-bold text-amber-900">
                {item.title}
              </h3>

              <p className="mt-3 leading-relaxed text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-20 rounded-3xl bg-white p-10 shadow-md">
          <h2 className="mb-3 text-3xl font-bold text-amber-900">
            Готовые варианты меню
          </h2>

          <p className="mb-8 text-gray-600">
            Мы предлагаем два готовых варианта поминального меню. При
            необходимости состав блюд можно обсудить индивидуально.
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-amber-200 p-6 shadow-sm">
              <div className="mb-5 inline-flex rounded-full bg-amber-100 px-4 py-2 text-lg font-bold text-amber-800">
                Меню 1500 ₽
              </div>

              <ul className="space-y-2 text-gray-700">
                <li>• Салат «Витаминный»</li>
                <li>• Салат «Оливье»</li>
                <li>• Сельдь в горчичном соусе</li>
                <li>• Мясное ассорти</li>
                <li>• Бризоль куриная</li>
                <li>• Рыба в кляре</li>
                <li>• Картофель тушёный с мясом</li>
                <li>• Пироги в ассортименте</li>
                <li>• Морс в ассортименте</li>
                <li>• Чай (чёрный / зелёный)</li>
                <li>• Хлеб</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-200 p-6 shadow-sm">
              <div className="mb-5 inline-flex rounded-full bg-amber-100 px-4 py-2 text-lg font-bold text-amber-800">
                Меню 2000 ₽
              </div>

              <ul className="space-y-2 text-gray-700">
                <li>• Лапша куриная / Щи</li>
                <li>• Салат «Нежный»</li>
                <li>• Овощная тарелка</li>
                <li>• Мясное ассорти</li>
                <li>• Фруктовая тарелка</li>
                <li>• Бутерброды с сёмгой</li>
                <li>• Голубцы мясные</li>
                <li>• Рыба под шубой</li>
                <li>• Картофель тушёный с мясом</li>
                <li>• Пироги в ассортименте</li>
                <li>• Морс в ассортименте</li>
                <li>• Чай (чёрный / зелёный)</li>
                <li>• Хлеб</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-r from-amber-700 to-amber-900 p-10 text-center text-white shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">
            Свяжитесь с нами
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-amber-100">
            Поможем выбрать подходящее меню, согласуем дату проведения и
            ответим на все ваши вопросы.
          </p>

          <Link
            href="tel:+79159847077"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-amber-800 transition hover:scale-105"
          >
            <Phone size={20} />
            Позвонить
          </Link>
        </section>
      </main>
    </div>
  );
}
