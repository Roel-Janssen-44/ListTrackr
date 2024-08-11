import React, { useRef, useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';
import { Skeleton } from '@/app/components/chadcn/skeleton';

// import {
//   editTemplateField,
//   editTemplateSelect,
// } from "@features/templates/templatesSlice";
// import GetCurrentInvoice from "@lib/getCurrentInvoice";

// import ItemInput from "@components/ItemInput";

import { Input } from '@/app/components/chadcn/input';
import {
  editFieldInFieldGroup,
  editFieldValueInFieldGroup,
  editInvoiceSetting,
  handleTaxAmountChange,
} from '@/app/lib/utils';
import { InvoiceTemplate, Field } from '@/app/lib/definitions';

export default function TemplateTotal({ fields }: { fields: any }) {
  const handleChangeTemplateField = ({ newValue, targetId }) => {};

  const handleSelectChange = ({ newValue, targetId }) => {};

  const handleTaxChange = ({
    newValue,
    targetId,
  }: {
    newValue: string;
    targetId: string;
  }) => {};

  return (
    <>
      <div className="flex h-full flex-col items-end justify-end">
        <div className="-mb-1 flex flex-col gap-2 py-0">
          {fields.map((field: Field, index: number) => (
            <div
              key={'template-total' + field.id}
              className="group relative my-0 flex flex-row items-center gap-2"
            >
              <Input
                onChange={(e) => {
                  handleChangeTemplateField({
                    newValue: e.target.value,
                    targetId: field.id,
                  });
                }}
                value={field.name}
                className={`w-[115px] py-1 text-right text-sm`}
                id={field.id}
              />
              {index === 0 && (
                <div>
                  <Select
                    onValueChange={(e) => {
                      handleSelectChange({
                        newValue: e,
                        targetId: field.id,
                      });
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'excl'}>Subtotal excl VAT</SelectItem>
                      <SelectItem value={'incl'}>Subtotal incl VAT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {index === 1 && (
                <div>
                  <Select
                    onValueChange={(e) => {
                      handleTaxChange({
                        newValue: e,
                        targetId: field.id,
                      });
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={'0'}>VAT {'0%'}</SelectItem>
                      <SelectItem value={'9'}>VAT {'9%'}</SelectItem>
                      <SelectItem value={'21'}>VAT {'21%'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {index === 2 && <Skeleton className="my-2 h-[30px] w-full" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
