"use client";

import { useState } from "react";

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b last:border-b-0 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-xl font-semibold text-gray-900">
          {question}
        </h3>

        <svg
          className={`h-6 w-6 text-sky-500 transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "mt-4 max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="leading-7 text-gray-600">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function FAQ() {
  const faqData = [
    {
      question: "How will my donation be used?",
      answer:
        "Every donation directly supports educational programs, school supplies, learning resources, and community initiatives that benefit children and young people served by the CMA Foundation.",
    },
    {
      question: "Is my donation secure?",
      answer:
        "Yes. We use trusted payment providers to ensure that every donation is processed securely and your personal information remains protected.",
    },
    {
      question: "Can I make a monthly donation?",
      answer:
        "Absolutely. Monthly donations provide consistent support that allows us to plan long-term educational projects and create a lasting impact in our community.",
    },
    {
      question: "Can I cancel my monthly donation?",
      answer:
        "Yes. You can modify or cancel your recurring donation at any time by contacting our team or through your payment provider.",
    },
    {
      question: "Will I receive a donation receipt?",
      answer:
        "Yes. After your donation is completed, you will receive a confirmation email and a receipt for your records.",
    },
    {
      question: "Why support the CMA Foundation?",
      answer:
        "Your generosity helps provide children and young people with access to education, academic support, school materials, and opportunities that empower them to build a brighter future.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-4 text-center text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>

        <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-600">
          Thank you for considering a donation to the CMA Foundation. Here are
          answers to some of the most common questions about supporting our
          educational mission.
        </p>

        <div className="rounded-xl bg-white p-8 shadow-lg">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}