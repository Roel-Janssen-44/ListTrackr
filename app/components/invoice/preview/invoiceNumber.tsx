import { Field, InvoiceTemplate } from '@/app/lib/definitions';

export default function PreviewInvoiceNumber({
  fields = [],
  invoice,
}: {
  fields: Field[];
  invoice: InvoiceTemplate;
}) {
  return (
    <>
      {fields.map((field) => (
        <div
          key={field.id}
          className="group relative my-4 ml-10 flex flex-row items-end justify-between first-of-type:mt-0 last-of-type:mb-0"
        >
          <span
            className="font-semibold"
            style={
              invoice.settings.themeColor
                ? { color: invoice.settings.themeColor }
                : null
            }
          >
            {field.name}
          </span>
          <span className="text-gray-900">{field.value}</span>
        </div>
      ))}
    </>
  );
}
