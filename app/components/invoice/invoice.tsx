import Header from '@/app/components/invoice/header';
import Body from '@/app/components/invoice/body';
import Footer from '@/app/components/invoice/footer';
import { v4 as uuid } from 'uuid';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function Invoice({ viewStyle }) {
  const invoice: InvoiceTemplate = {
    id: uuid(),
    name: 'Main-template',
    fieldGroups: [
      {
        id: uuid(),
        name: 'logo',
        position: 1,
        fields: [],
      },
      {
        id: uuid(),
        name: 'company',
        position: 2,
        fields: [
          {
            id: uuid(),
            name: 'Invoice of: ',
          },
          {
            id: uuid(),
            name: 'John doe',
          },
          {
            id: uuid(),
            name: 'Streetname 10',
          },
          {
            id: uuid(),
            name: '7263AP, Cityname',
          },
        ],
      },
      {
        id: uuid(),

        name: 'client',
        position: 3,
        fields: [
          {
            id: uuid(),
            name: 'Invoice of: ',
          },
          {
            id: uuid(),
            data: '',
          },
          {
            id: uuid(),
            data: '',
          },
          {
            id: uuid(),
            data: '',
          },
        ],
      },
      {
        id: uuid(),
        name: 'invoiceNumber',
        position: 4,
        fields: [
          {
            id: uuid(),
            name: 'Invoice number',
            data: '',
          },
          {
            id: uuid(),
            name: 'Invoice date',
            data: '',
          },
          {
            id: uuid(),
            name: 'Payment due',
            data: '',
          },
        ],
      },
      {
        id: uuid(),
        name: 'rowDescription',
        fields: [
          {
            id: uuid(),
            name: 'Description',
          },
          {
            id: uuid(),
            name: 'Price',
          },
          {
            id: uuid(),
            name: 'Amount',
          },
          {
            id: uuid(),
            name: 'Total',
          },
        ],
      },

      {
        id: uuid(),
        name: 'total',
        fields: [
          {
            id: uuid(),
            name: 'Subtotal:',
            value: 'Subtotal ex VAT',
          },
          {
            id: uuid(),
            name: 'BTW:',
            value: 'BTW 21%',
          },
          {
            id: uuid(),
            name: 'Total:',
            value: 'Total',
          },
        ],
      },
    ],
    message: '',
    settings: [
      { discountType: 'none' },
      { discountAmount: 0 },
      // Todo - add theme color
      // { themeColor: "#12a1c1" },
      { taxSetting: 'incl' },
      { taxAmount: 21 },
      { invoiceBase: '' },
      { invoiceAppendix: '' },
    ],
  };

  return (
    <div className="flex max-w-2xl flex-1 flex-row rounded-xl shadow-xl">
      <div
        className={`mb-6 flex-1 overflow-visible p-8 ${
          viewStyle === 'preview' ? 'h-[950px]' : ''
        } `}
      >
        <Header invoice={invoice} viewStyle={viewStyle} />
        <Body invoice={invoice} viewStyle={viewStyle} />
        <Footer invoice={invoice} viewStyle={viewStyle} />
      </div>
    </div>
  );
}
