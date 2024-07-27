// import InvoiceFooter from '@components/invoice/invoice/footer';
import TemplateFooter from '@components/invoice/template/footer';
// import PreviewFooter from '@components/invoice/preview/footer';

export default function Footer({ viewStyle }) {
  return (
    <>
      {viewStyle === 'template' && <TemplateFooter />}
      {/* {viewStyle === 'invoice' && <InvoiceFooter />}
      {viewStyle === 'preview' && <PreviewFooter />} */}
    </>
  );
}
