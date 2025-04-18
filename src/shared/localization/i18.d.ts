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

declare module "react-i18next" {
  interface UseTranslationResponse<N extends keyof CustomTypeOptions["resources"] = undefined> {
    t: (key: keyof MainTranslate | `${string}.${string}`) => string;
  }
}
