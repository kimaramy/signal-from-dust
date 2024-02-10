'use client';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/css';
import { DustUtils } from '@/lib/model';

import { useSceneContext } from '../hooks';

const sceneValueVariants = cva(
  'rounded-md border border-current px-1 py-0.5 text-xs font-semibold !text-black sm:px-2 sm:py-1 sm:text-sm'
);

function SceneValue({
  className,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { sceneData } = useSceneContext();

  const dustGrade = DustUtils.schema.getGrade(
    sceneData.value ?? 0,
    sceneData._ctx.dustKey
  );

  return (
    <p
      className={cn(sceneValueVariants({ className }))}
      style={{
        backgroundColor: dustGrade.color,
        borderColor: dustGrade.color,
      }}
      {...rest}
    >
      {sceneData.value}({DustUtils.schema.unit})
    </p>
  );
}

export default SceneValue;
