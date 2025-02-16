import { Suspense } from 'react';
import CreateInvoice from '@/app/components/invoices/createForm';
import { fetchInvoiceTemplate } from '@/app/lib/data';
import { InvoiceTemplate } from '@/app/lib/types';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import PreviousPage from '@/app/components/previousPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create invoice',
};

export default async function InvoiceTemplateCreation(
  props: {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ projectId: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const invoiceTemplate: InvoiceTemplate = await fetchInvoiceTemplate(
    params.id,
  );

  let newInvoice: InvoiceTemplate = { ...invoiceTemplate };

  // Generate new id's to prevent duplicate id's from the template
  newInvoice.id = uuid();
  newInvoice.fieldGroups.forEach((fieldGroup) => {
    fieldGroup.id = uuid();
    fieldGroup.fields.forEach((field) => {
      field.id = uuid();
    });

    // Auto generate date and invcoice number
    if (fieldGroup.name == 'invoiceNumber') {
      const invoiceCount = newInvoice.invoiceCount + 1;
      const invoiceAppendix = Number(newInvoice.settings.invoiceAppendix);
      const invoiceBaseStr = newInvoice.settings.invoiceBase;

      const lastNumberMatch = invoiceBaseStr.match(/(\d+)(?!.*\d)/);
      const invoiceBase = lastNumberMatch ? Number(lastNumberMatch[0]) : 0;

      const newNumber = String(invoiceBase + invoiceCount * invoiceAppendix);
      const newInvoiceBaseStr = invoiceBaseStr.replace(
        /(\d+)(?!.*\d)/,
        newNumber,
      );

      fieldGroup.fields[0].value = newInvoiceBaseStr;
      fieldGroup.fields[1].value = format(new Date(), 'dd-MM-yyyy');
    }
  });

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-row justify-start gap-6">
        <PreviousPage />
      </div>
      <Suspense fallback={'Loading...'}>
        <CreateInvoice
          invoiceTemplate={newInvoice}
          templateId={invoiceTemplate.id}
          projectId={searchParams?.projectId || null}
        />
      </Suspense>
    </div>
  );
}
