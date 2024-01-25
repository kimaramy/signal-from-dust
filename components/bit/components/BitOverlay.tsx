import { cn } from '@/lib/css';

function BitOverlay({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'absolute left-0 top-0 z-0 h-full w-full cursor-pointer rounded-md bg-accent/50 ring-1',
        className
      )}
      {...rest}
    ></div>
  );
}

export default BitOverlay;
