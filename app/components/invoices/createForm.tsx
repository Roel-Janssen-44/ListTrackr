'use client';

import { useState } from 'react';
// import { createInvoice } from '@/app/lib/actions';
import { Input } from '@/app/components/chadcn/input';
import { Button } from '@/app/components/button';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function CreateInvoice({
  invoiceTemplate,
}: {
  invoiceTemplate: InvoiceTemplate;
}) {
  console.log('invoiceTemplate: ');
  console.log(invoiceTemplate);

  return (
    <>
      <p>Invoice create form</p>
    </>
  );
}
