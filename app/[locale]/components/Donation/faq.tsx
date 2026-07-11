"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Donate.Faq");

  const faqData = [
    {
      question: t("FirstQuestion.question"),
      answer: t("FirstQuestion.answer"),
    },
    {
      question: t("SecondQuestion.question"),
      answer: t("SecondQuestion.answer"),
    },
    {
      question: t("ThirdQuestion.question"),
      answer: t("ThirdQuestion.answer"),
    },
    {
      question: t("FourthQuestion.question"),
      answer: t("FourthQuestion.answer"),
    },
    {
      question: t("FivethQuestion.question"),
      answer: t("FivethQuestion.answer"),
    },
    {
      question: t("SixthQuestion.question"),
      answer: t("SixthQuestion.answer"),
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-4 text-center text-4xl font-bold text-gray-900">
          {t("Title")}
        </h2>

        <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-600">
          {t("Text")}
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