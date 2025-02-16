'use client';

import { useState, useEffect, useActionState } from 'react';
import { Button } from '@/app/components/button';
import { createTable } from '@/app/lib/actions';

export default function CreateTable({ type }: { type: 'goal' | 'task' }) {
  const initialState = { message: null, errors: {} };
  const createTableWithType = createTable.bind(null, type);
  const [state, dispatch] = useActionState(createTableWithType, initialState);

  const [title, setTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTitle('');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 dark:bg-primary md:p-6">
        <div className="mb-4 text-tertiary dark:text-white">
          <label htmlFor="title" className="mb-4 block text-sm font-medium">
            New table name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              {title && (
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="..."
                  value={title}
                  onChange={handleChange}
                  className="peer mb-2 block w-full flex-1 rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 dark:bg-transparent"
                  aria-labelledby="title-error"
                  required
                />
              )}
            </div>
            <Button
              type="submit"
              className="bg-primary dark:bg-white dark:text-primary"
            >
              Create table
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
