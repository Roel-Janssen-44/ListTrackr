import { Button } from '@/app/components/button';
import { Input } from '@/app/components/chadcn/input';
import { Skeleton } from '@/app/components/chadcn/skeleton';
import { InvoiceTemplate } from '@/app/lib/definitions';
import { TrashIcon } from 'lucide-react';
import {
  addFieldToFieldGroup,
  removeFieldFromFieldGroup,
  editFieldInFieldGroup,
} from '@/app/lib/utils';

export default function TemplateCompanyData({
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
      fieldGroupName: 'company',
      fieldId: targetId,
      newValue: newValue,
    });
  };
  const handleAddItem = () => {
    addFieldToFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'company',
    });
  };
  const handleRemoveItem = (fieldId: string) => {
    removeFieldFromFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'company',
      fieldId: fieldId,
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <ul className="p-0">
          {fields.map((field, index) => (
            <div
              key={'template-company_data' + field.id}
              className="flex justify-end"
            >
              {index === 0 && (
                <div
                  className="w-48"
                  style={
                    invoice.settings.themeColor
                      ? { color: invoice.settings.themeColor }
                      : null
                  }
                >
                  <Input
                    onChange={(e) =>
                      handleChangeTemplateField({
                        newValue: e.target.value,
                        targetId: field.id,
                      })
                    }
                    value={field.name}
                    id={field.id}
                  />
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-col items-end text-gray-900">
            {fields.map((field, index) => (
              <div key={field.id} className="group relative my-1 w-48">
                {index !== 0 && (
                  <Input
                    onChange={(e) =>
                      handleChangeTemplateField({
                        newValue: e.target.value,
                        targetId: field.id,
                      })
                    }
                    value={field.name}
                    id={field.id}
                  />
                )}
                <div className="absolute -left-12 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-lg py-1 group-hover:block hover:block">
                  <div
                    className="flex h-full justify-center"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      aria-label="Delete item"
                      color="primary"
                      style={
                        invoice.settings.themeColor
                          ? { background: invoice.settings.themeColor }
                          : null
                      }
                      onClick={() => handleRemoveItem(field.id)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ul>

        <div className="flex justify-end">
          <Button
            className="w-[192px]"
            style={
              invoice.settings.themeColor
                ? { background: invoice.settings.themeColor }
                : null
            }
            onClick={handleAddItem}
          >
            Veld toevoegen
          </Button>
        </div>
      </div>
    </>
  );
}
