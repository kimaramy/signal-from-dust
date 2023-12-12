'use client';

import { zoomIn } from '@/lib/zoom';
import { Button, ButtonProps } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

function ZoomInButton(props: ButtonProps) {
  return (
    <Button variant="ghost" size="icon" onClick={() => zoomIn()} {...props}>
      <Icon.ZoomIn aria-hidden className="h-4.5 w-4.5" />
      <span className="sr-only">Zoom in</span>
    </Button>
  );
}

export default ZoomInButton;
