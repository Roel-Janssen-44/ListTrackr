'use client';

import { useState } from 'react';
import { deleteProject } from '@/app/lib/actions';
import { Button } from '@/app/components/button';
import { Trash, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteProject({ projectId }: { projectId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleFormSubmission(formData: FormData) {
    setIsLoading(true);
    try {
      const status = await deleteProject(formData);
      if (status.success) {
        router.push(`/dashboard/projects`);
        setIsLoading(false);
      } else {
        console.error('Error deleting project:', status.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form action={handleFormSubmission}>
      <input name="id" type="hidden" value={projectId} />
      <Button type="submit">
        {isLoading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Trash size={24} />
        )}
      </Button>
    </form>
  );
}
