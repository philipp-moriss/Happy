// i18next.d.ts
import "i18next";
import translationEn from "./en/index.json";

type MainTranslate = typeof translationEn;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: MainTranslate;
    };
  }
}
