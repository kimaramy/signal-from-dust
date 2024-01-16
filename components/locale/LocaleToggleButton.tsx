'use client';

import { cn } from '@/lib/css';
import { useLocaleDictionary, useLocaleSwitchedURL } from '@/lib/i18n';
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

  const localeSwitchedURL = useLocaleSwitchedURL(locale);

  const switchedLocale = locale === 'en' ? 'ko' : 'en';

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="ghost" size="icon" {...rest}>
            <Link href={localeSwitchedURL}>
              <Icon.Languages className={cn('h-4 w-4', iconClassName)} />
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
