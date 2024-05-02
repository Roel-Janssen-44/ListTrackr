import GoalTables from '@/app/components/goals/tables';
import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Tasks',
};

export default async function Page() {
  return (
    <div className="w-full">
      <h1 className={`${exo.className} mb-4 text-3xl font-bold`}>Goals</h1>
      <Suspense fallback={'fallback'}>
        <GoalTables showCreateNewTable={true} />
      </Suspense>
    </div>
  );
}
