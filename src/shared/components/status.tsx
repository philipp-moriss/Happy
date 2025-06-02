import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "./typography";
import { ITextProps } from "../hooks/use-theme/types/components";
import useTheme from "../hooks/use-theme/use-theme";
import { ColorValue } from "react-native";
import useTranslate from "../localization/use-translate";

type StatusType = "success" | "pending" | "error" | "idle";

interface StatusTextProps extends ITextProps {
  type: StatusType;
}

export const StatusText: React.FC<StatusTextProps> = ({ type, ...rest }) => {
  const { colors } = useTheme();
  const statusColor: Record<StatusType, ColorValue> = {
    success: colors.green,
    idle: colors.pink,
    pending: colors.yellow,
    error: colors.red,
  };

  const statusBgColor: Record<StatusType, ColorValue> = {
    success: "#E8F5E9",
    pending: "#FFF3E0",
    error: "#FFEBEE",
    idle: "#FFE3E3",
  };

  const { translate } = useTranslate();
  return (
    <View style={[styles.container, { backgroundColor: statusBgColor[type] }]}>
      <Typography regular14 color={statusColor[type]} {...rest}>
        {translate(`status.${type}`)}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
});
