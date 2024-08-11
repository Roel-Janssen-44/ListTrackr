import { Textarea } from '@/app/components/chadcn/textarea';
import { InvoiceTemplate } from '@/app/lib/definitions';

export default function TemplateMessage({ message }: { message: string }) {
  return (
    <ul className="m-0 flex w-64 gap-2 p-0">
      <Textarea value={message} className={`h-full w-full py-1 text-sm`} />
    </ul>
  );
}
