'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Power0, TimelineLite } from 'gsap';
import { random } from 'lodash-es';

import { cn } from '@/lib/css';
import { useUpdateEffect } from '@/lib/hooks';
import { triggerSingleNote } from '@/components/sound';

import BitOverlay from './BitOverlay';
import { SOUND_FILTER_ID } from './SoundFilter';

const turbulenceValue = { val: 0.000001 };
const turbulenceValueX = { val: 0.000001 };

interface BitProps {
  bit: string;
  bitId: string;
  bitIdx: number;
  active?: boolean;
  stacked?: boolean;
}

function Bit(props: BitProps) {
  const { bit, bitId, bitIdx, active = false, stacked = false } = props;

  const $container = useRef<HTMLLIElement>(null);
  const $turbulence = useRef<SVGFETurbulenceElement | null>(null);

  const timelineOne = useRef<TimelineLite | null>(null);
  const timelineTwo = useRef<TimelineLite | null>(null);

  const [isHovering, setHovering] = useState(false);

  const size = useMemo(() => {
    const width =
      bit === '0'
        ? stacked
          ? 70
          : random(30, 40)
        : stacked
        ? 100
        : random(80, 100);
    const height = bit === '0' ? width * 0.8 : width;
    return [width, height];
  }, [bit, stacked]);

  const [isEntering, setEntering] = useState(false);

  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setEntering(true);
      },
      (bitIdx + 1) * 200
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [bitIdx]);

  useEffect(() => {
    if (isEntering) {
      $turbulence.current = document.querySelectorAll(
        `#${SOUND_FILTER_ID} feTurbulence`
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
  }, [isEntering, stacked]);

  const handleSoundPlay = () => {
    if (active) return;
    if (!isPlaying) {
      triggerSingleNote(Number(bit), bitIdx, () => setPlaying(false));
    }
    setPlaying(true);
  };

  const handleMouseOver = useCallback(() => {
    setHovering(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHovering(false);
  }, []);

  useUpdateEffect(() => {
    setPlaying(active);
  }, [active]);

  useEffect(() => {
    if (isPlaying) {
      timelineOne.current?.play();
      (
        $container.current as HTMLElement
      ).style.filter = `url(#${SOUND_FILTER_ID})`;
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
      id={bitId}
      ref={$container}
      className={cn(
        'z-5 relative isolate flex h-full origin-left rounded-md',
        isPlaying && 'pointer-events-none'
      )}
      onClick={handleSoundPlay}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isEntering ? (
        <>
          <div
            className={cn(
              'sound-filter flex w-full duration-500 ease-out animate-in fade-in zoom-in slide-in-from-left',
              bit === '0'
                ? 'min-w-[60%] xl:min-w-[auto]'
                : 'min-w-full xl:min-w-[auto]',
              stacked &&
                'mask-circle !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2'
            )}
            style={{
              width: `${size[0]}%`,
              height: stacked ? `${size[1]}%` : undefined,
            }}
          >
            <div
              className={cn(
                'grainy-to-left-darken dark:grainy-to-left-darken--dark w-2/5 flex-initial bg-blend-soft-light',
                !stacked && 'hidden'
              )}
            ></div>
            <div
              className={cn(
                'w-4 flex-none',
                'grainy-to-left dark:grainy-to-left--dark',
                stacked && 'rounded-full bg-blend-difference'
              )}
            ></div>
            <div
              className={cn(
                'w-full flex-1',
                'grainy-to-right dark:grainy-to-right--dark',
                stacked && 'bg-blend-difference'
              )}
            ></div>
          </div>
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-body mix-blend-multiply dark:mix-blend-screen"></div>
        </>
      ) : null}
      {isHovering && (
        <BitOverlay
          className="z-10"
          onClick={() => setHovering((isHovering) => !isHovering)}
        />
      )}
    </li>
  );
}

export default Bit;
