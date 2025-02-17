'use client';

import { useState, useEffect } from 'react';
import { updateInvoice } from '@/app/lib/actions';
import { Button } from '@/app/components/button';
import { InvoiceTemplate } from '@/app/lib/types';
import Invoice from '@/app/components/invoice/invoice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateInvoice({
  invoiceTemplate,
}: {
  invoiceTemplate: InvoiceTemplate;
}) {
  const [invoice, setInvoice] = useState<InvoiceTemplate>(invoiceTemplate);
  const router = useRouter();

  //   useEffect(() => {
  //     console.log('invoice edit form');
  //     console.log(invoice);
  //   }, [invoice]);

  return (
    <>
      <Invoice invoice={invoice} setInvoice={setInvoice} viewStyle="invoice" />
      <div className="mt-6 flex flex-row gap-6">
        <Button
          onClick={() => {
            updateInvoice(invoice);
            router.push(`/dashboard/invoices`);
          }}
        >
          Update
        </Button>
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
