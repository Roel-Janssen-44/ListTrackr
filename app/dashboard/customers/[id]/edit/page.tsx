import { Suspense } from 'react';
import { fetchCustomer } from '@/app/lib/data';
import { Customer } from '@/app/lib/definitions';
import EditCustomerForm from '@/app/components/customers/editForm';
import PreviousPage from '@/app/components/previousPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit customer',
};

export default async function EditCustomerPage({
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
        <PreviousPage />
      </div>
      <Suspense fallback={'Loading...'}>
        <EditCustomerForm customer={customer} />
      </Suspense>
    </div>
  );
}
