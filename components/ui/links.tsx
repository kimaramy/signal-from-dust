import { cn } from '@/lib/css';
import { Icon } from '@/lib/icon';
import { Link } from '@/lib/router';
import { Button, type ButtonProps } from '@/components/ui/button';

interface LinkButtonProps extends Omit<ButtonProps, 'children' | 'asChild'> {
  href: string;
  iconClassName?: string;
}

function GithubLink({
  href,
  className,
  iconClassName,
  ...rest
}: LinkButtonProps) {
  return (
    <Button variant="ghost" size="icon" className={className} asChild {...rest}>
      <Link href={href} target="_blank">
        <Icon.Github aria-hidden className={cn('h-4 w-4', iconClassName)} />
        <span className="sr-only">Gitub</span>
      </Link>
    </Button>
  );
}

function LinkedinLink({
  href,
  className,
  iconClassName,
  ...rest
}: LinkButtonProps) {
  return (
    <Button variant="ghost" size="icon" className={className} asChild {...rest}>
      <Link href={href} target="_blank">
        <Icon.Linkedin aria-hidden className={cn('h-4 w-4', iconClassName)} />
        <span className="sr-only">Linkedin</span>
      </Link>
    </Button>
  );
}

export { GithubLink, LinkedinLink };
