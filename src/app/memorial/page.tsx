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
    icon: <HeartHandshake className="w-8 h-8 text-amber-600" />,
    title: "1500–2000 ₽/чел.",
    text: "Доступная стоимость с индивидуальным подбором меню.",
  },
  {
    icon: <UtensilsCrossed className="w-8 h-8 text-amber-600" />,
    title: "Индивидуальное меню",
    text: "Подберём блюда с учётом ваших пожеланий.",
  },
  {
    icon: <HandHeart className="w-8 h-8 text-amber-600" />,
    title: "Тактичное обслуживание",
    text: "Внимательный персонал и спокойная атмосфера.",
  },
  {
    icon: <CalendarDays className="w-8 h-8 text-amber-600" />,
    title: "Предварительное бронирование",
    text: "Подготовим всё к назначенному времени.",
  },
];

export default function MemorialPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <section className="text-center mb-16">
        <HeartHandshake className="w-16 h-16 mx-auto text-amber-600 mb-6" />

        <h1 className="text-4xl font-bold mb-4">
          Организация поминальных обедов
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Мы поможем организовать поминальный обед в спокойной и уважительной
          атмосфере. Подберём меню и подготовим всё к назначенному времени.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-20">
        {features.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border p-6 shadow-sm hover:shadow-md transition"
          >
            {item.icon}

            <h3 className="text-xl font-semibold mt-4 mb-2">
              {item.title}
            </h3>

            <p className="text-gray-600">
              {item.text}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-amber-50 rounded-3xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Свяжитесь с нами
        </h2>

        <p className="text-gray-700 mb-8">
          Ответим на ваши вопросы, согласуем дату, количество гостей и меню.
        </p>

        <Link
          href="tel:+7XXXXXXXXXX"
          className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transition"
        >
          <Phone size={20} />
          Позвонить
        </Link>
      </section>
    </main>
  );
}
