import Block from "@/src/shared/components/block";
import Button from "@/src/shared/components/button";
import Select from "@/src/shared/components/select";
import Typography from "@/src/shared/components/typography";
import { LIGHT } from "@/src/shared/hooks/use-theme/light";
import { ThemeContext } from "@/src/shared/hooks/use-theme/use-theme";
import { Language } from "@/src/shared/localization/i18n";
import useTranslate from "@/src/shared/localization/use-translate";
import React, { useContext } from "react";
import { toast } from "sonner-native";

export function HomeScreen() {
  const { translate, currentLanguage, availableLanguages, changeLanguage } =
    useTranslate();

  const { setTheme, theme } = useContext(ThemeContext);
  const onChangeLang = async (val: Language) => {
    await changeLanguage(val);
  };

  const changeTheme = () => {
    setTheme();
  };
  return (
    <Block justify="center" align="center" gap={20} paddingHorizontal={20}>
      <Typography>{translate("test")}</Typography>
      <Block flex={0} bg02 width={100} height={100} radius={16}>
        <Typography>{translate("Main.test")}</Typography>
      </Block>
      <Block flex={0} bg03 width={100} height={100} radius={16}>
        <Typography>{translate("Main.test")}</Typography>
      </Block>
      <Button
        onPress={() => {
          toast.success("test");
          changeTheme();
        }}
      >
        Press
      </Button>
      <Block width={200} flex={0}>
        <Select
          selectedValue={currentLanguage}
          placeholder="select lang"
          onChange={(value) => onChangeLang(value as Language)}
          options={availableLanguages}
          label={""}
        />
      </Block>
    </Block>
  );
}
