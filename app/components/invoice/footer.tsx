// import InvoiceFooter from '@components/invoice/invoice/footer';
import TemplateFooter from '@components/invoice/template/footer';
// import PreviewFooter from '@components/invoice/preview/footer';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function Footer({
  invoice,
  viewStyle,
}: {
  invoice: InvoiceTemplate;
  viewStyle: string;
}) {
  return (
    <>
      {viewStyle === 'template' && <TemplateFooter invoice={invoice} />}
      {/* {viewStyle === 'invoice' && <InvoiceFooter />}
      {viewStyle === 'preview' && <PreviewFooter />} */}
    </>
  );
}
