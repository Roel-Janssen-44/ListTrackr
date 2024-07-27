import Header from '@/app/components/invoice/header';
import Body from '@/app/components/invoice/body';
import Footer from '@/app/components/invoice/footer';
import { v4 as uuid } from 'uuid';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function Invoice({ viewStyle }) {
  const template: InvoiceTemplate = {
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
            name: 'Factuur van: ',
          },
          {
            id: uuid(),
            name: 'janssen',
          },
          {
            id: uuid(),
            name: 'Straatburglaan 10',
          },
          {
            id: uuid(),
            name: '6137 JC Sittard',
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
            name: 'Factuur aan: ',
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
            name: 'Factuurnummer',
            data: '',
          },
          {
            id: uuid(),
            name: 'Factuurdatum',
            data: '',
          },
          {
            id: uuid(),
            name: 'Betaaltermijn',
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
            name: 'Omschrijving',
          },
          {
            id: uuid(),
            name: 'Bedrag',
          },
          {
            id: uuid(),
            name: 'Aantal',
          },
          {
            id: uuid(),
            name: 'Totaal',
          },
        ],
      },
      {
        id: uuid(),
        name: 'total',
        fields: [
          {
            id: uuid(),
            name: 'Subtotaal:',
            value: 'Subtotaal ex BTW',
          },
          {
            id: uuid(),
            name: 'BTW:',
            value: 'BTW 21%',
          },
          {
            id: uuid(),
            name: 'Totaal:',
            value: 'Totaal',
          },
        ],
      },
    ],
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
        <Header invoice={template} viewStyle={viewStyle} />
        {/* <Body invoice={invoice} viewStyle={viewStyle} />
        <Footer invoice={invoice} viewStyle={viewStyle} /> */}
      </div>
    </div>
  );
}
