'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { exo } from '@/app/components/fonts';
import React, { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export default function DashboardMessage() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

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
