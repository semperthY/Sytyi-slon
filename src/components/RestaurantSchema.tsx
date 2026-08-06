"use client";

import {
    phoneToHref,
    useSiteSettings,
} from "@/hooks/useSiteSettings";

function getOpeningHours(hours: string): {
    opens: string;
    closes: string;
} {
    const matches = hours.match(
        /(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/,
    );

    if (!matches) {
        return {
            opens: "08:00",
            closes: "20:00",
        };
    }

    return {
        opens: matches[1],
        closes: matches[2],
    };
}

function getTelephone(phone: string): string {
    return phoneToHref(phone).replace("tel:", "");
}

export default function RestaurantSchema() {
    const settings = useSiteSettings();

    const mainPhone = settings.phones[0]?.number ?? "";
    const openingHours = getOpeningHours(
        settings.workingHours,
    );

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Restaurant",

        name: settings.restaurantName,

        url: "https://сытыйслонъ.рф",

        ...(mainPhone
            ? {
                telephone: getTelephone(mainPhone),
            }
            : {}),

        ...(settings.email
            ? {
                email: settings.email,
            }
            : {}),

        address: {
            "@type": "PostalAddress",
            streetAddress: settings.address,
            addressLocality: "рп. Некрасовское",
            addressCountry: "RU",
        },

        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
                opens: openingHours.opens,
                closes: openingHours.closes,
            },
        ],

        servesCuisine: [
            "Русская кухня",
            "Домашняя кухня",
        ],

        priceRange: "₽₽",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(jsonLd).replace(
                    /</g,
                    "\\u003c",
                ),
            }}
        />
    );
}