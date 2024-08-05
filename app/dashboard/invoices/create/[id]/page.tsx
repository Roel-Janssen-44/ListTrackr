'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import InvoiceCreateForm from '@/app/components/invoices/createForm';
import { fetchInvoiceTemplate } from '@/app/lib/data';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default async function InvoiceTemplateCreation({
  params,
}: {
  params: { id: string };
}) {
  const invoiceTemplate: InvoiceTemplate = await fetchInvoiceTemplate(
    params.id,
  );
  return (
    <div className="w-full">
      <div className="mb-6 flex flex-row justify-start gap-6">
        <Link
          href={`/dashboard/invoices`}
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
      </div>
      <Suspense fallback={'Loading...'}>
        Todo - create invoice based on template
        <InvoiceCreateForm invoiceTemplate={invoiceTemplate} />
      </Suspense>
    </div>
  );
}
