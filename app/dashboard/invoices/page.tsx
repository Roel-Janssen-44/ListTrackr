import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import InvoiceTemplateTable from '@/app/components/invoices/templates/table';
import InvoiceTable from '@/app/components/invoices/table';
import { fetchInvoiceTemplates, fetchInvoices } from '@/app/lib/data';
import { Invoice, InvoiceTemplateName } from '@/app/lib/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice templates',
};
export default async function Invoices() {
  const templates: InvoiceTemplateName[] = await fetchInvoiceTemplates();
  const invoices: Invoice[] = await fetchInvoices();

  return (
    <div className="w-full">
      <h1 className={`${exo.className} text-3xl font-bold`}>Invoices</h1>
      <Suspense fallback={'Loading...'}>
        <InvoiceTable invoices={invoices} templates={templates} />
      </Suspense>
      <h2 className="mb-4 mt-8 text-lg font-bold">Templates:</h2>
      <Suspense fallback={'Loading...'}>
        {templates.length === 0 && <p>No templates found.</p>}
        <InvoiceTemplateTable templates={templates} />
      </Suspense>
    </div>
  );
}
