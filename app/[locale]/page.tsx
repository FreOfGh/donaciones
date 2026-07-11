"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "@/app/[locale]/Styles/Home.module.css";

type Comment = {
  name: string;
  message: string;
  date: string;
  position: string;
};

export default function Home() {
  const t = useTranslations("Home");

  const [visibleComments, setVisibleComments] = useState(5);

  const comments: Comment[] = [
    {
      name: t("Comments.comment_1.name"),
      message: t("Comments.comment_1.message"),
      date: t("Comments.comment_1.date"),
      position: t("Comments.comment_1.position"),
    },
    {
      name: t("Comments.comment_2.name"),
      message: t("Comments.comment_2.message"),
      date: t("Comments.comment_2.date"),
      position: t("Comments.comment_2.position"),
    },
    {
      name: t("Comments.comment_3.name"),
      message: t("Comments.comment_3.message"),
      date: t("Comments.comment_3.date"),
      position: t("Comments.comment_3.position"),
    },
  ];

  const getInitials = (name: string) => {
    if (!name || name === "Anónimo") return "?";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={styles["home-container"]}>
      <div className={styles["header-section"]}>
        <h1 className={styles["main-title"]}>
          {t("ValuesText")}
        </h1>

        <p className={styles["fundation-description"]}>
          {t("DescriptionCardText")}
        </p>
      </div>

      <div className={styles["video-section"]}>
        <h2 className={styles["video-title"]}>
          {t("VideoTitle")}
        </h2>

        <div className={styles["video-container"]}>
          <iframe
            src="https://www.youtube.com/embed/p0VorBUqS9E"
            title={t("VideoTitle")}
            allowFullScreen
          />
        </div>
      </div>

      <div className={styles["video-section"]}>
        <h2 className={styles["video-title"]}>
          {t("VideoTitle2")}
        </h2>

        <div className={styles["video-container"]}>
          <iframe
            src="https://www.youtube.com/embed/QNx8xaR-ttI"
            title={t("VideoTitle2")}
            allowFullScreen
          />
        </div>
      </div>

      <div className={styles["testimonials-section"]}>
        <h2 className={styles["testimonials-title"]}>
          {t("Comments.Title")}
        </h2>

        <div className={styles["comments-scroll-container"]}>
          <div className={styles["comments-list"]}>
            {comments.slice(0, visibleComments).map((comment, index) => (
              <div
                key={index}
                className={`${styles["comment-card"]} ${
                  index % 2 === 0
                    ? styles["left-comment"]
                    : styles["right-comment"]
                }`}
              >
                <div className={styles["comment-header"]}>
                  <div className={styles["user-pic"]}>
                    {getInitials(comment.name)}
                  </div>

                  <div className={styles["comment-author"]}>
                    <strong>{comment.name}</strong>

                    <span className={styles["comment-date"]}>
                      {comment.date}
                    </span>
                  </div>
                </div>

                <div className={styles["comment-body"]}>
                  {comment.message.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {comments.length > visibleComments && (
          <button
            className={styles["show-more"]}
            onClick={() => setVisibleComments((prev) => prev + 5)}
          >
            {t("Comments.ShowMore")}
          </button>
        )}
      </div>
    </div>
  );
}