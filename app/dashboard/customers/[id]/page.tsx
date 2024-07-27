'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import { fetchCustomer } from '@/app/lib/data';
import { Customer } from '@/app/lib/definitions';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import EditCustomerForm from '@/app/components/customers/editForm';
import { Button } from '@/app/components/button';
import { Pencil } from 'lucide-react';
import DeleteCustomerForm from '@/app/components/customers/deleteForm';

export default async function CustomerPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const customer: Customer = await fetchCustomer(params.id);
  return (
    <div className="w-full">
      <div className="mb-6 flex flex-row justify-start gap-6">
        <Link
          href={'/dashboard/customers'}
          className="group flex flex-row items-center justify-center gap-1 hover:text-active"
        >
          <span className="mt-0.5 w-4">
            <ChevronLeftIcon className="stroke-[3]" />
          </span>{' '}
          <h2
            className={`${exo.className} my-auto self-baseline text-lg font-bold`}
          >
            Previous
          </h2>
        </Link>

        <h1 className="my-auto mr-20 w-full self-baseline text-center text-2xl font-bold">
          {customer.name}
        </h1>

        {/* Edit customer data */}
        <div className="flex flex-row justify-center gap-4">
          <Link href={`/dashboard/customers/${params.id}/edit`}>
            <Button className="flex gap-2">
              <Pencil />
            </Button>
          </Link>
          <DeleteCustomerForm customerId={customer.id} />
        </div>
      </div>
      <Suspense fallback={'Loading...'}>
        {/* <EditCustomerForm customer={customer} /> */}
        Todo - implement dashboard with invoices and project.
      </Suspense>
    </div>
  );
}
