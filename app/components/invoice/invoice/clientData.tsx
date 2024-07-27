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
// import { TransitionGroup } from "react-transition-group";

// import {
//   editInvoiceField,
//   addInvoiceField,
//   changeInvoiceFieldOrder,
//   removeInvoiceField,
// } from "@features/invoices/invoicesSlice";

// import GetCurrentInvoice from "@lib/getCurrentInvoice";

export default function InvoiceClientData({ fields = [] }) {
  //   const dispatch = useDispatch();
  //   const invoiceId = GetCurrentInvoice();
  //   const handleChangeField = ({ newValue, targetId }) => {
  //     dispatch(editInvoiceField({ invoiceId, fieldId: targetId, newValue }));
  //   };

  //   const handleAddItem = () => {
  //     dispatch(
  //       addInvoiceField({ invoiceId, fieldGroupName: "client", fieldId: uuid() })
  //     );
  //   };
  //   const handleRemoveItem = (fieldId) => {
  //     dispatch(
  //       removeInvoiceField({ invoiceId, fieldGroupName: "client", fieldId })
  //     );
  //   };
  //   const onDragEnd = (result) => {
  //     const { source, destination } = result;
  //     if (!destination) {
  //       return;
  //     }
  //     const { droppableId: sourceDroppableId, index: sourceIndex } = source;
  //     const { droppableId: destinationDroppableId, index: destinationIndex } =
  //       destination;

  //     dispatch(
  //       changeInvoiceFieldOrder({
  //         invoiceId,
  //         fieldGroupName: "client",
  //         startIndex: sourceIndex,
  //         endIndex: destinationIndex,
  //       })
  //     );
  //   };

  return 'asdfasd';
  // <>
  //   <div className="flex flex-col">
  //     <ul className="p-0">
  //       {fields.map((field, index) => {
  //         if (index === 0 && field.name !== "")
  //           return (
  //             <h3
  //               key={"client_data-title" + field.id}
  //               className="m-0 cursor-not-allowed"
  //             >
  //               {field.name}
  //             </h3>
  //           );
  //       })}
  //       {/* <DragDropContext onDragEnd={onDragEnd}>
  //         <Droppable droppableId="droppable">
  //           {(provided, snapshot) => (
  //             <div {...provided.droppableProps} ref={provided.innerRef}> */}
  //       <List>
  //         <TransitionGroup>
  //           {fields.map((field, index) => {
  //             if (index !== 0)
  //               return (
  //                 <Collapse key={field.id}>
  //                   {/* <Draggable
  //                             key={field.id}
  //                             draggableId={field.id}
  //                             index={index}
  //                           >
  //                             {(provided, snapshot) => ( */}
  //                   <div
  //                     className="relative group w-48 my-1"
  //                     // ref={provided.innerRef}
  //                     // {...provided.draggableProps}
  //                     // {...provided.dragHandleProps}
  //                   >
  //                     <ItemInput
  //                       handleChange={handleChangeField}
  //                       value={field.data}
  //                       id={field.id}
  //                     />
  //                     <div className="absolute -left-12 -translate-y-1/2 top-1/2 bg-white w-12 py-1 shadow-sm rounded-lg h-12 hidden group-hover:block hover:block">
  //                       <ButtonGroup
  //                         className="h-full flex justify-center"
  //                         variant="outlined"
  //                         aria-label="outlined primary button group"
  //                       >
  //                         {/* <IconButton
  //                           aria-label="Drag item"
  //                           color="primary"
  //                           // {...provided.dragHandleProps}
  //                         >
  //                           <DragIndicatorIcon />
  //                         </IconButton> */}
  //                         <IconButton
  //                           aria-label="Delete item"
  //                           color="primary"
  //                           onClick={() => handleRemoveItem(field.id)}
  //                         >
  //                           <DeleteIcon />
  //                         </IconButton>
  //                       </ButtonGroup>
  //                     </div>
  //                   </div>
  //                   {/* )}
  //                           </Draggable> */}
  //                 </Collapse>
  //               );
  //           })}
  //         </TransitionGroup>
  //       </List>
  //       {/* {provided.placeholder} */}
  //       {/* </div>
  //           )}
  //         </Droppable>
  //       </DragDropContext> */}
  //     </ul>
  //     <div>
  //       <Button
  //         variant="contained"
  //         className="w-[192px]"
  //         onClick={handleAddItem}
  //       >
  //         Veld toevoegen
  //       </Button>
  //     </div>
  //   </div>
  // </>
}
