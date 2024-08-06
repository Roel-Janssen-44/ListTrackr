'use client';

import { Trash } from 'lucide-react';
import { Field } from '@/app/lib/definitions';
import { Input } from '@/app/components/chadcn/input';
import { Button } from '@/app/components/button';
import { InvoiceTemplate } from '@/app/lib/definitions';
import {
  addFieldToFieldGroup,
  removeFieldFromFieldGroup,
  editFieldValueInFieldGroup,
} from '@/app/lib/utils';

export default function InvoiceClientData({
  invoice,
  fields,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  fields: Field[];
  setInvoice: Function;
}) {
  const handleChangeField = ({
    newValue,
    targetId,
  }: {
    newValue: string;
    targetId: string;
  }) => {
    editFieldValueInFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'client',
      fieldId: targetId,
      newValue: newValue,
    });
  };

  const handleAddItem = () => {
    addFieldToFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'client',
    });
  };
  const handleRemoveItem = (fieldId: string) => {
    removeFieldFromFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'client',
      fieldId: fieldId,
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <ul className="p-0">
          {fields.map((field, index) => {
            if (index === 0 && field.name !== '') {
              return (
                <h3
                  key={'client_data-title' + field.id}
                  className="m-0 cursor-not-allowed"
                >
                  {field.name}
                </h3>
              );
            }
          })}
          <div>
            {fields.map((field, index) => {
              if (index !== 0) {
                return (
                  <div key={field.id}>
                    <div className="group relative my-1 w-48">
                      <Input
                        onChange={(e) =>
                          handleChangeField({
                            newValue: e.target.value,
                            targetId: field.id,
                          })
                        }
                        value={field.value}
                        id={field.id}
                      />
                      <div className="absolute -left-12 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-lg bg-white py-1 shadow-sm group-hover:block hover:block">
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
                  </div>
                );
              }
            })}
          </div>
        </ul>
        <div>
          <Button className="w-[192px]" onClick={handleAddItem}>
            Veld toevoegen
          </Button>
        </div>
      </div>
    </>
  );
}
