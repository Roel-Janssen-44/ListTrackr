import InvoiceBody from '@/app/components/invoice/invoice/body';
import TemplateBody from '@/app/components/invoice/template/body';
// import PreviewBody from '@/app/components/invoice/preview/body';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function Body({
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
        <TemplateBody setInvoice={setInvoice} invoice={invoice} />
      )}
      {/* {viewStyle === 'invoice' && <InvoiceBody />} */}
      {/* {viewStyle === 'preview' && <PreviewBody />} */}
    </>
  );
}
