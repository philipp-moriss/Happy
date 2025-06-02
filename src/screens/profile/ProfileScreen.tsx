import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ProfileStackParamList } from "@/src/router/types";
import HeaderGoBack from "@/src/shared/components/header-go-back/header-go-back";
import { Icon } from "@/src/shared/components/icon";
import useTranslate from "@/src/shared/localization/use-translate";
import { useStore } from "../../provider";
import Typography from "../../shared/components/typography";
import useTheme from "../../shared/hooks/use-theme/use-theme";
import { getUser, saveUser, User } from "@/src/shared/utils/user";
import { Input } from "@/src/shared/components";
import Button from "@/src/shared/components/button";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "ProfileHome"
>;

export const ProfileScreen = observer(() => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { taskStore } = useStore();
  const { colors } = useTheme();
  const { translate } = useTranslate();
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState<string | null>("User");

  const isFocused = useIsFocused();

  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setUser(user);
        setName(user.name);
        setAvatar(user.avatar);
      }
    });
  }, [isFocused]);

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
      setUser({ name: user?.name ?? 'User', avatar: result.assets[0].uri });
      saveUser({ name: user?.name ?? 'User', avatar: result.assets[0].uri });
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
  ];

  const handleSave = () => {
    setIsEdit(false);
    if (!user) return;
    setUser({ name: name ?? 'User', avatar: user.avatar });
    saveUser({ name: name ?? 'User', avatar: user.avatar });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg01 }]}>
      <View style={{ paddingHorizontal: 20 }}>
        <HeaderGoBack showArrowBack={true} withProfile={false} />
        {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
        <View style={{ paddingTop: 120 }}>
          <View style={[styles.header, { backgroundColor: colors.bg02 }]}>
            <TouchableOpacity
              onPress={handleChangeAvatar}
              style={styles.avatarContainer}
            >
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              ) : (
                <Icon
                  name="account-circle"
                  size={70}
                  color={String(colors.green)}
                />
              )}
              <View
                style={[
                  styles.editAvatarButton,
                  { backgroundColor: colors.pink },
                ]}
              >
                <Icon name="camera" size={16} color={String(colors.white)} />
              </View>
            </TouchableOpacity>
            <View style={styles.userInfo}>
              {isEdit ? (
                <View style={{ width: "100%" }}>
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: colors.bg01,
                      borderRadius: 16,
                    }}
                  >
                    <Input
                      value={name ?? ""}
                      onChangeText={setName}
                      placeholder={translate("profile.user")}
                    />
                  </View>
                  <Button style={{ marginTop: 16 }} onPress={handleSave}>
                    Save
                  </Button>
                </View>
              ) : (
                <>
                  <Typography
                    style={StyleSheet.flatten([
                      styles.userName,
                      { color: colors.text01 },
                    ])}
                  >
                    {name}
                  </Typography>

                  <TouchableOpacity onPress={() => setIsEdit(true)}>
                    <Icon name="edit" size={16} color={String(colors.green)} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          <View
            style={[
              styles.statisticsContainer,
              { backgroundColor: colors.bg02 },
            ]}
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
        </View>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  header: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
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
