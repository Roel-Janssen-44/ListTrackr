import { Field, InvoiceTemplate } from '@/app/lib/types';
import NonEditableItem from '@/app/components/nonEditableItem';

export default function InvoiceCompanyData({
  invoice,
  fields = [],
}: {
  invoice: InvoiceTemplate;
  fields: Field[];
}) {
  return (
    <ul className="m-0 flex h-full flex-col items-end justify-center gap-4 pl-0">
      {fields.map((field, index) => {
        if (index === 0 && field.name !== '')
          return (
            <h3
              style={
                invoice.settings.themeColor
                  ? { color: invoice.settings.themeColor }
                  : null
              }
              key={'company_data-title' + field.id}
              className="m-0 cursor-not-allowed font-semibold"
            >
              {field.name}
            </h3>
          );
        else
          return (
            index !== 0 && (
              <div
                key={'incvoice_company_data-name' + field.id}
                className="text-gray-900"
              >
                <NonEditableItem label={field.name} />
              </div>
            )
          );
      })}
    </ul>
  );
}
