'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

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
import { Spinner } from '@/components/layout';

const IntroSheetContent = dynamic(() => import('./IntroSheetContent'), {
  ssr: false,
  loading: () => <Spinner />,
});

interface IntroSheetTriggerButtonProps extends ButtonProps {
  iconClassName?: string;
}

function IntroSheetTriggerButton({
  iconClassName,
  ...rest
}: IntroSheetTriggerButtonProps) {
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
                <Button variant="ghost" size="icon" {...rest}>
                  <Icon.HelpCircle
                    aria-hidden
                    className={cn('h-4 w-4', iconClassName)}
                  />
                  <span className="sr-only">{intro.btn}</span>
                </Button>
              </SheetTrigger>
              {isSheetOpen && <IntroSheetContent />}
            </Sheet>
          </div>
        </TooltipTrigger>
        <TooltipContent>{intro.btn}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default IntroSheetTriggerButton;
