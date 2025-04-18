import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typography from './typography';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  style?: any;
}

export function Checkbox({ checked, onPress, label, style }: CheckboxProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <View style={styles.checkmark} />}
      </View>
      {label && (
        <Typography regular14 style={styles.label}>
          {label}
        </Typography>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#EFEFEF',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    borderColor: '#FFB800',
    backgroundColor: '#FFB800',
  },
  checkmark: {
    width: 14,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  label: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '500',
  },
}); 