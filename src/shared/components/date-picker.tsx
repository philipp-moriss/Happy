import React, { useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Typography from './typography';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
  error?: string;
  isDisabled?: boolean;
  style?: any;
}

export function DatePicker({
  value,
  onChange,
  label,
  error,
  isDisabled,
  style,
}: DatePickerProps) {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Typography regular14 style={styles.label}>
          {label}
        </Typography>
      )}
      <TouchableOpacity
        onPress={() => !isDisabled && setShow(true)}
        style={[
          styles.input,
          error && styles.inputError,
          isDisabled && styles.inputDisabled,
        ]}
      >
        <Typography regular14>
          {value.toLocaleDateString()}
        </Typography>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
        />
      )}
      {error && (
        <Typography regular14 style={styles.error}>
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
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    padding: 16,
    minHeight: 56,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  inputDisabled: {
    opacity: 0.5,
    backgroundColor: '#F5F5F5',
  },
  error: {
    color: '#FF6B6B',
    marginTop: 4,
    fontSize: 12,
  },
}); 