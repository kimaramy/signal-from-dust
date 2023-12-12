'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface ThemeToggleButtonProps {
  className?: string;
}

export default function ThemeToggleButton({
  className,
}: ThemeToggleButtonProps) {
  const { setTheme, theme } = useTheme();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={className}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Icon.Sun className="h-[1.375rem] w-[1.1rem] dark:hidden" />
            <Icon.Moon className="hidden h-4 w-4 dark:block" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>테마 변경</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
