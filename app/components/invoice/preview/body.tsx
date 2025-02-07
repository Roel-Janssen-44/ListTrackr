import { InvoiceTemplate } from '@/app/lib/types';

import PreviewRowNames from './rowNames';
import PreviewRows from './rows';

import { getCurrentFieldGroup } from '@/app/lib/utils';

export default function PreviewBody({ invoice }: { invoice: InvoiceTemplate }) {
  return (
    <div
      style={
        invoice.settings.themeColor
          ? { borderColor: invoice.settings.themeColor }
          : null
      }
      className="my-10 flex flex-col border-2 border-l-0 border-r-0 border-solid border-b-primary border-t-primary px-4 py-10"
    >
      <PreviewRowNames
        invoice={invoice}
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'rowDescription')}
      />
      <PreviewRows
        invoice={invoice}
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'rows')}
      />
    </div>
  );
}
