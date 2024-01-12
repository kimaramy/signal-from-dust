'use client';

import { Bit, BitUtils } from '@/components/bit';

import SceneRoot, { type SceneRootProps } from './SceneRoot';
import StackSceneLayout from './StackSceneLayout';
import type { SceneData } from './utils';

export interface StackSceneProps extends SceneRootProps {
  sceneId: string;
  sceneIdx: number;
  sceneData: SceneData;
}

function StackScene({ sceneId, sceneData, ...rest }: StackSceneProps) {
  return (
    <SceneRoot id={sceneId} {...rest}>
      <StackSceneLayout bits={BitUtils.toBits(sceneData.value)}>
        {(bits) =>
          bits.map((bit, bitIdx) => {
            const bitId = BitUtils.getBitId(sceneId, bitIdx);
            return (
              <Bit
                key={bitId}
                bit={bit}
                bitId={bitId}
                bitIdx={bitIdx}
                stacked
              />
            );
          })
        }
      </StackSceneLayout>
    </SceneRoot>
  );
}

export default StackScene;
