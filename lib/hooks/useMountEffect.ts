/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useEffect } from 'react';

export default function useMountEffect(effect: EffectCallback): void {
  useEffect(effect, []);
}
