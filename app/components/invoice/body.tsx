import InvoiceBody from '@/app/components/invoice/invoice/body';
import TemplateBody from '@/app/components/invoice/template/body';
// import PreviewBody from '@/app/components/invoice/preview/body';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function Body({
  invoice,
  viewStyle,
}: {
  invoice: InvoiceTemplate;
  viewStyle: string;
}) {
  return (
    <>
      {viewStyle === 'template' && <TemplateBody invoice={invoice} />}
      {/* {viewStyle === 'invoice' && <InvoiceBody />} */}
      {/* {viewStyle === 'preview' && <PreviewBody />} */}
    </>
  );
}
