'use client';

import { useRef, useState, useEffect } from 'react';
import { updateCustomer } from '@/app/lib/actions';
import { Input } from '@/app/components/chadcn/input';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/chadcn/dialog';
import { Button } from '@/app/components/button';
import { Customer } from '@/app/lib/definitions';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useFormState } from 'react-dom';

export default function CustomerCreationForm({
  customer,
}: {
  customer: Customer;
}) {
  const [open, setOpen] = useState(true);
  const [customerState, setCustomerState] = useState(customer);

  //   useEffect(() => {
  //     console.log('customer');
  //     console.log(customerState);
  //     console.log(customerState.name);
  //   }, [customerState]);

  const handleFieldChange = (value: string, field: string) => {
    setCustomerState({ ...customerState, [field]: value });
  };

  async function handleFormSubmission(formData: FormData) {
    console.log('start on form submission');
    console.log('formData');
    console.log(formData);
    // console.log(customerState);
    try {
      //   const status = await updateCustomer(formData);
      //   if (status.success) {
      //     setOpen(false);
      //   } else {
      //     console.error('Error creating customer:', status.message);
      //   }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogTrigger className="relative inline-flex h-10 w-auto flex-row items-center px-4 py-3 text-primary transition-colors hover:text-active">
    //     <PencilSquareIcon className="h-8 w-8" />
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle className="mb-4">Update customer</DialogTitle>
    //       <DialogDescription>
    <form action={updateCustomer}>
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
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <Button type="submit" className="mt-4">
          Save
        </Button>
      </div>
    </form>
    //       </DialogDescription>
    //     </DialogHeader>
    //   </DialogContent>
    // </Dialog>
  );
}
