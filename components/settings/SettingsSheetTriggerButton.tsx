'use client';

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
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div role="presentation">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={className}>
                  <Icon.Database aria-hidden className="h-4 w-4" />
                  <span className="sr-only">Change a dataset</span>
                </Button>
              </SheetTrigger>
              <SettingsSheetContent />
            </Sheet>
          </div>
        </TooltipTrigger>
        <TooltipContent>데이터 변경</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default SettingsSheetTriggerButton;
