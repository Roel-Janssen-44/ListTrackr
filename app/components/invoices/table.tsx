'use client';

import { Button } from '@/app/components/button';
import { Invoice, InvoiceTemplateName } from '@/app/lib/types';
import Link from 'next/link';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';
import { formatCurrency } from '@/app/lib/utils';
import { updateInvoiceStatus } from '@/app/lib/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/chadcn/dialog';

export default function InvoicesTable({
  invoices,
  templates,
  projectId,
  showTemplates = false,
}: {
  invoices: Invoice[];
  templates: InvoiceTemplateName[];
  projectId?: string;
  showTemplates?: boolean;
}) {
  return (
    <>
      {invoices.length !== 0 && (
        <div className="flex flex-col flex-wrap gap-2">
          <div className="relative my-6 w-full rounded-lg bg-white p-3 text-tertiary dark:bg-primary dark:text-white">
            <div className="w-full overflow-x-auto rounded-lg bg-white scrollbar scrollbar-track-slate-300 scrollbar-thumb-active scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-secondary">
              <div className="table w-full text-left text-sm font-normal">
                <div className="justify-bwetween flex w-full flex-row flex-nowrap items-center justify-between">
                  <div className="inline-block w-[350px] px-4 py-3 pb-2 font-medium sm:pl-2">
                    Invoicenumber
                  </div>
                  <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                    Amount
                  </div>
                  <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                    Date
                  </div>
                  <div className="inline-block w-[175px] px-3 py-3 pb-2 font-medium">
                    Status
                  </div>
                </div>
              </div>

              <div className="relative table w-full max-w-full">
                {invoices?.map((invoice: Invoice) => (
                  <Link
                    href={`/dashboard/invoices/${invoice.id}`}
                    key={invoice.id}
                    className={`relative flex flex-row border-t-[1px] border-gray-200 odd:bg-gray-50 dark:border-white dark:border-opacity-10 dark:odd:bg-primary`}
                  >
                    <div className="group flex w-full flex-row flex-nowrap items-center justify-between text-sm transition-colors hover:bg-gray-100 dark:hover:bg-active">
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
                          onValueChange={async (value) => {
                            await updateInvoiceStatus({
                              newValue: value,
                              invoiceId: invoice.id,
                            });
                          }}
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
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {invoices.length === 0 && (
        <div>
          <h3 className="mb-4 text-gray-900">No invoices found.</h3>
        </div>
      )}
      {showTemplates && (
        <div>
          {templates.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create invoice</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Choose template</DialogTitle>
                  <DialogDescription className="mb-2">
                    Choose a template to create an invoice
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row flex-wrap justify-between">
                  {templates?.map((template) => (
                    <Link
                      key={template.id}
                      href={`/dashboard/invoices/create/${template.id}${
                        projectId ? `?projectId=${projectId}` : ''
                      }`}
                      className="mb-4 flex h-36 w-36 items-center justify-center rounded-md border-2 border-primary text-center transition-all hover:bg-primary hover:text-white"
                    >
                      {template.name}
                    </Link>
                  ))}
                </div>
                <DialogFooter>
                  <Button type="submit">Cancel</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {templates.length === 0 && (
            <div>
              <h3 className="mb-4 text-gray-900">No templates found.</h3>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export function InvoicesTableLoader() {
  return (
    <div className="flex flex-col flex-wrap gap-2">
      <div className="relative w-full rounded-lg bg-white p-3 pb-0 dark:bg-primary">
        <div className="mb-0 w-full overflow-x-auto rounded-lg bg-white pb-0 scrollbar dark:bg-secondary">
          <div className="relative table w-full max-w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`relative flex animate-pulse flex-row gap-6 ${
                  index == 0 ? '' : 'border-t-[1px]'
                } border-gray-200 py-2`}
              >
                {['w-[350px]', 'w-[175px]', 'w-[175px]', 'w-[175px]'].map(
                  (width, i) => (
                    <div
                      key={i}
                      className={`h-8 ${width} rounded-md bg-gray-300 px-3 py-1`}
                    />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
