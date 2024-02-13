import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/css';

const codeBlockVariants = cva(
  'inline-flex p-3 overflow-auto whitespace-pre rounded border text-[0.9em] font-mono leading-normal w-full',
  {
    variants: {
      theme: {
        default: 'bg-primary text-primary-foreground border-border',
        error: 'border-red-500 bg-red-100 text-red-700',
      },
    },
    defaultVariants: {
      theme: 'default',
    },
  }
);

interface CodeBlock
  extends React.ComponentPropsWithoutRef<'pre'>,
    VariantProps<typeof codeBlockVariants> {
  text: string;
}

function CodeBlock({ text, theme, className, ...rest }: CodeBlock) {
  return (
    <pre className={cn(codeBlockVariants({ theme, className }))} {...rest}>
      <code className="text-inherit">{text}</code>
    </pre>
  );
}

export { CodeBlock };
