import { makeAutoObservable } from 'mobx';
import { Task, CreateTaskDTO, UpdateTaskStatusDTO, TaskFilters } from './types';
import { TaskApi } from './task-api';

export class TaskModel {
  tasks: Task[] = [];
  isLoading = false;
  error: string | null = null;
  filters: TaskFilters = {
    category: undefined,
    completed: undefined,
    search: '',
  };

  private api: TaskApi;

  constructor() {
    makeAutoObservable(this);
    this.api = new TaskApi();
  }

  setFilters(filters: Partial<TaskFilters>) {
    this.filters = { ...this.filters, ...filters };
  }

  async fetchTasks() {
    this.isLoading = true;
    this.error = null;
    try {
      this.tasks = await this.api.fetchTasks();
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to fetch tasks';
    } finally {
      this.isLoading = false;
    }
  }

  async createTask(data: CreateTaskDTO) {
    this.isLoading = true;
    this.error = null;
    try {
      const task = await this.api.createTask(data);
      this.tasks.push(task);
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to create task';
    } finally {
      this.isLoading = false;
    }
  }

  async updateTaskStatus(id: string, data: UpdateTaskStatusDTO) {
    this.isLoading = true;
    this.error = null;
    try {
      const updatedTask = await this.api.updateTaskStatus(id, data);
      const index = this.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to update task status';
    } finally {
      this.isLoading = false;
    }
  }

  async deleteTask(id: string) {
    this.isLoading = true;
    this.error = null;
    try {
      await this.api.deleteTask(id);
      this.tasks = this.tasks.filter(task => task.id !== id);
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Failed to delete task';
    } finally {
      this.isLoading = false;
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