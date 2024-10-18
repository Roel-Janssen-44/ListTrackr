import { Field, InvoiceTemplate } from '@/app/lib/definitions';

export default function PreviewRowNames({
  fields = [],
  invoice,
}: {
  fields: Field[];
  invoice: InvoiceTemplate;
}) {
  return (
    <div className="mb-2">
      <ul
        className="m-0 flex gap-2 p-0"
        style={
          invoice.settings.themeColor
            ? { color: invoice.settings.themeColor }
            : null
        }
      >
        {fields?.map((field, index) => (
          <span
            key={'invoice_item_header-' + field.name}
            className={`font-bold ${
              index === 0 ? 'flex-1' : 'flex w-[121px] justify-end'
            } ${index === 3 ? 'max-w-[110px]' : ''} `}
          >
            {field.name}
          </span>
        ))}
      </ul>
    </div>
  );
}
