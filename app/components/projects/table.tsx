'use client';

import { Button } from '@/app/components/button';
import { Project } from '@/app/lib/types';
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
                <div className="inline-block w-[175px] px-3 py-3 pb-2 pl-3 font-medium">
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
                    <div
                      className={`border-red-800-200 mx-2 w-[159px] rounded-md border-r-[1px] p-1 px-3 dark:border-white dark:border-opacity-10
                        ${
                          project.status == 'completed'
                            ? 'bg-green-400'
                            : project.status == 'created'
                            ? 'bg-gray-200'
                            : project.status == 'in progress'
                            ? 'bg-orange-400'
                            : project.status == 'waiting'
                            ? 'bg-red-400'
                            : 'border-none bg-transparent text-transparent dark:bg-transparent'
                        }
                      `}
                    >
                      {project.status}
                    </div>
                    <div className="flex h-[calc(100%-11px)] w-[175px] items-center border-l-[1px] border-r-[1px] border-gray-200 px-3 py-1 dark:border-white dark:border-opacity-10">
                      {project.customer.name || 'Me'}
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

export const ProjectTableLoader = () => {
  return (
    <div className="relative my-6 rounded-lg bg-white py-3 text-tertiary dark:bg-primary dark:text-white">
      <h2 className="my-2 flex flex-row justify-between text-lg">
        <div className="ml-4 h-7 w-[175px] animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
      </h2>
      <div className="w-full overflow-x-hidden rounded-lg bg-white">
        <div className="relative table w-full max-w-full">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index + 1 == 10 ? '' : 'border-b-[1px]'
              } border-gray-200 py-2 dark:border-active`}
            >
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
