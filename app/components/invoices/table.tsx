'use client';

import { useState } from 'react';
import { Button } from '@/app/components/button';
import { Invoice } from '@/app/lib/definitions';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';
import { Checkbox } from '@components/chadcn/checkbox';
import { formatCurrency } from '@/app/lib/utils';

export default function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <>
      <div className="mb-8 flex flex-col flex-wrap gap-2">
        {invoices?.map((invoice) => (
          <div
            key={invoice.id}
            className="group relative flex w-full items-center rounded-lg shadow"
          >
            <Link
              className="mr-4"
              href={`/dashboard/invoices/${invoice.id}/edit`}
            >
              <Button>
                <Pencil />
              </Button>
            </Link>
            <Link
              className="flex w-full flex-row justify-between p-3"
              href={`/dashboard/invoices/${invoice.id}`}
            >
              <span>{invoice.number}</span>
              <span>{invoice.status}</span>
              <span>{invoice.amount}</span>
              <span>{format(invoice.date, 'dd/MM/yyyy')}</span>
            </Link>
          </div>
        ))}

        <div className="relative my-6 rounded-lg bg-white p-3 text-tertiary dark:bg-primary dark:text-white">
          <div className="w-full overflow-x-auto rounded-lg bg-white scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-secondary">
            <div className="ml-[50px] table text-left text-sm font-normal">
              <div className="flex w-full flex-row flex-nowrap items-center">
                <div className="inline-block w-[350px] px-4 py-3 pb-2 font-medium sm:pl-6">
                  Invoicenumber
                </div>
                <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                  Amount
                </div>
                <div className="inline-block w-[175px] px-3 py-3 pb-2 pl-6 font-medium">
                  Date
                </div>
                <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                  Status
                </div>
              </div>
            </div>
            <div className="relative table w-full max-w-full">
              {invoices?.map((invoice: Invoice) => (
                <form
                  key={invoice.id}
                  className={`relative flex flex-row border-t-[1px] border-gray-200 odd:bg-gray-50 dark:border-white dark:border-opacity-10 dark:odd:bg-primary`}
                >
                  <div className="group flex w-full flex-row flex-nowrap items-center text-sm transition-colors hover:bg-gray-100 dark:hover:bg-active">
                    <div
                      className={`relative flex w-[50px] items-center justify-center border-r-[1px] border-gray-200 px-3 py-1 dark:border-white dark:border-opacity-10`}
                    >
                      <Checkbox
                        name="completed"
                        defaultChecked={invoice.status == 'paid' ? true : false}
                        // onCheckedChange={(value) => {
                        //   handleUpdateTask('completed', value);
                        //   handleBlur();
                        // }}
                      />
                      <label
                        className="absolute left-0 top-0 h-full w-full cursor-pointer"
                        // htmlFor={task.id}
                      ></label>
                    </div>
                    <div className="w-[350px] border-r-[1px] border-gray-200 px-3 py-1 dark:border-white dark:border-opacity-10">
                      {invoice.number}
                    </div>
                    <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
                      {formatCurrency(invoice.amount)}
                    </div>
                    <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
                      {format(invoice.date, 'dd/MM/yyyy')}
                    </div>

                    <div className="my-1 w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
                      <Select
                        defaultValue={invoice.status}
                        name="priority"
                        aria-labelledby="priority-error"
                        // onValueChange={(value) => {
                        //   if (value == '') return;
                        //   if (value == task.priority) return;
                        //   handleUpdateTask('priority', value);
                        //   handleBlur();
                        // }}
                      >
                        <SelectTrigger
                          className={`w-[150px] ${
                            invoice.status == 'paid'
                              ? 'bg-green-400'
                              : invoice.status == 'created'
                              ? 'bg-gray-200'
                              : invoice.status == 'pending'
                              ? 'bg-orange-400'
                              : invoice.status == 'overdue'
                              ? 'bg-red-400'
                              : 'border-none bg-transparent text-transparent dark:bg-transparent'
                          }`}
                        >
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="created">Created</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="z-30 flex h-full items-center bg-transparent px-3">
                      <button
                        // onClick={() => handleDeleteTask(task.id)}
                        // size="icon"
                        // variant="outline"
                        className="border-transparent bg-red-600 text-white hover:bg-red-400 hover:text-white dark:border-transparent dark:bg-red-600 dark:hover:bg-red-400"
                      >
                        <div className="flex flex-row justify-center">
                          {/* <TrashIcon className="h-5 w-5" /> */}
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Todo - display modal to select invoice template */}
        <Button>Create invoice</Button>
      </div>
    </>
  );
}
