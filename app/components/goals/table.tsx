'use client';

import { useState } from 'react';

import { Goal, Table } from '@/app/lib/definitions';
import { Input } from '@/app/components/chadcn/input';

import CreateTask from '@/app/components/createRow';
import TableRow from '@/app/components/goals/row';
import { updateTableName } from '@/app/lib/actions';

import { Button } from '@/app/components/chadcn/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteTable } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { exo } from '@/app/components/fonts';
export default function TaskTableRow({
  table,
  goals,
  showDelete,
}: {
  table: Table;
  goals: Goal[];
  showDelete: boolean;
}) {
  const initialState = { message: null, errors: {} };
  const deleteTableWithId = deleteTable.bind(null, table.id);
  const [state, dispatch] = useFormState(deleteTableWithId, initialState);

  const [goalsToRender, setGoalsToRender] = useState<Goal[]>(goals);

  if (!goals) return null;

  const handleTitleChange = (newValue: string) => {
    if (newValue == table.title) return;
    updateTableName(table.id, newValue);
  };

  const addGoalToState = (newId: string, taskTitle: string) => {
    setGoalsToRender([
      ...goalsToRender,
      {
        id: newId,
        title: taskTitle,
        completed: false,
        status: '',
        priority: '',
        table_id: table.id,
      },
    ]);
  };

  const removeGoalFromState = (id: string) => {
    setGoalsToRender([
      ...goalsToRender.filter((goal) => {
        return goal.id != id;
      }),
    ]);
  };

  return (
    <div className="relative my-10 rounded-lg bg-white p-3 text-tertiary dark:bg-primary dark:text-white">
      <h2 className="text- my-2 flex flex-row justify-between">
        <Input
          className={`w-[300px] font-bold ${exo.className} border-none bg-transparent text-xl dark:bg-transparent`}
          defaultValue={table.title}
          onBlur={(e) => {
            handleTitleChange(e.target.value);
          }}
        />
        {showDelete && (
          <form
            key={'Delete_table_form' + table.id}
            action={dispatch}
            className={`relative flex flex-row border-b-[1px] border-gray-200 odd:bg-gray-50`}
          >
            <Button type="submit" size="icon" variant="outline">
              <div className="flex flex-row justify-center">
                <TrashIcon className="h-5 w-5" />
              </div>
            </Button>
          </form>
        )}
      </h2>
      <div className="w-full overflow-x-auto rounded-lg bg-gray-50 scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-secondary">
        {goals.length != 0 && (
          <div className="table text-left text-sm font-normal">
            <div className="flex w-full flex-row flex-nowrap items-center">
              <div className="inline-block w-[350px] px-4 py-3 pb-2 font-medium sm:pl-6">
                Title
              </div>
              <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                Days per week
              </div>
            </div>
          </div>
        )}
        <div className="relative table w-full max-w-full">
          {goals.length != 0 &&
            goals.map((goal: Goal) => (
              <TableRow
                removeGoal={removeGoalFromState}
                goal={goal}
                tableId={table.id}
                key={goal.id}
              />
            ))}
          <CreateTask
            table_id={table.id}
            type="goal"
            date={null}
            addTask={addGoalToState}
          />
        </div>
      </div>
    </div>
  );
}
