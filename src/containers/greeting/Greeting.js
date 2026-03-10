import React, {useContext} from "react";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import {illustration, greeting} from "../../portfolio";
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
                <span className="wave-emoji">{emoji("👋")}</span>
              </h1>
              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {t(greeting.subTitle || "greeting.subtitle")}
              </p>
              <div id="resume" className="empty-div"></div>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text={t("greeting.contact")} href="#contact" />
                {greeting.resumeLink && (
                  <a
                    href={greeting.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-link-button"
                  >
                    <Button text={t("greeting.downloadResume")} />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={landingPerson} />
            ) : (
              <img
                alt="man sitting on table"
                src={require("../../assets/images/manOnTable.svg")}
              ></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
