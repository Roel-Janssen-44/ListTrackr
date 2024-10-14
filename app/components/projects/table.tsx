'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/app/components/button';
import { Project } from '@/app/lib/definitions';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/chadcn/dialog';
import { Input } from '../chadcn/input';

import { v4 as uuid } from 'uuid';

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <>
      <div className="flex flex-col flex-wrap gap-2">
        <div className="relative my-6 rounded-lg bg-white p-3 text-tertiary dark:bg-primary dark:text-white">
          <div className="w-full overflow-x-auto rounded-lg bg-white scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-secondary">
            <div className="table text-left text-sm font-normal">
              <div className="flex w-full flex-row flex-nowrap items-center">
                <div className="inline-block w-[350px] px-4 py-3 pb-2 font-medium sm:pl-3">
                  Projectnumber
                </div>
                <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                  Status
                </div>
                <div className="inline-block w-[175px] px-3 py-3 pb-2 pl-6 font-medium">
                  Customer
                </div>
                <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                  Startdate
                </div>
              </div>
            </div>
            <div className="relative table w-full max-w-full">
              {projects?.map((project: Project) => (
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  key={project.id}
                  className={`relative flex min-h-[40px] flex-row border-t-[1px] border-gray-200 odd:bg-gray-50 dark:border-white dark:border-opacity-10 dark:odd:bg-primary`}
                >
                  <div className="group flex w-full flex-row flex-nowrap items-center text-sm transition-colors hover:bg-gray-100 dark:hover:bg-active">
                    <div className="w-[350px] border-r-[1px] border-gray-200 px-3 py-1 dark:border-white dark:border-opacity-10">
                      {project.number}
                    </div>
                    <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
                      {project.status}
                    </div>
                    <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
                      {project.customer.name}
                    </div>

                    <div className="my-1 w-[175px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
                      {format(project.startDate, 'dd/MM/yyyy')}
                      {/* <Select
                        defaultValue={project.status}
                        name="priority"
                        aria-labelledby="priority-error"
                        onValueChange={async (value) => {
                          //   await updateProjectStatus({
                          //     newValue: value,
                          //     projectId: project.id,
                          //   });
                        }}
                      >
                        <SelectTrigger
                          className={`w-[150px] 
                            ${
                              'asas'
                              // project.status == 'paid'
                              //   ? 'bg-green-400'
                              //   : project.status == 'created'
                              //   ? 'bg-gray-200'
                              //   : project.status == 'pending'
                              //   ? 'bg-orange-400'
                              //   : project.status == 'overdue'
                              //   ? 'bg-red-400'
                              //   : 'border-none bg-transparent text-transparent dark:bg-transparent'
                            }
                              `}
                        >
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="created">Created</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <Link key={'asdfasdsa'} href={`/dashboard/projects/create`}>
          <Button>Create project</Button>
        </Link>
      </div>
    </>
  );
}
