'use client';

import { ZoomIn } from 'lucide-react';

import { zoomIn } from '@/lib/zoom';
import { Button, ButtonProps } from '@/components/ui/button';

function ZoomInButton(props: ButtonProps) {
  return (
    <Button variant="ghost" size="icon" onClick={() => zoomIn()} {...props}>
      <ZoomIn aria-hidden className="h-4.5 w-4.5" />
      <span className="sr-only">Zoom in</span>
    </Button>
  );
}

export default ZoomInButton;
