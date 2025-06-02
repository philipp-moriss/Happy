export interface Task {
  id: string;
  title: string;
  description: string;
  amount: number;
  showProgress: boolean;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: string;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  amount: number;
  showProgress: boolean;
  category: string;
}

export interface UpdateTaskDTO {
  title: string;
  description: string;
  dueDate: Date;
  category: string;
}

export interface UpdateTaskStatusDTO {
  completed: boolean;
}

export interface TaskFilters {
  completed?: boolean;
  category?: string;
  search?: string;
} 

export type Category = 'hedonic' | 'eudaimonic' | 'psychological';