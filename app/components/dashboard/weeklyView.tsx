'use server';

import { fetchGoals, fetchCompletedTaskDatesThisWeek } from '@/app/lib/data';
import { Goal } from '@/app/lib/definitions';
import { format, startOfWeek, addDays, getDay } from 'date-fns';
import { useRef } from 'react';
import { Checkbox } from '@components/chadcn/checkbox';
import { exo } from '@/app/components/fonts';
import WeeklyViewRow from './weeklyViewRow';

export default async function WeeklyView() {
  const fetchedGoals = await fetchGoals();
  let goals: Goal[] = [];

  fetchedGoals.forEach((goal) => {
    const changedGoal: Goal = {
      id: goal.id,
      title: goal.title,
      table_id: goal.table_id,
      daysPerWeek: goal.daysperweek?.toString() || '0',
      completed: goal.completed,
      completedDates: [],
      status: '',
      priority: '',
      table_title: goal.table_title,
    };
    goals.push(changedGoal);
  });

  if (goals.length == 0) return;

  const currentDate = new Date();
  const currentDayOfTheWeek = currentDate.getDay();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  const completedTaskDates = await fetchCompletedTaskDatesThisWeek();

  completedTaskDates.forEach((taskDate) => {
    const currentGoal = goals.find((goal) => goal.id == taskDate.task_id);

    currentGoal?.completedDates.push({
      day: taskDate.completion_date.getDay(),
      date: new Date(taskDate.completion_date),
      id: taskDate.id,
    });
  });

  return (
    <div className="mb-10">
      <div className="w-full overflow-x-auto rounded-lg bg-gray-50 px-3 text-tertiary scrollbar scrollbar-track-slate-300 scrollbar-thumb-primary scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3 dark:bg-primary dark:text-white dark:scrollbar-thumb-active">
        <div className="table w-full text-left text-sm font-normal">
          <div className="flex w-full flex-row flex-nowrap items-center border-b-[1px] border-gray-200 dark:border-active">
            <div className="inline-block w-[255px] px-4 py-3 pb-2 font-medium sm:pl-6"></div>
            <div
              className={`inline-block w-[95px] border-l-2 border-gray-200 px-4 py-3 pb-2 text-center font-medium dark:border-active sm:pl-6 ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(weekStart, 'dd-MM-yyyy')
                  ? 'bg-gray-200 dark:bg-active'
                  : ''
              }`}
            >
              Monday
            </div>
            <div
              className={`inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium dark:border-active ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 1), 'dd-MM-yyyy')
                  ? 'bg-gray-200 dark:bg-active'
                  : ''
              }`}
            >
              Tuesday
            </div>
            <div
              className={`inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium dark:border-active ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 2), 'dd-MM-yyyy')
                  ? 'bg-gray-200 dark:bg-active'
                  : ''
              }`}
            >
              <span className="-ml-1">Wednesday</span>
            </div>
            <div
              className={`inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium dark:border-active ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 3), 'dd-MM-yyyy')
                  ? 'bg-gray-200 dark:bg-active'
                  : ''
              }`}
            >
              Thursday
            </div>
            <div
              className={`inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium dark:border-active ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 4), 'dd-MM-yyyy')
                  ? 'bg-gray-200 dark:bg-active'
                  : ''
              }`}
            >
              Friday
            </div>
            <div
              className={`inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium dark:border-active ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 5), 'dd-MM-yyyy')
                  ? 'bg-gray-200 dark:bg-active'
                  : ''
              }`}
            >
              Saterday
            </div>
            <div
              className={`inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium dark:border-active ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 6), 'dd-MM-yyyy')
                  ? 'bg-gray-200 dark:bg-active'
                  : ''
              }`}
            >
              Sunday
            </div>
          </div>
        </div>
        <div className="relative table w-full max-w-full">
          {goals.map((goal: Goal) => (
            <WeeklyViewRow key={`weekly_task_${goal.id}`} task={goal} />
          ))}
        </div>
      </div>
    </div>
  );
}
