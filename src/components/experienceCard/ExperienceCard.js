import React, {useState, createRef} from "react";
import "./ExperienceCard.scss";
import ColorThief from "colorthief";
import {useTranslation} from "react-i18next";

export default function ExperienceCard({cardInfo, isDark}) {
  const {t} = useTranslation();

  const [colorArrays, setColorArrays] = useState([]);
  const imgRef = createRef();

  function getColorArrays() {
    const colorThief = new ColorThief();
    setColorArrays(colorThief.getColor(imgRef.current));
  }

  function rgb(values) {
    return !values || values.length !== 3
      ? undefined
      : "rgb(" + values.join(", ") + ")";
  }

  const GetDescBullets = ({descBullets, isDark}) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li
            key={i}
            className={isDark ? "subTitle dark-mode-text" : "subTitle"}
          >
            {t(item)}
          </li>
        ))
      : null;
  };

  return (
    <div className={isDark ? "experience-card-dark" : "experience-card"}>
      <div
        style={
          cardInfo.bannerImage
            ? undefined
            : {
                background: cardInfo.companylogo ? rgb(colorArrays) : "#16475b"
              }
        }
        className={`experience-banner${
          cardInfo.bannerImage ? " experience-banner--image" : ""
        }`}
      >
        {cardInfo.bannerImage ? (
          <img
            className="experience-banner-image"
            src={cardInfo.bannerImage}
            alt={t(cardInfo.company)}
          />
        ) : (
          <>
            <div className="experience-blurred_div"></div>
            <div className="experience-div-company">
              <h5 className="experience-text-company">
                {t(cardInfo.company || cardInfo.bannerTitle)}
              </h5>
            </div>
          </>
        )}

        {cardInfo.companylogo ? (
          <img
            crossOrigin={"anonymous"}
            ref={imgRef}
            className="experience-roundedimg"
            src={cardInfo.companylogo}
            alt={t(cardInfo.company)}
            onLoad={cardInfo.bannerImage ? undefined : getColorArrays}
          />
        ) : (
          <div
            className="experience-roundedimg experience-security-icon"
            aria-hidden="true"
          >
            <i className="fas fa-shield-alt" />
          </div>
        )}
      </div>
      <div className="experience-text-details">
        <h5
          className={
            isDark
              ? "experience-text-role dark-mode-text"
              : "experience-text-role"
          }
        >
          {t(cardInfo.role)}
        </h5>
        <h5
          className={
            isDark
              ? "experience-text-date dark-mode-text"
              : "experience-text-date"
          }
        >
          {t(cardInfo.date)}
        </h5>
        <p
          className={
            isDark
              ? "subTitle experience-text-desc dark-mode-text"
              : "subTitle experience-text-desc"
          }
        >
          {t(cardInfo.desc)}
        </p>
        <ul>
          <GetDescBullets descBullets={cardInfo.descBullets} isDark={isDark} />
        </ul>
      </div>
    </div>
  );
}
