'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUpdateEffect } from '@/hooks';
import { Power0, TimelineLite } from 'gsap';
import { random } from 'lodash-es';

import { cn } from '@/lib/utils';

import { type View } from './ViewSelect';

export interface BitProps {
  id: string;
  context: (string | number)[];
  binary: string;
  view: View;
  isActive?: boolean;
  className?: string;
}

export default function Bit({
  id,
  context,
  binary,
  view,
  isActive = false,
  className,
}: BitProps) {
  // const activated = useRef(active);

  const $container = useRef<HTMLLIElement>(null);
  const $turbulence = useRef<SVGFETurbulenceElement | null>(null);

  const turbulenceValue = { val: 0.000001 };
  const turbulenceValueX = { val: 0.000001 };

  const timelineOne = useRef<TimelineLite | null>(null);
  const timelineTwo = useRef<TimelineLite | null>(null);

  const randomLength = useMemo(
    () => (binary === '0' ? random(20, 40) : random(80, 100)),
    [binary]
  );

  const [isEntered, setEntered] = useState(false);

  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    const bitIndex = context[2] as number;

    const timeout = setTimeout(() => {
      setEntered(true);
    }, (bitIndex + 1) * 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [context]);

  useEffect(() => {
    if (isEntered) {
      $turbulence.current = document.querySelectorAll(
        '#sound-filter feTurbulence'
      )[0] as SVGFETurbulenceElement;
      timelineOne.current = new TimelineLite({
        paused: true,
        onUpdate: function () {
          $turbulence.current?.setAttribute(
            'baseFrequency',
            turbulenceValue.val + ' ' + turbulenceValueX.val
          );
        },
        onComplete: function () {
          timelineOne.current?.reverse();
        },
        onReverseComplete: function () {
          timelineOne.current?.restart();
        },
      });
      timelineOne.current.to(
        turbulenceValueX,
        0.4,
        { val: 0.04, ease: Power0.easeNone },
        0
      );
      timelineOne.current.to(
        turbulenceValue,
        0.1,
        { val: 0.2, ease: Power0.easeNone },
        0
      );
    }
  }, [isEntered]);

  function handlePlay() {
    if (isPlaying) {
      timelineOne.current?.pause();
      timelineTwo.current = new TimelineLite({
        onUpdate: function () {
          $turbulence.current?.setAttribute(
            'baseFrequency',
            turbulenceValue.val + ' ' + turbulenceValueX.val
          );
        },
      });
      timelineTwo.current.to(turbulenceValue, 0.1, { val: 0.000001 });
      timelineTwo.current.to(turbulenceValueX, 0.1, { val: 0.000001 }, 0);
      ($container.current as HTMLElement).style.filter = 'none';
      setPlaying(false);
    } else {
      timelineOne.current?.play();
      ($container.current as HTMLElement).style.filter = 'url(#sound-filter)';
      setPlaying(true);
    }
  }

  const handleContainerClick = () => {
    if (isActive) return;
    handlePlay();
  };

  useUpdateEffect(() => {
    handlePlay();
  }, [isActive]);

  return (
    <li
      id={id}
      ref={$container}
      className={cn('relative isolate flex h-full', className)}
      onClick={handleContainerClick}
    >
      {isEntered ? (
        <>
          {view === 'perspective' && <div className="flex w-2/5"></div>}
          <div
            className={cn(
              'flex w-full duration-500 ease-out animate-in fade-in zoom-in slide-in-from-left',
              view === 'grid' && 'sound-filter-bg',
              binary === '0'
                ? 'min-w-[50%] xl:min-w-[auto]'
                : 'min-w-full xl:min-w-[auto]'
            )}
            style={{
              width: `${randomLength}%`,
            }}
          >
            <div
              className={cn(
                'w-4 flex-none lg:w-6 2xl:w-8',
                'grainy-to-left dark:grainy-to-left--dark'
              )}
            ></div>
            <div
              className={cn(
                'w-full flex-1',
                'grainy-to-right dark:grainy-to-right--dark'
              )}
            ></div>
          </div>
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-body mix-blend-multiply dark:mix-blend-lighten"></div>
        </>
      ) : null}
    </li>
  );
}
