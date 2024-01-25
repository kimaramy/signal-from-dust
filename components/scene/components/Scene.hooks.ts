'use client';

import { useCallback, useEffect, useState } from 'react';

import { Instrument, Tone } from '@/lib/tone';

import type { SceneHeaderContext } from './SceneHeader';

export function useScenePlayer(
  sceneIdx: number,
  onPlay: (sceneIdx: number) => void,
  onStop: () => void
) {
  const [bitDurationAsSecond] = useState(0.5);

  const [isPlaying, setPlaying] = useState(false);

  const [claps, setClaps] = useState<Tone.Sequence | null>(null);
  const [kicks, setKicks] = useState<Tone.Sequence | null>(null);
  const [cymbals, setCymbals] = useState<Tone.Sequence | null>(null);

  const handleScenePlayer = useCallback(
    async ({ bits }: SceneHeaderContext) => {
      // console.log({ bits });
      await Tone.start();
      if (!isPlaying && Tone.Transport.state !== 'started') {
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
        setClaps(_claps);
        setKicks(_kicks);
        setCymbals(_cymbals);
        Tone.Transport.start();
      } else {
        claps?.stop();
        kicks?.stop();
        cymbals?.stop();
        Tone.Transport.stop();
      }
      setPlaying(!isPlaying);
    },
    [isPlaying, claps, kicks, cymbals, bitDurationAsSecond]
  );

  useEffect(() => {
    if (isPlaying && Tone.Transport.state === 'started') {
      onPlay(sceneIdx);
    } else {
      onStop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx, isPlaying]);

  return {
    isPlaying,
    bitDurationAsSecond,
    handleScenePlayer,
  };
}
