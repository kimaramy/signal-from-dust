'use client';

import { Bit, BitUtils } from '@/components/bit';

import type { SceneData } from '../context';
import SceneRoot from './SceneRoot';
import StackSceneBody from './StackSceneBody';

interface StackSceneProps {
  sceneId: string;
  sceneIdx: number;
  sceneData: SceneData;
}

function StackScene({ sceneId, sceneIdx, sceneData }: StackSceneProps) {
  return (
    <SceneRoot id={sceneId} sceneIdx={sceneIdx} sceneData={sceneData}>
      <StackSceneBody>
        {({ bits }) =>
          bits.map((bit, bitIdx) => {
            const bitId = BitUtils.getBitId(sceneId, bitIdx);
            return (
              <li key={bitId} className="h-full">
                <Bit view="3d" bit={bit.value} bitId={bitId} bitIdx={bitIdx} />
              </li>
            );
          })
        }
      </StackSceneBody>
    </SceneRoot>
  );
}

export default StackScene;
