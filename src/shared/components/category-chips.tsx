import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextStyle } from 'react-native';
import Typography from './typography';
import useTheme from '../hooks/use-theme/use-theme';
import useTranslate from '../localization/use-translate';
import { Category } from '@/src/entity/task/types';

const CATEGORIES: Category[] = [
  'hedonic',
  'eudaimonic',
  'psychological',
];

interface CategoryChipsProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const theme = useTheme();
  const { translate } = useTranslate();

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.chip,
            { 
              backgroundColor: selectedCategory === category 
                ? theme.colors.primary 
                : theme.colors.bg02 
            }
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Typography 
            style={StyleSheet.flatten([
              styles.chipText,
              { 
                color: selectedCategory === category 
                  ? theme.colors.white 
                  : theme.colors.text01 
              }
            ]) as TextStyle}
          >
            {translate(`categories.${category}` as const)}
          </Typography>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    fontSize: 14,
  },
}); 