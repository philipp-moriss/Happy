import React, { useState } from "react";
import { ITheme, IThemeProvider } from "./types/theme";
import { LIGHT } from "./light";
import { DARK } from "./dark";

export const ThemeContext = React.createContext({
  theme: LIGHT,
  themeType: "LIGHT",
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [themeState, setTheme] = useState({
    theme: LIGHT,
    themeType: "LIGHT",
  });

  const setThemeHandler = () => {
    if (themeState.themeType !== 'LIGHT') {
      setTheme({
        theme: LIGHT,
        themeType: "LIGHT",
      })
      return
    }
    setTheme({
      theme: DARK,
      themeType: "DARK",
    })
  };
  return (
    <ThemeContext.Provider
      value={{
        theme: themeState.theme,
        themeType: themeState.themeType,
        setTheme: setThemeHandler,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme(): ITheme {
  const { theme } = React.useContext(ThemeContext);
  return theme;
}
