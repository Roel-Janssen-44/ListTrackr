'use client';

import Header from '@/app/components/invoice/header';
import Body from '@/app/components/invoice/body';
import Footer from '@/app/components/invoice/footer';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function Invoice({
  invoice,
  viewStyle,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  viewStyle: string;
  setInvoice: Function;
}) {
  return (
    <div className="flex max-w-2xl flex-1 flex-row rounded-xl shadow-xl">
      <div
        className={`flex-1 overflow-visible p-8 ${
          viewStyle === 'preview' ? 'h-[950px]' : ''
        } `}
      >
        <Header
          invoice={invoice}
          setInvoice={setInvoice}
          viewStyle={viewStyle}
        />
        <Body invoice={invoice} setInvoice={setInvoice} viewStyle={viewStyle} />
        <Footer
          invoice={invoice}
          setInvoice={setInvoice}
          viewStyle={viewStyle}
        />
      </div>
    </div>
  );
}
