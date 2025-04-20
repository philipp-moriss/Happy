// src/shared/components/tab-bar.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle, useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { LIGHT } from '../hooks/use-theme/light';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from "./typography";
import { Icon } from "./icon";

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 3;
const TAB_HEIGHT = 60;

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const translateX = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withSpring(state.index * TAB_WIDTH);
  }, [state.index]);

  const renderIcon = React.useCallback((routeName: string, isFocused: boolean) => {
    const iconProps = {
      size: 24,
      color: isFocused ? String(LIGHT.colors.primary) : String(LIGHT.colors.text02)
    };

    const iconName = React.useMemo(() => {
      switch (routeName) {
        case 'Tasks':
          return 'task-alt';
        case 'Statistics':
          return 'bar-chart';
        case 'Profile':
          return 'person';
        default:
          return 'help-outline';
      }
    }, [routeName]);

    return <Icon name={iconName} {...iconProps} />;
  }, []);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  const containerHeight = TAB_HEIGHT + insets.bottom;

  return (
    <View style={[styles.wrapper, { height: containerHeight }]}>
      <BlurView intensity={25} style={styles.container}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key as string];
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
              style={styles.tab}
            >
              <View style={styles.iconContainer}>
                {renderIcon(route.name, isFocused)}
              </View>
              <Typography
                style={[
                  styles.label,
                  { color: isFocused ? LIGHT.colors.primary : LIGHT.colors.text02 }
                ]}
              >
                {options.tabBarLabel}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_HEIGHT,
  },
  iconContainer: {
    marginBottom: 4,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: TAB_WIDTH,
    height: 3,
    backgroundColor: String(LIGHT.colors.primary),
    borderRadius: 1.5,
  },
  label: {
    fontSize: 12,
    fontFamily: 'FirstNeueRegular',
  }
});