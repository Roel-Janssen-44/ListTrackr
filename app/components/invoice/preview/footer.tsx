import PreviewTotal from './total';
import PreviewMessage from './message';
import { InvoiceTemplate } from '@/app/lib/definitions';

import { getCurrentFieldGroup } from '@/app/lib/utils';

export default function PreviewFooter({
  invoice,
}: {
  invoice: InvoiceTemplate;
}) {
  return (
    <div className="mb-4 flex flex-row content-between items-end justify-between gap-8 px-4">
      <div className="flex-1">
        <PreviewMessage message={invoice.message} />
      </div>
      <PreviewTotal
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'total')}
      />
    </div>
  );
}
