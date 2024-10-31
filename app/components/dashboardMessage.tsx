'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import { exo } from '@/app/components/fonts';

export default function DashboardMessage() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  console.log(pathname);

  if (pathname !== '/dashboard') return;

  if (status === 'authenticated') {
    return (
      <h1
        className={`${exo.className} text-lg font-semibold text-white md:mb-4 md:text-3xl md:font-bold md:text-primary`}
      >
        Welcom back, <br />
        {session.user.name}
      </h1>
    );
  }
}
