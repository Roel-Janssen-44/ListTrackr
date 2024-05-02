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

    currentGoal.completedDates.push({
      day: taskDate.completion_date.getDay(),
      date: new Date(taskDate.completion_date),
      id: taskDate.id,
    });
  });

  return (
    <div className="mb-20">
      <h2 className={`${exo.className} mb-2 text-2xl font-bold`}>
        Weekly view
      </h2>
      <div className="dark:bg-primary scrollbar-thumb-primary dark:scrollbar-thumb-active w-full overflow-x-auto rounded-lg bg-gray-50 scrollbar scrollbar-track-slate-300 scrollbar-track-rounded scrollbar-thumb-rounded scrollbar-h-3">
        <div className="table text-left text-sm font-normal">
          <div className="dark:border-active flex w-full flex-row flex-nowrap items-center border-b-[1px] border-gray-200">
            <div className="inline-block w-[255px] px-4 py-3 pb-2 font-medium sm:pl-6"></div>

            <div
              className={`dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-4 py-3 pb-2 text-center font-medium sm:pl-6 ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(weekStart, 'dd-MM-yyyy')
                  ? 'dark:bg-active bg-gray-200'
                  : ''
              }`}
            >
              Monday
            </div>
            <div
              className={`dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 1), 'dd-MM-yyyy')
                  ? 'dark:bg-active bg-gray-200'
                  : ''
              }`}
            >
              Tuesday
            </div>
            <div
              className={`dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 2), 'dd-MM-yyyy')
                  ? 'dark:bg-active bg-gray-200'
                  : ''
              }`}
            >
              <span className="-ml-1">Wednesday</span>
            </div>
            <div
              className={`dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 3), 'dd-MM-yyyy')
                  ? 'dark:bg-active bg-gray-200'
                  : ''
              }`}
            >
              Thursday
            </div>
            <div
              className={`dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 4), 'dd-MM-yyyy')
                  ? 'dark:bg-active bg-gray-200'
                  : ''
              }`}
            >
              Friday
            </div>
            <div
              className={`dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 5), 'dd-MM-yyyy')
                  ? 'dark:bg-active bg-gray-200'
                  : ''
              }`}
            >
              Saterday
            </div>
            <div
              className={`dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium ${
                format(currentDate, 'dd-MM-yyyy') ==
                format(addDays(weekStart, 6), 'dd-MM-yyyy')
                  ? 'dark:bg-active bg-gray-200'
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
