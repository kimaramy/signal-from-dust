'use client';

import { useNavigate } from '@/lib/router';
import { Button, ButtonProps } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function HomeButton(props: ButtonProps) {
  const navigate = useNavigate();

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/', { method: 'replace' })}
            {...props}
          >
            <Icon.Home aria-hidden className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>처음으로</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default HomeButton;
