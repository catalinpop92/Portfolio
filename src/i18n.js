import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import it from "./locales/it/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {translation: en},
      it: {translation: it}
    },
    supportedLngs: ["en", "it"],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    cleanCode: true,
    fallbackLng: "en",
    interpolation: {escapeValue: false},
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    }
  });

export default i18n;


