import Link from 'next/link';
import NavLinks from '@/app/components/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Image from 'next/image';
// import { redirect } from 'next/navigation';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-md bg-active p-4 dark:bg-active md:h-40"
        href="/dashboard"
      >
        <Image
          src={'/logo_wit.svg'}
          width={150}
          height={200}
          alt="Logo ListTrackr"
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-tertiary hover:bg-gray-200 dark:bg-secondary dark:text-white dark:hover:bg-active md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
