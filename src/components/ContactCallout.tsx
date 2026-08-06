"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

import {
    phoneToHref,
    useSiteSettings,
} from "@/hooks/useSiteSettings";

type ContactCalloutProps = {
    title: string;
    description: string;
};

export default function ContactCallout({
    title,
    description,
}: ContactCalloutProps) {
    const settings = useSiteSettings();

    const mainPhone = settings.phones[0];

    if (!mainPhone) {
        return null;
    }

    const phoneHref = phoneToHref(mainPhone.number);

    return (
        <section className="rounded-2xl border border-amber-600/30 bg-neutral-900 p-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
                {title}
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-neutral-400">
                {description}
            </p>

            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
                <Link
                    href={phoneHref}
                    className="inline-flex items-center gap-3 rounded-xl bg-amber-600 px-8 py-4 font-semibold text-white transition hover:bg-amber-700"
                >
                    <Phone size={22} />
                    Позвонить
                </Link>

                <div className="hidden h-20 w-px bg-neutral-700 md:block" />

                <div className="text-center md:text-left">
                    <a
                        href={phoneHref}
                        className="text-3xl font-bold text-white transition hover:text-amber-500"
                    >
                        {mainPhone.number}
                    </a>

                    <p className="mt-2 text-neutral-400">
                        Ежедневно с {settings.workingHours}
                    </p>
                </div>
            </div>
        </section>
    );
}