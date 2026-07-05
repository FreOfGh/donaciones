"use client";

import { useState } from "react";

const values = [25, 50, 100];

export default function DonationCard() {
  const [selected, setSelected] = useState(50);
  const [monthly, setMonthly] = useState(true);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);

  const donate = async () => {
    try {
      setLoading(true);

      const amount = isCustom ? Number(customAmount) : selected;

      if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      // Por ahora solo permitiremos pagos únicos
      if (monthly) {
        alert("Monthly donations will be available soon.");
        return;
      }

      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create PayPal order.");
      }

      window.location.href = data.approveUrl;
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl rounded-md bg-white p-8 shadow-2xl">
      <h2 className="text-center text-3xl font-bold text-gray-900">
        How would you like to support?
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => setMonthly(true)}
          className={`rounded-lg py-4 ${
            monthly
              ? "bg-sky-500 text-white"
              : "border border-gray-300"
          }`}
        >
          Monthly ❤️
        </button>

        <button
          onClick={() => setMonthly(false)}
          className={`rounded-lg py-4 ${
            !monthly
              ? "bg-sky-500 text-white"
              : "border border-gray-300"
          }`}
        >
          One-Time
        </button>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-3">
        {values.map((value) => (
          <button
            key={value}
            onClick={() => {
              setSelected(value);
              setIsCustom(false);
            }}
            className={`rounded-lg border py-3 ${
              !isCustom && selected === value
                ? "bg-sky-500 text-white"
                : ""
            }`}
          >
            ${value}
          </button>
        ))}

        <button
          onClick={() => setIsCustom(true)}
          className={`rounded-lg border ${
            isCustom ? "bg-sky-500 text-white" : ""
          }`}
        >
          Other
        </button>
      </div>

      {isCustom && (
        <input
          type="number"
          min="1"
          step="0.01"
          placeholder="Amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="mt-4 w-full rounded-lg border p-3"
        />
      )}

      <button
        onClick={donate}
        disabled={loading}
        className="mt-8 w-full rounded-lg bg-yellow-400 py-4 text-3xl font-bold text-black hover:bg-yellow-500 disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Donate Now"}
      </button>
    </div>
  );
}