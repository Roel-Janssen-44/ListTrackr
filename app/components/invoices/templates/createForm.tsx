'use client';

import { useState } from 'react';

import { Button } from '@/app/components/button';
import Invoice from '@/app/components/invoice/invoice';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { InvoiceTemplate } from '@/app/lib/types';
import { useRouter } from 'next/navigation';
import { createInvoiceTemplate } from '@/app/lib/actions';

export default function CreateInvoiceTemplate() {
  const tempInvoice: InvoiceTemplate = {
    id: uuid(),
    name: '',
    fieldGroups: [
      {
        id: uuid(),
        name: 'logo',
        position: 1,
        fields: [
          {
            id: uuid(),
            data: '',
          },
        ],
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
            price: 0,
            amount: 0,
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
            value: '',
          },
          {
            id: uuid(),
            name: 'VAT amount:',
            value: '',
          },
          {
            id: uuid(),
            name: 'Total:',
            value: '',
          },
        ],
      },
    ],
    message: '',
    settings: {
      discountType: 'none',
      discountAmount: 0,
      themeColor: '#5E0035',
      // Todo - update taxSetting to correct type
      // @ts-ignore
      taxSetting: '',
      taxAmount: '',
      invoiceBase: '',
      invoiceAppendix: '',
    },
  };

  const [invoice, setInvoice] = useState(tempInvoice);

  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await createInvoiceTemplate(invoice);
      console.log('response', response);
      if (response.success) {
        router.push(`/dashboard/invoices/create/${invoice.id}`);
      } else {
        console.error('Failed to create invoice.');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };
  return (
    <>
      <Invoice
        invoice={invoice}
        setInvoice={setInvoice}
        viewStyle={'template'}
      />
      <div className="mt-6 flex flex-row gap-6">
        <Button onClick={handleClick}>Save</Button>

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
