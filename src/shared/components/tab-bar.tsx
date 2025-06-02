// src/shared/components/tab-bar.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LIGHT } from '../hooks/use-theme/light';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from "./typography";
import { Icon } from "./icon";

const { width } = Dimensions.get('window');
const TAB_HEIGHT = 60;

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();

  const renderIcon = React.useCallback((routeName: string, isFocused: boolean) => {
    const iconProps = {
      size: 24,
      color: isFocused ? String(LIGHT.colors.green) : '#B0B0B0',
    };

    const iconName = React.useMemo(() => {
      switch (routeName) {
        case 'Tasks':
          return 'task-alt';
        case 'Statistics':
          return 'bar-chart';
        case 'Profile':
          return 'person';
        case 'AiInsight':
          return 'info-outline';
        default:
          return 'help-outline';
      }
    }, [routeName]);

    return <Icon name={iconName} {...iconProps} />;
  }, []);

  const containerHeight = TAB_HEIGHT + insets.bottom;

  return (
    <View style={[styles.wrapper, { height: containerHeight }]}>
      <View style={styles.container}>
        {state.routes.map((route: any, index: number) => {
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
                style={StyleSheet.flatten([
                  styles.label,
                  { color: isFocused ? LIGHT.colors.green : '#B0B0B0', fontWeight: isFocused ? '700' : '400' }
                ])}
              >
                {options.tabBarLabel}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_HEIGHT,
  },
  iconContainer: {
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    fontFamily: 'FirstNeueRegular',
  }
});