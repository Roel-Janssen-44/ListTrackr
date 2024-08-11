'use client';

import Header from '@/app/components/invoice/header';
import Body from '@/app/components/invoice/body';
import Footer from '@/app/components/invoice/footer';
import Settings from '@/app/components/invoice/settings';

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
    <div className="flex flex-row flex-wrap justify-between">
      <div className="w-[704px] min-w-[704px] max-w-[704px] flex-1 rounded-xl shadow-xl">
        <div
          className={`flex-1 overflow-visible p-8 ${
            viewStyle === 'preview'
              ? 'flex h-[950px] flex-col justify-between'
              : ''
          } `}
        >
          <Header
            invoice={invoice}
            setInvoice={setInvoice}
            viewStyle={viewStyle}
          />
          <Body
            invoice={invoice}
            setInvoice={setInvoice}
            viewStyle={viewStyle}
          />
          <Footer
            invoice={invoice}
            setInvoice={setInvoice}
            viewStyle={viewStyle}
          />
        </div>
      </div>
      <Settings
        viewStyle={viewStyle}
        invoice={invoice}
        setInvoice={setInvoice}
      />
    </div>
  );
}
