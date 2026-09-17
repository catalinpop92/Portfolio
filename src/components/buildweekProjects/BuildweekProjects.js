import React, {useContext, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import StyleContext from "../../contexts/StyleContext";
import SectionReveal from "../sectionReveal/SectionReveal";
import collection from "../../data/buildweeks.json";
import "./BuildweekProjects.scss";

const encodePath = path => path.split("/").map(encodeURIComponent).join("/");
const materialUrl = (project, file) =>
  `${process.env.PUBLIC_URL}/projects/${project.id}/${encodeURIComponent(
    file
  )}`;
const sourceUrl = (project, file) =>
  `${collection.repository}/blob/${collection.revision}/${encodePath(
    project.folder + "/" + file
  )}`;
const folderUrl = project =>
  `${collection.repository}/tree/${collection.revision}/${encodePath(
    project.folder
  )}`;

export default function BuildweekProjects() {
  const {t, i18n} = useTranslation();
  const {reducedMotion} = useContext(StyleContext);
  const [active, setActive] = useState(null);
  const headings = useRef({});
  const buttons = useRef({});
  const closingProject = useRef(null);

  useEffect(() => {
    if (active && headings.current[active]) {
      headings.current[active].focus({preventScroll: true});
      headings.current[active].scrollIntoView({
        behavior: reducedMotion ? "instant" : "smooth",
        block: "start"
      });
    } else if (!active && closingProject.current) {
      const button = buttons.current[closingProject.current];
      closingProject.current = null;
      button.focus({preventScroll: true});
      button.scrollIntoView({behavior: "instant", block: "center"});
    }
  }, [active, reducedMotion]);

  const close = id => {
    closingProject.current = id;
    setActive(null);
  };
  const size = bytes => {
    const unit = bytes >= 1024 * 1024 ? "MB" : "KB";
    const value = bytes / (unit === "MB" ? 1024 * 1024 : 1024);
    return `${new Intl.NumberFormat(i18n.resolvedLanguage, {
      maximumFractionDigits: 1
    }).format(value)} ${unit}`;
  };

  return (
    <div className="buildweek-projects">
      <SectionReveal direction="left">
        <div className="lab-intro">
          <h3>{t("buildweeks.title")}</h3>
          <p>{t("buildweeks.intro")}</p>
        </div>
      </SectionReveal>
      <div className="lab-grid">
        {collection.projects.map((project, index) => {
          const count = project.groups.reduce(
            (n, group) => n + group.files.length,
            0
          );
          return (
            <React.Fragment key={project.id}>
              <SectionReveal delay={index * 120}>
                <div
                  className="lab-card-reveal"
                  style={{"--project-column": index + 1}}
                >
                  <article
                    className={`lab-card${
                      active === project.id ? " is-selected" : ""
                    }`}
                  >
                    <div className="lab-cover" aria-hidden="true">
                      <span className="lab-unit">
                        UNIT {project.unit.toString().padStart(2, "0")}
                      </span>
                      <i className={project.icon} />
                      <span className="lab-cover-number">0{project.unit}</span>
                    </div>
                    <div className="lab-card-content">
                      <p className="lab-eyebrow">
                        Build Week {project.unit}
                        {project.role && ` · ${t(project.role)}`}
                      </p>
                      <h4>{t(project.title)}</h4>
                      <p className="lab-description">
                        {t(project.description)}
                      </p>
                      <ul
                        className="lab-tools"
                        aria-label={t("skills.tools.title")}
                      >
                        {project.tools.map(tool => (
                          <li key={tool}>{tool}</li>
                        ))}
                      </ul>
                      <div className="lab-card-bottom">
                        <span className="lab-count">
                          {t("buildweeks.files", {count})}
                        </span>
                        <button
                          type="button"
                          className="lab-explore"
                          ref={el => {
                            buttons.current[project.id] = el;
                          }}
                          aria-expanded={active === project.id}
                          aria-controls={`${project.id}-detail`}
                          onClick={() =>
                            active === project.id
                              ? close(project.id)
                              : setActive(project.id)
                          }
                        >
                          {t(
                            active === project.id
                              ? "buildweeks.close"
                              : "buildweeks.explore"
                          )}
                          <span aria-hidden="true">
                            {active === project.id ? "−" : "↗"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              </SectionReveal>
              <section
                className="lab-detail"
                key={project.id}
                id={`${project.id}-detail`}
                hidden={active !== project.id}
                aria-labelledby={`${project.id}-heading`}
              >
                <div className="lab-detail-top">
                  <div>
                    <p className="lab-eyebrow">
                      Build Week {project.unit}
                      {project.role && ` · ${t(project.role)}`} ·{" "}
                      {t("buildweeks.context")}
                    </p>
                    <h4
                      id={`${project.id}-heading`}
                      tabIndex="-1"
                      ref={el => {
                        headings.current[project.id] = el;
                      }}
                    >
                      {t(project.title)}
                    </h4>
                  </div>
                  <button
                    type="button"
                    className="lab-close"
                    onClick={() => close(project.id)}
                  >
                    {t("buildweeks.close")} <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="lab-overview">
                  <p>{t(project.overview)}</p>
                  <div>
                    <h5>{t("buildweeks.activities")}</h5>
                    <ul>
                      {project.activities.map(key => (
                        <li key={key}>{t(key)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="lab-actions">
                  <a
                    className="lab-download"
                    href={`${process.env.PUBLIC_URL}/projects/${project.id}.zip`}
                    download
                  >
                    <i className="fas fa-download" aria-hidden="true" />
                    {t("buildweeks.download")} <span>ZIP</span>
                  </a>
                  <a
                    href={folderUrl(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github" aria-hidden="true" />{" "}
                    {t("buildweeks.repository")}
                  </a>
                </div>

                {project.highlights && (
                  <div className="lab-challenges">
                    <h5>{t("buildweeks.challenges")}</h5>
                    <div className="lab-challenge-grid">
                      {project.highlights.map(challenge => (
                        <article className="lab-challenge" key={challenge.id}>
                          <i className={challenge.icon} aria-hidden="true" />
                          <h6>{t(challenge.title)}</h6>
                          <p>{t(challenge.description)}</p>
                          <ul>
                            {challenge.files.map(name => {
                              const file = project.groups
                                .flatMap(group => group.files)
                                .find(item => item.file === name);
                              return (
                                <li key={name}>
                                  <a
                                    href={materialUrl(project, name)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {t(file.title)}{" "}
                                    <span aria-hidden="true">↗</span>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                <h5 className="lab-materials-heading">
                  {t("buildweeks.materials")}
                </h5>
                <div className="lab-material-groups">
                  {project.groups.map(group => (
                    <div className="lab-material-group" key={group.title}>
                      <h6>{t(group.title)}</h6>
                      <ul>
                        {group.files.map(file => (
                          <li key={file.file} className="lab-resource">
                            <a
                              className="lab-resource-main"
                              href={
                                file.type === "PDF" || file.type === "TXT"
                                  ? materialUrl(project, file.file)
                                  : sourceUrl(project, file.file)
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="lab-file-type">{file.type}</span>
                              <span>
                                <span className="lab-resource-title">
                                  {t(file.title)}
                                </span>
                                <span className="lab-resource-meta">
                                  {file.pages
                                    ? `${t("buildweeks.pages", {
                                        count: file.pages
                                      })} · `
                                    : ""}
                                  {size(file.bytes)}
                                </span>
                              </span>
                            </a>
                            <a
                              className="lab-file-download"
                              href={materialUrl(project, file.file)}
                              download
                              aria-label={t("buildweeks.downloadFile", {
                                name: t(file.title)
                              })}
                              title={t("buildweeks.downloadFile", {
                                name: t(file.title)
                              })}
                            >
                              <i
                                className="fas fa-download"
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {project.chapters && (
                  <div className="lab-report-index">
                    <h5>{t("buildweeks.index")}</h5>
                    <p>{t("buildweeks.indexNote")}</p>
                    <ol>
                      {project.chapters.map(chapter => (
                        <li key={chapter.page}>
                          <a
                            href={`${materialUrl(
                              project,
                              "Buildweek3.pdf"
                            )}#page=${chapter.page}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>{t(chapter.title)}</span>
                            <span className="lab-page">
                              {t("buildweeks.page", {page: chapter.page})} ↗
                            </span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                <div className="lab-detail-footer">
                  <button
                    type="button"
                    className="lab-close"
                    onClick={() => close(project.id)}
                  >
                    {t("buildweeks.close")} <span aria-hidden="true">×</span>
                  </button>
                </div>
              </section>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
