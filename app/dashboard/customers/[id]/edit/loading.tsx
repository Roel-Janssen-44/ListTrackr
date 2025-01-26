import PreviousPage from '@/app/components/previousPage';

export default function LoadingCustomerEditForm() {
  return (
    <>
      <div className="mb-6 flex flex-row justify-start gap-6">
        <PreviousPage />
      </div>
      <div className="flex w-full animate-pulse flex-col gap-3 rounded-md bg-transparent pr-6">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="mb-1">
            <label className="mb-2 block text-sm text-gray-700">
              <div className="h-4 w-24 rounded-md bg-gray-300" />
            </label>
            <div className="w-full">
              <div className="h-10 w-full max-w-lg rounded-md bg-gray-300" />
            </div>
          </div>
        ))}
        <div className="flex flex-row gap-4">
          <div className="mt-4 h-10 w-24 rounded-md bg-gray-300" />
        </div>
      </div>
    </>
  );
}
