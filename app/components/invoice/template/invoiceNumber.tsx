import { Button } from '@/app/components/button';
import { Trash } from 'lucide-react';
import { Input } from '@/app/components/chadcn/input';
import { Skeleton } from '@/app/components/chadcn/skeleton';
import {
  addFieldToFieldGroup,
  removeFieldFromFieldGroup,
  editFieldInFieldGroup,
  editFieldValueInFieldGroup,
} from '@/app/lib/utils';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function TemplateInvoiceNumber({
  setInvoice,
  fields = [],
  invoice,
}: {
  setInvoice: Function;
  fields: any;
  invoice: InvoiceTemplate;
}) {
  const handleChangeTemplateField = ({
    newValue,
    targetId,
  }: {
    newValue: string;
    targetId: string;
  }) => {
    editFieldInFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'invoiceNumber',
      fieldId: targetId,
      newValue: newValue,
    });
  };
  const handleAddItem = () => {
    addFieldToFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'invoiceNumber',
    });
  };
  const handleRemoveItem = (fieldId: string) => {
    removeFieldFromFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'invoiceNumber',
      fieldId: fieldId,
    });
  };
  const handleChangeValueField = ({
    newValue,
    targetId,
  }: {
    newValue: string;
    targetId: string;
  }) => {
    editFieldValueInFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'invoiceNumber',
      fieldId: targetId,
      newValue: newValue,
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="pt-0">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="group relative my-2 flex flex-row items-end justify-end gap-4 first-of-type:mt-0 last-of-type:mb-0"
            >
              <Input
                onChange={(e) =>
                  handleChangeTemplateField({
                    newValue: e.target.value,
                    targetId: field.id,
                  })
                }
                value={field.name}
                className={`${index == 2 ? 'w-[133px]' : 'w-[156px]'} py-1`}
                id={field.id}
              />

              {index === 2 ? (
                <Input
                  onChange={(e) => {
                    handleChangeValueField({
                      newValue: e.target.value,
                      targetId: field.id,
                    });
                  }}
                  value={field.value}
                  className="w-[133px] py-1"
                  id={field.id}
                />
              ) : (
                <Skeleton className="relative my-auto h-[30px] w-[110px]" />
              )}

              <div className="absolute -left-[36px] top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-lg bg-white py-1 shadow-sm group-hover:block hover:block">
                <div
                  className="flex h-full justify-center"
                  aria-label="outlined primary button group"
                >
                  <Button
                    aria-label="Delete item"
                    color="primary"
                    onClick={() => handleRemoveItem(field.id)}
                  >
                    <Trash size={24} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-end">
          <Button className="w-[282px]" onClick={handleAddItem}>
            Veld toevoegen
          </Button>
        </div>
      </div>
    </>
  );
}
