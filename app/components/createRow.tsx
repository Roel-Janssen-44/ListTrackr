'use client';

import { useRef, useState, useEffect, useActionState } from 'react';
import { createTask } from '@/app/lib/actions';
import { Input } from '@/app/components/chadcn/input';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

export default function CreateTask({
  project_id,
  table_id,
  parent_id,
  type,
  date,
  addTask,
}: {
  project_id: string;
  table_id: string;
  parent_id?: string;
  type: 'goal' | 'task';
  date: string;
  addTask: Function;
}) {
  const initialState = { message: null, errors: {} };

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const generatedIdRef = useRef(null);
  const keydownListenerRef = useRef(null);

  const handleBlur = () => {
    const generatedId = uuidv4();
    if (generatedIdRef.current) {
      generatedIdRef.current.value = generatedId;
    }
    if (formRef.current) {
      if (inputRef.current.value.length <= 3) {
        toast.error('Task title must be more than 3 characters');
        return;
      }
      if (inputRef.current.value.length > 128) {
        toast.error('Task title must be less than 128 characters');
        return;
      }
      const currentDate = new Date();
      const today = currentDate.setDate(currentDate.getDate());
      const tomorrow = currentDate.setDate(currentDate.getDate() + 1);
      if (date === 'today') {
        addTask(generatedId, false, inputRef.current.value, 'planned', today);
      } else if (date === 'tomorrow') {
        addTask(
          generatedId,
          false,
          inputRef.current.value,
          'planned',
          tomorrow,
        );
      } else {
        addTask(generatedId, false, inputRef.current.value, '', '');
      }

      formRef.current.requestSubmit();
      inputRef.current.value = '';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleFocus = () => {
    if (!keydownListenerRef.current) {
      keydownListenerRef.current = handleKeyDown;
      window.addEventListener('keydown', keydownListenerRef.current);
    }
  };

  const handleInputBlur = (e) => {
    if (e.target.value === '') return;
    handleBlur();
  };

  const removeEnterEventListener = () => {
    if (keydownListenerRef.current) {
      window.removeEventListener('keydown', keydownListenerRef.current);
      keydownListenerRef.current = null;
    }
  };

  const createTaskWithTableId = createTask.bind(
    null,
    project_id,
    table_id,
    type,
  );
  const [state, dispatch] = useActionState(createTaskWithTableId, initialState);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <form ref={formRef} action={dispatch}>
        <input type="hidden" name="date" value={date} />
        <input type="hidden" name="generatedId" ref={generatedIdRef} />
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
                className="ml-3 mt-1 block w-full rounded-md border-none bg-transparent py-2 pl-3 pr-20 text-base outline-2 placeholder:text-gray-400 dark:bg-transparent"
                aria-labelledby="title-error"
                onFocusCapture={handleFocus}
                onBlur={handleInputBlur}
                onBlurCapture={removeEnterEventListener}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
