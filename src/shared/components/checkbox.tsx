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
        {checked && <View style={[styles.checkmark, checked && styles.checkmarkChecked]} />}
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
    width: 30,
    height: 30,
    borderRadius: 50,
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
    width: 16,
    height: 16,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  checkmarkChecked: {
    backgroundColor: '#3B5BDB',
  },
  label: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '500',
  },
}); 