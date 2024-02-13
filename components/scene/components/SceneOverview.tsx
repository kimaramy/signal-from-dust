import { cn } from '@/lib/css';

function SceneOverview({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'flex h-auto items-center space-x-2 divide-x divide-border overflow-hidden',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default SceneOverview;
