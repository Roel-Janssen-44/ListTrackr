'use client';

import { useState } from 'react';
import { deleteCustomer } from '@/app/lib/actions';
import { Button } from '@/app/components/button';
import { Trash, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteCustomer({ customerId }: { customerId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleFormSubmission(formData: FormData) {
    setIsLoading(true);
    try {
      const status = await deleteCustomer(formData);
      if (status.success) {
        router.push(`/dashboard/customers`);
        setIsLoading(false);
      } else {
        console.error('Error creating customer:', status.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form action={handleFormSubmission}>
      <input name="id" type="hidden" value={customerId} />
      <Button type="submit">
        {isLoading ? (
          <LoaderCircle className="spinning" />
        ) : (
          <Trash size={24} />
        )}
      </Button>
    </form>
  );
}
