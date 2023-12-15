import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// bg-[rgb(46,52,64)] text-[rgb(216,222,233)] border-[rgb(46, 52, 64)]

const codeBlockStyles = cva(
  'flex overflow-x-auto whitespace-pre rounded border text-[0.9em]',
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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockStyles> {
  text: string;
}

function CodeBlock({ text, theme, className, ...rest }: CodeBlock) {
  return (
    <div className="relative font-mono leading-normal">
      <div className={cn(codeBlockStyles({ theme, className }))} {...rest}>
        <code className="whitespace-pre p-2 text-inherit">{text}</code>
      </div>
    </div>
  );
}

export default CodeBlock;
