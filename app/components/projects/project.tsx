'use client';

import { Task } from '@/app/lib/definitions';
import { Project, ProjectTasks } from '@/app/lib/definitions';
import { useEffect, useRef, useState } from 'react';
import CreateTask from '@/app/components/createRow';
import TableRow from '@/app/components/tasks/row';
import { ScrollArea, ScrollBar } from '@/app/components/chadcn/scrollArea';

export default function ProjectTasksTable({
  project,
  showTitle = false,
  title,
}: {
  project: Project | ProjectTasks;
  showTitle?: boolean;
  title?: string;
}) {
  const [isSticky, setIsSticky] = useState(false);
  const [headerStyles, setHeaderStyles] = useState({ width: 0, left: 0 });
  const headerRef = useRef(null);
  const tableRef = useRef(null);
  const lastRowRef = useRef(null);

  useEffect(() => {
    const updateHeaderWidth = () => {
      if (headerRef.current) {
        const { width } = headerRef.current.getBoundingClientRect();
        // setHeaderStyles({ width, left });
        setHeaderStyles((prevSate) => ({
          ...prevSate,
          width,
        }));
      }
    };

    const handleScroll = () => {
      if (headerRef.current && lastRowRef.current && tableRef.current) {
        const tableOffsetTop = tableRef.current.getBoundingClientRect().top;
        const lastRowOffsetTop = lastRowRef.current.getBoundingClientRect().top;
        // const tableScrollLeft = tableRef.current.scrollLeft;

        if (tableOffsetTop > 0) {
          setIsSticky(false);
        } else if (lastRowOffsetTop < 0) {
          setIsSticky(false);
        } else {
          setIsSticky(true);
          updateHeaderWidth();

          // headerRef.current.style.transform = `translateX(${-tableScrollLeft}px)`;
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
  }, []);

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

  const handleHorizontalScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;

    console.log(e);
    console.log(scrollLeft);

    if (headerRef.current) {
      setHeaderStyles((prevState) => ({
        ...prevState,
        left: scrollLeft,
      }));

      // headerRef.current.style.transform = `translateX(${-scrollLeft}px)`;
    }
  };

  return (
    <div>
      <div
        ref={tableRef}
        className="relative mt-6 rounded-lg bg-white p-3 text-tertiary dark:bg-primary dark:text-white"
      >
        {showTitle && (
          <h3 className="px-3 py-2 text-lg font-bold">
            {title ? title : project.title}
          </h3>
        )}

        <ScrollArea
          onScrollCapture={handleHorizontalScroll}
          // className="pb-3"
        >
          <div className="relative w-full overflow-x-auto rounded-lg bg-white scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-secondary">
            {project.tasks.length !== 0 && (
              <>
                <div
                  ref={headerRef}
                  className="relative table w-full bg-green-500 px-[50px] text-left text-sm font-normal"
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

                {isSticky && (
                  <div
                    style={{
                      width: headerStyles.width,
                      left: headerStyles.left,
                    }}
                    className="fixed left-0 top-0 z-10 table overflow-hidden bg-red-500 px-[50px] text-left text-sm font-normal"
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
                )}
              </>
            )}

            <div className="relative table w-full max-w-full">
              {tasksToRender.length != 0 &&
                tasksToRender.map((task: Task, index) => (
                  <div
                    key={task.id + 'row'}
                    ref={index === tasksToRender.length - 1 ? lastRowRef : null} // Attach ref to the last row
                  >
                    <TableRow
                      removeTask={removeTaskFromState}
                      updateTaskState={updateTaskFromState}
                      task={task}
                      tableId={project.id}
                      key={task.id}
                    />
                  </div>
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
