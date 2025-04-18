import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Typography from './typography';
import useTheme from '../hooks/use-theme/use-theme';

export interface TabItem {
  key: string;
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface FilterTabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  style?: ViewStyle;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  items,
  activeKey,
  onChange,
  style,
}) => {
  const colors = useTheme().colors;

  const renderTab = (item: TabItem) => {
    const isActive = item.key === activeKey;

    return (
      <TouchableOpacity
        key={item.key}
        style={[
          styles.tabButton,
          { backgroundColor: isActive ? colors.primary : colors.bg02 }
        ]}
        onPress={() => onChange(item.key)}
      >
        {item.icon && (
          <Ionicons 
            name={item.icon} 
            size={16} 
            color={isActive ? colors.white : colors.text02}
            style={styles.tabIcon}
          />
        )}
        <Typography 
          style={[
            styles.tabText,
            { color: isActive ? colors.white : colors.text02 }
          ]}
        >
          {item.title}
        </Typography>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {items.map(renderTab)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  tabIcon: {
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 