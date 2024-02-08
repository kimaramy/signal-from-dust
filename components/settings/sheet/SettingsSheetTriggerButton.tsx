'use client';

import { useCallback } from 'react';

import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import type { URLPart } from '@/lib/router';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import SettingsProvider from '../SettingsProvider';
import SettingsSheetContent from './SettingsSheetContent';

interface SettingsSheetTriggerButtonProps extends ButtonProps {
  iconClassName?: string;
}

function SettingsSheetTriggerButton({
  iconClassName,
  ...rest
}: SettingsSheetTriggerButtonProps) {
  const {
    dictionary: { settings },
  } = useLocaleDictionary();

  const handleInitialModeKey = useCallback((pathname: string) => {
    return pathname.endsWith('today')
      ? 'realtime'
      : pathname.endsWith('search')
      ? 'custom'
      : 'preset';
  }, []);

  const handleCollectionKeyHint = useCallback((pathname: string): URLPart => {
    return pathname.endsWith('today') || pathname.endsWith('search')
      ? 'query'
      : 'path';
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div role="presentation">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" {...rest}>
                  <Icon.Database
                    aria-hidden
                    className={cn('h-4 w-4', iconClassName)}
                  />
                  <span className="sr-only">{settings.btn}</span>
                </Button>
              </SheetTrigger>
              <SettingsProvider
                initialModeKey={handleInitialModeKey}
                collectionKeyHint={handleCollectionKeyHint}
              >
                <SettingsSheetContent />
              </SettingsProvider>
            </Sheet>
          </div>
        </TooltipTrigger>
        <TooltipContent>{settings.btn}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default SettingsSheetTriggerButton;
