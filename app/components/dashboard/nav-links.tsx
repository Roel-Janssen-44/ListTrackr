'use client';

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
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Tasks', href: '/dashboard/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Goals', href: '/dashboard/goals', icon: ClipboardDocumentCheckIcon },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: FolderIcon,
  },
  {
    name: 'Customers',
    href: '/dashboard/customers',
    icon: UserIcon,
  },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: ChartBarIcon,
  },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
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
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium dark:hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-active text-white hover:bg-active hover:text-white dark:bg-active dark:text-white':
                    pathname === link.href,
                },
                {
                  'bg-gray-50 text-tertiary hover:bg-gray-200 dark:bg-secondary dark:text-white dark:hover:bg-active':
                    pathname !== link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        } else {
          return (
            <>
              <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-secondary md:block"></div>
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium dark:hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
                  {
                    'bg-active text-white hover:bg-active hover:text-white dark:bg-active dark:text-white':
                      pathname === link.href,
                  },
                  {
                    'bg-gray-50 text-tertiary hover:bg-gray-200 dark:bg-secondary dark:text-white dark:hover:bg-active':
                      pathname !== link.href,
                  },
                )}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </Link>
            </>
          );
        }
      })}
    </>
  );
}
