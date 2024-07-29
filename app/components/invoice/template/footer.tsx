import TemplateTotal from './total';
import TemplateMessage from './message';
import { InvoiceTemplate } from '@/app/lib/definitions';

import { getCurrentFieldGroup } from '@/app/lib/utils';

export default function TemplateFooter({
  setInvoice,
  invoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  return (
    <div className="mb-4 flex flex-row content-between items-end justify-between gap-8 px-4">
      <div className="flex-1">
        <TemplateMessage
          invoice={invoice}
          setInvoice={setInvoice}
          message={invoice.message}
        />
      </div>
      <TemplateTotal
        invoice={invoice}
        setInvoice={setInvoice}
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'total')}
      />
    </div>
  );
}
