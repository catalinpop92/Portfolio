import React, {useContext} from "react";
import "./Skills.scss";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import {illustration, skillsSection} from "../../portfolio";
import {Fade} from "react-reveal";
import codingPerson from "../../assets/lottie/codingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";
import {useTranslation} from "react-i18next";

export default function Skills() {
  const {isDark} = useContext(StyleContext);
  const {t} = useTranslation();
  if (!skillsSection.display) {
    return null;
  }
  return (
    <div className={isDark ? "dark-mode main" : "main"} id="skills">
      <div className="skills-main-div">
        <Fade left duration={1000}>
          <div className="skills-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={codingPerson} />
            ) : (
              <img
                alt="Man Working"
                src={require("../../assets/images/developerActivity.svg")}
              ></img>
            )}
          </div>
        </Fade>
        <Fade right duration={1000}>
          <div className="skills-text-div">
            <h1
              className={isDark ? "dark-mode skills-heading" : "skills-heading"}
            >
              {t("skills.title")} {" "}
            </h1>
            <p
              className={
                isDark
                  ? "dark-mode subTitle skills-text-subtitle"
                  : "subTitle skills-text-subtitle"
              }
            >
              {t("skills.subtitle")}
            </p>
            <SoftwareSkill />
            <div>
              {skillsSection.skills.map((skill, i) => (
                <p
                  key={i}
                  className={
                    isDark ? "dark-mode subTitle skills-text" : "subTitle skills-text"
                  }
                >
                  {t(skill)}
                </p>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
}
