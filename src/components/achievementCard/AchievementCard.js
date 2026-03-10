import React from "react";
import "./AchievementCard.scss";
import { useTranslation } from 'react-i18next';

/* eslint-disable react/prop-types */

function openUrlInNewTab(url, name) {
  if (!url) {
    console.log(`URL for ${name} not found`);
    return;
  }
  const win = window.open(url, "_blank");
  if (win) {
    win.focus();
  }
}

export default function AchievementCard({cardInfo, isDark}) {
  const { t } = useTranslation();
  const footerLinks = Array.isArray(cardInfo.footer) ? cardInfo.footer : [];

  return (
    <div className={isDark ? "dark-mode certificate-card" : "certificate-card"}>
      <div className="certificate-image-div">
        <img
          src={cardInfo.image}
          alt={cardInfo.imageAlt || "Card Thumbnail"}
          className="card-image"
        ></img>
      </div>
      <div className="certificate-detail-div">
        <h5 className={isDark ? "dark-mode card-title" : "card-title"}>
          {t(cardInfo.title)}
        </h5>
        <p className={isDark ? "dark-mode card-subtitle" : "card-subtitle"}>
          {t(cardInfo.description)}
        </p>
      </div>
      <div className="certificate-card-footer">
        {footerLinks.map(v => {
          return (
            <button
              key={`${v.name}-${v.url}`}
              type="button"
              className={
                isDark ? "dark-mode certificate-tag" : "certificate-tag"
              }
              onClick={() => openUrlInNewTab(v.url, v.name)}
            >
              {v.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
