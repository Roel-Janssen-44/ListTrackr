'use strict';

import { ChromePicker } from 'react-color';
import { useState, useRef } from 'react';
import { InvoiceTemplate } from '@/app/lib/definitions';
import { Input } from '@/app/components/chadcn/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';
import { debounce } from '@/app/lib/utils';

import { editInvoiceSetting } from '@/app/lib/utils';

export default function InvoiceSettingsTemplate({
  invoice,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  const [color, setColor] = useState(invoice.settings.themeColor);

  const handleColorChange = (props) => {
    setColor(props.hex);
    debouncedHandleColorChange(props.hex);
  };

  const debouncedHandleColorChange = useRef(
    debounce((newColor) => {
      editInvoiceSetting({
        invoice,
        setInvoice,
        settingName: 'themeColor',
        newValue: newColor,
      });
    }, 300),
  ).current;

  const handleSettingChange = ({ newValue, targetSetting }) => {
    editInvoiceSetting({
      invoice: invoice,
      setInvoice: setInvoice,
      settingName: targetSetting,
      newValue: newValue,
    });
  };

  return (
    <div className="mt-16 p-6 text-gray-900">
      <h3 className="mb-3 text-lg font-semibold">Template settings</h3>

      <Input
        onChange={(e) => setInvoice({ ...invoice, name: e.target.value })}
        value={invoice.name}
        placeholder="Name (internal only)"
        className="mb-2 w-full"
      />

      <hr className="mb-3 mt-5" />

      <h4 className="mb-2 pl-0.5 text-sm">Branding</h4>
      <ChromePicker
        color={color}
        defaultView="hex"
        onChangeComplete={handleColorChange}
        onChange={handleColorChange}
        className="ml-0.5"
      />

      <hr className="mb-3 mt-5" />

      <p className="mb-1 pl-0.5 text-sm">Invoice number</p>
      <Input
        onChange={(e) =>
          handleSettingChange({
            newValue: e.target.value,
            targetSetting: 'invoiceBase',
          })
        }
        value={invoice.settings.invoiceBase}
        // placeholder="ABC123"
        placeholder="..."
        className="mb-2 w-full"
      />

      <p className="mb-1 pl-0.5 text-sm">Auto increment</p>
      <Select
        onValueChange={(e) => {
          handleSettingChange({
            newValue: e,
            targetSetting: 'invoiceAppendix',
          });
        }}
        value={invoice.settings.invoiceAppendix}
      >
        <SelectTrigger className="mb-2 w-[180px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'1'}>1</SelectItem>
          <SelectItem value={'2'}>2</SelectItem>
          <SelectItem value={'3'}>3</SelectItem>
          <SelectItem value={'4'}>4</SelectItem>
          <SelectItem value={'5'}>5</SelectItem>
          <SelectItem value={'6'}>6</SelectItem>
          <SelectItem value={'7'}>7</SelectItem>
          <SelectItem value={'8'}>8</SelectItem>
          <SelectItem value={'9'}>9</SelectItem>
          <SelectItem value={'10'}>10</SelectItem>
        </SelectContent>
      </Select>

      <p className="mb-1 pl-0.5 text-sm">Filled in products are</p>
      <Select
        onValueChange={(e) => {
          handleSettingChange({
            newValue: e,
            targetSetting: 'taxSetting',
          });
        }}
        value={invoice.settings.taxSetting}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'incl'}>Including tax</SelectItem>
          <SelectItem value={'excl'}>Excluding tax</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
