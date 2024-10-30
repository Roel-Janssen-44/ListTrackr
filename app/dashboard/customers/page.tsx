import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import { fetchCustomers } from '@/app/lib/data';
import { Customer } from '@/app/lib/definitions';
import Link from 'next/link';
import CustomerCreationForm from '@/app/components/customers/createForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Customers() {
  const customers = await fetchCustomers();

  return (
    <div className="w-full">
      <h1 className={`${exo.className} mb-4 text-3xl font-bold`}>Customers</h1>
      <Suspense fallback={'fallback'}>
        <div className="relative my-6 rounded-lg bg-white p-3 text-tertiary dark:bg-primary dark:text-white">
          <div className="w-full overflow-x-auto rounded-lg bg-white scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-secondary">
            {customers.length != 0 && (
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
            )}
            <div className="relative block max-h-[600px] w-full max-w-full overflow-y-auto scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3">
              {customers.length != 0 &&
                customers.map((customer: Customer) => (
                  <Link
                    href={`/dashboard/customers/${customer.id}`}
                    key={customer.id}
                    className={`relative flex flex-row border-t-[1px] border-gray-200 odd:bg-gray-50 dark:border-white dark:border-opacity-10 dark:odd:bg-primary`}
                  >
                    <div className="group flex w-full flex-row flex-nowrap items-center text-sm transition-colors hover:bg-gray-100 dark:hover:bg-active">
                      <div className="w-1/2 px-3 py-4 dark:border-white dark:border-opacity-10 md:w-[250px] lg:w-[350px]">
                        {customer.name}
                      </div>
                      <div className="w-1/2 px-3 py-4 dark:border-white dark:border-opacity-10 md:w-[250px] lg:w-[350px]">
                        {customer.email}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </Suspense>
      <div className="mt-6">
        <CustomerCreationForm />
      </div>
    </div>
  );
}
