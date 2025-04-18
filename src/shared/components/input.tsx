import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Typography from './typography';

interface InputProps extends TextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  isDisabled?: boolean;
}

export function Input({
  label = '',
  value,
  onChangeText,
  error,
  placeholder,
  isDisabled,
  style,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      {label && (
        <Typography text14 style={styles.label}>
          {label}
        </Typography>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={!isDisabled}
        style={[
          styles.input,
          error && styles.inputError,
          isDisabled && styles.inputDisabled,
          style,
        ]}
        {...rest}
      />
      {error && (
        <Typography text14 style={styles.error}>
          {error}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#000000',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  inputDisabled: {
    opacity: 0.5,
  },
  error: {
    color: '#FF3B30',
    marginTop: 8,
  },
}); 