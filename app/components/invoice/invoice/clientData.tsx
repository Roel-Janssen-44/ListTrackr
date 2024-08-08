'use client';

import { useState, useEffect } from 'react';
import { Trash } from 'lucide-react';
import { Customer, Field } from '@/app/lib/definitions';
import { Input } from '@/app/components/chadcn/input';
import { Button } from '@/app/components/button';
import { InvoiceTemplate } from '@/app/lib/definitions';
import {
  addFieldToFieldGroup,
  removeFieldFromFieldGroup,
  editFieldValueInFieldGroup,
} from '@/app/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';
import { fetchCustomers } from '@/app/lib/data';

export default function InvoiceClientData({
  invoice,
  fields,
  setInvoice,
}: {
  invoice: InvoiceTemplate;
  fields: Field[];
  setInvoice: Function;
}) {
  const handleChangeField = ({
    newValue,
    targetId,
  }: {
    newValue: string;
    targetId: string;
  }) => {
    editFieldValueInFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'client',
      fieldId: targetId,
      newValue: newValue,
    });
  };

  const handleAddItem = () => {
    addFieldToFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'client',
    });
  };
  const handleRemoveItem = (fieldId: string) => {
    removeFieldFromFieldGroup({
      invoice: invoice,
      setInvoice: setInvoice,
      fieldGroupName: 'client',
      fieldId: fieldId,
    });
  };

  // const customers = await fetchCustomers();
  // console.log('customers');
  // console.log(customers);

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const showCustomers = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    showCustomers();
  }, []);

  useEffect(() => {
    console.log('customers');
    console.log(customers);
  }, [customers]);

  return (
    <>
      {/* Todo - add loader */}
      <p>Customer {'[i]'}</p>
      {/* Todo - show tooltip that the select won't go on the invoice */}
      <Select
        onValueChange={(e) => {
          const currentCustomer: Customer = customers.find(
            (customer) => customer.id === e,
          );

          setInvoice((prevInvoice) => {
            return {
              ...prevInvoice,
              customerId: e,
              fieldGroups: prevInvoice.fieldGroups.map((group) => {
                if (group.name === 'client') {
                  return {
                    ...group,
                    fields: group.fields.map((field: Field, index: number) => {
                      if (index === 1) {
                        return { ...field, value: currentCustomer.name || '' };
                      }
                      if (index === 2) {
                        return {
                          ...field,
                          value:
                            (currentCustomer.street || '') +
                            ' ' +
                            (currentCustomer.houseNumber || ''),
                        };
                      }
                      if (index === 3) {
                        return {
                          ...field,
                          value:
                            (currentCustomer.postalCode || '') +
                            ', ' +
                            (currentCustomer.country || ''),
                        };
                      }
                      return field;
                    }),
                  };
                }
                return group;
              }),
            };
          });
        }}
      >
        <SelectTrigger className="mb-2 w-[180px]">
          <SelectValue placeholder="Select a customer-" />
        </SelectTrigger>
        <SelectContent>
          {customers.map((customer) => (
            <SelectItem key={customer.id} value={customer.id}>
              {customer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {invoice.customerId && (
        <div className="flex flex-col">
          <ul className="p-0">
            {fields.map((field, index) => {
              if (index === 0 && field.name !== '') {
                return (
                  <h3
                    key={'client_data-title' + field.id}
                    className="m-0 cursor-not-allowed"
                  >
                    {field.name}
                  </h3>
                );
              }
            })}
            <div>
              {fields.map((field, index) => {
                if (index !== 0) {
                  return (
                    <div key={field.id}>
                      <div className="group relative my-1 w-48">
                        <Input
                          onChange={(e) =>
                            handleChangeField({
                              newValue: e.target.value,
                              targetId: field.id,
                            })
                          }
                          value={field.value}
                          id={field.id}
                        />
                        <div className="absolute -left-12 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-lg border-none bg-transparent py-1 outline-none group-hover:block hover:block">
                          <div
                            className="flex h-full justify-center"
                            aria-label="outlined primary button group"
                          >
                            <Button
                              aria-label="Delete item"
                              color="primary"
                              onClick={() => handleRemoveItem(field.id)}
                            >
                              <Trash size={24} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </ul>
          <div>
            <Button className="w-[192px]" onClick={handleAddItem}>
              Veld toevoegen
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
