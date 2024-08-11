import NonEditableItem from '@/app/components/nonEditableItem';

export default function InvoiceRowNames({ fields = [] }) {
  return (
    <div className="mb-2">
      <ul className="m-0 flex gap-2 p-0">
        {fields?.map((field, index) => (
          <span
            key={'invoice_item_header-' + field.name}
            className={`font-bold ${
              index === 0 ? 'flex-1' : 'flex w-[121px] justify-end'
            } ${index === 3 ? 'w-[65px]' : ''} `}
          >
            {field.name}
          </span>
        ))}
      </ul>
    </div>
  );
}
