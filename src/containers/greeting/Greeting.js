import React, {useContext} from "react";
import {Fade} from "react-reveal";
import "./Greeting.scss";
import SecurityVisual from "../../components/securityVisual/SecurityVisual";
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
              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                {" "}
                {t(greeting.title || "greeting.title")}{" "}
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
                <Button text={t("greeting.contact")} href="#contact" />
                {greeting.resumeLink && (
                  <Button
                    text={t("greeting.downloadResume")}
                    href={greeting.resumeLink}
                    newTab
                    className="download-link-button"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            <SecurityVisual />
          </div>
        </div>
      </div>
    </Fade>
  );
}
