import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import PageContainer from "@/components/PageContainer";
import Link from "next/link";
import {
  Phone,
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
    icon: <UtensilsCrossed className="h-8 w-8 text-amber-600" />,
    title: "От 2500 ₽/чел.",
    text: "Индивидуальный подбор банкетного меню под ваше мероприятие.",
  },
  {
    icon: <Wine className="h-8 w-8 text-amber-600" />,
    title: "Свой алкоголь",
    text: "Разрешается принести алкоголь с собой.",
  },
  {
    icon: <Music4 className="h-8 w-8 text-amber-600" />,
    title: "Музыкальное оборудование",
    text: "Для праздников, юбилеев и корпоративов.",
  },
  {
    icon: <Tv className="h-8 w-8 text-amber-600" />,
    title: "Телевизор",
    text: "Для фото, видео, презентаций и поздравлений.",
  },
];

export default function BanquetsPage() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      <PageHero
        title="Организация банкетов"
        subtitle="Свадьбы, юбилеи, дни рождения, корпоративы и другие торжественные мероприятия."
      />

<PageContainer>

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
          <h2 className="mb-6 text-3xl font-bold text-amber-900">
            Индивидуальное банкетное меню
          </h2>

          <p className="mb-6 text-lg leading-8 text-gray-700">
            Банкетное меню составляется индивидуально с учётом ваших пожеланий,
            бюджета и количества гостей. Вы можете выбрать любые блюда из
            нашего ассортимента, а наши сотрудники помогут подобрать
            оптимальное меню именно для вашего мероприятия.
          </p>

          <p className="mb-8 text-xl font-semibold text-amber-700">
            Стоимость банкетного меню — от 2500 ₽ с человека.
          </p>

          <a
            href="/banquet-menu.pdf"
            className="inline-flex items-center rounded-xl bg-amber-700 px-6 py-4 font-semibold text-white transition hover:bg-amber-800"
          >
            📄 Скачать банкетное меню (PDF)
          </a>
        </section>

        <section className="rounded-3xl bg-gradient-to-r from-amber-700 to-amber-900 p-10 text-center text-white shadow-xl">
          <h2 className="mb-4 text-3xl font-bold">
            Забронировать банкет
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-amber-100">
            Свяжитесь с нами, и мы поможем подобрать банкетное меню, ответим на
            все вопросы и поможем организовать ваше мероприятие.
          </p>

          <Link
            href="tel:+79159847077"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-amber-800 transition hover:scale-105"
          >
            <Phone size={20} />
            Позвонить
          </Link>
        </section>

</PageContainer>
    
    <Footer />
    </div>
  );
}
