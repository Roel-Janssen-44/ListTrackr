'use client';

import { useState } from 'react';
// import { deleteInvoice } from '@/app/lib/actions';
import { Button } from '@/app/components/button';
import { Trash, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteInvoiceTemplate({
  invoiceId,
}: {
  invoiceId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleFormSubmission(formData: FormData) {
    setIsLoading(true);
    try {
      // Todo - implement deleteInvoice function.
      //   const status = await deleteInvoice(formData);
      //   if (status.success) {
      //     router.push(`/dashboard/invoices`);
      //     setIsLoading(false);
      //   } else {
      //     console.error('Error deleting invoice template:', status.message);
      //     setIsLoading(false);
      //   }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form action={handleFormSubmission}>
      <input name="id" type="hidden" value={invoiceId} />
      <Button type="submit">
        {isLoading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Trash size={24} />
        )}
      </Button>
    </form>
  );
}
