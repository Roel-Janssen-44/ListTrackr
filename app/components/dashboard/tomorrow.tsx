import { fetchTasksTomorrow } from '@/app/lib/data';
import { Task, Table } from '@/app/lib/types';
import TasksTable from '@components/tasks/table';

export default async function TasksTomorrow() {
  const fetchedTasks = await fetchTasksTomorrow();
  const table: Table = {
    id: null,
    title: 'Tasks for tomorrow',
    tasks: fetchedTasks as Task[],
    type: 'task',
  };

  return (
    <TasksTable
      table={table}
      tasks={fetchedTasks as Task[]}
      showDelete={false}
      date={'tomorrow'}
    />
  );
}
