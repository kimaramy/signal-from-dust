'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

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
import { Spinner } from '@/components/layout';

const IntroSheetContent = dynamic(() => import('./IntroSheetContent'), {
  ssr: false,
  loading: () => <Spinner />,
});

interface IntroSheetTriggerButtonProps extends ButtonProps {}

function IntroSheetTriggerButton(props: IntroSheetTriggerButtonProps) {
  const {
    dictionary: { intro },
  } = useLocaleDictionary();

  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div role="presentation">
            <Sheet
              open={isSheetOpen}
              onOpenChange={() => setSheetOpen((isSheetOpen) => !isSheetOpen)}
            >
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" {...props}>
                  <Icon.HelpCircle aria-hidden className="h-4 w-4" />
                  <span className="sr-only">{intro.trigger_btn}</span>
                </Button>
              </SheetTrigger>
              {isSheetOpen && <IntroSheetContent />}
            </Sheet>
          </div>
        </TooltipTrigger>
        <TooltipContent>{intro.trigger_btn}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default IntroSheetTriggerButton;
