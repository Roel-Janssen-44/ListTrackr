import {
  convertToCurrency,
  calculateSubTotal,
  calculateInvoice,
} from '@/app/lib/utils';

import { InvoiceTemplate, Field } from '@/app/lib/types';

export default function InvoiceTotal({
  invoice,
  fields,
  rows,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  fields: Field[];
  rows: any;
  setInvoice: Function;
}) {
  const invoiceCosts = calculateInvoice({
    subtotal: calculateSubTotal(rows),
    taxPercentage: invoice.settings.taxAmount,
    taxType: invoice.settings.taxSetting,
    discountAmount: invoice.settings.discountAmount || 0,
    discountType: invoice.settings.discountType,
  });

  return (
    <>
      <div className="ml-auto flex cursor-not-allowed justify-end gap-4 opacity-40">
        <ul className="flex flex-col">
          {fields.map((field, index) => (
            <ul
              key={'template_invoice_total-name' + field.id}
              className={`flex flex-row gap-6  pl-0 ${
                invoice.settings.discountType !== 'none' && index !== 0
                  ? 'hidden'
                  : 'block'
              }
                  ${
                    index + 1 === fields.length
                      ? 'border-x-0 border-b-0 border-t-2 border-solid border-gray-400'
                      : ''
                  }`}
            >
              <p className="my-2 w-[125px] text-right">{field.name}</p>
              <p className="my-2">
                {field.value === 'excl'
                  ? convertToCurrency(invoiceCosts.subtotalExcl)
                  : field.value === 'incl'
                  ? convertToCurrency(invoiceCosts.subtotalIncl)
                  : field.value === '21'
                  ? convertToCurrency(invoiceCosts.tax)
                  : field.value === '9'
                  ? convertToCurrency(invoiceCosts.tax)
                  : field.value === '0'
                  ? convertToCurrency(invoiceCosts.tax)
                  : convertToCurrency(invoiceCosts.total)}
              </p>
            </ul>
          ))}
          {/* Show discount based on discountType */}
          {invoice.settings.discountType !== 'none' && (
            <div className="flex flex-row gap-6 ">
              <p className="my-2 w-[125px] text-right">Discount</p>
              {invoice.settings.discountType === 'percentage' && (
                <p className="my-2 ml-3">-{invoice.settings.discountAmount}%</p>
              )}
              {invoice.settings.discountType === 'amount' && (
                <p className="my-2">€ -{invoice.settings.discountAmount}</p>
              )}
            </div>
          )}
          {fields.map((field, index) => (
            <ul
              key={'template_invoice_total-name' + field.id}
              className={`flex flex-row gap-6  pl-0 ${
                invoice.settings.discountType !== 'none' && index !== 0
                  ? 'block'
                  : 'hidden'
              }
                  ${
                    index + 1 === fields.length
                      ? 'border-x-0 border-b-0 border-t-2 border-solid border-gray-400'
                      : ''
                  }`}
            >
              <p className="my-2 w-[125px] text-right">{field.name}</p>
              <p className="my-2">
                {field.value === 'excl'
                  ? convertToCurrency(invoiceCosts.subtotalExcl)
                  : field.value === 'incl'
                  ? convertToCurrency(invoiceCosts.subtotalIncl)
                  : field.value === '21'
                  ? convertToCurrency(invoiceCosts.tax)
                  : field.value === '9'
                  ? convertToCurrency(invoiceCosts.tax)
                  : field.value === '0'
                  ? convertToCurrency(invoiceCosts.tax)
                  : convertToCurrency(invoiceCosts.total)}
              </p>
            </ul>
          ))}
        </ul>
      </div>
    </>
  );
}
