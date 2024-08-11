import { Field } from '@/app/lib/definitions';

export default function TemplateInvoiceNumber({
  fields = [],
}: {
  fields: Field[];
}) {
  return (
    <>
      {fields.map((field) => (
        <div
          key={field.id}
          className="group relative my-4 ml-10 flex flex-row items-end justify-between first-of-type:mt-0 last-of-type:mb-0"
        >
          <span>{field.name}</span>
          <span>{field.value}</span>
        </div>
      ))}
    </>
  );
}
