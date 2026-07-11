"use client";

import { useTranslations } from "next-intl";
import { BookOpen, HeartHandshake, School } from "lucide-react";
import Link from "next/link";

export default function ImpactSection() {
  const t = useTranslations("Donate.ExampleSection");

  const cards = [
    {
      title: t("Example1.title"),
      description: t("Example1.description"),
      icon: BookOpen,
    },
    {
      title: t("Example2.title"),
      description: t("Example2.description"),
      icon: HeartHandshake,
    },
    {
      title: t("Example3.title"),
      description: t("Example3.description"),
      icon: School,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Título */}
        <h2 className="mb-14 text-center text-4xl font-bold text-gray-900">
          {t("Title")}
        </h2>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="flex min-h-[430px] flex-col items-center bg-sky-500 p-10 text-center text-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <Icon
                  size={90}
                  strokeWidth={1.5}
                  className="mb-8"
                />

                <h3 className="text-3xl font-bold">
                  {card.title}
                </h3>

                <div className="my-5 h-[2px] w-14 bg-white" />

                <p className="text-lg leading-8">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Botón */}
        <div className="mt-12 flex justify-center">
          <Link
            href="#donation-form"
            className="rounded-lg bg-yellow-400 px-10 py-4 text-2xl font-bold text-black shadow transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-500 hover:shadow-xl"
          >
            {t("TextButton")}
          </Link>
        </div>
      </div>
    </section>
  );
}