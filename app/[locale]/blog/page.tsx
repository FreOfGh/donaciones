"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./Blog.module.css";
import {
  Calendar1Icon,
  NewspaperIcon,
  BookOpenIcon,
} from "lucide-react";

export default function Blog() {
  const t = useTranslations("Blog");

  const [activeCategory, setActiveCategory] = useState<
    "all" | "activities" | "news"
  >("all");

  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const categories: ("all" | "activities" | "news")[] = [
    "all",
    "activities",
    "news",
  ];

  const handleImageClick = (image: string) => {
    setExpandedImage(image === expandedImage ? null : image);
  };

  const renderCategoryIcon = (category: string) => {
    switch (category) {
      case "all":
        return <BookOpenIcon />;
      case "activities":
        return <Calendar1Icon />;
      case "news":
        return <NewspaperIcon />;
      default:
        return null;
    }
  };

  return (
    <div className={styles["blog-container"]}>
      <header className={styles["blog-header"]}>
        <h1 className={styles["blog-title"]}>{t("Title")}</h1>

        <p className={styles["blog-subtitle"]}>
          {t("Subtitle")}
        </p>

        <div className={styles["title-divider"]}></div>

      </header>

      <div className={styles["blog-filters"]}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles["filter-button"]} ${
              activeCategory === category ? styles["active"] : ""
            }`}
            onClick={() => {
              setExpandedImage(null);
              setActiveCategory(category);
            }}
          >
            <span className={styles["category-text"]}>
              {t(`buttons.${category}`)}
            </span>

            <span className={styles["category-icon"]}>
              {renderCategoryIcon(category)}
            </span>
          </button>
        ))}
      </div>

      <div className={styles["blog-content"]}>
        {(activeCategory === "all" ||
          activeCategory === "activities") && (
          <div className={styles["blog-post"]}>
            <div
              className={`${styles["image-container"]} ${
                expandedImage === "/images/Becas.png"
                  ? styles["expanded"]
                  : ""
              }`}
              onClick={() => handleImageClick("/images/Becas.png")}
            >
              <img
                src="/images/Becas.png"
                alt={t("post.post1.TitlePost")}
                className={styles["blog-image"]}
              />
            </div>

            <div className={styles["post-details"]}>
              <h2 className={styles["post-title"]}>
                {t("post.post1.TitlePost")}
              </h2>

              <p className={styles["post-description"]}>
                {t("post.post1.TextPost")}
              </p>
            </div>
          </div>
        )}

        {(activeCategory === "all" ||
          activeCategory === "news") && (
          <>
            <div className={styles["blog-post"]}>
              <div
                className={styles["image-container"]}
                style={{ height: "auto", cursor: "default" }}
              >
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/rlKU0uz0FJc"
                  title={t("post.post2.TitlePost")}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              <div className={styles["post-details"]}>
                <h2 className={styles["post-title"]}>
                  {t("post.post2.TitlePost")}
                </h2>

                <p className={styles["post-description"]}>
                  {t("post.post2.TextPost")}
                </p>
              </div>
            </div>

            <div className={styles["blog-post"]}>
              <div
                className={styles["image-container"]}
                onClick={() =>
                  handleImageClick("/images/navidad-cma.png")
                }
              >
                <img
                  src="/images/navidad-cma.png"
                  alt={t("post.post2.TitlePost")}
                  className={styles["blog-image"]}
                />
              </div>

              <div className={styles["post-details"]}>
                <p className={styles["post-description"]}>
                  {t("post.post2.Part2TextPost")}
                </p>
              </div>
            </div>

            <div className={styles["blog-post"]}>
              <div
                className={styles["image-container"]}
                onClick={() =>
                  handleImageClick("/images/capacitate.png")
                }
              >
                <img
                  src="/images/capacitate.png"
                  alt={t("post.post3.TitlePost")}
                  className={styles["blog-image"]}
                />
              </div>

              <div className={styles["post-details"]}>
                <h2 className={styles["post-title"]}>
                  {t("post.post3.TitlePost")}
                </h2>

                <p className={styles["post-description"]}>
                  {t("post.post3.TextPost")}
                </p>
              </div>
            </div>
          </>
        )}

        {activeCategory !== "all" &&
          activeCategory !== "activities" &&
          activeCategory !== "news" && (
            <div className={styles["empty-state"]}>
              <p>{t("CategoryNotContent")}</p>
            </div>
          )}
      </div>

      {expandedImage && (
        <div
          className={styles["fullscreen-overlay"]}
          onClick={() => setExpandedImage(null)}
        >
          <img
            src={expandedImage}
            alt="Expanded"
            className={styles["fullscreen-image"]}
          />
        </div>
      )}
    </div>
  );
}