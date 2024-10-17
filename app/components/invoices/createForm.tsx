'use client';

import { useState, useEffect } from 'react';
import { createInvoice } from '@/app/lib/actions';
import { Button } from '@/app/components/button';
import { InvoiceTemplate } from '@/app/lib/definitions';
import Invoice from '@/app/components/invoice/invoice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateInvoiceComp({
  invoiceTemplate,
  templateId,
  projectId,
}: {
  invoiceTemplate: InvoiceTemplate;
  templateId: string;
  projectId?: string;
}) {
  const [invoice, setInvoice] = useState<InvoiceTemplate>(invoiceTemplate);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await createInvoice(invoice, templateId, projectId);
      if (response.success) {
        router.push(`/dashboard/invoices/${invoice.id}`);
      } else {
        console.error('Failed to create invoice.');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <>
      <Invoice invoice={invoice} setInvoice={setInvoice} viewStyle="invoice" />
      <div className="mt-6 flex flex-row gap-6">
        {/* Todo - check if all fields are correctly filled in */}
        <Button onClick={handleClick}>Create</Button>
        <Link
          href={'/dashboard/invoices'}
          className="focus-visible:secondary flex h-10 items-center justify-center rounded-lg border-2 border-primary bg-primary bg-transparent px-4 py-3 text-center text-sm font-medium text-primary outline-tertiary transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Cancel
        </Link>
      </div>
    </>
  );
}
