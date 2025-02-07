import InvoiceHeader from '@/app/components/invoice/invoice/header';
import TemplateHeader from '@/app/components/invoice/template/header';
import PreviewHeader from '@/app/components/invoice/preview/header';

import { InvoiceTemplate } from '@/app/lib/types';

export default function Header({
  invoice,
  viewStyle,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  viewStyle: string;
  setInvoice: Function;
}) {
  return (
    <>
      {viewStyle === 'template' && (
        <TemplateHeader setInvoice={setInvoice} invoice={invoice} />
      )}
      {viewStyle === 'invoice' && (
        <InvoiceHeader setInvoice={setInvoice} invoice={invoice} />
      )}
      {viewStyle === 'preview' && <PreviewHeader invoice={invoice} />}
    </>
  );
}
