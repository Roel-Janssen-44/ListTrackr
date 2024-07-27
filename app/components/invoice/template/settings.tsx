'use strict';

import React, { useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// @ts-expect-error
// import { ChromePicker } from "react-color";

// import { Card, Typography } from "@mui/material";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// import ItemInput from "@components/ItemInput";

// import {
//   editTemplateSettings,
//   selectSetting,
// } from "@features/templates/templatesSlice";

export default function InvoiceSettingsTemplate({
  templateId = '',
  factuurData = [],
}) {
  //   const dispatch = useDispatch();

  //   const [color, setColor] = useState("#1020AB");
  //   const handleColorChange = (props) => {
  //     setColor(props.hex);
  //     dispatch(
  //       editTemplateSettings({
  //         templateId,
  //         settingName: "themeColor",
  //         newValue: props.hex,
  //       })
  //     );
  //   };

  //   const handleSettingChange = ({ newValue, targetId }) => {
  //     dispatch(
  //       editTemplateSettings({
  //         templateId,
  //         settingName: targetId,
  //         newValue: newValue,
  //       })
  //     );
  //   };

  //   const invoiceAppendixSetting = useSelector(
  //     selectSetting(templateId, "invoiceAppendix")
  //   );
  //   const invoiceBaseSetting = useSelector(
  //     selectSetting(templateId, "invoiceBase")
  //   );
  //   const taxSetting = useSelector(selectSetting(templateId, "taxSetting"));
  //   const taxAmount = useSelector(selectSetting(templateId, "taxAmount"));

  return (
    <p>settings</p>
    // <Card className="mt-16 p-6">
    //   <Typography variant="h5" mb={3}>
    //     Sjabloon instellingen
    //   </Typography>
    //   <Typography variant="h6" mb={1.5}>
    //     Branding
    //   </Typography>
    //   {/* <ChromePicker
    //     color={color}
    //     onChangeComplete={handleColorChange}
    //     onChange={handleColorChange}
    //   /> */}
    //   <hr className="mt-8 mb-4" />
    //   <Typography variant="h6" mb={1.5}>
    //     Factuurnummer
    //   </Typography>
    //   <ItemInput
    //     handleChange={handleSettingChange}
    //     value={invoiceBaseSetting !== null ? invoiceBaseSetting : ""}
    //     styles="mb-2 w-full"
    //     id={"invoiceBase"}
    //     label="invoiceBase"
    //   />
    //   <FormControl fullWidth>
    //     <InputLabel id="discount-type-label">Aanhangsel</InputLabel>
    //     <Select
    //       labelId="discount-type-label"
    //       id="discount-type"
    //       value={invoiceAppendixSetting !== null ? invoiceAppendixSetting : ""}
    //       label="Aanhangsel"
    //       onChange={(event) =>
    //         handleSettingChange({
    //           newValue: event.target.value,
    //           targetId: "invoiceAppendix",
    //         })
    //       }
    //     >
    //       <MenuItem value={"Basisnummer + (x * 1)"}>
    //         Basisnummer + (x * 1)
    //       </MenuItem>
    //       <MenuItem value={"Basisnummer + (x * 2)"}>
    //         Basisnummer + (x * 2)
    //       </MenuItem>
    //       <MenuItem value={"Basisnummer + (x * 3)"}>
    //         Basisnummer + (x * 3)
    //       </MenuItem>
    //       <MenuItem value={"Basisnummer + (x * 4)"}>
    //         Basisnummer + (x * 4)
    //       </MenuItem>
    //       <MenuItem value={"Basisnummer + (x * 5)"}>
    //         Basisnummer + (x * 5)
    //       </MenuItem>
    //       <MenuItem value={"Basisnummer + (x * 6)"}>
    //         Basisnummer + (x * 6)
    //       </MenuItem>
    //       <MenuItem value={"Basisnummer + (x * 7)"}>
    //         Basisnummer + (x * 7)
    //       </MenuItem>
    //       <MenuItem value={"Basisnummer + (x * 8)"}>
    //         Basisnummer + (x * 8)
    //       </MenuItem>
    //       <MenuItem value={"Basisnummer + (x * 9)"}>
    //         Basisnummer + (x * 9)
    //       </MenuItem>
    //       <MenuItem value={"Basisnummer + (x * 10)"}>
    //         Basisnummer + (x * 10)
    //       </MenuItem>
    //     </Select>
    //   </FormControl>
    //   <hr className="mt-8 mb-4" />

    //   <Typography variant="h6" mb={1.5}>
    //     Btw
    //   </Typography>
    //   <FormControl fullWidth className="mb-2 ">
    //     <InputLabel id="tax_setting-label">Ingevulde velden zijn:</InputLabel>
    //     <Select
    //       labelId="tax_setting-label"
    //       id="tax_setting"
    //       value={taxSetting}
    //       label="Ingevulde velden zijn:"
    //       onChange={(event) =>
    //         handleSettingChange({
    //           newValue: event.target.value,
    //           targetId: "taxSetting",
    //         })
    //       }
    //     >
    //       <MenuItem value={"Inclusief Btw"}>Inclusief Btw</MenuItem>
    //       <MenuItem value={"Exclusief Btw"}>Exclusief Btw</MenuItem>
    //     </Select>
    //   </FormControl>
    //   <FormControl fullWidth>
    //     <InputLabel id="tax_amount-label">Btw hoeveelheid:</InputLabel>
    //     <Select
    //       labelId="tax_amount-label"
    //       id="tax_amount"
    //       value={taxAmount}
    //       label="Btw hoeveelheid:"
    //       onChange={(event) =>
    //         handleSettingChange({
    //           newValue: event.target.value,
    //           targetId: "taxAmount",
    //         })
    //       }
    //     >
    //       <MenuItem value={"0"}>0%</MenuItem>
    //       <MenuItem value={"9"}>9%</MenuItem>
    //       <MenuItem value={"21"}>21%</MenuItem>
    //     </Select>
    //   </FormControl>
    // </Card>
  );
}
