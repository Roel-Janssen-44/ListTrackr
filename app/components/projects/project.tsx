'use client';

import { Task } from '@/app/lib/definitions';
import { Project } from '@/app/lib/definitions';
import { useState } from 'react';
import CreateTask from '@/app/components/createRow';
import TableRow from '@/app/components/tasks/row';

export default function ProjectTasksTable({ project }: { project: Project }) {
  const [tasksToRender, setTasksToRender] = useState<Task[]>(project.tasks);

  if (!project) return null;

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
        table_id: project.id,
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
    <div>
      <div className="relative my-6 rounded-lg bg-white p-3 text-tertiary dark:bg-primary dark:text-white">
        <div className="w-full overflow-x-auto rounded-lg bg-white scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-secondary">
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
          <div className="relative table w-full max-w-full">
            {tasksToRender.length != 0 &&
              tasksToRender.map((task: Task) => (
                <TableRow
                  removeTask={removeTaskFromState}
                  updateTaskState={updateTaskFromState}
                  task={task}
                  tableId={project.id}
                  key={task.id}
                />
              ))}
            <CreateTask
              addTask={addTaskToState}
              table_id={null}
              project_id={project.id}
              date=""
              type="task"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
