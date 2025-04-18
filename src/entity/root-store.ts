import { makeAutoObservable } from 'mobx';
import { TaskStore } from './task/task-store';

export class RootStore {
  taskStore: TaskStore;

  constructor() {
    this.taskStore = new TaskStore();
    makeAutoObservable(this);
  }
} 