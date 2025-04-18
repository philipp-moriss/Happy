import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

import Typography from "./typography";
import { ITextProps, LinkProps } from "../hooks/use-theme/types/components";
import useTheme from "../hooks/use-theme/use-theme";


const Link = ({
  onPress,
  text,
  styleLink,
  styleImg,
  styleText,
  colorText,
  img,
  ...props
}: LinkProps) => {
  const { colors } = useTheme();

  const getColor = () => {
    if (colorText && colors[colorText]) {
      return colors[colorText];
    }

    const selectedColor = Object.keys(colors).find(
      (key) => props[key as keyof ITextProps],
    );

    return selectedColor
      ? colors[selectedColor as keyof typeof colors]
      : colors.text01;
  };

  const textColor = getColor();

  return (
    <TouchableOpacity
      style={[styles.link, styleLink]}
      onPress={onPress}
      {...props}
    >
      {img ? (
        <SvgXml style={styleImg} xml={img} />
      ) : (
        <Typography regular14 color={textColor}>
          {text}
        </Typography>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  link: {
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Link;
