// import { selectTemplate } from "@features/templates/templatesSlice";

import TemplateRowNames from './rowNames';
import TemplateRows from './rows';

// import GetCurrentInvoice from "@lib/getCurrentInvoice";
import { InvoiceTemplate } from '@/app/lib/definitions';
import { getCurrentFieldGroup } from '@/app/lib/utils';

export default function TemplateBody({
  invoice,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  //   const templateId = GetCurrentInvoice();
  //   const templateData = useSelector(selectTemplate(templateId));

  return (
    <div className="my-10 flex flex-col border-2 border-l-0 border-r-0 border-solid border-b-gray-400 border-t-gray-400 px-4 py-10">
      <TemplateRowNames
        setInvoice={setInvoice}
        fields={getCurrentFieldGroup(invoice.fieldGroups, 'rowDescription')}
      />
      <TemplateRows />
    </div>
  );
}
