import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import useReducedMotion from "../../hooks/useReducedMotion";
import "./Top.scss";

export default function Top() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const {t} = useTranslation();
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 500);
    update();
    window.addEventListener("scroll", update, {passive: true});
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: reducedMotion ? "instant" : "smooth"
        })
      }
      id="topButton"
      style={{visibility: visible ? "visible" : "hidden"}}
      aria-label={t("navigation.top")}
      title={t("navigation.top")}
    >
      <i className="fas fa-arrow-up" aria-hidden="true" />
    </button>
  );
}
