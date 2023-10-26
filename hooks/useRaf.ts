import { useEffect, useRef } from 'react';

/**
 *
 * useRaf
 * Uses a polyfilled version of requestAnimationFrame
 *
 * @param {Function} callback The callback function to be executed
 * @param {boolean} [isActive] The value which while true, keeps the raf running infinitely
 * @see https://rooks.vercel.app/docs/useRaf
 */
export default function useRaf(
  callback: (timeElapsed: number) => void,
  isActive: boolean
): void {
  const savedCallback = useRef<(timeElapsed: number) => void>();
  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let animationFrame: number | undefined;
    let startTime: number = Date.now();

    function tick() {
      const timeElapsed = Date.now() - startTime;
      startTime = Date.now();
      loop();
      savedCallback.current?.(timeElapsed);
    }

    function loop() {
      animationFrame = requestAnimationFrame(tick);
    }

    if (isActive) {
      startTime = Date.now();
      loop();

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    } else {
      return () => null;
    }
  }, [isActive]);
}
