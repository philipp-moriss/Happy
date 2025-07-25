import { THEME as commonTheme } from "./theme";
import {
  ITheme,
  ThemeColors,
  ThemeGradients,
  ThemeSizes,
  ThemeSpacing,
} from "./types/theme";

export const COLORS: ThemeColors = {
  text01: "#000000",
  text02: "rgba(0, 0, 0, 0.7)",
  text03: "rgba(0, 0, 0, 0.5)",
  text04: "#FFFFFF",
  text05: "rgba(0, 0, 0, 0.3)",
  bg01: "#FFFFFF",
  bg02: "#F5F5F5",
  bg03: "#E5E5E5",
  bgTransparency50: "rgba(255, 255, 255, 0.5)",
  transparencyPrimary: "rgba(135, 74, 176, 0.1)",
  transparency80: "rgba(255, 255, 255, 0.8)",
  primary: "#6C7AF2",
  green: "#34C759",
  yellow: "#FFB800",
  pink: "#FF7483",
  blueLight: "#70D4FF",
  orange: "#FCA444",
  supportGreen: "#00AE27",
  supportGray: "#A9A9A9",
  red: "#FF6B6B",
  white: "#FFFFFF",
};

export const GRADIENTS: ThemeGradients = {
  /* primary: ["#FF0080", "#7928CA"],
   secondary: ["#A8B8D8", "#627594"],
   info: ["#21D4FD", "#2152FF"],
   success: ["#98EC2D", "#17AD37"],
   warning: ["#FBCF33", "#F53939"],
   danger: ["#FF667C", "#EA0606"],

   light: ["#EBEFF4", "#CED4DA"],
   dark: ["#3A416F", "#141727"],

 /!*  white: [String(COLORS.white), "#EBEFF4"],
   black: [String(COLORS.black), "#141727"],*!/

   divider: ["rgba(255,255,255,0.3)", "rgba(102, 116, 142, 0.6)"],
   menu: [
     "rgba(255, 255, 255, 0.2)",
     "rgba(112, 125, 149, 0.5)",
     "rgba(255, 255, 255, 0.2)",
   ],*/
};

export const SIZES: ThemeSizes = {
  // global sizes
  base: 8,
  padding20: 20,
  padding10: 10,
  padding5: 5,

  // fonts sizes
  Medium1: 24,
  Medium2: 18,
  Medium2Small: 14,
  Medium3: 18,
  Medium5: 16,
  text16: 16,
  text14: 14,

  regular4: 18,
  regular6: 16,
  regular7: 14,

  regular12: 12,
  regular14Medium: 14,
  regular14: 14,
  // button sizes
  buttonBorder: 1,
  buttonRadius: 16,

  // button shadow
  shadowOffsetWidth: 0,
  shadowOffsetHeight: 7,
  shadowOpacity: 0.07,
  shadowRadius: 4,
  elevation: 2,

  // input sizes
  inputHeight: 46,
  inputBorder: 1,
  inputRadius: 8,
  inputPadding: 12,
};

export const SPACING: ThemeSpacing = {
  /** xs: 4px */
  xs: SIZES.base * 0.5,
  /** s: 8px */
  s: SIZES.base * 1,
  /** sm: 16px */
  sm: SIZES.base * 2,
  /** m: 24px */
  m: SIZES.base * 3,
  /** md: 32px */
  md: SIZES.base * 4,
  /** l: 40px */
  l: SIZES.base * 5,
  /** xl: 48px */
  xl: SIZES.base * 6,
  /** xxl: 56px */
  xxl: SIZES.base * 7,
};

export const LIGHT: ITheme = {
  ...commonTheme,
  colors: COLORS,
  gradients: GRADIENTS,
  sizes: { ...SIZES, ...commonTheme.sizes, ...SPACING },
};
