"use client";

import styles from "./Contact.module.css";
import { Phone, MapIcon, IdCard, MailIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <div className={styles["contact-container"]}>
      <h1>{t("Title")}</h1>
      <div className={styles["tittle-divider"]}></div>

      <p className={styles["contact-intro"]}>
        {t("Text")}
      </p>

      <div className={styles["contact-info"]}>
        <h2>{t("ContactCard.Title")}</h2>

        <address>
          <div className={styles["contact-item"]}>
            <span className={styles["contact-icon"]}>
              <MapIcon className={styles["default-icon"]} />
            </span>
            <p>{t("ContactCard.Address")}</p>
          </div>

          <div className={styles["map-wrapper"]}>
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d281.51246306088103!2d-75.32063618020838!3d6.13052385274907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2sco!4v1784415692801!5m2!1ses!2sco" width="600" height="450" allow="fullscreen" loading="lazy"></iframe>
          </div>

          <div className={styles["contact-item"]}>
            <span className={styles["contact-icon"]}>
              <MailIcon className={styles["gmail-icon"]} />
            </span>
            <p>
              <a href={`mailto:${t("ContactCard.Email")}`}>
                {t("ContactCard.Email")}
              </a>
            </p>
          </div>

          <div className={styles["contact-item"]}>
            <span className={styles["contact-icon"]}>
              <Phone className={styles["phone-icon"]} />
            </span>
            <p>
              <a href="tel:+573108298815">
                {t("ContactCard.ThelephoneNumber")}
              </a>
            </p>
          </div>

          <div className={styles["contact-item"]}>
            <span className={styles["contact-icon"]}>
              <IdCard className={styles["default-icon"]} />
            </span>
            <p>{t("ContactCard.Nit")}</p>
          </div>
        </address>
      </div>
    </div>
  );
}