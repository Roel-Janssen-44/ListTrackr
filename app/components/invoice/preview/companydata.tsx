import { Field, InvoiceTemplate } from '@/app/lib/definitions';

export default function PreviewCompanyData({
  fields,
  invoice,
}: {
  fields: Field[];
  invoice: InvoiceTemplate;
}) {
  return (
    <ul className="m-0 flex h-full flex-col items-end justify-center gap-4 pl-0">
      <div className="flex flex-col">
        <ul className="p-0">
          {fields.map((field, index) => (
            <div
              key={'template-client_data' + field.id}
              className="flex-end flex justify-end"
            >
              {index === 0 && (
                <div
                  className="font-semibold"
                  style={
                    invoice.settings.themeColor
                      ? { color: invoice.settings.themeColor }
                      : null
                  }
                >
                  {field.name}
                </div>
              )}
              {index !== 0 && (
                <div
                  key={'template_client_data-name' + field.id}
                  className="my-4 text-right text-gray-900 last-of-type:mb-0"
                >
                  {field.name}
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </ul>
  );
}
