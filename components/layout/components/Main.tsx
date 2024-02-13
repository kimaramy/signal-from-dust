import { cn } from '@/lib/css';
import { SafeArea } from '@/components/ui/safe-area';

function Main({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'main'>) {
  return (
    <SafeArea
      asChild
      className={cn('h-full flex-1 3xl:border-x 3xl:px-0', className)}
    >
      <main {...rest}>{children}</main>
    </SafeArea>
  );
}

export default Main;
