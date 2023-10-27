'use client';

import React, { useCallback } from 'react';
import { Layers2, Rows } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
    <Button
      variant="ghost"
      size="icon"
      value={display}
      className={cn(className)}
      onClick={handleToggle}
    >
      {display === '2d' ? (
        <Layers2 className="h-4 w-4" />
      ) : (
        <Rows className="h-4 w-4" />
      )}
    </Button>
  );
}

export default DisplayToggleButton;
