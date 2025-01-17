import { useRef, useEffect, useState, Suspense } from 'react';
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
import { Badge } from '@/app/components/chadcn/badge';
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
import { useLongPress } from '@uidotdev/usehooks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/chadcn/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/components/chadcn/drawer';
import { Textarea } from '@/app/components/chadcn/textarea';

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
  const priorityInputRef = useRef(null);

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
        description: task.description,
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
        description: task.description,
        priority: task.priority,
        date: task.date,
        status: task.status,
      });
    } else if (changedField == 'priority') {
      updateTaskState({
        id: task.id,
        completed: task.completed,
        title: task.title,
        description: task.description,
        priority: newValue,
        date: task.date,
        status: task.status,
      });
    } else if (changedField == 'description') {
      updateTaskState({
        id: task.id,
        completed: task.completed,
        title: task.title,
        description: newValue,
        priority: task.priority,
        date: task.date,
        status: task.status,
      });
    } else if (changedField == 'date') {
      if (newValue && !task.completed) {
        updateTaskState({
          id: task.id,
          completed: task.completed,
          title: task.title,
          description: task.description,
          priority: task.priority,
          date: newValue,
          status: 'planned',
        });
      } else if (newValue && task.completed) {
        updateTaskState({
          id: task.id,
          completed: task.completed,
          title: task.title,
          description: task.description,
          priority: task.priority,
          date: newValue,
          status: 'Done',
        });
      } else {
        updateTaskState({
          id: task.id,
          completed: task.completed,
          title: task.title,
          description: task.description,
          priority: task.priority,
          date: newValue,
          status: 'Not planned',
        });
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [mobileIsOpen, setMobileIsOpen] = useState(false);
  const attrs = useLongPress(
    () => {
      setMobileIsOpen(true);
    },
    {
      threshold: 800,
    },
  );

  return (
    <>
      <form
        key={task.id}
        ref={formRef}
        action={dispatch}
        className={`relative flex flex-row border-t-[1px] border-gray-200 odd:bg-gray-50 dark:border-white dark:border-opacity-10 dark:odd:bg-primary`}
      >
        <input
          value={task.description}
          name="description"
          readOnly
          type="hidden"
        />
        <div className="group flex w-full flex-row flex-nowrap items-center text-sm transition-colors hover:bg-gray-100 dark:hover:bg-active">
          {task.completed && (
            <>
              <div className="absolute left-0 top-0 z-20 h-full w-full bg-black bg-opacity-20"></div>
              <div className="absolute left-[1%] top-1/2 z-20 h-[1px] w-[91%] -translate-y-1/2 rounded bg-black "></div>
            </>
          )}
          <div
            className={`relative z-30 flex w-[50px] items-center justify-center border-r-[1px] border-gray-200 px-3 py-1 dark:border-white dark:border-opacity-10`}
          >
            <input
              name="completed"
              type="hidden"
              ref={checkboxRef}
              value={task.completed?.toString() || 'false'}
              readOnly
            />
            <Checkbox
              ref={checkboxRef}
              id={'task-completion-state-' + task.id}
              checked={task.completed}
              onChange={() => null}
              onCheckedChange={(value) => {
                if (value) {
                  checkboxRef.current.value = true;
                } else {
                  checkboxRef.current.value = false;
                }
                setTimeout(() => {
                  handleBlur();
                }, 0);
                handleUpdateTask('completed', value);
              }}
            />
            <label
              className="absolute left-0 top-1/2 h-full min-h-[46px] w-full -translate-y-1/2 cursor-pointer"
              htmlFor={'task-completion-state-' + task.id}
            ></label>
          </div>
          <div className="group relative min-w-[350px] flex-1 border-r-[1px] border-gray-200 px-3 py-1 dark:border-white dark:border-opacity-10">
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
            <a href="#" className="-z-10" onClick={(e) => e.preventDefault()}>
              <Input
                name="title"
                className="no-context-menu cursor-pointer select-none border-none bg-transparent transition-all duration-75 dark:bg-transparent lg:select-text"
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
                  handleBlur();
                }}
                {...attrs}
                onFocus={() => setFocussed(true)}
              />
            </a>
            {!task.completed && (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="invisible absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer group-hover:visible lg:block"
              >
                <Badge variant="outline" className="bg-white">
                  open
                </Badge>
              </button>
            )}
          </div>
          <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
            <input
              value={task.priority}
              name="priority"
              title="priority"
              ref={priorityInputRef}
              readOnly
              type="hidden"
            />
            <Select
              aria-labelledby="priority-error"
              onValueChange={(value) => {
                priorityInputRef.current.value = value;
                handleUpdateTask('priority', value);
                handleBlur();
              }}
              value={task.priority}
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
              className="hidden"
              name="date"
              type="date"
              ref={dateInputRef}
              value={task.date ? format(task.date, 'yyyy-MM-dd') : undefined}
              readOnly
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

      <div className="hidden lg:block">
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DialogContent className="hidden lg:block">
            <DialogHeader>
              <DialogTitle>{''}</DialogTitle>
            </DialogHeader>
            <DialogDescription>{''}</DialogDescription>
            <TaskModalContent
              removeTask={removeTask}
              task={task}
              tableId={tableId}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleUpdateTask={handleUpdateTask}
              handleDeleteTask={handleDeleteTask}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="hidden lg:block">
        <Drawer open={mobileIsOpen} onOpenChange={setMobileIsOpen}>
          <DrawerContent className="block select-none bg-white lg:hidden">
            <DrawerHeader>
              <DrawerTitle>{''}</DrawerTitle>
              <DrawerDescription>{''}</DrawerDescription>
            </DrawerHeader>
            <TaskModalContent
              removeTask={removeTask}
              task={task}
              tableId={tableId}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleUpdateTask={handleUpdateTask}
              handleDeleteTask={handleDeleteTask}
            />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

const TaskModalContent = ({
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
}) => {
  const initialState = { success: true, message: '' };

  const formRefModal = useRef(null);
  const dateInputRef = useRef(null);
  const priorityInputRef = useRef(null);

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

  console.log(task);

  return (
    <form key={task.id + 'modal'} ref={formRefModal} action={dispatchModal}>
      <div className="group flex w-full flex-col gap-4">
        <div className="group relative min-w-[350px] flex-1 px-3 py-1">
          {(task.table_title || task.project_title) && (
            <>
              {task.table_title && (
                <p className="absolute -bottom-2 left-12 z-0 flex translate-y-1/2 flex-row text-sm">
                  {task.table_title}
                </p>
              )}
              {task.project_title && (
                <p className="absolute -bottom-2 left-12 z-0 flex translate-y-1/2 flex-row text-sm">
                  {task.project_title}
                </p>
              )}
              <CornerDownRight className="absolute bottom-0 left-8 h-auto w-3 translate-y-full" />
            </>
          )}
          <label htmlFor="" className="font-bold">
            Title:
          </label>
          <Input
            name="title"
            className="no-context-menu mt-1 cursor-pointer select-none bg-transparent transition-all duration-75 dark:bg-transparent lg:select-text"
            value={task.title}
            onChange={(e) => {
              handleUpdateTask('title', e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value == '') {
                handleDeleteTask(task.id);
                return;
              }
              handleBlur();
            }}
          />
        </div>
        <div className="relative mt-3 min-w-[350px] flex-1 px-3 py-1">
          <label htmlFor="" className="font-bold">
            Description:
          </label>
          <Textarea
            className="mt-1"
            name="description"
            placeholder="This task is..."
            value={task.description}
            onChange={(e) => {
              handleUpdateTask('description', e.target.value);
            }}
            onBlur={(e) => {
              handleBlur();
            }}
          />
        </div>
        <div className="w-[175px] px-3">
          <label htmlFor="" className="font-bold">
            Priority:
          </label>
          <input
            value={task.priority}
            name="priority"
            title="priority"
            ref={priorityInputRef}
            readOnly
            type="hidden"
          />
          <Select
            aria-labelledby="priority-error"
            onValueChange={(value) => {
              priorityInputRef.current.value = value;
              handleUpdateTask('priority', value);
              handleBlur();
            }}
            value={task.priority}
          >
            <SelectTrigger
              className={`mt-1 w-[150px] ${
                task.priority == 'low'
                  ? 'bg-red-200 dark:bg-red-200'
                  : task.priority == 'medium'
                  ? 'bg-red-400 dark:bg-red-400'
                  : task.priority == 'high'
                  ? 'bg-red-600 dark:bg-red-600'
                  : ''
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
          <label htmlFor="" className="font-bold">
            Date:
          </label>
          <Calendar
            mode="single"
            className="mt-1"
            selected={new Date(task.date)}
            onSelect={(e) => {
              if (task.date == null || task.date == '') {
                dateInputRef.current.value = format(e, 'yyyy-MM-dd');
                handleUpdateTask('date', e);
                handleBlur();
                return;
              } else if (!e) {
                dateInputRef.current.value = '';
              }
              handleUpdateTask('date', e);
              handleBlur();
            }}
            initialFocus
          />
        </div>

        <div className="w-[175px] px-3">
          <label htmlFor="" className="font-bold">
            Status:
          </label>
          <Button
            variant="ghost"
            value={task.status}
            onClick={null}
            className={`transition-color mt-1 w-full rounded-md text-left opacity-100 ${
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
  );
};
