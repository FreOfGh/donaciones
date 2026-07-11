"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./HeaderWithNav.module.css";

export default function HeaderWithNav() {
  const t = useTranslations("Common.HeaderWithNav");

  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const toggleNavbar = () => setIsOpen(!isOpen);

  const getLinkClass = (path: string) =>
    `${styles["nav-link"]} ${
      pathname === path ? styles["active"] : ""
    }`;

  const getAulaVirtualClass = (path: string) =>
    `${styles["nav-link"]} ${styles["aula-virtual"]} ${
      pathname === path ? styles["active"] : ""
    }`;

  return (
    <header className={styles["header-container"]}>
      <div className={styles["header-content"]}>
        <Link href="/" className={styles["logo-link"]}>
          <img
            src="/favicon.ico"
            alt="Logo FCMA"
            className={styles["header-logo"]}
          />

          <div className={styles["header-titles"]}>
            <h1 className={styles["main-title"]}>
              Fundación Centro Mariana de Alfabetización
            </h1>
          </div>
        </Link>

        <div className={styles["menu-area"]}>
          <button
            className={`${styles.hamburger} ${
              isOpen ? styles.open : ""
            }`}
            onClick={toggleNavbar}
            aria-label="Abrir menú"
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={`${styles.navbar} ${
              isOpen ? styles["navbar-open"] : ""
            }`}
          >
            <Link
              href="/"
              className={getLinkClass("/")}
              onClick={() => setIsOpen(false)}
            >
              <span className={styles["nav-text"]}>
                {t("Home")}
              </span>

              <span className={styles["nav-dot"]}></span>
            </Link>

            <Link
              href="/blog"
              className={getLinkClass("/blog")}
              onClick={() => setIsOpen(false)}
            >
              <span className={styles["nav-text"]}>
                {t("Blog")}
              </span>

              <span className={styles["nav-dot"]}></span>
            </Link>

            <Link
              href="/about"
              className={getLinkClass("/about")}
              onClick={() => setIsOpen(false)}
            >
              <span className={styles["nav-text"]}>
                {t("AboutUs")}
              </span>

              <span className={styles["nav-dot"]}></span>
            </Link>

            <Link
              href="/legal"
              className={getLinkClass("/legal")}
              onClick={() => setIsOpen(false)}
            >
              <span className={styles["nav-text"]}>
                {t("Legal")}
              </span>

              <span className={styles["nav-dot"]}></span>
            </Link>

            <Link
              href="/contact"
              className={getLinkClass("/contact")}
              onClick={() => setIsOpen(false)}
            >
              <span className={styles["nav-text"]}>
                {t("ContactUs")}
              </span>

              <span className={styles["nav-dot"]}></span>
            </Link>

            <Link
              href="/donatepage"
              className={getAulaVirtualClass("/donatepage")}
              onClick={() => setIsOpen(false)}
            >
              <span className={styles["nav-text"]}>
                {t("Donate")}
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}