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

import { useDisplayKey, useSetDisplayKey } from './hooks';
import { displaySchema, type DisplayKey } from './schema';

interface DisplayToggleButtonProps {
  className?: string;
}

function DisplayToggleButton({ className }: DisplayToggleButtonProps) {
  const displayKey = useDisplayKey();

  const setDisplayKey = useSetDisplayKey();

  const handleToggleButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const value = e.currentTarget.value;
      if (displaySchema.safeParseKey(value)) {
        const toggledValue: DisplayKey =
          value === displaySchema.keys.FULL ? 'AUTO' : 'FULL';
        setDisplayKey(toggledValue);
      }
    },
    [setDisplayKey]
  );

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            value={displayKey}
            className={cn(className)}
            onClick={handleToggleButton}
          >
            {displayKey === displaySchema.keys.AUTO ? (
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
