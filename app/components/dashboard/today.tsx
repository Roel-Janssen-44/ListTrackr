import { fetchTasksToday, fetchPreviousTasks } from '@/app/lib/data';
import { Task, Table } from '@/app/lib/definitions';
import TasksTable from '@components/tasks/table';

export default async function TasksToday() {
  const fetchedTasks = await fetchTasksToday();
  const fetchedPreviousTasks = await fetchPreviousTasks();
  const table: Table = {
    id: null,
    title: 'Tasks for today',
    tasks: fetchedTasks as Task[],
    type: 'task',
  };

  const tasks = [...fetchedTasks, ...fetchedPreviousTasks];

  return (
    <TasksTable
      table={table}
      tasks={tasks as Task[]}
      showDelete={false}
      date={'today'}
    />
  );
}
