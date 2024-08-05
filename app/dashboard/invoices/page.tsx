'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import InvoiceTemplateTable from '@/app/components/invoices/templates/table';
import { fetchInvoiceTemplates } from '@/app/lib/data';

export default async function Invoices() {
  const templates = await fetchInvoiceTemplates();
  return (
    <div className="w-full">
      <h1 className={`${exo.className} mb-4 text-3xl font-bold`}>Invoices</h1>
      <h2 className="mb-4 text-lg font-bold">Templates:</h2>
      <Suspense fallback={'Loading...'}>
        <InvoiceTemplateTable templates={templates} />
      </Suspense>
      <Suspense fallback={'Loading...'}>
        <h2 className="mb-4 mt-10 text-lg font-bold">Invoices:</h2>
      </Suspense>
    </div>
  );
}
