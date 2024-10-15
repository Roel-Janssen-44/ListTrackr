'use client';

import { useState } from 'react';
import { Button } from '@/app/components/button';
import { InvoiceTemplateName } from '@/app/lib/definitions';
import Link from 'next/link';
import { Pencil } from 'lucide-react';

export default function InvoiceTemplatesTable({
  templates,
}: {
  templates: InvoiceTemplateName[];
}) {
  return (
    <>
      <div className="mb-8 flex flex-row flex-wrap gap-8">
        {templates?.map((template) => (
          <div
            key={template.id}
            className="group relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-lg p-8 shadow"
          >
            <h3 className="text-center">{template.name}</h3>
            <div className="absolute top-full flex flex-row gap-4 opacity-0 transition-all group-hover:top-[75%] group-hover:opacity-100">
              <Link href={`/dashboard/invoices/create/${template.id}`}>
                <Button>Use</Button>
              </Link>
              <Link href={`/dashboard/invoices/templates/${template.id}`}>
                <button className="focus-visible:secondary flex h-10 flex-row items-center justify-center gap-2 rounded-lg border-2 border-primary bg-transparent px-4 py-3 text-center text-sm font-medium text-primary outline-tertiary transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50 hover:bg-black hover:bg-opacity-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-active dark:outline-white">
                  <Pencil />
                  Edit
                </button>
              </Link>
            </div>
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
