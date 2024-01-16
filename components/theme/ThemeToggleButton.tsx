'use client';

import { useTheme } from 'next-themes';

import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ThemeToggleButtonProps extends ButtonProps {
  iconClassName?: string;
}

function ThemeToggleButton({ iconClassName, ...rest }: ThemeToggleButtonProps) {
  const { setTheme, theme } = useTheme();

  const { dictionary } = useLocaleDictionary();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            {...rest}
          >
            <Icon.Sun
              className={cn(
                'hidden h-[1.375rem] w-[1.1rem] dark:block',
                iconClassName
              )}
            />
            <Icon.Moon className={cn('h-4 w-4 dark:hidden', iconClassName)} />
            <span className="sr-only">{dictionary.theme.btn}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{dictionary.theme.btn}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThemeToggleButton;
