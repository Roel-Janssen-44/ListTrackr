'use client';

import React from 'react';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  FolderIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
    activeFilter: 'home',
  },
  {
    name: 'Tasks',
    href: '/dashboard/tasks',
    icon: ClipboardDocumentListIcon,

    activeFilter: 'tasks',
  },
  {
    name: 'Goals',
    href: '/dashboard/goals',
    icon: ClipboardDocumentCheckIcon,
    activeFilter: 'goals',
  },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: FolderIcon,
    activeFilter: 'projects',
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: UserIcon,
    activeFilter: 'customers',
  },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: ChartBarIcon,
    activeFilter: 'invoices',
  },

  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Cog6ToothIcon,
    activeFilter: 'settings',
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        if (index + 1 < links.length) {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium dark:hover:text-white md:flex-none md:justify-center md:p-2 md:px-3',
                {
                  'bg-active text-white hover:bg-active hover:text-white dark:bg-active dark:text-white':
                    pathname.includes(link.activeFilter) ||
                    pathname === link.href,
                },
                {
                  'bg-gray-50 text-tertiary hover:bg-gray-200 dark:bg-secondary dark:text-white dark:hover:bg-active':
                    !pathname.includes(link.activeFilter) &&
                    pathname !== link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden transition-all md:hidden group-hover:md:block">
                {/* <p className="hidden transition-all md:block"> */}
                {link.name}
              </p>
            </Link>
          );
        } else {
          return (
            <React.Fragment key={link.name}>
              <div
                key={link.name}
                className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-secondary md:block"
              ></div>
              <Link
                href={link.href}
                className={clsx(
                  'flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium dark:hover:text-white md:flex-none md:justify-center md:p-2 md:px-3',
                  {
                    'bg-active text-white hover:bg-active hover:text-white dark:bg-active dark:text-white':
                      pathname.includes(link.activeFilter) ||
                      pathname === link.href,
                  },
                  {
                    'bg-gray-50 text-tertiary hover:bg-gray-200 dark:bg-secondary dark:text-white dark:hover:bg-active':
                      !pathname.includes(link.activeFilter) ||
                      pathname !== link.href,
                  },
                )}
              >
                <LinkIcon className="w-5" />
                <p className="hidden transition-all md:hidden group-hover:md:block">
                  {link.name}
                </p>
              </Link>
            </React.Fragment>
          );
        }
      })}
    </>
  );
}
