"use client";

import { useEffect, useState } from "react";

export type SitePhone = {
    title: string;
    number: string;
};

export type SiteSettings = {
    restaurantName: string;
    phones: SitePhone[];
    email: string;
    address: string;
    workingHours: string;
    maps: {
        yandex: string;
        gis2: string;
    };
};

export const defaultSiteSettings: SiteSettings = {
    restaurantName: "Сытый слонъ",
    phones: [
        {
            title: "Администратор",
            number: "+7 (901) 055-24-24",
        },
        {
            title: "Михаил",
            number: "+7 (901) 274-30-30",
        },
        {
            title: "Михаил",
            number: "+7 (906) 634-76-56",
        },
    ],
    email: "",
    address: "рп. Некрасовское, Курортный переулок, д. 1",
    workingHours: "08:00 - 20:00",
    maps: {
        yandex:
            "https://yandex.ru/maps/10841/yaroslavl-oblast/house/kurortny_pereulok_1/YEkYdQFmSEQFQFttfXp2dH5gYA==/?ll=40.365684%2C57.674388&z=16",
        gis2: "",
    },
};

function normalizeSettings(data: unknown): SiteSettings {
    if (!data || typeof data !== "object") {
        return defaultSiteSettings;
    }

    const source = data as Partial<SiteSettings>;

    const phones = Array.isArray(source.phones)
        ? source.phones
            .filter(
                (phone): phone is SitePhone =>
                    Boolean(phone) &&
                    typeof phone === "object" &&
                    typeof phone.number === "string" &&
                    phone.number.trim() !== "",
            )
            .map((phone) => ({
                title:
                    typeof phone.title === "string"
                        ? phone.title.trim()
                        : "",
                number: phone.number.trim(),
            }))
        : defaultSiteSettings.phones;

    const maps =
        source.maps && typeof source.maps === "object"
            ? source.maps
            : defaultSiteSettings.maps;

    return {
        restaurantName:
            typeof source.restaurantName === "string" &&
                source.restaurantName.trim() !== ""
                ? source.restaurantName.trim()
                : defaultSiteSettings.restaurantName,

        phones:
            phones.length > 0
                ? phones
                : defaultSiteSettings.phones,

        email:
            typeof source.email === "string"
                ? source.email.trim()
                : defaultSiteSettings.email,

        address:
            typeof source.address === "string" &&
                source.address.trim() !== ""
                ? source.address.trim()
                : defaultSiteSettings.address,

        workingHours:
            typeof source.workingHours === "string" &&
                source.workingHours.trim() !== ""
                ? source.workingHours.trim()
                : defaultSiteSettings.workingHours,

        maps: {
            yandex:
                typeof maps.yandex === "string"
                    ? maps.yandex.trim()
                    : defaultSiteSettings.maps.yandex,

            gis2:
                typeof maps.gis2 === "string"
                    ? maps.gis2.trim()
                    : defaultSiteSettings.maps.gis2,
        },
    };
}

export function useSiteSettings(): SiteSettings {
    const [settings, setSettings] = useState<SiteSettings>(
        defaultSiteSettings,
    );

    useEffect(() => {
        const controller = new AbortController();

        async function loadSettings() {
            try {
                const response = await fetch(
                    `/data/settings.json?t=${Date.now()}`,
                    {
                        cache: "no-store",
                        signal: controller.signal,
                    },
                );

                if (!response.ok) {
                    throw new Error(
                        `Не удалось загрузить настройки: ${response.status}`,
                    );
                }

                const data: unknown = await response.json();

                setSettings(normalizeSettings(data));
            } catch (error) {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                console.error(
                    "Ошибка загрузки настроек сайта:",
                    error,
                );
            }
        }

        void loadSettings();

        return () => {
            controller.abort();
        };
    }, []);

    return settings;
}

export function phoneToHref(phone: string): string {
    const digits = phone.replace(/\D/g, "");

    if (digits === "") {
        return "";
    }

    return `tel:+${digits}`;
}