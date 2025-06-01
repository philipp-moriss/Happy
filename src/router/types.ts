export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  Profile: undefined;
};

export type TasksStackParamList = {
  TasksList: undefined;
  TaskForm: undefined;
  TaskDetails: { taskId: string };
  TaskEdit: { taskId: string };
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Settings: undefined;
}; 