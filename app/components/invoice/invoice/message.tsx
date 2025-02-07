import { Textarea } from '@/app/components/chadcn/textarea';
import { InvoiceTemplate } from '@/app/lib/types';

export default function TemplateMessage({
  setInvoice,
  message,
  invoice,
}: {
  setInvoice: Function;
  message: string;
  invoice: InvoiceTemplate;
}) {
  const handleChange = (newValue: string) => {
    setInvoice({ ...invoice, message: newValue });
  };

  return (
    <ul className="m-0 flex w-64 gap-2 p-0">
      <Textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={message}
        className={`h-full w-full py-1 text-sm`}
      />
    </ul>
  );
}
