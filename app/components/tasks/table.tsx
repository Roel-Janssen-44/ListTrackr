'use client';

import { useState, useEffect } from 'react';
import { Task, Table } from '@/app/lib/definitions';
import { Input } from '@/app/components/chadcn/input';

import CreateTask from '@/app/components/createRow';
import TableRow from '@/app/components/tasks/row';
import { updateTableName } from '@/app/lib/actions';

import { Button } from '@/app/components/chadcn/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteTable } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

import { exo } from '@/app/components/fonts';

export default function TaskTable({
  table,
  tasks,
  showDelete,
  date,
}: {
  table: Table;
  tasks: Task[];
  showDelete: boolean;
  date: string;
}) {
  const initialState = { message: null, errors: {} };
  const deleteTableWithId = deleteTable.bind(null, table.id);
  const [state, dispatch] = useFormState(deleteTableWithId, initialState);

  const [tasksToRender, setTasksToRender] = useState<Task[]>(tasks);

  if (!tasks) return null;

  const handleTitleChange = (newValue: string) => {
    if (newValue == table.title) return;
    updateTableName(table.id, newValue);
  };

  const addTaskToState = (
    newId: string,
    completed: boolean,
    taskTitle: string,
    status: '' | 'planned' | 'working on it' | 'done' | 'stuck',
    date: string,
  ) => {
    setTasksToRender([
      ...tasksToRender,
      {
        id: newId,
        title: taskTitle,
        completed: false,
        status: status,
        priority: '',
        date: date,
        table_id: table.id,
      },
    ]);
  };

  const removeTaskFromState = (id: string) => {
    setTasksToRender([
      ...tasksToRender.filter((task) => {
        return task.id != id;
      }),
    ]);
  };

  const updateTaskFromState = ({
    id,
    completed,
    title,
    priority,
    date,
    status,
  }: {
    id: string;
    completed: boolean;
    title: string;
    priority: '' | 'low' | 'medium' | 'high';
    date: string;
    status: '' | 'planned' | 'working on it' | 'done' | 'stuck';
  }) => {
    // Todo - check if updatedDate is today or tomorrow and add to the correct table
    setTasksToRender([
      ...tasksToRender.map((task) => {
        if (task.id == id) {
          return {
            ...task,
            completed: completed,
            title: title,
            priority: priority,
            date: date,
            status: status,
          };
        }
        return task;
      }),
    ]);
  };

  return (
    <div className="relative my-6 rounded-lg bg-white p-3 text-tertiary dark:bg-primary dark:text-white">
      <h2 className="my-2 flex flex-row justify-between text-lg">
        <Input
          className={`${exo.className} w-[300px] border-none bg-transparent text-xl font-bold dark:bg-transparent `}
          defaultValue={table.title}
          onBlur={(e) => {
            handleTitleChange(e.target.value);
          }}
        />
        {showDelete && (
          <form
            key={'Delete_table_form' + table.id}
            action={dispatch}
            className={`relative flex flex-row border-b-[1px] border-gray-200 odd:bg-gray-100`}
          >
            <Button type="submit" size="icon" variant="outline">
              <div className="flex flex-row justify-center">
                <TrashIcon className="h-5 w-5" />
              </div>
            </Button>
          </form>
        )}
      </h2>
      <div className="w-full overflow-x-auto rounded-lg bg-white scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-secondary">
        {tasksToRender.length != 0 && (
          <div className="ml-[50px] table text-left text-sm font-normal">
            <div className="flex w-full flex-row flex-nowrap items-center">
              <div className="inline-block w-[350px] px-4 py-3 pb-2 font-medium sm:pl-6">
                Title
              </div>
              <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                Priority
              </div>
              <div className="inline-block w-[175px] px-3 py-3 pb-2 pl-6 font-medium">
                Date
              </div>
              <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                Status
              </div>
            </div>
          </div>
        )}
        <div className="relative table w-full max-w-full">
          {tasksToRender.length != 0 &&
            tasksToRender.map((task: Task) => (
              <TableRow
                removeTask={removeTaskFromState}
                updateTaskState={updateTaskFromState}
                task={task}
                tableId={table.id}
                key={task.id}
              />
            ))}
          {date == 'today' && (
            <CreateTask
              addTask={addTaskToState}
              table_id={table.id}
              date="today"
              type="task"
            />
          )}
          {date == 'tomorrow' && (
            <CreateTask
              addTask={addTaskToState}
              table_id={table.id}
              date="tomorrow"
              type="task"
            />
          )}
          {date == null && (
            <CreateTask
              addTask={addTaskToState}
              table_id={table.id}
              date=""
              type="task"
            />
          )}
        </div>
      </div>
    </div>
  );
}
