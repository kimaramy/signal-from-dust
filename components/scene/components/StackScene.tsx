'use client';

import { Bit, BitUtils } from '@/components/bit';

import type { SceneData } from '../context';
import SceneRoot from './SceneRoot';
import StackSceneBody from './StackSceneBody';

interface StackSceneProps {
  sceneId: string;
  sceneIdx: number;
  sceneData: SceneData;
  sceneLength: number;
}

function StackScene({
  sceneId,
  sceneIdx,
  sceneData,
  sceneLength,
}: StackSceneProps) {
  return (
    <SceneRoot
      id={sceneId}
      sceneIdx={sceneIdx}
      sceneData={sceneData}
      sceneLength={sceneLength}
    >
      <Bit.Provider>
        <StackSceneBody>
          {({ bits }) => (
            <Bit.Consumer>
              {(_bitContext) =>
                bits.map((bit, bitIdx) => {
                  const bitId = BitUtils.getBitId(sceneId, bitIdx);
                  return (
                    <li key={bitId} className="h-full">
                      <Bit.View
                        view="3d"
                        bit={bit.value}
                        bitId={bitId}
                        bitIdx={bitIdx}
                      />
                    </li>
                  );
                })
              }
            </Bit.Consumer>
          )}
        </StackSceneBody>
      </Bit.Provider>
    </SceneRoot>
  );
}

export default StackScene;
