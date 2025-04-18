import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import Typography from '../../shared/components/typography';
import { useStore } from '../../provider';
import { TextArea } from '../../shared/components/textarea';
import { Switch } from '../../shared/components/switch';
import { CategoryChips } from '../../shared/components/category-chips';
import useTheme from '../../shared/hooks/use-theme/use-theme';

export const TaskFormScreen = observer(() => {
  const navigation = useNavigation();
  const { taskStore } = useStore();
  const theme = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [showProgress, setShowProgress] = useState(true);
  const [endDate, setEndDate] = useState(new Date());
  const [isEndless, setIsEndless] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await taskStore.createTask({
      title: title.trim(),
      description: description.trim(),
      amount: parseFloat(amount) || 0,
      category: category.trim(),
      showProgress,
      startDate: new Date().toISOString(),
      endDate: isEndless ? null : endDate.toISOString(),
      isEndless,
    });

    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.bg01 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text01} />
        </TouchableOpacity>
        <Typography style={StyleSheet.flatten([styles.title, { color: theme.colors.text01 }]) as TextStyle}>
          Редактирование цели
        </Typography>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Typography style={StyleSheet.flatten([styles.label, { color: theme.colors.text02 }]) as TextStyle}>
              Название
            </Typography>
            <TextArea
              value={title}
              onChangeText={setTitle}
              placeholder="Благотворительность"
              style={[styles.input, { backgroundColor: theme.colors.bg02 }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <Typography style={StyleSheet.flatten([styles.label, { color: theme.colors.text02 }]) as TextStyle}>
              Описание
            </Typography>
            <TextArea
              value={description}
              onChangeText={setDescription}
              placeholder='В приют кошек и собак "Добродел"'
              multiline
              numberOfLines={4}
              style={[styles.input, { backgroundColor: theme.colors.bg02 }]}
            />
          </View>

          <View style={styles.inputGroup}>
            <Typography style={StyleSheet.flatten([styles.label, { color: theme.colors.text02 }]) as TextStyle}>
              Категория
            </Typography>
            <CategoryChips
              selectedCategory={category}
              onSelectCategory={setCategory}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleSubmit}
        >
          <Typography style={styles.submitButtonText}>
            Добавить
          </Typography>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cancelButton, { borderColor: theme.colors.text01 }]}
          onPress={handleCancel}
        >
          <Typography style={StyleSheet.flatten([styles.cancelButtonText, { color: theme.colors.text01 }]) as TextStyle}>
            Отмена
          </Typography>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 24,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 20,
    gap: 16,
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '400',
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 16,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '400',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '400',
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  footer: {
    padding: 20,
    gap: 16,
  },
  submitButton: {
    padding: 16,
    borderRadius: 60,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 60,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '400',
  },
}); 