import TemplateRowNames from './rowNames';
import TemplateRows from './rows';

import { InvoiceTemplate } from '@/app/lib/types';
import { getCurrentFieldGroup } from '@/app/lib/utils';

export default function TemplateBody({
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
      className="my-10 flex flex-col border-2 border-l-0 border-r-0 border-solid border-b-gray-400 border-t-gray-400 px-4 py-10 text-gray-500"
    >
      <TemplateRowNames
        invoice={invoice}
        setInvoice={setInvoice}
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'rowDescription')}
      />
      <TemplateRows />
    </div>
  );
}
