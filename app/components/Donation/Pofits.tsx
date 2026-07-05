"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const benefits = [

  {
    title: "online events",
    description: "Participate in exclusive online events.",
    image: "/Carrusel/Obra-teatro.png",
  },
  {
    title: "Newsletters",
    description: "Stay updated with our latest news and updates.",
    image: "/Carrusel/newsletters.jpg",
  },
  {
    title: "exclusive content",
    description: "Access to special articles, videos, and resources.",
    image: "/Carrusel/exclusive.jpg",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-5xl font-bold text-gray-900">
          Become a monthly donor and enjoy great benefits!
        </h2>

        <p className="mt-5 mb-14 text-center text-2xl text-gray-700">
          Help children and access exclusive experiences:
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
          {benefits.map((item:any) => (
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