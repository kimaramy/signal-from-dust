'use client';

import React from 'react';

import { cn } from '@/lib/css';

interface BitOverlayProps {
  className?: string;
  onClick?: React.MouseEventHandler;
}

function BitOverlay({ className, onClick }: BitOverlayProps) {
  return (
    <div
      className={cn(
        'absolute left-0 top-0 z-0 h-full w-full cursor-pointer rounded-md bg-accent/50 ring-1',
        className
      )}
      onClick={onClick}
    ></div>
  );
}

export default BitOverlay;
