import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  id?: string;
  className?: string;
}

function ProgressBar(props: ProgressBarProps) {
  const { value, id, className } = props;

  return (
    <div className={cn('fixed left-0 top-0 z-20 w-full', className)}>
      <progress
        id={id}
        className="flex h-[5px] w-full appearance-none border-none bg-black/20 transition-all ease-in-out 3xl:container 3xl:!p-0"
        max="100"
        value={value}
      ></progress>
    </div>
  );
}

export default ProgressBar;
