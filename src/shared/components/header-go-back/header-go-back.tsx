import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle } from "react-native";
import { ArrowBackIIcon } from "@/src/shared/icons/icons/arrow-back-i";
import Typography from "@/src/shared/components/typography";
import useTheme from "../../hooks/use-theme/use-theme";
import { Icon } from "../icon";
import { getUser, User } from "../../utils/user";
import Image from "../image";
// import useTranslate from "@/src/shared/localization/use-translate"; // isRTL не используется, закомментировано

interface IProps {
  goBack?: () => void;
  showArrowBack?: boolean;
  title?: string;
  colorText?: string;
  colorIco?: string;
  withProfile?: boolean;
  treeChildren?: React.ReactNode;
}

// Компонент HeaderGoBack с поддержкой кастомных цветов и children
const HeaderGoBack = ({
  goBack,
  title,
  treeChildren,
  colorText,
  colorIco = "black",
  showArrowBack = false,
  withProfile = true,
}: IProps) => {
  const nav = useNavigation();
  const { colors } = useTheme();
  // const {isRTL} = useTranslate(); // isRTL не используется, убрано

  const [user, setUser] = useState<User | null>(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [isFocused]);

  const handleProfilePress = () => {
    // @ts-ignore
    nav.navigate("Profile", { screen: "ProfileHome" });
  };

  return (
    <View style={styles.container}>
      {/* Левая зона: кнопка назад */}
      <View style={styles.side}>
        {showArrowBack && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={goBack ?? nav.goBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowBackIIcon
              style={{ transform: [{ rotate: false ? "0deg" : "180deg" }] }} // если нужен RTL, раскомментировать
              color={colorIco}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Заголовок по центру */}
      {title && (
        <View style={styles.titleWrapper}>
          <Typography color={colorText ?? colors.text01} style={styles.title}>
            {title}
          </Typography>
        </View>
      )}

      {withProfile ? (
        <View>
          <TouchableOpacity onPress={handleProfilePress}>
            {
              user?.avatar ? (
                <Image source={{ uri: user.avatar }} radius={50} style={{ width: 40, height: 40 }} />
              ) : (
                <Icon
                  name="account-circle"
                  size={40}
                  color={String(colors.green)}
                />
              )
            }
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.side}>{treeChildren}</View>
      )}
    </View>
  );
};

// Стили вынесены в StyleSheet для лаконичности
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  } as ViewStyle,
  side: {
    // width: 50,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  iconButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  titleWrapper: {
    // height: 70,
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HeaderGoBack;
