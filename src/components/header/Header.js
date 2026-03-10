import React, {useContext} from "react";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {useTranslation} from "react-i18next";
import i18n from "../../i18n";
import LangSwitch from '../LangSwitch/LangSwitch';
import {
  greeting,
  workExperiences,
  skillsSection,
  openSource,
  blogSection,
  talkSection,
  achievementSection,
  resumeSection
} from "../../portfolio";

function Header() {
  const {isDark} = useContext(StyleContext);
  const {t} = useTranslation();
  const viewExperience = workExperiences.display;
  const viewOpenSource = openSource.display;
  const viewSkills = skillsSection.display;
  const viewAchievement = achievementSection.display;
  const viewBlog = blogSection.display;
  const viewTalks = talkSection.display;
  const viewResume = resumeSection.display;

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <a href="https://github.com/catalinpop92" className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon"
          htmlFor="menu-btn"
          style={{color: "white"}}
          aria-label="Toggle navigation menu"
        >
          <span
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: 0,
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              border: 0
            }}
          >
            Toggle menu
          </span>
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          {viewSkills && (
            <li>
              <a href="#skills">{t("header.skills")}</a>
            </li>
          )}
          {viewExperience && (
            <li>
              <a href="#experience">{t("header.experience")}</a>
            </li>
          )}
          {viewOpenSource && (
            <li>
              <a href="#opensource">{t("header.opensource")}</a>
            </li>
          )}
          {viewAchievement && (
            <li>
              <a href="#achievements">{t("header.achievements")}</a>
            </li>
          )}
          {viewBlog && (
            <li>
              <a href="#blogs">{t("header.blogs")}</a>
            </li>
          )}
          {viewTalks && (
            <li>
              <a href="#talks">{t("header.talks")}</a>
            </li>
          )}
          {viewResume && (
            <li>
              <a href="#resume">{t("header.resume")}</a>
            </li>
          )}
          <li>
            <a href="#contact">{t("header.contact")}</a>
          </li>
          <li style={{display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', padding: '0 12px'}}>
            {/* Theme toggle */}
            <ToggleSwitch mode="theme" />
            {/* Language pill switch */}
            <LangSwitch current={i18n.resolvedLanguage || i18n.language} onChange={(lang) => i18n.changeLanguage(lang)} />
          </li>
        </ul>
      </header>
    </Headroom>
  );
}
export default Header;
