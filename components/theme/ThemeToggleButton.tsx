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

  const _theme = theme === 'light' ? 'dark' : 'light';

  const { dictionary } = useLocaleDictionary();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(_theme)}
            {...rest}
          >
            <Icon.Sun
              aria-hidden
              className={cn(
                'hidden h-[1.375rem] w-[1.1rem] dark:block',
                iconClassName
              )}
            />
            <Icon.Moon
              aria-hidden
              className={cn('h-4 w-4 dark:hidden', iconClassName)}
            />
            <span className="sr-only">{dictionary.theme.btn[_theme]}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{dictionary.theme.btn[_theme]}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThemeToggleButton;
