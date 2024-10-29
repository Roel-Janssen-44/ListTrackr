'use client';

import { useState, useEffect } from 'react';
import { createProject } from '@/app/lib/actions';
import { Project } from '@/app/lib/definitions';
import { Input } from '@/app/components/chadcn/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';
import { fetchCustomers } from '@/app/lib/data';
import { Customer } from '@/app/lib/definitions';
import { Button } from '@/app/components/chadcn/button';
import { Calendar } from '@/app/components/chadcn/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/chadcn/popover';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function CreateProjectForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState('');

  const router = useRouter();

  useEffect(() => {
    const showCustomers = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    showCustomers();
  }, []);

  async function handleFormSubmission(formData: FormData) {
    setIsLoading(true);
    try {
      const res = await createProject(formData);
      if (res.success) {
        router.push(`/dashboard/projects/${res.projectId}`);
      } else {
        console.error('Error creating customer:', res.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
    }
  }

  return (
    <form
      action={handleFormSubmission}
      className="flex max-w-md flex-col gap-2"
    >
      <div>
        <label htmlFor="name">* Project name</label>
        <Input
          className="mt-1"
          placeholder="Acme Corporation"
          id="name"
          name="name"
        />
      </div>
      <div>
        <label htmlFor="number">* Project number</label>
        <Input className="mt-1" placeholder="123" id="number" name="number" />
      </div>
      <div>
        <label htmlFor="customer">* Customer</label>
        <Select name="customer">
          <SelectTrigger
            name="customer"
            id="customer"
            className="mb-2 mt-1 w-[180px]"
          >
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
      </div>
      <div>
        <label htmlFor="start-date">Start date</label>
        <div className="w-[180px] text-left">
          <input
            aria-hidden
            className="hidden h-20 w-40 bg-green-500"
            name="start-date"
            type="start-date"
            value={format(new Date(), 'yyyy-MM-dd')}
          />
          <Popover>
            <PopoverTrigger asChild name="date">
              <Input
                className="mt-1 text-left"
                placeholder="123"
                value={startDate}
                id="start-date"
                name="start-date"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={new Date(startDate)}
                onSelect={(e) => {
                  setStartDate(format(e, 'yyyy-MM-dd'));
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div>
        <label htmlFor="end-date">End date</label>
        <div className="w-[180px] text-left">
          <input
            aria-hidden
            className="hidden h-20 w-40 bg-green-500"
            name="end-date"
            type="end-date"
            value={format(new Date(), 'yyyy-MM-dd')}
          />
          <Popover>
            <PopoverTrigger asChild name="date">
              <Input
                className="mt-1 text-left"
                placeholder="123"
                value={endDate}
                id="end-date"
                name="end-date"
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={new Date(endDate)}
                onSelect={(e) => {
                  setEndDate(format(e, 'yyyy-MM-dd'));
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button
        disabled={isLoading}
        className="mt-2 w-auto max-w-[180px] bg-primary hover:bg-active"
      >
        Create project
      </Button>
    </form>
  );
}
