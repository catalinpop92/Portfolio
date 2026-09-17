import React, {useContext, useRef, useState} from "react";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {useTranslation} from "react-i18next";
import LangSwitch from "../LangSwitch/LangSwitch";
import {
  greeting,
  workExperiences,
  skillsSection,
  bigProjects,
  openSource,
  blogSection,
  talkSection,
  achievementSection,
  resumeSection
} from "../../portfolio";

export default function Header() {
  const {isDark} = useContext(StyleContext);
  const {t, i18n} = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef(null);
  const links = [
    [skillsSection.display, "skills", "header.skills"],
    [workExperiences.display, "experience", "header.experience"],
    [bigProjects.display, "projects", "header.projects"],
    [openSource.display, "opensource", "header.opensource"],
    [achievementSection.display, "achievements", "header.achievements"],
    [blogSection.display, "blogs", "header.blogs"],
    [talkSection.display, "talks", "header.talks"],
    [resumeSection.display, "resume", "header.resume"],
    [true, "contact", "header.contact"]
  ];
  return (
    <Headroom disable={isOpen}>
      <header
        className={isDark ? "dark-menu header" : "header"}
        onKeyDown={event => {
          if (event.key === "Escape" && isOpen) {
            setIsOpen(false);
            menuButton.current.focus();
          }
        }}
      >
        <a href="#greeting" className="logo" onClick={() => setIsOpen(false)}>
          <span className="grey-color">&lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </a>
        <button
          className="menu-icon"
          type="button"
          ref={menuButton}
          aria-label={t(isOpen ? "navigation.close" : "navigation.open")}
          aria-controls="site-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(open => !open)}
        >
          <span className="navicon" aria-hidden="true" />
        </button>
        <nav
          className={isOpen ? "menu menu-open" : "menu"}
          id="site-navigation"
          aria-label={t("navigation.main")}
        >
          <ul>
            {links
              .filter(([display]) => display)
              .map(([, id, label]) => (
                <li key={id}>
                  <a href={"#" + id} onClick={() => setIsOpen(false)}>
                    {t(label)}
                  </a>
                </li>
              ))}
            <li className="header-controls">
              <ToggleSwitch mode="theme" />
              <LangSwitch
                current={i18n.resolvedLanguage || i18n.language}
                onChange={language => i18n.changeLanguage(language)}
              />
            </li>
          </ul>
        </nav>
      </header>
    </Headroom>
  );
}
