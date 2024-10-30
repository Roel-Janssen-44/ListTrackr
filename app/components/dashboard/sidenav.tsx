'use server';

import Link from 'next/link';
import { NavLinks, MobileNavLinks } from '@/app/components/dashboard/navLinks';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import DashboardMessage from '../dashboardMessage';
import SignoutButton from '../signoutButton';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/components/chadcn/sheet';

export default async function SideNav() {
  return (
    <div className="">
      <div className="z-30 flex h-full flex-col bg-gray-100 p-4 transition-all md:absolute md:left-0 md:top-0 md:h-screen md:min-h-screen md:max-w-[64px] md:px-2 group-hover:md:w-full  group-hover:md:max-w-[256px] group-hover:md:shadow-sm">
        <div className="mb-2 flex h-20 items-center justify-start gap-3 rounded-md bg-primary p-3 dark:bg-primary md:mb-4 md:aspect-square md:h-auto md:w-full md:justify-center">
          <Link href="/dashboard">
            <Image
              src={'/logo_klein_wit.svg'}
              width={56}
              height={56}
              alt="Logo ListTrackr"
              className="w-12"
            />
          </Link>
          <div className="block flex-1 md:hidden">
            <DashboardMessage />
          </div>
          <Sheet>
            <SheetTrigger className="block md:hidden">
              <Bars3Icon className="w-8 text-white" />
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
                <MobileNavLinks />
                <SignoutButton />
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden grow flex-row justify-between space-x-2 md:flex md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <SignoutButton />
        </div>
      </div>
    </div>
  );
}
