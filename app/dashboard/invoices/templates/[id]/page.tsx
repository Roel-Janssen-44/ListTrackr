'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import DeleteInvoiceTemplateForm from '@/app/components/invoices/templates/deleteForm';

export default async function InvoiceTemplateEdit() {
  // Todo - fetch invoice
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
          Tamplate name
        </h1>

        <div className="flex flex-row justify-center gap-4">
          {/* Todo - update id based on invoice */}
          <DeleteInvoiceTemplateForm invoiceId={'invoice'} />
        </div>
      </div>
      <Suspense fallback={'Loading...'}>Todo - edit invoice template.</Suspense>
    </div>
  );
}
