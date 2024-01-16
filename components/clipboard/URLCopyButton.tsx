'use client';

import { cn } from '@/lib/css';
import { useLocaleDictionary } from '@/lib/i18n';
import { Icon } from '@/lib/icon';
import { toast } from '@/lib/toast';
import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface URLCopyButtonProps extends ButtonProps {
  iconClassName?: string;
}

function URLCopyButton({ iconClassName, ...rest }: URLCopyButtonProps) {
  const {
    dictionary: { share },
  } = useLocaleDictionary();

  const handleClick = () => {
    if (window.navigator.clipboard) {
      window.navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          toast.success(share.message.success);
        })
        .catch(() => {
          toast.error(share.message.fail);
        });
    } else {
      toast.error(share.message.unsupported);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleClick} {...rest}>
            <Icon.Link aria-hidden className={cn('h-4 w-4', iconClassName)} />
            <span className="sr-only">{share.btn}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{share.btn}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default URLCopyButton;
