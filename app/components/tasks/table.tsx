'use client';

import { useEffect, useRef, useState } from 'react';
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

import { ScrollArea, ScrollBar } from '@/app/components/chadcn/scrollArea';
import { debounce } from '@/app/lib/utils';
let ticking = false;

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
  const [isSticky, setIsSticky] = useState(false);
  const [headerStyles, setHeaderStyles] = useState({
    width: 0,
    innerWidth: 0,
    leftPosition: 0,
  });
  const headerRef = useRef(null);
  const tableRef = useRef(null);
  const innnerTableRef = useRef(null);
  const lastRowRef = useRef(null);
  const headerRowToMoveRef = useRef(null);

  const initialState = { message: null, errors: {} };
  const deleteTableWithId = deleteTable.bind(null, table.id);
  const [state, dispatch] = useFormState(deleteTableWithId, initialState);

  const [tasksToRender, setTasksToRender] = useState<Task[]>([]);

  useEffect(() => {
    setTasksToRender(tasks);
  }, []);

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
    setTasksToRender((prevTasks) => [
      ...prevTasks,
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
    description,
    priority,
    date,
    status,
  }: {
    id: string;
    completed: boolean;
    title: string;
    description: string;
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
            description: description,
            priority: priority,
            date: date,
            status: status,
          };
        }
        return task;
      }),
    ]);
  };

  useEffect(() => {
    const updateHeaderWidth = () => {
      if (headerRef.current && innnerTableRef.current) {
        const { width } = headerRef.current.getBoundingClientRect();
        const { width: innerWidth, x: leftPosition } =
          innnerTableRef.current.getBoundingClientRect();
        setHeaderStyles((prevSate) => ({
          ...prevSate,
          width,
          innerWidth,
          leftPosition,
        }));
      }
    };

    const handleScroll = () => {
      if (lastRowRef.current && tableRef.current) {
        const tableOffsetTop = tableRef.current.getBoundingClientRect().top;
        const lastRowOffsetTop = lastRowRef.current.getBoundingClientRect().top;

        if (tableOffsetTop > -60) {
          setIsSticky(false);
        } else if (lastRowOffsetTop < 0) {
          setIsSticky(false);
        } else {
          setIsSticky(true);
        }
      }
    };

    updateHeaderWidth();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateHeaderWidth);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeaderWidth);
    };
  }, [tasksToRender]);

  const debouncedHandleScroll = debounce((scrollLeft) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (headerRef.current) {
          if (headerRowToMoveRef.current) {
            headerRowToMoveRef.current.style.transform = `translateX(${-scrollLeft}px)`;
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  }, 5);

  const handleHorizontalScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    debouncedHandleScroll(scrollLeft);
  };

  return (
    <div
      ref={tableRef}
      className="relative my-6 rounded-lg bg-white p-3 text-tertiary dark:bg-primary dark:text-white"
    >
      <h2 className="relative my-2 flex flex-row justify-between text-lg">
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

      <ScrollArea
        onScrollCapture={handleHorizontalScroll}
        ref={innnerTableRef}
        // className="pb-3"
      >
        <div className="w-full overflow-x-auto rounded-lg bg-white scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-secondary">
          {tasksToRender.length != 0 && (
            <>
              <div
                ref={headerRef}
                className="relative table w-full px-[50px] text-left text-sm font-normal"
              >
                <div className="flex w-full flex-row flex-nowrap items-center">
                  <div className="inline-block min-w-[350px] flex-1 px-4 py-3 pb-2 font-medium sm:pl-6">
                    Title
                  </div>
                  <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                    Priority
                  </div>
                  <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                    Date
                  </div>
                  <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                    Status
                  </div>
                </div>
              </div>
              <div
                style={{
                  left: headerStyles.leftPosition,
                  width: headerStyles.innerWidth,
                }}
                className={`${
                  isSticky ? 'visible top-0' : 'invisible -top-10'
                } fixed left-0 z-40 overflow-hidden bg-white transition-all`}
              >
                <div
                  ref={headerRowToMoveRef}
                  style={{
                    width: headerStyles.width,
                  }}
                  className="relative z-10 table h-full w-full overflow-hidden bg-white px-[50px] text-left text-sm font-normal "
                >
                  <div className="flex w-full flex-row flex-nowrap items-center ">
                    <div className="inline-block min-w-[350px] flex-1 px-4 py-3 pb-2 font-medium sm:pl-6">
                      Title
                    </div>
                    <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                      Priority
                    </div>
                    <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                      Date
                    </div>
                    <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                      Status
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="relative table w-full max-w-full">
            {tasksToRender.length != 0 &&
              tasksToRender.map((task: Task, index: number) => (
                <div
                  key={task.id + 'row'}
                  ref={index === tasksToRender.length - 1 ? lastRowRef : null} // Attach ref to the last row
                >
                  <TableRow
                    removeTask={removeTaskFromState}
                    updateTaskState={updateTaskFromState}
                    task={task}
                    tableId={table.id}
                    key={task.id}
                  />
                </div>
              ))}
            {date == 'today' && (
              <CreateTask
                addTask={addTaskToState}
                table_id={table.id}
                project_id={null}
                date="today"
                type="task"
              />
            )}
            {date == 'tomorrow' && (
              <CreateTask
                addTask={addTaskToState}
                table_id={table.id}
                project_id={null}
                date="tomorrow"
                type="task"
              />
            )}
            {date == null && (
              <CreateTask
                addTask={addTaskToState}
                table_id={table.id}
                project_id={null}
                date=""
                type="task"
              />
            )}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export const TableLoader = ({ fullWidth = true }: { fullWidth?: boolean }) => {
  return (
    <div className="relative my-6 rounded-lg bg-white py-3 text-tertiary dark:bg-primary dark:text-white">
      <h2 className="my-2 flex flex-row justify-between text-lg">
        <div className="ml-4 h-7 w-[175px] animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
      </h2>
      <div className="w-full overflow-x-hidden rounded-lg bg-white">
        <div className="relative table w-full max-w-full">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index + 1 == 5 ? '' : 'border-b-[1px]'
              } border-gray-200 py-2 dark:border-active`}
            >
              <div className="ml-4 h-7 w-7 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="w-[350px] px-4">
                <div className="h-7 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-[175px] px-3 text-center dark:border-active"
                >
                  <div className="h-7 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
