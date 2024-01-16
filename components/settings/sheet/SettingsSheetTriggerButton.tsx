'use client';

import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
              <SettingsSheetContent />
            </Sheet>
          </div>
        </TooltipTrigger>
        <TooltipContent>{settings.btn}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default SettingsSheetTriggerButton;
