'use client';

import { useState } from 'react';
// import { updateCustomer } from '@/app/lib/actions';
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

export default function CustomerCreationForm(customer: Customer) {
  const [open, setOpen] = useState(false);

  //   async function handleFormSubmission(formData: FormData) {
  //     try {
  //       const status = await createCustomer(formData);
  //       if (status.success) {
  //         setOpen(false);
  //       } else {
  //         console.error('Error creating customer:', status.message);
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="relative inline-flex h-10 w-auto flex-row items-center px-4 py-3 text-primary transition-colors hover:text-active">
        <PencilSquareIcon className="h-8 w-8" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Update customer</DialogTitle>
          <DialogDescription>
            <form
            // action={handleFormSubmission}
            >
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
                      defaultValue={customer.name}
                      id="customerName"
                      name="name"
                      type="text"
                      placeholder="Full name *"
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
                      id="customerEmail"
                      name="email"
                      type="text"
                      placeholder="Email *"
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
                      id="customerPhone"
                      name="phone"
                      type="text"
                      placeholder="Phone number *"
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
                      id="customerStreet"
                      name="streetname"
                      type="text"
                      placeholder="Streetname"
                      className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
                      aria-labelledby="street-error"
                    />
                  </div>
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="customerHousenumber"
                    className="sr-only mb-2 block text-sm font-medium"
                  >
                    Streetname
                  </label>
                  <div className="w-full">
                    <Input
                      id="customerHousenumber"
                      name="housenumber"
                      type="text"
                      placeholder="Housenumber"
                      className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
                      aria-labelledby="housenumber-error"
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
                      id="customerPostalcode"
                      name="postalcode"
                      type="text"
                      placeholder="Postalcode"
                      className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
                      aria-labelledby="postalcode-error"
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
                      id="customerCountry"
                      name="country"
                      type="text"
                      placeholder="Country"
                      className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
                      aria-labelledby="country-error"
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="mt-4">
                Save
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
