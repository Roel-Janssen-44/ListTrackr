import {
  convertToCurrency,
  calculateSubTotal,
  calculateInvoice,
} from '@/app/lib/utils';

import { InvoiceTemplate, Field } from '@/app/lib/types';
export default function PreviewTotal({
  invoice,
  fields,
  rows,
}: {
  invoice: InvoiceTemplate;
  fields: Field[];
  rows: any;
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
      <div className="ml-auto flex justify-end gap-4">
        <ul className="flex flex-col">
          {fields.map((field, index) => (
            <ul
              style={
                invoice.settings.themeColor
                  ? { borderColor: invoice.settings.themeColor }
                  : null
              }
              key={'invoice_preview-total-name' + field.id}
              className={`flex flex-row gap-6 pl-0 ${
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
              <p
                className="my-2 w-[125px] text-right font-semibold"
                style={
                  invoice.settings.themeColor
                    ? { color: invoice.settings.themeColor }
                    : null
                }
              >
                {field.name}
              </p>
              <p className="my-2 text-gray-900">
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
              <p
                className="my-2 w-[125px] text-right font-semibold"
                style={
                  invoice.settings.themeColor
                    ? { color: invoice.settings.themeColor }
                    : null
                }
              >
                Discount
              </p>
              {invoice.settings.discountType === 'percentage' && (
                <p className="my-2 ml-3 text-gray-900">
                  -{invoice.settings.discountAmount}%
                </p>
              )}
              {invoice.settings.discountType === 'amount' && (
                <p className="my-2 text-gray-900">
                  €{' '}
                  <span className="ml-1">
                    -{invoice.settings.discountAmount}
                  </span>
                </p>
              )}
            </div>
          )}
          {fields.map((field, index) => (
            <ul
              key={'invoice_preview_total-name' + field.id}
              className={`flex flex-row gap-6  pl-0 ${
                invoice.settings.discountType !== 'none' && index !== 0
                  ? 'block'
                  : 'hidden'
              }
                  ${
                    index + 1 === fields.length
                      ? 'border-x-0 border-b-0 border-t-2 border-solid border-primary'
                      : ''
                  }`}
            >
              <p
                className="font-semi my-2 w-[125px] text-right font-semibold"
                style={
                  invoice.settings.themeColor
                    ? { color: invoice.settings.themeColor }
                    : null
                }
              >
                {field.name}
              </p>
              <p className="my-2 font-normal text-gray-900">
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
