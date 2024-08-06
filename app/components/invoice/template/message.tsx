// import { editTemplateField } from "@features/templates/templatesSlice";
// import GetCurrentInvoice from "@lib/getCurrentInvoice";

import { Textarea } from '@/app/components/chadcn/textarea';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function TemplateMessage({
  setInvoice,
  message,
  invoice,
}: {
  setInvoice: Function;
  message: string;
  invoice: InvoiceTemplate;
}) {
  const handleChangeTemplateField = ({ newValue, targetId }) => {
    //     dispatch(editTemplateField({ templateId, fieldId: targetId, newValue }));
  };

  return (
    <ul className="m-0 flex gap-2 p-0">
      <Textarea
        rows={5}
        key={'template_message'}
        // handleChange={handleChangeTemplateField}

        value={message}
        className={`h-full w-full py-1 text-sm`}
        // id={field.id}
      />
    </ul>
  );
}
