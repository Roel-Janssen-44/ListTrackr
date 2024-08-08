import { useEffect, useState } from 'react';

import {
  convertToCurrency,
  calculateSubTotal,
  calculateInvoice,
  removeNonNumericCharacters,
} from '@/app/lib/utils';

import { InvoiceTemplate, Field } from '@/app/lib/definitions';

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
  // let subtotal = calculateSubTotal(rows);
  // let subTotalExcl: number;
  // let subTotalIncl: number;

  // console.log('subtotal');
  // console.log(subtotal);

  // if (invoice.settings.taxSetting === 'incl') {
  //   // subTotalExcl = subtotal - tax;
  //   subTotalIncl = subtotal;
  // } else if (invoice.settings.taxSetting === 'excl') {
  //   subTotalExcl = subtotal;
  //   // subTotalIncl = subtotal + tax
  // }
  // console.log('subTotalExcl');
  // console.log(subTotalExcl);

  // console.log('subTotalIncl');
  // console.log(subTotalIncl);

  const values = calculateInvoice({
    subtotal: calculateSubTotal(rows),
    taxPercentage: invoice.settings.taxAmount,
    taxType: invoice.settings.taxSetting,
    discountAmount: invoice.settings.discountAmount || 0,
    discountType: invoice.settings.discountType,
  });

  console.log('values');
  console.log(values);
  // asd
  // // if (invoice.settings.taxSetting === 'incl') {
  // //   subtotal =
  // //     subtotal -
  // //     (subtotal * parseInt(invoice.settings.taxAmount)) /
  // //       parseInt(invoice.settings.taxAmount) +
  // //     100;
  // // } else if (invoice.settings.taxSetting === 'excl') {
  // //   subtotal = subtotal;
  // //   // if (taxAmount === 21) {
  // //   //   subtotalEx = subtotal - (subtotal * 21) / 121;
  // //   // } else if (taxAmount === 9) {
  // //   //   subtotalEx = subtotal - (subtotal * 9) / 109;
  // //   // } else {
  // //   //   subtotalEx = subtotal;
  // //   // }
  // // }

  // const [subtotalEx, setSubtotalEx] = useState(0);
  // const [subtotalIncl, setSubtotalIncl] = useState(0);

  // const [tax0, setTax0] = useState(0);
  // const [tax9, setTax9] = useState(0);
  // const [tax21, setTax21] = useState(0);
  // const [total, setTotal] = useState(0);

  // const taxSetting = invoice.settings.taxSetting;
  // const discountType = invoice.settings.discountType;

  // const discountAmount = invoice.settings.discountAmount;

  // let subtotalExTemp = 0;
  // let subtotalInclTemp = 0;
  // let taxAmountTemp = 0;
  // let vat0Temp = 0;
  // let vat9Temp = 0;
  // let vat21Temp = 0;
  // let totalTemp = 0;
  // let discountAmountTemp = 0;

  // const rowsToCalculate = rows;
  // console.log('rowsToCalculate');
  // console.log(rowsToCalculate);
  // let subtotal = calculateSubTotal(rowsToCalculate);

  // console.log('subtotal');
  // console.log(subtotal);

  // useEffect(() => {
  //   subtotal = calculateSubTotal(rowsToCalculate);
  //   // console.log(taxRef.current);
  //   // if (taxRef.current) {
  //   //   taxAmountTemp = Number(
  //   //     removeNonNumericCharacters(taxRef.current?.innerHTML)
  //   //   );
  //   //   console.log("asd");
  //   // } else {
  //   //   taxAmountTemp = 0;
  //   //   console.log("asd");
  //   // }

  //   // taxAmountTemp = 0;

  //   if (taxSetting === 'incl') {
  //     subtotalExTemp = subtotal;
  //   } else if (taxSetting === 'excl') {
  //     if (taxAmountTemp === 21) {
  //       subtotalExTemp = subtotal - (subtotal * 21) / 121;
  //     } else if (taxAmountTemp === 9) {
  //       subtotalExTemp = subtotal - (subtotal * 9) / 109;
  //     } else {
  //       subtotalExTemp = subtotal;
  //     }
  //   }

  //   console.log('taxAmountTemp');
  //   console.log(taxAmountTemp);
  //   console.log('subtotal');
  //   console.log(subtotal);
  //   console.log('subtotalExTemp');
  //   console.log(subtotalExTemp);

  //   if (discountType === 'percentage' || discountType === 'amount') {
  //     if (discountType === 'percentage') {
  //       discountAmountTemp =
  //         (subtotalExTemp *
  //           Number(removeNonNumericCharacters(discountAmount))) /
  //         100;
  //     } else if (discountType === 'amount') {
  //       discountAmountTemp = Number(
  //         parseFloat(
  //           String(removeNonNumericCharacters(discountAmount)).replace(
  //             ',',
  //             '.',
  //           ),
  //         ),
  //       );
  //     }
  //   }

  //   if (taxAmountTemp === 21) {
  //     subtotalInclTemp = subtotalExTemp * 1.21;
  //   } else if (taxAmountTemp === 21) {
  //     subtotalInclTemp = subtotalExTemp * 1.09;
  //   } else {
  //     subtotalInclTemp = subtotalExTemp;
  //   }

  //   const discountedTotal = subtotalExTemp - discountAmountTemp;

  //   vat0Temp = 0;
  //   vat9Temp = (discountedTotal * 9) / 19;
  //   vat21Temp = (discountedTotal * 21) / 121;

  //   if (taxAmountTemp === 21) {
  //     totalTemp = discountedTotal * 1.21;
  //   } else if (taxAmountTemp === 9) {
  //     totalTemp = discountedTotal * 1.09;
  //   } else {
  //     totalTemp = discountedTotal;
  //   }

  //   setSubtotalEx(subtotalExTemp);
  //   setSubtotalIncl(subtotalInclTemp);
  //   // setDiscountAmount(discountAmountTemp);
  //   // setTaxAmount(taxAmountTemp);
  //   setTax0(vat0Temp);
  //   setTax9(vat9Temp);
  //   setTax21(vat21Temp);
  //   setTotal(totalTemp);
  // }, [rows, taxSetting, discountType, discountAmount]);

  // console.log('fields');
  // console.log(fields);
  return (
    <>
      <div className="ml-auto flex cursor-not-allowed justify-end gap-4 opacity-40">
        <ul className="flex flex-col">
          {/* {fields.map((field, index) => (
            <ul
              key={'template_invoice_total-name' + field.id}
              className={`flex flex-row gap-6 pl-0 ${
                discountType !== 'none' && index !== 0 ? 'hidden' : 'block'
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
                  ? convertToCurrency(subtotalEx)
                  : field.value === 'incl'
                  ? convertToCurrency(subtotalIncl)
                  : field.value === '21'
                  ? convertToCurrency(tax21)
                  : field.value === '9'
                  ? convertToCurrency(tax9)
                  : field.value === '0'
                  ? convertToCurrency(tax0)
                  : field.value === ''
                  ? convertToCurrency(total)
                  : 'as'}
              </p>
            </ul>
          ))} */}
          {/* Add a discount field based on discountType */}
          {/* {discountType !== 'none' && (
            <div className="flex flex-row gap-6">
              <p className="my-2 w-[125px] text-right">Discount</p>
              {discountType === 'percentage' && (
                <p className="my-2 ml-2.5">- {discountAmount}</p>
              )}
              {discountType === 'amount' && (
                <p className="my-2 -ml-2.5">- {discountAmount}</p>
              )}
            </div>
          )} */}
          {/* {fields.map((field, index) => (
            <ul
              key={'template_invoice_total-name' + field.id}
              className={`flex flex-row gap-6 pl-0 ${
                discountType !== 'none' && index !== 0 ? 'block' : 'hidden'
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
                  ? convertToCurrency(subtotalEx)
                  : field.value === 'incl'
                  ? convertToCurrency(subtotalIncl)
                  : field.value === '21'
                  ? convertToCurrency(tax21)
                  : field.value === '9'
                  ? convertToCurrency(tax9)
                  : field.value === '0'
                  ? convertToCurrency(tax0)
                  : field.value === ''
                  ? convertToCurrency(total)
                  : 'as'}
              </p>
            </ul>
          ))} */}
          {/* discountType !== "Geen" && index !== 0 ? "hidden" : "block" */}
        </ul>
      </div>
    </>
  );
}
