import { makeAutoObservable, runInAction } from 'mobx';
import { Task, CreateTaskDTO, UpdateTaskDTO, UpdateTaskStatusDTO, TaskFilters } from './types';
import { TaskApi } from './task-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_COMPLETED_KEY = '@onboarding_completed';

export class TaskStore {
  tasks: Task[] = [];
  isLoading = false;
  error: string | null = null;
  filters: TaskFilters = {};
  selectedType: string | null = null;
  isOnboardingCompleted: boolean = false;

  private api: TaskApi;

  constructor() {
    makeAutoObservable(this);
    this.api = new TaskApi();
    this.loadOnboardingStatus();
  }

  private async loadOnboardingStatus() {
    try {
      const status = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
      this.isOnboardingCompleted = status === 'true';
    } catch (error) {
      console.error('Failed to load onboarding status:', error);
    }
  }

  async completeOnboarding() {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      this.isOnboardingCompleted = true;
    } catch (error) {
      console.error('Failed to save onboarding status:', error);
    }
  }

  setSelectedType(type: string) {
    this.selectedType = type;
  }

  setFilters(filters: TaskFilters) {
    this.filters = filters;
  }

  async fetchTasks() {
    this.isLoading = true;
    this.error = null;
    try {
      const tasks = await this.api.fetchTasks();
      runInAction(() => {
        this.tasks = tasks;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to fetch tasks';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async createTask(data: CreateTaskDTO) {
    this.isLoading = true;
    this.error = null;
    try {
      const task = await this.api.createTask(data);
      runInAction(() => {
        this.tasks.push(task);
      });
      return task;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to create task';
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async updateTask(id: string, data: UpdateTaskDTO) {
    this.isLoading = true;
    this.error = null;
    try {
      const updatedTask = await this.api.updateTask(id, data);
      runInAction(() => {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      });
      return updatedTask;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to update task';
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async updateTaskStatus(id: string, data: UpdateTaskStatusDTO) {
    this.isLoading = true;
    this.error = null;
    try {
      const updatedTask = await this.api.updateTaskStatus(id, data);
      runInAction(() => {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      });
      return updatedTask;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to update task status';
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async deleteTask(id: string) {
    this.isLoading = true;
    this.error = null;
    try {
      await this.api.deleteTask(id);
      runInAction(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to delete task';
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  get filteredTasks() {
    return this.tasks.filter(task => {
      if (this.filters.category && task.category !== this.filters.category) {
        return false;
      }
      if (this.filters.completed !== undefined && task.completed !== this.filters.completed) {
        return false;
      }
      if (this.filters.search) {
        const searchLower = this.filters.search.toLowerCase();
        return (
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }

  get completedTasks() {
    return this.tasks.filter(task => task.completed);
  }

  get activeTasks() {
    return this.tasks.filter(task => !task.completed);
  }

  get tasksByCategory() {
    return this.tasks.reduce((acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = [];
      }
      acc[task.category].push(task);
      return acc;
    }, {} as Record<string, Task[]>);
  }
} 