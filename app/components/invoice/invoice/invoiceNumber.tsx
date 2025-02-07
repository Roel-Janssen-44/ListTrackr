import { Input } from '@/app/components/chadcn/input';

import { Field, InvoiceTemplate } from '@/app/lib/types';
import NonEditableItem from '@/app/components/nonEditableItem';
import { editFieldValueInFieldGroup } from '@/app/lib/utils';

export default function InvoiceInvoiceNumber({
  invoice,
  fields,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  fields: Field[];
  setInvoice: Function;
}) {
  const handleChangeField = ({ newValue, targetId }) => {
    editFieldValueInFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'invoiceNumber',
      fieldId: targetId,
      newValue: newValue,
    });
  };
  return (
    <ul className="flex flex-col justify-start gap-1">
      {fields.map((field: Field) => (
        <ul
          className="flex flex-row justify-end"
          key={'invoice_invoice_data-name' + field.id}
        >
          <li className="flex flex-row justify-center gap-2">
            <div
              className="flex items-center font-semibold"
              style={
                invoice.settings.themeColor
                  ? { color: invoice.settings.themeColor }
                  : null
              }
            >
              <NonEditableItem label={field.name} />
            </div>
            <Input
              onChange={(e) =>
                handleChangeField({
                  newValue: e.target.value,
                  targetId: field.id,
                })
              }
              value={`${field.data === 'Template data' ? '' : field.value}`}
              className="w-[156px] py-1 text-gray-900"
              id={field.id}
            />
          </li>
        </ul>
      ))}
    </ul>
  );
}
