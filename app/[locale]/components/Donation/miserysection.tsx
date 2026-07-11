"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function DonationCTA() {
  const t = useTranslations("Donate.MiserySection");

  return (
    <section className="bg-[#F8F8F8] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Texto */}
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-[#0099D8]">
              {t("MiserySectionTitle")}
            </h2>

            <p className="mt-6 text-xl leading-relaxed text-gray-700">
              {t("MiserySectionTextPart1")}
            </p>

            <p className="mt-6 text-xl leading-relaxed text-gray-700">
              {t("MiserySectionTextPart2")}
            </p>

            <Link
              href="#donate-hero"
              className="mt-10 inline-flex h-16 w-72 items-center justify-center rounded-xl bg-[#FFC20E] text-2xl font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFB700] hover:shadow-xl"
            >
              {t("MiserySectionButtonDonateText")}
            </Link>
          </div>

          {/* Imagen */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[450px] w-full max-w-[500px] overflow-hidden rounded-xl shadow-2xl">
              <Image
                src="/misery/principal.jpg"
                alt={t("ImageAlt")}
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}