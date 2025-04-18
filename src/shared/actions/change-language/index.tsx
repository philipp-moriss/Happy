import React from "react";
import Select from "../../components/select";
import { Language } from "../../localization/i18n";
import { View } from "react-native";
import useTranslate from "../../localization/use-translate";

export const ChangeLanguage = () => {
  const { currentLanguage, availableLanguages, changeLanguage } =
    useTranslate();

  const onChangeLang = async (val: Language) => {
    await changeLanguage(val);
  };

  return (
    <View style={{ width: 200, flex: 0 }}>
      <Select
        selectedValue={currentLanguage}
        placeholder="select lang"
        onChange={(value) => onChangeLang(value as Language)}
        options={availableLanguages}
        label={""}
      />
    </View>
  );
};
