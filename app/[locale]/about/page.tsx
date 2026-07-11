"use client";

import { useTranslations } from "next-intl";
import styles from "./About.module.css";

export default function About() {
  const t = useTranslations("AboutUs");

  return (
    <div className={styles["about-container"]}>
      <header className={styles["about-header"]}>
        <h1 className={styles["about-title"]}>
          {t("Title")}
        </h1>

        <div className={styles["title-divider"]}></div>
      </header>

      <section className={styles["content-section"]}>
        <div className={styles["card"]}>
          <h2 className={styles["card-title"]}>
            <span className={styles["card-icon"]}>📌</span>{" "}
            {t("undertaking.Title")}
          </h2>

          <div className={styles["card-content"]}>
            <p>{t("undertaking.Text")}</p>
          </div>
        </div>

        <div className={styles["card"]}>
          <h2 className={styles["card-title"]}>
            <span className={styles["card-icon"]}>🔭</span>{" "}
            {t("sight.Title")}
          </h2>

          <div className={styles["card-content"]}>
            <p>{t("sight.Text")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}