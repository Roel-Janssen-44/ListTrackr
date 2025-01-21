import { Suspense } from 'react';
import {
  fetchCustomer,
  fetchProjectsFromCustomer,
  fetchInvoicesFromCustomer,
} from '@/app/lib/data';
import { Customer, Invoice, Project } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/components/button';
import { Pencil } from 'lucide-react';
import DeleteCustomerForm from '@/app/components/customers/deleteForm';
import PreviousPage from '@/app/components/previousPage';
import { Metadata } from 'next';
import ProjectInvoices from '@/app/components/invoices/table';
import ProjectTasksTable from '@/app/components/projects/project';

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
  const invoices: Invoice[] = await fetchInvoicesFromCustomer(params.id);

  return (
    <div className="w-full">
      <div className="relative mb-24 flex flex-row justify-between gap-6 sm:mb-0 sm:justify-start">
        <PreviousPage />

        <h1 className="my-auto mr-20 w-full self-baseline text-center text-2xl font-bold">
          {customer.name}
        </h1>

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
        {projects.map((project) => (
          <ProjectTasksTable
            project={project}
            showTitle
            title={project.title}
          />
        ))}
      </Suspense>

      <Suspense fallback={'Loading...'}>
        <div className="mt-10">
          <ProjectInvoices
            projectId={''}
            invoices={invoices}
            templates={[]}
            showTemplates={false}
          />
        </div>
      </Suspense>
    </div>
  );
}
