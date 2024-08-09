import InvoiceSettings from '@/app/components/invoice/invoice/settings';
import TemplateSettings from '@/app/components/invoice/template/settings';
// import PreviewSettings from '@/app/components/invoice/preview/Settings';

import { InvoiceTemplate } from '@/app/lib/definitions';

export default function Settings({
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
        <TemplateSettings setInvoice={setInvoice} invoice={invoice} />
      )}
      {viewStyle === 'invoice' && (
        <InvoiceSettings setInvoice={setInvoice} invoice={invoice} />
      )}
      {/* {viewStyle === 'preview' && <PreviewSettings />} */}
    </>
  );
}
