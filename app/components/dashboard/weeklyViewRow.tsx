'use client';

import { startOfWeek } from 'date-fns';
import { Goal } from '@/app/lib/definitions';
import { updateWeeklyTask } from '@/app/lib/actions';

import { CornerDownRight } from 'lucide-react';

import { Checkbox } from '@components/chadcn/checkbox';
import { useRef } from 'react';
import { useFormState } from 'react-dom';

export default function WeeklyViewRow({ task }: { task: Goal }) {
  const initialState = { message: null, errors: {} };

  const updateWeeklyTaskWithId = updateWeeklyTask.bind(null, task.id);
  const [state, dispatch] = useFormState(updateWeeklyTaskWithId, initialState);

  const mondayRef = useRef(null);
  const tuesdayRef = useRef(null);
  const wednesdayRef = useRef(null);
  const thursdayRef = useRef(null);
  const fridayRef = useRef(null);
  const saturdayRef = useRef(null);
  const sundayRef = useRef(null);

  let weeklyGoalMet: boolean;
  if (task.completedDates.length >= Number(task.daysPerWeek)) {
    weeklyGoalMet = true;
  } else {
    weeklyGoalMet = false;
  }

  return (
    <div className="relative border-b-[1px] border-gray-200 odd:bg-gray-100 last-of-type:border-0 dark:border-active dark:odd:bg-secondary">
      {weeklyGoalMet == true && (
        <div
          aria-hidden
          className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-20"
        >
          <div className="absolute left-[1%] top-1/2 z-0 h-[1px] w-[91%] -translate-y-1/2 rounded bg-black "></div>
        </div>
      )}
      <div className="relative flex w-full flex-row flex-nowrap items-center text-sm transition-colors hover:bg-gray-200 dark:hover:bg-active">
        {task.table_title && (
          <>
            <p className="absolute left-1.5 top-0.5 z-0 flex flex-row text-xs">
              {task.table_title}
            </p>
            <CornerDownRight className="absolute left-3 top-1/2 h-auto w-3 -translate-y-1/2 pt-1.5" />
          </>
        )}
        <div className="ml-1 inline-block w-[251px] px-6 py-4 pb-2 font-medium">
          {task.title}
          <span className="text-xs">
            {' '}
            ({task.completedDates.length} of {task.daysPerWeek})
          </span>
        </div>
        <div className="inline-block min-h-[40px] w-[95px] border-l-2 border-gray-200 p-1 text-center font-medium dark:border-active">
          <form
            ref={mondayRef}
            action={dispatch}
            className="relative flex h-full min-h-[40px] w-full items-center justify-center"
          >
            <input type="hidden" name="day" value={'monday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '1')?.id
              }
            />
            <label
              className="absolute left-0 top-0 h-full w-full cursor-pointer"
              htmlFor={`monday-${task.id}`}
            ></label>
            <Checkbox
              name="completed"
              id={`monday-${task.id}`}
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '1',
              )}
              onCheckedChange={(e) => {
                console.log('log monday change');
                console.log(e);
                if (mondayRef.current) {
                  mondayRef.current.requestSubmit();
                }
              }}
            />
          </form>
        </div>
        <div className="inline-block min-h-[40px] w-[95px] border-l-2 border-gray-200 p-1 text-center font-medium dark:border-active">
          <form
            ref={tuesdayRef}
            action={dispatch}
            className="relative flex h-full min-h-[40px] w-full items-center justify-center"
          >
            <input type="hidden" name="day" value={'tuesday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '2')?.id
              }
            />
            <label
              className="absolute left-0 top-0 h-full w-full cursor-pointer"
              htmlFor={`tuesday-${task.id}`}
            ></label>

            <Checkbox
              id={`tuesday-${task.id}`}
              name="completed"
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '2',
              )}
              onCheckedChange={(e) => {
                console.log('log tuesday change');
                console.log(e);
                if (tuesdayRef.current) {
                  tuesdayRef.current.requestSubmit();
                }
              }}
            />
          </form>
        </div>
        <div className="inline-block min-h-[40px] w-[95px] border-l-2 border-gray-200 p-1 text-center font-medium dark:border-active">
          <form
            ref={wednesdayRef}
            action={dispatch}
            className="relative flex h-full min-h-[40px] w-full items-center justify-center"
          >
            <input type="hidden" name="day" value={'wednesday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '3')?.id
              }
            />{' '}
            <label
              className="absolute left-0 top-0 h-full w-full cursor-pointer"
              htmlFor={`wednesday-${task.id}`}
            ></label>
            <Checkbox
              id={`wednesday-${task.id}`}
              name="completed"
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '3',
              )}
              onCheckedChange={(e) => {
                if (wednesdayRef.current) {
                  wednesdayRef.current.requestSubmit();
                }
              }}
            />
          </form>
        </div>
        <div className="inline-block min-h-[40px] w-[95px] border-l-2 border-gray-200 p-1 text-center font-medium dark:border-active">
          <form
            ref={thursdayRef}
            action={dispatch}
            className="relative flex h-full min-h-[40px] w-full items-center justify-center"
          >
            <input type="hidden" name="day" value={'thursday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '4')?.id
              }
            />
            <label
              className="absolute left-0 top-0 h-full w-full cursor-pointer"
              htmlFor={`thursday-${task.id}`}
            ></label>

            <Checkbox
              name="completed"
              id={`thursday-${task.id}`}
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '4',
              )}
              onCheckedChange={(e) => {
                if (thursdayRef.current) {
                  thursdayRef.current.requestSubmit();
                }
              }}
            />
          </form>
        </div>

        <div className="inline-block min-h-[40px] w-[95px] border-l-2 border-gray-200 p-1 text-center font-medium dark:border-active">
          <form
            ref={fridayRef}
            action={dispatch}
            className="relative flex h-full min-h-[40px] w-full items-center justify-center"
          >
            <input type="hidden" name="day" value={'friday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '5')?.id
              }
            />
            <label
              className="absolute left-0 top-0 h-full w-full cursor-pointer"
              htmlFor={`friday-${task.id}`}
            ></label>

            <Checkbox
              name="completed"
              id={`friday-${task.id}`}
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '5',
              )}
              onCheckedChange={(e) => {
                if (fridayRef.current) {
                  fridayRef.current.requestSubmit();
                }
              }}
            />
          </form>
        </div>
        <div className="inline-block min-h-[40px] w-[95px] border-l-2 border-gray-200 p-1 text-center font-medium dark:border-active">
          <form
            ref={saturdayRef}
            action={dispatch}
            className="relative flex h-full min-h-[40px] w-full items-center justify-center"
          >
            <input type="hidden" name="day" value={'saturday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '6')?.id
              }
            />
            <label
              className="absolute left-0 top-0 h-full w-full cursor-pointer"
              htmlFor={`saturday-${task.id}`}
            ></label>

            <Checkbox
              id={`saturday-${task.id}`}
              name="completed"
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '6',
              )}
              onCheckedChange={(e) => {
                if (saturdayRef.current) {
                  saturdayRef.current.requestSubmit();
                }
              }}
            />
          </form>
        </div>
        <div className="inline-block min-h-[40px] w-[95px] border-l-2 border-gray-200 p-1 text-center font-medium dark:border-active">
          <form
            ref={sundayRef}
            action={dispatch}
            className="relative flex h-full min-h-[40px] w-full items-center justify-center"
          >
            <input type="hidden" name="day" value={'sunday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '7')?.id
              }
            />
            <label
              className="absolute left-0 top-0 h-full w-full cursor-pointer"
              htmlFor={`sunday-${task.id}`}
            ></label>
            <Checkbox
              id={`sunday-${task.id}`}
              name="completed"
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '7',
              )}
              onCheckedChange={(e) => {
                if (sundayRef.current) {
                  sundayRef.current.requestSubmit();
                }
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
