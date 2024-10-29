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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/chadcn/tooltip';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        if (index + 1 < links.length) {
          return (
            <TooltipProvider key={link.name} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={link.href}
                    className={clsx(
                      'flex h-[48px] grow items-center justify-start gap-2 rounded-md p-3 text-sm font-medium outline-gray-900 dark:hover:text-white md:flex-none md:justify-center md:p-2 md:px-3',
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
                  </Link>
                </TooltipTrigger>
                <TooltipContent style={{ marginBottom: '16px' }} side="right">
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        } else {
          return (
            <React.Fragment key={link.name}>
              <div
                key={link.name}
                className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-secondary md:block"
              ></div>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href={link.href}
                      className={clsx(
                        'center flex h-[48px] grow items-center justify-start gap-2 rounded-md p-3 text-sm font-medium outline-gray-900 dark:hover:text-white md:flex-none md:justify-center md:p-2 md:px-3',
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
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent style={{ marginBottom: '16px' }} side="right">
                    <p>{link.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </React.Fragment>
          );
        }
      })}
    </>
  );
}

export function MobileNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        if (index + 1 < links.length) {
          return (
            <Link
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-start gap-2 rounded-md p-3 text-sm font-medium outline-gray-900 dark:hover:text-white md:flex-none md:justify-center md:p-2 md:px-3',
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
              <p className="block transition-all md:hidden">{link.name}</p>
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
                  'center flex h-[48px] grow items-center justify-start gap-2 rounded-md p-3 text-sm font-medium outline-gray-900 dark:hover:text-white md:flex-none md:justify-center md:p-2 md:px-3',
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
                <p className="transition-all md:hidden">{link.name}</p>
              </Link>
            </React.Fragment>
          );
        }
      })}
    </>
  );
}
