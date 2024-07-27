// import InvoiceHeader from '@/app/components/invoice/invoice/header';
import TemplateHeader from '@/app/components/invoice/template/header';
// import PreviewHeader from '@/app/components/invoice/preview/header';

import { InvoiceTemplate } from '@/app/lib/definitions';

export default function Header({
  invoice,
  viewStyle,
}: {
  invoice: InvoiceTemplate;
  viewStyle: string;
}) {
  return (
    <>
      {viewStyle === 'template' && <TemplateHeader invoice={invoice} />}
      {/* {viewStyle === 'invoice' && <InvoiceHeader />} */}
      {/* {viewStyle === 'preview' && <PreviewHeader />} */}
    </>
  );
}
