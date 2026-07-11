"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type ToastType = "success" | "error" | "warning";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export default function DonationPhoneForm() {
  const t = useTranslations("Donate.DonationPhoneFrom");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("57");
  const [accepted, setAccepted] = useState(false);
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      showAdvice(t("AlertNameRequired"), "warning");
      return;
    }

    if (!phone.trim()) {
      showAdvice(t("AlertPhoneRequired"), "warning");
      return;
    }

    if (!accepted) {
      showAdvice(t("AlertPrivatePolicy"), "warning");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/resend/phonenumbermail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          phone,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      showAdvice(t("SuccessMessage"), "success");

      setName("");
      setPhone("57");
      setAccepted(false);
    } catch {
      showAdvice(t("ErrorMessage"), "error");
    } finally {
      setLoading(false);
    }
  }

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
      {/* Toast Container - responsive: centrado en móvil, derecha en sm+ */}
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

      <section className="bg-sky-500 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mx-auto mb-8 sm:mb-12 md:mb-16 max-w-5xl text-center text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight">
            {t("Title")}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-sm sm:max-w-md flex-col gap-6 sm:gap-8"
          >
            <input
              type="text"
              placeholder={t("FullName")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-0 border-b border-white bg-transparent pb-2 sm:pb-3 text-base sm:text-lg text-white placeholder:text-white/80 focus:border-white focus:outline-none transition-colors"
            />

            <div className="phone-input-wrapper">
              <PhoneInput
                country="co"
                onlyCountries={[
                  "co",
                  "us",
                  "jp",
                  "gb",
                  "de",
                  "it",
                  "fr",
                  "es",
                  "ar",
                  "cl",
                  "mx",
                  "au",
                  "ca",
                ]}
                preferredCountries={["co", "us"]}
                value={phone}
                onChange={setPhone}
                inputStyle={{
                  width: "100%",
                  background: "transparent",
                  color: "#fff",
                  border: "none",
                  borderBottom: "1px solid white",
                  borderRadius: "0",
                  height: "44px",
                  fontSize: "16px",
                  paddingLeft: "52px",
                }}
                buttonStyle={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid white",
                }}
                dropdownStyle={{
                  color: "#000",
                  maxHeight: "200px",
                  overflow: "auto",
                }}
                containerStyle={{
                  width: "100%",
                }}
              />
            </div>

            <label className="flex items-start gap-2 sm:gap-3 text-white">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 cursor-pointer"
              />

              <span className="text-xs sm:text-sm leading-5 sm:leading-6">
                {t("PrivacyPolicyTermns")}{" "}
                <a
                  href="/privacy-policy"
                  className="font-semibold underline hover:text-white/80 transition-colors"
                >
                  {t("LinkPrivacyPolicyText")}
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 sm:mt-4 h-12 sm:h-14 md:h-16 rounded-lg bg-white text-lg sm:text-xl md:text-2xl font-bold text-black transition duration-300 hover:scale-[1.02] hover:bg-gray-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? t("Sending") : t("CallMeButtonText")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}