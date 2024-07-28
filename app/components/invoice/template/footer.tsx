// import { useSelector } from "react-redux";
// import { selectTemplate } from "@features/templates/templatesSlice";

import TemplateTotal from './total';
import TemplateMessage from './message';
import { InvoiceTemplate } from '@/app/lib/definitions';

// import GetCurrentInvoice from "@lib/getCurrentInvoice";
import { getCurrentFieldGroup } from '@/app/lib/utils';

export default function TemplateFooter({
  invoice,
}: {
  invoice: InvoiceTemplate;
}) {
  //   const templateId = GetCurrentInvoice();
  //   const templateData = useSelector(selectTemplate(templateId));
  return (
    <div className="flex flex-row content-between items-start justify-between gap-8">
      <div className="flex-1">
        <TemplateMessage message={invoice.message} />
      </div>
      <TemplateTotal
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'total')}
      />
    </div>
  );
}
