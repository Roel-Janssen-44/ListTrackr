import { InvoiceTemplate } from '@/app/lib/definitions';

import PreviewRowNames from './rowNames';
import PreviewRows from './rows';

import { getCurrentFieldGroup } from '@/app/lib/utils';

export default function PreviewBody({ invoice }: { invoice: InvoiceTemplate }) {
  return (
    <div className="my-10 flex flex-col border-2 border-l-0 border-r-0 border-solid border-b-primary border-t-primary px-4 py-10">
      <PreviewRowNames
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'rowDescription')}
      />
      <PreviewRows fields={getCurrentFieldGroup(invoice.fieldGroups, 'rows')} />
    </div>
  );
}
