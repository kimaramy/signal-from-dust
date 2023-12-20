import { cn } from '@/lib/css';

type MainProps = React.HTMLAttributes<HTMLDivElement>;

function Main({ children, className, ...rest }: MainProps) {
  return (
    <main
      className={cn('h-full flex-1 scrollbar-hide 3xl:container', className)}
      {...rest}
    >
      {children}
    </main>
  );
}

export default Main;
