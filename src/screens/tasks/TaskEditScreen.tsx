import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Ionicons } from '@expo/vector-icons';

import Typography from '../../shared/components/typography';
import useTheme from "@/src/shared/hooks/use-theme/use-theme";
import { useStore } from '../../provider';
import { TextArea } from '../../shared/components/textarea';
import { DatePicker } from '../../shared/components/date-picker';
import { Task } from '../../entity/task/types';

type RouteParams = {
  task: Task;
};

export const TaskEditScreen = observer(() => {
  const navigation = useNavigation();
  const route = useRoute();
  const { taskStore } = useStore();
  const { colors } = useTheme();
  const { task } = route.params as RouteParams;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(new Date(task.dueDate));
  const [category, setCategory] = useState(task.category);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await taskStore.updateTask(task.id, {
      title: title.trim(),
      description: description.trim(),
      dueDate,
      category: category.trim(),
    });

    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg01 }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.formContainer, { backgroundColor: colors.bg02 }]}>
          <View style={styles.inputGroup}>
            <Typography style={styles.label}>Название</Typography>
            <TextArea
              value={title}
              onChangeText={setTitle}
              placeholder="Введите название задачи"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Typography style={styles.label}>Описание</Typography>
            <TextArea
              value={description}
              onChangeText={setDescription}
              placeholder="Введите описание задачи"
              multiline
              numberOfLines={4}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Typography style={styles.label}>Категория</Typography>
            <TextArea
              value={category}
              onChangeText={setCategory}
              placeholder="Введите категорию"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Typography style={styles.label}>Срок выполнения</Typography>
            <DatePicker
              value={dueDate}
              onChange={setDueDate}
              style={styles.input}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
        >
          <Typography style={styles.submitButtonText}>
            Сохранить изменения
          </Typography>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  formContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    width: '100%',
  },
  submitButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 