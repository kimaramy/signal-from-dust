import { useCallback, useEffect, useState } from 'react';

import { Instrument, Tone } from '@/lib/tone';

import { type SceneContextValue } from '../lib';

export type UseScenePlayerParams = {
  sceneIdx: number;
  onPlay?: (sceneIdx: number) => void;
  onStop?: () => void;
};

export function useScenePlayer({
  sceneIdx,
  onPlay,
  onStop,
}: UseScenePlayerParams) {
  const [bitDurationAsSecond] = useState(0.5);

  const [isPlaying, setPlaying] = useState(false);

  const [isPaused, setPaused] = useState(false);

  const [claps, setClaps] = useState<Tone.Sequence | null>(null);
  const [kicks, setKicks] = useState<Tone.Sequence | null>(null);
  const [cymbals, setCymbals] = useState<Tone.Sequence | null>(null);

  const handlePlay = useCallback(
    ({ bits }: Pick<SceneContextValue, 'bits'>) => {
      if (Tone.Transport.state === 'started') return;
      const _claps = new Tone.Sequence(
        (time) => {
          Instrument.createClap().triggerAttackRelease(time);
        },
        bits.map((bit) => (bit.value === '0' ? '0' : null)),
        bitDurationAsSecond
      ).start(0);
      const _kicks = new Tone.Sequence(
        (time) => {
          Instrument.createKick().triggerAttackRelease('D1', time);
        },
        bits.map((bit) => (bit.value === '1' ? '1' : null)),
        bitDurationAsSecond
      ).start(0);
      const _cymbals = new Tone.Sequence(
        (time) => {
          Instrument.createCymbal().triggerAttackRelease('C3', time);
        },
        bits.map((bit) => (bit.value === '-1' ? '-1' : null)),
        bitDurationAsSecond
      ).start(0);
      // _claps.loop = 3;
      // _kicks.loop = 3;
      // _cymbals.loop = 3;
      setClaps(_claps);
      setKicks(_kicks);
      setCymbals(_cymbals);
      Tone.Transport.start();
      setPlaying(true);
      setPaused(false);
    },
    [bitDurationAsSecond]
  );

  const _stopTransport = useCallback(() => {
    claps?.stop();
    kicks?.stop();
    cymbals?.stop();
    Tone.Transport.stop();
  }, [claps, cymbals, kicks]);

  const handleStop = useCallback(() => {
    if (Tone.Transport.state === 'stopped') return;
    _stopTransport();
    setPlaying(false);
    setPaused(false);
  }, [_stopTransport]);

  const handlePause = useCallback(() => {
    _stopTransport();
    setPaused(true);
  }, [_stopTransport]);

  const handlePauseablePlayer = useCallback(
    async (ctx: Pick<SceneContextValue, 'bits'>) => {
      await Tone.start();
      if (!isPlaying || isPaused) return handlePlay(ctx);
      if (isPlaying && !isPaused) return handlePause();
      return handleStop();
    },
    [isPlaying, isPaused, handlePlay, handleStop, handlePause]
  );

  const handlePlayer = useCallback(
    async (ctx: Pick<SceneContextValue, 'bits'>) => {
      await Tone.start();
      if (!isPlaying && Tone.Transport.state !== 'started') {
        handlePlay(ctx);
      } else {
        handleStop();
      }
    },
    [isPlaying, handlePlay, handleStop]
  );

  useEffect(() => {
    if (isPlaying) {
      onPlay?.(sceneIdx);
    } else {
      onStop?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx, isPlaying]);

  return {
    bitDurationAsSecond,
    isPlaying,
    isPaused,
    handlePlayer,
    handlePauseablePlayer,
    handlePlay,
    handleStop,
    handlePause,
  };
}

export interface UseScenePlayerEffectParams {
  sceneContext: SceneContextValue;
  isPlaying: boolean;
  isPaused: boolean;
  bitDurationAsSecond: number;
}

export function useScenePlayerEffect({
  sceneContext,
  isPlaying,
  isPaused,
  bitDurationAsSecond,
}: UseScenePlayerEffectParams) {
  // Do not add bits to deps cause it'll not trigger single interval context
  useEffect(() => {
    let interval: NodeJS.Timer;

    let _activeBitIdx = 0;

    if (isPlaying && !isPaused) {
      // console.log(`ready: ${_activeBitIdx}`);
      if (_activeBitIdx === 0) {
        // console.log(`init_start: ${_activeBitIdx}`);
        const initialBits = [
          { ...sceneContext.bits[0], isActive: true },
          ...sceneContext.bits.slice(1),
        ] as typeof sceneContext.bits;
        sceneContext.setBits(initialBits);
        _activeBitIdx++;
        // console.log(`init_end: ${_activeBitIdx}`);
      }
      interval = setInterval(() => {
        // console.log(`interval_start: ${_activeBitIdx}`);
        const loopLength = sceneContext.bits.length;
        const newBits = sceneContext.bits.reduce(
          (accum, bit, bitIdx) => {
            if (bitIdx === _activeBitIdx % loopLength) {
              accum.push({ ...bit, isActive: true });
            } else {
              accum.push({ ...bit, isActive: false });
            }
            return accum;
          },
          [] as typeof sceneContext.bits
        );
        sceneContext.setBits(newBits);
        _activeBitIdx++;
        // console.log(`interval_end: ${_activeBitIdx}`);
      }, bitDurationAsSecond * 1000);
      // console.log(`finished: ${_activeBitIdx}`);
    } else {
      sceneContext.resetBits();
    }
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, isPaused, bitDurationAsSecond]);
}
