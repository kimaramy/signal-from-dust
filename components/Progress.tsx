import { cn } from '@/lib/utils';

export interface ProgressProps {
  id: string;
  value: number;
  className?: string;
}

export default function Progress({ id, value, className }: ProgressProps) {
  return (
    <div
      className={cn(
        'fixed bottom-[var(--player-height)] left-0 z-20 w-full',
        className
      )}
    >
      <progress
        id={id}
        className="flex h-[5px] w-full appearance-none border-none bg-black/20 transition-all ease-in-out 3xl:container 3xl:!p-0"
        max="100"
        value={value}
      ></progress>
    </div>
  );
}
