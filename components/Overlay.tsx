'use client';

import React from 'react';

import { cn } from '@/lib/utils';

export interface OverlayProps {
  className?: string;
  onClick?: React.MouseEventHandler;
}

export default function Overlay({ className, onClick }: OverlayProps) {
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
