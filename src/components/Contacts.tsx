import { contacts } from "../data/contacts";

const mapUrl =
  "https://yandex.ru/maps/10841/yaroslavl-oblast/house/kurortny_pereulok_1/YEkYdQFmSEQFQFttfXp2dH5gYA==/?ll=40.365684%2C57.674388&z=16";

export default function Contacts() {
  return (
    <section
      id="contacts"
      className="bg-neutral-900 px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Контакты
        </h2>

        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5 text-lg text-neutral-300">
            <p>
              📍{" "}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-amber-400"
              >
                {contacts.address}
              </a>
            </p>

            {contacts.phones.map((phone) => (
              <p key={phone}>
                ☎️{" "}
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="transition hover:text-amber-400"
                >
                  {phone}
                </a>
              </p>
            ))}

            <p>
              📧{" "}
              <a
                href={`mailto:${contacts.email}`}
                className="transition hover:text-amber-400"
              >
                {contacts.email}
              </a>
            </p>

            <p>🕒 {contacts.hours}</p>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-amber-500 px-6 py-3 font-semibold text-neutral-900 transition hover:bg-amber-400"
            >
              🗺️ Построить маршрут
            </a>
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-neutral-700 shadow-xl"
          >
            <img
              src="/images/map-preview.webp"
              alt="Карта расположения кафе"
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 md:h-80"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
              <div className="rounded-full bg-black/60 px-5 py-3 text-center font-semibold text-white backdrop-blur-sm">
                🗺️ Открыть в Яндекс.Картах
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}