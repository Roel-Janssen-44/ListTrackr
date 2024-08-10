import Link from 'next/link';
import NavLinks from '@/app/components/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Image from 'next/image';

export default async function SideNav() {
  return (
    <div className="group">
      <div className="z-30 flex h-full min-h-screen flex-col bg-gray-100 px-3 py-4 transition-all group-hover:max-w-[256px] group-hover:shadow-sm md:absolute md:left-0 md:top-0 md:h-screen md:max-w-[64px]  md:px-2 group-hover:md:w-full">
        <Link
          className="mb-2 flex h-20 items-center justify-center rounded-md bg-active p-3 dark:bg-active md:mb-4 md:aspect-square md:h-auto md:w-full"
          href="/dashboard"
        >
          <Image
            src={'/logo_wit.svg'}
            width={150}
            height={200}
            alt="Logo ListTrackr"
            className="md:hidden group-hover:md:block"
          />
          <Image
            src={'/logo_klein_wit.svg'}
            width={56}
            height={56}
            alt="Logo ListTrackr"
            className="w-full flex-1 group-hover:md:hidden"
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
              <div className="hidden transition-all md:hidden group-hover:md:block">
                Sign Out
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
