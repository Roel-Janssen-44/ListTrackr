'use client';

import { Button } from '@/app/components/button';
import { Project } from '@/app/lib/definitions';
import Link from 'next/link';
import { format } from 'date-fns';

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <>
      <div className="flex flex-col flex-wrap gap-2">
        <div className="relative my-6 w-full rounded-lg bg-white p-3 text-tertiary dark:bg-primary dark:text-white">
          <div className="max-w-screen w-full overflow-x-auto rounded-lg bg-white scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-secondary">
            <div className="table text-left text-sm font-normal">
              <div className="flex w-full flex-row flex-nowrap items-center">
                <div className="inline-block w-[250px] px-4 py-3 pb-2 font-medium sm:w-[250px] sm:pl-3 md:w-[350px]">
                  Projecttitle
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
                    <div className="w-[250px] border-r-[1px] border-gray-200 px-3 py-1 dark:border-white dark:border-opacity-10 sm:w-[250px] md:w-[350px]">
                      {project.title}
                    </div>
                    <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
                      {project.status}
                    </div>
                    <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
                      {project.customer.name}
                    </div>

                    <div className="my-1 w-[175px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
                      {(project.startDate &&
                        format(project.startDate, 'dd/MM/yyyy')) ||
                        ''}
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
