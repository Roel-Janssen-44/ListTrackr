'use client';

import { useState } from 'react';
import { createCustomer } from '@/app/lib/actions';
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
import { Toaster } from '@/app/components/chadcn/sonner';
import { toast } from 'sonner';

export default function CustomerCreationForm() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmission(formData: FormData) {
    setIsLoading(true);
    try {
      const status = await createCustomer(formData);
      if (status.success) {
        setOpen(false);
        toast('Customer has been created successfully.');
      } else {
        console.error('Error creating customer:', status.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <Toaster />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <span className="focus-visible:secondary flex h-10 items-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white outline-tertiary transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50 hover:bg-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-active dark:outline-white">
            Create customer
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Create new customer</DialogTitle>
            <DialogDescription>
              <form action={handleFormSubmission}>
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
                        id="customerName"
                        name="name"
                        type="text"
                        placeholder="Full name *"
                        className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 outline-2 placeholder:text-gray-400"
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
                        className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 outline-2 placeholder:text-gray-400"
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
                        className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 outline-2 placeholder:text-gray-400"
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
                        className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 outline-2 placeholder:text-gray-400"
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
                        className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 outline-2 placeholder:text-gray-400"
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
                        className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 outline-2 placeholder:text-gray-400"
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
                        className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 outline-2 placeholder:text-gray-400"
                        aria-labelledby="country-error"
                      />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="mt-4">
                  {isLoading ? 'Loading...' : 'Create'}
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
