// import { useState, useRef } from "react";

// import { useDispatch } from "react-redux";
// import uuid from "react-uuid";
// import ItemInput from "@components/ItemInput";
// import NonEditableItem from "@components/NonEditableItem";
// import Button from "@mui/material/Button";
// import ButtonGroup from "@mui/material/ButtonGroup";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

// import {
//   DragDropContext,
//   DropResult,
//   Droppable,
//   Draggable,
// } from "@hello-pangea/dnd";

// import Collapse from "@mui/material/Collapse";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import { TransitionGroup } from "react-transition-group";

// import {
//   editTemplateField,
//   removeItemFromGroup,
//   addItemToGroup,
//   changeItemOrder,
// } from "@features/templates/templatesSlice";

// import GetCurrentInvoice from "@lib/getCurrentInvoice";

import { Button } from '@/app/components/button';
import { Input } from '@/app/components/chadcn/input';
import { Skeleton } from '@/app/components/chadcn/skeleton';
import { TrashIcon } from 'lucide-react';

export default function TemplateCompanyData({ fields = [] }) {
  //   const dispatch = useDispatch();
  //   const templateId = GetCurrentInvoice();
  const handleChangeField = ({ newValue, targetId }) => {
    //     dispatch(editTemplateField({ templateId, fieldId: targetId, newValue }));
  };

  const handleAddItem = () => {
    //     dispatch(
    //       addItemToGroup({ templateId, fieldGroupName: "company", fieldId: uuid() })
    //     );
  };
  const handleRemoveItem = (fieldId) => {
    //     dispatch(
    //       removeItemFromGroup({ templateId, fieldGroupName: "company", fieldId })
    //     );
  };
  const onDragEnd = (result) => {
    //     const { source, destination } = result;
    //     if (!destination) {
    //       return;
    //     }
    //     const { droppableId: sourceDroppableId, index: sourceIndex } = source;
    //     const { droppableId: destinationDroppableId, index: destinationIndex } =
    //       destination;
    //     if (templateId === undefined) return;
    //     dispatch(
    //       changeItemOrder({
    //         templateId,
    //         fieldGroupName: "company",
    //         startIndex: sourceIndex,
    //         endIndex: destinationIndex,
    //       })
    //     );
  };

  return (
    <>
      <div className="flex flex-col">
        <ul className="p-0">
          {fields.map((field, index) => (
            <div
              key={'template-company_data' + field.id}
              className="flex justify-end"
            >
              {index === 0 && (
                <div className=" w-48">
                  <Input
                    // handleChange={handleChangeField}
                    value={field.name}
                    id={field.id}
                    // label={'Koptekst, leeg laten voor geen title'}
                  />
                </div>
              )}
            </div>
          ))}
          <div className="flex flex-col items-end">
            {fields.map((field, index) => (
              // <Collapse key={field.id}>
              <div key={field.id} className="group relative my-1 w-48">
                {index !== 0 && (
                  <Input
                    // handleChange={handleChangeField}
                    value={field.name}
                    id={field.id}
                  />
                )}
                <div className="absolute -left-12 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-lg bg-white py-1 shadow-sm group-hover:block hover:block">
                  <div
                    className="flex h-full justify-center"
                    // variant="outlined"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      aria-label="Delete item"
                      color="primary"
                      onClick={() => handleRemoveItem(field.id)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ul>
        <div className="flex justify-end">
          <Button
            // variant="contained"
            className="w-[192px]"
            onClick={handleAddItem}
          >
            Veld toevoegen
          </Button>
        </div>
      </div>
    </>
  );
}
