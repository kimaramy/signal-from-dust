'use client';

import { useCallback, useState } from 'react';

import { cn } from '@/lib/css';
import { Icon } from '@/lib/icon';
import { Button } from '@/components/ui/button';
import { Bit, BitUtils } from '@/components/bit';

import type { SceneData } from '../context';
import Scene from './Scene';
import SceneOverview from './SceneOverview';

interface SceneScreenViewProps {
  sceneId: string;
  sceneIdx: number;
  sceneData: SceneData;
  sceneLength: number;
  sceneTitle: React.ReactNode | ((sceneData: SceneData) => React.ReactNode);
  sceneDescription:
    | React.ReactNode
    | ((sceneData: SceneData) => React.ReactNode);
  sceneSource: React.ReactNode | ((sceneData: SceneData) => React.ReactNode);
  revalidate?: () => void;
  onPlay?: (sceneIdx: number) => void;
  onStop?: () => void;
}

function SceneScreenView({
  sceneId,
  sceneIdx,
  sceneData,
  sceneLength,
  sceneTitle,
  sceneDescription,
  sceneSource,
  revalidate,
  onPlay,
  onStop,
}: SceneScreenViewProps) {
  const _sceneTitle =
    typeof sceneTitle === 'function' ? sceneTitle(sceneData) : sceneTitle;

  const _sceneDescription =
    typeof sceneDescription === 'function'
      ? sceneDescription(sceneData)
      : sceneDescription;

  const _sceneSource =
    typeof sceneSource === 'function' ? sceneSource(sceneData) : sceneSource;

  const [offsetY, setOffsetY] = useState<`${string}px` | undefined>(undefined);

  const handleRootRef = useCallback((el: HTMLDivElement | null) => {
    if (el !== null) {
      // console.log(el.getBoundingClientRect());
      setOffsetY(`${el.getBoundingClientRect().top}px`);
    }
  }, []);

  return (
    <Scene.Root
      id={sceneId}
      ref={handleRootRef}
      sceneIdx={sceneIdx}
      sceneData={sceneData}
      sceneLength={sceneLength}
      className="overflow-hidden"
      style={{ height: `calc(100vh - ${offsetY})` }}
    >
      <header className="absolute left-0 top-0 z-10 flex h-auto w-full justify-end p-4">
        <div className="flex items-center gap-1 rounded-md bg-primary/10 py-1 pl-1 pr-4 text-muted-foreground">
          <Button variant="ghost" size="icon" onClick={() => revalidate?.()}>
            <Icon.RefreshCcw aria-hidden className="h-3.5 w-3.5" />
            <span className="sr-only">Revalidate</span>
          </Button>
          <p className="tracking-tight">{sceneData.display.dates[0]}</p>
        </div>
      </header>

      <Scene.Player sceneIdx={sceneIdx} onPlay={onPlay} onStop={onStop}>
        {({ isPlaying, handlePlayer, bitDurationAsSecond }) => (
          <Bit.Provider>
            <Scene.Screen
              isPlaying={isPlaying}
              intervalSecond={bitDurationAsSecond}
            >
              {(sceneContext) => (
                <Bit.Consumer>
                  {(_bitContext) =>
                    sceneContext.bits.map((bit, bitIdx) => {
                      const bitId = BitUtils.getBitId(sceneId, bitIdx);
                      return (
                        <li key={bitId} className="relative h-full">
                          <Bit.View
                            view="3d"
                            bitId={bitId}
                            bitIdx={bitIdx}
                            bit={bit.value}
                            isActive={isPlaying}
                            className={cn(bit.isVacant && 'hidden')}
                            // onHover={(bitIdx) => {
                            //   bitContext.setSelectedBitIdx(bitIdx);
                            // }}
                            // onBlur={(_bitIdx) => {
                            //   bitContext.resetSelectedBitIdx();
                            // }}
                          />
                          <Bit.Overlay
                            className={cn(
                              bit.isActive ? 'visible' : 'invisible'
                            )}
                          />
                        </li>
                      );
                    })
                  }
                </Bit.Consumer>
              )}
            </Scene.Screen>

            <footer className="absolute bottom-0 left-0 z-10 flex h-auto w-full gap-4 p-10">
              <div className="w-auto min-w-80 rounded-md bg-primary/10 p-1">
                <SceneOverview
                  title={_sceneTitle}
                  description={_sceneDescription}
                  labelledSource={_sceneSource}
                  isPlayerHidden={false}
                  isPlaying={isPlaying}
                  onPlayerButtonClick={({ bits }) => handlePlayer({ bits })}
                />
              </div>
            </footer>
          </Bit.Provider>
        )}
      </Scene.Player>
    </Scene.Root>
  );
}

export default SceneScreenView;
