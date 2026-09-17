import React, {useContext} from "react";
import "./WorkExperience.scss";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import {workExperiences} from "../../portfolio";
import SectionReveal from "../../components/sectionReveal/SectionReveal";
import StyleContext from "../../contexts/StyleContext";
import {useTranslation} from "react-i18next";

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  const {t} = useTranslation();
  if (workExperiences.display) {
    return (
      <div id="experience">
        <div className="experience-container" id="workExperience">
          <div>
            <SectionReveal direction="left">
              <h2 className="experience-heading">{t("work.title")}</h2>
            </SectionReveal>
            <div className="experience-cards-div">
              {workExperiences.experience.map((card, i) => {
                return (
                  <SectionReveal
                    key={card.role}
                    direction={i % 2 ? "right" : "left"}
                    delay={i * 150}
                  >
                    <div className="experience-reveal">
                      <ExperienceCard
                        isDark={isDark}
                        cardInfo={{
                          company: card.company,
                          bannerTitle: card.bannerTitle,
                          bannerImage: card.bannerImage,
                          desc: card.desc,
                          date: card.date,
                          companylogo: card.companylogo,
                          role: card.role,
                          descBullets: card.descBullets
                        }}
                      />
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
