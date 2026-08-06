import PageHero from "@/components/PageHero";
import ContactCallout from "@/components/ContactCallout";
import {
  Wine,
  Music4,
  Tv,
  UtensilsCrossed,
} from "lucide-react";

export const metadata = {
  title: "Банкеты | Сытый Слонъ",
  description:
    "Организация банкетов в кафе «Сытый Слонъ». Банкетное меню от 2500 ₽ с человека.",
};

const features = [
  {
    icon: (
      <UtensilsCrossed className="h-8 w-8 text-amber-500" />
    ),
    title: "От 2500 ₽/чел.",
    text: "Индивидуальный подбор банкетного меню под ваше мероприятие.",
  },
  {
    icon: <Wine className="h-8 w-8 text-amber-500" />,
    title: "Свой алкоголь",
    text: "Разрешается принести алкоголь с собой.",
  },
  {
    icon: <Music4 className="h-8 w-8 text-amber-500" />,
    title: "Музыкальное оборудование",
    text: "Для праздников, юбилеев и корпоративов.",
  },
  {
    icon: <Tv className="h-8 w-8 text-amber-500" />,
    title: "Телевизор",
    text: "Для фото, видео, презентаций и поздравлений.",
  },
];

export default function BanquetsPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <PageHero
        title="Организация банкетов"
        subtitle="Свадьбы, юбилеи, дни рождения, корпоративы и другие торжественные мероприятия."
        image="/images/banquets-hero.jpg"
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
          <h2 className="mb-6 text-3xl font-bold text-white">
            Индивидуальное банкетное меню
          </h2>

          <p className="mb-6 text-lg leading-8 text-neutral-400">
            Банкетное меню составляется индивидуально с учётом
            ваших пожеланий, бюджета и количества гостей. Вы
            можете выбрать любые блюда из нашего ассортимента, а
            наши сотрудники помогут подобрать оптимальное меню
            именно для вашего мероприятия.
          </p>

          <p className="text-xl font-semibold text-amber-500">
            Стоимость банкетного меню — от 2500 ₽ с человека.
          </p>
        </section>

        <ContactCallout
          title="Забронировать банкет"
          description="Свяжитесь с нами, и мы поможем подобрать банкетное меню, ответим на все вопросы и организуем ваше мероприятие."
        />
      </main>
    </div>
  );
}