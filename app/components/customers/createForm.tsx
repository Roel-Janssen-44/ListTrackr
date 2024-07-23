'use client';

import { useRef } from 'react';
import { createCustomer } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Input } from '@/app/components/chadcn/input';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/app/components/button';

export default function CustomerCreationForm() {
  const initialState = { message: null, errors: {} };

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const generatedIdRef = useRef(null);

  //   const createTaskWithTableId = createTask.bind(null, table_id, type);
  //   const [state, dispatch] = useFormState(createCustomer, initialState);

  return (
    // To do - check if action is implemented correctly
    <form ref={formRef} action={createCustomer}>
      <div className="flex w-full flex-col gap-3 rounded-md bg-transparent pr-6">
        <div className="mb-1">
          <label
            htmlFor="customerName"
            className="sr-only mb-2 block text-sm font-medium"
          >
            Name of the customer
          </label>
          <div className="w-full">
            <Input
              ref={inputRef}
              id="customerName"
              name="name"
              type="text"
              placeholder="Full name"
              className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
              aria-labelledby="name-error"
              required
            />
          </div>
        </div>
        <div className="mb-1">
          <label
            htmlFor="customerEmail"
            className="sr-only mb-2 block text-sm font-medium"
          >
            Email of the customer
          </label>
          <div className="w-full">
            <Input
              ref={inputRef}
              id="customerEmail"
              name="email"
              type="text"
              placeholder="Email"
              className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
              aria-labelledby="email-error"
              required
            />
          </div>
        </div>
        <div className="mb-1">
          <label
            htmlFor="customerPhone"
            className="sr-only mb-2 block text-sm font-medium"
          >
            Phonenumber of the customer
          </label>
          <div className="w-full">
            <Input
              ref={inputRef}
              id="customerPhone"
              name="phone"
              type="text"
              placeholder="Phone number"
              className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
              aria-labelledby="phone-error"
              required
            />
          </div>
        </div>

        <div className="mb-1">
          <label
            htmlFor="customerStreet"
            className="sr-only mb-2 block text-sm font-medium"
          >
            Streetname
          </label>
          <div className="w-full">
            <Input
              ref={inputRef}
              id="customerStreet"
              name="streetname"
              type="text"
              placeholder="Streetname"
              className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
              aria-labelledby="street-error"
              required
            />
          </div>
        </div>
        <div className="mb-1">
          <label
            htmlFor="customerStreetnumber"
            className="sr-only mb-2 block text-sm font-medium"
          >
            Streetname
          </label>
          <div className="w-full">
            <Input
              ref={inputRef}
              id="customerStreetnumber"
              name="streetnumber"
              type="text"
              placeholder="Streetnumber"
              className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
              aria-labelledby="streetnumber-error"
              required
            />
          </div>
        </div>
        <div className="mb-1">
          <label
            htmlFor="customerPostalcode"
            className="sr-only mb-2 block text-sm font-medium"
          >
            Postalcode
          </label>
          <div className="w-full">
            <Input
              ref={inputRef}
              id="customerPostalcode"
              name="postalcode"
              type="text"
              placeholder="Postalcode"
              className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
              aria-labelledby="postalcode-error"
              required
            />
          </div>
        </div>
        <div className="mb-1">
          <label
            htmlFor="customerCountry"
            className="sr-only mb-2 block text-sm font-medium"
          >
            country
          </label>
          <div className="w-full">
            <Input
              ref={inputRef}
              id="customerCountry"
              name="country"
              type="text"
              placeholder="Country"
              className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
              aria-labelledby="country-error"
              required
            />
          </div>
        </div>
      </div>
      <Button type="submit" className="mt-4">
        Create
      </Button>
    </form>
  );
}
