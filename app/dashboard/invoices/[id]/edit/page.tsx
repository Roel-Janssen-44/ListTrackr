import { Suspense } from 'react';
import DeleteInvoiceForm from '@/app/components/invoices/deleteForm';
import { fetchInvoice } from '@/app/lib/data';
import InvoiceEditForm from '@/app/components/invoices/editForm';
import PreviousPage from '@/app/components/previousPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit invoice',
};

export default async function InvoiceEdit({
  params,
}: {
  params: { id: string };
}) {
  const invoiceId = params.id;
  const invoice = await fetchInvoice(invoiceId);
  return (
    <div className="w-full">
      <div className="mb-6 flex flex-row justify-start gap-6">
        <PreviousPage />

        <h1 className="my-auto mr-20 w-full self-baseline text-center text-2xl font-bold">
          {invoice.fieldGroups[3].fields[0].value}
        </h1>

        <div className="flex flex-row justify-center gap-4">
          <DeleteInvoiceForm invoiceId={invoiceId} />
        </div>
      </div>
      <Suspense fallback={'Loading...'}>
        <InvoiceEditForm invoiceTemplate={invoice} />
      </Suspense>
    </div>
  );
}
