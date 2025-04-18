import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface IconProps {
  name: string;
  size: number;
  color: string;
}

export function Icon({ name, size, color }: IconProps) {
  return <MaterialIcons name={name as any} size={size} color={color} />;
} 