import { Suspense } from 'react';
import { fetchCustomer, fetchProjectsFromCustomer } from '@/app/lib/data';
import { Customer, Project } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/components/button';
import { Pencil } from 'lucide-react';
import DeleteCustomerForm from '@/app/components/customers/deleteForm';
import PreviousPage from '@/app/components/previousPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer',
};

export default async function CustomerPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const customer: Customer = await fetchCustomer(params.id);
  const projects: Project[] = await fetchProjectsFromCustomer(params.id);
  // console.log('customer');
  // console.log(customer);
  console.log('projects');
  console.log(projects);

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-row justify-start gap-6">
        <PreviousPage />

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
