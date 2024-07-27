'use server';

import { exo } from '@/app/components/fonts';
import { Suspense } from 'react';
import Link from 'next/link';

export default async function Invoices() {
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
