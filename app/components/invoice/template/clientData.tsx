import { Input } from '@/app/components/chadcn/input';
import { Skeleton } from '@/app/components/chadcn/skeleton';

export default function TemplateClientData({ fields = [] }) {
  //   const dispatch = useDispatch();
  //   const templateId = GetCurrentInvoice();
  const handleChangeField = ({ newValue, targetId }) => {
    //     dispatch(editTemplateField({ templateId, fieldId: targetId, newValue }));
  };

  return (
    <>
      <div className="flex flex-col">
        <ul className="p-0">
          {fields.map((field, index) => (
            <div key={'template-client_data' + field.id} className="flex">
              {index === 0 && (
                <div className="w-48">
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
          {fields.map((field, index) => (
            <div key={'template_client_data-name' + field.id}>
              {index !== 0 && (
                <>
                  <Skeleton className="relative my-2 h-[30px] w-full last-of-type:mb-0" />
                </>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
