'use client';

import { useLocaleDictionary } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import SettingsSheetContent from './SettingsSheetContent';

interface SettingsSheetTriggerButtonProps {
  className?: string;
}

function SettingsSheetTriggerButton({
  className,
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
                <Button variant="ghost" size="icon" className={className}>
                  <Icon.Database aria-hidden className="h-4 w-4" />
                  <span className="sr-only">{settings.trigger_btn}</span>
                </Button>
              </SheetTrigger>
              <SettingsSheetContent />
            </Sheet>
          </div>
        </TooltipTrigger>
        <TooltipContent>{settings.trigger_btn}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default SettingsSheetTriggerButton;
