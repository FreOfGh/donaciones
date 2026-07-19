"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

const values = [25, 50, 100];

type ToastType = "success" | "error" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export default function DonationCard() {
  const t = useTranslations("Donate.DonationCard");

  const [selected, setSelected] = useState(50);
  const [monthly, setMonthly] = useState(true);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showAdvice = useCallback((message: string, type: ToastType = "warning") => {
    const id = Date.now() + Math.random();
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), 4000)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  const donate = async () => {
    try {
      setLoading(true);

      const amount = isCustom ? Number(customAmount) : selected;

      if (!amount || amount <= 0) {
        showAdvice(t("AlertError"), "warning");
        return;
      }

      if (monthly) {
        showAdvice(t("AlertErrorOnlyUnitPay"), "warning");
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
        throw new Error(data.error || t("Alerts.PaypalError"));
      }

      window.location.href = data.approveUrl;
    } catch (error) {
      console.error(error);
      showAdvice(t("Alerts.GeneralError"), "error");
    } finally {
      setLoading(false);
    }
  };

  const toastStyles: Record<ToastType, string> = {
    success: "bg-emerald-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-amber-500 text-white",
  };

  const toastIcons: Record<ToastType, string> = {
    success: "✓",
    error: "✕",
    warning: "⚠",
  };

  return (
    <>
      {/* Toast Container - responsive: centrado en móvil, derecha en desktop */}
      <div className="fixed left-1/2 top-4 z-[9999] flex w-[90%] -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-4 sm:top-4 sm:w-auto sm:translate-x-0 sm:gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 sm:gap-3 rounded-lg px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg transition-all duration-500 ${toastStyles[toast.type]}`}
            style={{
              animation: "slideIn 0.4s ease-out",
            }}
          >
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs sm:text-sm font-bold">
              {toastIcons[toast.type]}
            </span>
            <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-1 sm:ml-2 text-white/70 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="w-full max-w-xl rounded-lg sm:rounded-md bg-white p-5 sm:p-8 shadow-xl sm:shadow-2xl">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900">
          {t("Title")}
        </h2>

        {/* Donation type */}
        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
          <button
            onClick={() => setMonthly(true)}
            className={`rounded-lg py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors ${
              monthly
                ? "bg-sky-500 text-white shadow-md"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t("TextMonthButton")}
          </button>

          <button
            onClick={() => setMonthly(false)}
            className={`rounded-lg py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors ${
              !monthly
                ? "bg-sky-500 text-white shadow-md"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t("TextOneTimeButton")}
          </button>
        </div>

        {/* Suggested amounts - 2 cols en móvil, 4 en sm+ */}
        <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {values.map((value) => (
            <button
              key={value}
              onClick={() => {
                setSelected(value);
                setIsCustom(false);
              }}
              className={`rounded-lg border py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-colors ${
                !isCustom && selected === value
                  ? "bg-sky-500 text-white border-sky-500 shadow-md"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              ${value}
            </button>
          ))}

          <button
            onClick={() => setIsCustom(true)}
            className={`rounded-lg border py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-colors ${
              isCustom
                ? "bg-sky-500 text-white border-sky-500 shadow-md"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t("OtherAmountInput")}
          </button>
        </div>

        {/* Custom amount */}
        {isCustom && (
          <input
            type="number"
            min="1"
            step="0.01"
            placeholder={t("AmountPlaceholder")}
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="mt-3  text-black sm:mt-4 w-full rounded-lg border border-gray-300 p-2.5 sm:p-3 text-sm sm:text-base focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
          />
        )}

        {/* Donate button */}
        <button
          onClick={donate}
          disabled={loading}
          className="mt-6 sm:mt-8 w-full rounded-lg bg-yellow-400 py-3 sm:py-4 text-xl sm:text-3xl font-bold text-black transition hover:bg-yellow-500 disabled:opacity-50 active:scale-[0.98] sm:active:scale-100"
        >
          {loading ? t("Redirecting") : t("TextDonateButton")}
        </button>
      </div>
    </>
  );
}