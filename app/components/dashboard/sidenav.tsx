'use server';

import Link from 'next/link';
import { NavLinks, MobileNavLinks } from '@/app/components/dashboard/navLinks';
import Image from 'next/image';
import DashboardMessage from '../dashboardMessage';
// import SignoutButton from '../signoutButton';

// Todo - add signout button
export default async function SideNav() {
  return (
    <div className="z-30 flex h-full flex-col bg-gray-100 p-4 transition-all md:fixed md:left-0 md:top-0 md:h-screen md:min-h-screen md:max-w-[64px] md:px-2 group-hover:md:w-full  group-hover:md:max-w-[256px] group-hover:md:shadow-sm">
      <Link href="/dashboard" className="mb-2 md:mb-4">
        <div className="flex h-20 items-center justify-start gap-3 rounded-md bg-primary p-3 dark:bg-primary  md:aspect-square md:h-auto md:w-full md:justify-center">
          <Image
            src={'/logo_klein_wit.svg'}
            width={56}
            height={56}
            alt="Logo ListTrackr"
            className="w-12"
          />
          <div className="block flex-1 md:hidden">
            <DashboardMessage />
          </div>
          <MobileNavLinks />
        </div>
      </Link>
      <div className="hidden grow flex-row justify-between space-x-2 md:flex md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        {/* <SignoutButton /> */}
      </div>
    </div>
  );
}
