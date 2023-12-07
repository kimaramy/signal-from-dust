'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { HelpCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Spinner from '@/components/Spinner';

const IntroSheetContent = dynamic(
  () =>
    import('./IntroSheetContent' /* webpackChunkName: "IntroSheetContent" */),
  {
    ssr: false,
    loading: () => <Spinner relative />,
  }
);

interface IntroSheetTriggerButtonProps {
  className?: string;
}

function IntroSheetTriggerButton({ className }: IntroSheetTriggerButtonProps) {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Sheet
            open={isSheetOpen}
            onOpenChange={() => setSheetOpen((isSheetOpen) => !isSheetOpen)}
          >
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={className}>
                <HelpCircle aria-hidden className="h-4.5 w-4.5" />
                <span className="sr-only">About this project</span>
              </Button>
            </SheetTrigger>
            {isSheetOpen && <IntroSheetContent />}
          </Sheet>
        </TooltipTrigger>
        <TooltipContent>
          <p>프로젝트 설명</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default IntroSheetTriggerButton;
