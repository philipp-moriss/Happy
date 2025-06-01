import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, CreateTaskDTO, UpdateTaskDTO, UpdateTaskStatusDTO } from './types';

const TASKS_STORAGE_KEY = '@tasks';

// Тестовые данные для отладки
const MOCK_TASKS: Task[] = [
];

export class TaskApi {
  async fetchTasks(): Promise<Task[]> {
    try {
      // await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify([]));
      const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      
      // Если данных нет, используем тестовые данные
      if (!tasksJson) {
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(MOCK_TASKS));
        return MOCK_TASKS;
      }
      
      const tasks = JSON.parse(tasksJson);
      return tasks.map((task: Task) => ({
        ...task,
        endDate: task.endDate ? new Date(task.endDate) : null,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      // В случае ошибки возвращаем тестовые данные
      return MOCK_TASKS;
    }
  }

  async createTask(data: CreateTaskDTO): Promise<Task> {
    try {
      const tasks = await this.fetchTasks();
      const newTask: Task = {
        id: Date.now().toString(),
        ...data,
        completed: false,
        endDate: data.endDate ? new Date(data.endDate) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify([...tasks, newTask]));
      return newTask;
    } catch (error) {
      console.error('Failed to create task:', error);
      throw new Error('Failed to create task');
    }
  }

  async updateTask(id: string, data: UpdateTaskDTO): Promise<Task> {
    try {
      const tasks = await this.fetchTasks();
      const taskIndex = tasks.findIndex(task => task.id === id);
      
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }

      const updatedTask = {
        ...tasks[taskIndex],
        ...data,
        updatedAt: new Date(),
      };

      tasks[taskIndex] = updatedTask;
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      
      return updatedTask;
    } catch (error) {
      console.error('Failed to update task:', error);
      throw new Error('Failed to update task');
    }
  }

  async updateTaskStatus(id: string, data: UpdateTaskStatusDTO): Promise<Task> {
    try {
      const tasks = await this.fetchTasks();
      const taskIndex = tasks.findIndex(task => task.id === id);
      
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }

      const updatedTask = {
        ...tasks[taskIndex],
        ...data,
        updatedAt: new Date(),
      };

      tasks[taskIndex] = updatedTask;
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      
      return updatedTask;
    } catch (error) {
      console.error('Failed to update task status:', error);
      throw new Error('Failed to update task status');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const tasks = await this.fetchTasks();
      const filteredTasks = tasks.filter(task => task.id !== id);
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(filteredTasks));
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw new Error('Failed to delete task');
    }
  }
} 