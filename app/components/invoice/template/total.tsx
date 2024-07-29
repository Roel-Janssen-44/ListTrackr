import React, { useRef, useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';

// import {
//   editTemplateField,
//   editTemplateSelect,
// } from "@features/templates/templatesSlice";
// import GetCurrentInvoice from "@lib/getCurrentInvoice";

// import ItemInput from "@components/ItemInput";

import { Input } from '@/app/components/chadcn/input';

export default function TemplateTotal({
  setInvoice,
  fields = [],
}: {
  setInvoice: Function;
  fields: any;
}) {
  //   const dispatch = useDispatch();
  //   const templateId = GetCurrentInvoice();

  const handleChangeTemplateField = ({ newValue, targetId }) => {
    //     dispatch(editTemplateField({ templateId, fieldId: targetId, newValue }));
  };

  const handleSelectChange = ({ targetId, newValue }) => {
    //     console.log("editTemplateSelect");
    //     dispatch(
    //       editTemplateSelect({
    //         templateId,
    //         fieldGroupName: "total",
    //         fieldId: targetId,
    //         value: newValue,
    //       })
    //     );
  };

  return (
    <>
      <div className="flex flex-col items-end justify-end">
        <div className="-mb-1 flex flex-col gap-2 py-0">
          {fields.map((field, index) => (
            <div
              key={'template-total' + field.id}
              className="group relative my-0 flex flex-row items-center gap-2"
            >
              <Input
                // handleChange={handleChangeTemplateField}
                value={field.name}
                className={`w-[115px] py-1 text-right text-sm`}
                id={field.id}
              />
              {index === 0 && (
                <div className="w-52">
                  {/* <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={field.value}
                    label="Selecteer een optie"
                    onChange={(event) =>
                      handleSelectChange({
                        targetId: field.id,
                        newValue: event.target.value,
                      })
                    }
                  > */}
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'Subtotal ex BTW'}>
                        Subtotaal ex BTW
                      </SelectItem>
                      <SelectItem value={'Subtotal incl BTW'}>
                        Subtotaal incl BTW
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {index === 1 && (
                <div className="w-52">
                  <Select
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    value={field.value}
                    // label="Selecteer een optie"
                    // onChange={(event) =>
                    //   handleSelectChange({
                    //     targetId: field.id,
                    //     newValue: event.target.value,
                    //   })
                    // }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'BTW 0%'}>BTW {'0%'}</SelectItem>
                      <SelectItem value={'BTW 9%'}>BTW {'9%'}</SelectItem>
                      <SelectItem value={'BTW 21%'}>BTW {'21%'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {index === 2 && (
                <div className="w-52">
                  {/* <InputLabel id="demo-simple-select-label">
                    Selecteer een optie
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={field.value}
                    label="Selecteer een optie"
                    onChange={(event) =>
                      handleSelectChange({
                        targetId: field.id,
                        newValue: event.target.value,
                      })
                    }
                  >
                    <MenuItem value={'Totaal'}>Totaal</MenuItem>
                  </Select> */}
                  <Select value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'Total'}>Totaal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
