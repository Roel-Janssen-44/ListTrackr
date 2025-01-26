import { exo } from '@/app/components/fonts';

export default function CustomerListLoader() {
  return (
    <>
      <h1 className={`${exo.className} text-3xl font-bold`}>Customers</h1>
      <div className="relative my-6 rounded-lg bg-white p-3 text-tertiary dark:bg-primary dark:text-white">
        <div className="w-full overflow-x-auto rounded-lg bg-white scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-secondary">
          <div className="text-left text-sm font-normal">
            <div className="flex flex-row">
              <div className="mb-3 w-full flex-1 px-3 py-3 pb-2 font-medium sm:pl-3 md:w-[250px] md:flex-none lg:w-[350px]">
                Name
              </div>
              <div className="mb-3 w-full flex-1 px-3 py-3 pb-2 font-medium sm:pl-3 md:w-[250px] md:flex-1 lg:w-[350px]">
                Email
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto rounded-lg bg-white scrollbar dark:bg-secondary">
          <div className="relative block w-full max-w-full overflow-y-auto">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="relative flex animate-pulse flex-row border-t-[1px] border-gray-200 odd:bg-gray-50 dark:border-white dark:border-opacity-10 dark:odd:bg-primary"
              >
                <div className="group flex w-full flex-row flex-nowrap items-center text-sm">
                  <div className="my-3 h-6 w-1/2 rounded-md bg-gray-300 px-3 py-3 dark:bg-gray-700 md:w-[250px] lg:w-[350px]" />
                  <div className="my-3 ml-3 h-6 w-1/2 rounded-md bg-gray-300 px-3 py-3 dark:bg-gray-700 md:w-[250px] lg:w-[350px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
