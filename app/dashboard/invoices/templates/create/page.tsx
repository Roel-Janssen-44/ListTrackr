import { Suspense } from 'react';
import CreateInvoiceTemplate from '@/app/components/invoices/templates/createForm';
import { InvoiceTemplate } from '@/app/lib/definitions';
import { createInvoiceTemplate } from '@/app/lib/actions';
import PreviousPage from '@/app/components/previousPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create invoice template',
};

export default async function InvoiceTemplateCreation() {
  async function createTemplate(invoice: InvoiceTemplate) {
    'use server';
    createInvoiceTemplate(invoice);
  }
  return (
    <div className="w-full">
      <div className="mb-6 flex flex-row justify-start gap-6">
        <PreviousPage />
      </div>
      <Suspense fallback={'Loading...'}>
        <CreateInvoiceTemplate createTemplate={createTemplate} />
      </Suspense>
    </div>
  );
}
