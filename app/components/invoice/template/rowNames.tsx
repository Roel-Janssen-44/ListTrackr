// import { editTemplateField } from "@features/templates/templatesSlice";
// import GetCurrentInvoice from "@lib/getCurrentInvoice";

import { Input } from '@/app/components/chadcn/input';

export default function TemplateRowNames({
  setInvoice,
  fields = [],
}: {
  setInvoice: Function;
  fields: any;
}) {
  //   const dispatch = useDispatch();
  //   const templateId = GetCurrentInvoice();
  const handleChangeTemplateField = ({ newValue, targetId }) => {
    // dispatch(editTemplateField({ templateId, fieldId: targetId, newValue }));
  };

  return (
    <div className="mb-2">
      <ul className="m-0 flex gap-2 p-0">
        {fields.map((field, index) => (
          <Input
            key={'template_item_header-' + field.id}
            // handleChange={handleChangeTemplateField}
            value={field.name}
            className={`py-1 text-sm ${index === 0 ? 'flex-1 ' : 'w-[125px]'} `}
            id={field.id}
          />
        ))}
      </ul>
    </div>
  );
}
