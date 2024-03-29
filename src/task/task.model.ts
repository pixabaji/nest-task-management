export interface Task {
  id: string;
  title: string;
  desc: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  In_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
