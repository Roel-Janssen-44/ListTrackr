'use client';

import { useRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Task } from '@/app/lib/definitions';
import { Button } from '@/app/components/chadcn/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { updateTask, deleteTask } from '@/app/lib/actions';
import { CornerDownRight } from 'lucide-react';
import { Checkbox } from '@components/chadcn/checkbox';
import { Calendar } from '@/app/components/chadcn/calendar';
import { cn } from '@lib/utils';
import { Input } from '@/app/components/chadcn/input';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/chadcn/popover';

export default function TaskRow({
  tableId,
  task,
  removeTask,
  updateTaskState,
}: {
  tableId: string;
  task: Task;
  removeTask: Function;
  updateTaskState: Function;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [focussed, setFocussed] = useState(false);

  const initialState = { success: true, message: '' };

  const formRef = useRef(null);
  const checkboxRef = useRef(null);
  const dateInputRef = useRef(null);

  const handleBlur = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const updateTaskWithId = updateTask.bind(null, tableId, task.id);
  const [state, dispatch] = useFormState(updateTaskWithId, initialState);

  useEffect(() => {
    if (!state.success) {
      toast.error(state.message);
    }
  }, [state]);

  const handleDeleteTask = (id: string) => {
    removeTask(id);
    deleteTask(id);
  };

  const handleUpdateTask = (changedField: string, newValue: any) => {
    if (changedField == 'completed') {
      updateTaskState({
        id: task.id,
        completed: newValue,
        title: task.title,
        priority: task.priority,
        date: task.date,
        status: task.status,
      });
    } else if (changedField == 'title') {
      if (newValue.length <= 3) {
        toast.error('Task must contain more than 3 characters');
        return;
      }
      if (newValue.length > 128) {
        toast.error('Task must contain less than 128 characters');
        return;
      }

      updateTaskState({
        id: task.id,
        completed: task.completed,
        title: newValue,
        priority: task.priority,
        date: task.date,
        status: task.status,
      });
    } else if (changedField == 'priority') {
      updateTaskState({
        id: task.id,
        completed: task.completed,
        title: task.title,
        priority: newValue,
        date: task.date,
        status: task.status,
      });
    } else if (changedField == 'date') {
      updateTaskState({
        id: task.id,
        completed: task.completed,
        title: task.title,
        priority: task.priority,
        date: newValue,
        status: task.status,
      });
    } else if (changedField == 'status') {
      updateTaskState({
        id: task.id,
        completed: task.completed,
        title: task.title,
        priority: task.priority,
        date: task.date,
        status: newValue,
      });
    }
  };

  return (
    <>
      {/* <Toaster richColors /> */}
      <form
        key={task.id}
        ref={formRef}
        action={dispatch}
        className={`relative flex flex-row border-t-[1px] border-gray-200 odd:bg-gray-50 dark:border-white dark:border-opacity-10 dark:odd:bg-primary`}
      >
        <div className="group flex w-full flex-row flex-nowrap items-center text-sm transition-colors hover:bg-gray-100 dark:hover:bg-active">
          {task.completed && (
            <>
              <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-20"></div>
              <div className="absolute left-[1%] top-1/2 z-20 h-[1px] w-[91%] -translate-y-1/2 rounded bg-black "></div>
            </>
          )}
          <div
            className={`relative flex w-[50px] items-center justify-center border-r-[1px] border-gray-200 px-3 py-1 dark:border-white dark:border-opacity-10`}
          >
            <Checkbox
              ref={checkboxRef}
              id={task.id}
              name="completed"
              defaultChecked={task.completed}
              onCheckedChange={(value) => {
                handleUpdateTask('completed', value);
                handleBlur();
              }}
            />
            <label
              className="absolute left-0 top-1/2 h-full min-h-[46px] w-full -translate-y-1/2 cursor-pointer"
              htmlFor={task.id}
            ></label>
          </div>
          <div className="relative w-[350px] border-r-[1px] border-gray-200 px-3 py-1 dark:border-white dark:border-opacity-10">
            {(task.table_title || task.project_title) && (
              <div
                className={`pointer-events-none -z-10	 ${
                  focussed ? 'invisible' : 'visible'
                }`}
              >
                <p className="absolute left-1 top-0.5 z-0 flex flex-row text-xs">
                  {task.table_title}
                </p>
                <p className="absolute left-1 top-0.5 z-0 flex flex-row text-xs">
                  {task.project_title}
                </p>
                <CornerDownRight className="absolute left-2 top-1/2 h-auto w-3 -translate-y-1/2" />
              </div>
            )}
            <Input
              name="title"
              className="cursor-pointer border-none bg-transparent transition-all duration-75 dark:bg-transparent"
              defaultValue={task.title}
              onBlur={(e) => {
                setFocussed(false);
                if (e.target.value == '') {
                  handleDeleteTask(task.id);
                  return;
                }
                if (e.target.value == task.title) return;
                handleUpdateTask('title', e.target.value);
                handleBlur();
              }}
              onFocus={() => setFocussed(true)}
            />
          </div>
          <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
            <Select
              defaultValue={task.priority}
              name="priority"
              aria-labelledby="priority-error"
              onValueChange={(value) => {
                if (value == '') return;
                if (value == task.priority) return;
                handleUpdateTask('priority', value);
                handleBlur();
              }}
            >
              <SelectTrigger
                className={`w-[150px] ${
                  task.priority == 'low'
                    ? 'bg-red-200 dark:bg-red-200'
                    : task.priority == 'medium'
                    ? 'bg-red-400 dark:bg-red-400'
                    : task.priority == 'high'
                    ? 'bg-red-600 dark:bg-red-600'
                    : 'border-none bg-transparent text-transparent dark:bg-transparent'
                }`}
              >
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">None</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
            <input
              aria-hidden
              className="hidden h-20 w-40 bg-green-500"
              name="date"
              type="date"
              ref={dateInputRef}
              defaultValue={task.date ? format(task.date, 'yyyy-MM-dd') : null}
            />
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild name="date">
                <Button
                  name="date"
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start border-none bg-transparent text-left font-normal hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent',
                    !task.date && 'text-muted-foreground',
                  )}
                >
                  {task.date ? format(task.date, 'yyyy-MM-dd') : ''}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(task.date)}
                  onSelect={(e) => {
                    dateInputRef.current.value = format(e, 'yyyy-MM-dd');
                    if (task.date == null || task.date == '') {
                      handleUpdateTask('date', e);
                      handleBlur();
                      setPopoverOpen(false);
                      return;
                    } else if (
                      format(new Date(task.date), 'yyyy-MM-dd') ==
                      format(e, 'yyyy-MM-dd')
                    ) {
                      dateInputRef.current.value = '';
                      return;
                    }
                    handleUpdateTask('date', e);
                    handleBlur();
                    setPopoverOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
            <Button
              variant="ghost"
              onClick={null}
              className={`transition-color w-full rounded-md text-left opacity-100 ${
                task.status == 'planned'
                  ? 'bg-blue-200 hover:bg-blue-300'
                  : task.status == 'done'
                  ? 'bg-green-200 hover:bg-green-300'
                  : 'bg-red-200 hover:bg-red-300'
              }
          `}
            >
              {task.status || 'Not planned'}
            </Button>
          </div>
          <div className="z-30 flex h-full items-center bg-transparent px-3">
            <Button
              onClick={() => handleDeleteTask(task.id)}
              size="icon"
              variant="outline"
              className="border-transparent bg-red-600 text-white hover:bg-red-400 hover:text-white dark:border-transparent dark:bg-red-600 dark:hover:bg-red-400"
            >
              <div className="flex flex-row justify-center">
                <TrashIcon className="h-5 w-5" />
              </div>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
