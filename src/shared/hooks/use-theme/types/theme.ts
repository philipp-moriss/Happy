import * as React from "react";
import {
  ColorValue,
  FlexStyle,
  ImageSourcePropType,
  Platform,
  ScaledSize,
  TextStyle,
} from "react-native";

// Spacing types
export interface ISpacing
  extends Pick<
    FlexStyle,
    | "margin"
    | "marginVertical"
    | "marginHorizontal"
    | "marginLeft"
    | "marginRight"
    | "marginTop"
    | "marginBottom"
    | "padding"
    | "paddingVertical"
    | "paddingHorizontal"
    | "paddingLeft"
    | "paddingRight"
    | "paddingTop"
    | "paddingBottom"
  > {}

export interface ITheme {
  colors: ThemeColors;
  gradients: ThemeGradients;
  sizes: ThemeSizes & ThemeSpacing & ICommonTheme["sizes"];
  assets: ThemeAssets;
  fonts: ThemeFonts;
  weights: ThemeWeights;
  lines: ThemeLineHeights;
}

export interface ICommonTheme {
  assets: ThemeAssets;
  fonts: ThemeFonts;
  weights: ThemeWeights;
  lines: ThemeLineHeights;
  sizes: {
    width: ScaledSize["width"];
    height: ScaledSize["height"];
  };
}

export interface IThemeProvider {
  children?: React.ReactNode;
  theme?: ITheme;
  setTheme?: (theme?: ITheme) => void;
}

export interface ThemeColors {
  text01: ColorValue;
  text02: ColorValue;
  text03: ColorValue;
  bg01: ColorValue;
  text04: ColorValue;
  white: ColorValue;
  text05: ColorValue;
  bg02: ColorValue;
  bg03: ColorValue;
  bgTransparency50: ColorValue;
  transparencyPrimary: ColorValue;
  transparency80: ColorValue;
  primary: ColorValue;
  green: ColorValue;
  yellow: ColorValue;
  pink: ColorValue;
  blueLight: ColorValue;
  orange: ColorValue;
  supportGreen: ColorValue;
  supportGray: ColorValue;
  supportRed: ColorValue;
}

export interface ThemeGradients {
  primary?: string[];
  secondary?: string[];
  tertiary?: string[];
  black?: string[];
  white?: string[];
  light?: string[];
  dark?: string[];
  gray?: string[];
  danger?: string[];
  warning?: string[];
  success?: string[];
  info?: string[];
  divider?: string[];
  menu?: string[];
}

export interface ThemeSizes {
  padding20: number;
  padding10: number;
  base: number;
  padding5: number;
  regular4: number;
  regular6: number;
  regular7: number;

  Medium1: number;
  Medium2: number;
  Medium2Small: number;
  Medium3: number;
  Medium5: number;
  text16: number;
  text14: number;
  regular12: number;
  regular14Medium: number;
  regular14: number;
  buttonBorder: number;
  buttonRadius: number;

  inputHeight: number;
  inputBorder: number;
  inputRadius: number;
  inputPadding: number;

  shadowOffsetWidth: number;
  shadowOffsetHeight: number;
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ThemeSpacing {
  xs: number;
  s: number;
  sm: number;
  m: number;
  md: number;
  l: number;
  xl: number;
  xxl: number;
}

export interface ThemeWeights {
  Medium1: TextStyle["fontWeight"];
  Medium2: TextStyle["fontWeight"];
  Medium2Small: TextStyle["fontWeight"];
  Medium3: TextStyle["fontWeight"];
  Medium5: TextStyle["fontWeight"];
  regular14Medium: TextStyle["fontWeight"];

  text16: TextStyle["fontWeight"];
  text14: TextStyle["fontWeight"];
  regular4: TextStyle["fontWeight"];
  regular6: TextStyle["fontWeight"];
  regular7: TextStyle["fontWeight"];
  regular12: TextStyle["fontWeight"];
  regular14: TextStyle["fontWeight"];

  thin: TextStyle["fontWeight"];
  extralight: TextStyle["fontWeight"];
  light: TextStyle["fontWeight"];
  normal: TextStyle["fontWeight"];
  medium: TextStyle["fontWeight"];
  semibold?: TextStyle["fontWeight"];
  bold?: TextStyle["fontWeight"];
  extrabold?: TextStyle["fontWeight"];
  black?: TextStyle["fontWeight"];
}

export interface ThemeAssets {
  FirstNeueRegular: any;
  FirstNeueBold: any;
  FirstNeueMedium: any;

  RobotoRegular: any;
  RobotoSemiBold: any;
  RobotoSemiBoldItalic: any;
  FiraRegular: any;

  logo: ImageSourcePropType;
  /*
    header: ImageSourcePropType;
    background: ImageSourcePropType;

    ios: ImageSourcePropType;
    android: ImageSourcePropType;*/
}

export interface ThemeFonts {
  Medium1: string;
  Medium2: string;
  Medium2Small: string;
  Medium3: string;
  Medium5: string;
  text16: string;
  text14: string;
  mediumFirstNeue: string;
  boldFirstNeue: string;
  regular4: string;
  regular6: string;
  regular7: string;
  regular12: string;
  regular14: string;
  regular14Medium: string;
}

export interface ThemeLineHeights {
  Medium1: number;
  Medium2: number;
  Medium2Small: number;
  Medium3: number;
  Medium5: number;
  text16: number;
  text14: number;
  regular4: number;
  regular6: number;
  regular7: number;

  regular12: number;
  regular14Medium: number;
  regular14: number;
}
