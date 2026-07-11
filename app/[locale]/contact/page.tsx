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
            <iframe
              title={t("ContactCard.Title")}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.7503792462014!2d-75.34213282520068!3d6.174661627455575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e442ef775646b03%3A0x6b95bc88990d1372!2sVereda%20La%20Esmeralda%2C%20Marinilla%2C%20Antioquia!5e0!3m2!1ses-419!2sco!4v1715011603136!5m2!1ses-419!2sco"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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