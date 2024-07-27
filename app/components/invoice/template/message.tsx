// import { useDispatch } from "react-redux";

// import { editTemplateField } from "@features/templates/templatesSlice";
// import GetCurrentInvoice from "@lib/getCurrentInvoice";

// import ItemInput from "@components/ItemInput";

export default function TemplateMessage({ fields = [] }) {
  //   const dispatch = useDispatch();
  //   const templateId = GetCurrentInvoice();
  //   const handleChangeTemplateField = ({ newValue, targetId }) => {
  //     dispatch(editTemplateField({ templateId, fieldId: targetId, newValue }));
  //   };

  return (
    <div className="mb-2">
      <ul className="m-0 flex gap-2 p-0">
        Message
        {/* {fields.map((field, index) => (
          <ItemInput
            key={"template_item_header-" + field.id}
            handleChange={handleChangeTemplateField}
            value={field.name}
            styles={`py-1 text-sm ${index === 0 ? "flex-1 " : "w-[125px]"} `}
            id={field.id}
          />
        ))} */}
      </ul>
    </div>
  );
}
