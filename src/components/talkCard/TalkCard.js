import React from "react";
import "./TalkCard.scss";
import {useTranslation} from "react-i18next";

export default function TalkCard({talkDetails}) {
  const {t} = useTranslation();
  return (
    <div>
      <div className="container">
        <div
          className={
            talkDetails.isDark ? "dark-rectangle rectangle" : "rectangle"
          }
        >
          <div className="diagonal-fill"></div>
          <div className="talk-card-title">{t(talkDetails.title)}</div>
          <p className="talk-card-subtitle">{t(talkDetails.subtitle)}</p>

          <div className="card-footer-button-div">
            <a href={talkDetails.slides_url} target="_" className="talk-button">
              {t("talks.card.slides")}
            </a>
            <a href={talkDetails.event_url} target="_" className="talk-button">
              {t("talks.card.event")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
