import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextStyle } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { Ionicons } from '@expo/vector-icons';

import Typography from '../../shared/components/typography';
import { useTheme } from '../../shared/hooks/use-theme';
import { useStore } from '../../provider';
import { Task } from '../../entity/task/types';

type RouteParams = {
  task: Task;
};

export const TaskDetailsScreen = observer(() => {
  const navigation = useNavigation();
  const route = useRoute();
  const { taskStore } = useStore();
  const { colors } = useTheme();
  const { task } = route.params as RouteParams;

  const handleToggleStatus = async () => {
    await taskStore.updateTaskStatus(task.id, { completed: !task.completed });
    navigation.goBack();
  };

  const handleDelete = async () => {
    await taskStore.deleteTask(task.id);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { backgroundColor: colors.card }]}>
          <View style={styles.titleContainer}>
            <Typography style={styles.title}>{task.title}</Typography>
            <View style={[styles.statusBadge, { backgroundColor: task.completed ? colors.success : colors.warning }]}>
              <Typography style={styles.statusText}>
                {task.completed ? 'Завершено' : 'В процессе'}
              </Typography>
            </View>
          </View>

          <Typography style={{ ...styles.description, color: colors.text02 }}>
            {task.description}
          </Typography>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={20} color={colors.text02} />
              <Typography style={{ ...styles.metaText, color: colors.text02 }}>
                {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="folder-outline" size={20} color={colors.text02} />
              <Typography style={{ ...styles.metaText, color: colors.text02 }}>
                {task.category}
              </Typography>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={handleToggleStatus}
          >
            <Ionicons
              name={task.completed ? 'close-circle-outline' : 'checkmark-circle-outline'}
              size={24}
              color="#FFFFFF"
            />
            <Typography style={styles.actionButtonText}>
              {task.completed ? 'Отменить выполнение' : 'Отметить как выполненное'}
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.error }]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={24} color="#FFFFFF" />
            <Typography style={styles.actionButtonText}>
              Удалить задачу
            </Typography>
          </TouchableOpacity>
        </View>
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
  header: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  } as TextStyle,
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  } as TextStyle,
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  } as TextStyle,
  metaContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    marginLeft: 4,
  } as TextStyle,
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  } as TextStyle,
}); 