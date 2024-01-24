'use client';

import { useCallback } from 'react';

import { cn } from '@/lib/css';
import {
  useLocaleDictionary,
  useLocaleSwitchedURL,
  type Locale,
} from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { Link } from '@/lib/router';
import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LocaleToggleButtonProps extends ButtonProps {
  iconClassName?: string;
}

function LocaleToggleButton({
  iconClassName,
  ...rest
}: LocaleToggleButtonProps) {
  const { locale, dictionary } = useLocaleDictionary();

  const localeSwitcher = useCallback(
    (locale: Locale) => (locale === 'en' ? 'ko' : 'en'),
    []
  );

  const switchedLocale = localeSwitcher(locale);

  const localeSwitchedURL = useLocaleSwitchedURL(locale, localeSwitcher);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="ghost" size="icon" {...rest}>
            <Link href={localeSwitchedURL}>
              <Icon.Languages
                aria-hidden
                className={cn('h-4 w-4', iconClassName)}
              />
              <span className="sr-only">
                {dictionary.locale.btn[switchedLocale]}
              </span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{dictionary.locale.btn[switchedLocale]}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default LocaleToggleButton;
