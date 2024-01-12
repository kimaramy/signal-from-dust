'use client';

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

interface LocaleToggleButtonProps extends ButtonProps {}

function LocaleToggleButton(props: LocaleToggleButtonProps) {
  const { locale, dictionary } = useLocaleDictionary();

  const localeSwitchedURL = useLocaleSwitchedURL(locale);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="ghost" size="icon" {...props}>
            <Link href={localeSwitchedURL}>
              <Icon.Languages className="h-4 w-4" />
              <span className="sr-only">{dictionary.locale.trigger_btn}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{dictionary.locale.trigger_btn}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default LocaleToggleButton;
