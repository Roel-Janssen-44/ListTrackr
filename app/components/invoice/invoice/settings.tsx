'use strict';

import { useState } from 'react';
// import { ChromePicker } from "react-color";

import { Input } from '@/app/components/chadcn/input';
import { Textarea } from '@/app/components/chadcn/textarea';
// import ItemInput from "@components/ItemInput";

import { convertToCurrency, convertToPercentage } from '@lib/utils';
import { InvoiceTemplate } from '@lib/definitions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';

export default function InvoiceSettings({
  invoice,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  const discountTypeSetting = invoice.settings.discountType;
  const discountAmountSetting = invoice.settings.discountAmount;

  const handleSettingChange = ({ newValue, settingName }) => {
    //   editInvoiceSettings({
    //     invoiceId,
    //     settingName: settingName,
    //     newValue: newValue,
    //   }),
  };

  const handleBlurEvent = ({ newValue, settingName }) => {
    // if (settingName === 'discountAmount') {
    //   if (discountTypeSetting === 'Bedrag') {
    //     const convertedValue = convertToCurrency(newValue);
    //     dispatch(
    //       editInvoiceSettings({
    //         invoiceId,
    //         settingName: settingName,
    //         newValue: convertedValue,
    //       }),
    //     );
    //   } else if (discountTypeSetting === 'Percentage') {
    //     const convertedValue = convertToPercentage(newValue);
    //     dispatch(
    //       editInvoiceSettings({
    //         invoiceId,
    //         settingName: settingName,
    //         newValue: convertedValue,
    //       }),
    //     );
    //   } else {
    //     dispatch(
    //       editInvoiceSettings({
    //         invoiceId,
    //         settingName: settingName,
    //         newValue: newValue,
    //       }),
    //     );
    //   }
    // }
  };

  return (
    <div className="mt-16 p-6">
      <p>discount type</p>
      <Select
        //   onChange={(event) =>
        //     handleSettingChange({
        //       newValue: event.target.value,
        //       settingName: 'discountType',
        //     })
        //   }
        onValueChange={(e) => {}}
      >
        <SelectTrigger className="mb-2 w-[180px]">
          <SelectValue placeholder="Select a customer-" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'Geen'}>Geen</SelectItem>
          <SelectItem value={'Percentage'}>Percentage</SelectItem>
          <SelectItem value={'Bedrag'}>Bedrag</SelectItem>
        </SelectContent>
      </Select>

      {discountTypeSetting !== 'none' && (
        <div className="mt-4">
          <Textarea
            // InputLabelProps={{ shrink: true }}
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(event) =>
              handleSettingChange({
                newValue: event.target.value,
                settingName: 'discountAmount',
              })
            }
            onBlur={(event) =>
              handleBlurEvent({
                newValue: event.target.value,
                settingName: 'discountAmount',
              })
            }
            value={discountAmountSetting ? discountAmountSetting : 0}
            placeholder={`${
              discountTypeSetting === 'percentage'
                ? 'Percentage'
                : 'Amount in €'
            }`}
          />
        </div>
      )}
    </div>
  );
}
