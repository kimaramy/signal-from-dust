'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/css';
import { DustUtils } from '@/lib/model';

import { useSceneContext } from '../lib';

const sceneValueVariants = cva(
  'rounded-md border border-current px-1 py-0.5 text-xs text-black font-semibold sm:px-2 sm:py-1 sm:text-sm'
);

interface SceneValueProps
  extends React.ComponentPropsWithoutRef<'p'>,
    VariantProps<typeof sceneValueVariants> {
  isUnitHidden?: boolean;
}

function SceneValue({
  isUnitHidden = false,
  className,
  ...rest
}: SceneValueProps) {
  const { sceneData } = useSceneContext();

  const dustGrade = DustUtils.schema.getGrade(
    sceneData.value ?? 0,
    sceneData._ctx.dustKey
  );

  return (
    <p
      className={cn(sceneValueVariants({ className }))}
      style={{
        backgroundColor: dustGrade.bgColor,
        borderColor: dustGrade.bgColor,
        color: dustGrade.color,
      }}
      {...rest}
    >
      {sceneData.value}
      <span className={isUnitHidden ? 'hidden' : 'inline'}>
        ({DustUtils.schema.unit})
      </span>
    </p>
  );
}

export default SceneValue;
