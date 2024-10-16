import { Input } from '@/app/components/chadcn/input';
import { InvoiceTemplate } from '@/app/lib/definitions';
import { editFieldInFieldGroup } from '@/app/lib/utils';
export default function TemplateRowNames({
  setInvoice,
  fields = [],
  invoice,
}: {
  setInvoice: Function;
  fields: any;
  invoice: InvoiceTemplate;
}) {
  const handleChangeTemplateField = ({ newValue, targetId }) => {
    editFieldInFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'rowDescription',
      fieldId: targetId,
      newValue: newValue,
    });
  };

  return (
    <div
      className="mb-2"
      style={
        invoice.settings.themeColor
          ? { color: invoice.settings.themeColor }
          : null
      }
    >
      <ul className="m-0 flex gap-2 p-0">
        {fields.map((field, index) => (
          <Input
            key={'template_item_header-' + field.id}
            onChange={(e) =>
              handleChangeTemplateField({
                newValue: e.target.value,
                targetId: field.id,
              })
            }
            value={field.name}
            className={`py-1 text-sm ${index === 0 ? 'flex-1 ' : 'w-[125px]'} `}
            id={field.id}
          />
        ))}
      </ul>
    </div>
  );
}
