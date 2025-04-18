export interface CreateTaskDTO {
  title: string;
  description: string;
  amount: number;
  category: string;
  showProgress: boolean;
  startDate: string;
  endDate?: string | null;
  isEndless: boolean;
} 