import React from "react";
import "./Skills.scss";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import {skillsSection} from "../../portfolio";
import {useTranslation} from "react-i18next";
import SectionReveal from "../../components/sectionReveal/SectionReveal";

export default function Skills() {
  const {t} = useTranslation();
  if (!skillsSection.display) return null;

  return (
    <section
      className="main soc-skills"
      id="skills"
      aria-labelledby="skills-title"
    >
      <SectionReveal direction="left">
        <h2 className="skills-heading" id="skills-title">
          {t(skillsSection.title)}
        </h2>
      </SectionReveal>
      <SectionReveal direction="right" delay={100}>
        <p className="subTitle soc-intro">{t(skillsSection.subTitle)}</p>
      </SectionReveal>
      <div className="soc-areas">
        {skillsSection.areas.map((area, index) => (
          <SectionReveal
            key={area.id}
            direction={["left", "bottom", "right"][index % 3]}
            delay={(index % 3) * 120}
          >
            <div className="soc-area-reveal">
              <article className="soc-area">
                <i className={area.icon} aria-hidden="true" />
                <h3>{t(`skills.area.${area.id}.title`)}</h3>
                <p>{t(`skills.area.${area.id}.desc`)}</p>
              </article>
            </div>
          </SectionReveal>
        ))}
      </div>
      <SectionReveal direction="left">
        <div className="soc-additional">
          <h3>{t("skills.additional.title")}</h3>
          <p>{t("skills.additional.desc")}</p>
        </div>
      </SectionReveal>
      <div className="soc-toolbox">
        <SectionReveal direction="left">
          <h3>{t("skills.tools.title")}</h3>
        </SectionReveal>
        <SoftwareSkill />
        <SectionReveal direction="right">
          <p className="subTitle soc-background">{t("skills.background")}</p>
        </SectionReveal>
      </div>
    </section>
  );
}
