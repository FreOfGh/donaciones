"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import styles from "./Legal.module.css";
import legalDocuments from "@/lib/data/legaldocuments.json";

type LegalDocument = {
  title: string;
  file: string;
};

export default function Legal() {
  const t = useTranslations("Legal");

  const [fullscreenDoc, setFullscreenDoc] =
    useState<LegalDocument | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  const openDocument = (doc: LegalDocument) => {
    if (isMobile) {
      setFullscreenDoc(doc);
    } else {
      window.open(doc.file, "_blank");
    }
  };

  const closeFullscreen = () => setFullscreenDoc(null);

  return (
    <div className={styles.legalContainer}>
      <header className={styles.legalHeader}>
        <h1 className={styles.legalTitle}>
          {t("Title")}
        </h1>

        <p className={styles.legalSubtitle}>
          {t("Text")}
        </p>

        <div className={styles.titleDivider}></div>
      </header>

      <div className={styles.documentsGrid}>
        {legalDocuments.map((doc, index) => (
          <div
            key={index}
            className={styles.documentCard}
            onClick={() => openDocument(doc)}
            title={doc.title}
          >
            <div className={styles.documentIcon}>
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path
                  fill="#E2001A"
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                />
                <path fill="#FFFFFF" d="M14 2v6h6" />
                <path fill="#FFCDD2" d="M14 8h6l-6-6v6z" />

                <text
                  x="12"
                  y="16"
                  fontFamily="Arial"
                  fontSize="6"
                  fill="#FFFFFF"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  PDF
                </text>
              </svg>
            </div>

            <div className={styles.documentInfo}>
              <h3 className={styles.documentTitle}>
                {doc.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {isMobile && fullscreenDoc && (
        <div className={styles.documentFullscreen}>
          <div className={styles.documentFullscreenContent}>
            <button
              className={styles.closeButton}
              onClick={closeFullscreen}
            >
              &times;
            </button>

            <p className={styles.mobileNotice}>
              {t("Text2")}
            </p>

            <a
              href={fullscreenDoc.file}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadLink}
            >
              {t("TextLink")}
            </a>

            <embed
              src={fullscreenDoc.file}
              type="application/pdf"
              className={styles.documentIframe}
            />
          </div>
        </div>
      )}
    </div>
  );
}