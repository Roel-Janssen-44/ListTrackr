'use client';

import InvoiceLogoUpload from './logo';
import InvoiceCompanyData from './companydata';
import InvoiceInvoiceNumber from './invoiceNumber';
import InvoiceClientData from './clientData';
import { InvoiceTemplate } from '@/app/lib/definitions';

import { getCurrentFieldGroup } from '@/app/lib/utils';

export default function InvoiceHeader({
  invoice,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  return (
    <ul className="m-0 grid grid-cols-2 gap-4 gap-y-8 p-4 pb-0">
      <div className="">
        <InvoiceLogoUpload />
      </div>
      <div className="">
        <InvoiceInvoiceNumber
          setInvoice={setInvoice}
          invoice={invoice}
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'invoiceNumber')}
        />
      </div>
      <div className="">
        <InvoiceClientData
          setInvoice={setInvoice}
          invoice={invoice}
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'client')}
        />
      </div>
      <div className="">
        <InvoiceCompanyData
          fields={getCurrentFieldGroup(invoice.fieldGroups, 'company')}
        />
      </div>
    </ul>
  );
}
