import { Dimensions, Platform } from "react-native";

import {
  ICommonTheme,
  ThemeFonts,
  ThemeLineHeights,
  ThemeWeights,
} from "./types/theme";

const { width, height } = Dimensions.get("window");

// Naming source: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
export const WEIGHTS: ThemeWeights = {
  // based on fontWeight

  Medium1: Platform.OS === "ios" ? "500" : "normal",
  Medium2: Platform.OS === "ios" ? "500" : "normal",
  Medium2Small: Platform.OS === "ios" ? "500" : "normal",
  Medium3: Platform.OS === "ios" ? "500" : "normal",
  Medium5: Platform.OS === "ios" ? "500" : "normal",
  regular14Medium: Platform.OS === "ios" ? "500" : "normal",

  text16: "normal",
  text14: "normal",
  regular4: "normal",
  regular6: "normal",
  regular7: "normal",
  regular12: "normal",
  regular14: "normal",

  thin: Platform.OS === "ios" ? "100" : "normal",
  extralight: Platform.OS === "ios" ? "200" : "normal",
  light: Platform.OS === "ios" ? "300" : "normal",
  normal: Platform.OS === "ios" ? "400" : "normal",
  medium: Platform.OS === "ios" ? "500" : "normal",
  semibold: Platform.OS === "ios" ? "600" : "normal",
  bold: Platform.OS === "ios" ? "700" : "normal",
  extrabold: Platform.OS === "ios" ? "800" : "normal",
  black: Platform.OS === "ios" ? "900" : "normal",
};

export const ASSETS: any = {
  FirstNeueRegular: require("./fonts/TTFirsNeueRegular.ttf"),
  FirstNeueBold: require("./fonts/TTFirsNeueBold.ttf"),
  FirstNeueMedium: require("./fonts/TTFirsNeueTrialMedium.ttf"),
  RobotoRegular: require("./fonts/Roboto-Regular.ttf"),
};
export const FONTS: ThemeFonts = {
  // based on fonts size

  Medium1: "FirstNeueMedium",
  Medium2: "FirstNeueMedium",
  Medium2Small: "FirstNeueMedium",
  Medium3: "FirstNeueMedium",
  Medium5: "FirstNeueRegular",

  text16: "FirstNeueRegular",
  text14: "FirstNeueRegular",

  regular4: "FirstNeueRegular",
  regular6: "FirstNeueRegular",
  regular7: "FirstNeueRegular",

  regular12: "FirstNeueRegular",
  regular14: "FirstNeueRegular",
  regular14Medium: "FirstNeueRegular",
  // based on fontWeight
  mediumFirstNeue: "FirstNeueMedium",
  boldFirstNeue: "FirstNeueBold",
};

export const LINE_HEIGHTS: ThemeLineHeights = {
  // fonts lineHeight
  Medium1: 31,
  Medium2: 23,
  Medium2Small: 23,
  Medium3: 23,
  Medium5: 20,

  text16: 20,
  text14: 18,

  regular4: 22,
  regular6: 20,
  regular7: 18,

  regular12: 14,
  regular14Medium: 14,
  regular14: 16,
};

export const THEME: ICommonTheme = {
  assets: { ...ASSETS },
  fonts: FONTS,
  weights: WEIGHTS,
  lines: LINE_HEIGHTS,
  sizes: { width, height },
};
