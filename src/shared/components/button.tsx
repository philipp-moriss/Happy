import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import Typography from "./typography";
import { IButtonProps, ITextProps } from "../hooks/use-theme/types/components";
import useTheme from "../hooks/use-theme/use-theme";


const Button = ({
  id = "Button",
  children,
  style,
  color,
  gradient,
  info,
  flex,
  radius,
  round,
  rounded,
  disabled,
  margin,
  marginBottom,
  marginTop,
  marginHorizontal,
  marginVertical,
  marginRight,
  marginLeft,
  padding,
  paddingBottom,
  paddingTop,
  paddingHorizontal,
  paddingVertical,
  paddingRight,
  paddingLeft,
  align,
  justify,
  height,
  width,
  row,
  outlined,
  social,
  activeOpacity = 0.7,
  shadow = true,
  position,
  right,
  left,
  top,
  bottom,
  haptic = true,
  vibrate,
  vibrateRepeat,
  onPress,
  ...props
}: IButtonProps) => {
  const { colors, sizes } = useTheme();

  const getColor = () => {
    if (color && colors[color]) {
      return colors[color];
    }

    const selectedColor = Object.keys(colors).find(
      (key) => props[key as keyof ITextProps],
    );

    return selectedColor
      ? colors[selectedColor as keyof typeof colors]
      : colors.primary;
  };

  const bgColor = getColor();

  const buttonStyles = StyleSheet.flatten([
    {
      height: 58,
      width: "100%",
      color: colors.text02,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: rounded ? sizes.s : sizes.buttonRadius,
      ...(bgColor && { backgroundColor: bgColor }),
      /*    ...(shadow &&
            bgColor !== "transparent" && {
              shadowColor: colors.text01,
              shadowOffset: {
                width: sizes.shadowOffsetWidth,
                height: sizes.shadowOffsetHeight,
              },
              shadowOpacity: sizes.shadowOpacity,
              shadowRadius: sizes.shadowRadius,
              elevation: sizes.elevation,
            }),*/
      ...(row && { flexDirection: "row" }),
      ...(radius && { borderRadius: radius }),
      ...(flex !== undefined && { flex }),
      ...(margin !== undefined && { margin }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(padding !== undefined && { padding }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(align && { alignItems: align }),
      ...(justify && { justifyContent: justify }),
      ...(height && { height }),
      ...(width && { width }),
      ...(typeof outlined === "boolean" && {
        borderWidth: sizes.buttonBorder,
        borderColor: bgColor,
        backgroundColor: "transparent",
      }),
      ...(typeof outlined === "string" && {
        borderWidth: sizes.buttonBorder,
        borderColor: outlined,
      }),
      ...(disabled && {
        opacity: 1,
        backgroundColor: "#EFEFEF",
      }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
    style,
  ]) as ViewStyle;

  /* handle onPress event */
  const handlePress = useCallback(
    (event) => {
      onPress?.(event);

      /*  /!* vibrate onPress *!/
        if (vibrate) {
          Vibration.vibrate(vibrate, vibrateRepeat);
        }*/

      /* haptic feedback onPress */
      /* if (haptic) {
         Haptics.selectionAsync();
       }*/
    },
    [haptic, vibrate, vibrateRepeat, onPress],
  );

  if (round) {
    const maxSize = Math.max(
      Number(buttonStyles.width || 0),
      Number(buttonStyles.minWidth || 0),
      Number(buttonStyles.maxWidth || 0),
      Number(buttonStyles.height || 0),
      Number(buttonStyles.minHeight || 0),
      Number(buttonStyles.maxHeight || 0),
    );
    buttonStyles.maxWidth = maxSize;
    buttonStyles.maxHeight = maxSize;
    buttonStyles.borderRadius = maxSize / 2;
  }

  const gradientStyles = StyleSheet.flatten([
    buttonStyles,
    {
      flex: 1,
      width: "100%",
      ...(round && { maxWidth: buttonStyles.maxWidth }),
    },
  ]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const buttonID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  if (gradient) {
    return (
      <TouchableOpacity
        disabled={disabled}
        {...buttonID}
        activeOpacity={activeOpacity}
        onPress={handlePress}
        {...props}
        style={buttonStyles}
      >
        <LinearGradient
          style={gradientStyles}
          colors={gradient as any}
          start={[0, 1]}
          end={[1, 0]}
        >
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (social) {
    const socialIcon =
      social === "facebook"
        ? "logo-facebook"
        : social === "twitter"
          ? "logo-twitter"
          : "logo-dribbble";

    return (
      <TouchableOpacity
        disabled={disabled}
        {...buttonID}
        activeOpacity={activeOpacity}
        onPress={handlePress}
        {...props}
        style={buttonStyles}
      >
        <Ionicons name={socialIcon} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      {...buttonID}
      activeOpacity={activeOpacity}
      onPress={handlePress}
      {...props}
      style={buttonStyles}
    >
      <Typography text03={!disabled} text05={disabled} Medium2>
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
