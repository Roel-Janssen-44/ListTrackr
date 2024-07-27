'use client';

import { useState } from 'react';
import { Button } from '@/app/components/button';
import { InvoiceTemplate } from '@/app/lib/definitions';
import Link from 'next/link';

export default function InvoicesTable({
  templates,
}: {
  templates: InvoiceTemplate[];
}) {
  return (
    <>
      <div>
        <p>Invoice table</p>
        {templates?.map((template) => (
          <div key={template.id}>
            <p>{template.id}</p>
          </div>
        ))}
      </div>
      <div>
        <Link href={'/dashboard/invoices/templates/create'}>
          <Button>Create template</Button>
        </Link>
      </div>
    </>
  );
}
