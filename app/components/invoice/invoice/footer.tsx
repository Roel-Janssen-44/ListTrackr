import InvoiceTotal from './total';
import InvoiceMessage from './message';

import { InvoiceTemplate } from '@/app/lib/types';
import { getCurrentFieldGroup } from '@/app/lib/utils';
export default function InvoiceFooter({
  invoice,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  return (
    <div className="flex flex-row p-4 pt-0">
      {/* Todo */}
      <InvoiceMessage
        message={invoice.message}
        invoice={invoice}
        setInvoice={setInvoice}
      />
      <InvoiceTotal
        rows={getCurrentFieldGroup(invoice.fieldGroups, 'rows')}
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'total')}
        invoice={invoice}
        setInvoice={setInvoice}
      />
    </div>
  );
}
