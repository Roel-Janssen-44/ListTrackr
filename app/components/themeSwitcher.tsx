'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Label } from '@/app/components/chadcn/label';
import { Switch } from '@/app/components/chadcn/switch';

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center space-x-1">
      <Switch
        className="dark:data-[state=checked]:bg-secondary"
        defaultChecked={theme === 'dark' ? true : false}
        onCheckedChange={(value) => {
          if (value) {
            setTheme('dark');
          } else {
            setTheme('light');
          }
        }}
        id="theme-switcher"
      />
      <Label htmlFor="theme-switcher">
        {theme === 'dark' ? <Moon /> : <Sun />}
      </Label>
    </div>
  );
}
