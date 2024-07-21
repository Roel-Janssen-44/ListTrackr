export type Task = {
  id: string;
  title: string;
  completed: boolean;
  status: '' | 'planned' | 'working on it' | 'done' | 'stuck';
  priority: '' | 'low' | 'medium' | 'high';
  date?: string;
  table_id: string;
};

export type Goal = Task & {
  repeat?: boolean;
  daysPerWeek?: string;
  completedDates?: { day: string; date: Date; id: string }[];
};

export type Table = {
  id: string;
  title: string;
  tasks?: Task[];
  goals?: Goal[];
  type: 'task' | 'goal';
};
