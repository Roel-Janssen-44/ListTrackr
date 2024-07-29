// import { useSelector } from "react-redux";
// import { selectTemplate } from "@features/templates/templatesSlice";

import TemplateTotal from './total';
import TemplateMessage from './message';
import { InvoiceTemplate } from '@/app/lib/definitions';

// import GetCurrentInvoice from "@lib/getCurrentInvoice";
import { getCurrentFieldGroup } from '@/app/lib/utils';

export default function TemplateFooter({
  invoice,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  //   const templateId = GetCurrentInvoice();
  //   const templateData = useSelector(selectTemplate(templateId));
  return (
    <div className="flex flex-row content-between items-start justify-between gap-8">
      <div className="flex-1">
        <TemplateMessage setInvoice={setInvoice} message={invoice.message} />
      </div>
      <TemplateTotal
        setInvoice={setInvoice}
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'total')}
      />
    </div>
  );
}
