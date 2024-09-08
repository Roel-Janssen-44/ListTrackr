'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import DeleteProjectForm from '@/app/components/projects/deleteForm';
import { fetchProject } from '@/app/lib/data';
import { Pencil } from 'lucide-react';
import { Button } from '@/app/components/button';
// import Project from '@/app/components/projects/invoice';
export default async function ProjectView({
  params,
}: {
  params: { id: string };
}) {
  const projectId = params.id;
  const project = await fetchProject(projectId);
  console.log('project');
  console.log(project);
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

        {/* Todo - edit project */}
        {/* <div className="flex flex-row justify-center gap-4">
          <Link href={`/dashboard/projects/${params.id}/edit`}>
            <Button>
              <Pencil />
            </Button>
          </Link>
        </div> */}
        <div className="flex flex-row justify-center gap-4">
          <DeleteProjectForm projectId={projectId} />
        </div>
      </div>
      <Suspense fallback={'Loading...'}>
        Show project
        {/* <Project project={project} /> */}
      </Suspense>
    </div>
  );
}
