import Link from "next/link";
import { Phone, Wine, Music4, Tv, UtensilsCrossed, PartyPopper } from "lucide-react";

export const metadata = {
  title: "Банкеты | Сытый Слонъ",
  description:
    "Организация банкетов в кафе «Сытый Слонъ». Банкетное меню от 2500 ₽ с человека.",
};

const features = [
  {
    icon: <UtensilsCrossed className="w-8 h-8 text-amber-600" />,
    title: "От 2500 ₽/чел.",
    text: "Банкетное меню с индивидуальным подбором блюд.",
  },
  {
    icon: <Wine className="w-8 h-8 text-amber-600" />,
    title: "Свой алкоголь",
    text: "Разрешается принести алкоголь с собой.",
  },
  {
    icon: <Music4 className="w-8 h-8 text-amber-600" />,
    title: "Музыкальное оборудование",
    text: "Для праздников и торжеств.",
  },
  {
    icon: <Tv className="w-8 h-8 text-amber-600" />,
    title: "Телевизор",
    text: "Для фото, видео и поздравлений.",
  },
];

export default function BanquetsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <section className="text-center mb-16">
        <PartyPopper className="w-16 h-16 mx-auto text-amber-600 mb-6" />

        <h1 className="text-4xl font-bold mb-4">
          Организация банкетов
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Кафе «Сытый Слонъ» приглашает провести свадьбы, юбилеи,
          дни рождения, корпоративы и другие торжественные мероприятия
          в уютной атмосфере.
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

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8">
          Подходит для
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border p-5">💍 Свадьбы</div>
          <div className="rounded-xl border p-5">🎂 Дни рождения</div>
          <div className="rounded-xl border p-5">🎉 Юбилеи</div>
          <div className="rounded-xl border p-5">👔 Корпоративы</div>
          <div className="rounded-xl border p-5">👨‍👩‍👧 Семейные праздники</div>
        </div>
      </section>

      <section className="bg-amber-50 rounded-3xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Забронировать банкет
        </h2>

        <p className="text-gray-700 mb-8">
          Свяжитесь с нами, и мы поможем подобрать меню
          и ответим на все ваши вопросы.
        </p>

        <Link
          href="tel:+79159847077"
          className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transition"
        >
          <Phone size={20} />
          Позвонить
        </Link>
      </section>

    </main>
  );
}
