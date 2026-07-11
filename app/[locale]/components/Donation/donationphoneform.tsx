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
      {/* Toast Container */}
      <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 rounded-lg px-5 py-3 shadow-lg transition-all duration-500 animate-in slide-in-from-right-full ${toastStyles[toast.type]}`}
            style={{
              animation: "slideIn 0.4s ease-out",
            }}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
              {toastIcons[toast.type]}
            </span>
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-white/70 hover:text-white"
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

      <section className="bg-sky-500 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mx-auto mb-16 max-w-5xl text-center text-3xl font-bold text-white md:text-5xl">
            {t("Title")}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-md flex-col gap-8"
          >
            <input
              type="text"
              placeholder={t("FullName")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-0 border-b border-white bg-transparent pb-3 text-lg text-white placeholder:text-white focus:border-white focus:outline-none"
            />

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
                height: "48px",
                fontSize: "18px",
                paddingLeft: "58px",
              }}
              buttonStyle={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid white",
              }}
              dropdownStyle={{
                color: "#000",
              }}
            />

            <label className="flex items-start gap-3 text-white">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 h-5 w-5"
              />

              <span className="text-sm leading-6">
                {t("PrivacyPolicyTermns")}{" "}
                <a
                  href="/privacy-policy"
                  className="font-semibold underline"
                >
                  {t("LinkPrivacyPolicyText")}
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 h-16 rounded bg-white text-2xl font-bold text-black transition duration-300 hover:scale-[1.02] hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? t("Sending") : t("CallMeButtonText")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}