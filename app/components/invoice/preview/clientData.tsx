import { Field, InvoiceTemplate } from '@/app/lib/definitions';

export default function PreviewClientData({
  fields,
  invoice,
}: {
  fields: Field[];
  invoice: InvoiceTemplate;
}) {
  return (
    <>
      <div className="flex flex-col">
        <ul className="p-0">
          {fields.map((field, index) => (
            <li
              style={
                invoice.settings.themeColor
                  ? { color: invoice.settings.themeColor }
                  : null
              }
              key={'template-client_data' + field.id}
              className="flex font-semibold"
            >
              {index === 0 && <div>{field.name}</div>}
            </li>
          ))}
          {fields.map((field) => (
            <li
              key={'template_client_data-name' + field.id}
              className="my-4 text-gray-900 last-of-type:mb-0"
            >
              {field.value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
