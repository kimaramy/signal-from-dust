'use client';

import { useCallback, useState } from 'react';

import { cn } from '@/lib/css';
import { Icon } from '@/lib/icon';
import { Button } from '@/components/ui/button';
import { Bit, BitUtils } from '@/components/bit';

import type { SceneData } from '../context';
import Scene from './Scene';

interface SceneScreenViewProps {
  sceneId: string;
  sceneIdx: number;
  sceneData: SceneData;
  sceneLength: number;
  sceneTitle: React.ReactNode | ((sceneData: SceneData) => React.ReactNode);
  sceneSubtitle: React.ReactNode | ((sceneData: SceneData) => React.ReactNode);
  sceneDescription:
    | React.ReactNode
    | ((sceneData: SceneData) => React.ReactNode);
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
  sceneSubtitle,
  sceneDescription,
  revalidate,
  onPlay,
  onStop,
}: SceneScreenViewProps) {
  const _sceneTitle =
    typeof sceneTitle === 'function' ? sceneTitle(sceneData) : sceneTitle;

  const _sceneSubtitle =
    typeof sceneSubtitle === 'function'
      ? sceneSubtitle(sceneData)
      : sceneSubtitle;

  const _sceneDescription =
    typeof sceneDescription === 'function'
      ? sceneDescription(sceneData)
      : sceneDescription;

  const [offsetY, setOffsetY] = useState<`${string}px` | undefined>(undefined);

  const handleRef = useCallback((el: HTMLDivElement | null) => {
    if (el !== null) {
      setOffsetY(`${el.getBoundingClientRect().top}px`);
    }
  }, []);

  return (
    <Scene.Root
      id={sceneId}
      ref={handleRef}
      sceneIdx={sceneIdx}
      sceneData={sceneData}
      sceneLength={sceneLength}
      style={{ height: `calc(100vh - ${offsetY})` }}
    >
      <header className="absolute left-0 top-0 z-10 flex h-auto w-full min-w-md justify-end p-4">
        <div className="flex items-center gap-1 rounded-md bg-primary/10 py-1 pl-1 pr-4 text-muted-foreground">
          <Button variant="ghost" size="icon" onClick={() => revalidate?.()}>
            <Icon.RefreshCcw aria-hidden className="h-3.5 w-3.5" />
            <span className="sr-only">Revalidate</span>
          </Button>
          <p className="tracking-tight">{sceneData.display.dates[0]}</p>
        </div>
      </header>

      <Scene.Player sceneIdx={sceneIdx} onPlay={onPlay} onStop={onStop}>
        {({ isPlaying, handlePlayer }) => (
          <Bit.Provider>
            <Scene.Body view="screen" columns={sceneLength}>
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
            </Scene.Body>

            <footer className="absolute bottom-0 left-0 z-10 flex h-auto w-full min-w-md gap-4 p-10">
              <div className="w-auto min-w-80 rounded-md bg-primary/10 p-2">
                <Scene.Overview>
                  <Scene.Card
                    title={_sceneTitle}
                    subtitle={_sceneSubtitle}
                    isPlaying={isPlaying}
                    onPlay={handlePlayer}
                  />
                  <div className="space-y-2 py-2 pl-4 pr-2">
                    <Scene.Description>{_sceneDescription}</Scene.Description>
                    <Scene.Value />
                  </div>
                </Scene.Overview>
              </div>
            </footer>
          </Bit.Provider>
        )}
      </Scene.Player>
    </Scene.Root>
  );
}

export default SceneScreenView;
