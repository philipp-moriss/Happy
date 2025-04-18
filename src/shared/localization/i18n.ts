import * as Localization from "expo-localization";
import i18n, { LanguageDetectorModule } from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "./en/index.json";
import translationRu from "./ru/index.json";

type MainTranslate = typeof translationEn;
export type Language = "en" | "ru";

const resources: Record<
  Language,
  {
    translation: MainTranslate;
  }
> = {
  en: {
    translation: translationEn,
  },
  ru: {
    translation: translationRu,
  },
};

const defaultLang: Language = "en";

const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  detect: (): Language => {
    const supportedLanguages: Language[] = ["en", "ru"];

    const locale = Localization.getLocales()[0].languageCode;

    if (supportedLanguages.includes(locale as Language)) {
      return locale as Language;
    }

    console.warn(
      `Locale "${locale}" is not supported, defaulting to "${defaultLang}"`,
    );
    return defaultLang;
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLang,
    compatibilityJSON: "v3", //todo Для поддержки Android
    resources,
    defaultNS: "translation",
    ns: ["translation"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
