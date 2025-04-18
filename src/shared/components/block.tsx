import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import { IBlockProps, ITextProps } from "../hooks/use-theme/types/components";
import useTheme from "../hooks/use-theme/use-theme";


const Block = (props: IBlockProps) => {
  const {
    id = "Block",
    children,
    style,

    animation,
    shadow,
    center,
    gradient,
    outlined,
    overflow,
    row,
    safe,
    keyboard,
    scroll,
    color,

    radius,
    height,
    width,
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
    justify,
    align,
    flex = 1,
    wrap,
    blur,
    position,
    right,
    left,
    top,
    bottom,
    end,
    start,
    ...rest
  } = props;
  const { colors, sizes } = useTheme();

  const getColor = () => {
    if (props.color && colors[props.color]) {
      return colors[props.color];
    }

    const selectedColor = Object.keys(colors).find(
      (key) => props[key as keyof ITextProps],
    );

    return selectedColor ? colors[selectedColor as keyof typeof colors] : colors.bg01;
  };

  const textColor = getColor();
  const blockStyles = StyleSheet.flatten([
    style,
    {
      /*  ...(shadow && {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: sizes.shadowOffsetWidth,
          height: sizes.shadowOffsetHeight,
        },
        shadowOpacity: sizes.shadowOpacity,
        shadowRadius: sizes.shadowRadius,
        elevation: sizes.elevation,
      }),*/
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
      ...(radius && { borderRadius: radius }),
      ...(height && { height }),
      ...(width && { width }),
      ...(overflow && { overflow }),
      ...(flex !== undefined && { flex }),
      ...(row && { flexDirection: "row" }),
      ...(align && { alignItems: align }),
      ...(center && { justifyContent: "center" }),
      ...(justify && { justifyContent: justify }),
      ...(wrap && { flexWrap: wrap }),
      ...(textColor && { backgroundColor: textColor }),
      ...(outlined && {
        borderWidth: 1,
        borderColor: textColor,
        backgroundColor: "transparent",
      }),
      ...(position && { position }),
      ...(right !== undefined && { right }),
      ...(left !== undefined && { left }),
      ...(top !== undefined && { top }),
      ...(bottom !== undefined && { bottom }),
    },
  ]) as ViewStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const blockID =
    Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

  if (safe) {
    return (
      <SafeAreaView {...blockID} {...rest} style={blockStyles}>
        {children}
      </SafeAreaView>
    );
  }

  if (keyboard) {
    return (
      <KeyboardAwareScrollView {...blockID} {...rest} style={blockStyles}>
        {children}
      </KeyboardAwareScrollView>
    );
  }

  if (scroll) {
    return (
      <ScrollView {...blockID} {...rest} style={blockStyles}>
        {children}
      </ScrollView>
    );
  }

  if (gradient) {
    return (
      <LinearGradient
        {...blockID}
        colors={gradient as any}
        style={blockStyles}
        end={end || [1, 0]}
        start={start || [0, 0]}
        {...rest}
      >
        {children}
      </LinearGradient>
    );
  }

  /*
  if (blur) {
    return (
      <BlurView
        {...blockID}
        tint={tint}
        intensity={intensity}
        style={blockStyles}
      >
        {children}
      </BlurView>
    );
  }
*/
  if (!!animation) {
    return (
      <Animatable.View
        duration={1000}
        {...blockID}
        animation={animation}
        {...rest}
        style={blockStyles}
      >
        {children}
      </Animatable.View>
    );
  }

  return (
    <View {...blockID} {...rest} style={blockStyles}>
      {children}
    </View>
  );
};

export default React.memo(Block);
