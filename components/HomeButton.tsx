'use client';

import { Home } from 'lucide-react';

import { useNavigate } from '@/lib/router';
import { Button, ButtonProps } from '@/components/ui/button';
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
            <Home aria-hidden className="h-4.5 w-4.5" />
            <span className="sr-only">Home</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>처음으로</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default HomeButton;
