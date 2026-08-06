"use client";

import {
  phoneToHref,
  useSiteSettings,
} from "@/hooks/useSiteSettings";

const fallbackMapUrl =
  "https://yandex.ru/maps/10841/yaroslavl-oblast/house/kurortny_pereulok_1/YEkYdQFmSEQFQFttfXp2dH5gYA==/?ll=40.365684%2C57.674388&z=16";

export default function Contacts() {
  const settings = useSiteSettings();

  const mapUrl =
    settings.maps.yandex ||
    settings.maps.gis2 ||
    fallbackMapUrl;

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
                {settings.address}
              </a>
            </p>

            {settings.phones.map((phone, index) => {
              const phoneHref = phoneToHref(phone.number);

              return (
                <div
                  key={`${phone.number}-${index}`}
                  className="space-y-1"
                >
                  {phone.title && (
                    <p className="text-sm text-neutral-400">
                      {phone.title}
                    </p>
                  )}

                  <a
                    href={phoneHref}
                    className="block text-lg transition hover:text-amber-400"
                  >
                    ☎️ {phone.number}
                  </a>
                </div>
              );
            })}

            {settings.email && (
              <p>
                📧{" "}
                <a
                  href={`mailto:${settings.email}`}
                  className="transition hover:text-amber-400"
                >
                  {settings.email}
                </a>
              </p>
            )}

            <p>🕒 {settings.workingHours}</p>

            <div className="flex flex-wrap gap-3">
              {settings.maps.yandex && (
                <a
                  href={settings.maps.yandex}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl bg-amber-500 px-6 py-3 font-semibold text-neutral-900 transition hover:bg-amber-400"
                >
                  🗺️ Яндекс Карты
                </a>
              )}

              {settings.maps.gis2 && (
                <a
                  href={settings.maps.gis2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-xl border border-amber-500 px-6 py-3 font-semibold text-amber-400 transition hover:bg-amber-500 hover:text-neutral-900"
                >
                  🗺️ 2ГИС
                </a>
              )}
            </div>
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-neutral-700 shadow-xl"
          >
            <img
              src="/images/map-preview.webp"
              alt={`Карта расположения ${settings.restaurantName}`}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 md:h-80"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
              <div className="rounded-full bg-black/60 px-5 py-3 text-center font-semibold text-white backdrop-blur-sm">
                🗺️ Открыть карту
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}