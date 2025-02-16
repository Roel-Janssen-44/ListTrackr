import { Suspense } from 'react';
import Link from 'next/link';
import DeleteInvoiceForm from '@/app/components/invoices/deleteForm';
import { fetchInvoice } from '@/app/lib/data';
import { Pencil } from 'lucide-react';
import { Button } from '@/app/components/button';
import Invoice from '@/app/components/invoice/invoice';
import PreviousPage from '@/app/components/previousPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice',
};

export default async function InvoiceView(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  const invoiceId = params.id;
  const invoice = await fetchInvoice(invoiceId);
  return (
    <div className="w-full">
      <div className="mb-6 flex flex-row justify-start gap-6">
        <PreviousPage />

        <h1 className="my-auto mr-20 w-full self-baseline text-center text-2xl font-bold">
          {invoice.fieldGroups[3]?.fields[0].value}
        </h1>

        <div className="flex flex-row justify-center gap-4">
          <Link href={`/dashboard/invoices/${params.id}/edit`}>
            <Button>
              <Pencil />
            </Button>
          </Link>
        </div>
        <div className="flex flex-row justify-center gap-4">
          <DeleteInvoiceForm invoiceId={invoiceId} />
        </div>
      </div>
      <Suspense fallback={'Loading...'}>
        <Invoice invoice={invoice} setInvoice={null} viewStyle="preview" />
      </Suspense>
    </div>
  );
}
