import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import ProjectsTable, {
  ProjectTableLoader,
} from '@/app/components/projects/table';
import { fetchProjects } from '@/app/lib/data';
import { Project } from '@/app/lib/definitions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function Projects() {
  const projects: Project[] | undefined = await fetchProjects();

  return (
    <div className="w-full">
      <h1 className={`${exo.className} text-3xl font-bold`}>Projects</h1>
      <Suspense fallback={<ProjectTableLoader />}>
        <ProjectsTable projects={projects} />
      </Suspense>
    </div>
  );
}
