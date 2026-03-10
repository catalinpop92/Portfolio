import React from "react";
import "./LangSwitch.scss";

/* eslint-disable react/prop-types */

const LangSwitch = ({ current, onChange }) => {
  const currentLang = (current || "").toLowerCase().split("-")[0];

  return (
    <div className="lang-switch">
      <button
        className={currentLang === "en" ? "active" : ""}
        onClick={() => currentLang !== "en" && onChange("en")}
        aria-pressed={currentLang === "en"}
      >
        EN
      </button>
      <button
        className={currentLang === "it" ? "active" : ""}
        onClick={() => currentLang !== "it" && onChange("it")}
        aria-pressed={currentLang === "it"}
      >
        IT
      </button>
    </div>
  );
};

export default LangSwitch;
