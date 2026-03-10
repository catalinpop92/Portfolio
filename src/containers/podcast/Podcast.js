import React, {useContext} from "react";
import "./Podcast.scss";
import {podcastSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import {useTranslation} from "react-i18next";

export default function Podcast() {
  const {isDark} = useContext(StyleContext);
  const {t} = useTranslation();

  if (!podcastSection)
    console.error("podcastSection object for Podcast section is missing");

  if (!podcastSection.display) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main">
        <div className="podcast-header">
          <h1 className="podcast-header-title">{t(podcastSection.title)}</h1>
          <p
            className={
              isDark
                ? "dark-mode podcast-header-subtitle"
                : "subTitle podcast-header-subtitle"
            }
          >
            {t(podcastSection.subtitle)}
          </p>
        </div>
        <div className="podcast-main-div">
          {podcastSection.podcast.map((podcastLink, i) => {
            if (!podcastLink) {
              console.log(
                `Podcast link for ${podcastSection.title} is missing`
              );
            }
            return (
              <div key={i}>
                <iframe
                  className="podcast"
                  src={podcastLink}
                  frameBorder="0"
                  scrolling="no"
                  title="Podcast"
                ></iframe>
              </div>
            );
          })}
        </div>
      </div>
    </Fade>
  );
}
