import { Input } from '@/app/components/chadcn/input';
import { Skeleton } from '@/app/components/chadcn/skeleton';
import { InvoiceTemplate } from '@/app/lib/definitions';
import { editFieldInFieldGroup } from '@/app/lib/utils';

export default function TemplateClientData({
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
      fieldGroupName: 'client',
      fieldId: targetId,
      newValue: newValue,
    });
  };

  return (
    <>
      <div
        className="flex flex-col"
        style={
          invoice.settings.themeColor
            ? { color: invoice.settings.themeColor }
            : null
        }
      >
        <ul className="p-0">
          {fields.map((field, index) => (
            <div key={'template-client_data' + field.id} className="flex">
              {index === 0 && (
                <div className="w-48">
                  <Input
                    onChange={(e) =>
                      handleChangeTemplateField({
                        newValue: e.target.value,
                        targetId: field.id,
                      })
                    }
                    value={field.name}
                    id={field.id}
                    // label={'Koptekst, leeg laten voor geen title'}
                  />
                </div>
              )}
            </div>
          ))}
          {fields.map((field, index) => (
            <div key={'template_client_data-name' + field.id}>
              {index !== 0 && (
                <>
                  <Skeleton className="relative my-2 h-[30px] w-full last-of-type:mb-0" />
                </>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
