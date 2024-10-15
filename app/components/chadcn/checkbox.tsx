'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  // <CheckboxPrimitive.Root
  //   ref={ref}
  //   // className={cn(
  //   //   'peer h-full min-h-[40px] w-full shrink-0 rounded-sm border border-gray-900 ring-offset-white data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-50 dark:ring-offset-gray-950 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900 dark:focus-visible:ring-gray-300',
  //   //   className,
  //   // )}
  //   className={cn('group h-full min-h-[40px] w-full', className)}
  //   {...props}
  // >
  //   {/* <Check className="invisible" /> */}
  //   <div
  //     className={cn(
  //       'peer h-5 w-5 shrink-0 rounded-sm border border-gray-900 bg-red-500 ring-offset-white data-[state=checked]:bg-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-50 dark:ring-offset-gray-950 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900 dark:focus-visible:ring-gray-300',
  //       className,
  //     )}
  //   >
  //     <CheckboxPrimitive.Indicator
  //       className={cn('flex items-center justify-center text-current')}
  //     >
  //       <Check className="h-5 w-5" />
  //     </CheckboxPrimitive.Indicator>
  //   </div>
  // </CheckboxPrimitive.Root>
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'group inline-flex h-full min-h-[40px] w-full items-center justify-center',
      className,
    )}
    {...props}
  >
    <div
      className={cn(
        'peer h-5 w-5 shrink-0 rounded-sm border border-gray-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-50 dark:ring-offset-gray-950 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900 dark:focus-visible:ring-gray-300',
        className,
      )}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          'flex items-center justify-center text-current data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50',
        )}
      >
        <Check className="h-5 w-5" />
      </CheckboxPrimitive.Indicator>
    </div>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
