"use client";

import {
  BookOpen,
  HeartHandshake,
  School,
} from "lucide-react";
import Link from "next/link";

const cards = [
  {
    title: "Quality Education",
    description:
      "Your support provides children and young people with access to quality education, personalized academic guidance, and learning opportunities that help them build a brighter future.",
    icon: BookOpen,
  },
  {
    title: "Community Support",
    description:
      "Donations allow us to create safe and welcoming spaces where children and families receive mentorship, emotional support, and opportunities to grow together as a community.",
    icon: HeartHandshake,
  },
  {
    title: "School Resources",
    description:
      "Every contribution helps provide school supplies, educational materials, technology, and learning environments that inspire students to reach their full potential.",
    icon: School,
  },
];

export default function ImpactSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Title */}
        <h2 className="mb-14 text-center text-4xl font-bold text-gray-900">
          What Your Donation Makes Possible
        </h2>

        {/* Cards */}
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

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="#donation-form"
            className="rounded-lg bg-yellow-400 px-10 py-4 text-2xl font-bold text-black shadow transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-500 hover:shadow-xl"
          >
            Donate Now
          </Link>
        </div>

      </div>
    </section>
  );
}