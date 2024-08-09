'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import DeleteInvoiceForm from '@/app/components/invoices/deleteForm';
import { fetchInvoice } from '@/app/lib/data';
import { Pencil } from 'lucide-react';
import { Button } from '@/app/components/button';
import Invoice from '@/app/components/invoice/invoice';
export default async function InvoiceView({
  params,
}: {
  params: { id: string };
}) {
  const invoiceId = params.id;
  const invoice = await fetchInvoice(invoiceId);
  return (
    <div className="w-full">
      <div className="mb-6 flex flex-row justify-start gap-6">
        <Link
          href={'/dashboard/invoices'}
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
          {invoice.fieldGroups[3].fields[0].value}
        </h1>

        <div className="flex flex-row justify-center gap-4">
          <Link href={`/dashboard/invoices/${params.id}/edit`}>
            <Button>
              <Pencil />
            </Button>
          </Link>
        </div>
        <div className="flex flex-row justify-center gap-4">
          <DeleteInvoiceForm invoiceId={'invoice'} />
        </div>
      </div>
      <Suspense fallback={'Loading...'}>
        <Invoice invoice={invoice} setInvoice={null} viewStyle="preview" />
      </Suspense>
    </div>
  );
}
