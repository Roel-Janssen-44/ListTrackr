'use client';

import { Project, Customer } from '@/app/lib/definitions';
import { format } from 'date-fns';

import { Button } from '@/app/components/chadcn/button';
import { updateProject } from '@/app/lib/actions';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';

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

const initialState = {
  message: null,
  errors: {},
};

export default function ProjectHeader({
  project,
  customers,
}: {
  project: Project;
  customers: Customer[];
}) {
  const dateInputRef = useRef(null);

  const formRef = useRef(null);

  const updateProjectWithId = updateProject.bind(null, project.id);
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
      <input type="hidden" name="title" value={project.title} />
      <input type="hidden" name="endDate" value={project.endDate} />
      <div className="flex w-1/2 flex-col items-center justify-center bg-white p-6 pb-2 text-center font-medium md:w-1/4">
        <span className="font-bold">Projectnumber</span>
        <Input
          name="number"
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
        <span className="font-bold">Status</span>
        <Select
          defaultValue={project.status}
          name="status"
          aria-labelledby="status-error"
          onValueChange={(value) => {
            if (value == '') return;
            if (value == project.status) return;
            handleBlur();
          }}
        >
          <SelectTrigger className="mt-2 w-[150px] items-center justify-center gap-2">
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
        <span className="font-bold">Customer</span>
        <Select
          defaultValue={project.customer.id}
          name="customer"
          aria-labelledby="customer-error"
          onValueChange={(value) => {
            if (value == '') return;
            if (value == project.status) return;
            handleBlur();
          }}
        >
          <SelectTrigger
            className={`mt-2 w-[150px] items-center justify-center gap-2`}
          >
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {customers.map((customer) => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-1/2 flex-col items-center justify-center bg-white p-6 pb-2 text-center font-medium md:w-1/4">
        <span className="font-bold">Startdate</span>
        <div className="mt-3 w-[175px] px-3">
          <input
            aria-hidden
            className="hidden h-20 w-40 bg-green-500"
            name="startDate"
            type="date"
            ref={dateInputRef}
            defaultValue={
              project.startDate ? format(project.startDate, 'yyyy-MM-dd') : null
            }
          />
          <Popover>
            <PopoverTrigger asChild name="startDate">
              <Button
                name="startDate"
                variant={'outline'}
                className={cn(
                  'w-full justify-center bg-transparent text-center font-normal hover:bg-transparent',
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
                    handleBlur();
                    return;
                  } else if (
                    format(new Date(project.startDate), 'yyyy-MM-dd') ==
                    format(e, 'yyyy-MM-dd')
                  ) {
                    dateInputRef.current.value = '';
                    return;
                  }
                  handleBlur();
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </form>
  );
}
