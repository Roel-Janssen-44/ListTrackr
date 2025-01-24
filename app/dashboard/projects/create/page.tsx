'use server';

import { exo } from '@/app/components/fonts';
import CreateProjectForm from '@/app/components/projects/createForm';

export default async function CreateProject() {
  return (
    <div className="w-full">
      <h1 className={`${exo.className} text-3xl font-bold`}>Create project</h1>
      <CreateProjectForm />
    </div>
  );
}
