import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, TextStyle, SafeAreaView, ViewStyle } from 'react-native';
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

export const TasksScreen = observer(() => {
  const navigation = useNavigation<NavigationProp>();
  const { taskStore } = useStore();
  const colors = useTheme().colors;
  const [filter, setFilter] = useState<FilterType>('all');
  const { t } = useTranslation();

  const isFocused = useIsFocused();
  const filterTabs: TabItem[] = [
    { key: 'all', title: t('tasks.filters.all'), icon: 'apps-outline' },
    { key: 'active', title: t('tasks.filters.active'), icon: 'time-outline' },
    { key: 'completed', title: t('tasks.filters.completed'), icon: 'checkmark-circle-outline' },
  ];

  useEffect(() => {
    taskStore.fetchTasks();
  }, [isFocused]);

  const handleAddTask = () => {
    navigation.navigate('TaskForm');
  };

  const handleToggleStatus = async (id: string, completed: boolean) => {
    await taskStore.updateTaskStatus(id, { completed: !completed });
    taskStore.fetchTasks();
  };

  const handleDeleteTask = async (id: string) => {
    await taskStore.deleteTask(id);
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return taskStore.activeTasks;
      case 'completed':
        return taskStore.completedTasks;
      default:
        return taskStore.tasks;
    }
  };

  const renderTaskItem = ({ item }: { item: Task }) => {
    const titleStyle = StyleSheet.flatten([
      styles.taskTitle,
      item.completed && { textDecorationLine: 'line-through', color: colors.text02 }
    ]) as TextStyle;

    const descriptionStyle = StyleSheet.flatten([
      styles.taskDescription,
      { color: colors.text02 }
    ]) as TextStyle;

    const dateStyle = StyleSheet.flatten([
      styles.taskDate,
      { color: colors.text02 }
    ]) as TextStyle;

    return (
      <View style={[styles.taskItem, { backgroundColor: colors.bg02 }]}>
        <TouchableOpacity
          style={styles.taskContent}
          onPress={() => handleToggleStatus(item.id, item.completed)}
        >
          <View style={[styles.checkbox, { 
            borderColor: item.completed ? colors.primary : colors.bg03,
            backgroundColor: item.completed ? colors.primary : 'transparent'
          }]}>
            {item.completed && (
              <Ionicons name="checkmark" size={20} color={colors.white} />
            )}
          </View>
          <View style={styles.taskInfo}>
            <Typography style={titleStyle}>
              {item.title}
            </Typography>
            <Typography style={descriptionStyle} numberOfLines={2}>
              {item.description}
            </Typography>
            <View style={{ flexDirection: 'row', gap: 4 }}>
            <Typography style={dateStyle}>
              {item.category ? item.category : t('tasks.noCategory')}
            </Typography>
            <Typography style={dateStyle}>
              {item.endDate ? new Date(item.endDate).toLocaleDateString() : t('tasks.noEndDate')}
            </Typography>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTask(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color={colors.red} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg01 }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Typography style={StyleSheet.flatten(styles.title)}>
            {t('tasks.title')}
          </Typography>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={handleAddTask}
          >
            <Ionicons name="add" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <FilterTabs
          items={filterTabs}
          activeKey={filter}
          onChange={(key: string) => setFilter(key as FilterType)}
        />

        <FlatList
          style={styles.list}
          contentContainerStyle={{ gap: 12 }}
          data={getFilteredTasks()}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create<Styles>({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    gap: 12,
  },
  taskItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  taskDate: {
    fontSize: 12,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
}); 