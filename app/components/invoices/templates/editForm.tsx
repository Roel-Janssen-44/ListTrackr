'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/app/components/button';
import Invoice from '@/app/components/invoice/invoice';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { InvoiceTemplate } from '@/app/lib/definitions';
import { Input } from '@/app/components/chadcn/input';
import { useRouter } from 'next/navigation';
import { updateInvoiceTemplate } from '@/app/lib/actions';

export default function CreateInvoiceTemplate({
  invoice,
}: {
  invoice: InvoiceTemplate;
}) {
  const [invoiceState, setInvoiceState] = useState(invoice);

  const router = useRouter();

  return (
    <>
      <Invoice
        invoice={invoiceState}
        setInvoice={setInvoiceState}
        viewStyle={'template'}
      />
      <div className="mt-6 flex flex-row gap-6">
        <Button
          onClick={() => {
            updateInvoiceTemplate(invoiceState);
            router.push(`/dashboard/invoices`);
          }}
        >
          Save
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
