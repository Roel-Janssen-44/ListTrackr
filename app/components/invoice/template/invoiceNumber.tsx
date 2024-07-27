import { useState, useRef } from 'react';

import { Button } from '@/app/components/button';
import { Trash } from 'lucide-react';
import { Input } from '@/app/components/chadcn/input';
import { Skeleton } from '@/app/components/chadcn/skeleton';

export default function TemplateInvoiceNumber({ fields = [] }) {
  const handleChangeTemplateField = ({ newValue, targetId }) => {
    //     dispatch(editTemplateField({ templateId, fieldId: targetId, newValue }));
  };

  const handleAddItem = () => {
    // dispatch(
    //   addItemToGroup({
    //     templateId,
    //     fieldGroupName: "invoiceNumber",
    //     fieldId: uuid(),
    //   })
    // );
  };
  const handleRemoveItem = (fieldId: string) => {
    //     dispatch(
    //       removeItemFromGroup({
    //         templateId,
    //         fieldGroupName: "invoiceNumber",
    //         fieldId,
    //       })
    //     );
  };

  const onDragEnd = (result) => {
    //     const { source, destination } = result;
    //     if (!destination) {
    //       return;
    //     }
    //     const { droppableId: sourceDroppableId, index: sourceIndex } = source;
    //     const { droppableId: destinationDroppableId, index: destinationIndex } =
    //       destination;
    //     dispatch(
    //       changeItemOrder({
    //         templateId,
    //         fieldGroupName: "invoiceNumber",
    //         startIndex: sourceIndex,
    //         endIndex: destinationIndex,
    //       })
    //     );
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
                // handleChange={handleChangeTemplateField}
                value={field.name}
                className="w-[156px] py-1"
                id={field.id}
              />
              <Skeleton className="relative my-auto h-[30px] w-[110px]" />

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
