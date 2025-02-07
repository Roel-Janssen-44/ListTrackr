import InvoiceFooter from '@components/invoice/invoice/footer';
import TemplateFooter from '@components/invoice/template/footer';
import PreviewFooter from '@components/invoice/preview/footer';
import { InvoiceTemplate } from '@/app/lib/types';

export default function Footer({
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
        <TemplateFooter setInvoice={setInvoice} invoice={invoice} />
      )}
      {viewStyle === 'invoice' && (
        <InvoiceFooter invoice={invoice} setInvoice={setInvoice} />
      )}
      {viewStyle === 'preview' && <PreviewFooter invoice={invoice} />}
    </>
  );
}
