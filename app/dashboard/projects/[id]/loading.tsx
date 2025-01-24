import { ProjectHeaderLoader } from '@/app/components/projects/projectHeader';
import { TableLoader } from '@/app/components/tasks/table';
import { InvoicesTableLoader } from '@/app/components/invoices/table';

export default function LoadingProjectPage() {
  return (
    <>
      <div className="relative mb-24 flex flex-row justify-between gap-6 sm:mb-0 sm:justify-start">
        <div className="h-6 w-40 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>

        <div className="absolute left-0 top-full my-auto mt-6 flex w-full items-center justify-center self-baseline text-center text-2xl font-bold sm:relative sm:mt-0">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex flex-row justify-center gap-4">
          <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
      <ProjectHeaderLoader />
      <TableLoader />
      <InvoicesTableLoader />
    </>
  );
}
