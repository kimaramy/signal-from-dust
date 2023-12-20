'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Power0, TimelineLite } from 'gsap';
import { random } from 'lodash-es';

import { cn } from '@/lib/css';
import { useUpdateEffect } from '@/lib/hooks';
import { type DisplayKey } from '@/components/display';

import Overlay from './Overlay';
import { triggerSingleNote } from './sound';

export type Binary = '0' | '1';

export interface BitProps {
  id: string;
  displayKey: DisplayKey;
  binary: Binary;
  binaryIndex: number;
  isActive?: boolean;
  className?: string;
}

export default function Bit({
  id,
  displayKey,
  binary,
  binaryIndex,
  isActive = false,
  className,
}: BitProps) {
  const isFullPage = displayKey === 'FULL';

  const $container = useRef<HTMLLIElement>(null);
  const $turbulence = useRef<SVGFETurbulenceElement | null>(null);

  const turbulenceValue = { val: 0.000001 };
  const turbulenceValueX = { val: 0.000001 };

  const timelineOne = useRef<TimelineLite | null>(null);
  const timelineTwo = useRef<TimelineLite | null>(null);

  const [isHovering, setHovering] = useState(false);

  const size = useMemo(() => {
    const width =
      binary === '0'
        ? isFullPage
          ? 70
          : random(30, 40)
        : isFullPage
        ? 100
        : random(80, 100);
    const height = binary === '0' ? width * 0.8 : width;
    return [width, height];
  }, [binary, isFullPage]);

  const [isEntering, setEntering] = useState(false);

  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setEntering(true);
      },
      (binaryIndex + 1) * 200
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [binaryIndex]);

  useEffect(() => {
    if (isEntering) {
      const filterId = !isFullPage ? '#sound-filter' : '#sound-filter';
      $turbulence.current = document.querySelectorAll(
        `${filterId} feTurbulence`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEntering, isFullPage]);

  const handleSoundPlay = () => {
    if (isActive) return;
    if (!isPlaying) {
      triggerSingleNote(Number(binary), binaryIndex, () => setPlaying(false));
    }
    setPlaying(true);
  };

  useUpdateEffect(() => {
    setPlaying(isActive);
  }, [isActive]);

  useEffect(() => {
    if (isPlaying) {
      timelineOne.current?.play();
      const filterId = '#sound-filter';
      ($container.current as HTMLElement).style.filter = `url(${filterId})`;
    } else {
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
    }
  }, [isPlaying]);

  return (
    <li
      id={id}
      ref={$container}
      className={cn(
        'z-5 relative isolate flex h-full origin-left rounded-md',
        isPlaying && 'pointer-events-none',
        className
      )}
      onClick={handleSoundPlay}
      onMouseOver={() => {
        setHovering(true);
      }}
      onMouseOut={() => {
        setHovering(false);
      }}
    >
      {isEntering ? (
        <>
          <div
            className={cn(
              'sound-filter flex w-full duration-500 ease-out animate-in fade-in zoom-in slide-in-from-left',
              binary === '0'
                ? 'min-w-[60%] xl:min-w-[auto]'
                : 'min-w-full xl:min-w-[auto]',
              isFullPage &&
                'mask-circle !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2'
            )}
            style={{
              width: `${size[0]}%`,
              height: isFullPage ? `${size[1]}%` : undefined,
            }}
          >
            <div
              className={cn(
                'grainy-to-left-darken dark:grainy-to-left-darken--dark w-2/5 flex-initial bg-blend-soft-light',
                !isFullPage && 'hidden'
              )}
            ></div>
            <div
              className={cn(
                'w-4 flex-none',
                'grainy-to-left dark:grainy-to-left--dark',
                isFullPage && 'rounded-full bg-blend-difference'
              )}
            ></div>
            <div
              className={cn(
                'w-full flex-1',
                'grainy-to-right dark:grainy-to-right--dark',
                isFullPage && 'bg-blend-difference'
              )}
            ></div>
          </div>
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-body mix-blend-multiply dark:mix-blend-screen"></div>
        </>
      ) : null}
      {isHovering && (
        <Overlay
          className="z-10"
          onClick={() => setHovering((isHovering) => !isHovering)}
        />
      )}
    </li>
  );
}
