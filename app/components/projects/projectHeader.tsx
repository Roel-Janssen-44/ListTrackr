'use client';

import { Project, Customer } from '@/app/lib/definitions';
import { format } from 'date-fns';
import { Task } from '@/app/lib/definitions';

import { Button } from '@/app/components/chadcn/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { updateProjectNumber } from '@/app/lib/actions';
import { CornerDownRight } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';

import { Checkbox } from '@components/chadcn/checkbox';

import { Calendar } from '@/app/components/chadcn/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/chadcn/popover';
import { cn } from '@lib/utils';

import { useRef, useState } from 'react';
import { Input } from '@/app/components/chadcn/input';
import { useFormState } from 'react-dom';

export default function ProjectHeader({
  project,
  customers,
}: {
  project: Project;
  customers: Customer[];
}) {
  const dateInputRef = useRef(null);

  const initialState = { message: null, errors: {} };

  const formRef = useRef(null);

  const updateProjectWithId = updateProjectNumber.bind(null, project.id);
  const [state, dispatch] = useFormState(updateProjectWithId, initialState);

  const handleBlur = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <form
      key={project.id}
      ref={formRef}
      action={dispatch}
      className="relative my-6 flex flex-row flex-wrap rounded-lg p-3 text-tertiary"
    >
      <div className="flex w-1/2 flex-col items-center justify-center bg-white p-6 pb-2 text-center font-medium md:w-1/4">
        <span>Projectnumber</span>
        <span>{project.number}</span>
        <Input
          name="title"
          className="mt-3  bg-transparent text-center transition-all duration-75 dark:bg-transparent"
          defaultValue={project.number}
          onBlur={(e) => {
            if (e.target.value == '') return;
            if (e.target.value == project.number) return;
            handleBlur();
          }}
        />
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center bg-white p-6 pb-2 text-center font-medium md:w-1/4">
        <span>Status</span>
        <span>{project.status}</span>
        <Select
          defaultValue={project.status}
          name="priority"
          aria-labelledby="priority-error"
          onValueChange={(value) => {
            if (value == '') return;
            if (value == project.status) return;
            // handleUpdateTask('priority', value);
            // handleBlur();
          }}
        >
          <SelectTrigger
            className="mt-2 w-[150px] "
            // className={`mt-2 w-[150px] text-white ${
            //   project.status == 'completed'
            //     ? 'bg-green-400'
            //     : project.status == 'in progress'
            //     ? 'bg-orange-400'
            //     : project.status == 'waiting'
            //     ? 'bg-red-400'
            //     : 'bg-gray-400'
            // }`}
          >
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent className="text-white">
            <SelectItem
              className="mb-1 rounded bg-gray-400 transition-all"
              value="created"
            >
              created
            </SelectItem>
            <SelectItem
              className="my-1 rounded bg-red-400 transition-all"
              value="waiting"
            >
              waiting
            </SelectItem>
            <SelectItem
              className="my-1 rounded bg-orange-400 transition-all"
              value="in progress"
            >
              in progress
            </SelectItem>
            <SelectItem
              className="mt-1 rounded bg-green-400 transition-all"
              value="completed"
            >
              completed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center bg-white p-6 pb-2 pl-6 text-center font-medium md:w-1/4">
        <span>Customer</span>
        <span>{project.customer.name}</span>
        <Select
          defaultValue={project.customer.id}
          name="priority"
          aria-labelledby="priority-error"
          onValueChange={(value) => {
            if (value == '') return;
            if (value == project.status) return;
            // handleUpdateTask('priority', value);
            // handleBlur();
          }}
        >
          <SelectTrigger className={`mt-2 w-[150px]`}>
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {customers.map((customer) => (
              <SelectItem value={customer.id}>{customer.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center bg-white p-6 pb-2 text-center font-medium md:w-1/4">
        <span>Startdate</span>
        <span>{format(project.startDate, 'dd/MM/yyyy')}</span>
        <div className="mt-3 w-[175px] px-3">
          <input
            aria-hidden
            className="hidden h-20 w-40 bg-green-500"
            name="date"
            type="date"
            ref={dateInputRef}
            defaultValue={
              project.startDate ? format(project.startDate, 'yyyy-MM-dd') : null
            }
          />
          <Popover>
            <PopoverTrigger asChild name="date">
              <Button
                name="date"
                variant={'outline'}
                className={cn(
                  'w-full justify-start bg-transparent text-left font-normal hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent',
                  !project.startDate && 'text-muted-foreground',
                )}
              >
                {project.startDate
                  ? format(project.startDate, 'yyyy-MM-dd')
                  : ''}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={new Date(project.startDate)}
                onSelect={(e) => {
                  dateInputRef.current.value = format(e, 'yyyy-MM-dd');
                  if (project.startDate == null || project.startDate == '') {
                    //  handleUpdateTask('date', e);
                    //  handleBlur();
                    return;
                  } else if (
                    format(new Date(project.startDate), 'yyyy-MM-dd') ==
                    format(e, 'yyyy-MM-dd')
                  ) {
                    dateInputRef.current.value = '';
                    return;
                  }
                  //    handleUpdateTask('date', e);
                  //    handleBlur();
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </form>

    //

    //

    //

    //

    //

    //     <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
    //       <input
    //         aria-hidden
    //         className="hidden h-20 w-40 bg-green-500"
    //         name="date"
    //         type="date"
    //         ref={dateInputRef}
    //         defaultValue={task.date ? format(task.date, 'yyyy-MM-dd') : null}
    //       />
    //       <Popover>
    //         <PopoverTrigger asChild name="date">
    //           <Button
    //             name="date"
    //             variant={'outline'}
    //             className={cn(
    //               'w-full justify-start border-none bg-transparent text-left font-normal hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent',
    //               !task.date && 'text-muted-foreground',
    //             )}
    //           >
    //             {task.date ? format(task.date, 'yyyy-MM-dd') : ''}
    //           </Button>
    //         </PopoverTrigger>
    //         <PopoverContent className="w-auto p-0">
    //           <Calendar
    //             mode="single"
    //             selected={new Date(task.date)}
    //             onSelect={(e) => {
    //               dateInputRef.current.value = format(e, 'yyyy-MM-dd');
    //               if (task.date == null || task.date == '') {
    //                 handleUpdateTask('date', e);
    //                 handleBlur();
    //                 return;
    //               } else if (
    //                 format(new Date(task.date), 'yyyy-MM-dd') ==
    //                 format(e, 'yyyy-MM-dd')
    //               ) {
    //                 dateInputRef.current.value = '';
    //                 return;
    //               }
    //               handleUpdateTask('date', e);
    //               handleBlur();
    //             }}
    //             initialFocus
    //           />
    //         </PopoverContent>
    //       </Popover>
    //     </div>

    //     <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
    //       <Button
    //         variant="ghost"
    //         onClick={null}
    //         className={`transition-color w-full rounded-md text-left opacity-100 ${
    //           task.status == 'planned'
    //             ? 'bg-blue-200 hover:bg-blue-300'
    //             : task.status == 'done'
    //             ? 'bg-green-200 hover:bg-green-300'
    //             : 'bg-red-200 hover:bg-red-300'
    //         }
    //       `}
    //       >
    //         {task.status || 'Not planned'}
    //       </Button>
    //     </div>
    //     <div className="z-30 flex h-full items-center bg-transparent px-3">
    //       <Button
    //         onClick={() => handleDeleteTask(task.id)}
    //         size="icon"
    //         variant="outline"
    //         className="border-transparent bg-red-600 text-white hover:bg-red-400 hover:text-white dark:border-transparent dark:bg-red-600 dark:hover:bg-red-400"
    //       >
    //         <div className="flex flex-row justify-center">
    //           <TrashIcon className="h-5 w-5" />
    //         </div>
    //       </Button>
    //     </div>
    //   </div>
    // </form>
  );
}
