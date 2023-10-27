'use client';

import { Database } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';

import SettingsSheetContent from './SettingsSheetContent';

interface SettingsSheetTriggerButtonProps {
  className?: string;
}

function SettingsSheetTriggerButton({
  className,
}: SettingsSheetTriggerButtonProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Database className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SettingsSheetContent />
    </Sheet>
  );
}

export default SettingsSheetTriggerButton;
