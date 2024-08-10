'use strict';

import { Input } from '@/app/components/chadcn/input';
import { InvoiceTemplate } from '@lib/definitions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';
import { editInvoiceSetting } from '@/app/lib/utils';

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
    editInvoiceSetting({
      invoice: invoice,
      setInvoice: setInvoice,
      settingName: settingName,
      newValue: newValue,
    });
  };

  return (
    <div className="mt-16 p-6">
      <p>discount</p>
      <Select
        onValueChange={(e) =>
          handleSettingChange({
            newValue: e,
            settingName: 'discountType',
          })
        }
        value={discountTypeSetting}
      >
        <SelectTrigger className="mb-2 w-[180px]">
          <SelectValue placeholder="Discount type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'none'}>None</SelectItem>
          <SelectItem value={'percentage'}>Percentage</SelectItem>
          <SelectItem value={'amount'}>Amount</SelectItem>
        </SelectContent>
      </Select>

      {discountTypeSetting !== 'none' && (
        <>
          <p className="mt-4">discount amount</p>
          <div>
            <Input
              onChange={(event) =>
                handleSettingChange({
                  newValue: event.target.value,
                  settingName: 'discountAmount',
                })
              }
              className="w-[180px]"
              value={discountAmountSetting || ''}
              placeholder={`${
                discountTypeSetting === 'percentage'
                  ? 'Percentage'
                  : 'Amount in €'
              }`}
            />
          </div>
        </>
      )}
    </div>
  );
}
