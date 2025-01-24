import { exo } from '@/app/components/fonts';

export default function LoadingProjectCreatePage() {
  return (
    <>
      <h1 className={`${exo.className} text-3xl font-bold`}>Create project</h1>
      <div className="mt-6 flex max-w-md animate-pulse flex-col gap-2">
        <div>
          <div className="h-5 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="mt-1 h-10 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
        <div>
          <div className="h-5 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="mt-1 h-10 w-full rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
        <div>
          <div className="h-5 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="mt-1 h-10 w-[180px] rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
        <div>
          <div className="h-5 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="mt-1 h-10 w-[180px] rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
        <div>
          <div className="h-5 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="mt-1 h-10 w-[180px] rounded-md bg-gray-300 dark:bg-gray-700" />
        </div>
        <div className="mt-2 h-10 w-[180px] rounded-md bg-gray-300 dark:bg-gray-700" />
      </div>
    </>
  );
}
