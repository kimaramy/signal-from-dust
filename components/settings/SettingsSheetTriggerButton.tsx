'use client';

import { Database } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
        <TooltipTrigger>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={className}>
                <Database className="h-4 w-4" />
                <span className="sr-only">Replace dataset</span>
              </Button>
            </SheetTrigger>
            <SettingsSheetContent />
          </Sheet>
        </TooltipTrigger>
        <TooltipContent>
          <p>데이터 변경</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default SettingsSheetTriggerButton;
