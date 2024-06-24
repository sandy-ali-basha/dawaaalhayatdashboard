import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import sidebarEn from "./translation/en/sidebar.json";
import sidebarAr from "./translation/ar/sidebar.json";
import headerEn from "./translation/en/header.json";
import headerAr from "./translation/ar/header.json";
import indexAr from "./translation/ar/index.json";
import indexEn from "./translation/en/index.json";
import settingMenuEn from "./translation/en/settingsMenu.json";
import settingMenuAr from "./translation/ar/settingsMenu.json";

let resources = {
  en: {
    sidebar: { ...sidebarEn },
    header: { ...headerEn },
    index: { ...indexEn },
    settingMenu: { ...settingMenuEn },
  },
  ar: {
    sidebar: { ...sidebarAr },
    header: { headerAr },
    index: { ...indexAr },
    settingMenu: { ...settingMenuAr },
  },
};
i18n

  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources,
    debug: true,
    ns: ["translation"],
    defualtNS: "trnaslation",
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
