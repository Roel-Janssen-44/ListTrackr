import Link from 'next/link';
import NavLinks from '@/app/components/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Image from 'next/image';

export default async function SideNav() {
  return (
    <div className="">
      <div className="z-30 flex h-full flex-col bg-gray-100 px-3 py-4 transition-all md:absolute md:left-0 md:top-0 md:h-screen md:min-h-screen md:max-w-[64px] md:px-2 group-hover:md:w-full  group-hover:md:max-w-[256px] group-hover:md:shadow-sm">
        <Link
          className="mb-2 flex h-20 items-center justify-center rounded-md bg-active p-3 dark:bg-active md:mb-4 md:aspect-square md:h-auto md:w-full"
          href="/dashboard"
        >
          <Image
            src={'/logo_klein_wit.svg'}
            width={56}
            height={56}
            alt="Logo ListTrackr"
            className="hidden w-full flex-1 md:block"
          />
        </Link>
        <div className="hidden grow flex-row justify-between space-x-2 sm:flex md:flex-col md:space-x-0 md:space-y-2">
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
              <div className="hidden transition-all md:hidden">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
