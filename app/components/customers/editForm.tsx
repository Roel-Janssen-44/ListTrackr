'use client';

import { useState } from 'react';
import { updateCustomer } from '@/app/lib/actions';
import { Input } from '@/app/components/chadcn/input';

import { Button } from '@/app/components/button';
import { Customer } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';

export default function CustomerCreationForm({
  customer,
}: {
  customer: Customer;
}) {
  const [customerState, setCustomerState] = useState(customer);
  const router = useRouter();

  const handleFieldChange = (value: string, field: string) => {
    setCustomerState({ ...customerState, [field]: value });
  };

  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmission(formData: FormData) {
    setIsLoading(true);
    try {
      const status = await updateCustomer(formData);
      if (status.success) {
        router.push(`/dashboard/customers/${customer.id}`);
      } else {
        console.error('Error creating customer:', status.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form action={handleFormSubmission}>
      <input type="hidden" name="id" value={customer.id} />
      <div className="flex w-full flex-col gap-3 rounded-md bg-transparent pr-6">
        <div className="mb-1">
          <label
            htmlFor="customerName"
            className="mb-2 block text-sm text-gray-700"
          >
            Name:
          </label>
          <div className="w-full">
            <Input
              defaultValue={customer.name}
              id="customerName"
              name="name"
              type="text"
              value={customerState.name}
              placeholder="..."
              className="mt-1 block w-full max-w-lg rounded-md bg-transparent py-2 pl-3 pr-20 text-sm text-gray-800 outline-2 placeholder:text-gray-300"
              aria-labelledby="name-error"
              required
              onChange={(e) => handleFieldChange(e.target.value, 'name')}
            />
          </div>
        </div>
        <div className="mb-1">
          <label
            htmlFor="customerEmail"
            className="mb-2 block text-sm text-gray-700"
          >
            Email:
          </label>
          <div className="w-full">
            <Input
              id="customerEmail"
              value={customerState.email}
              name="email"
              type="text"
              placeholder="..."
              className="mt-1 block w-full max-w-lg rounded-md bg-transparent py-2 pl-3 pr-20 text-sm text-gray-800 outline-2 placeholder:text-gray-300"
              aria-labelledby="email-error"
              required
              onChange={(e) => handleFieldChange(e.target.value, 'email')}
            />
          </div>
        </div>
        <div className="mb-1">
          <label
            htmlFor="customerPhone"
            className="mb-2 block text-sm text-gray-700"
          >
            Phonenumber:
          </label>
          <div className="w-full">
            <Input
              id="customerPhone"
              value={customerState.phone}
              name="phone"
              type="text"
              placeholder="..."
              className="mt-1 block w-full max-w-lg rounded-md bg-transparent py-2 pl-3 pr-20 text-sm text-gray-800 outline-2 placeholder:text-gray-300"
              aria-labelledby="phone-error"
              required
              onChange={(e) => handleFieldChange(e.target.value, 'phone')}
            />
          </div>
        </div>

        <div className="mb-1">
          <label
            htmlFor="customerStreet"
            className="mb-2 block text-sm text-gray-700"
          >
            Streetname:
          </label>
          <div className="w-full">
            <Input
              id="customerStreet"
              value={customerState.street}
              name="streetname"
              type="text"
              placeholder="..."
              className="mt-1 block w-full max-w-lg rounded-md bg-transparent py-2 pl-3 pr-20 text-sm text-gray-800 outline-2 placeholder:text-gray-300"
              aria-labelledby="street-error"
              onChange={(e) => handleFieldChange(e.target.value, 'street')}
            />
          </div>
        </div>
        <div className="mb-1">
          <label
            htmlFor="customerHousenumber"
            className="mb-2 block text-sm text-gray-700"
          >
            Housenumber:
          </label>
          <div className="w-full">
            <Input
              id="customerHousenumber"
              value={customerState.houseNumber}
              name="housenumber"
              type="text"
              placeholder="..."
              className="mt-1 block w-full max-w-lg rounded-md bg-transparent py-2 pl-3 pr-20 text-sm text-gray-800 outline-2 placeholder:text-gray-300"
              aria-labelledby="housenumber-error"
              onChange={(e) => handleFieldChange(e.target.value, 'houseNumber')}
            />
          </div>
        </div>
        <div className="mb-1">
          <label
            htmlFor="customerPostalcode"
            className="mb-2 block text-sm text-gray-700"
          >
            Postalcode:
          </label>
          <div className="w-full">
            <Input
              id="customerPostalcode"
              value={customerState.postalCode}
              name="postalcode"
              type="text"
              placeholder="..."
              className="mt-1 block w-full max-w-lg rounded-md bg-transparent py-2 pl-3 pr-20 text-sm text-gray-800 outline-2 placeholder:text-gray-300"
              aria-labelledby="postalcode-error"
              onChange={(e) => handleFieldChange(e.target.value, 'postalCode')}
            />
          </div>
        </div>
        <div className="mb-1">
          <label
            htmlFor="customerCountry"
            className="mb-2 block text-sm text-gray-700"
          >
            country:
          </label>
          <div className="w-full">
            <Input
              id="customerCountry"
              value={customerState.country}
              name="country"
              type="text"
              placeholder="..."
              className="mt-1 block w-full max-w-lg rounded-md bg-transparent py-2 pl-3 pr-20 text-sm text-gray-800 outline-2 placeholder:text-gray-300"
              aria-labelledby="country-error"
              onChange={(e) => handleFieldChange(e.target.value, 'country')}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <Button type="submit" className="mt-4">
          {isLoading ? 'Loading...' : 'Update'}
        </Button>
      </div>
    </form>
  );
}
