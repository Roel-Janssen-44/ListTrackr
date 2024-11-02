import ThemeSwitcher from '@/app/components/themeSwitcher';
import { exo } from '@/app/components/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function Settings() {
  return (
    <>
      <h1 className={`${exo.className} text-3xl font-bold`}>Settings</h1>
      <div className="md:px-3s flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 hover:text-active dark:bg-secondary dark:hover:bg-active dark:hover:text-white md:flex-none md:justify-start md:p-2">
        <ThemeSwitcher />
      </div>
    </>
  );
}
