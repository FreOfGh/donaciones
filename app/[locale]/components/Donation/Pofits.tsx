"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BenefitsSection() {
  const t = useTranslations("Donate.ProfitsSection");

  const benefits = [
    {
      title: t("benefit1.Title"),
      description: t("benefit1.Description"),
      image: "/Carrusel/Obra-teatro.png",
    },
    {
      title: t("benefit2.Title"),
      description: t("benefit2.Description"),
      image: "/Carrusel/newsletters.jpg",
    },
    {
      title: t("benefit3.Title"),
      description: t("benefit3.Description"),
      image: "/Carrusel/exclusive.jpg",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-5xl font-bold text-gray-900">
          {t("ProfitsSectionTitle")}
        </h2>

        <p className="mb-14 mt-5 text-center text-2xl text-gray-700">
          {t("ProfitsSectionText")}
        </p>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={35}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {benefits.map((item) => (
            <SwiperSlide key={item.title}>
              <div className="text-center">
                <div className="relative mx-auto h-[330px] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <h3 className="mt-6 text-5xl font-bold leading-tight">
                  {item.title}
                </h3>

                <p className="mx-auto mt-5 max-w-xs text-2xl text-gray-700">
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}