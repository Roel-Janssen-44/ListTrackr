'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
// import { fetchInvoices } from '@/app/lib/data';
// import { Invoice } from '@/app/lib/definitions';
import Link from 'next/link';
// import InvoiceCreationForm from '@/app/components/invoices/createForm';

export default async function Invoices() {
  //   const invoices = await fetchInvoices();
  //   const invoices = [];
  return (
    <div className="w-full">
      <h1 className={`${exo.className} mb-4 text-3xl font-bold`}>Invoices</h1>
      <Suspense fallback={'fallback'}>
        <p>Templates:</p>
      </Suspense>
      <Suspense fallback={'fallback'}>
        <p>Invoices:</p>
      </Suspense>
    </div>
  );
}
