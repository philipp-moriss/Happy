import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import useTheme from "../hooks/use-theme/use-theme";

type ITextInputProps = TextInputProps & {
  label: string;
  value: string | number;
  onChangeText?: (text: string) => void;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  secureTextEntry?: boolean;
  maxLength?: number;
  isDisabled?: boolean;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  customInputContainerStyles?: object;
};

const TextInputs: React.FC<ITextInputProps> = ({
  label,
  value = "",
  onChangeText,
  error,
  keyboardType = "default",
  secureTextEntry = false,
  maxLength = 100,
  placeholder = "",
  isDisabled,
  rightIcon,
  onPress,
  customInputContainerStyles,
  ...rest
}) => {
  const ref = useRef<TextInput>(null);
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(!!value);

  useEffect(() => {
    if (value) {
      setIsPressed(true);
    } else {
      setIsPressed(false);
    }
  }, [value]);

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      fontSize: isPressed ? 12 : 16,
      position: "absolute",
      color: error ? colors.supportRed : colors.text05,
      transform: [
        {
          translateY: withTiming(isPressed ? -19 : 0, {
            duration: 200,
          }),
        },
      ],
    };
  });

  const handleFocus = () => {
    setIsFocused(true);
    setIsPressed(true);
    onPress?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      setIsPressed(false);
    }
  };

  const handlePress = () => {
    ref.current?.focus();
  };

  return (
    <View style={styles.mainContainer}>
      <Pressable
        onPress={handlePress}
        style={[
          styles.container,
          isFocused && styles.containerActive,
          isDisabled && styles.isDisabled,
          error && styles.isError,
          (isFocused || isPressed) && { paddingTop: 13 },
          customInputContainerStyles,
        ]}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Animated.Text
            onPress={handlePress}
            style={[styles.label, animatedLabelStyle]}
          >
            {label}
          </Animated.Text>
          <TextInput
            ref={ref}
            editable={!isDisabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value?.toString() || ""}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            placeholder={isPressed ? placeholder : ""}
            placeholderTextColor="#8B97A1"
            style={[
              styles.input,
              error && styles.isErrorText,
              isPressed && styles.inputCentered,
            ]}
            cursorColor="orange"
            {...rest}
          />
        </View>
        {rightIcon && rightIcon}
      </Pressable>
      {error && (
        <Text style={[styles.isErrorText, { textAlign: "left" }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  container: {
    borderWidth: 1,
    height: 54,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#EFEFEF",
    borderRadius: 16,
  },
  containerActive: {
    borderColor: "#888",
  },
  isError: {
    borderColor: "red",
  },
  isErrorText: {
    color: "red",
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    color: "#8B97A1",
  },
  input: {
    fontSize: 16,
    flex: 1,
    color: "#000",
  },
  inputCentered: {
    // textAlign: "center",
  },
  isDisabled: {
    opacity: 0.5,
  },
});

export default TextInputs;
