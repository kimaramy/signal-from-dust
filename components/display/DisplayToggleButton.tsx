'use client';

import React, { useCallback } from 'react';
import { Layers2, Rows } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useDisplayValue, useSetDisplayValue } from './hooks';
import { Display } from './schema';

interface DisplayToggleButtonProps {
  className?: string;
}

function DisplayToggleButton({ className }: DisplayToggleButtonProps) {
  const display = useDisplayValue();

  const setDisplay = useSetDisplayValue();

  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const toggledValue: Display =
        e.currentTarget.value === '3d' ? '2d' : '3d';
      setDisplay(toggledValue);
    },
    [setDisplay]
  );

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            value={display}
            className={cn(className)}
            onClick={handleToggle}
          >
            {display === '2d' ? (
              <Rows className="h-4 w-4" />
            ) : (
              <Layers2 className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle displaying</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>보기 변경</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default DisplayToggleButton;
