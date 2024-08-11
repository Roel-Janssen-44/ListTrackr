import { Field } from '@/app/lib/definitions';

export default function PreviewClientData({ fields }: { fields: Field[] }) {
  return (
    <>
      <div className="flex flex-col">
        <ul className="p-0">
          {fields.map((field, index) => (
            <div
              key={'template-client_data' + field.id}
              className="flex font-bold"
            >
              {index === 0 && <div>{field.name}</div>}
            </div>
          ))}
          {fields.map((field) => (
            <div
              key={'template_client_data-name' + field.id}
              className="my-4 last-of-type:mb-0"
            >
              {field.value}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
