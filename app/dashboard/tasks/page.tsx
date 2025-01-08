import Tables from '@/app/components/tasks/tables';
import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tasks',
};

export default async function Page() {
  return (
    <div className="w-full">
      <h1 className={`${exo.className} text-3xl font-bold`}>Tasks</h1>
      <Tables showCreateNewTable={true} />
    </div>
  );
}
