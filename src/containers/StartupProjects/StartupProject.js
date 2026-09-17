import React, {useContext} from "react";
import "./StartupProjects.scss";
import {bigProjects} from "../../portfolio";
import SectionReveal from "../../components/sectionReveal/SectionReveal";
import BuildweekProjects from "../../components/buildweekProjects/BuildweekProjects";
import StyleContext from "../../contexts/StyleContext";
import {useTranslation} from "react-i18next";

export default function StartupProject() {
  const {isDark} = useContext(StyleContext);
  const {t} = useTranslation();
  if (!bigProjects.display) {
    return null;
  }
  return (
    <div className="main" id="projects">
      <div>
        <SectionReveal direction="left">
          <div>
            <h2 className="skills-heading">{t(bigProjects.title)}</h2>
            <p className={isDark ? "dark-mode project-subtitle" : undefined}>
              {bigProjects.subtitle ? t(bigProjects.subtitle) : ""}
            </p>
          </div>
        </SectionReveal>

        <BuildweekProjects />
        <SectionReveal direction="left">
          <h3 className="other-projects-heading">{t("buildweeks.other")}</h3>
        </SectionReveal>

        <div className="projects-container">
          {bigProjects.projects.map((project, i) => {
            return (
              <SectionReveal key={project.projectName} delay={i * 120}>
                <div className="project-card-reveal">
                  <div
                    className={
                      isDark
                        ? "dark-mode project-card project-card-dark"
                        : "project-card project-card-light"
                    }
                  >
                    {project.image ? (
                      <div className="project-image">
                        <img
                          src={project.image}
                          alt={t(project.projectName)}
                          className="card-image"
                          loading="lazy"
                          decoding="async"
                        ></img>
                      </div>
                    ) : null}
                    <div className="project-detail">
                      <h4
                        className={
                          isDark ? "dark-mode card-title" : "card-title"
                        }
                      >
                        {t(project.projectName)}
                      </h4>
                      <p
                        className={
                          isDark ? "dark-mode card-subtitle" : "card-subtitle"
                        }
                      >
                        {t(project.projectDesc)}
                      </p>
                      {project.footerLink ? (
                        <div className="project-card-footer">
                          {project.footerLink.map((link, i) => {
                            return (
                              <a
                                key={i}
                                className={
                                  isDark
                                    ? "dark-mode project-tag"
                                    : "project-tag"
                                }
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {t(link.name)}
                              </a>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
