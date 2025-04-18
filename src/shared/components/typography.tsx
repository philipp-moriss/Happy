import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, StyleSheet, Text, TextStyle } from "react-native";
import * as Animatable from "react-native-animatable";
import { ITextProps } from "../hooks/use-theme/types/components";
import useTheme from "../hooks/use-theme/use-theme";


const Typography = (props: ITextProps) => {
  const {
    id = "Text",
    animation,
    duration,
    children,
    style,
    center,
    gradient,
    color,
    opacity,
    size,
    weight,
    font,
    align,
    transform,
    lineHeight,
    position,
    right,
    left,
    top,
    bottom,
    start,
    end,
    marginBottom,
    marginTop,
    marginHorizontal,
    marginVertical,
    marginRight,
    marginLeft,
    paddingBottom,
    paddingTop,
    paddingHorizontal,
    paddingVertical,
    paddingRight,
    paddingLeft,
    ...rest
  } = props;
  const { colors, sizes, lines, weights, fonts } = useTheme();

  const getColor = () => {
    if (props.color && colors[props.color]) {
      return colors[props.color];
    }

    const selectedColor = Object.keys(colors).find(
      (key) => props[key as keyof ITextProps],
    );

    return selectedColor
      ? colors[selectedColor as keyof typeof colors]
      : colors.text01;
  };

  const textColor = getColor();

  const textStyles = StyleSheet.flatten([
    {
      color: colors.text01,
      fontSize: sizes.text14,
      // lineHeight: lines.text14,
      fontWeight: weights.text14,
      fontFamily: fonts.text14,
      ...(textColor && { color: textColor }),
      ...(props.Medium1 && {
        fontSize: sizes.Medium1,
        // lineHeight: lines.Medium1,
        fontWeight: weights.Medium1,
        fontFamily: fonts.Medium1,
        color: colors.text01,
      }),
      ...(props.Medium2 && {
        fontSize: sizes.Medium2,
        // lineHeight: lines.Medium2,
        fontWeight: weights.Medium2,
        fontFamily: fonts.Medium2,
        color: colors.text01,
      }),
      ...(props.Medium2Small && {
        fontSize: sizes.Medium2Small,
        // lineHeight: lines.Medium2Small,
        fontWeight: weights.Medium2Small,
        fontFamily: fonts.Medium2Small,
        color: colors.text02,
      }),
      ...(props.Medium3 && {
        fontSize: sizes.Medium3,
        // lineHeight: lines.Medium3,
        fontWeight: weights.Medium3,
        fontFamily: fonts.Medium3,
        color: colors.text02,
      }),
      ...(props.Medium5 && {
        fontSize: sizes.Medium5,
        // lineHeight: lines.Medium5,
        fontWeight: weights.Medium5,
        fontFamily: fonts.Medium5,
        color: colors.text02,
      }),
      ...(props.text16 && {
        fontSize: sizes.text16,
        // lineHeight: lines.text16,
        fontWeight: weights.text16,
        fontFamily: fonts.text16,
      }),
      ...(props.text14 && {
        fontSize: sizes.text14,
        // lineHeight: lines.text14,
        fontWeight: weights.text14,
        fontFamily: fonts.text14,
      }),
      ...(props.regular4 && {
        fontSize: sizes.regular4,
        // lineHeight: lines.regular4,
        fontWeight: weights.regular4,
        fontFamily: fonts.regular4,
      }),
      ...(props.regular6 && {
        fontSize: sizes.regular6,
        // lineHeight: lines.regular6,
        fontWeight: weights.regular6,
        fontFamily: fonts.regular6,
      }),
      ...(props.regular7 && {
        fontSize: sizes.regular7,
        // lineHeight: lines.regular7,
        fontWeight: weights.regular7,
        fontFamily: fonts.regular7,
      }),
      ...(props.regular12 && {
        fontSize: sizes.regular12,
        // lineHeight: lines.regular12,
        fontWeight: weights.regular12,
        fontFamily: fonts.regular12,
      }),
      ...(props.regular14Medium && {
        fontSize: sizes.regular14Medium,
        // lineHeight: lines.regular14Medium,
        fontWeight: weights.regular14Medium,
        fontFamily: fonts.regular14Medium,
      }),
      ...(props.regular14 && {
        fontSize: sizes.regular14,
        // lineHeight: lines.regular14,
        fontWeight: weights.regular14,
        fontFamily: fonts.regular14,
      }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(center && { textAlign: "center" }),
      ...(align && { textAlign: align }),

      ...(weight && { fontWeight: weight }),
      ...(transform && { textTransform: transform }),
      ...(font && { fontFamily: font }),
      ...(size && { fontSize: size }),
      ...(color && { color }),
      ...(opacity && { opacity }),
      // ...(lineHeight && { lineHeight: lineHeight   }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
    style,
  ]) as TextStyle;

  /*
   * Calculate gradient height container based on text lineHeight or fontSize
   * add an extra value from marginVertical or marginTop or marginBottom
   */
  const gradientHeight =
    Number(textStyles?.lineHeight || textStyles?.fontSize || 0) +
    Number(
      textStyles?.marginVertical ||
        textStyles?.marginTop ||
        textStyles?.marginBottom ||
        0,
    );

  // generate component testID or accessibilityLabel based on Platform.OS
  const textID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  if (gradient) {
    return (
      <MaskedView
        maskElement={
          <Text {...textID} {...rest} style={textStyles}>
            {children}
          </Text>
        }
      >
        <LinearGradient
          colors={gradient as any}
          end={end || [0.2, 0]}
          start={start || [0, 0]}
          style={{ flex: 1, height: gradientHeight, flexWrap: "wrap" }}
        />
      </MaskedView>
    );
  }
  if (animation) {
    return (
      <Animatable.Text
        duration={2000}
        animation={animation}
        {...rest}
        style={textStyles}
      >
        {children}
      </Animatable.Text>
    );
  }

  return (
    <Text {...textID} {...rest} style={textStyles}>
      {children}
    </Text>
  );
};

export default React.memo(Typography);
