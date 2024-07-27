'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import Link from 'next/link';
import InvoiceTemplateTable from '@/app/components/invoices/templates/table';
import { getInvoiceTemplates } from '@/app/lib/data';

export default async function Invoices() {
  const templates = await getInvoiceTemplates();
  return (
    <div className="w-full">
      <h1 className={`${exo.className} mb-4 text-3xl font-bold`}>Invoices</h1>
      <p>Templates:</p>
      <Suspense fallback={'Loading...'}>
        <InvoiceTemplateTable templates={templates} />
      </Suspense>
      <Suspense fallback={'Loading...'}>
        <p>Invoices:</p>
      </Suspense>
    </div>
  );
}
