'use client';

import { format, startOfWeek, addDays } from 'date-fns';
import { Goal } from '@/app/lib/definitions';
import { Button } from '@/app/components/chadcn/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { updateWeeklyTask, deleteTask } from '@/app/lib/actions';

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

export default function WeeklyViewRow({ task }: { task: Goal }) {
  const initialState = { message: null, errors: {} };

  const formRef = useRef(null);

  const updateWeeklyTaskWithId = updateWeeklyTask.bind(null, task.id);
  const [state, dispatch] = useFormState(updateWeeklyTaskWithId, initialState);

  const currentDate = new Date();
  const currentDayOfTheWeek = currentDate.getDay();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  const mondayRef = useRef(null);
  const tuesdayRef = useRef(null);
  const wednesdayRef = useRef(null);
  const thursdayRef = useRef(null);
  const fridayRef = useRef(null);
  const saturdayRef = useRef(null);
  const sundayRef = useRef(null);

  return (
    <div className="dark:odd:bg-secondary dark:border-active border-b-[1px] border-gray-200 odd:bg-gray-100">
      <div className="dark:hover:bg-active flex w-full flex-row flex-nowrap items-center text-sm transition-colors hover:bg-gray-200">
        <div className="inline-block w-[255px] px-4 py-3 pb-2 font-medium sm:pl-6">
          {task.title}
          <span className="text-xs">
            {' '}
            ({task.completedDates.length} of {task.daysPerWeek})
          </span>
        </div>
        <div className="dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium">
          <form ref={mondayRef} action={dispatch}>
            <input type="hidden" name="day" value={'monday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '1')?.id
              }
            />
            <Checkbox
              name="completed"
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
        <div className="dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium">
          <form ref={tuesdayRef} action={dispatch}>
            <input type="hidden" name="day" value={'tuesday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '2')?.id
              }
            />
            <Checkbox
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
        <div className="dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium">
          <form ref={wednesdayRef} action={dispatch}>
            <input type="hidden" name="day" value={'wednesday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '3')?.id
              }
            />
            <Checkbox
              name="completed"
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '3',
              )}
              onCheckedChange={(e) => {
                console.log('log wednesday change');
                console.log(e);
                if (wednesdayRef.current) {
                  wednesdayRef.current.requestSubmit();
                }
              }}
            />
          </form>
        </div>
        <div className="dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium">
          <form ref={thursdayRef} action={dispatch}>
            <input type="hidden" name="day" value={'thursday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '4')?.id
              }
            />
            <Checkbox
              name="completed"
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '4',
              )}
              onCheckedChange={(e) => {
                console.log('log thursday change');
                console.log(e);
                if (thursdayRef.current) {
                  thursdayRef.current.requestSubmit();
                }
              }}
            />
          </form>
        </div>

        <div className="dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium">
          <form ref={fridayRef} action={dispatch}>
            <input type="hidden" name="day" value={'friday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '5')?.id
              }
            />
            <Checkbox
              name="completed"
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '5',
              )}
              onCheckedChange={(e) => {
                console.log('log friday change');
                console.log(e);
                if (fridayRef.current) {
                  fridayRef.current.requestSubmit();
                }
              }}
            />
          </form>
        </div>
        <div className="dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium">
          <form ref={saturdayRef} action={dispatch}>
            <input type="hidden" name="day" value={'saturday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '6')?.id
              }
            />
            <Checkbox
              name="completed"
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '6',
              )}
              onCheckedChange={(e) => {
                console.log('log saturday change');
                console.log(e);
                if (saturdayRef.current) {
                  saturdayRef.current.requestSubmit();
                }
              }}
            />
          </form>
        </div>
        <div className="dark:border-active inline-block w-[95px] border-l-2 border-gray-200 px-3 py-3 pb-2 text-center font-medium">
          <form ref={sundayRef} action={dispatch}>
            <input type="hidden" name="day" value={'sunday'} />
            <input
              type="hidden"
              name="id"
              value={
                task.completedDates.find((dateObj) => dateObj.day == '7')?.id
              }
            />
            <Checkbox
              name="completed"
              defaultChecked={task.completedDates.some(
                (dateObj) => dateObj.day == '7',
              )}
              onCheckedChange={(e) => {
                console.log('log sunday change');
                console.log(e);
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
