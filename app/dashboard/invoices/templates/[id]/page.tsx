import { Suspense } from 'react';
import DeleteInvoiceTemplateForm from '@/app/components/invoices/deleteForm';
import EditInvoiceTemplate from '@/app/components/invoices/templates/editForm';
import { fetchInvoice } from '@/app/lib/data';
import PreviousPage from '@/app/components/previousPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice template',
};

export default async function InvoiceTemplateEdit({
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
          {invoice.name}
        </h1>

        <div className="flex flex-row justify-center gap-4">
          <DeleteInvoiceTemplateForm invoiceId={invoiceId} />
        </div>
      </div>
      <Suspense fallback={'Loading...'}>
        <EditInvoiceTemplate invoice={invoice} />
      </Suspense>
    </div>
  );
}
