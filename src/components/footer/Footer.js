import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import {useTranslation} from "react-i18next";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  const {t} = useTranslation();
  return (
    <Fade bottom duration={1000} distance="5px">
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {t('footer.madeby')}
        </p>
      </div>
    </Fade>
  );
}
