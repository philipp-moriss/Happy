import React from 'react';
import { Switch as RNSwitch, StyleSheet } from 'react-native';
import useTheme from '../../hooks/use-theme/use-theme';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function Switch({ value, onValueChange }: SwitchProps) {
  const colors = useTheme().colors;

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#27282A', true: 'rgba(135, 74, 176, 0.2)' }}
      thumbColor={value ? colors.primary : colors.text01}
    />
  );
} 