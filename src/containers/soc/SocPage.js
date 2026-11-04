import React from "react";
import {useTranslation} from "react-i18next";
import ForensicsChallenge from "../../components/forensicsChallenge/ForensicsChallenge";
import "./SocPage.scss";

export function SocPreview() {
  const {t} = useTranslation();
  return (
    <section className="main soc-preview" id="challenge" aria-labelledby="soc-preview-title">
      <div>
        <p className="soc-page-eyebrow">{t("challenge.eyebrow")}</p>
        <h2 id="soc-preview-title">{t("challenge.title")}</h2>
        <p className="soc-preview-description">{t("challenge.pagePreview")}</p>
      </div>
      <a className="soc-page-link" href="#/soc">
        {t("challenge.openPage")} <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

export default function SocPage() {
  const {t} = useTranslation();
  return (
    <div className="soc-page">
      <div className="main soc-page-navigation">
        <a className="soc-page-link" href="#challenge">
          <span aria-hidden="true">←</span> {t("challenge.backToPortfolio")}
        </a>
      </div>
      <ForensicsChallenge standalone />
    </div>
  );
}
