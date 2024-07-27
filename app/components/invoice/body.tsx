import InvoiceBody from '@/app/components/invoice/invoice/body';
import TemplateBody from '@/app/components/invoice/template/body';
// import PreviewBody from '@/app/components/invoice/preview/body';

export default function Body({ viewStyle }) {
  return (
    <>
      {viewStyle === 'template' && <TemplateBody />}
      {/* {viewStyle === 'invoice' && <InvoiceBody />} */}
      {/* {viewStyle === 'preview' && <PreviewBody />} */}
    </>
  );
}
