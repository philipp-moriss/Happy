import AnimatedLottieView from "lottie-react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../../hooks/use-theme/use-theme";
import Moon from "../../animations/Moon/Moon";
import Sun from "../../animations/Sun/Sun";

const ToggleTheme = () => {
  const { setTheme, theme, themeType } = useContext(ThemeContext);

  const changeTheme = () => {
    setTheme();
  };
  const isDarkMode = themeType === "dark";
  const [isToggled, setIsToggled] = useState(isDarkMode);

  const sunLottieRef = useRef<AnimatedLottieView>();
  const moonLottieRef = useRef<AnimatedLottieView>();

  useEffect(() => {
    setIsToggled(isDarkMode);
  }, [isDarkMode]);

  return (
    <TouchableOpacity
      onPress={() => {
        changeTheme();
        setIsToggled(!isToggled);
      }}
      style={[styles.toggleContainer, isToggled ? styles.dark : styles.light]}
    >
      <View
        style={[
          styles.toggle,
          isToggled ? styles.toggleDark : styles.toggleLight,
        ]}
      >
        {isToggled ? (
          <Moon lottieRef={moonLottieRef} isInfinityLoop autoPlay={true} />
        ) : (
          <Sun lottieRef={sunLottieRef} isInfinityLoop autoPlay={true} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    height: 35,
    width: 70,
    borderRadius: 15,
    padding: 2,
  },
  light: {
    backgroundColor: "#27282A",
  },
  dark: {
    backgroundColor: "#874AB0",
  },
  toggle: {
    height: 30,
    width: 30,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleLight: {
    backgroundColor: "#FFFFFF",
    transform: [{ translateX: 0 }],
  },
  toggleDark: {
    backgroundColor: "#141414",
    transform: [{ translateX: 30 }],
  },
  toggleText: {
    fontSize: 10,
    color: "#FFFFFF",
  },
});

export default ToggleTheme;
