'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import DeleteProjectForm from '@/app/components/projects/deleteForm';
import { fetchProject, fetchCustomers } from '@/app/lib/data';
import { Pencil } from 'lucide-react';
import { Button } from '@/app/components/button';
import ProjectTasksTable from '@/app/components/projects/project';
import { format } from 'date-fns';

// import Project from '@/app/components/projects/invoice';

export default async function ProjectView({
  params,
}: {
  params: { id: string };
}) {
  const projectId = params.id;
  const project = await fetchProject(projectId);
  const customers = await fetchCustomers();

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-row justify-start gap-6">
        <Link
          href={'/dashboard/projects'}
          className="group flex flex-row items-center justify-center gap-1 hover:text-active"
        >
          <span className="mt-0.5 w-4">
            <ChevronLeftIcon className="stroke-[3]" />
          </span>{' '}
          <h2
            className={`${exo.className} my-auto self-baseline text-lg font-bold`}
          >
            Previous
          </h2>
        </Link>

        <h1 className="my-auto mr-20 w-full self-baseline text-center text-2xl font-bold">
          {project.title}
        </h1>

        <div className="flex flex-row justify-center gap-4">
          <DeleteProjectForm projectId={projectId} />
        </div>
      </div>
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
            <div
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
                <div className="my-1 w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
                  {format(project.startDate, 'dd/MM/yyyy')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={'Loading...'}>
        <ProjectTasksTable project={project} />
      </Suspense>
    </div>
  );
}
