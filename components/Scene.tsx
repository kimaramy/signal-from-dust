'use client';

import React, { useCallback, useRef, useState } from 'react';
import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/lib/utils';
// import Overlay from './Overlay';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import type { Display } from '@/components/display';
import {
  DustSize,
  getDustGrade,
  getDustGradeColor,
} from '@/components/dustSize';

import Bit, { Binary } from './Bit';

export function getSceneLength(decimal: number) {
  return decimal.toString(2).length;
}

export interface SceneData {
  id: number;
  name: string;
  displayName: string;
  value: number | null;
  collection: string;
  dates: string[];
  location: string;
  rank: number | null;
}

export interface SceneProps {
  sceneId: string;
  sceneData: SceneData;
  sceneIndex: number;
  sceneLength?: number;
  display: Display;
  active?: boolean;
  className?: string;
  onSceneChange: (sceneData: SceneData, sceneIndex: number) => void;
}

function Scene({
  sceneId,
  sceneData,
  sceneIndex,
  sceneLength = 8,
  display,
  active = false,
  className,
  onSceneChange,
}: SceneProps) {
  const binaries = sceneData.value?.toString(2).split('') as
    | Binary[]
    | undefined;

  const sceneRef = useRef<HTMLUListElement>(null);

  const { ref } = useInView({
    threshold: 0.8,
    initialInView: sceneIndex === 0,
    skip: display === '2d',
    onChange(inView) {
      if (inView) {
        onSceneChange(sceneData, sceneIndex);
      }
    },
  });

  const dustGrade = getDustGrade(
    sceneData.value ?? 0,
    sceneData.name as DustSize
  );

  const [isPlaying, setPlaying] = useState(false);

  const [isMouseOver, setMouseOver] = useState(false);

  const handleMouseOver = useCallback<React.MouseEventHandler>(() => {
    if (display === '2d') {
      onSceneChange(sceneData, sceneIndex);
    }
    setMouseOver(true);
  }, [display, sceneData]);

  const handleMouseOut = useCallback<React.MouseEventHandler>(() => {
    setMouseOver(false);
  }, []);

  const handleOverlayClick = useCallback<React.MouseEventHandler>(() => {
    setPlaying((isPlaying) => !isPlaying);
  }, []);

  return (
    <li
      id={sceneId}
      ref={ref}
      className={cn(
        'flex h-full items-center gap-6',
        display === '3d' && 'justify-center overflow-x-hidden',
        className
      )}
      // style={{
      //   perspective: display === '3d' ? `1500px` : undefined,
      // }}
    >
      {display === '2d' && (
        <div className="flex w-28 flex-none items-center justify-start pl-4">
          <h4 className="w-full text-xs">{sceneData.dates.join(' ')}</h4>
        </div>
      )}
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <ul
            ref={sceneRef}
            className={cn(
              'relative grid h-full w-full flex-1 cursor-pointer gap-1 rounded-md bg-fixed p-1',
              display === '2d' && 'hover:ring-1 data-[state=open]:ring-1'
            )}
            style={{
              gridTemplateColumns:
                display === '3d'
                  ? binaries
                      ?.map((binary) => (binary === '0' ? '1fr' : '1.5fr'))
                      .join(' ')
                  : `repeat(${sceneLength}, 1fr)`,
              transform:
                display === '3d'
                  ? `rotateX(70deg) rotateZ(40deg) translateZ(0em) scaleX(1.15) scaleY(1.35)`
                  : undefined,
              transformStyle: display === '3d' ? 'preserve-3d' : undefined,
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {binaries?.map((binary, index) => {
              const bitId = [sceneId, index].join('-');
              return (
                <Bit
                  key={`${display}-${bitId}`}
                  id={bitId}
                  binary={binary}
                  binaryIndex={index}
                  display={display}
                  isActive={isPlaying}
                />
              );
            })}
            {/* {isMouseOver ? (
              <Overlay className="z-0" onClick={handleOverlayClick} />
            ) : null} */}
          </ul>
        </HoverCardTrigger>
        {display === '2d' && (
          <HoverCardContent
            align="start"
            className="w-auto bg-muted text-muted-foreground"
          >
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="h-12 w-12">
                {isPlaying ? (
                  <PauseCircleIcon className="h-9 w-9" />
                ) : (
                  <PlayCircleIcon className="h-9 w-9" />
                )}
              </Button>
              <div className="pr-4">
                <h4 className="inline-block divide-x divide-ring border border-ring font-mono text-base font-semibold tracking-wider text-accent-foreground">
                  {binaries?.map((binary, i) => (
                    <span
                      key={`${binary}-${i}`}
                      className="inline-flex items-center justify-center px-1 py-0.5"
                    >
                      {binary}
                    </span>
                  ))}
                </h4>
                <ul className="mt-2.5 space-y-1 text-[0.8em] tracking-tight">
                  <li className="bullet flex">
                    {[
                      `${sceneData.dates.join(' ')}의 ${
                        sceneData.displayName
                      } 평균`,
                      sceneData.location,
                    ].join(', ')}
                  </li>
                  <li className="bullet flex items-baseline">
                    {/* <span>측정 값&nbsp;:&nbsp;</span> */}
                    <span className="">{sceneData.value}(㎍/㎥)</span>
                    <span
                      className="ml-1.5 inline-block rounded px-1 py-px text-[0.9em] text-black"
                      style={{ backgroundColor: getDustGradeColor(dustGrade) }}
                    >
                      {dustGrade}
                    </span>
                  </li>
                </ul>

                {/* <h5 className="text-sm">{sceneData.value}(㎍/㎥)</h5>
                <p className="text-sm">
                  {[
                    `${sceneData.dates.join(' ')}의 ${sceneData.name} 평균`,
                    sceneData.location,
                  ].join(', ')}
                </p> */}
                {/* <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    {sceneData.name} 수치를 2진 신호로 출력한 결과입니다.
                  </span>
                </div> */}
              </div>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    </li>
  );
}

export default Scene;
