import { fetchProjectsTasks } from '@/app/lib/data';
import ProjectTasksTable from './project';
import { Suspense } from 'react';
import { ProjectTableLoader } from './table';

export default async function ProjectsTasks() {
  const projects = await fetchProjectsTasks();
  return (
    <>
      <Suspense fallback={<ProjectTableLoader />}>
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectTasksTable project={project} showTitle={true} />
          </div>
        ))}
      </Suspense>
    </>
  );
}
