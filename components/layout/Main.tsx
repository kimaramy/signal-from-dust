import { cn } from '@/lib/css';
import { SafeArea } from '@/components/ui/safe-area';

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {}

function Main({ children, className, ...rest }: MainProps) {
  return (
    <SafeArea asChild className={cn('h-full flex-1 scrollbar-hide', className)}>
      <main {...rest}>{children}</main>
    </SafeArea>
  );
}

export default Main;
