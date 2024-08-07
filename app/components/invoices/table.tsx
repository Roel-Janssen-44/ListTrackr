'use client';

import { useState } from 'react';
import { Button } from '@/app/components/button';
import { InvoiceTemplate } from '@/app/lib/definitions';
import Link from 'next/link';
import { Pencil } from 'lucide-react';

export default function InvoicesTable({ invoices }: { invoices }) {
  return (
    <>
      <div className="mb-8 flex flex-col flex-wrap gap-8">
        {invoices?.map((invoice) => (
          <div
            key={invoice.id}
            className="group relative flex h-10 w-full items-center rounded-lg p-8 shadow"
          >
            {/* <Button>
              <Pencil />
            </Button> */}
            <h3 className="">{invoice.id}</h3>
          </div>
        ))}
      </div>
      <div>
        {/* <Link href={'/dashboard/invoices/create'}> */}
        <Button>Create invoice</Button>
        {/* </Link> */}
      </div>
    </>
  );
}
