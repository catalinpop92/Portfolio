import React, {useEffect, useState} from "react";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import SocPage, {SocPreview} from "./soc/SocPage";
import StackProgress from "./skillProgress/skillProgress";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Blogs from "./blogs/Blogs";
import Footer from "../components/footer/Footer";
import Talks from "./talks/Talks";
import Podcast from "./podcast/Podcast";
import Education from "./education/Education";
import ScrollToTopButton from "./topbutton/Top";
import Twitter from "./twitter-embed/twitter";
import Profile from "./profile/Profile";
import SplashScreen from "./splashScreen/SplashScreen";
import {splashScreen} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import useReducedMotion from "../hooks/useReducedMotion";
import {useTranslation} from "react-i18next";
import "./Main.scss";

const Main = () => {
  const [isDark, setIsDark] = useLocalStorage("isDark", true);
  const reducedMotion = useReducedMotion();
  const {i18n, t} = useTranslation();
  const [isSocPage, setIsSocPage] = useState(() => window.location.hash === "#/soc");

  useEffect(() => {
    const navigate = () => setIsSocPage(window.location.hash === "#/soc");
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] = useState(
    () => splashScreen.enabled && !reducedMotion
  );

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || "en";
    document.title = isSocPage ? `${t("challenge.title")} | Catalin Pop` : "Catalin Pop | SOC Analyst";
  }, [i18n.resolvedLanguage, isSocPage, t]);

  useEffect(() => {
    if (isSocPage) {
      window.scrollTo(0, 0);
    } else if (!isShowingSplashAnimation && window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView({behavior: "instant"});
    }
  }, [isShowingSplashAnimation, isSocPage]);

  useEffect(() => {
    if (isShowingSplashAnimation) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        reducedMotion ? 0 : splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, [isShowingSplashAnimation, reducedMotion]);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? "portfolio-site dark-mode" : "portfolio-site"}>
      <StyleProvider value={{isDark, changeTheme, reducedMotion}}>
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <SplashScreen />
        ) : (
          <>
            <a className="skip-link" href="#main-content">
              {t("navigation.skip")}
            </a>
            <Header />
            <main id="main-content" tabIndex="-1">
              {isSocPage ? <SocPage /> : <>
              <Greeting />
              <Skills />
              <Education />
              <WorkExperience />
              <Projects />
              <StartupProject />
              <SocPreview />
              <StackProgress />
              <Achievement />
              <Blogs />
              <Talks />
              <Twitter />
              <Podcast />
              <Profile />
              </>}
            </main>
            <Footer />
            <ScrollToTopButton />
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;
