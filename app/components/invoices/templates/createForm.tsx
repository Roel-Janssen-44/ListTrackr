'use client';

import { useState } from 'react';
// import { createInvoice } from '@/app/lib/actions';
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

export default function CreateInvoiceTemplate() {
  // const [open, setOpen] = useState(false);

  // async function handleFormSubmission(formData: FormData) {
  //   try {
  //     const status = await createInvoice(formData);
  //     if (status.success) {
  //       setOpen(false);
  //     } else {
  //       console.error('Error creating invoice:', status.message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  return (
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogTrigger>
    //     <span className="focus-visible:secondary flex h-10 items-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white outline-tertiary transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50 hover:bg-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-active dark:outline-white">
    //       Create invoice
    //     </span>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle className="mb-4">Create new invoice</DialogTitle>
    //       <DialogDescription>
    //         <form action={handleFormSubmission}>
    //           <div className="flex w-full flex-col gap-3 rounded-md bg-transparent pr-6">
    //             <div className="mb-1">
    //               <label
    //                 htmlFor="invoiceAmount"
    //                 className="sr-only mb-2 block text-sm font-medium"
    //               >
    //                 Amount
    //               </label>
    //               <div className="w-full">
    //                 <Input
    //                   id="invoiceAmount"
    //                   name="amount"
    //                   type="number"
    //                   placeholder="0.00"
    //                   min={0.01}
    //                   step={1}
    //                   className="mt-1 block w-full rounded-md bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400"
    //                   aria-labelledby="amount-error"
    //                   required
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           <Button type="submit" className="mt-4">
    //             Create
    //           </Button>
    //         </form>
    //       </DialogDescription>
    //     </DialogHeader>
    //   </DialogContent>
    // </Dialog>
    <p>invoice template create form</p>
  );
}
