'use client';

import { useRef } from 'react';
import { createTask } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Input } from '@/app/components/chadcn/input';
import { Task } from '@/app/lib/definitions';

export default function CreateTask({
  table_id,
  type,
  date,
  addTask,
}: {
  table_id: string;
  type: 'goal' | 'task';
  date: string;
  addTask: Function;
}) {
  const initialState = { message: null, errors: {} };

  const formRef = useRef(null);
  const inputRef = useRef(null);

  const handleBlur = () => {
    if (formRef.current) {
      addTask(inputRef.current.value);
      formRef.current.requestSubmit();
    }
  };

  const createTaskWithTableId = createTask.bind(null, table_id, type);
  const [state, dispatch] = useFormState(createTaskWithTableId, initialState);

  return (
    <form ref={formRef} action={dispatch}>
      <input type="hidden" name="date" value={date} />
      <div className="w-full rounded-md bg-transparent pr-6">
        <div className="mb-1">
          <label
            htmlFor="newTableTitle"
            className="sr-only mb-2 block text-sm font-medium"
          >
            Choose a title for the task
          </label>
          <div className="w-full">
            <Input
              ref={inputRef}
              id="newTableTitle"
              name="title"
              type="text"
              placeholder="..."
              className="ml-3 mt-1 block w-full rounded-md border-none bg-transparent py-2 pl-3 pr-20 text-sm outline-2 placeholder:text-gray-400 dark:bg-transparent"
              aria-labelledby="title-error"
              required
              onBlur={(e) => {
                if (e.target.value == '') return;
                handleBlur();
                if (inputRef.current) {
                  inputRef.current.value = '';
                }
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
