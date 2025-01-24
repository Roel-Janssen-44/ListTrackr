import Tables from '@/app/components/tasks/tables';
import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { TablesLoader } from '@/app/components/tasks/tables';

export const metadata: Metadata = {
  title: 'Tasks',
};

export default async function Page() {
  return (
    <div className="w-full">
      <h1 className={`${exo.className} text-3xl font-bold`}>Tasks</h1>
      <Suspense fallback={<TablesLoader />}>
        <Tables showCreateNewTable={true} />
      </Suspense>
    </div>
  );
}
