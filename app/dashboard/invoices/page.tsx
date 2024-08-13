'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import InvoiceTemplateTable from '@/app/components/invoices/templates/table';
import InvoiceTable from '@/app/components/invoices/table';
import { fetchInvoiceTemplates, fetchInvoices } from '@/app/lib/data';
import { Invoice } from '@/app/lib/definitions';

export default async function Invoices() {
  const templates = await fetchInvoiceTemplates();
  const invoices: Invoice[] = await fetchInvoices();

  return (
    <div className="w-full">
      <h1 className={`${exo.className} mb-4 text-3xl font-bold`}>Invoices</h1>
      <Suspense fallback={'Loading...'}>
        <InvoiceTable invoices={invoices} templates={templates} />
      </Suspense>
      <h2 className="mb-4 mt-8 text-lg font-bold">Templates:</h2>
      <Suspense fallback={'Loading...'}>
        <InvoiceTemplateTable templates={templates} />
      </Suspense>
    </div>
  );
}
