import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, TextStyle, SafeAreaView, ViewStyle, ScrollView } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useStore } from '../../provider';
import Typography from '../../shared/components/typography';
import useTheme from '../../shared/hooks/use-theme/use-theme';
import { Task } from '../../entity/task/types';
import { FilterTabs, TabItem } from '../../shared/components/filter-tabs';
import { TasksStackParamList } from '@/src/router/types';
import { TaskStore } from '@/src/entity/task/task-store';
import { Checkbox } from '../../shared/components/checkbox';

type NavigationProp = NativeStackNavigationProp<TasksStackParamList, 'TasksList'>;

type FilterType = 'all' | 'active' | 'completed';

interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  addButton: ViewStyle;
  list: ViewStyle;
  taskItem: ViewStyle;
  taskContent: ViewStyle;
  checkbox: ViewStyle;
  taskInfo: ViewStyle;
  taskTitle: TextStyle;
  taskDescription: TextStyle;
  taskDate: TextStyle;
  deleteButton: ViewStyle;
}

const CATEGORIES = [
  {
    key: 'eudaimonic',
    label: 'Eudaimonic',
    color: '#E6EDFF',
    accent: '#3B5BDB',
  },
  {
    key: 'hedonic',
    label: 'Hedonic',
    color: '#FFE6F0',
    accent: '#E64980',
  },
  {
    key: 'psychological',
    label: 'Psychological',
    color: '#E6FFF3',
    accent: '#20C997',
  },
] as const;
type CategoryKey = typeof CATEGORIES[number]['key'];

function groupTasksByCategory(tasks: Task[]) {
  return {
    eudaimonic: tasks.filter(t => t.category === 'eudaimonic'),
    hedonic: tasks.filter(t => t.category === 'hedonic'),
    psychological: tasks.filter(t => t.category === 'psychological'),
  };
}

export const TasksScreen = observer(() => {
  const navigation = useNavigation<NavigationProp>();
  const { taskStore } = useStore();
  const colors = useTheme().colors;
  const [filter, setFilter] = useState<FilterType>('all');
  const { t } = useTranslation();

  const isFocused = useIsFocused();

  useEffect(() => {
    taskStore.fetchTasks();
  }, [isFocused]);

  const handleToggleStatus = async (id: string, completed: boolean) => {
    await taskStore.updateTaskStatus(id, { completed: !completed });
    taskStore.fetchTasks();
  };

  const grouped = groupTasksByCategory(taskStore.tasks);

  function handleAddTaskToCategory(category: CategoryKey) {
    taskStore.setSelectedType(category);
    navigation.navigate('TaskForm');
  }

  function handleRandomTask(category: CategoryKey) {
    const randomTitles: Record<CategoryKey, string> = {
      eudaimonic: 'Learn a new skill',
      hedonic: 'Watch favorite movie',
      psychological: 'Meditation session',
    };
    taskStore.createTask({
      title: randomTitles[category],
      description: '',
      amount: 1,
      showProgress: false,
      startDate: new Date().toISOString(),
      isEndless: false,
      category,
    });
  }

  const handleDeleteTask = async (id: string) => {
    await taskStore.deleteTask(id);
  };

  function renderTaskItem(item: Task) {
    return (
      <View style={styles.taskRow}>
        <Checkbox
          checked={item.completed}
          onPress={() => handleToggleStatus(item.id, item.completed)}
          label={item.title}
        />
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Ionicons name="trash-outline" size={20} color={colors.red} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderCategoryCard(category: typeof CATEGORIES[number]) {
    const tasks = grouped[category.key as CategoryKey];
    return (
      <View
        key={category.key}
        style={[
          styles.categoryCard,
          { backgroundColor: category.color, shadowColor: category.accent },
        ]}
      >
        <View style={styles.categoryHeader}>
          <Typography style={StyleSheet.flatten([styles.categoryTitle, { color: category.accent }])}> 
            {category.label}
          </Typography>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              style={[styles.circleButton, { backgroundColor: category.accent }]}
              onPress={() => handleRandomTask(category.key as CategoryKey)}
              accessibilityLabel={`Add random task to ${category.label}`}
            >
              <Ionicons name="sparkles-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.circleButton, { backgroundColor: category.accent }]}
              onPress={() => handleAddTaskToCategory(category.key as CategoryKey)}
              accessibilityLabel={`Add task to ${category.label}`}
            >
              <Ionicons name="add" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        {tasks && tasks.length === 0 ? (
          <Typography style={styles.emptyText}>No tasks yet</Typography>
        ) : (
          tasks?.map((task: Task) => renderTaskItem(task))
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg01 }]}>
      <View style={styles.container}>
        <Typography style={StyleSheet.flatten(styles.title)}>
          Task Tracker
        </Typography>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
          {CATEGORIES.map(renderCategoryCard)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 12 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  categoryCard: {
    borderRadius: 18,
    marginBottom: 18,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  circleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  taskRow: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 8,
  },
}); 