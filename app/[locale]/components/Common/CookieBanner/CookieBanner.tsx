"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./CookieBanner.module.css";

const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(^|;)\\s*${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
};

const setCookie = (name: string, value: string, days: number) => {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
};

const CookieBanner = () => {
  const t = useTranslations("Common.CookieBanner");
  const [showBanner, setShowBanner] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const cookiesAccepted = getCookie("cookies-accepted");
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    setCookie("cookies-accepted", "true", 365);
    setShowBanner(false);
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: "cookiesAccepted" });
    }
  };

  const rejectCookies = () => {
    setCookie("cookies-accepted", "false", 365);
    setShowBanner(false);
  };

  if (!isMounted || !showBanner) return null;

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-label={t("text")}
      aria-modal="true"
    >
      <div className={styles.content}>
        <p className={styles.text}>
          {t("text")}{" "}
          .
        </p>
        <div className={styles.buttons}>
          <button
            onClick={acceptCookies}
            className={styles.acceptButton}
            aria-label={t("Agree")}
          >
            {t("Agree")}
          </button>
          <button
            onClick={rejectCookies}
            className={styles.rejectButton}
            aria-label={t("Desagee")}
          >
            {t("Desagee")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;