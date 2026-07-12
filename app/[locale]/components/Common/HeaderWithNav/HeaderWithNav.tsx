"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./HeaderWithNav.module.css";

const localesData = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

export default function HeaderWithNav() {
  const t = useTranslations("Common.HeaderWithNav");
  const locale = useLocale();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const currentLocale = localesData.find((l) => l.code === locale) || localesData[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLinkClass = (path: string) =>
    `${styles["nav-link"]} ${pathname === path ? styles["active"] : ""}`;

  const getAulaVirtualClass = (path: string) =>
    `${styles["nav-link"]} ${styles["aula-virtual"]} ${pathname === path ? styles["active"] : ""}`;

  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-content"]}>
        <Link href="/" className={styles["logo-link"]} onClick={() => setIsOpen(false)}>
          <img src="/favicon.ico" alt="Logo FCMA" className={styles["header-logo"]} />
          <div className={styles["header-titles"]}>
            <h1 className={styles["main-title"]}>Fundación Centro Mariana de Alfabetización</h1>
          </div>
        </Link>

        <div className={styles["menu-area"]}>
          {/* Selector de idioma integrado en el navbar */}
          <div className={styles["language-switcher"]} ref={langRef}>
            <button
              className={styles["language-button"]}
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Cambiar idioma"
              aria-expanded={langOpen}
            >
              <span className={styles["flag"]}>{currentLocale.flag}</span>
              <span className={styles["lang-code"]}>{currentLocale.code.toUpperCase()}</span>
              <svg
                className={`${styles["chevron"]} ${langOpen ? styles["chevron-open"] : ""}`}
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
              >
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {langOpen && (
              <ul className={styles["lang-dropdown"]} role="listbox">
                {localesData.map((loc) => (
                  <li key={loc.code} role="option" aria-selected={loc.code === locale}>
                    <Link
                      href={pathname}
                      locale={loc.code}
                      className={`${styles["lang-item"]} ${
                        loc.code === locale ? styles["lang-item-active"] : ""
                      }`}
                      onClick={() => {
                        setLangOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      <span className={styles["flag"]}>{loc.flag}</span>
                      <span className={styles["lang-label"]}>{loc.label}</span>
                      {loc.code === locale && <span className={styles["check"]}>✓</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Botón hamburguesa */}
          <button
            className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
            onClick={toggleNavbar}
            aria-label="Abrir menú"
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`${styles.navbar} ${isOpen ? styles["navbar-open"] : ""}`}>
            <Link href="/" className={getLinkClass("/")} onClick={() => setIsOpen(false)}>
              <span className={styles["nav-text"]}>{t("Home")}</span>
              <span className={styles["nav-dot"]} />
            </Link>

            <Link href="/blog" className={getLinkClass("/blog")} onClick={() => setIsOpen(false)}>
              <span className={styles["nav-text"]}>{t("Blog")}</span>
              <span className={styles["nav-dot"]} />
            </Link>

            <Link href="/about" className={getLinkClass("/about")} onClick={() => setIsOpen(false)}>
              <span className={styles["nav-text"]}>{t("AboutUs")}</span>
              <span className={styles["nav-dot"]} />
            </Link>

            <Link href="/legal" className={getLinkClass("/legal")} onClick={() => setIsOpen(false)}>
              <span className={styles["nav-text"]}>{t("Legal")}</span>
              <span className={styles["nav-dot"]} />
            </Link>

            <Link href="/contact" className={getLinkClass("/contact")} onClick={() => setIsOpen(false)}>
              <span className={styles["nav-text"]}>{t("ContactUs")}</span>
              <span className={styles["nav-dot"]} />
            </Link>

            <Link href="/donatepage" className={getAulaVirtualClass("/donatepage")} onClick={() => setIsOpen(false)}>
              <span className={styles["nav-text"]}>{t("Donate")}</span>
            </Link>

            {/* Selector de idioma dentro del menú móvil */}
            <div className={styles["mobile-lang-section"]}>
              <span className={styles["mobile-lang-title"]}>Idioma / Language</span>
              <div className={styles["mobile-lang-grid"]}>
                {localesData.map((loc) => (
                  <Link
                    key={loc.code}
                    href={pathname}
                    locale={loc.code}
                    className={`${styles["mobile-lang-btn"]} ${
                      loc.code === locale ? styles["mobile-lang-btn-active"] : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={styles["flag"]}>{loc.flag}</span>
                    <span>{loc.code.toUpperCase()}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}