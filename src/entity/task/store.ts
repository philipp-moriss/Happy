import { makeAutoObservable } from 'mobx';
import { Task } from './types';

export interface CreateTaskDTO {
  title: string;
  description: string;
  amount: number;
  showProgress: boolean;
  endDate: Date | null;
}

class TaskStore {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async createTask(data: CreateTaskDTO) {
    const newTask: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      amount: data.amount,
      showProgress: data.showProgress,
      endDate: data.endDate,
      completed: false,
      createdAt: new Date(),
    };

    this.tasks.push(newTask);
  }

  async updateTask(id: string, data: Partial<CreateTaskDTO>) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, data);
    }
  }

  async deleteTask(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  async updateTaskStatus(id: string, { completed }: { completed: boolean }) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = completed;
    }
  }

  get activeTasks() {
    return this.tasks.filter(t => !t.completed);
  }

  get completedTasks() {
    return this.tasks.filter(t => t.completed);
  }
}

export const taskStore = new TaskStore(); 