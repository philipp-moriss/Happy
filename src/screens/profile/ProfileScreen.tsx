import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  TextStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Typography from "../../shared/components/typography";
import useTheme from "../../shared/hooks/use-theme/use-theme";
import { useStore } from "../../provider";
import Button from "../../shared/components/button";
import useTranslate from "@/src/shared/localization/use-translate";
import { ProfileStackParamList } from "@/src/router/types";
import { ArrowBackIIcon } from "@/src/shared/icons/icons/arrow-back-i";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "ProfileHome"
>;

export const ProfileScreen = observer(() => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { taskStore } = useStore();
  const { colors } = useTheme();
  const { translate } = useTranslate();
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleLogout = () => {
    Alert.alert(
      translate("profile.logoutConfirm.title"),
      translate("profile.logoutConfirm.message"),
      [
        {
          text: translate("profile.logoutConfirm.cancel"),
          style: "cancel",
        },
        {
          text: translate("profile.logoutConfirm.confirm"),
          style: "destructive",
          onPress: () => {
            // TODO: Implement logout logic
          },
        },
      ]
    );
  };

  const handleChangeAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        translate("profile.avatar.error"),
        translate("profile.avatar.permission")
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      // TODO: Upload avatar to server
    }
  };

  const renderMenuItem = (icon: string, title: string, onPress: () => void) => (
    <TouchableOpacity
      key={title}
      style={[styles.menuItem, { backgroundColor: colors.bg02 }]}
      onPress={onPress}
    >
      <Typography
        style={StyleSheet.flatten([
          styles.menuItemText,
          { color: colors.text01 },
        ])}
      >
        {title}
      </Typography>
    </TouchableOpacity>
  );

  const renderStatItem = (value: number, label: string) => (
    <View style={[styles.statisticsItem, { backgroundColor: colors.bg02 }]}>
      <Typography
        style={StyleSheet.flatten([
          styles.statisticsValue,
          { color: colors.text01 },
        ])}
      >
        {value}
      </Typography>
      <Typography
        style={StyleSheet.flatten([styles.statLabel, { color: colors.text02 }])}
      >
        {label}
      </Typography>
    </View>
  );

  const menuItems = [
    {
      id: "settings",
      title: translate("profile.menu.settings"),
      onPress: () => navigation.navigate("Settings"),
      icon: "settings",
    },
    {
      id: "notifications",
      title: translate("profile.menu.notifications"),
      onPress: () => {
        // TODO: Implement notifications logic
      },
      icon: "notifications",
    },
    {
      id: "help",
      title: translate("profile.menu.help"),
      onPress: () => {
        // TODO: Implement help logic
      },
      icon: "help-circle",
    },
    {
      id: "about",
      title: translate("profile.menu.about"),
      onPress: () => {
        // TODO: Implement about logic
      },
      icon: "information-circle",
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg01 }]}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <ArrowBackIIcon />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { backgroundColor: colors.bg02 }]}>
          <TouchableOpacity
            onPress={handleChangeAvatar}
            style={styles.avatarContainer}
          >
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <Ionicons name="person" size={48} color={colors.primary} />
            )}
            <View
              style={[
                styles.editAvatarButton,
                { backgroundColor: colors.primary },
              ]}
            >
              <Ionicons name="camera" size={16} color={colors.white} />
            </View>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Typography
              style={StyleSheet.flatten([
                styles.userName,
                { color: colors.text01 },
              ])}
            >
              {translate("profile.user")}
            </Typography>
            <Typography
              style={StyleSheet.flatten([
                styles.userEmail,
                { color: colors.text02 },
              ])}
            >
              ivan@example.com
            </Typography>
          </View>
        </View>

        <View
          style={[styles.statisticsContainer, { backgroundColor: colors.bg02 }]}
        >
          {renderStatItem(
            taskStore.tasks.length,
            translate("profile.stats.total")
          )}
          {renderStatItem(
            taskStore.completedTasks.length,
            translate("profile.stats.completed")
          )}
          {renderStatItem(
            taskStore.activeTasks.length,
            translate("profile.stats.inProgress")
          )}
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) =>
            renderMenuItem(item.icon, item.title, item.onPress)
          )}
        </View>

        <Button
          color="danger"
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          {translate("profile.logout")}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    padding: 20,
    borderRadius: 10,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
  },
  statisticsContainer: {
    marginBottom: 30,
    flexDirection: "row",
    borderRadius: 10,
  },
  statisticsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statisticsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statisticsItem: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  statisticsValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
  },
  menuContainer: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    marginTop: "auto",
  },
});
