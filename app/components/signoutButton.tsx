'use server';

import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default async function signoutButton() {
  return (
    <div className="">
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
          await signOut();
        }}
      >
        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-tertiary hover:bg-gray-200 dark:bg-secondary dark:text-white dark:hover:bg-active md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="transition-all md:hidden">Sign Out</div>
        </button>
      </form>
    </div>
  );
}
