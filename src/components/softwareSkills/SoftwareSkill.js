import React from "react";
import "./SoftwareSkill.scss";
import {skillsSection} from "../../portfolio";
import {useTranslation} from "react-i18next";
import SectionReveal from "../sectionReveal/SectionReveal";

export default function SoftwareSkill() {
  const {t} = useTranslation();
  return (
    <div className="tool-groups">
      {skillsSection.toolGroups.map((group, index) => (
        <SectionReveal
          key={group.title}
          direction={index % 2 ? "right" : "left"}
          delay={index * 100}
        >
          <section className="tool-group" aria-labelledby={`tool-group-${index}`}>
            <div className="tool-group-heading">
              <span className="tool-group-number" aria-hidden="true">0{index + 1} /</span>
              <h4 id={`tool-group-${index}`}>{t(group.title)}</h4>
              <p>{t(`${group.title}Detail`)}</p>
            </div>
            <ul className="tool-list" aria-labelledby={`tool-group-${index}`}>
              {group.tools.map(tool => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </section>
        </SectionReveal>
      ))}
    </div>
  );
}
