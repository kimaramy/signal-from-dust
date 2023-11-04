import React from 'react';
import { PauseCircleIcon, PlayCircleIcon } from '@heroicons/react/20/solid';

import { Button } from '@/components/ui/button';
import { DustGrade, type DataNameKey } from '@/components/dataName';

import type { Binary } from './Bit';
import type { SceneData } from './Scene';

interface SceneDataViewProps {
  sceneData: SceneData;
  binaries?: Binary[];
  isPlaying: boolean;
  onPlayButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

function SceneDataView(props: SceneDataViewProps) {
  const { sceneData, binaries, isPlaying, onPlayButtonClick } = props;

  const dustGrade = DustGrade.getGrade(
    sceneData.value ?? 0,
    sceneData.name as DataNameKey
  );

  const dustGradeColor = DustGrade.getGradeColor(dustGrade);

  return (
    <div className="flex items-center space-x-4 p-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-12 w-12"
        onClick={onPlayButtonClick}
      >
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
              className="inline-flex items-center justify-center px-2 py-1"
            >
              {binary}
            </span>
          ))}
        </h4>
        <p className="my-2 text-sm text-muted-foreground">
          {sceneData.name} 수치를 2진 신호로 출력한 결과입니다.
        </p>
        <ul className="space-y-1 text-[0.8em] tracking-tight">
          <li className="bullet flex">
            {[
              `${sceneData.dates.join(' ')}의 ${sceneData.displayName} 평균`,
              sceneData.location,
            ].join(', ')}
          </li>
          <li className="bullet flex items-baseline">
            {/* <span>측정 값&nbsp;:&nbsp;</span> */}
            <span className="">{sceneData.value}(㎍/㎥)</span>
            <span
              className="ml-1.5 inline-block rounded px-1 py-px text-[0.9em] text-black"
              style={{ backgroundColor: dustGradeColor }}
            >
              {dustGrade}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SceneDataView;
