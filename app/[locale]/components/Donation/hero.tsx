"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import DonationCard from "./DonationCard";

export default function Hero() {
  const t = useTranslations("Donate.Hero");

  return (
    <section id="donate-hero" className="relative min-h-screen">
      {/* Fondo */}
      <Image
        src="/hero/principal.jpg"
        alt={t("ImageAlt")}
        fill
        priority
        className="object-cover"
      />

      {/* Oscurecer fondo */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido - vertical en móvil, lado a lado en lg+ */}
      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* Lado izquierdo - texto */}
        <div className="relative flex flex-1 flex-col justify-between px-5 py-6 sm:px-8 sm:py-8 lg:px-8 lg:py-8">
          {/* Logo */}
          <div className="lg:absolute lg:left-8 lg:top-8">
            <Image
              src="/logocma.jpeg"
              alt={t("LogoAlt")}
              width={120}
              height={50}
              className="h-auto w-28 sm:w-36 lg:w-[180px]"
            />
          </div>

          {/* Título - centrado en móvil, abajo a la izquierda en lg */}
          <div className="mt-8 flex flex-1 items-center justify-center lg:mt-24 lg:items-end lg:justify-start lg:pb-24">
            <div className="bg-sky-500 px-4 py-3 sm:px-6 sm:py-4 lg:px-6 lg:py-4">
              <h1 className="text-center text-3xl font-light leading-tight text-white sm:text-4xl lg:text-left lg:text-5xl">
                {t("TitlePart1")}
                <br />
                {t("TitlePart2")}
                <br />
                {t("TitlePart3")}
              </h1>
            </div>
          </div>
        </div>

        {/* Lado derecho - card */}
        <div className="flex w-full items-center justify-center px-5 pb-8 pt-4 sm:px-8 sm:pb-8 sm:pt-6 lg:w-[520px] lg:p-8">
          <DonationCard />
        </div>
      </div>
    </section>
  );
}