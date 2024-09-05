'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import CreateProjectForm from '@/app/components/projects/createForm';

export default async function CreateProject() {
  return (
    <div className="w-full">
      <h1 className={`${exo.className} mb-4 text-3xl font-bold`}>
        Create project
      </h1>
      <Suspense fallback={'Loading...'}>
        <CreateProjectForm />
      </Suspense>
    </div>
  );
}
