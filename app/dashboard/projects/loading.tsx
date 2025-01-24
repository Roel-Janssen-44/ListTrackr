import { ProjectTableLoader } from '@/app/components/projects/table';
import { exo } from '@/app/components/fonts';

export default function LoadingProjects() {
  return (
    <>
      <h1 className={`${exo.className} text-3xl font-bold`}>Projects</h1>
      <ProjectTableLoader />
    </>
  );
}
