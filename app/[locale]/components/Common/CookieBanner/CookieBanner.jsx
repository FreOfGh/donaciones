import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import styles from "./CookieBanner.module.css";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const cookiesAccepted = Cookies.get("cookies-accepted");
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookies-accepted", "true", {
      expires: 365,
      secure: true,
      sameSite: "Strict",
    });
    setShowBanner(false);
    if (window.dataLayer) {
      window.dataLayer.push({ event: "cookiesAccepted" });
    }
  };

  const rejectCookies = () => {
    Cookies.set("cookies-accepted", "false", {
      expires: 365,
      secure: true,
      sameSite: "Strict",
    });
    setShowBanner(false);
  };

  if (!isMounted || !showBanner) return null;

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-label="Aviso de cookies"
      aria-modal="true"
    >
      <div className={styles.content}>
        <p className={styles.text}>
          Usamos cookies propias y de terceros para mejorar tu experiencia. Al
          hacer clic en "Aceptar", consientes el uso de todas las cookies según
          nuestra{" "}
          <Link to="/politica-de-cookies" className={styles.link}>
            Política de Cookies
          </Link>
          .
        </p>
        <div className={styles.buttons}>
          <button
            onClick={acceptCookies}
            className={styles.acceptButton}
            aria-label="Aceptar cookies"
          >
            Aceptar
          </button>
          <button
            onClick={rejectCookies}
            className={styles.rejectButton}
            aria-label="Rechazar cookies"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
