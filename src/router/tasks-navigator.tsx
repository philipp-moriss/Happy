import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TasksStackParamList } from './types';
import { TasksScreen } from '../screens/tasks/TasksScreen';
import { TaskFormScreen } from '../screens/tasks/TaskFormScreen';
import { TaskDetailsScreen } from '../screens/tasks/TaskDetailsScreen';
import { TaskEditScreen } from '../screens/tasks/TaskEditScreen';

const Stack = createNativeStackNavigator<TasksStackParamList>();

export function TasksNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TasksList" component={TasksScreen} />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} />
      <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      <Stack.Screen name="TaskEdit" component={TaskEditScreen} />
    </Stack.Navigator>
  );
} 