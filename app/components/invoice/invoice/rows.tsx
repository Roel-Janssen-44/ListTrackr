// import {
//   addRow,
//   removeRow,
//   changeRowOrder,
import { Trash } from 'lucide-react';
// } from "@features/invoices/invoicesSlice";
import { InvoiceTemplate, Field } from '@/app/lib/definitions';
import { Button } from '@/app/components/button';
import { Input } from '@/app/components/chadcn/input';

import {
  editFieldInFieldGroup,
  editFieldPriceInFieldGroup,
  editFieldAmountInFieldGroup,
  addFieldToFieldGroup,
  removeFieldFromFieldGroup,
} from '@/app/lib/utils';

export default function InvoiceRows({
  invoice,
  fields,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  fields: Field[];
  setInvoice: Function;
}) {
  const handleRowChange = (rowNumber, itemNumber, value) => {
    // if (invoiceId !== undefined) {
    //   dispatch(editRow({ rowNumber, itemNumber, value, invoiceId }));
    //   // dispatch(calculateTotal({ invoiceId }));
    // }
  };

  const handleChangeField = ({ newValue, targetId }) => {
    editFieldInFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'rows',
      fieldId: targetId,
      newValue: newValue,
    });
  };
  const handleChangePrice = ({ newValue, targetId }) => {
    editFieldPriceInFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'rows',
      fieldId: targetId,
      newValue: newValue,
    });
  };
  const handleChangeAmount = ({ newValue, targetId }) => {
    editFieldAmountInFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'rows',
      fieldId: targetId,
      newValue: newValue,
    });
  };

  const handleAddItem = () => {
    addFieldToFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'rows',
    });
  };
  const handleRemoveItem = (fieldId: string) => {
    removeFieldFromFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'rows',
      fieldId: fieldId,
    });
  };

  return (
    <div className="mb-2">
      <div className="ml-auto flex flex-col items-end justify-end">
        <ul className="flex list-none flex-col">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="group relative my-1 -ml-40 flex flex-row items-center gap-2 pl-20"
            >
              <ul
                key={'row_group-' + index}
                className={`flex list-none flex-row gap-2 py-1 pl-0 text-sm`}
              >
                <li className="flex-1">
                  <Input
                    onChange={(e) =>
                      handleChangeField({
                        newValue: e.target.value,
                        targetId: field.id,
                      })
                    }
                    value={field.name}
                    className="w-[294px] text-gray-900"
                  />
                </li>
                <li className="w-[115px] text-right">
                  <Input
                    onChange={(e) =>
                      handleChangePrice({
                        newValue: e.target.value,
                        targetId: field.id,
                      })
                    }
                    value={field?.price}
                    className="w-[115px] text-right text-gray-900"
                  />
                </li>
                <li className="w-[115px] text-right">
                  <Input
                    onChange={(e) =>
                      handleChangeAmount({
                        newValue: e.target.value,
                        targetId: field.id,
                      })
                    }
                    value={field?.amount}
                    className="w-[115px] text-right text-gray-900"
                  />
                </li>
                <li className="flex w-[60px] items-center justify-end text-right">
                  {'€ ' + Number(field.price) * Number(field.amount)}
                </li>
              </ul>
              <div className="absolute -top-1/2 left-4 hidden h-full w-auto translate-y-1/2 justify-center gap-2 rounded group-hover:flex hover:flex">
                <div
                  className="my-auto h-10"
                  aria-label="outlined primary button group"
                >
                  <Button
                    style={
                      invoice.settings.themeColor
                        ? { background: invoice.settings.themeColor }
                        : null
                    }
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
        </ul>
        <Button
          style={
            invoice.settings.themeColor
              ? { backgroundColor: invoice.settings.themeColor }
              : null
          }
          className="mb-6 w-full"
          onClick={handleAddItem}
        >
          Rij toevoegen
        </Button>
      </div>
    </div>
  );
}
