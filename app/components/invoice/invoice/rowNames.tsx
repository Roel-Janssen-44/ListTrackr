import NonEditableItem from '@/app/components/nonEditableItem';
import { Field, InvoiceTemplate } from '@/app/lib/types';

export default function InvoiceRowNames({
  invoice,
  fields = [],
}: {
  invoice: InvoiceTemplate;
  fields: Field[];
}) {
  return (
    <div className="mb-2">
      <ul className="m-0 flex gap-2 p-0">
        {fields?.map((field, index) => (
          <span
            style={
              invoice.settings.themeColor
                ? { color: invoice.settings.themeColor }
                : null
            }
            key={'invoice_item_header-' + field.name}
            className={`font-semibold ${
              index === 0 ? 'flex-1' : 'flex w-[125px] justify-end'
            } ${index === 3 ? 'w-[65px]' : ''} `}
          >
            <NonEditableItem label={field.name} />
          </span>
        ))}
      </ul>
    </div>
  );
}
