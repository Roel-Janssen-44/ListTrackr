import { fetchGoalTables, fetchGoals } from '@/app/lib/data';
import { Table, Goal } from '@/app/lib/definitions';
import GoalTable from './table';
import CreateTable from '@components/createTable';

export default async function GoalTables({
  showCreateNewTable,
}: {
  showCreateNewTable: boolean;
}) {
  const fetchedTables = await fetchGoalTables();
  const fetchedGoals = await fetchGoals();

  let tables: Table[] = fetchedTables.map((table) => {
    return {
      id: table.id,
      title: table.title,
      goals: [],
      type: 'goal',
    };
  });

  fetchedGoals.forEach((goal) => {
    if (!goal.table_id) return;

    const table = tables.find((table) => table.id === goal.table_id);
    if (table) {
      const changedGoal: Goal = {
        id: goal.id,
        title: goal.title,
        table_id: goal.table_id,
        daysPerWeek: goal.daysperweek?.toString() || '0',
        completed: goal.completed,
        status: '',
        priority: '',
      };

      table.goals.push(changedGoal);
    }
  });

  return (
    <>
      {tables?.map((table: Table) => (
        <GoalTable
          key={table.id}
          table={table}
          goals={table.goals}
          showDelete={true}
        />
      ))}
      {showCreateNewTable && <CreateTable type="goal" />}
    </>
  );
}
