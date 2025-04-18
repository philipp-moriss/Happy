export interface Task {
  id: string;
  title: string;
  description: string;
  amount: number;
  showProgress: boolean;
  endDate: Date | null;
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
  startDate: string;
  endDate?: string | null;
  isEndless: boolean;
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