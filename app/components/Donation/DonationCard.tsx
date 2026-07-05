"use client";

import { useState } from "react";
import Image from "next/image";

const values = [25, 50, 100];

export default function DonationCard() {
  const [selected, setSelected] = useState(50);
  const [monthly, setMonthly] = useState(true);

  return (
    <div
      id="donation-form"
      className="w-full max-w-xl rounded-md bg-white p-8 shadow-2xl"
    >
      <h2 className="text-center text-3xl font-bold text-gray-900">
        How would you like to support?
      </h2>

      <div className="mt-5 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-gray-300 font-bold">
          1/3
        </div>
      </div>

      <p className="mt-3 text-center text-gray-500">
        Choose your donation amount
      </p>

      {/* Donation type */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => setMonthly(true)}
          className={`rounded-lg py-4 text-xl transition ${
            monthly
              ? "bg-sky-500 text-white"
              : "border border-gray-300 hover:bg-gray-100"
          }`}
        >
          Monthly ❤️
        </button>

        <button
          onClick={() => setMonthly(false)}
          className={`rounded-lg py-4 text-xl transition ${
            !monthly
              ? "bg-sky-500 text-white"
              : "border border-gray-300 hover:bg-gray-100"
          }`}
        >
          One-Time
        </button>
      </div>

      {/* Amounts */}
      <div className="mt-5 grid grid-cols-4 gap-3">
        {values.map((value) => (
          <button
            key={value}
            onClick={() => setSelected(value)}
            className={`rounded-lg border py-3 text-xl transition ${
              selected === value
                ? "bg-sky-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            ${value}
          </button>
        ))}

        <button className="rounded-lg border hover:bg-gray-100">
          Other
        </button>
      </div>

      {/* Impact */}
      <div className="mt-8 flex items-center gap-4">
        <p className="text-lg text-gray-700">
          With just <strong>$25 per month</strong>, you can help provide
          educational materials, academic support, and new opportunities for a
          child to succeed.
        </p>
      </div>

      {/* Donate button */}
      <button className="mt-8 w-full rounded-lg bg-yellow-400 py-4 text-3xl font-bold text-black transition hover:bg-yellow-500">
        Donate Now
      </button>

      {/* Security */}
      <div className="mt-8 space-y-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl text-green-600">✔</span>

          <p className="text-gray-700">
            Your donation is secure and directly supports educational programs,
            school supplies, and community initiatives for children and young
            people.
          </p>
        </div>

        <p className="text-gray-700">
          Monthly donations can be updated or canceled at any time.
        </p>
      </div>

      {/* Payment methods */}
      <div className="mt-8 flex justify-center gap-6 text-lg font-bold text-gray-500">
        <span>PayPal</span>
      </div>
    </div>
  );
}