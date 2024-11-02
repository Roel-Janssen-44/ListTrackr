'use client';

import { Input } from '@/app/components/chadcn/input';
import { Project } from '@/app/lib/definitions';
import { exo } from '@/app/components/fonts';
import { updateProjectTitle } from '@/app/lib/actions';

export default function ProjectTitle({ project }: { project: Project }) {
  const handleChange = (newValue: string) => {
    updateProjectTitle({ projectId: project.id, newValue: newValue });
  };

  return (
    <div className="w-full flex-1">
      <Input
        className={`${exo.className} mx-auto my-auto w-full self-baseline border-none bg-transparent text-center text-2xl font-bold sm:w-[300px]`}
        defaultValue={project.title}
        onBlur={(e) => {
          handleChange(e.target.value);
        }}
      />
    </div>
  );
}
