import React, {useContext} from "react";
import {Fade} from "react-reveal";
import "./Greeting.scss";
import portrait from "../../assets/images/catalin-pop-portrait.png";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {greeting} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";
import {useTranslation} from "react-i18next";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  const {t} = useTranslation();
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <p className="greeting-eyebrow"><span aria-hidden="true">●</span> {t("greeting.eyebrow")}</p>
              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                <span className="greeting-hello">{t("greeting.hello")}</span>
                <span className="greeting-name">{greeting.username}</span>
              </h1>
              <h2 className="greeting-role">{t("greeting.role")}</h2>
              {t(greeting.subTitle || "greeting.subtitle")
                .split("\n\n")
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      isDark
                        ? "dark-mode greeting-text-p"
                        : "greeting-text-p subTitle"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              <div id="resume" className="empty-div"></div>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text={t("greeting.viewProjects")} href="#projects" />
                <Button text={t("greeting.contact")} href="#contact" className="contact-link-button" />
                {greeting.resumeLink && (
                  <Button
                    text={t("greeting.downloadResume")}
                    href={greeting.resumeLink}
                    newTab
                    className="download-link-button"
                  />
                )}
              </div>
              <a className="greeting-challenge-link" href="#challenge">
                <span className="greeting-challenge-icon" aria-hidden="true">↗</span>
                <span><strong>{t("greeting.challengeTitle")}</strong><small>{t("greeting.challengeSubtitle")}</small></span>
              </a>
            </div>
          </div>
          <div className="greeting-image-div">
            <div className="greeting-portrait-frame">
            <img
              className="greeting-portrait"
              src={portrait}
              alt={greeting.username}
              width="1086"
              height="1448"
            />
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
