import GoalTables from '@/app/components/goals/tables';
import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Goals',
};

export default async function Page() {
  return (
    <div className="w-full">
      <h1 className={`${exo.className} text-3xl font-bold`}>Goals</h1>
      <GoalTables showCreateNewTable={true} />
    </div>
  );
}
