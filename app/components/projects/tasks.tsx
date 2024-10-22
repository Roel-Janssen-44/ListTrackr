import { fetchProjectsTasks } from '@/app/lib/data';
import ProjectTasksTable from './project';

export default async function ProjectsTasks() {
  const projects = await fetchProjectsTasks();

  return (
    <>
      {projects.map((project) => (
        <div key={project.id}>
          <ProjectTasksTable project={project} showTitle={true} />
        </div>
      ))}
    </>
  );
}
