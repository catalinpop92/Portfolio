import React, {createRef, useContext} from "react";
import {Fade} from "react-reveal";
import "./EducationCard.scss";
import StyleContext from "../../contexts/StyleContext";
import { useTranslation } from 'react-i18next';

export default function EducationCard({school}) {
  const imgRef = createRef();

  // i18n
  const { t } = useTranslation();

  const GetDescBullets = ({descBullets}) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li key={i} className="subTitle">
            {t(item)}
          </li>
        ))
      : null;
  };
  const {isDark} = useContext(StyleContext);

  if (!school.logo)
    console.error(`Image of ${school.name} is missing in education section`);
  return (
    <div className="education-entry">
      <Fade left duration={1000}>
        <div className="education-card">
          {school.logo && (
            <div className="education-card-left">
              <img
                crossOrigin={"anonymous"}
                ref={imgRef}
                className="education-roundedimg"
                src={school.logo}
                alt={t(school.schoolName)}
              />
            </div>
          )}
          <div className="education-card-right">
            <h5 className="education-text-school">{t(school.schoolName)}</h5>

            <div className="education-text-details">
              <h5
                className={
                  isDark
                    ? "dark-mode education-text-subHeader"
                    : "education-text-subHeader"
                }
              >
                {t(school.subHeader)}
              </h5>
              <p
                className={`${
                  isDark ? "dark-mode" : ""
                } education-text-duration`}
              >
                {school.duration}
              </p>
              <p className="education-text-desc">{t(school.desc)}</p>
              <details className="portfolio-details education-text-bullets">
                <summary>
                  <span className="details-open-label">{t("details.education")}</span>
                  <span className="details-close-label">{t("details.closeEducation")}</span>
                  <span className="details-context"> — {t(school.schoolName)}</span>
                </summary>
                <ul>
                  <GetDescBullets descBullets={school.descBullets} />
                </ul>
              </details>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}
