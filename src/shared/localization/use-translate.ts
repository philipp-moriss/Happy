import { useTranslation } from "react-i18next";
import { Language } from "./i18n";
import { I18nManager } from "react-native";
import { getLanguage, setLanguage } from "./helpers";
import { useCallback } from "react";

type languageItem = {
  label: string;
  value: Language;
};

const useTranslate = () => {
  const availableLanguages: Array<languageItem> = [
    {
      value: "en",
      label: "English",
    },
    {
      value: "ru",
      label: "Russian",
    },
  ];
  const { i18n, t, ...rest } = useTranslation();

  const _swapRtl = async (currentLanguageRtl: boolean) => {
    I18nManager.forceRTL(currentLanguageRtl);
    // await Updates.reloadAsync();
  };
  const changeLanguage = useCallback(
    async (language: Language) => {
      await setLanguage(language);
      await i18n.changeLanguage(language);
      const isRtl = i18n.dir(language) === "rtl";
      await _swapRtl(isRtl);
    },
    [i18n],
  );

  const currentLanguage = i18n.language as Language;

  const setUpLanguage = async () => {
    let currentLanguageFromStorage = await getLanguage();
    if (!currentLanguageFromStorage) {
      await setLanguage(currentLanguage);
      await i18n.changeLanguage(currentLanguage);
      const isRtl = i18n.dir(currentLanguage) === "rtl";
      await _swapRtl(isRtl);
      return;
    }
    await i18n.changeLanguage(currentLanguageFromStorage);
  };

  return {
    ...rest,
    i18n,
    translate: t,
    currentLanguage,
    availableLanguages,
    setUpLanguage,
    changeLanguage,
  };
};

export default useTranslate;
