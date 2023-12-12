'use client';

import { zoomOut } from '@/lib/zoom';
import { Button, ButtonProps } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

function ZoomOutButton(props: ButtonProps) {
  return (
    <Button variant="ghost" size="icon" onClick={() => zoomOut()} {...props}>
      <Icon.ZoomOut aria-hidden className="h-4.5 w-4.5" />
      <span className="sr-only">Zoom out</span>
    </Button>
  );
}

export default ZoomOutButton;
