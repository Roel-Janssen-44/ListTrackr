'use strict';

// import { ChromePicker } from "react-color";

import { InvoiceTemplate } from '@/app/lib/definitions';
import { Input } from '@/app/components/chadcn/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';

import { editInvoiceSetting } from '@/app/lib/utils';

export default function InvoiceSettingsTemplate({
  invoice,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  setInvoice: Function;
}) {
  // const [color, setColor] = useState('#1020AB');
  // const handleColorChange = (props) => {
  //   // setColor(props.hex);
  //   // dispatch(
  //   //   editTemplateSettings({
  //   //     templateId,
  //   //     settingName: "themeColor",
  //   //     newValue: props.hex,
  //   //   })
  //   // );
  // };

  const handleSettingChange = ({ newValue, targetSetting }) => {
    editInvoiceSetting({
      invoice: invoice,
      setInvoice: setInvoice,
      settingName: targetSetting,
      newValue: newValue,
    });
  };

  return (
    <div className="mt-16 p-6">
      <p>Invoice settings</p>
      {/* <p>Branding</p> */}
      {/* <ChromePicker
        color={color}
        onChangeComplete={handleColorChange}
        onChange={handleColorChange}
      /> */}
      <hr className="mb-4 mt-8" />
      <p className="mb-0.5 pl-0.5 text-sm">Number</p>
      <Input
        onChange={(e) =>
          handleSettingChange({
            newValue: e.target.value,
            targetSetting: 'invoiceBase',
          })
        }
        placeholder="Invoice startnumber"
        className="mb-2 w-full placeholder-green-400"
      />

      <p className="mb-0.5 pl-0.5 text-sm">Auto increment</p>
      <Select
        onValueChange={(e) => {
          handleSettingChange({
            newValue: e,
            targetSetting: 'invoiceAppendix',
          });
        }}
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

      <p className="mb-0.5 pl-0.5 text-sm">Filled in products are</p>
      <Select
        onValueChange={(e) => {
          handleSettingChange({
            newValue: e,
            targetSetting: 'taxSetting',
          });
        }}
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
