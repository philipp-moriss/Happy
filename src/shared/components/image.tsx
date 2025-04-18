import React from "react";
import {
  Image as RNImage,
  ImageBackground,
  ImageStyle,
  Platform,
  StyleSheet,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { IImageProps } from "../hooks/use-theme/types/components";
import useTheme from "../hooks/use-theme/use-theme";

const Image = ({
  id = "Image",
  style,
  children,
  avatar,
  shadow,
  rounded,
  background,
  animation,
  radius,
  color,
  height,
  width,
  transform,
  padding,
  paddingVertical,
  paddingHorizontal,
  paddingRight,
  paddingLeft,
  paddingTop,
  paddingBottom,
  margin,
  marginVertical,
  marginHorizontal,
  marginRight,
  marginLeft,
  marginTop,
  marginBottom,
  ...props
}: IImageProps) => {
  const { colors, sizes } = useTheme();

  const imageStyles = StyleSheet.flatten([
    style,
    {
      borderRadius: 8,
      ...(height && { height }),
      ...(width && { width }),
      ...(margin && { margin }),
      ...(marginBottom && { marginBottom }),
      ...(marginTop && { marginTop }),
      ...(marginHorizontal && { marginHorizontal }),
      ...(marginVertical && { marginVertical }),
      ...(marginRight && { marginRight }),
      ...(marginLeft && { marginLeft }),
      ...(padding && { padding }),
      ...(paddingBottom && { paddingBottom }),
      ...(paddingTop && { paddingTop }),
      ...(paddingHorizontal && { paddingHorizontal }),
      ...(paddingVertical && { paddingVertical }),
      ...(paddingRight && { paddingRight }),
      ...(paddingLeft && { paddingLeft }),
      ...(rounded && { borderRadius: 8, overflow: "hidden" }),
      ...(radius !== undefined && { borderRadius: radius, overflow: "hidden" }),
      ...(color && { tintColor: color }),
      ...(transform && { transform }),
      ...(shadow && {
        shadowColor: colors.text01,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
      }),
      /*  ...(avatar && {
        height: sizes.avatarSize,
        width: sizes.avatarSize,
        borderRadius: sizes.avatarRadius,
        overflow: "hidden",
      }),*/
    },
  ]) as ImageStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const imageID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  if (background) {
    return (
      <ImageBackground {...imageID} style={imageStyles} {...props}>
        {children}
      </ImageBackground>
    );
  }
  if (!!animation) {
    return (
      <Animatable.Image
        duration={2000}
        animation={animation}
        {...imageID}
        style={imageStyles}
        {...props}
      />
    );
  }

  return <RNImage {...imageID} style={imageStyles} {...props} />;
};

export default Image;
