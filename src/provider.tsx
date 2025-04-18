import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
import React, { createContext, useContext } from 'react';
import { RootStore } from './entity/root-store';

import imgSuccess from "./assets/images/success.jpg";
import imgWarning from "./assets/images/warning.jpg";
import { LIGHT } from "./shared/hooks/use-theme/light";
import { ThemeProvider } from "./shared/hooks/use-theme/use-theme";
import Image from "./shared/components/image";
import i18n from "./shared/localization/i18n";
import App from ".";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const rootStore = new RootStore();

const StoreContext = createContext<RootStore>(rootStore);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

export default function Provider () {

  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": LIGHT.assets.RobotoRegular,
    FirstNeueRegular: LIGHT.assets.FirstNeueRegular,
    FirstNeueMedium: LIGHT.assets.FirstNeueMedium,
  });
  const hideSplash = async () => {
    await SplashScreen.hideAsync();
  };

  if (fontsLoaded) {
    hideSplash();
  }
  console.log(fontsLoaded, "fontsLoaded");
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <I18nextProvider i18n={i18n} defaultNS="translation">
          <ThemeProvider>
            <Toaster
              icons={{
                success: <Image width={24} height={24} source={imgSuccess} />,
                warning: <Image width={24} height={24} source={imgWarning} />,
                error: <Image width={24} height={24} source={imgWarning} />,
              }}
              toastOptions={{
                style: {
                  zIndex: 9999,
                  paddingHorizontal: 16,
                },
                toastContainerStyle: {
                  zIndex: 9999,
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                },
                toastContentStyle: {
                  zIndex: 9999,
                  alignItems: "center",
                  justifyContent: "center",
                },
                titleStyle: {
                  color: String(LIGHT.colors.text01),
                  fontSize: 16,
                  lineHeight: 20,
                  fontFamily: "FirstNeueMedium",
                },
                descriptionStyle: {
                  fontSize: 12,
                  lineHeight: 14,
                  color: String(LIGHT.colors.text02),
                  fontFamily: "FirstNeueRegular",
                },
              }}
              style={{
                zIndex: 9999,
                backgroundColor: String(LIGHT.colors.bg02),
                borderRadius: 22,
                width: "100%",
                paddingVertical: 16,
                paddingHorizontal: 41,
              }}
              closeButton
              offset={60}
              position="top-center"
            />
            <StatusBar
              hidden={false}
              backgroundColor="transparent"
              style="auto"
              animated
              translucent
            />
            <NavigationContainer theme={navigationTheme}>
              <App />
            </NavigationContainer>
          </ThemeProvider>
        </I18nextProvider>
        {/*          <DevToolsBubble />*/}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
const navigationTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    border: "rgba(0,0,0,0)",
    text: String(LIGHT.colors.text01),
    background: String(LIGHT.colors.bg01),
    card: String(LIGHT.colors.bg02),
    primary: String(LIGHT.colors.primary),
  },
};
