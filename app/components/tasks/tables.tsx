import { fetchTables, fetchTasks } from '@/app/lib/data';
import { Task, Table } from '@/app/lib/definitions';
import TasksTable from './table';
import CreateForm from '@components/createTable';

export default async function TaskTables({
  showCreateNewTable,
}: {
  showCreateNewTable: boolean;
}) {
  const fetchedTables = await fetchTables();
  const fetchedTasks = await fetchTasks();
  let tables: Table[] = fetchedTables?.map((table) => {
    return {
      id: table.id,
      title: table.title,
      tasks: [],
      type: 'task',
    };
  });

  fetchedTasks.forEach((task: Task) => {
    if (!task.table_id) return;

    const table = tables?.find((table) => table.id === task.table_id);
    if (table) {
      table.tasks.push(task);
    }
  });

  // console.log('table');
  // console.log(tables);

  return (
    <div>
      {tables?.map((table: Table) => (
        <TasksTable
          key={table.id}
          table={table}
          tasks={table.tasks}
          showDelete={true}
          date={null}
        />
      ))}
      {showCreateNewTable && <CreateForm type="task" />}
    </div>
  );
}
