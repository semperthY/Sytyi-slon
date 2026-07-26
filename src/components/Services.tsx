import Link from "next/link";

export default function Services() {
  const services = [
    {
      title: "🍽 Меню",
      description: "Большой выбор домашних блюд и напитков.",
      href: "/#menu",
      button: "Открыть меню",
    },
    {
      title: "🎉 Банкеты",
      description:
        "Организация свадеб, юбилеев, корпоративов и других праздников.",
      href: "/banquets",
      button: "Подробнее",
    },
    {
      title: "🕊 Поминальные обеды",
      description:
        "Спокойная атмосфера, индивидуальное меню и внимательное обслуживание.",
      href: "/memorial",
      button: "Подробнее",
    },
  ];

  return (
    <section className="bg-neutral-950 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-center text-4xl font-bold text-white">
          Наши услуги
        </h2>

        <p className="mx-auto mb-14 max-w-2xl text-center text-neutral-400">
          Кафе «Сытый Слонъ» — место, где можно вкусно пообедать,
          провести праздник или организовать поминальный обед.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="
                flex flex-col
                rounded-2xl
                border border-neutral-800
                bg-neutral-900
                p-8
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-amber-600
              "
            >
              <h3 className="mb-4 text-2xl font-semibold text-white">
                {service.title}
              </h3>

              <p className="mb-8 flex-1 leading-7 text-neutral-400">
                {service.description}
              </p>

              <Link
                href={service.href}
                className="
                  rounded-xl
                  bg-amber-600
                  px-5
                  py-3
                  text-center
                  font-medium
                  text-white
                  transition
                  hover:bg-amber-700
                "
              >
                {service.button}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}