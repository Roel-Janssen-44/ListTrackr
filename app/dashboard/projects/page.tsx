'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import Link from 'next/link';
import ProjectsTable from '@/app/components/projects/table';
import { fetchProjects } from '@/app/lib/data';
import { Project } from '@/app/lib/definitions';

export default async function Projects() {
  const projects: Project[] | undefined = await fetchProjects();

  return (
    <div className="w-full">
      <h1 className={`${exo.className} mb-4 text-3xl font-bold`}>Projects</h1>
      <Suspense fallback={'Loading...'}>
        <ProjectsTable projects={projects} />
      </Suspense>
    </div>
  );
}
