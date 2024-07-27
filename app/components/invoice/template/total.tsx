import React, { useRef, useEffect, useState } from 'react';
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import List from "@mui/material/List";

// import {
//   editTemplateField,
//   editTemplateSelect,
// } from "@features/templates/templatesSlice";
// import GetCurrentInvoice from "@lib/getCurrentInvoice";

// import ItemInput from "@components/ItemInput";

export default function TemplateTotal({ fields = [] }) {
  //   const dispatch = useDispatch();
  //   const templateId = GetCurrentInvoice();

  //   const handleChangeTemplateField = ({ newValue, targetId }) => {
  //     dispatch(editTemplateField({ templateId, fieldId: targetId, newValue }));
  //   };

  //   const handleSelectChange = ({ targetId, newValue }) => {
  //     console.log("editTemplateSelect");
  //     dispatch(
  //       editTemplateSelect({
  //         templateId,
  //         fieldGroupName: "total",
  //         fieldId: targetId,
  //         value: newValue,
  //       })
  //     );
  //   };

  return (
    <>
      <div className="ml-auto flex flex-col items-end justify-end">
        Total
        {/* <List className="gap-2 flex flex-col py-0 -mb-1">
          {fields.map((field, index) => (
            <div
              key={"template-total" + field.id}
              className="relative group my-0 flex flex-row gap-2 items-center"
            >
              <ItemInput
                handleChange={handleChangeTemplateField}
                value={field.name}
                styles={`py-1 text-sm text-right w-[115px]`}
                id={field.id}
              />
              {index === 0 && (
                <FormControl className="w-52">
                  <InputLabel id="demo-simple-select-label">
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
                    <MenuItem value={"Subtotaal ex BTW"}>
                      Subtotaal ex BTW
                    </MenuItem>
                    <MenuItem value={"Subtotaal incl BTW"}>
                      Subtotaal incl BTW
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              {index === 1 && (
                <FormControl className="w-52">
                  <InputLabel id="demo-simple-select-label">
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
                    <MenuItem value={"BTW 0%"}>BTW {"0%"}</MenuItem>
                    <MenuItem value={"BTW 9%"}>BTW {"9%"}</MenuItem>
                    <MenuItem value={"BTW 21%"}>BTW {"21%"}</MenuItem>
                  </Select>
                </FormControl>
              )}
              {index === 2 && (
                <FormControl className="w-52">
                  <InputLabel id="demo-simple-select-label">
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
                    <MenuItem value={"Totaal"}>Totaal</MenuItem>
                  </Select>
                </FormControl>
              )}
            </div>
          ))}
        </List> */}
      </div>
    </>
  );
}
