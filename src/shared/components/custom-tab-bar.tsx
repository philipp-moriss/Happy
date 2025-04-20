import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, paddingBottom: insets.bottom }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const getIconName = (routeName: string) => {
          switch (routeName) {
            case 'Tasks':
              return isFocused ? 'list' : 'list-outline';
            case 'Statistics':
              return isFocused ? 'stats-chart' : 'stats-chart-outline';
            case 'Profile':
              return isFocused ? 'person' : 'person-outline';
            default:
              return 'list';
          }
        };

        const getLabel = (routeName: string) => {
          switch (routeName) {
            case 'Tasks':
              return t('tabBar.tasks');
            case 'Statistics':
              return t('tabBar.statistics');
            case 'Profile':
              return t('tabBar.profile');
            default:
              return '';
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => navigation.navigate(route.name)}
          >
            <Ionicons
              name={getIconName(route.name)}
              size={24}
              color={isFocused ? colors.primary : colors.text}
            />
            <Text style={[styles.label, { color: isFocused ? colors.primary : colors.text }]}>
              {getLabel(route.name)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
}); 