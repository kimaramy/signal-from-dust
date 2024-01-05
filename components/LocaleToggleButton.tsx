'use client';

import { useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { useLocaleDictionary } from '@/lib/i18n';
import { Link } from '@/lib/router';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface LocaleToggleButtonProps {
  className?: string;
}

export default function LocaleToggleButton({
  className,
}: LocaleToggleButtonProps) {
  const { locale, dictionary } = useLocaleDictionary();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const localeSwitchedURL = useMemo(() => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale === 'en' ? 'ko' : 'en';
    return `${segments.join('/')}?${searchParams.toString()}`;
  }, [pathname, searchParams, locale]);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="ghost" size="icon" className={className}>
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
