import { Suspense } from 'react';
import InvoiceCreateForm from '@/app/components/invoices/createForm';
import { fetchInvoiceTemplate } from '@/app/lib/data';
import { InvoiceTemplate } from '@/app/lib/definitions';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import PreviousPage from '@/app/components/previousPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create invoice',
};

export default async function InvoiceTemplateCreation({
  params,
}: {
  params: { id: string };
}) {
  let invoiceTemplate: InvoiceTemplate = await fetchInvoiceTemplate(params.id);

  // Generate new id's to prevent duplicate id's from the template
  invoiceTemplate.id = uuid();
  invoiceTemplate.fieldGroups.forEach((fieldGroup) => {
    fieldGroup.id = uuid();
    fieldGroup.fields.forEach((field) => {
      field.id = uuid();
    });

    // Auto generate date and invcoice number
    if (fieldGroup.name == 'invoiceNumber') {
      fieldGroup.fields[0].value =
        invoiceTemplate.settings.invoiceBase +
        invoiceTemplate.invoiceCount *
          Number(invoiceTemplate.settings.invoiceAppendix);
      fieldGroup.fields[1].value = format(new Date(), 'dd-MM-yyyy');
    }
  });

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-row justify-start gap-6">
        <PreviousPage />
      </div>
      <Suspense fallback={'Loading...'}>
        <InvoiceCreateForm invoiceTemplate={invoiceTemplate} />
      </Suspense>
    </div>
  );
}
