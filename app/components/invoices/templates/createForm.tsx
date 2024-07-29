'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/app/components/button';
import Invoice from '@/app/components/invoice/invoice';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function CreateInvoiceTemplate() {
  const tempInvoice: InvoiceTemplate = {
    id: uuid(),
    name: 'Main-template',
    fieldGroups: [
      {
        id: uuid(),
        name: 'logo',
        position: 1,
        fields: [],
      },
      {
        id: uuid(),
        name: 'company',
        position: 2,
        fields: [
          {
            id: uuid(),
            name: 'Invoice of: ',
          },
          {
            id: uuid(),
            name: 'John doe',
          },
          {
            id: uuid(),
            name: 'Streetname 10',
          },
          {
            id: uuid(),
            name: '7263AP, Cityname',
          },
        ],
      },
      {
        id: uuid(),
        name: 'client',
        position: 3,
        fields: [
          {
            id: uuid(),
            name: 'Invoice for: ',
          },
          {
            id: uuid(),
            data: '',
          },
          {
            id: uuid(),
            data: '',
          },
          {
            id: uuid(),
            data: '',
          },
        ],
      },
      {
        id: uuid(),
        name: 'invoiceNumber',
        position: 4,
        fields: [
          {
            id: uuid(),
            name: 'Invoice number',
            data: '',
          },
          {
            id: uuid(),
            name: 'Invoice date',
            data: '',
          },
          {
            id: uuid(),
            name: 'Payment due',
            data: '',
          },
        ],
      },
      {
        id: uuid(),
        name: 'rowDescription',
        fields: [
          {
            id: uuid(),
            name: 'Description',
          },
          {
            id: uuid(),
            name: 'Price',
          },
          {
            id: uuid(),
            name: 'Amount',
          },
          {
            id: uuid(),
            name: 'Total',
          },
        ],
      },
      {
        id: uuid(),
        name: 'rows',
        fields: [
          {
            id: uuid(),
            name: 'Product description',
            price: 100,
            amount: 1,
          },
          {
            id: uuid(),
            name: 'Product description',
            price: 100,
            amount: 1,
          },
          {
            id: uuid(),
            name: 'Product description',
            price: 100,
            amount: 1,
          },
          {
            id: uuid(),
            name: 'Product description',
            price: 100,
            amount: 1,
          },
        ],
      },
      {
        id: uuid(),
        name: 'total',
        fields: [
          {
            id: uuid(),
            name: 'Subtotal:',
            value: 'Subtotal incl VAT',
          },
          {
            id: uuid(),
            name: 'VAT:',
            value: 'VAT 21%',
          },
          {
            id: uuid(),
            name: 'Total:',
            value: 'Total',
          },
        ],
      },
    ],
    message: '',
    settings: [
      { discountType: 'none' },
      { discountAmount: 0 },
      // Todo - add theme color
      // { themeColor: "#12a1c1" },
      { taxSetting: 'incl' },
      { taxAmount: 21 },
      { invoiceBase: '' },
      { invoiceAppendix: '' },
    ],
  };

  const [invoice, setInvoice] = useState(tempInvoice);

  useEffect(() => {
    console.log('invoice');
    console.log(invoice);
  }, [invoice]);

  const saveInvoice = () => {
    console.log('Save invoice');
    console.log(invoice);
  };

  return (
    <>
      <Invoice
        invoice={invoice}
        setInvoice={setInvoice}
        viewStyle={'template'}
      />
      <div className="mt-6 flex flex-row gap-6">
        <Button onClick={saveInvoice}>Save</Button>
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
