import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Typography from "../../shared/components/typography";
import useTheme from "../../shared/hooks/use-theme/use-theme";
import useTranslate from "@/src/shared/localization/use-translate";
import { ChangeLanguage } from "@/src/shared/actions/change-language";

export const SettingsScreen = () => {
  const { colors } = useTheme();
  const { translate } = useTranslate();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg01 }]}>
      <View style={styles.content}>
        <Typography
          style={StyleSheet.flatten([styles.title, { color: colors.text01 }])}
        >
          {translate("settings.title")}
        </Typography>

        <View style={styles.menuContainer}>
          <ChangeLanguage />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
});
