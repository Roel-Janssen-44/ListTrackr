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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/chadcn/dialog';

export default function TaskModal({
  task,
  tableId,
  isOpen,
  setIsOpen,
  removeTask,
  handleUpdateTask,
  handleDeleteTask,
}: {
  task: Task;
  tableId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  removeTask: Function;
  handleUpdateTask: Function;
  handleDeleteTask: Function;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [focussed, setFocussed] = useState(false);

  const initialState = { success: true, message: '' };

  const formRefModal = useRef(null);
  const checkboxRef = useRef(null);
  const dateInputRef = useRef(null);

  const handleBlur = () => {
    if (formRefModal.current) {
      formRefModal.current.requestSubmit();
    }
  };

  const updateTaskWithIdModal = updateTask.bind(null, tableId, task.id);
  const [stateModal, dispatchModal] = useFormState(
    updateTaskWithIdModal,
    initialState,
  );

  useEffect(() => {
    if (!stateModal.success) {
      toast.error(stateModal.message);
    }
  }, [stateModal]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="hidden lg:block">
        <DialogHeader>
          <DialogTitle>{''}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{task.description}</DialogDescription>
        <form key={task.id + 'modal'} ref={formRefModal} action={dispatchModal}>
          <div className="group flex w-full flex-col gap-4">
            {/* <div className={`relative`}>
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
            </div> */}
            <div className="group relative min-w-[350px] flex-1 px-3 py-1">
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
                className="no-context-menu cursor-pointer select-none bg-transparent transition-all duration-75 dark:bg-transparent lg:select-text"
                value={task.title}
                onChange={(e) => {
                  handleUpdateTask('title', e.target.value);
                }}
                onBlur={(e) => {
                  setFocussed(false);
                  if (e.target.value == '') {
                    handleDeleteTask(task.id);
                    return;
                  }
                  // if (e.target.value == task.title) return;
                  // console.log('blur');
                  // handleUpdateTask('title', e.target.value);
                  handleBlur();
                }}
                onFocus={() => setFocussed(true)}
              />
            </div>
            <div className="w-[175px] px-3">
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
            <div className="w-[175px] px-3">
              <input
                aria-hidden
                className="hidden"
                name="date"
                type="date"
                ref={dateInputRef}
                defaultValue={
                  task.date ? format(task.date, 'yyyy-MM-dd') : undefined
                }
              />
              {/* <Button
                name="date"
                variant={'outline'}
                className={cn(
                  'w-full justify-start border-[1px] border-gray-200 bg-transparent text-left font-normal hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent',
                  !task.date && 'text-muted-foreground',
                )}
              >
                {task.date ? format(task.date, 'yyyy-MM-dd') : ''}
              </Button> */}
              <Calendar
                mode="single"
                selected={new Date(task.date)}
                onSelect={(e) => {
                  if (task.date == null || task.date == '') {
                    dateInputRef.current.value = format(e, 'yyyy-MM-dd');
                    handleUpdateTask('date', e);
                    handleBlur();
                    setPopoverOpen(false);
                    return;
                  } else if (!e) {
                    dateInputRef.current.value = '';
                  }
                  handleUpdateTask('date', e);
                  handleBlur();
                  setPopoverOpen(false);
                }}
                initialFocus
              />
            </div>

            <div className="w-[175px] px-3">
              <Button
                variant="ghost"
                value={task.status}
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
      </DialogContent>
    </Dialog>
  );
}
