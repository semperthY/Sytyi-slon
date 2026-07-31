export default function RestaurantSchema() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Restaurant",

        name: "Сытый Слонъ",

        url: "https://сытыйслонъ.рф",

        telephone: "+79010552424",

        address: {
            "@type": "PostalAddress",
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
                opens: "08:00",
                closes: "20:00",
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
                __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
        />
    );
}