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
            className="group relative flex w-full items-center rounded-lg shadow"
          >
            <Link href={`/dashboard/invoices/${invoice.id}/edit`}>
              <Button>
                <Pencil />
              </Button>
            </Link>
            <Link href={`/dashboard/invoices/${invoice.id}`}>
              <h3 className="">{invoice.id}</h3>
            </Link>
          </div>
        ))}
      </div>
      <div>
        {/* Todo - display modal to select invoice template */}
        <Button>Create invoice</Button>
      </div>
    </>
  );
}
