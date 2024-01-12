'use client';

import { useTheme } from 'next-themes';

import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ThemeToggleButtonProps extends ButtonProps {}

function ThemeToggleButton(props: ThemeToggleButtonProps) {
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
            {...props}
          >
            <Icon.Sun className="h-[1.375rem] w-[1.1rem] dark:hidden" />
            <Icon.Moon className="hidden h-4 w-4 dark:block" />
            <span className="sr-only">{dictionary.theme.trigger_btn}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{dictionary.theme.trigger_btn}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ThemeToggleButton;
