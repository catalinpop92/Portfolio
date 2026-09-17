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
          <div className="tool-group">
            <h4>{t(group.title)}</h4>
            <ul className="tool-list">
              {group.tools.map(tool => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}
