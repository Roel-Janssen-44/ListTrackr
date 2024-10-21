import { fetchProjectsTasks } from '@/app/lib/data';

export default async function ProjectsTasks() {
  const projects = await fetchProjectsTasks();

  return (
    <div>
      <p>Projects</p>
      {projects.map((project) => (
        <div key={project.id}>
          <p>{project.title}</p>
          {project.tasks.map((task) => (
            <div key={task.id}>
              <p>{task.title}</p>
              <p>{task.status}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
