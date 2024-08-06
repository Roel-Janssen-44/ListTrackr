import NonEditableItem from '@/app/components/nonEditableItem';

export default function InvoiceCompanyData({ fields = [] }) {
  return (
    <ul className="m-0 flex h-full flex-col items-end justify-center gap-4 pl-0">
      {fields.map((field, index) => {
        if (index === 0 && field.name !== '')
          return (
            <h3
              key={'company_data-title' + field.id}
              className="m-0 cursor-not-allowed"
            >
              {field.name}
            </h3>
          );
        else
          return (
            index !== 0 && (
              <NonEditableItem
                key={'incvoice_company_data-name' + field.id}
                label={field.name}
              />
            )
          );
      })}
    </ul>
  );
}
