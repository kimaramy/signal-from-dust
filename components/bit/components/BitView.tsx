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
import { Instrument } from '@/lib/tone';

import { bitNoiseId } from './BitNoise';
import BitOverlay from './BitOverlay';

const turbulenceValue = { val: 0.000001 };
const turbulenceValueX = { val: 0.000001 };

interface BitViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onBlur'> {
  view: '2d' | '3d';
  bit: string;
  bitId: string;
  bitIdx: number;
  isActive?: boolean;
  onHover?: (bitIdx: number) => void;
  onBlur?: (bitIdx: number) => void;
}

function BitView(props: BitViewProps) {
  const {
    bit,
    bitId,
    bitIdx,
    view,
    isActive = false,
    onHover,
    onBlur,
    className,
  } = props;

  const is3DView = view === '3d';

  const toneDurations = { short: '16n', long: '4n' };

  const activeTime =
    (parseInt(
      bit === '0'
        ? `${parseInt(toneDurations.long, 10) * 2}`
        : toneDurations.short,
      10
    ) /
      4) *
    250;

  const size = useMemo(() => {
    const width =
      bit === '0'
        ? is3DView
          ? 70
          : random(30, 40)
        : is3DView
        ? 100
        : random(80, 100);
    const height = bit === '0' ? width * 0.8 : width;
    return { width, height };
  }, [bit, is3DView]);

  const bitRef = useRef<HTMLDivElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);

  const timelineOne = useRef<TimelineLite | null>(null);
  const timelineTwo = useRef<TimelineLite | null>(null);

  const [isEntering, setEntering] = useState(false);

  const [_isHovering, _setHovering] = useState(false);

  const [_isActive, _setActive] = useState(false);

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
      turbulenceRef.current = document.querySelectorAll(
        `#${bitNoiseId} feTurbulence`
      )[0] as SVGFETurbulenceElement;
      timelineOne.current = new TimelineLite({
        paused: true,
        onUpdate: function () {
          turbulenceRef.current?.setAttribute(
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
  }, [isEntering, is3DView]);

  const handleBitPlay = () => {
    if (isActive) return;
    if (!_isActive) {
      if (bit === '0') {
        Instrument.createClap().triggerAttackRelease(toneDurations.short);
      } else {
        Instrument.createKick().triggerAttackRelease('D1', toneDurations.long);
      }
      setTimeout(() => {
        _setActive(false);
      }, activeTime);
    }
    _setActive(true);
  };

  const handleMouseOver = useCallback(() => {
    _setHovering(true);
    onHover?.(bitIdx);
  }, [onHover, bitIdx]);

  const handleMouseOut = useCallback(() => {
    _setHovering(false);
    onBlur?.(bitIdx);
  }, [onBlur, bitIdx]);

  useEffect(() => {
    _setActive(isActive);
  }, [isActive]);

  useEffect(() => {
    if (_isActive) {
      timelineOne.current?.play();
      (bitRef.current as HTMLElement).style.filter = `url(#${bitNoiseId})`;
    } else {
      timelineOne.current?.pause();
      timelineTwo.current = new TimelineLite({
        onUpdate: function () {
          turbulenceRef.current?.setAttribute(
            'baseFrequency',
            turbulenceValue.val + ' ' + turbulenceValueX.val
          );
        },
      });
      timelineTwo.current.to(turbulenceValue, 0.1, { val: 0.000001 });
      timelineTwo.current.to(turbulenceValueX, 0.1, { val: 0.000001 }, 0);
      (bitRef.current as HTMLElement).style.filter = 'none';
    }
  }, [_isActive]);

  return (
    <div
      id={bitId}
      ref={bitRef}
      className={cn(
        'relative isolate flex h-full origin-left rounded-md',
        _isActive && 'pointer-events-none',
        className
      )}
      onClick={handleBitPlay}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isEntering ? (
        <>
          <div
            className={cn(
              'bit-noise flex w-full duration-500 ease-out animate-in fade-in zoom-in slide-in-from-left',
              bit === '0'
                ? 'min-w-[60%] xl:min-w-[auto]'
                : 'min-w-full xl:min-w-[auto]',
              is3DView &&
                'mask-circle !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2'
            )}
            style={{
              width: `${size.width}%`,
              height: is3DView ? `${size.height}%` : undefined,
            }}
          >
            <div
              className={cn(
                'dust-to-left--deep dark:dust-to-left--deep--invert w-2/5 flex-initial bg-blend-soft-light',
                !is3DView && 'hidden'
              )}
            ></div>
            <div
              className={cn(
                'dust-to-left dark:dust-to-left--invert w-4 flex-none',
                is3DView && 'rounded-full bg-blend-difference'
              )}
            ></div>
            <div
              className={cn(
                'dust-to-right dark:dust-to-right--invert w-full flex-1',
                is3DView && 'bg-blend-difference'
              )}
            ></div>
          </div>
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-body mix-blend-multiply dark:mix-blend-screen"></div>
        </>
      ) : null}
      <BitOverlay
        className={cn('z-10', _isHovering ? 'visible' : 'invisible')}
        onClick={() => _setHovering((isHovering) => !isHovering)}
      />
      <style jsx>
        {`
          .mask-circle {
            -webkit-mask-image: radial-gradient(
              ellipse at center,
              black 40%,
              transparent 80%
            );
            mask-image: radial-gradient(
              ellipse at center,
              black 40%,
              transparent 80%
            );
          }
        `}
      </style>
    </div>
  );
}

export default BitView;
