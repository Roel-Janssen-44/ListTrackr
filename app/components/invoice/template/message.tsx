// import { editTemplateField } from "@features/templates/templatesSlice";
// import GetCurrentInvoice from "@lib/getCurrentInvoice";

// import { Input } from '@/app/components/chadcn/input';
import { Textarea } from '@/app/components/chadcn/textarea';

export default function TemplateMessage({
  setInvoice,
  message,
}: {
  setInvoice: Function;
  message: string;
}) {
  //   const dispatch = useDispatch();
  //   const templateId = GetCurrentInvoice();
  const handleChangeTemplateField = ({ newValue, targetId }) => {
    //     dispatch(editTemplateField({ templateId, fieldId: targetId, newValue }));
  };

  return (
    <div className="mb-2">
      <ul className="m-0 flex gap-2 p-0">
        <Textarea
          key={'template_message-'}
          // handleChange={handleChangeTemplateField}

          value={message}
          className={`w-full py-1 text-sm`}
          // id={field.id}
        />
      </ul>
    </div>
  );
}
