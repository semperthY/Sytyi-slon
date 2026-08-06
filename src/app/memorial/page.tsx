import PageHero from "@/components/PageHero";
import ContactCallout from "@/components/ContactCallout";
import {
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
    icon: (
      <HeartHandshake className="h-8 w-8 text-amber-500" />
    ),
    title: "Готовые меню",
    text: "Два готовых варианта стоимостью 1500 ₽ и 2000 ₽ на человека.",
  },
  {
    icon: (
      <UtensilsCrossed className="h-8 w-8 text-amber-500" />
    ),
    title: "Домашняя кухня",
    text: "Традиционные блюда из свежих и качественных продуктов.",
  },
  {
    icon: <HandHeart className="h-8 w-8 text-amber-500" />,
    title: "Тактичное обслуживание",
    text: "Спокойная атмосфера, внимательный и деликатный персонал.",
  },
  {
    icon: (
      <CalendarDays className="h-8 w-8 text-amber-500" />
    ),
    title: "Подготовим всё заранее",
    text: "К вашему приезду зал и стол будут полностью готовы.",
  },
];

export default function MemorialPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <PageHero
        title="Поминальные обеды"
        subtitle="Организуем поминальный обед в спокойной и уважительной атмосфере."
        image="/images/memorial-hero.jpg"
      />

      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="mb-20 grid gap-6 md:grid-cols-2">
          {features.map((item) => (
            <div
              key={item.title}
              className="
                rounded-2xl
                border
                border-neutral-800
                bg-neutral-900
                p-8
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-amber-600
              "
            >
              {item.icon}

              <h3 className="mt-5 text-2xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-3 leading-relaxed text-neutral-400">
                {item.text}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-20 rounded-2xl border border-neutral-800 bg-neutral-900 p-10">
          <h2 className="mb-3 text-3xl font-bold text-white">
            Готовые варианты меню
          </h2>

          <p className="mb-8 text-neutral-400">
            Мы предлагаем два готовых варианта поминального меню.
            При необходимости состав блюд можно обсудить
            индивидуально.
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600">
              <div className="border-b border-neutral-800 p-6">
                <div className="inline-flex rounded-full bg-amber-600 px-4 py-2 text-lg font-bold text-white">
                  Меню 1500 ₽
                </div>

                <p className="mt-4 text-neutral-400">
                  Полный комплекс блюд для проведения поминального
                  обеда.
                </p>
              </div>

              <div className="p-6">
                <ul className="divide-y divide-neutral-800 text-neutral-300">
                  <li className="py-3">Салат «Витаминный»</li>
                  <li className="py-3">Салат «Оливье»</li>
                  <li className="py-3">
                    Сельдь в горчичном соусе
                  </li>
                  <li className="py-3">Мясное ассорти</li>
                  <li className="py-3">Бризоль куриная</li>
                  <li className="py-3">Рыба в кляре</li>
                  <li className="py-3">
                    Картофель тушёный с мясом
                  </li>
                  <li className="py-3">
                    Пироги в ассортименте
                  </li>
                  <li className="py-3">
                    Морс в ассортименте
                  </li>
                  <li className="py-3">
                    Чай (чёрный / зелёный)
                  </li>
                  <li className="py-3">Хлеб</li>
                </ul>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600">
              <div className="border-b border-neutral-800 p-6">
                <div className="inline-flex rounded-full bg-amber-600 px-4 py-2 text-lg font-bold text-white">
                  Меню 2000 ₽
                </div>

                <p className="mt-4 text-neutral-400">
                  Расширенный вариант меню с дополнительными
                  блюдами и закусками.
                </p>
              </div>

              <div className="p-6">
                <ul className="divide-y divide-neutral-800 text-neutral-300">
                  <li className="py-3">Лапша куриная / Щи</li>
                  <li className="py-3">Салат «Нежный»</li>
                  <li className="py-3">Овощная тарелка</li>
                  <li className="py-3">Мясное ассорти</li>
                  <li className="py-3">Фруктовая тарелка</li>
                  <li className="py-3">
                    Бутерброды с сёмгой
                  </li>
                  <li className="py-3">Голубцы мясные</li>
                  <li className="py-3">Рыба под шубой</li>
                  <li className="py-3">
                    Картофель тушёный с мясом
                  </li>
                  <li className="py-3">
                    Пироги в ассортименте
                  </li>
                  <li className="py-3">
                    Морс в ассортименте
                  </li>
                  <li className="py-3">
                    Чай (чёрный / зелёный)
                  </li>
                  <li className="py-3">Хлеб</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ContactCallout
          title="Свяжитесь с нами"
          description="Поможем выбрать подходящее меню, согласуем дату проведения и ответим на все ваши вопросы."
        />
      </main>
    </div>
  );
}