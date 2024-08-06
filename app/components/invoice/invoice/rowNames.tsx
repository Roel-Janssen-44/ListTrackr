import NonEditableItem from '@/app/components/nonEditableItem';

export default function InvoiceRowNames({ fields = [] }) {
  return (
    <div className="mb-2">
      <ul className="m-0 flex gap-2 p-0">
        {/* <div className="mb-4 pb-2 px-1.5 border-solid border-b-2 border-gray-200">
            <ul className="flex  gap-2"> */}
        {fields?.map((field, index) => (
          <span
            key={'invoice_item_header-' + field.name}
            className={`${
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
