'use client';

import { format } from 'date-fns';
import { Goal } from '@/app/lib/types';

import { Button } from '@/app/components/chadcn/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { updateGoal, deleteTask } from '@/app/lib/actions';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/chadcn/select';

import { Checkbox } from '@components/chadcn/checkbox';
import { useRef } from 'react';
import { Input } from '@/app/components/chadcn/input';
import { useFormState } from 'react-dom';

export default function GoalTableRow({
  tableId,
  goal,
  removeGoal,
}: {
  tableId: string;
  goal: Goal;
  removeGoal: Function;
}) {
  const initialState = { message: null, errors: {} };

  const formRef = useRef(null);

  const handleBlur = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  const updateGoalWithId = updateGoal.bind(null, tableId, goal.id);
  const [state, dispatch] = useFormState(updateGoalWithId, initialState);

  const handleDeleteGoal = (id: string) => {
    removeGoal(id);
    deleteTask(id);
  };

  return (
    <form
      key={goal.id}
      ref={formRef}
      action={dispatch}
      className={`relative flex flex-row border-t-[1px] border-gray-200 odd:bg-gray-100 dark:border-white dark:border-opacity-10 dark:odd:bg-primary`}
    >
      <div className="flex w-full flex-row flex-nowrap items-center text-sm transition-colors hover:bg-gray-200 dark:hover:bg-active">
        <div className="min-w-[250px] flex-1 border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
          <Input
            name="title"
            className="w-full cursor-pointer border-none bg-transparent dark:bg-transparent"
            defaultValue={goal.title}
            onBlur={(e) => {
              if (e.target.value == '') return;
              if (e.target.value == goal.title) return;
              handleBlur();
            }}
          />
        </div>

        <div className="w-[175px] border-r-[1px] border-gray-200 px-3 dark:border-white dark:border-opacity-10">
          <Select
            defaultValue={goal.daysPerWeek}
            name="daysPerWeek"
            aria-labelledby="daysPerWeek-error"
            onValueChange={(value) => {
              if (value == '' || value == null) return;
              if (value == goal.daysPerWeek) return;
              handleBlur();
            }}
          >
            <SelectTrigger
              className={`w-[150px] border-none bg-transparent dark:border-none dark:bg-transparent ${
                goal.daysPerWeek == '0' ? 'text-transparent' : ''
              } `}
            >
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="7">7</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="px-3">
          <Button
            onClick={() => handleDeleteGoal(goal.id)}
            size="icon"
            variant="outline"
          >
            <div className="flex flex-row justify-center">
              <TrashIcon className="h-5 w-5" />
            </div>
          </Button>
        </div>
      </div>
    </form>
  );
}
