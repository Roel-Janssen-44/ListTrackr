import { InvoiceTemplate } from '@/app/lib/types';

import InvoiceRowNames from './rowNames';
import InvoiceRows from './rows';

import { getCurrentFieldGroup } from '@/app/lib/utils';

export default function InvoiceBody({
  invoice,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  return (
    <div
      style={
        invoice.settings.themeColor
          ? { borderColor: invoice.settings.themeColor }
          : null
      }
      className="my-10 flex flex-col border-2 border-l-0 border-r-0 border-solid border-b-primary border-t-primary px-4 py-10"
    >
      <InvoiceRowNames
        invoice={invoice}
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'rowDescription')}
      />
      <InvoiceRows
        invoice={invoice}
        setInvoice={setInvoice}
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'rows')}
      />
    </div>
  );
}
